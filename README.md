# Anki Answer Checker

A React application that helps you verify your answers to Anki flashcards using Claude 3.7 Sonnet through OpenRouter API.

## Features

- Input your Anki card question and your answer
- Get AI-powered feedback on whether your answer is correct
- View the prompt sent to the AI model for transparency
- Dark mode support
- Simple API key management through browser storage

## Requirements

- Node.js and npm
- OpenRouter API key (get one at [https://openrouter.ai/keys](https://openrouter.ai/keys))

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. When you first open the application, you'll be prompted to enter your OpenRouter API key
   - You can get an API key from [https://openrouter.ai/keys](https://openrouter.ai/keys)
   - Your API key is stored securely in your browser's localStorage
   - You can update your API key anytime by clicking the ⚙️ button in the header

2. Enter the question from your Anki card (the front side)
3. Enter your answer to the card
4. Click "Check Answer"
5. Review the AI's evaluation of your answer

## Technologies Used

- React (Create React App)
- Axios for API requests
- Claude 3.7 Sonnet via OpenRouter API
- localStorage for secure API key storage

## Privacy

Your card data and API key are processed in your browser and are not stored on any server. The API key is stored securely in your browser's localStorage and is only used for making requests to OpenRouter. API calls are made directly from your browser to OpenRouter.

## License

MIT
