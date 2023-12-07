import AudioPlayer from "./components/AudioPlayer/index.js";

function App() {
  const audioSrc = 'http://localhost:4000/api/audio/stream/6571db6c650bfbccda0d3452';

  return (
    <div className="App">
      <h1>Audio Streaming Test</h1>
      <AudioPlayer src={audioSrc} />
    </div>
  );
}

export default App;
