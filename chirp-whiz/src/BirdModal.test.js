import React from 'react';
import BirdModal from './BirdModal';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

const BModalTst = require('./BirdModal.js');

// Integration tests

it('BirdModal snapshot', () => {
    const container = render(<BirdModal
        show={true}
        onHide={() => {}}
        birdNum={0} />);
    expect(container.firstChild).toMatchSnapshot();
});