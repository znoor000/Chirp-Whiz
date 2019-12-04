import React from 'react';
import UserPage from './UserPage';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

const UserPageTest = require('./UserPage.js');

test('randomize to return val less than or equal to 4', () => {
    const spy = jest.spyOn(Number.prototype, 'toFixed')
    spy.mockReturnValueOnce(3);
  
    expect(UserPageTest.winPercentage(1, [0,0,0], [0,0,0])).toBe(3);
})


it('test UserPage renders', () => {
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

