import React, { Component } from 'react';
import {birdList, habitats} from './birdInfo.js';

class AudioButton extends Component {
  playAudio() { 
    let x = document.getElementById("bird");
    x.play();
  }

  render() {
    return (
      <div>
        <audio id="bird" controls>
          <source src={this.props.sound} type="audio/mpeg"></source>
        </audio>

        <button onClick={this.playAudio}>
          <div>Bird Call/Sound</div>
        </button>
      </div>
    );
  }
}

class ImageButton extends Component {
  answer() {
    console.log("nice");
  }

  render() {
    return (
      <div>
        <button>
          <img src={this.props.image} onClick={this.answer} />
          <div>{this.props.name}</div>
        </button>
      </div>
    );
  }
}

class Quiz extends Component {
    
  render(){
    return(
      <div>
        {/* <AudioButton sound={birdList[2].sound} /> */}
        <ImageButton name={birdList[1].name} image={birdList[1].image} />
        <ImageButton name={birdList[2].name} image={birdList[2].image} />
        <ImageButton name={birdList[3].name} image={birdList[3].image} />
        <ImageButton name={birdList[4].name} image={birdList[4].image} />
      </div>
    );
  }
}

export default Quiz;
