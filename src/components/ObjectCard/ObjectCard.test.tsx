import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ObjectCard from './ObjectCard';

describe('ObjectCard component', () => {
  it('renders the name, type, and location', () => {
    const mockData = {
      uid: '123',
      name: 'Test Planet',
      astronomicalObjectType: 'Planet',
      location: {
        uid: '456',
        name: 'Alpha Quadrant',
        astronomicalObjectType: 'Quadrant',
        location: {
          uid: '789',
          name: 'Milky Way',
        },
      },
    };

    render(
      <MemoryRouter>
        <ObjectCard data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Test Planet/i)).toBeInTheDocument();
    expect(screen.getByText(/^Planet$/i)).toBeInTheDocument();
    expect(screen.getByText(/Alpha Quadrant/i)).toBeInTheDocument();
    const backLink = screen.getByRole('link', { name: /back/i });
    expect(backLink).toBeInTheDocument();
  });

  it('renders "not set" if location name is missing', () => {
    const mockData = {
      uid: '123',
      name: 'Test Planet',
      astronomicalObjectType: 'Planet',
      location: {
        uid: '456',
        name: '',
        astronomicalObjectType: 'Quadrant',
        location: {
          uid: '789',
          name: 'Milky Way',
        },
      },
    };

    render(
      <MemoryRouter>
        <ObjectCard data={mockData} />
      </MemoryRouter>
    );
    expect(screen.getByText(/not set/i)).toBeInTheDocument();
  });
});
