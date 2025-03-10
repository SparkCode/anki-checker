# Technical Context: Anki Checker

## Technologies Used

### Frontend
- **React**: Main UI framework (as indicated by standard React project structure)
- **CSS**: Used for styling components (eg. AnkiForm.css)
- **JavaScript (ES6+)**: Core programming language

### Testing
- **Jest**: Testing framework (evident from .test.js files)
- **React Testing Library**: Likely used for component testing (standard with React)

### API Integration
- **Axios**: HTTP client for API requests (mocked in __mocks__/axios.js)
- **OpenRouter API**: Used to access AI models for answer checking
- **ChatGPT-4o**: Current AI model used for evaluating Anki answers (previously used Claude 3.7 Sonnet)

### Build & Development
- **Create React App**: Likely bootstrapped with CRA based on the folder structure
- **npm/Node.js**: Package management and runtime

## Development Setup
Based on the standard React application structure, the development setup likely includes:

- **Local Development Server**: Run with `npm start`
- **Build Process**: Generate production build with `npm run build`
- **Test Runner**: Execute tests with `npm test`

## Dependencies
While we don't have direct access to the package.json contents, we can infer the following dependencies based on the project structure:

### Core Dependencies
- react
- react-dom
- react-scripts

### Development Dependencies
- @testing-library/react
- @testing-library/jest-dom
- axios (for API communication)

## Technical Constraints

### Browser Compatibility
- Likely targets modern browsers (based on React usage)
- May include polyfills for broader compatibility

### API Dependencies
- Appears to rely on external API services for processing Anki content
- Requires network connectivity for full functionality

### Performance Considerations
- Standard React rendering optimizations
- Potential network latency when communicating with APIs

## Development Workflow
1. Local development using React development server
2. Component & utility testing with Jest
3. Build process for production deployment
4. Possible deployment to static hosting or server environment

## File Structure Highlights
- `/src/components/`: UI components including AnkiForm
- `/src/services/`: API service layer
- `/src/utils/`: Utility functions including transcription utilities
- `/src/__mocks__/`: Test mocks for external dependencies
- `/public/`: Static assets and html template

This technical context document will be refined as we gain more detailed information about the project's specific technological implementation and dependencies.
