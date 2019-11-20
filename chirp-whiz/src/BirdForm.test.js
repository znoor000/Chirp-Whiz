import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BirdForm from './BirdForm'

const BirdLib = require('./BirdForm');

test('update bird with blank info', () => {
    expect(BirdLib.updateBird({
        name: "",
        value: ""
    },{
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })).toStrictEqual({
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })
});

test('update bird with only name', () => {
    expect(BirdLib.updateBird({
        name: "",
        value: ""
    },{
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })).toStrictEqual({
        birdName: "Pigeon",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })
});

test('update bird with only image', () => {
    expect(BirdLib.updateBird({
        name: "",
        value: ""
    },{
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })).toStrictEqual({
        birdName: "",
        birdImage: "https://download.ams.birds.cornell.edu/api/v1/asset/66031271/1800",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })
});

test('update bird that already has info', () => {
    expect(BirdLib.updateBird({
        name: "",
        value: ""
    },{
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    })).toStrictEqual({
        birdName: "Chipping Sparrow",
        birdImage: "https://download.ams.birds.cornell.edu/api/v1/asset/64972021/1800",
        birdSound: "https://www.mbr-pwrc.usgs.gov/id/htmwav/h5600so.mp3",
        habitatImage: "",
        habitatSound: ""
    })
});