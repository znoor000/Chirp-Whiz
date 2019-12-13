import React from 'react';
import Leaderboard from './Leaderboard';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

const LeaderboardTest = require('./Leaderboard.js');

// Unit tests

test('mock Number and Array function for totalPercent testing', () => {
    const spy = jest.spyOn(Number.prototype, 'toFixed')
    const spy2 = jest.spyOn(Array.prototype, 'reduce')
    spy.mockReturnValueOnce(3);
    spy2.mockReturnValueOnce(4);
  
    expect(LeaderboardTest.totalPercent({correct: [0,0,0,], incorrect: [0,0,0]})).toBe(3);
})

test('mock Array.push and totalPercent for scorify testing', () => {
    const spy = jest.spyOn(Array.prototype, 'push')
    const spy2 = jest.spyOn(LeaderboardTest, 'totalPercent')
    spy.mockReturnValueOnce(3);
    spy2.mockReturnValueOnce(4);
  
    expect(LeaderboardTest.scorify({correct: [0,0,0], incorrect: [0,0,0]})).toStrictEqual([]);
})

test('mock Array.push to test for its usage in functions', () => {
    const spy = jest.spyOn(Array.prototype, 'push')
  
    expect(spy).toHaveBeenCalledTimes(5);
    spy.mockRestore();
})

// Integration tests

it('Leaderboard snapshot', () => {
    const container = render(<Leaderboard
        users={{
            name: 'l',
            email: 'l',
            correct: [0,0,0],
            incorrect: [0,0,0]
        }}
    />)

    expect(container.firstChild).toMatchSnapshot();
});

test("check if category in leaderboard renders", () => {
    const {getByText} = render(<Leaderboard
        users={{
            name: 'l',
            score: 0.00
        }}
    />)

    expect(getByText("Username")).toBeInTheDocument();
});

test("check if category in leaderboard renders", () => {
    const {getByText} = render(<Leaderboard
        users={{
            name: 'l',
            score: 0.00
        }}
    />)

    expect(getByText("Username")).toBeInTheDocument();
});