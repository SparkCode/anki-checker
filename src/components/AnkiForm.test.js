import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnkiForm from './AnkiForm';
import { checkAnswer } from '../services/api';

// Mock the API service
jest.mock('../services/api', () => ({
  checkAnswer: jest.fn()
}));

describe('AnkiForm Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<AnkiForm />);
    
    // Check if form elements are rendered
    expect(screen.getByLabelText(/Anki Card Question/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Answer/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Check Answer/i })).toBeInTheDocument();
  });

  it('handles form submission with transcription removal', async () => {
    // Mock API response
    const mockResponse = {
      result: 'Your answer is correct!',
      prompt: 'Test prompt',
      originalQuestion: 'The hotel has been renovated /ˈrenəveɪt/ and redecorated.',
      cleanedQuestion: 'The hotel has been renovated and redecorated.'
    };
    
    checkAnswer.mockResolvedValue(mockResponse);
    
    render(<AnkiForm />);
    
    // Fill in the form
    const questionInput = screen.getByLabelText(/Anki Card Question/i);
    const answerInput = screen.getByLabelText(/Your Answer/i);
    
    userEvent.type(questionInput, 'The hotel has been renovated /ˈrenəveɪt/ and redecorated.');
    userEvent.type(answerInput, 'The hotel has been renovated and redecorated.');
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    
    // Check if API was called with correct parameters
    await waitFor(() => {
      expect(checkAnswer).toHaveBeenCalledWith(
        'The hotel has been renovated /ˈrenəveɪt/ and redecorated.',
        'The hotel has been renovated and redecorated.'
      );
    });
    
    // Check if result is displayed
    await waitFor(() => {
      expect(screen.getByText('Your answer is correct!')).toBeInTheDocument();
    });
    
    // Check if transcription info is displayed
    await waitFor(() => {
      expect(screen.getByText('Transcription Removed:')).toBeInTheDocument();
    });
    
    // Use getByTestId instead of closest to find the transcription section
    // First, we need to make sure the component has a data-testid attribute
    const transcriptionInfo = screen.getByRole('region', { name: /transcription removed/i });
    
    // Check for the original text within the transcription section
    expect(within(transcriptionInfo).getByText(/Original:/)).toBeInTheDocument();
    expect(within(transcriptionInfo).getByText(/The hotel has been renovated \/ˈrenəveɪt\/ and redecorated./)).toBeInTheDocument();
    expect(within(transcriptionInfo).getByText(/Sent to Model:/)).toBeInTheDocument();
    expect(within(transcriptionInfo).getByText(/The hotel has been renovated and redecorated./)).toBeInTheDocument();
  });

  it('does not show transcription info when no transcription is present', async () => {
    // Mock API response with no transcription
    const mockResponse = {
      result: 'Your answer is correct!',
      prompt: 'Test prompt',
      originalQuestion: 'The hotel has been renovated and redecorated.',
      cleanedQuestion: 'The hotel has been renovated and redecorated.'
    };
    
    checkAnswer.mockResolvedValue(mockResponse);
    
    render(<AnkiForm />);
    
    // Fill in the form without transcription
    const questionInput = screen.getByLabelText(/Anki Card Question/i);
    const answerInput = screen.getByLabelText(/Your Answer/i);
    
    userEvent.type(questionInput, 'The hotel has been renovated and redecorated.');
    userEvent.type(answerInput, 'The hotel has been renovated and redecorated.');
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    
    // Check if result is displayed
    await waitFor(() => {
      expect(screen.getByText('Your answer is correct!')).toBeInTheDocument();
    });
    
    // Check that transcription info is NOT displayed
    expect(screen.queryByText('Transcription Removed:')).not.toBeInTheDocument();
  });

  it('handles API errors correctly', async () => {
    // Mock API error
    checkAnswer.mockRejectedValue(new Error('API Error'));
    
    render(<AnkiForm />);
    
    // Fill in the form
    const questionInput = screen.getByLabelText(/Anki Card Question/i);
    const answerInput = screen.getByLabelText(/Your Answer/i);
    
    userEvent.type(questionInput, 'Test question');
    userEvent.type(answerInput, 'Test answer');
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    
    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });
}); 