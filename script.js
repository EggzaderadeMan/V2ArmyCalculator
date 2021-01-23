var inf = 0;
var art = 0;
var hus = 0;
var limit = 0;
var mob = 0;
var mobDivs = 0;
var sixtyK = 1;
var clicked = false;
function calculate(){
	if (document.getElementById("limitInput").value>0){
		document.getElementById("infInput").disabled = false;
		document.getElementById("artInput").disabled = false;
		document.getElementById("husInput").disabled = false;
		document.getElementById("mobDivsInput").disabled = false;
		document.getElementById("infInput").style.backgroundColor = "rgba(0,0,0,0)";
		document.getElementById("artInput").style.backgroundColor = "rgba(0,0,0,0)";
		document.getElementById("husInput").style.backgroundColor = "rgba(0,0,0,0)";
		document.getElementById("mobDivsInput").style.backgroundColor = "rgba(0,0,0,0)";
		document.getElementById("allMobButton").style.backgroundColor = "rgba(0,0,0,0)";
	} else {
		document.getElementById("infInput").disabled = true;
		document.getElementById("artInput").disabled = true;
		document.getElementById("husInput").disabled = true;
		document.getElementById("mobDivsInput").disabled = true;
		document.getElementById("infInput").style.backgroundColor = "#DDD";
		document.getElementById("artInput").style.backgroundColor = "#DDD";
		document.getElementById("husInput").style.backgroundColor = "#DDD";
		document.getElementById("mobDivsInput").style.backgroundColor = "#DDD";
		document.getElementById("allMobButton").style.backgroundColor = "#DDD";
	}
	document.getElementById("mobDivsInput").max = whicheverSmaller();
	mobDivs = parseInt(document.getElementById("mobDivsInput").value);
	inf = parseInt(document.getElementById('infInput').value);
	art = parseInt(document.getElementById('artInput').value);
	hus = parseInt(document.getElementById('husInput').value);
	mob = parseInt(document.getElementById("mobInput").value);
	limit = parseInt(document.getElementById('limitInput').value)-(mobDivs*6*sixtyK);
	if(sixtyK==2){
		var amounts = [Math.floor(limit/20)*8,Math.floor(limit/20)*10,Math.floor(limit/20)*2];
	} else {
		var amounts = [Math.floor(limit/10)*4,Math.floor(limit/10)*5,Math.floor(limit/10)];
	}
	var inf = amounts[0]-inf;
	var art = amounts[1]-art;
	var hus = amounts[2]-hus;
	if(inf>0){
		document.getElementById("infReq").innerHTML = "+ "+inf+" Infantry";
		document.getElementById("infChange").innerHTML = "Train "+inf+" Infantry";
	} else if(inf==0){
		document.getElementById("infReq").innerHTML = "No Change in Infantry";
		document.getElementById("infChange").innerHTML = "Train no Infantry";
	} else {
		document.getElementById("infReq").innerHTML = inf+" Infantry";
		document.getElementById("infChange").innerHTML = "Remove "+(inf*-1)+" Infantry";
	}
	if(art>0){
		document.getElementById("artReq").innerHTML = "+ "+art+" Artillery";
	} else if(art==0){
		document.getElementById("artReq").innerHTML = "No Change in Artillery";
	} else {
		document.getElementById("artReq").innerHTML = art+" Artillery";
	}
	if(hus>0){
		document.getElementById("husReq").innerHTML = "+ "+hus+" Hussar";
	} else if(hus==0){
		document.getElementById("husReq").innerHTML = "No Change in Hussar";
	} else {
		document.getElementById("husReq").innerHTML = hus+" Hussar";
	}
	
	if((mobDivs*5*sixtyK)>0){
		document.getElementById("artMobReq").innerHTML = "+ "+(mobDivs*5*sixtyK)+" Artillery";
	} else if((mobDivs*5*sixtyK)==0){
		document.getElementById("artMobReq").innerHTML = "No Change in Artillery";
	} else {
		document.getElementById("artMobReq").innerHTML = (((mobDivs*5*sixtyK))*-1)+" Artillery";
	}
	if((mobDivs*sixtyK)>0){
		document.getElementById("husMobReq").innerHTML = "+ "+(mobDivs*sixtyK)+" Hussar";
	} else if((mobDivs*sixtyK)==0){
		document.getElementById("husMobReq").innerHTML = "No Change in Hussar";
	} else {
		document.getElementById("husMobReq").innerHTML = (((mobDivs*sixtyK))*-1)+" Hussar";
	}
	if((mobDivs*5*sixtyK)+art>0){
		document.getElementById("artChange").innerHTML = "Train "+((mobDivs*5*sixtyK)+art)+" Artillery";
	} else if((mobDivs*5*sixtyK)+art==0){
		document.getElementById("artChange").innerHTML = "Train no Artillery";
	} else {
		document.getElementById("artChange").innerHTML = "Remove "+(((mobDivs*5*sixtyK)+art)*-1)+" Artillery";
	}
	if((mobDivs*sixtyK)+hus>0){
		document.getElementById("husChange").innerHTML = "Train "+((mobDivs*sixtyK)+hus)+" Hussar";
	} else if((mobDivs*sixtyK)+hus==0){
		document.getElementById("husChange").innerHTML = "Train no Hussar";
	} else {
		document.getElementById("husChange").innerHTML = "Remove "+(((mobDivs*sixtyK)+hus)*-1)+" Hussar";
	}
	document.getElementById("limitOverflow").innerHTML = (limit-amounts[2]-amounts[1]-amounts[0])+" Left Over";
	document.getElementById("infNum").innerHTML = parseInt(document.getElementById("infInput").value) + inf;
	document.getElementById("artNum").innerHTML = parseInt(document.getElementById("artInput").value) + art;
	document.getElementById("husNum").innerHTML = parseInt(document.getElementById("husInput").value) + hus;
	document.getElementById("artMobNum").innerHTML = mobDivs*5*sixtyK;
	document.getElementById("husMobNum").innerHTML = mobDivs*sixtyK;
}
function whicheverSmaller(){
	if(mob<limit){
		return Math.floor(mob/(6*sixtyK));
	} else {
		return Math.floor(document.getElementById("limitInput").value/(6*sixtyK));
	}
}
function switchSize(){
	if(document.getElementById("sixtyKCheck").checked){
		sixtyK = 2;
		document.getElementById("mobDivsInput").max = whicheverSmaller();
		if(document.getElementById("mobDivsInput").value > document.getElementById("mobDivsInput").max){
			document.getElementById("mobDivsInput").value = document.getElementById("mobDivsInput").max;
		}
		calculate();
	} else {
		sixtyK = 1;
		calculate();
	}
}
function allMob(){
	document.getElementById("mobDivsInput").value = document.getElementById("mobDivsInput").max;
	calculate();
}
function unclick(){
	clicked = false;
}
function arrow(up,type){
	if(document.getElementById("infInput").disabled==false){
		clicked = true;
	}
	up = parseInt(up);
	setTimeout(function(){
		if(clicked){
			var tick = setInterval(interval,50);
			function interval(){
				if(clicked==false){
					clearInterval(tick);
				}
				if(type=="limit"){
					limit = limit+up;
					if(limit<0){limit = 0;}
					document.getElementById("limitInput").value = limit;
				} else if(type=="inf"&&(document.getElementById("infInput").disabled==false)){
					inf = inf+up;
					if(inf<0){inf = 0;}
					document.getElementById("infInput").value = inf;
				} else if(type=="art"&&(document.getElementById("artInput").disabled==false)){
					art = art+up;
					if(art<0){art = 0;}
					document.getElementById("artInput").value = art;
				} else if(type=="hus"&&(document.getElementById("husInput").disabled==false)){
					hus = hus+up;
					if(hus<0){hus = 0;}
					document.getElementById("husInput").value = hus;
				} else if(type=="mob"){
					mob = mob+up;
					if(mob<0){mob = 0;}
					document.getElementById("mobInput").value = mob;
				} else if(type=="mobDivs"&&(document.getElementById("mobDivsInput").disabled==false)){
					mobDivs = mobDivs+up;
					if(mobDivs<0){mobDivs = 0;}
					if(mobDivs>document.getElementById("mobDivsInput").max){
						document.getElementById("mobDivsInput").value = document.getElementById("mobDivsInput").max;
					} else {
						document.getElementById("mobDivsInput").value = mobDivs;
					}
				}
				calculate();
			}
		}
	}, 800);
	if(type=="limit"){
		limit = limit+up;
		if(limit<0){limit = 0;}
		document.getElementById("limitInput").value = limit;
	} else if(type=="inf"&&(document.getElementById("infInput").disabled==false)){
		inf = inf+up;
		if(inf<0){inf = 0;}
		document.getElementById("infInput").value = inf;
	} else if(type=="art"&&(document.getElementById("artInput").disabled==false)){
		art = art+up;
		if(art<0){art = 0;}
		document.getElementById("artInput").value = art;
	} else if(type=="hus"&&(document.getElementById("husInput").disabled==false)){
		hus = hus+up;
		if(hus<0){hus = 0;}
		document.getElementById("husInput").value = hus;
	} else if(type=="mob"){
		mob = mob+up;
		if(mob<0){mob = 0;}
		document.getElementById("mobInput").value = mob;
	} else if(type=="mobDivs"&&(document.getElementById("mobDivsInput").disabled==false)){
		mobDivs = mobDivs+up;
		if(mobDivs<0){mobDivs = 0;}
		if(mobDivs>document.getElementById("mobDivsInput").max){
			document.getElementById("mobDivsInput").value = document.getElementById("mobDivsInput").max;
		} else {
			document.getElementById("mobDivsInput").value = mobDivs;
		}
	}
	calculate();
}