import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BirdForm from './BirdForm'

const BirdLib = require('./BirdForm');

test('update bird with blank info', () => {
    expect(BirdLib.updateBird()).toStrictEqual({
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })
});

test('update bird with only name', () => {
    expect(BirdLib.updateBird()).toStrictEqual({
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })
});

test('update bird with only image', () => {
    expect(BirdLib.updateBird()).toStrictEqual({
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })
});

test('update bird that already has info', () => {
    expect(BirdLib.updateBird()).toStrictEqual({
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })
});