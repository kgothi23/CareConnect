import { render, screen } from '@testing-library/react';
import Features from './features.js';

test('renders welcome message on home screen', () => {
  render(<Features />);
  const linkElement = screen.getByText(/welcome to CareConnect/i);
  expect(linkElement).toBeInTheDocument();
});