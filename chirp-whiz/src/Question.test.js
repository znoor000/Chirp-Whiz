import React from 'react';

const QuestionInfo = require('./Question.js');

test('QuestionInfo returns correct', () => {
    expect(QuestionInfo({type: 0, bird: {name: "a", image: "b", sound: "c"}})).toStrictEqual(<h3>a</h3>);
});