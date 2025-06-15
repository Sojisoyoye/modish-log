import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import { useUser } from '../context/user.context';

jest.mock('../context/user.context', () => {
  const originalModule = jest.requireActual('../context/user.context');
  return {
    ...originalModule,
    useUser: jest.fn(),
    UserProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the heading correctly', () => {
    (useUser as jest.Mock).mockReturnValue({ user: null });

    render(<Home />);

    const headingElement = screen.getByText(
      'One solution to manage sales and inventory.'
    );
    expect(headingElement).toBeInTheDocument();
  });

  it('displays user information when user is logged in', () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      role: 'admin',
    };

    (useUser as jest.Mock).mockReturnValue({ user: mockUser });

    render(<Home />);

    expect(screen.getByText(/Logged in as/i)).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('does not display user information when user is not logged in', () => {
    (useUser as jest.Mock).mockReturnValue({ user: null });

    render(<Home />);

    expect(screen.queryByText(/Logged in as/i)).not.toBeInTheDocument();
  });
});
