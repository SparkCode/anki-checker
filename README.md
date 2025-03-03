# Anki Answer Checker

A React application that helps you verify your answers to Anki flashcards using Claude 3.7 Sonnet through OpenRouter API.

## Features

- Input your Anki card question and your answer
- Get AI-powered feedback on whether your answer is correct
- View the prompt sent to the AI model for transparency
- Dark mode support

## Requirements

- Node.js and npm
- OpenRouter API key (get one at [https://openrouter.ai/keys](https://openrouter.ai/keys))

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Set up your OpenRouter API key in one of these ways:
   - Add to your `.zshrc` file (recommended):
     ```bash
     export OPENROUTER_API_KEY=your_api_key_here
     ```
     Then run `source ~/.zshrc` to apply changes
   - Create a `.env` file in the project root with:
     ```
     OPENROUTER_API_KEY=your_api_key_here
     ```
   - Or set the environment variable before starting the app:
     ```bash
     OPENROUTER_API_KEY=your_api_key_here npm start
     ```

4. Start the development server:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Enter the question from your Anki card (the front side)
2. Enter your answer to the card
3. Click "Check Answer"
4. Review the AI's evaluation of your answer

## Technologies Used

- React (Create React App)
- Axios for API requests
- Claude 3.7 Sonnet via OpenRouter API

## Privacy

Your card data is processed in your browser and is not stored on any server. API calls are made directly from your browser to OpenRouter.

## License

MIT
