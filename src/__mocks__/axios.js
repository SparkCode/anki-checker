// Mock implementation of axios
const axios = {
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => axios),
  defaults: {
    headers: {
      common: {}
    }
  }
};

export default axios; 