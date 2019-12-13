import React from 'react';
import Tutorial from './Tutorial';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement, getByText } from '@testing-library/react'

const TutorialTest = require('./Tutorial.js');

// Unit tests

test('mock Math.random to randomize the correct bird', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.5);
    
    expect(TutorialTest.randomize('correctBird', 4)).toBe(2);
});

test('mocks random function for a different value', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.75);
    
    expect(TutorialTest.randomize('correctBird', 4)).toBe(3);
});

test('mocks Math.random for randomizing the learning bird array', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.5);
    spy.mockReturnValueOnce(0.75);
    spy.mockReturnValueOnce(0.25);
    spy.mockReturnValueOnce(0.6);
    
    expect(TutorialTest.randomize('learn', 4)).toStrictEqual([15, 22, 7, 18]);
});

test('tests checkAnswer to return correct', () => {
    expect(TutorialTest.checkAnswer(3, 3)).toBe("correct");
});

test('tests checkAnswer to return incorrect', () => {
    expect(TutorialTest.checkAnswer(3, 4)).toBe("incorrect");
});

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

it('Tutorial snapshot', () => {
    const container = render(<Tutorial />);
    expect(container.firstChild).toMatchSnapshot();
});

test("check if the practice quiz renders", () => {
    const {getByText} = render(<Tutorial />)
    expect(getByText("Start practice quiz")).toBeInTheDocument();
});

test("tests the start over button", () => {
    const {getByText} = render(<Tutorial />)
    fireEvent.click(getByText('Start practice quiz'))
    fireEvent.click(getByText('Start over'))
});

test("check that modal functions", () => {
    const {getAllByRole, getAllByText} = render(<Tutorial />)
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0])
    const close = getAllByText('Close');
    fireEvent.click(close[1])
});

test("check that modal functions", () => {
    const {getAllByRole, getAllByText} = render(<Tutorial />)
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0])
    const close = getAllByText('Close');
    fireEvent.click(close[1])
});

test("goes through the practice quiz and goes to quiz", () => {
    const {getByText, getAllByRole, queryByText} = render(<Tutorial />)
    fireEvent.click(getByText('Start practice quiz'))

    while(queryByText('Congrats!') == null) {
        const buttons = getAllByRole('button');
        fireEvent.click(buttons[3]);
        fireEvent.click(getByText('Next Question'));
    }
    
    fireEvent.click(getByText('Take the full quiz'))
});

test("goes through the practice quiz and goes to glossary", () => {
    const {getByText, getAllByRole, queryByText} = render(<Tutorial />)
    fireEvent.click(getByText('Start practice quiz'))

    while(queryByText('Congrats!') == null) {
        const buttons = getAllByRole('button');
        fireEvent.click(buttons[3]);
        fireEvent.click(getByText('Next Question'));
    }
    
    fireEvent.click(getByText('Learn more in the glossary'))
});