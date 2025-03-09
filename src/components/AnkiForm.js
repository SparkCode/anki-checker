import React, { useState } from 'react';
import { checkAnswer } from '../services/api';
import './AnkiForm.css';

const AnkiForm = () => {
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [originalQuestion, setOriginalQuestion] = useState('');
  const [cleanedQuestion, setCleanedQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await checkAnswer(question, userAnswer);
      setResult(response.result);
      setPrompt(response.prompt);
      setOriginalQuestion(response.originalQuestion);
      setCleanedQuestion(response.cleanedQuestion);
    } catch (err) {
      setError(err.message || 'An error occurred while checking your answer.');
    } finally {
      setLoading(false);
    }
  };

  const buildChatUrl = () => {
    // Create a message with the question, answer, and result
    const chatMessage = `Question: ${cleanedQuestion || question}\nMy answer: ${userAnswer}\nEvaluation: ${result}`;
    // Encode the message for safe URL transmission
    const encodedMessage = encodeURIComponent(chatMessage);
    // Return URL with the message as a query parameter
    return `https://openrouter.ai/chat?message=${encodedMessage}`;
  };

  return (
    <div className="anki-form-container">
      <form onSubmit={handleSubmit} className="anki-form">
        <div className="form-group">
          <label htmlFor="question">Anki Card Question (Front Side)</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question from your Anki card (transcriptions like /ˈrenəveɪt/ will be removed)"
            required
            className="form-control"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userAnswer">Your Answer</label>
          <textarea
            id="userAnswer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer to the Anki card"
            required
            className="form-control"
            rows="3"
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Checking...' : 'Check Answer'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="result-container">
          <h3>Result:</h3>
          <div className="result-content">{result}</div>
          
          {originalQuestion !== cleanedQuestion && (
            <div 
              className="transcription-info" 
              role="region" 
              aria-label="Transcription Removed"
            >
              <h4>Transcription Removed:</h4>
              <div className="transcription-comparison">
                <div>
                  <strong>Original:</strong> {originalQuestion}
                </div>
                <div>
                  <strong>Sent to Model:</strong> {cleanedQuestion}
                </div>
              </div>
            </div>
          )}
          
          <div className="prompt-container">
            <h4>Prompt Sent to Model:</h4>
            <pre className="prompt-content">{prompt}</pre>
          </div>
          
          <div className="continue-chat-container">
            <a 
              href={buildChatUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="continue-chat-button"
            >
              Continue in Chat
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnkiForm; 