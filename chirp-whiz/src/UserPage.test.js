import React from 'react';
import UserPage from './UserPage';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

const UserPageTest = require('./UserPage.js');

// Unit tests

test('mocking toFixed in winPercentage', () => {
    const spy = jest.spyOn(Number.prototype, 'toFixed')
    spy.mockReturnValueOnce(3);
  
    expect(UserPageTest.winPercentage(1, [0,1,0], [0,0,2])).toBe(3);
})

test('testing the percentage for winPercentage', () => {
    const spy = jest.spyOn(Number.prototype, 'toFixed')
  
    expect(UserPageTest.winPercentage(1, [0,1,0], [0,1,0])).toBe('50.00');
})

test('mocking toFixed in totalPercent', () => {
    const spy = jest.spyOn(Number.prototype, 'toFixed')
    spy.mockReturnValueOnce(4);
  
    expect(UserPageTest.totalPercent(2, 2)).toBe(4);
})

test('testing the percentage for totalPercentage', () => {
    const spy = jest.spyOn(Number.prototype, 'toFixed')
  
    expect(UserPageTest.totalPercent(2, 2)).toBe('50.00');
})

// Integration tests

it('UserPage snapshot', () => {
    const container = render(<UserPage 
        name='name'
        email='email'
        correct={[0,0,0]}
        incorrect={[0,0,0]}
      />)
    expect(container.firstChild).toMatchSnapshot();
});

test("Check if user profile is on the page", () => {
    const {getByText} = render(<UserPage 
        name='name'
        email='email'
        correct={[0,0,0]}
        incorrect={[0,0,0]}
      />)
    expect(getByText("User Profile")).toBeInTheDocument();
});

test("Check if correct email is on the page for test user", () => {
  const {getByText} = render(<UserPage 
      name='test'
      email='test'
      correct={[0,0,0]}
      incorrect={[0,0,0]}
    />)
  expect(getByText("placeholder email")).toBeInTheDocument();
});