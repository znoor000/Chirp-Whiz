import React from 'react';
import Leaderboard from './Leaderboard';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

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

