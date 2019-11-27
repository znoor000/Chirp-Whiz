import React from 'react';
import AnswerPage from './quizComponents/AnswerPage';
import birdList from './birdList';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

it('test AnswerPage renders', () => {
    const container = render(<AnswerPage answerType="correct" bird={birdList[0]} />)
    expect(container.firstChild).toMatchSnapshot();
});

test("check if we're at answer page with correct answer", () => {
    const {getByText} = render(<AnswerPage answerType="correct" bird={birdList[0]} />)
    expect(getByText("Correct!")).toBeInTheDocument();
});

test("check if we're at answer page with incorrect answer", () => {
    const {getByText} = render(<AnswerPage answerType="incorrect" bird={birdList[0]} />)
    expect(getByText("Incorrect...")).toBeInTheDocument();
});