import React, { Component } from 'react';
import {birdList, habitats} from './birdInfo.js';

class Quiz extends Component {
  choices;
  userChoice;
  quizFlow = [0, 1, 0, 1, 1]; // 0 is info page, 1 are quiz pages
  quizPointer = 0;
  
  constructor(){
    super()

    this.state = {
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
      if(this.choices.children[i].className === 'selected'){
        this.state.hasAnswered = true;
      }
    }
    // If user did not answer, alert them
    if (!this.state.hasAnswered) {
      alert('Please make a selection!');
    } else { // check answer is correct or wrong
      if(this.userChoice.id === "correct"){this.userChoice.className = "correct"}
      else{this.userChoice.className = "wrong"}
    }
  }

  handleNext = (event) => {
    if(this.quizFlow[this.quizPointer] === 0){
      this.quizPointer++;
      this.setState((prevState) => ({
        hasAnswered: false
      }));
    } else if (this.state.hasAnswered) {
      this.quizPointer++;
      this.setState((prevState) => ({
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
    if(this.quizPointer === 0){
      return(
        <div>
          <h2>This is a Blue Jay</h2>
          <img id="" src="Birds/BlueJay.jpg" width="200px" height="150px" />
          <img id="" src="Birds/BlueJay(1).jpg" width="200px" height="150px" />
          <audio controls>
            <source src="BirdAudios/BlueJayCall.wav" type="audio/wav" />
          </audio>
          <button className="next" onClick={this.handleNext}>Next</button>
        </div>
      );
    }else if (this.quizPointer === 1){
      return(
        <div>
          <h2>Select the bird that is a BlueJay</h2>
          <div className="options" onClick={this.handleChoices}>
            <img id="correct" src="Birds/BlueJay(2).jpg" width="200px" height="150px" />
            <img id="" src="Birds/TreeSwallow(2).jpg" width="200px" height="150px" />
            <img id="" src="Birds/HouseSparrow.jpg" width="200px" height="150px" />
            <img id="" src="Birds/EuropeanStarling.jpg" width="200px" height="150px" />      
          </div>
          <button className="answer" onClick={this.handleAnsButton}>Submit</button>
          <button className="next" onClick={this.handleNext}>Next</button>
        </div>
      );
    }else if (this.quizPointer === 2){
      return(
        <div>
          <h2>This is a TreeSwallow</h2>
          <img id="" src="Birds/TreeSwallow.jpg" width="200px" height="150px" />
          <img id="" src="Birds/TreeSwallow(1).jpg" width="200px" height="150px" />
          <audio controls>
            <source src="BirdAudios/BlueJayCall.wav" type="audio/wav" />
          </audio>
          <button className="next" onClick={this.handleNext}>Next</button>
        </div>
      );
    } else if (this.quizPointer === 3){
      return(
        <div>
          <h2>Select the bird that is a BlueJay</h2>
          <div className="options" onClick={this.handleChoices}>
            <img id="" src="Birds/TreeSwallow(2).jpg" width="200px" height="150px" />
            <img id="" src="Birds/HouseSparrow.jpg" width="200px" height="150px" />
            <img id="" src="Birds/EuropeanStarling.jpg" width="200px" height="150px" />      
            <img id="correct" src="Birds/BlueJay(2).jpg" width="200px" height="150px" />
          </div>
          <button className="answer" onClick={this.handleAnsButton}>Submit</button>
          <button className="next" onClick={this.handleNext}>Next</button>
        </div>
      );
    } else if (this.quizPointer === 4){
      return(
        <div>
          <h2>Select the bird that is a Tree Swallow</h2>
          <div className="options" onClick={this.handleChoices}>
            <img id="" src="Birds/HouseSparrow.jpg" width="200px" height="150px" />
            <img id="" src="Birds/BlueJay(2).jpg" width="200px" height="150px" />
            <img id="correct" src="Birds/TreeSwallow(2).jpg" width="200px" height="150px" />
            <img id="" src="Birds/EuropeanStarling.jpg" width="200px" height="150px" />      
          </div>
          <button className="answer" onClick={this.handleAnsButton}>Submit</button>
          <button className="next" onClick={this.handleNext}>Next</button>
        </div>
      );
    } else {
      return(
        <div>
          <h2>Congrats on Completing your first quiz</h2>
        </div>
      );
    }
  }
}

export default Quiz;