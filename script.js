function opChange(num){
	let am = document.getElementsByClassName("img");
	let pgs = document.getElementsByClassName("page");
	for (let i=0; i<am.length; i++){
		am[i].className="img";
		pgs[i].className="page page-blocked";
	}
	am[num].className="img img-clicked";
	pgs[num].className="page"
	
	
}
