const usersDict = {}
usersDict["k"] = ["k","Erez shalom","er@sh","2020-12-12"]

$(function(){

  // Method that checks if user exists in registration
  $.validator.addMethod('userExists',function(value,element){
    return !(value in usersDict)
  })

  // Check that the password has at least 6 chars
    $.validator.addMethod('passwordLength',function(value,element){
        return this.optional(element) || value.length >=6;
    })

    // Check that there is one char and one digit in password
    $.validator.addMethod('passwordDigitChar',function(value,element){
        return this.optional(element) || /\d/.test(value)
        && /[a-z]/i.test(value);
    })

    // Check that there are no digits in the full name 
    $.validator.addMethod("textOnly",
      function (value, element) {
  
          var numArray = 
              ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
          var containsNumber = false;
  
          $.each(value.split(''), function () {
              if (numArray.indexOf($(this)[0]) > -1) {
                  containsNumber = true;
                  return false;
              }
          });
  
          return !containsNumber;
      }, 
    );

    var validator= $("#RegisterForm").validate({
        rules: {
          Username:{
            required: true,
            userExists: true
          },
          Password: {
            required: true,
            passwordLength: true,
            passwordDigitChar:true 
          },  
          FullName: {
            required: true,
            textOnly: true 
          },      
          email: {
            required: true,
            email: true
          },
          date:{
            required: true
          }
        },            
        messages: {
        Username:{
            required:"Please enter user name",
            userExists:"The user name exists. try another one"
        },
        Password: {
            required: "Please enter password",
            passwordLength: "Please enter at least 6 characters",
            passwordDigitChar: "At Least one number and one char"
        },
        FullName: {
            required: "Please enter full name",
            textOnly: "Full name shouldn't contain digits"   
        },      
        email: {
            required: 'Please enter an email address.',
            email: 'Please enter a <b>valid</b> email address.'            
        },
        date:{
          required:"Please choose date"
        },
        errorPlacement: function(label, element) {
            label.addClass('errorMsg');
            label.insertAfter(element);
          },
          wrapper: 'span'
        
      }
    })   

})

function AddUser(){
  if($('#RegisterForm').valid()){
    let userName = $("#Username").val();
    let password= $("#Password").val();
    let fullName= $("#FullName").val();
    let email= $("#email").val();
    let date=$("#date").val();
    usersDict[userName]=[password, fullName, email, date];
    console.log(usersDict);
    showPage('Welcome');
    alert("Registration executed successfully");
  }  
}  
  

// is user exists then move him to the Settings page in Login
function CheckIfUserExists(){  
  
  var userEntered = $("#LoginUsername").val()
  var passwordEntered = $("#LoginPassword").val()
  console.log("Hello");

  if(userEntered in usersDict){    
    if(usersDict[userEntered][0].localeCompare(passwordEntered) === 0){
     // Do Show settings
     resetSettingsForm();
     document.getElementById("settingsMenu").style.display = "block"
     document.getElementById("logoutMenu").style.display = "block"
     document.getElementById("loginMenu").style.display = "none"
     document.getElementById("registerMenu").style.display = "none"

    }
    else {
      alert("WrongPassword");
    }
  }
  else{
    alert("the user name doesn't exists");
  }

}

function resetLoginForm(){
	// document.getElementById("LoginUsername").value = '';
  // document.getElementById("LoginPassword").value = '';
  // showPage('Login');
  document.getElementById("LoginForm").reset();
	var error = document.getElementsByClassName("error");
	[...error].forEach(element => {
		element.classList.remove("error");
		element.innerHTML = "";
	})
	showPage('Login');
}

// Dont add more URL after login form 
document.getElementById("SignInButton").addEventListener("click", function(event){
  event.preventDefault()
});


// Dont add more URL after register form 
document.getElementById("SignUpFinal").addEventListener("click", function(event){
  event.preventDefault()
});


function logout(){
  document.getElementById("settingsMenu").style.display = "none"
  document.getElementById("logoutMenu").style.display = "none"
  document.getElementById("loginMenu").style.display = "block"
  document.getElementById("registerMenu").style.display = "block"
  showPage("Welcome")
}
