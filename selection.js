const choices = document.querySelector('div.options');

choices.addEventListener('click', event => {
  for (let i = 0; i < choices.children.length; ++i){
    choices.children[i].className = '';
  }
  if(event.target.tagName === "IMG"){
    event.target.className = "selected";
  }
});