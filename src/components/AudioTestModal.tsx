import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const AudioTestModal: React.FC = () => {
  const { audioTestModalOpen, setAudioTestModalOpen } = useApp();
  const [isRecordingTest, setIsRecordingTest] = useState(false);
  const [level, setLevel] = useState(35);
  const [playbackActive, setPlaybackActive] = useState(false);
  const [noiseSuppression, setNoiseSuppression] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecordingTest) {
      interval = setInterval(() => {
        setLevel(Math.floor(20 + Math.random() * 65));
      }, 100);
    } else {
      setLevel(15);
    }
    return () => clearInterval(interval);
  }, [isRecordingTest]);

  if (!audioTestModalOpen) return null;

  const handlePlaySample = () => {
    setPlaybackActive(true);
    setTimeout(() => {
      setPlaybackActive(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-outline-variant/30 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">hearing</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Audio &amp; Mic Hardware Test</h3>
              <span className="font-label-mono text-label-mono text-on-surface-variant">Calibrate neural voice bridge</span>
            </div>
          </div>
          <button
            onClick={() => setAudioTestModalOpen(false)}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Input Level Monitor */}
        <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md font-bold text-on-surface">Microphone Input Check</span>
            <span className="font-label-mono text-label-mono text-primary font-bold">
              {isRecordingTest ? `${level} dBFS (Active)` : 'Ready (Idle)'}
            </span>
          </div>

          {/* Level Bar */}
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-100 rounded-full ${
                level > 70 ? 'bg-error' : level > 40 ? 'bg-secondary' : 'bg-primary'
              }`}
              style={{ width: `${level}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs font-label-mono text-on-surface-variant">
            <span>-60 dB</span>
            <span>-20 dB (Nominal)</span>
            <span>0 dB (Clipping)</span>
          </div>

          <button
            onClick={() => setIsRecordingTest(!isRecordingTest)}
            className={`w-full py-2.5 rounded-xl font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 ${
              isRecordingTest
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {isRecordingTest ? 'mic' : 'mic_none'}
            </span>
            <span>{isRecordingTest ? 'Stop Mic Testing' : 'Speak to Test Microphone'}</span>
          </button>
        </div>

        {/* Synthetic Translation Sound Playback Test */}
        <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md font-bold text-on-surface">Earpiece &amp; Neural Audio Test</span>
            <span className="font-label-mono text-label-mono text-secondary font-bold">Latency: 28.4ms</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Plays a simulated high-fidelity multilingual translation sample to verify acoustic clarity and zero jitter.
          </p>

          <button
            onClick={handlePlaySample}
            disabled={playbackActive}
            className={`w-full py-2.5 rounded-xl font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 ${
              playbackActive
                ? 'bg-primary text-on-primary shadow'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {playbackActive ? 'volume_up' : 'play_arrow'}
            </span>
            <span>{playbackActive ? 'Synthesizing Test Audio (48kHz)...' : 'Play Translation Test Tone'}</span>
          </button>
        </div>

        {/* Hardware Toggles */}
        <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-semibold text-on-surface">CoreML Noise Suppression</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Spectral subtraction for keyboard &amp; room echo</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={noiseSuppression}
              onChange={() => setNoiseSuppression(!noiseSuppression)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => setAudioTestModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-all shadow-sm"
          >
            Done Calibration
          </button>
        </div>
      </div>
    </div>
  );
};
