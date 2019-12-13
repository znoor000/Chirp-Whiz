import React from 'react';
import ReactDOM from 'react-dom';
import AudioButton from './quizComponents/AudioButton';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

// Integration tests

it('AudioButton snapshot', () => {
    const container = render(<AudioButton />)
    expect(container.firstChild).toMatchSnapshot();
});

it("renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<AudioButton />,div);
});