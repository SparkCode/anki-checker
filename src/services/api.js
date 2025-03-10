import axios from 'axios';
import { removePhoneticTranscriptions } from '../utils/transcriptionUtils';

// OpenRouter API for Google Gemini 2.0 Flash
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const checkAnswer = async (question, userAnswer) => {
  // Get API key from localStorage instead of environment variables
  const apiKey = localStorage.getItem('OPENROUTER_API_KEY');
  
  // Debug: Log API key status (don't log the actual key in production)
  console.log('API Key available:', !!apiKey);
  
  if (!apiKey) {
    throw new Error('OpenRouter API key is not set. Please enter your API key in the settings.');
  }

  // Remove phonetic transcriptions from the question
  const cleanedQuestion = removePhoneticTranscriptions(question);
  
  // Store original question for display purposes
  const originalQuestion = question;

  const prompt = `
I'm learning English using Anki flashcards. For the following card:

Question/Front Side: "${cleanedQuestion}"

My answer was: "${userAnswer}"

Please evaluate my answer and tell me if it's correct. If not, explain why and provide the correct answer. Be concise but thorough in your evaluation.
`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Anki Answer Checker',
        },
      }
    );

    return {
      result: response.data.choices[0].message.content,
      prompt: prompt,
      originalQuestion: originalQuestion,
      cleanedQuestion: cleanedQuestion
    };
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
};

export { checkAnswer };
