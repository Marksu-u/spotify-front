import React from 'react';
import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import App from './App';

test('renders App component with RouterProvider', () => {
  const { container } = render(<App />);
  const routerProviderElement = container.querySelector('RouterProvider');
  expect(routerProviderElement).toBeInTheDocument();
  expect(routerProviderElement).toHaveAttribute('router', router);
});
