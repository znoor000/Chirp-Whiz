import React from 'react';
import QuizQuestion from './quizComponents/QuizQuestion';
import birdList from './birdList';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

const QuestionInfo = require('./quizComponents/QuizQuestion.js');

// Integration tests

it('QuizQuestion snapshot', () => {
    const container = render(<QuizQuestion
        currentQuestion={2}
        questionNum={5}
        qType={['image', 'audio']}
        qBird={birdList[0]}
      />)
    expect(container.firstChild).toMatchSnapshot();
});

test("Check if question is on the page", () => {
    const {getByText} = render(<QuizQuestion
        currentQuestion={2}
        questionNum={5}
        qType={['image', 'audio']}
        qBird={birdList[0]}
      />)
    expect(getByText("Identify this bird:")).toBeInTheDocument();
});

test("Validate the current and max question numbers", () => {
    const {getByText} = render(<QuizQuestion
        currentQuestion={3}
        questionNum={10}
        qType={['image', 'audio']}
        qBird={birdList[0]}
      />)
    expect(getByText("Question number 3 of 10")).toBeInTheDocument();
});
