import React from 'react';
import Home from './Home';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

const goToPage = require('./Home.js');

// Unit tests

describe('window.location', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it('mocks `reload`', () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  it('calls `reload`', () => {
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();
  });
});

// Integration tests

it('Home snapshot', () => {
    const container = render(<Home />)
    expect(container.firstChild).toMatchSnapshot();
});

test("test the quiz button on the home page", () => {
    const {getByText} = render(<Home />)
    expect(getByText("Chirp Whiz")).toBeInTheDocument();
    fireEvent.click(getByText('Go to quiz page'))
});

test("test the glossary button on the home page", () => {
    const {getByText} = render(<Home />)
    expect(getByText("Chirp Whiz")).toBeInTheDocument();
    fireEvent.click(getByText('Check out the glossary'))
});

test("test the user profile button on the home page", () => {
    const {getByText} = render(<Home />)
    expect(getByText("Chirp Whiz")).toBeInTheDocument();
    fireEvent.click(getByText('Go to your user profile'))
});

test("test the tutorial button on the home page", () => {
    const {getByText} = render(<Home />)
    expect(getByText("Chirp Whiz")).toBeInTheDocument();
    fireEvent.click(getByText('Try the tutorial'))
});

test('test for gotopage on false', () => {
    const spy = jest.spyOn(window.location, 'reload')
    spy.mockReturnValueOnce(false);
  
    expect(goToPage.goToPage()).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(0);
});