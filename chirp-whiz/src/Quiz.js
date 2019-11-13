import React, { Component } from 'react';
import {birdList, habitats} from './birdInfo.js';

class Quiz extends Component {
  choices = document.querySelector('div.options');
  ansButton = document.querySelector('button.answer');
  hasAnswered = false;
  userChoice = 69;
  
  constructor(){
    super()

    this.state = {
      hasAnswered: false
    }
  }

  // handleChoices = (event) => {
  //   choices = document.querySelector('div.options');
  //   ansButton = document.querySelector('button.answer');
  //   // If user has not submited answer yet
  //   if(!this.state.hasAnswered){
  //     // Clear out previous selection
  //     for (let i = 0; i < choices.children.length; ++i){
  //       choices.children[i].className = '';
  //     }
  //     // If user clicked on an img tag, give that tag a class
  //     if(event.target.tagName === "IMG"){
  //       event.target.className = "selected";
  //       // Save user choice
  //       userChoice = event.target;
  //     }
  //   }
  // }

  render() {
    return(
      <div>
        <h2>Select the bird that has this call:{this.userChoice}</h2>
        <audio controls>
          <source src="BirdAudios/pigeons.wav" type="audio/wav" />
        </audio>
        <div class="options" onClick={this.handleChoices}>
          <img id="1" src="Birds/RockPigeon.jpg" width="200px" />
          <img id="2" src="Birds/MourningDove.jpg" width="200px" />
          <img id="3" src="Birds/HouseSparrow.jpg" width="200px" />
          <img id="4" src="Birds/EuropeanStarling.jpg" width="200px" />      
        </div>
        <button class="answer">Submit</button>
      </div>
    );
  }
}

export default Quiz;