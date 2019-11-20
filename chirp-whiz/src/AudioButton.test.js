import React from 'react';
import ReactDOM from 'react-dom';
import AudioButton from './AudioButton';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

it("renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<AudioButton />,div);
});

it('test AudioButton renders', () => {
    const container = render(<AudioButton />)
    expect(container.firstChild).toMatchSnapshot();
});