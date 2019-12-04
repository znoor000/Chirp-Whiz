import React from 'react';
import Leaderboard from './Leaderboard';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

const LeaderboardTest = require('./Leaderboard.js');

test('randomize to return val less than or equal to 4', () => {
    expect(LeaderboardTest.compare({score: 3}, {score: 4})).toBe(-1);
})

test('randomize to return val less than or equal to 4', () => {
    expect(LeaderboardTest.compare({score: 4}, {score: 3})).toBe(1);
})

it('test Leaderboard renders', () => {
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

