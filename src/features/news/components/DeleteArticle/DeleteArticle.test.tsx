// @ts-nocheck
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DeleteArticle } from './DeleteArticle';
import { Toast } from 'toastify-react-native';
import { useNewsContext } from '../../context/NewsContextProvider';

jest.mock('../../context/NewsContextProvider', () => ({
  useNewsContext: jest.fn(),
}));

jest.mock('toastify-react-native', () => ({
  Toast: {
    success: jest.fn(),
  },
}));

jest.mock('react-native-paper', () => {
  const React = require('react');
  const actual = jest.requireActual('react-native-paper');

  return {
    ...actual,
    Portal: ({ children }) => <>{children}</>,
    Modal: ({ visible, children }) => (visible ? <>{children}</> : null),
    Button: ({ onPress, children, testID }) => (
      <button onClick={onPress} type="button" data-testid={testID}>
        {children}
      </button>
    ),
  };
});

jest.mock('react-native-paper/src', () => ({
  Icon: ({ source }) => <span>icon-{source}</span>,
}));

describe('DeleteArticle component', () => {
  // Sample article for testing
  const mockArticle = {
    uuid: 'test-uuid-123',
    title: 'Test Article Title',
    description: 'Test description',
    url: 'https://example.com',
    image_url: 'https://example.com/image.jpg',
    published_at: '2023-01-01T00:00:00Z',
    source: 'Test Source',
    categories: ['test', 'my'],
  };

  const mockHandleDeleteArticle = jest.fn();

  beforeEach(() => {
    (useNewsContext as jest.Mock).mockReturnValue({
      handleDeleteArticle: mockHandleDeleteArticle,
    });

    jest.clearAllMocks();
  });

  it('renders the delete button', () => {
    const { getByTestId } = render(<DeleteArticle article={mockArticle} />);

    const deleteButton = getByTestId('delete-article-button');
    expect(deleteButton).toBeTruthy();
  });

  it('shows modal when delete button is pressed', () => {
    const { getByTestId, getByText } = render(
      <DeleteArticle article={mockArticle} />,
    );

    const deleteButton = getByTestId('delete-article-button');
    fireEvent.press(deleteButton);

    expect(getByText('Delete Article')).toBeTruthy();
  });

  it('displays correct article title in confirmation message', () => {
    const { getByTestId, getByText } = render(
      <DeleteArticle article={mockArticle} />,
    );

    const deleteButton = getByTestId('delete-article-button');
    fireEvent.press(deleteButton);

    expect(getByText(/Test Article Title/)).toBeTruthy();
  });

  it('calls handleDeleteArticle when YES button is pressed', () => {
    const { getByTestId } = render(<DeleteArticle article={mockArticle} />);

    const deleteButton = getByTestId('delete-article-button');
    fireEvent.press(deleteButton);

    const yesButton = getByTestId('yes-button');
    fireEvent.press(yesButton);

    expect(mockHandleDeleteArticle).toHaveBeenCalledWith('test-uuid-123');
    expect(Toast.success).toHaveBeenCalledWith('Article has been removed.');
  });

  it('closes the modal without deleting when NO button is pressed', () => {
    const { getByTestId } = render(<DeleteArticle article={mockArticle} />);

    const deleteButton = getByTestId('delete-article-button');
    fireEvent.press(deleteButton);

    const noButton = getByTestId('no-button');
    fireEvent.press(noButton);

    expect(mockHandleDeleteArticle).not.toHaveBeenCalled();
    expect(Toast.success).not.toHaveBeenCalled();
  });
});
