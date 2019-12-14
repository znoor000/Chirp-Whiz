import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const AppLib = require('./App');

// Unit tests

test('reducer case DEFAULT', () => {
    expect(AppLib.reducer(
        {}, {type: "def"}
    )).toStrictEqual({});
});

test('reducer case QUERY', () => {
    expect(AppLib.reducer(
        {},
        {type: "QUERY", todos: "td"}
    )).toStrictEqual(
        {todos: "td"}
    );
});

test('reducer case SUBSCRIPTION', () => {
    expect(AppLib.reducer(
        {todos: "tds"},
        {type: "SUBSCRIPTION", todo: "td"}
    )).toStrictEqual(
        {todos: ["t", "d", "s", "td"]}
    );
});

test('reducer case DEFAULT with state being passed in', () => {
    expect(AppLib.reducer(
        "STATE", {type: "def"}
    )).toStrictEqual("STATE");
});

test('reducer case QUERY with state being passed in', () => {
    expect(AppLib.reducer(
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
    expect(AppLib.reducer(
        {0: "s", 1: "t", todos: "tds"},
        {type: "SUBSCRIPTION", todo: "td"}
    )).toStrictEqual(
        {0: "s", 1: "t", todos: ["t", "d", "s", "td"]}
    );
});

test('create new todo', () => {
    expect(AppLib.createNewTodo('myName')).not.toBe({});
});

// Integration tests

it('App snapshot', () => {
    const container = render(<App />)
    expect(container.firstChild).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('test full app', () => {
  const history = createMemoryHistory()
  const { container, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
)})

test("check if app starts reading from database on render", () => {
    const {getByText} = render(<App />)
    expect(getByText("Loading...")).toBeInTheDocument();
});

test("test sign-in and go to user page", async () => {
    const {getByText, getByPlaceholderText} = render(<App />)

    const usernameElement = await waitForElement(
        () => getByText('Sign in to your account')
    )

    const username = getByPlaceholderText("Enter your username");
    const pword = getByPlaceholderText("Enter your password");

    fireEvent.change(username, { target: { value: 'test' } })
    expect(username.value).toBe('test')

    fireEvent.change(pword, { target: { value: 'strongPassword' } })
    expect(pword.value).toBe('strongPassword')
    
    fireEvent.click(getByText('Sign In'));

    const appLoad = await waitForElement(
        () => getByText('Hello test')
    )
    
    fireEvent.click(getByText('User Page'));

    const userPageLoad = await waitForElement(
        () => getByText('Email:')
    )
});

test("test sign in and go to quiz", async () => {
    const {getByText, getByPlaceholderText} = render(<App />)

    const usernameElement = await waitForElement(
        () => getByText('Sign in to your account')
    )

    const username = getByPlaceholderText("Enter your username");
    const pword = getByPlaceholderText("Enter your password");

    fireEvent.change(username, { target: { value: 'test' } })
    expect(username.value).toBe('test')

    fireEvent.change(pword, { target: { value: 'strongPassword' } })
    expect(pword.value).toBe('strongPassword')
    
    fireEvent.click(getByText('Sign In'));

    const appLoad = await waitForElement(
        () => getByText('Hello test')
    )
    
    fireEvent.click(getByText('Quiz'));

    const userPageLoad = await waitForElement(
        () => getByText('What type(s) of questions?')
    )
});