import React from 'react';
import UserPage from './UserPage';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'

it('test UserPage renders', () => {
    const container = render(<UserPage 
        name='name'
        email='email'
        correct={[0,0,0]}
        incorrect={[0,0,0]}
      />)
    expect(container.firstChild).toMatchSnapshot();
});