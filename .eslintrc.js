module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['prettier'], // Supprimez 'plugin:react/recommended' si c'est redondant
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 13,
      sourceType: 'module',
    },
    plugins: ['prettier'], // Supprimez 'react' si c'est redondant
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off', // Gardez cette règle si nécessaire
    },
  };
  