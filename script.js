var menus = document.querySelectorAll(".navimg");
var contents = document.querySelectorAll(".page");

$(document).ready(function(){
    contents[0].style.display='block';
    
    menus.forEach(
        function(currentValue) {
            currentValue.addEventListener("click", showPage);
        }   
    );
});

function showPage(){
    document.querySelector(".navimg-clicked").classList.remove("navimg-clicked");  
    this.classList.add("navimg-clicked");
                    
    var ind  = Array.prototype.indexOf.call(menus, this);
    contents.forEach(
        function(currentValue){
            currentValue.style.display = "none";
        }
    );
    contents[ind].style.display = "block";
}
