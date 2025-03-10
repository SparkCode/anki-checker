# System Patterns: Anki Checker

## Architecture
Based on the project structure, Anki Checker follows a standard React application architecture with integration to AI services:

```
Frontend (React)
    │
    ├── Components (UI elements)
    │   └── AnkiForm (Main interface)
    │
    ├── Services
    │   └── API Service (Communication with OpenRouter API)
    │       └── ChatGPT-4o Model (AI for answer evaluation)
    │
    └── Utils
        └── Transcription Utils (Helper functions)
```

The application appears to use a component-based architecture with clear separation of concerns between UI, services, and utilities.

## Key Technical Decisions
- **React Framework**: The project is built using React, indicated by the standard React file structure
- **AI Integration**: Uses OpenRouter API to access ChatGPT-4o for AI-powered answer evaluation
- **REST API Communication**: Uses a service layer (api.js) to handle communication with OpenRouter API
- **Component-Based UI**: UI elements are organized as reusable React components
- **Testing Strategy**: Includes Jest tests for components, services, and utilities
- **Mock Implementation**: Uses Jest mocks for external dependencies like axios (src/__mocks__/axios.js)
- **API Key Storage**: Uses localStorage for storing the OpenRouter API key

## Design Patterns
- **Container/Presentation Pattern**: Likely separation between data handling and UI presentation
- **Service Layer Pattern**: Encapsulates API communication in a dedicated service (api.js)
- **Utility Module Pattern**: Common functionality extracted into utility modules (transcriptionUtils.js)
- **Component Composition**: React components probably assembled through composition
- **State Management**: Likely using React's built-in state management (not Redux, as no related files are visible)

## Component Relationships
- **AnkiForm Component**: Main interface for user input and interaction
  - Likely communicates with API service for data processing
  - May use transcriptionUtils for specialized text processing
- **API Service**: Handles communication with backend APIs
  - Provides methods for sending data to be validated/processed
  - Returns results to components for display
- **Transcription Utilities**: Provides helper functions for text processing
  - Likely used by components or services for specialized functionality

## Data Flow
```
User Input (AnkiForm) → API Service → OpenRouter API → ChatGPT-4o Model
          ↑              ↓
Transcription Utils    Results
          ↓              ↓
  Clean Question    Feedback Display
```

The process flow is:
1. User enters Anki question and their answer in AnkiForm
2. Transcription Utils remove phonetic notations from the question
3. API Service formats prompt and sends to OpenRouter API
4. OpenRouter routes the request to ChatGPT-4o model
5. ChatGPT-4o evaluates the answer and provides feedback
6. Results are displayed to the user

Note: This system patterns document is an initial assessment based on the visible project structure. It will be refined as we gain more insights into the actual implementation details and architectural decisions.
