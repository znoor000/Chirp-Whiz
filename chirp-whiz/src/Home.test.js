import React from 'react';
import Home from './Home';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

const goToPage = require('./Home.js');

it('test Home renders', () => {
    const container = render(<Home />)
    expect(container.firstChild).toMatchSnapshot();
});

test("check if we're at home", () => {
    const {getByText} = render(<Home />)
    expect(getByText("Chirp Whiz")).toBeInTheDocument();
    fireEvent.click(getByText('Go to quiz page'))
});

test("check if we're at home", () => {
    const {getByText} = render(<Home />)
    expect(getByText("Chirp Whiz")).toBeInTheDocument();
    fireEvent.click(getByText('Check out the glossary'))
});

test('test for gotopage on false', () => {
    const spy = jest.spyOn(window.location, 'reload')
    spy.mockReturnValueOnce(false);
  
    expect(goToPage.goToPage()).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(0);
});

test('test for gotopage on true', () => {
    const spy = jest.spyOn(window.location, 'reload')
    spy.mockReturnValueOnce(true);
  
    expect(goToPage.goToPage()).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(0);
});