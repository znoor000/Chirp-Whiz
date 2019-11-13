import React, { Component } from 'react';
import {birdList, habitats} from './birdInfo.js';
import './Quiz.css';

class Quiz extends Component {
    render() {
      return(
        <div class="container justify-center flex-column">
          <h1>Quiz</h1>
          
          
            <h2>What is the answer for this question  ???????</h2>  
            <div class="choice-container">
              <p class="choice-prefix">1.</p>  
              <p class="choice-text" data-number="1">Choice 1</p>
            </div>
            <div class="choice-container">
              <p class="choice-prefix">2.</p>
              <p class="choice-text" data-number="2">Choice 2</p>
            </div>
            <div class="choice-container">
              <p class="choice-prefix">3.</p>
              <p class="choice-text" data-number="2">Choice 3</p>
            </div>
            <div class="choice-container">
              <p class="choice-prefix">4.</p>
              <p class="choice-text" data-number="2">Choice 4</p>
            </div>
          
        </div>

      );
    }
  }

  class Counter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 1
      };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
   }
   previous() {
    this.setState(state => ({
      count: state.count - 1
    }));
  }
   
    next() {
      this.setState(state => ({
        count: state.count + 1
      }));
    }
    render() {
      return (
        <div>
          <h2>Question {this.state.count}/10</h2>
          <button className='dec' onClick={this.previous}>Previous</button>
          <button className='reset' onClick={this.next}>Next</button>
          
        </div>
      );
    }
  };
  

export default Quiz;