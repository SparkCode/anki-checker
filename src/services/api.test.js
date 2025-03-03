import { removePhoneticTranscriptions } from '../utils/transcriptionUtils';
import { checkAnswer } from './api';

// Mock the axios module
jest.mock('axios');

describe('API Service', () => {
  describe('removePhoneticTranscriptions', () => {
    it('should remove phonetic transcriptions from text', () => {
      const testCases = [
        {
          input: 'The hotel has been renovated /ˈrenəveɪt/ and redecorated.',
          expected: 'The hotel has been renovated and redecorated.'
        },
        {
          input: 'I need to purchase /ˈpɜːrtʃəs/ some groceries.',
          expected: 'I need to purchase some groceries.'
        },
        {
          input: 'The /ðə/ cat /kæt/ sat /sæt/ on /ɒn/ the /ðə/ mat /mæt/.',
          expected: 'The cat sat on the mat.'
        },
        {
          input: 'Text without transcription',
          expected: 'Text without transcription'
        },
        {
          input: '/ˈpriːfɪks/ at the beginning and end /ˈsʌfɪks/',
          expected: 'at the beginning and end'
        },
        {
          input: 'Multiple /wʌn/ transcriptions /tuː/ in /θriː/ one /fɔː/ sentence.',
          expected: 'Multiple transcriptions in one sentence.'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = removePhoneticTranscriptions(input);
        expect(result).toBe(expected);
      });
    });

    it('should handle empty strings', () => {
      expect(removePhoneticTranscriptions('')).toBe('');
    });

    it('should handle strings with only transcription', () => {
      expect(removePhoneticTranscriptions('/ˈoʊnli/')).toBe('/ˈoʊnli/');
    });
  });
}); 