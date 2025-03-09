import React, { useState, useEffect } from 'react';
import './App.css';
import AnkiForm from './components/AnkiForm';

function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('OPENROUTER_API_KEY') || '');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  useEffect(() => {
    // Check if API key exists in localStorage when the app loads
    if (!localStorage.getItem('OPENROUTER_API_KEY')) {
      setIsKeyModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('OPENROUTER_API_KEY', apiKey.trim());
      setIsKeyModalOpen(false);
    }
  };

  const openApiKeySettings = () => {
    setApiKey(localStorage.getItem('OPENROUTER_API_KEY') || '');
    setIsKeyModalOpen(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Anki Answer Checker</h1>
        <p>Check if your Anki card answers are correct using Claude 3.7 Sonnet</p>
        <button className="settings-button" onClick={openApiKeySettings}>
          ⚙️ API Settings
        </button>
      </header>
      <main>
        <AnkiForm />
      </main>

      {isKeyModalOpen && (
        <div className="api-key-modal">
          <div className="api-key-modal-content">
            <h2>OpenRouter API Key</h2>
            <p>Enter your OpenRouter API key to use this application:</p>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-..."
              className="api-key-input"
            />
            <div className="api-key-buttons">
              <button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                Save
              </button>
              <button onClick={() => setIsKeyModalOpen(false)}>
                Cancel
              </button>
            </div>
            <p className="api-key-help">
              You can get an API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">OpenRouter</a>
            </p>
          </div>
        </div>
      )}

      <footer className="App-footer">
        <p>
          Powered by <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer">OpenRouter</a> and Claude 3.7 Sonnet
        </p>
      </footer>
    </div>
  );
}

export default App;
