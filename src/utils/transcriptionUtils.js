/**
 * Removes phonetic transcriptions (text between slashes) from a string
 * Example: "The hotel has been renovated /ˈrenəveɪt/ and redecorated." 
 * becomes "The hotel has been renovated and redecorated."
 */
export const removePhoneticTranscriptions = (text) => {
  // If the entire string is a transcription (e.g., "/ˈoʊnli/"), return it as is
  if (/^\/[^/]+\/$/.test(text)) {
    return text;
  }
  
  // Replace transcriptions with a space, preserving punctuation
  const withoutTranscriptions = text.replace(/\s*\/[^/]+\/\s*/g, ' ');
  
  // Fix spacing around punctuation and normalize multiple spaces
  return withoutTranscriptions
    .replace(/\s+([.,!?;:])/g, '$1') // Remove spaces before punctuation
    .replace(/\s+/g, ' ')            // Normalize multiple spaces to single space
    .trim();                         // Remove leading/trailing spaces
}; 