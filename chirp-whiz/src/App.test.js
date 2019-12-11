import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('test App renders', () => {
    const container = render(<App />)
    expect(container.firstChild).toMatchSnapshot();
});

test('test full app', () => {
  const history = createMemoryHistory()
  const { container, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
)});

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

  {/*
  expect(container.innerHTML).toMatch('Chirp Whiz')

  fireEvent.click(getByText('Quiz'))

  expect(container.innerHTML).toMatch('Quiz')
  */}