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