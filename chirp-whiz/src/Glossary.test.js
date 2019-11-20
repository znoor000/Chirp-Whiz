import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Glossary from './Glossary'

const GlosLib = require('./Glossary');

test('reducer case DEFAULT', () => {
    expect(GlosLib.reducer(
        {}, {type: "def"}
    )).toStrictEqual({});
});

test('reducer case QUERY', () => {
    expect(GlosLib.reducer(
        {},
        {type: "QUERY", todos: "td"}
    )).toStrictEqual(
        {todos: "td"}
    );
});

test('reducer case SUBSCRIPTION', () => {
    expect(GlosLib.reducer(
        {todos: "tds"},
        {type: "SUBSCRIPTION", todo: "td"}
    )).toStrictEqual(
        {todos: ["t", "d", "s", "td"]}
    );
});

test('reducer case DEFAULT with state being passed in', () => {
    expect(GlosLib.reducer(
        "STATE", {type: "def"}
    )).toStrictEqual("STATE");
});

test('reducer case QUERY with state being passed in', () => {
    expect(GlosLib.reducer(
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
    expect(GlosLib.reducer(
        {0: "s", 1: "t", todos: "tds"},
        {type: "SUBSCRIPTION", todo: "td"}
    )).toStrictEqual(
        {0: "s", 1: "t", todos: ["t", "d", "s", "td"]}
    );
});