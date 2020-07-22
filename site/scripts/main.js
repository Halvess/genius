var Menu = document.getElementsByClassName("menu");
var Playable = document.getElementsByClassName("playable");
var dificuldade = document.getElementsByClassName("dificuldade-botao");

var playerClick = "";
var positionArray = [];
var stage = 0;
var j = 0;
var timeOut = 1500;
var IntervalClock = "";
var counter = 0;
var game = false;
var textEstagio = document.getElementById("estagio");
var textRecorde = document.getElementById("recorde");
var playerMsg = document.getElementById("player-msg");

const msgTimer = 1500;

const black = "rgb(0, 0, 0)";
const white = "rgb(255, 255, 255)"; 

var matrixBlink = black;
var colorStatus = ""

var BackgroundElements = document.getElementsByClassName("background-change");
var MatrixElements = document.getElementsByClassName("null-null");

for (var i=0; i<dificuldade.length;i++){
    var dificuldadePress = document.getElementById(dificuldade[i].id);
    dificuldadePress.addEventListener("click", function(){
        switch (event.target.id){
            case "easy": 
                timeOut = 2000;
                document.getElementById("easy").style.opacity = 0.5;
                document.getElementById("medium").style.opacity = 1;
                document.getElementById("hard").style.opacity = 1;
                console.log("easy");break;
            case "medium": 
                timeOut = 1500; 
                document.getElementById("easy").style.opacity = 1;
                document.getElementById("medium").style.opacity = 0.5;
                document.getElementById("hard").style.opacity = 1;
                console.log("medium"); break;
            case "hard": 
                timeOut = 300; 
                document.getElementById("easy").style.opacity = 1;
                document.getElementById("medium").style.opacity = 1;
                document.getElementById("hard").style.opacity = 0.5;
                console.log("hard"); break;
            default: 
                timeOut = 1500; break;
        }
    })
}

for (var i = 0; i<BackgroundElements.length; i++){
    var BackgroundPress = document.getElementById(BackgroundElements[i].id);
    BackgroundPress.addEventListener("click", function(){
        if (event.target.id == "background-preto"){
            document.body.style.backgroundColor = black;
            if (Playable[0].style.backgroundColor == white || Playable[0].style.backgroundColor == ""){
                matrixColor("branco")
            }
            else{matrixColor("preto")}
            setCapsWhite();
        }
        else if (event.target.id == "background-branco"){
            document.body.style.backgroundColor = white;
            if (Playable[0].style.backgroundColor == white || Playable[0].style.backgroundColor == ""){
                matrixColor("branco")
            }
            else{matrixColor("preto")}
            setCapsblack();
        }
    })
}

for (var i = 0; i<MatrixElements.length; i++){
    var MatrixPress = document.getElementById(MatrixElements[i].id);
    MatrixPress.addEventListener("click", function(){matrixColor(event.target.id)})
}


function matrixColor(id){
        var matrix = ["top-left","top-middle","top-right",
                     "middle-left","middle-middle","middle-right", 
                     "bottom-left","bottom-middle","bottom-right"];
        if (id == "preto"){
            colorStatus = black;
            for (var i = 0; i < matrix.length; i++){
                var matrixChange = document.getElementById(matrix[i])
                matrixChange.style.backgroundColor = black;
                if (document.body.style.backgroundColor == white || document.body.style.backgroundColor == ""){
                    matrixChange.style.borderColor = black;
                }
                else{
                    matrixChange.style.borderColor = white;
                }
                matrixBlink = white;
            }
        }
        else if (id == "branco"){
            colorStatus = white;
            for (var i = 0; i < matrix.length; i++){
                var matrixChange = document.getElementById(matrix[i])
                matrixChange.style.backgroundColor = white;
                if (document.body.style.backgroundColor == black){
                    matrixChange.style.borderColor = white;
                }
                else{
                    matrixChange.style.borderColor = black;
                }
                matrixBlink = black;
            }
        }
        }


var MenuPersonalizar = document.getElementById("personalizar-botao");
MenuPersonalizar.addEventListener("click", function(){    
    var ToggleStyle = document.getElementById("toggle-div");
    var Toggle = getComputedStyle(document.getElementById("toggle-div"));
    console.log(Toggle.visibility);
    if (Toggle.visibility == "hidden"){
        ToggleStyle.style.visibility = "visible"
    }
        else{
            ToggleStyle.style.visibility = "hidden";
        }
    });

    var Status = document.getElementById("status-botao");
    Status.addEventListener("click", function(){    
        var ToggleStyle = document.getElementById("menu-status");
        var Toggle = getComputedStyle(document.getElementById("menu-status"));
        if (Toggle.visibility == "hidden"){
            ToggleStyle.style.visibility = "visible"
        }
            else{
                ToggleStyle.style.visibility = "hidden";
            }
        });

    var dificuldade = document.getElementById("toggle-dificuldade");
    dificuldade.addEventListener("click", function(){    
        var ToggleStyle = document.getElementById("visible-botao");
        var Toggle = getComputedStyle(document.getElementById("visible-botao"));
        if (Toggle.visibility == "hidden"){
            ToggleStyle.style.visibility = "visible"
        }
            else{
                ToggleStyle.style.visibility = "hidden";
            }
        });

for (var i = 0; i< (Menu.length) ; i++){
    var menuPress = Menu[i];
        menuPress.addEventListener("click", function(){
        gameStart(event.target.id);
    })
    }



function random(){
    return Math.floor(Math.random() * Playable.length);
}

function defineEstagio(){
    positionArray[stage] = Playable[random()].id;
}

function mostrarEstagio(){
    playerMsg.textContent = "memorize a sequência"
    textEstagio.textContent = stage+1;
    IntervalClock = setInterval(function(){
        changeColor(document.getElementById(positionArray[counter]))
    }, timeOut)
}


function changeColor(element){
    var matrixStatus = getComputedStyle(element);
    var setCSS = document.getElementById(element.id);

    if (matrixStatus.backgroundColor == matrixBlink){
        if(matrixBlink == white || matrixBlink == ""){
            setCSS.style.background = black;
        }
        else{
            setCSS.style.background = white;
        }
        clearInterval(IntervalClock);
        if (counter != stage){
            counter++;
            mostrarEstagio();}
        else { 
            counter = 0;
            setTimeout(function(){
                playerMsg.textContent = "faça a sequência clicando nos botões"
            }, msgTimer)
            jogarEstagio();
        }
    }
    else{
        setCSS.style.background = matrixBlink;      
    }
}

var a = function(){
    playerClick = event.target.id;
    checkEstagio(playerClick);
    }

function jogarEstagio(){
    for (var i = 0; i< (Playable.length) ; i++){
        var buttonPress = Playable[i];
            buttonPress.addEventListener("click", a) 
        }
}

function checkEstagio(id){
    if (playerClick == ""){}
    else if (playerClick == positionArray[j]){
        console.log("NICE JOBE");
        if (j == stage){
            console.log("LEVEL COMPLETE");
            j = 0;
            textRecorde.textContent = stage+1;
            stage = stage + 1;
            playerMsg.textContent = "Nível completo!"
            setTimeout(function(){playerMsg.textContent = "Próximo nível"},2000);
            setTimeout(function(){
                defineEstagio();
                mostrarEstagio();}, 5000);
            for (var i = 0; i< (Playable.length) ; i++){
                var buttonPress = Playable[i];
                    buttonPress.removeEventListener("click", a) 
                }
        }
        else{
            j = j + 1;
        }
        }
    else{
        playerMsg.textContent = "sequência errada! tente novamente.";
        setTimeout(function(){gameStart("stop")}, 3000);
        }
    }


function setCapsWhite(){
    var teste = document.getElementsByTagName('*');
    for (var i=0; i<teste.length;i++){
        teste[i].style.color = white;
    }
}
    function setCapsblack(){
        var teste = document.getElementsByTagName('*');
        for (var i=0; i<teste.length;i++){
            teste[i].style.color = black;
        }
    }

function gameStart(id){
    if (id == "start"){
        if (game){}
        else{
            game = true;
            console.log("jogo iniciado");
                defineEstagio();
                mostrarEstagio();    
        }
    }
    else if (id == "stop"){
        if (colorStatus == white || colorStatus == ""){
            matrixColor("branco")
        }
        else if (colorStatus = black){
            matrixColor("preto")
        }
        textEstagio.textContent = "0";
        playerMsg.textContent = "";
        var x = window.setTimeout(function(){}, 0);
        while (x--){
            window.clearTimeout(x);
        }
        game = false;
        counter = 0;
        clearInterval(IntervalClock)
        positionArray = [];
        playerClick = "";
        stage = 0;
        j=0;
        }
    }