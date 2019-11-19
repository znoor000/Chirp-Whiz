import React from 'react';
import AudioButton from './AudioButton.js';
import { AnswerButton } from './Question';

const QuestionInfo = require('./Question.js');

test('QuestionInfo returns name', () => {
    expect(
        QuestionInfo({
            type: 0, 
            bird: {name: "a", image: "b", sound: "c"}
        })).toStrictEqual(<h3>a</h3>);
});

test('QuestionInfo returns image', () => {
    expect(
        QuestionInfo({
            type: 1, 
            bird: {name: "a", image: "b", sound: "c"}
        })).toStrictEqual(<img src="b" alt="a" />);
});

test('QuestionInfo returns audio', () => {
    expect(
        QuestionInfo({
            type: 2, 
            bird: {name: "a", image: "b", sound: "c"}
        })).toStrictEqual(<AudioButton sound="c" />);
});

{/* Doesn't work yet
test('AnswerButton returns only image', () => {
    expect(
        AnswerButton({
            type: 0, 
            bird: {name: "a", image: "b", sound: "c"},
            answerID: 0
        })).toStrictEqual(
            <div>
              <button onClick={() => checkAnswer(0)}>
                <img src="b" alt="a" />
              </button>
            </div>
        );
});*/}