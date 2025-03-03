import React from 'react';
import './App.css';
import AnkiForm from './components/AnkiForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Anki Answer Checker</h1>
        <p>Check if your Anki card answers are correct using Claude 3.7 Sonnet</p>
      </header>
      <main>
        <AnkiForm />
      </main>
      <footer className="App-footer">
        <p>
          Powered by <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer">OpenRouter</a> and Claude 3.7 Sonnet
        </p>
      </footer>
    </div>
  );
}

export default App;
