import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/TaskForm', () => ({
  TaskForm: () => <div>TaskForm</div>,
}));

jest.mock('./components/TaskList', () => ({
  TaskList: () => <div>TaskList</div>,
}));

test('renders task manager title', () => {
  render(<App />);
  const titleElement = screen.getByText(/task manager/i);
  expect(titleElement).toBeInTheDocument();
});
