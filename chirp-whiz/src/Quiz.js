import React, { Component } from 'react';
import {birdList, habitats} from './birdInfo.js';

class Quiz extends Component {
  choices;
  userChoice;
  hasAnswered = false;

  handleChoices = (event) => {
    // If user has not submited answer yet
    if(!this.hasAnswered){
      // Clear out previous selection
      for (let i = 0; i < this.choices.children.length; ++i){
        this.choices.children[i].className = '';
      }
      // If user clicked on an img tag, give that tag a class
      if(event.target.tagName === "IMG"){
        event.target.className = "selected";
        // Save user choice
        this.userChoice = event.target;
      }
    }
  }

  handleAnsButton = (event) => {
    // Check if user has made a selection
    for (let i = 0; i < this.choices.children.length; ++i){
      if(this.choices.children[i].className == 'selected'){
        this.hasAnswered = true;
      }
    }
    // If user did not answer, alert them
    if (!this.hasAnswered) {
      alert('Please make a selection!');
    } else {
      if(this.userChoice.id == "1"){this.userChoice.className = "correct"}
      else{this.userChoice.className = "wrong"}
    }
  }

  componentDidMount(){
    this.choices = document.querySelector('div.options');
  }

  render() {
    return(
      <div>
        <h2>Select the bird that has this call:{this.userChoice}</h2>
        <audio controls>
          <source src="BirdAudios/pigeons.wav" type="audio/wav" />
        </audio>
        <div className="options" onClick={this.handleChoices}>
          <img id="1" src="Birds/RockPigeon.jpg" width="200px" />
          <img id="2" src="Birds/MourningDove.jpg" width="200px" />
          <img id="3" src="Birds/HouseSparrow.jpg" width="200px" />
          <img id="4" src="Birds/EuropeanStarling.jpg" width="200px" />      
        </div>
        <button className="answer" onClick={this.handleAnsButton}>Submit</button>
      </div>
    );
  }
}

export default Quiz;