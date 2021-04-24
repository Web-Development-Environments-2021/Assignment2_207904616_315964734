var usersDict = {}
usersDict["k"] = ["k","Erez shalom","er@sh","2020-12-12"]


$(function(){

  // Method that checks if user exists in registration
  $.validator.addMethod('userExists',function(value,element){
    return !(value in usersDict);
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
            required: true ,
            textOnly: true 
          },      
          email: {
            required: true,
            email: true
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
        errorPlacement: function(label, element) {
            label.addClass('errorMsg');
            label.insertAfter(element);
          },
          wrapper: 'span'
        
      }
    })   

})

function AddUser(){
  alert("blablablaaaaa");
  if($('#RegisterForm').valid()){
    alert("if is passed");
    let userName=$("#Username").value;
    let password=$("#Password").value;
    let fullName=$("#FullName").value;
    let email=$("#email").value;
    let date=$("#date").value;
    usersDict[userName]=[password, fullName, email, birthDate];
  }
  // else{
  //   resetRegisterForm();
  // }
  console.log(usersDict);
}

// is user exists then move him to the Settings page in Login
function CheckIfUserExists(){
  // var userEntered = document.getElementById("LoginUsername").value();
  // alert(userEntered);
  // var passwordEntered = document.getElementById("LoginPassword").value();
  // alert(passwordEntered);
  var userEntered = $("#LoginUsername").val()
  var passwo
  alert($("#LoginUsername").val());
  if($("#LoginUsername").val() in usersDict){
    alert("user in dict")
    alert($("#LoginPassword").val());
   
    if( usersDict[userEntered][0].localeCompare($("#LoginPassword").val()) === 0){
     alert("pass in dict");
      // Do Show Page
     showPage('Settings');
    }
    else {
      alert("WrongPassword");
    }
  }
  else{
    alert("the user name doesn't exists");
  }

}
