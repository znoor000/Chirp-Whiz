import React from 'react';
import ResultPage from './quizComponents/ResultPage';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

// Integration tests

it('ResultPage snapshot', () => {
    const container = render(<ResultPage
        totalQs={5}
        correct={{}}
        incorrect={{}}
      />)
    expect(container.firstChild).toMatchSnapshot();
});

test("Test for if the results page accurately portrays empty results", () => {
    const {getByText} = render(<ResultPage
        totalQs={5}
        correct={{}}
        incorrect={{}}
      />)
    expect(getByText("You answered 0 out of 5 correct")).toBeInTheDocument();
});