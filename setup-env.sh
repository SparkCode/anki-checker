#!/bin/bash

# Check if OPENROUTER_API_KEY exists in the environment
if [ -n "$OPENROUTER_API_KEY" ]; then
  echo "Found OPENROUTER_API_KEY in your environment."
  
  # Create or update .env file
  echo "REACT_APP_OPENROUTER_API_KEY=$OPENROUTER_API_KEY" > .env
  echo "Created .env file with your API key."
  echo "You can now start your React app with: npm start"
else
  echo "Error: OPENROUTER_API_KEY not found in your environment."
  echo "Please set it in your shell first with:"
  echo "export OPENROUTER_API_KEY=your_api_key_here"
fi 