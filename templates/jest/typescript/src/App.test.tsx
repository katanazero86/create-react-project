import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders p element', () => {
  render(<App />);
  const pElement = screen.getByText(/typescript/i);
  expect(pElement).toBeInTheDocument();
});

