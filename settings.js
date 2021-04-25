var keys = ["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab","Enter"];
var keysdown = {};
var movementKeys = {"Up":"","Down":"","Left":"","Right":""}

// $("#up").addEventListener("keydown",function(e){keysdown[e.keyCode] = true;}, false);
// $("#up").addEventListener("keyup",function(e){keysdown[e.keyCode] = false},false);

$(function(){

    var validator2= $("#settingsForm").validate({
        rules: {
          up:{
            required: true         
          },
          down: {
            required: true         
          },  
          left: {
            required: true        
          },      
          right: {
            required: true         
          },
          numOfBalls:{
              required:true              
          },
          timerVal:{
              required:true             
          }
        },            
        messages:{
            up:{
                required: "Please enter key"          
              },
              down: {
                required: "Please enter key"         
              },  
              left: {
                required: "Please enter key"          
              },      
              right: {
                required: "Please enter key"          
              },
              numOfBalls:{
                required:"Please enter num of balls"              
            },
            timerVal:{
                required:"Please enter time"               
            } 
        },
        errorPlacement: function(label, element) {
            label.addClass('errorMsg');
            label.insertAfter(element);
          },
          wrapper: 'span'
    })
});

// Validate the settings form after send
function goToGame(){    
    let upVal = $("#up").val();
    if($('#settingsForm').valid()){
        let downVal = $("#down").val();
        let leftVal = $("#left").val();
        let rightVal = $("#right").val();        
        // Check if some of the keys are the same
        if((upVal != downVal) && (upVal!= leftVal) && (upVal!=rightVal) && (downVal!=leftVal) && (downVal != rightVal) && (leftVal != rightVal)){
            
            /**
             * Do the things to generate game
             */            
            movementKeys["Up"] = upVal;
            movementKeys["Down"] = downVal;
            movementKeys["Left"] = leftVal;
            movementKeys["Right"] = rightVal;
            numOfBalls = $("#numOfBalls").val();
            timeFromUser = $("#timerVal").val();
            bigBallsColor = $("#fivePoints").val();
            mediumBallsColor = $("#fifteenPoints").val();
            smallBallsColor = $("#twentyFivePoints").val();
            numOfGhost = $("#Ghosts").val();
            showPage('gamePage');
        }
        else{
            alert("Some of the keys are the same");
        }           
    }    
}

function generateRandomGame(){
    
    //Default Keys
   

    // Random colors
    let bigBallsColorNum = Math.floor(Math.random()*16777215).toString(16);
    colorLargeBall = "#" + bigBallsColorNum;
    document.getElementById("fivePoints").value = colorLargeBall;    

    let mediumBallsColorNum = Math.floor(Math.random()*16777215).toString(16);
    colorMediumBall = "#" + mediumBallsColorNum;
    document.getElementById("fifteenPoints").value = colorMediumBall;

    let smallBallsColorNum = Math.floor(Math.random()*16777215).toString(16); 
    colorSmallBall = "#" + smallBallsColorNum;
    document.getElementById("twentyFivePoints").value = colorSmallBall;
    

     // Random num of balls
     numOfBalls = Math.floor(Math.random() * 40) + 50;
     document.getElementById("numOfBalls").value = numOfBalls;
    
    // Random time: Assumption - there is max value of 3 minuets
    timeFromUser = Math.floor(Math.random() * 120) + 60;
    document.getElementById("timerVal").value = timeFromUser;
    
    // Random num of monsters
    numOfGhost = Math.floor(Math.random() * 4) + 1;
    document.getElementById("Ghosts").value = numOfGhost;
   
}

// Clear the settings page every time the user opens it
function resetSettingsForm(){
	document.getElementById("settingsForm").reset();
	var error = document.getElementsByClassName("error");
	[...error].forEach(element => {
		element.classList.remove("error");
		element.innerHTML = "";
	})

	showPage('Settings');
}