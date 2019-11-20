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
)})


  {/*
  expect(container.innerHTML).toMatch('Chirp Whiz')

  fireEvent.click(getByText('Quiz'))

  expect(container.innerHTML).toMatch('Quiz')
  */}