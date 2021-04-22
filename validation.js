$(function(){

    $.validator.addMethod('passwordLength',function(value,element){
        return this.optional(element) || value.length >=6;
    })

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
            required: true
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
        UserName:{
            required:"Please enter user name"
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
