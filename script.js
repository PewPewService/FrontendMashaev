let menus = document.querySelectorAll(".navimg");
let contents = document.querySelectorAll(".page");
let radio = document.querySelectorAll(".radio");
let check=document.querySelectorAll(".crewdetails");
let crew=document.querySelectorAll(".teamimg");
let CurrentTeam = new Map();
document.querySelector("#crewButton").disabled=true;
let crewAmount=0;
let rocket=new Object;
let shipCapacity=4;
let RoleNames=new Map();
document.querySelector('#LetsGo').disabled=true;

$(document).ready(function(){
    ClearTeam();
    SetRoleNames();
    contents[0].style.display='block';
	
    radio.forEach(
    function(currentValue) {
        currentValue.addEventListener("click", pickShip);
    });
    
    menus.forEach(
        function(currentValue) {
            currentValue.addEventListener("click", showPage);
        });
    
    crew.forEach(
            function(currentValue){
                currentValue.style.display="none";
            });
	
	check.forEach(
        function(currentValue){
            currentValue.addEventListener("change",changeCrew);
            currentValue.checked=false;
    });
		
});

radio[0].checked=true;

function SetRoleNames(){
	RoleNames=new Map();
	RoleNames.set('captain','Капитан');
	RoleNames.set('engineer','Борт инженер');
	RoleNames.set('doctor','Врач');
	RoleNames.set('marine','Космодесантник');
}

function checkStats(){
	if (document.querySelectorAll('.stats').length===0) {
		document.querySelector('#LetsGo').className='activeBtn';
		document.querySelector('#LetsGo').disabled=false;
	} else {
		document.querySelector('#LetsGo').className='inactiveBtn';
		document.querySelector('#LetsGo').disabled=true;
	}
}

function ChangeStats(stat){
	document.querySelector('#stats'+stat).className='stats-good';
	checkStats();
}

function showPage(){
    document.querySelector(".navimg-clicked").classList.remove("navimg-clicked");  
    this.classList.add("navimg-clicked");
                    
    let ind  = Array.prototype.indexOf.call(menus, this);
    contents.forEach(
        function(currentValue){
            currentValue.style.display = "none";
        }
    );
    contents[ind].style.display = "block";
}

function pickShip(){
    let id = this.id.substring(this.id.length-1);
    let name = document.querySelector("#name"+id).innerHTML;
    let speed = document.querySelector("#speed"+id).innerHTML;
    let capacity = document.querySelector("#capacity"+id).innerHTML;
	let shipBlock=document.querySelector('#currShip');
	shipBlock.querySelector("#rocket-icon").src="img/ship"+id+".svg";
	shipBlock.querySelector("#rocket-name").innerHTML = name;
	shipBlock.querySelector("#rocket-speed").innerHTML = speed;
	shipBlock.querySelector("#rocket-capacity").innerHTML = capacity;
	shipBlock.querySelector(".activeBtn").id = id;
}

function buildRocket() {
    let name = document.querySelector("#rocket-name").innerHTML;
    let speed = document.querySelector("#rocket-speed").innerHTML;
    let capacity = document.querySelector("#rocket-capacity").innerHTML;
    let icon = document.querySelector("#rocket-icon").src;
    let id=document.querySelector('#currShip').querySelector('.activeBtn').id;
    rocket = new Rocket(name, speed, capacity, icon, id);
}

function changeShips(){
   buildRocket();
   shipCapacity=parseInt(rocket.capacity, 10); 
   let TeamShip=document.querySelector(".ship");
   TeamShip.querySelector("#rocket-icon").src=rocket.icon;
   TeamShip.querySelector("#rocket-name").innerHTML = rocket.name;
   TeamShip.querySelector("#rocket-speed").innerHTML = rocket.speed;
   TeamShip.querySelector("#rocket-capacity").innerHTML = rocket.capacity;
   document.querySelector("#mainRocket").className="rocket ship"+rocket.id;
   ClearTeam();
   ChangeStats('Rocket');
   crewBtn();
}

function changeCrew(){
    let icon=this.value;
    let role=this.name;
    if (this.checked) {
        document.querySelector("#"+role+icon).style.display="inline-block";
        crewAmount+=1;
    }
    else{
        document.querySelector("#"+role+icon).style.display="none";
        crewAmount-=1;
    }
    crewBtn();
}

function crewBtn(){
    let crewButton=document.querySelector("#crewButton");
    if (crewAmount===shipCapacity) {
        crewButton.disabled=false;
        crewButton.className="activeBtn";
    }
    else{
        crewButton.disabled=true;
        crewButton.className="inactiveBtn";
    }
}

class Rocket{
    constructor(name, speed, capacity, icon, id){
        this.name = name;
        this.speed = speed;
        this.capacity = capacity;
        this.icon = icon;
	this.id=id;
    }

    launch () {
        document.querySelector('#mainRocket').className+=' rocket-go';
    }
}

class TeamMember{
    constructor(name, icon, role){
        this.name=name;
        this.icon=icon;
        this.role=role;
	this.roleName=RoleNames.get(role);
    }
}

function TeamBuilding(){
    let i=0;
    CurrentTeam = new Map();
    check.forEach(
        function(currentValue){
            if (currentValue.checked) {
                let tempname=currentValue.id;
                let temprole=currentValue.name;
                let tempid=currentValue.value;
                CurrentTeam.set(i,new TeamMember(tempname,tempid,temprole));
                i+=1;
            }
        });
    ChangeStats('Crew');
    ShowTeam();
}

function ClearTeam(){
	document.getElementById("statsCrew").className="stats";
	document.querySelector('#mainpageCrew').innerHTML='';
}

function ShowTeam(){
	let tempstring='';
	CurrentTeam.forEach(function(currentValue){
		tempstring+='<div class="underline"><span class="left-text margin '+currentValue.role+'">'+currentValue.roleName+'</span><span class="right-text margin">'+currentValue.name+'</span></div>'; 
	});
	document.querySelector('#mainpageCrew').innerHTML=tempstring;
	let temp=document.querySelector('#mainpageCrew').querySelectorAll('.underline');
	temp[temp.length-1].className='';
}

function WeatherCheck(){
	let tempweather='';
	place=document.getElementById('TakeoffSpot').value.trim();
	if (place!=''){
	let url='https://api.openweathermap.org/data/2.5/weather?q='+place+'&appid=28867f40dd391e7ad8706ada68f1cfae';
	fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
	  if(data.cod===404) {tempweather='Населённый пункт не найден';
		document.getElementById("mainWeather").innerHTML=tempweather;
		document.getElementById("weatherPage").innerHTML='<div class="underline"><span class="left-text margin">Локация</span><span class="right-text margin"> <input type="text" id="TakeoffSpot"> </span></div>'+tempweather;
		document.getElementById("statsWeather").className="stats";
		checkStats();
	} else {
		temperature=data.main.temp-273.15;
		if (data.wind.deg<22.5) direction='С';
		else if (data.wind.deg<67.5) direction='СВ';
		else if (data.wind.deg<112.5) direction='В';
		else if (data.wind.deg<157.5) direction='ЮВ';
		else if (data.wind.deg<202.5) direction='Ю';
		else if (data.wind.deg<247.5) direction='ЮЗ';
		else if (data.wind.deg<292.5) direction='З';
		else if (data.wind.deg<337.5) direction='СЗ';
		else direction='З';
		tempweather='<div class="underline"><span class="left-text margin">Температура</span><span class="right-text margin">'+Math.round(temperature)+' °C</span></div>';
		tempweather+='<div class="underline"><span class="left-text margin">Влажность</span><span class="right-text margin">'+Math.round(data.main.humidity)+'%</span></div>';
		tempweather+='<div><span class="left-text margin">Ветер</span><span class="right-text margin">'+Math.round(data.wind.speed)+' м/с, '+direction+'</span></div>';
		ChangeStats('Weather');
		document.getElementById("mainWeather").innerHTML=tempweather;
		document.getElementById("weatherPage").innerHTML='<div class="underline"><span class="left-text margin">Локация</span><span class="right-text margin"> <input type="text" id="TakeoffSpot"> </span></div>'+tempweather;
		}
  });
	}
}
