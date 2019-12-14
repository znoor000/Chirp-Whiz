import React from 'react';

/*
  Simple audio button used in many features in the app. Prop is a link to
  the sound clip that's meant to be played. Looks different depending on the
  browser. Meant to play bird audio.
*/

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