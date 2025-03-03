import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Anki Checker app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Anki Answer Checker/i);
  expect(headerElement).toBeInTheDocument();
});
