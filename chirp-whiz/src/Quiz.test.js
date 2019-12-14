import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Quiz from './Quiz.js';
import birdList from './birdList';

const QuizTest = require('./Quiz.js');

// Unit tests

test('Check answer correct given same inputs', () => {
    const spy = jest.spyOn(document, 'getElementById')
    spy.mockReturnValueOnce({volume: 5, play() {}});
  
    expect(QuizTest.checkAnswer(2, 2,
        {current: {scrollIntoView() {}}})).toStrictEqual("correct");
    expect(spy).toHaveBeenCalledTimes(1)
})

test('Check answer incorrect given different inputs', () => {
    const spy = jest.spyOn(document, 'getElementById')
    spy.mockReturnValueOnce({volume: 5, play() {}});
  
    expect(QuizTest.checkAnswer(2, 3,
        {current: {scrollIntoView() {}}})).toStrictEqual("incorrect");
    expect(spy).toHaveBeenCalledTimes(2)
})
  
test('Check answer correct given same strings', () => {
    const spy = jest.spyOn(document, 'getElementById')
    spy.mockReturnValueOnce({volume: 0, play() {}});
  
    expect(QuizTest.checkAnswer("Sparrow", "Sparrow",
        {current: {scrollIntoView() {}}})).toStrictEqual("correct");
    expect(spy).toHaveBeenCalledTimes(3)
})

test('Check size of randomized array', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.5);
  
    expect(QuizTest.randomize("birds", [0, 1, 2, 3], 0, [0,0,0], [0,0,0])).toHaveLength(4)
})

test('randomize to return val less than or equal to 4', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.1);
  
    expect(QuizTest.randomize("correctBird", [0, 1, 2, 3], birdList[0])).toBeLessThanOrEqual(4)
})

test('randomize to return val greater than or equal to 0', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.1);
  
    expect(QuizTest.randomize("correctBird", [0, 1, 2, 3], birdList[0])).toBeGreaterThanOrEqual(0)
})

test('randomize to return val <= 4 with higher seed', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.8);
  
    expect(QuizTest.randomize("correctBird", [0, 1, 2, 3], birdList[0])).toBeLessThanOrEqual(4)
})

test('randomize to return val >= 0 with higher seed', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.7);
  
    expect(QuizTest.randomize("correctBird", [0, 1, 2, 3], birdList[0])).toBeGreaterThanOrEqual(0)
})

test('Choose birds from all habitats', () => {
    expect(QuizTest.chooseBirds(
        ['Forests', 'Open Woodlands', 'Grasslands', 'Lakes and Ponds']
    )).toHaveLength(30)
})

test('Choose birds from only forests', () => {
    expect(QuizTest.chooseBirds(
        ['Forests']
    )).toHaveLength(9)
})

test('Choose birds from only open woodlands', () => {
    expect(QuizTest.chooseBirds(
        ['Open Woodlands']
    )).toHaveLength(8)
})

test('Choose birds from both forests and woodlands', () => {
    expect(QuizTest.chooseBirds(
        ['Forests', 'Open Woodlands']
    )).toHaveLength(17)
})

test('Choose birds from only grasslands', () => {
    expect(QuizTest.chooseBirds(
        ['Grasslands']
    )).toHaveLength(6)
})

test('Choose birds from only lakes and ponds', () => {
    expect(QuizTest.chooseBirds(
        ['Lakes and Ponds']
    )).toHaveLength(7)
})

test('Choose birds from forests, woodlands, and lakes and ponds', () => {
    expect(QuizTest.chooseBirds(
        ['Forests', 'Open Woodlands', 'Lakes and Ponds']
    )).toHaveLength(24)
})

test('randomize to return val >= 0 with higher seed', () => {
    const spy = jest.spyOn(Math, 'abs')
    spy.mockReturnValueOnce(1);
    const spy3 = jest.spyOn(Math, 'min')
    spy3.mockReturnValueOnce(1);
  
    expect(QuizTest.createWeights({a: 'a', b: 'b', c: 'c'}, [0,0,0], [0,0,0])).toStrictEqual([])
})

test('reducer case DEFAULT', () => {
    expect(QuizTest.reducer(
        {}, {type: "def"}
    )).toStrictEqual({});
});

test('reducer case QUERY', () => {
    expect(QuizTest.reducer(
        {},
        {type: "QUERY", todos: "td"}
    )).toStrictEqual(
        {todos: "td"}
    );
});

test('reducer case SUBSCRIPTION', () => {
    expect(QuizTest.reducer(
        {todos: "tds"},
        {type: "SUBSCRIPTION", todo: "td"}
    )).toStrictEqual(
        {todos: ["t", "d", "s", "td"]}
    );
});

test('reducer case DEFAULT with state being passed in', () => {
    expect(QuizTest.reducer(
        "STATE", {type: "def"}
    )).toStrictEqual("STATE");
});

test('reducer case QUERY with state being passed in', () => {
    expect(QuizTest.reducer(
        "STATE",
        {type: "QUERY", todos: "td"}
    )).toStrictEqual({
        0: "S",
        1: "T",
        2: "A",
        3: "T",
        4: "E", 
        todos: "td"}
    );
});

test('reducer case SUBSCRIPTION with state having extra args', () => {
    expect(QuizTest.reducer(
        {0: "s", 1: "t", todos: "tds"},
        {type: "SUBSCRIPTION", todo: "td"}
    )).toStrictEqual(
        {0: "s", 1: "t", todos: ["t", "d", "s", "td"]}
    );
});

// Integration tests

test("testing the quiz options", () => {
    const {getByText, getAllByRole} = render(<Quiz />)
    fireEvent.click(getByText('Image'));
    fireEvent.click(getByText('Audio'));
    fireEvent.click(getByText('Forests'));
    fireEvent.click(getByText('10'));
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('Start Quiz Now'));
    fireEvent.click(getByText('Return'));
});

test("going through the quiz of 5 questions", () => {
    const {getByText, getAllByRole} = render(<Quiz />)
    fireEvent.click(getByText('Start Quiz Now'));

    const buttons = getAllByRole('button');
    fireEvent.click(buttons[3]);
    fireEvent.click(getByText('Next Question'));

    const buttons2 = getAllByRole('button');
    fireEvent.click(buttons2[3]);
    fireEvent.click(getByText('Next Question'));

    const buttons3 = getAllByRole('button');
    fireEvent.click(buttons3[3]);
    fireEvent.click(getByText('Next Question'));

    const buttons4 = getAllByRole('button');
    fireEvent.click(buttons4[3]);
    fireEvent.click(getByText('Next Question'));

    const buttons5 = getAllByRole('button');
    fireEvent.click(buttons5[3]);
    fireEvent.click(getByText('Next Question'));

    expect(getByText("incorrectly")).toBeInTheDocument();
});