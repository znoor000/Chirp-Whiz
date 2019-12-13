import React from 'react';
import About from './About';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

// Integration tests

it('About snapshot', () => {
    const container = render(<About />)    
    expect(container.firstChild).toMatchSnapshot();
});

test("Check if contact us heading is on the page", () => {
    const {getByText} = render(<About />)
    expect(getByText("Contact Us:")).toBeInTheDocument();
});

test("Check if credits heading is on the page", () => {
    const {getByText} = render(<About />)
    expect(getByText("Credits:")).toBeInTheDocument();
});