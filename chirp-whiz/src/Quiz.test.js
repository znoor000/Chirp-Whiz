import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import AudioButton from './quizComponents/AudioButton.js';
import Quiz from './Quiz.js';
import birdList from './birdList';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const QuizTest = require('./Quiz.js');

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
  
    expect(QuizTest.randomize("birds", [0, 1, 2, 3])).toHaveLength(4)
})
  
test('Check size of randomized array for more birds', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.5);

    let arr = Array.from({length: 40}, () => Math.floor(Math.random() * 10));
  
    expect(QuizTest.randomize("birds", arr)).toHaveLength(4)
})
  
test('Check size of larger randomized array', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.5);
    
    let largeArr = Array.from({length: 40}, () => Math.floor(Math.random() * 50));
  
    expect(QuizTest.randomize("birds", largeArr)).toHaveLength(4)
})
  
test('Check size of larger randomized array with alternative random val', () => {
    const spy = jest.spyOn(Math, 'random')
    spy.mockReturnValueOnce(0.9);
    
    let largeArr = Array.from({length: 40}, () => Math.floor(Math.random() * 50));
  
    expect(QuizTest.randomize("birds", largeArr)).toHaveLength(4)
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