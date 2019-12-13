import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Glossary from './Glossary'

window.scrollTo = jest.fn();

// Integration tests

it('Glossary snapshot', () => {
    const container = render(<Glossary />)
    expect(container.firstChild).toMatchSnapshot();
    window.scrollTo.mockClear();
});

test("test if glossary renders correctly", () => {
    const {getByText} = render(<Glossary />)
    expect(getByText("Glossary")).toBeInTheDocument();
});

test("check out bird info page then return to glossary", () => {
    const {getByText} = render(<Glossary />)
    fireEvent.click(getByText('Evening grosbeak'));
    expect(getByText("Return")).toBeInTheDocument();
    fireEvent.click(getByText('Return'));
    expect(getByText("Glossary")).toBeInTheDocument();
});

const setup = () => {
  const utils = render(<Glossary />)
  const input = utils.getByLabelText('Bird Search:')
  return {
    input,
    ...utils,
  }
}

test('testing the search feature', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'Even' } })
  expect(input.value).toBe('Even')
})