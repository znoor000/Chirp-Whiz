import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import AudioButton from './AudioButton.js';
import Question from './Question.js';
import { AnswerButton } from './Question';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const QuestionInfo = require('./Question.js');

test('Reducer function with the default case', () => {
  expect(QuestionInfo.reducer({}, {type: "DEFAULT"})).toStrictEqual({});
});

test('Reducer function with the query case', () => {
  expect(QuestionInfo.reducer({}, {type: "QUERY", todos: "todos"}))
      .toStrictEqual({todos: "todos"});
});

test('Reducer function with the subscription case', () => {
  expect(QuestionInfo.reducer(
      {todos: "foo"}, {type: "SUBSCRIPTION", todo: "testing"}
  )).toStrictEqual(
      {todos: ["f", "o", "o", "testing"]}
  );
});

test('Reducer funciton, default case, with state being passed in', () => {
  expect(QuestionInfo.reducer("foo", {type: "bar"})).toStrictEqual("foo");
});

test('Reducer funciton, query case, with state being passed in', () => {
  expect(QuestionInfo.reducer(
      "foo", {type: "QUERY", todos: "bar"}
  )).toStrictEqual({
      0: "f",
      1: "o",
      2: "o",
      todos: "bar"}
  );
});

test('Reducer funciton, default case, with state having more arguments', () => {
  expect(QuestionInfo.reducer(
      {0: "f", 1: "o", 2:"o", todos: "bar"},
      {type: "SUBSCRIPTION", todo: "test"}
  )).toStrictEqual(
      {0: "f", 1: "o", 2: "o", todos: ["b", "a", "r", "test"]}
  );
});

test('result when nothing is chosen yet', () => {
  expect(QuestionInfo.Result(
      {answerType: "not_yet"}
  )).toStrictEqual(<div>Hmm...</div>);
});

test('result when correct answer choice', () => {
  expect(QuestionInfo.Result(
      {answerType: "correct"}
  )).toStrictEqual(<div>Hmm...</div>);
});

test('QuestionInfo returns image and audio', () => {
  expect(
      QuestionInfo.QuestionInfo({
          bird: {image: "a", sound: "b"}
      })).toStrictEqual(<div>
          <Image src="a" thumbnail style={{height: '300px'}}/>
          <AudioButton sound="b" />
        </div>);
});

it('test Question renders', () => {
  const container = render(<Question />)
  expect(container.firstChild).toMatchSnapshot();
});

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

test('Check answer correct', () => {
  const spy = jest.spyOn(document, 'getElementById')
  spy.mockReturnValueOnce({volume: 0, play() {}});

  expect(QuestionInfo.checkAnswer("Sparrow", "Sparrow",
      {current: {scrollIntoView() {}}})).toStrictEqual("correct");
  expect(spy).toHaveBeenCalledTimes(3)
})

test('Check answer correct', () => {
  const spy = jest.spyOn(document, 'getElementById')
  spy.mockReturnValueOnce({volume: 0, play() {}});

  expect(QuestionInfo.checkAnswer("Sparrow", "Pigeon",
      {current: {scrollIntoView() {}}})).toStrictEqual("incorrect");
  expect(spy).toHaveBeenCalledTimes(4)
})

test('Check answer correct', () => {
  const spy = jest.spyOn(document, 'getElementById')
  spy.mockReturnValueOnce({volume: 0, play() {}});

  expect(QuestionInfo.checkAnswer("Sparrow", "Seagull",
      {current: {scrollIntoView() {}}})).toStrictEqual("incorrect");
  expect(spy).toHaveBeenCalledTimes(5)
})

test('Check answer correct', () => {
  const spy = jest.spyOn(document, 'getElementById')
  spy.mockReturnValueOnce({volume: 5, play() {}});

  expect(QuestionInfo.checkAnswer(4, 4,
      {current: {scrollIntoView() {}}})).toStrictEqual("correct");
  expect(spy).toHaveBeenCalledTimes(6)
})

test('Randomize with 0.5', () => {
  const spy = jest.spyOn(Math, 'random')
  spy.mockReturnValueOnce(0.5);

  expect(QuestionInfo.randomize("correctBird")).toBeLessThanOrEqual(4)
  expect(spy).toHaveBeenCalledTimes(1)
})

test('Randomize with 0.2', () => {
  const spy = jest.spyOn(Math, 'random')
  spy.mockReturnValueOnce(0.2);

  expect(QuestionInfo.randomize("correctBird")).toBeLessThanOrEqual(1)
  expect(spy).toHaveBeenCalledTimes(2)
})

test('Randomize above zero', () => {
  const spy = jest.spyOn(Math, 'random')
  spy.mockReturnValueOnce(0.2);

  expect(QuestionInfo.randomize("correctBird")).toBeGreaterThanOrEqual(0)
  expect(spy).toHaveBeenCalledTimes(3)
})

test('Randomize above lower bound', () => {
  const spy = jest.spyOn(Math, 'random')
  spy.mockReturnValueOnce(0.7);

  expect(QuestionInfo.randomize("correctBird")).toBeGreaterThanOrEqual(0)
  expect(spy).toHaveBeenCalledTimes(4)
})

test('Check randomized array', () => {
  const spy = jest.spyOn(Math, 'random')
  spy.mockReturnValueOnce(0.5);

  expect(QuestionInfo.randomize("birds", 4)).
      toEqual(expect.arrayContaining([0, 1, 2, 3]))
})

test('Check size of randomized array', () => {
  const spy = jest.spyOn(Math, 'random')
  spy.mockReturnValueOnce(0.5);

  expect(QuestionInfo.randomize("birds", 4)).toHaveLength(4)
})

test('Check size of randomized array for more birds', () => {
  const spy = jest.spyOn(Math, 'random')
  spy.mockReturnValueOnce(0.5);

  expect(QuestionInfo.randomize("birds", 10)).toHaveLength(4)
})

test('Check size of larger randomized array', () => {
  const spy = jest.spyOn(Math, 'random')
  spy.mockReturnValueOnce(0.5);

  expect(QuestionInfo.randomize("birds", 50)).toHaveLength(4)
})