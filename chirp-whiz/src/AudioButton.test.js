import React from 'react';
import ReactDOM from 'react-dom';
import AudioButton from './AudioButton';

it("renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<AudioButton />,div);
});