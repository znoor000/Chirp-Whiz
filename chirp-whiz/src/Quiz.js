import React, { Component } from 'react';
import {birdList, habitats} from './birdInfo.js';

class Quiz extends Component {
  choices;
  userChoice;
  
  constructor(){
    super()

    this.state = {
      quizFlow: [0, 1, 0, 1, 1], // 0 is info page, 1 are quiz pages
      quizPointer: 0,
      hasAnswered: true
    }
  }

  handleChoices = (event) => {
    // If user has not submited answer yet
    if(!this.state.hasAnswered){
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
        this.state.hasAnswered = true;
      }
    }
    // If user did not answer, alert them
    if (!this.state.hasAnswered) {
      alert('Please make a selection!');
    } else { // check answer is correct or wrong
      if(this.userChoice.id == "1"){this.userChoice.className = "correct"}
      else{this.userChoice.className = "wrong"}
    }
  }

  handleNext = (event) => {
    if(this.state.quizFlow[this.state.quizPointer] === 0){
      this.setState((prevState) => ({
        quizPointer: prevState.quizPointer + 1,
        hasAnswered: false
      }));
    } else if (this.state.hasAnswered) {
      this.setState((prevState) => ({
        quizPointer: prevState.quizPointer + 1,
        hasAnswered: false
      }));
    }
  }

  componentDidMount(){
    this.choices = document.querySelector('div.options');
  }

  componentDidUpdate(){
    this.choices = document.querySelector('div.options');
  }

  render() {
    if(this.state.quizFlow[this.state.quizPointer] === 0){
      return(
        <div>
          <h2>This is a Blue Jay</h2>
          <img id="1" src="Birds/BlueJay.jpg" width="200px" height="150px" />
          <img id="2" src="Birds/BlueJay(1).jpg" width="200px" height="150px" />
          <audio controls>
            <source src="BirdAudios/BlueJayCall.wav" type="audio/wav" />
          </audio>
          <button className="next" onClick={this.handleNext}>Next</button>
        </div>
      );
    }else if (this.state.quizPointer === 1){
      return(
        <div>
          <h2>Select the bird that is a BlueJay</h2>
          <div className="options" onClick={this.handleChoices}>
            <img id="1" src="Birds/BlueJay(2).jpg" width="200px" height="150px" />
            <img id="2" src="Birds/TreeSwallow(2).jpg" width="200px" height="150px" />
            <img id="3" src="Birds/HouseSparrow.jpg" width="200px" height="150px" />
            <img id="4" src="Birds/EuropeanStarling.jpg" width="200px" height="150px" />      
          </div>
          <button className="answer" onClick={this.handleAnsButton}>Submit</button>
          <button className="next" onClick={this.handleNext}>Next</button>
        </div>
      );
    }else if (this.state.quizPointer === 2){
      return(
        <div>
          <h2>This is a Blue Jay</h2>
          <img id="1" src="Birds/BlueJay.jpg" width="200px" height="150px" />
          <img id="2" src="Birds/BlueJay(1).jpg" width="200px" height="150px" />
          <audio controls>
            <source src="BirdAudios/BlueJayCall.wav" type="audio/wav" />
          </audio>
          <button className="next" onClick={this.handleNext}>Next</button>
        </div>
      );
    }
  }
}

export default Quiz;