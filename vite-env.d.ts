// FIX: Removed the broken reference to 'vite/client' and added a global declaration for `process.env` to support the Gemini API guidelines for API key management.
declare var process: {
  env: {
    API_KEY: string | undefined;
  }
};
