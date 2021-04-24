// Get the modal
var modal = document.getElementById("About");

// Get the button that opens the modal
var btn = document.getElementById("buttomAbout");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

var keys=[33,34,35,36,37,38,39,40];

document.addEventListener('keydown', function(e) {
     var key = e.which;

      if(keys.includes(key)) {
          e.preventDefault();
          return false;
      }
      if (key == 27){
        modal.style.display = "none";
      }
      return true;
});
