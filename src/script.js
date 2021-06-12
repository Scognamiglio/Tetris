tdefault = 2000 // microseconde
tupgrade = 100 // augmenter pour réduire la vitesse d'augmentation.
var longueur = 10
var largeur = 10
var perdu = false
var pos = [0,0]
var forme = [0,0]
var type = 
[
	[
		[[0,0],[0,1],[0,2],[1,1]],
		[[0,0],[1,0],[2,0],[1,1]],
		[[1,0],[1,1],[1,2],[0,1]],
		[[0,2],[1,2],[2,2],[1,1]]
	],
	[
		[[0,0],[0,1],[1,0],[2,0]],
		[[0,2],[0,1],[1,2],[2,2]],
		[[0,2],[2,1],[1,2],[2,2]],
		[[0,0],[2,1],[1,0],[2,0]],
	],

]

var act = 0
var time = 1
var score = 0
const deplacement = {39 : [0,1], 37 : [0,-1], 40 : [1,0]}
const racc = [39,37,40,32]


$( document ).ready(function() {
	html = "<table style='border-spacing: 0;'>";
    for(x=0;x<longueur;x++){
    	html += "<tr id='x"+x+"'>"
    	for(y=0;y<largeur;y++){
    		html += "<td id='y"+y+"'></td>"
    	}
    	html += "</tr>"
    }
    $("#tetris").attr('style','width:'+(largeur*5)+'em;height:'+(longueur*5)+'em')
    $("#tetris").html(html)

    genereBloc()
	act = 0
	setTimeout(theTimePass,tdefault - (tdefault * (time/tupgrade)))
});

function theTimePass() {

	pos[0]++
	if(newPos() == false){
		pos[0]--
	}
	time++
	if(!perdu && time<tupgrade){
		setTimeout(theTimePass,tdefault - (tdefault * (time/tupgrade)))
	}
}

function touche(t){
	if(!racc.includes(event.keyCode)){
		return null
	}

	if(perdu){
		alert('Tu as perdu avec un score de '+score+', recharge la page !')
		return null
	}

	if(event.keyCode==32){
		alterne()
	}

	if(deplacement[event.keyCode]){
		d = deplacement[event.keyCode]
		pos = [pos[0]+d[0],pos[1]+d[1]]
		if(newPos() == false){
			pos = [pos[0]-d[0],pos[1]-d[1]]
		}
	}

}


function genereBloc(){
	act = 0;
	score++;
	forme[0] = Math.floor(Math.random() * (type.length))
	forme[1] = Math.floor(Math.random() * (type[forme[0]].length))

	debut = Math.floor(Math.random() * (largeur-4));
	pos = [0,debut]
	newPos()
}

function position(){
	$('.selected').removeClass('selected')
	coor = type[forme[0]][forme[1]]
	for(i=0;i<coor.length;i++){
		$('#x'+(pos[0]+coor[i][0])+' > #y'+ (pos[1]+coor[i][1])).attr('class','selected')
	}
	act++
}


function alterne(){
	old = forme[1]
	newForm = (type[forme[0]].length > forme[1]+1) ? forme[1]+1 : 0
	forme[1] = newForm
	if(newPos() == false){
		forme[1] = old
	}
}

function newPos() {
	coor = type[forme[0]][forme[1]]
	for(i=0;i<coor.length;i++){
		x = pos[0]+coor[i][0]
		y = pos[1]+coor[i][1]
		selector = "#x"+x+" > #y"+y


		if(x==longueur || $(selector+".fixe").length==1){
			fixe()
			return true
		}


		if($(selector).length==0){
			return false
		}

	}
	position()
}

function fixe() {
	if(act!=0){
		$('.selected').addClass("fixe").removeClass('selected')
		genereBloc()
	}else{
		perdu = true
		position()
		$('.selected').addClass("die").removeClass('selected')
		setTimeout(function(){alert('perdu, tu as '+score+" figure !")}, 100);
	}
}