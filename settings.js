var keys = ["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab","Enter"];
var keysdown = {};
var movementKeys = {"up":"","down":"","left":"","right":""}
var speedDict = {"1":260,"2":240,"3":220,"4":200,"5":180,"6":160,"7":140,"8":120,"9":100,"10":80}
var speedSelected;

const small_ball_change = document.querySelector('.smallball')
const medium_ball_change = document.querySelector('.mediumball')
const big_ball_change = document.querySelector('.bigball')


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
            speedSelected = $("#levelOfSpeed").val();
            showPage('gamePage');
        }
        else{
            alert("Some of the keys are the same");
        }           
    }    
}


// Create random attributes for a new game
function generateRandomGame(){
    
    //Default Keys
   movementKeys["up"] = 38;
   movementKeys["down"] = 40;
   movementKeys["left"] = 37 ;
   movementKeys["right"] = 39;

   document.getElementById("up").value = "ArrowUp";
   document.getElementById("down").value = "ArrowDown";
   document.getElementById("left").value = "ArrowLeft";
   document.getElementById("right").value = "ArrowRight";
    
    // Random colors
      
    colorLargeBall = getRandomColor();
    document.getElementById("fivePoints").value = colorLargeBall;  

    colorMediumBall = getRandomColor();
    document.getElementById("fifteenPoints").value = colorMediumBall;
  
    colorSmallBall = getRandomColor();
    document.getElementById("twentyFivePoints").value = colorSmallBall;
   
     // Random num of balls
     numOfBalls = Math.floor(Math.random() * 40) + 50;
     document.getElementById("numOfBalls").value = numOfBalls;
    
    // Random time: Assumption - there is max value of 3 minuets
    timeFromUser = Math.floor(Math.random() * 60) + 60;
    document.getElementById("timerVal").value = timeFromUser;
    
    // Random num of monsters
    numOfGhost = Math.floor(Math.random() * 4) + 1;
    document.getElementById("Ghosts").value = numOfGhost;  

    speedSelected = Math.floor(Math.random() * 10) + 1;
    document.getElementById("levelOfSpeed").value = speedSelected;


}

// Clear the settings page every time the user opens it
function resetSettingsForm(){
	document.getElementById("settingsForm").reset();
	var error = document.getElementsByClassName("error");
	[...error].forEach(element => {
		element.classList.remove("error");
		element.innerHTML = "";
	})
    colorSmallBall = "#3251a8";
    colorMediumBall = "#ff0000";
    colorLargeBall = "#32a852";
	showPage('Settings');
}


// Clear adding in URL after submitting form
document.getElementById("startGame").addEventListener("click", function(event){
    event.preventDefault()
});

document.getElementById("randomGame").addEventListener("click", function(event){
    event.preventDefault()
});


function getRandomColor(){
    let letters = "0123456789ABCDEF";
    let color = "#";
    for(let i=0;i <6 ;i++){
        let indexOfLetters = Math.floor(Math.random() * 16);
        let toAdd = letters[indexOfLetters];
        color = color + toAdd;
    }
    return color;
}


/*
Enter keys to inputs
*/

// Enter key for the up input
document.getElementById("up").addEventListener("keydown",function(event){
    //only one value in the input field
    if(document.getElementById("up").value != ""){
        document.getElementById("up").value = "";
    }
    
    let letter = event.key;
    let c = event.which;
    movementKeys["up"] = c;
    
    // dont show chars twice
    if (((c < 48) || (c > 90)) && (c < 186)) {
        document.getElementById("up").value = letter;
    }
})

//Enter key for the down input
document.getElementById("down").addEventListener("keydown",function(event){
    //only one value in the input field
    if(document.getElementById("down").value != ""){
        document.getElementById("down").value = "";
    }
    
    let letter = event.key;
    let c = event.which;
    movementKeys["down"] = c;
    
    // dont show chars twice
    if (((c < 48) || (c > 90)) && (c < 186)) {
        document.getElementById("down").value = letter;
    }
})

// Enter key for the left input
document.getElementById("left").addEventListener("keydown",function(event){
    //only one value in the input field
    if(document.getElementById("left").value != ""){
        document.getElementById("left").value = "";
    }
    
    let letter = event.key;
    let c = event.which;
    movementKeys["left"] = c;
    
    // dont show chars twice
    if (((c < 48) || (c > 90)) && (c < 186)) {
        document.getElementById("left").value = letter;
    }
})

// Enter keys for the right input
document.getElementById("right").addEventListener("keydown",function(event){
    //only one value in the input field
    if(document.getElementById("right").value != ""){
        document.getElementById("right").value = "";
    }
    
    let letter = event.key;
    let c = event.which;
    movementKeys["right"] = c;
    
    // dont show chars twice
    if (((c < 48) || (c > 90)) && (c < 186)) {
        document.getElementById("right").value = letter;
    }
})


small_ball_change.addEventListener('change' , (event) => {
    console.log(event.target.value)
    colorSmallBall = event.target.value
});


medium_ball_change.addEventListener('change' , (event) => {
    console.log(event.target.value)
    colorMediumBall = event.target.value
});


big_ball_change.addEventListener('change' , (event) => {
    console.log(event.target.value)
    colorLargeBall = event.target.value
});
