import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speed, setSpeed] = useState(1);  
  const synth = window.speechSynthesis;

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      
      setSelectedVoice(availableVoices.find((voice) => voice.default));
    };
  
    updateVoices();
  
    synth.addEventListener('voiceschanged', updateVoices);
  
    return () => {
      synth.removeEventListener('voiceschanged', updateVoices);
    };
  }, [synth]);
  

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleVoiceChange = (e) => {
    const selectedVoiceName = e.target.value;
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    setSelectedVoice(selectedVoice);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);

    // Set the selected voice
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Set the speaking speed
    utterance.rate = speed;

    synth.speak(utterance);
  };

  return (
    <div>
      <textarea
        placeholder="Enter text to speak..."
        value={text}
        onChange={handleInputChange}
      />
      <div>
        <label>Select Voice: </label>
        <select value={selectedVoice ? selectedVoice.name : ''} onChange={handleVoiceChange}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Speed: </label>
        <input
          type="number"
          step="0.1"
          value={speed}
          onChange={handleSpeedChange}
          min="0.1"
          max="10"
        />
      </div>
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
