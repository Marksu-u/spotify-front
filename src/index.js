import React from 'react';
import { createRoot } from 'react-dom/client';
import { AudioPlaybackProvider } from '../src/context/AudioPlaybackProvider';
import { UniqueIdProvider } from './context/UniqueIDContext';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <AudioPlaybackProvider>
    <UniqueIdProvider>
      <App />
    </UniqueIdProvider>
  </AudioPlaybackProvider>
);
