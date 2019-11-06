const choices = document.querySelector('div.options');
const ansButton = document.querySelector('button.answer');
let hasAnswered = false;

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
    }
  }
});

ansButton.addEventListener('click', () => {
  for (let i = 0; i < choices.children.length; ++i){
    if(choices.children[i].className == 'selected'){
      hasAnswered = true;
    }
  }
  if (!hasAnswered) {
    alert('Please make a selection!');
  }
});