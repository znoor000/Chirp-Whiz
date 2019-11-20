import React from 'react';

function AudioButton(props) {
      return (
        <div data-testid='audioButton'>
          <audio controls id="birdQAudio">
            <source src={props.sound} type="audio/mpeg"></source>
          </audio>
        </div>
      );
}

export default AudioButton;