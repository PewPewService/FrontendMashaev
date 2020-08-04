let menus = document.querySelectorAll(".navimg");
let contents = document.querySelectorAll(".page");
let radio = document.querySelectorAll(".radio");
let check=document.querySelectorAll(".crewdetails");
let crew=document.querySelectorAll(".teamimg");
let CurrentTeam = new Map();
document.querySelector("#crewButton").disabled=true;
let crewAmount=0;
let shipCapacity=4;

$(document).ready(function(){
    contents[0].style.display='block';
	
    radio.forEach(
    function(currentValue) {
        currentValue.addEventListener("click", changeShip);
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

function changeShip(){
    let id = this.id.substring(this.id.length-1);
    let name = document.querySelector("#name"+id).innerHTML;
    let speed = document.querySelector("#speed"+id).innerHTML;
    let capacity = document.querySelector("#capacity"+id).innerHTML;
    shipCapacity=capacity;
    document.querySelectorAll(".ship").forEach(
            function(currentValue){
                currentValue.querySelector("#rocket-icon").src="img/ship"+id+".svg";
                currentValue.querySelector("#rocket-name").innerHTML = name;
                currentValue.querySelector("#rocket-speed").innerHTML = speed;
                currentValue.querySelector("#rocket-capacity").innerHTML = capacity;
            });
	document.querySelector("#mainRocket").className="rocket ship"+id;
    crewBtn();
}

function buildRocket() {
    let name = document.querySelector("#rocket-name").innerHTML;
    let speed = document.querySelector("#rocket-speed").innerHTML;
    let capacity = document.querySelector("#rocket-capacity").innerHTML;
    let icon = document.querySelector("#rocket-icon").src;
    let rocket = new Rocket(name, speed, capacity, icon);
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
    if (crewAmount==shipCapacity) {
        crewButton.disabled=false;
        crewButton.className="activeBtn";
    }
    else{
        crewButton.disabled=true;
        crewButton.className="inactiveBtn";
    }
}

class Rocket{
    constructor(name, speed, capacity, icon){
        this.name = name;
        this.speed = speed;
        this.teamNumber = capacity;
        this.icon = icon;
    }

    launch () {
        
    }
}

class TeamMember{
    constructor(name, icon, role){
        this.name=name;
        this.icon=icon;
        this.role=role;
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
    console.log(CurrentTeam);
}