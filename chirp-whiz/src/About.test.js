import React from 'react';
import About from './About';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

it('test About renders', () => {
    const container = render(<About />)    
    expect(container.firstChild).toMatchSnapshot();
});

test("Check if contact us heading is on the page", () => {
    const {getByText} = render(<About />)
    expect(getByText("Contact Us:")).toBeInTheDocument();
});