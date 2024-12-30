import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import axios from 'axios';

// Mock dei componenti figli per evitare warning
jest.mock('./pages/home/Home', () => () => <div>Home</div>);

describe('App', () => {
  test('renders App component with className App', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const elementWithClass = container.querySelector('.App');
    expect(elementWithClass).toBeInTheDocument();
  });
});
