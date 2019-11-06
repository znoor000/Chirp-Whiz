const choices = document.querySelector('div.options');
const ansButton = document.querySelector('button.answer');
let hasAnswered = false;
let userChoice;

choices.addEventListener('click', event => {
  // If user has not submited answer yet
  if(!hasAnswered){
    // Clear out previous selection
    for (let i = 0; i < choices.children.length; ++i){
      choices.children[i].className = '';
    }
    // If user clicked on an img tag, give that tag a class
    if(event.target.tagName === "IMG"){
      event.target.className = "selected";
      // Save user choice
      userChoice = event.target;
    }
  }
});

ansButton.addEventListener('click', () => {
  // Check if user has made a selection
  for (let i = 0; i < choices.children.length; ++i){
    if(choices.children[i].className == 'selected'){
      hasAnswered = true;
    }
  }
  // If user did not answer, alert them
  if (!hasAnswered) {
    alert('Please make a selection!');
  } else {
    if(userChoice.id == "1"){userChoice.className = "correct"}
    else{userChoice.className = "wrong"}
  }
});