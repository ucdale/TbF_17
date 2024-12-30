// eslint.config.js
import js from '@eslint/js';

export default [
  js.configs.recommended,
  { ignores: ['/Presentation/*/**'] },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn'
    }
  }
];
