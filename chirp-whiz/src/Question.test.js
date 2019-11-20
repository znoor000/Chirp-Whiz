import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import AudioButton from './AudioButton.js';
import Question from './Question.js';
import { AnswerButton } from './Question';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
const QuestionInfo = require('./Question.js');

test('Check answer correct', () => {
    const spy = jest.spyOn(document, 'getElementById')
    spy.mockReturnValueOnce({volume: 5, play() {}});

    expect(QuestionInfo.checkAnswer(2, 2,
        {current: {scrollIntoView() {}}})).toStrictEqual("correct");
    expect(spy).toHaveBeenCalledTimes(1)
})

test('Check answer correct', () => {
    const spy = jest.spyOn(document, 'getElementById')
    spy.mockReturnValueOnce({volume: 5, play() {}});

    expect(QuestionInfo.checkAnswer(2, 3,
        {current: {scrollIntoView() {}}})).toStrictEqual("incorrect");
    expect(spy).toHaveBeenCalledTimes(2)
})

test('Randomize with 0.5', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.5);

    expect(QuestionInfo.randomize("correctBird")).toBeLessThanOrEqual(4)
    expect(spy).toHaveBeenCalledTimes(1)
})