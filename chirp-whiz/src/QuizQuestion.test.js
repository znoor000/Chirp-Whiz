import React from 'react';
import QuizQuestion from './quizComponents/QuizQuestion';
import Image from 'react-bootstrap/Image'
import AudioButton from './quizComponents/AudioButton'
import birdList from './birdList';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

const QuestionInfo = require('./quizComponents/QuizQuestion.js');

test('QuestionInfo returns both image and audio', () => {
    expect(
        QuestionInfo.QuestionInfo({
            qType: ['image', 'audio'],
            bird: {image: "a", sound: "b"}
        })).toStrictEqual(<div>
            <Image src="a" thumbnail style={{height: '300px'}}/>
            <AudioButton sound="b" />
          </div>);
});

it('test QuizQuestion renders', () => {
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
