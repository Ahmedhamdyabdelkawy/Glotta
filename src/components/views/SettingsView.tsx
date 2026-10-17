import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState('speech');
  const [selectedModel, setSelectedModel] = useState('Glotta Acoustic Bridge v2.4 (Ultra-Low Latency, 28ms edge)');
  const [autoFallback, setAutoFallback] = useState(true);
  const [toneNuance, setToneNuance] = useState(78);
  const [voicePersona, setVoicePersona] = useState<'adaptive' | 'neutral'>('adaptive');
  const [selectedDialect, setSelectedDialect] = useState('Cairo/Alex Tech');
  const [jargonPreserve, setJargonPreserve] = useState(true);
  const [captionSize, setCaptionSize] = useState<'Small' | 'Medium' | 'Large' | 'Extra Large'>('Large');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  // Sound Check testing
  const [testingSample, setTestingSample] = useState(false);
  const [soundCheckStatus, setSoundCheckStatus] = useState<string | null>(null);

  const handleTestPhrase = () => {
    setTestingSample(true);
    setSoundCheckStatus('Sampling vocal harmonics (48kHz)...');
    setTimeout(() => {
      setSoundCheckStatus('Synthesizing target English probe (28ms delay)...');
    }, 1500);
    setTimeout(() => {
      setTestingSample(false);
      setSoundCheckStatus('Probe Verified: 99.4% acoustic fidelity!');
    }, 3000);
  };

  const handleReset = () => {
    setToneNuance(78);
    setVoicePersona('adaptive');
    setSelectedDialect('Cairo/Alex Tech');
    setJargonPreserve(true);
    setCaptionSize('Large');
    setReducedMotion(true);
    setHighContrast(false);
    alert('Settings reset to recommended neural engine defaults.');
  };

  const handleApply = () => {
    alert('Engine configurations compiled and synced to Frankfurt (FRA-01) edge node.');
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Top Context & Header Banner */}
      <div className="px-4 sm:px-8 pt-8 pb-6 bg-surface-container-low flex flex-col gap-6 border-b border-outline-variant/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-label-mono bg-surface-container-highest text-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold text-xs">
                Engine Config · Matrix v2.4
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                Edge Node: Frankfurt (FRA-01)
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Speech Engine &amp; Calibration
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Fine-tune real-time neural acoustic cloning, edge quantization latency, dialect matching, and synthetic emotional nuance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-secondary text-lg">speed</span>
              <div className="flex flex-col">
                <span className="font-label-mono text-label-mono text-on-surface-variant leading-none text-[10px]">
                  Measured RTT
                </span>
                <span className="font-label-mono text-label-mono font-bold text-secondary text-xs">28.4ms</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-lg">neurology</span>
              <div className="flex flex-col">
                <span className="font-label-mono text-label-mono text-on-surface-variant leading-none text-[10px]">
                  Quantization
                </span>
                <span className="font-label-mono text-label-mono font-bold text-primary text-xs">INT4 CoreML</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-none">
          {[
            { id: 'speech', label: 'Speech & Neural Engine', icon: 'graphic_eq' },
            { id: 'languages', label: 'Languages & Dialects', icon: 'translate' },
            { id: 'hardware', label: 'Audio Hardware & Calibration', icon: 'mic_external_on' },
            { id: 'appearance', label: 'Appearance & Accessibility', icon: 'contrast' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === tab.id
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Body Content Grid */}
      <div className="px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full">
        {/* Left Column (8 cols): Primary Settings */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* SECTION 1: Real-Time Neural Speech Engine */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">neurology</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight">
                    Real-Time Neural Speech Engine
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Configure acoustic translation weightings, edge fallbacks, and cadence modeling
                  </p>
                </div>
              </div>
              <span className="font-label-mono text-label-mono bg-surface-container px-3 py-1 rounded-full text-primary font-bold text-xs">
                ACTIVE PIPELINE
              </span>
            </div>

            <div className="flex flex-col gap-5 pt-2">
              {/* Model Selection Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface font-medium flex items-center justify-between text-xs">
                  <span>Acoustic Neural Model Architecture</span>
                  <span className="font-label-mono text-label-mono text-primary font-semibold">28ms Latency Baseline</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-4 py-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-container pr-10 text-xs sm:text-sm border border-outline-variant/30"
                  >
                    <option>Glotta Acoustic Bridge v2.4 (Ultra-Low Latency, 28ms edge)</option>
                    <option>Glotta Studio Polyglot v2.3 (High Fidelity 48kHz, 54ms edge)</option>
                    <option>Acoustic Nano v1.9 (Offline Edge Lightweight, 19ms)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">
                    expand_more
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Direct on-device transformer running quantized tensor cores for zero speech buffering.
                </p>
              </div>

              {/* Fallback Toggle Card */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <div className="flex flex-col pr-4">
                  <span className="font-label-md text-label-md font-semibold text-on-surface text-xs sm:text-sm">
                    Auto-fallback to Cloud Titan Engine
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Switches to distributed multi-GPU cluster if local edge compute drops below 40 FPS.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={autoFallback}
                    onChange={() => setAutoFallback(!autoFallback)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>

              {/* Tone & Emotional Nuance Preservation */}
              <div className="p-4 bg-surface-container rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">sentiment_satisfied</span>
                    <span className="font-label-md text-label-md font-semibold text-on-surface text-xs sm:text-sm">
                      Tone &amp; Emotional Nuance Preservation
                    </span>
                  </div>
                  <span className="font-label-mono text-xs font-bold text-secondary">
                    Level: {(toneNuance / 100).toFixed(2)}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Clones questioning inflection, hesitation markers, and conversational emphasis into synthetic target speech.
                </p>
                <div className="flex flex-col gap-1.5 pt-2">
                  <div className="flex justify-between font-label-mono text-label-mono text-[11px]">
                    <span className="text-on-surface-variant">Flat Interpreted (0.0)</span>
                    <span className="text-secondary font-bold">Dynamic Expression (0.78)</span>
                    <span className="text-on-surface-variant">Theatrical (1.0)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={toneNuance}
                    onChange={(e) => setToneNuance(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Voice Persona Synthesis Mode */}
              <div className="flex flex-col gap-3">
                <span className="font-label-md text-label-md font-semibold text-on-surface text-xs sm:text-sm">
                  Voice Persona Synthesis Mode
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    onClick={() => setVoicePersona('adaptive')}
                    className={`p-4 rounded-xl flex flex-col gap-2 cursor-pointer transition-all border ${
                      voicePersona === 'adaptive'
                        ? 'bg-surface-container-low border-primary shadow-sm'
                        : 'bg-surface-container-low/60 border-outline-variant/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">record_voice_over</span>
                        <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                          Adaptive Voice Clone
                        </span>
                      </div>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center ${voicePersona === 'adaptive' ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                        {voicePersona === 'adaptive' && <span className="w-1.5 h-1.5 rounded-full bg-on-primary"></span>}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Synthesizes foreign words with your natural vocal pitch, harmonic resonance, and timbre.
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="font-label-mono text-label-mono bg-primary/10 text-primary px-2 py-0.5 rounded-md text-[10px] font-semibold">
                        8.4s Voice Sample Loaded
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setVoicePersona('neutral')}
                    className={`p-4 rounded-xl flex flex-col gap-2 cursor-pointer transition-all border ${
                      voicePersona === 'neutral'
                        ? 'bg-surface-container-low border-primary shadow-sm'
                        : 'bg-surface-container-low/60 border-outline-variant/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-xl">interpreter_mode</span>
                        <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                          Neutral Studio Interpreter
                        </span>
                      </div>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center ${voicePersona === 'neutral' ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                        {voicePersona === 'neutral' && <span className="w-1.5 h-1.5 rounded-full bg-on-primary"></span>}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Clear, objective studio voice actor. Preferred for formal university lectures and peer defense.
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md text-[10px]">
                        Reference Model 'Clara'
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: Language & Dialect Matrix */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">language</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight">
                  Language &amp; Dialect Matrix
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Set acoustic dialect variations and technical term preservation filters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Spoken Source */}
              <div className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-3 border border-outline-variant/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-label-mono text-label-mono text-on-surface-variant font-semibold">
                    MY SPOKEN LANGUAGE
                  </span>
                  <span className="font-label-mono text-label-mono text-primary font-bold">SOURCE</span>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-lg shadow-sm border border-outline-variant/30">
                  <span className="text-xl leading-none">🇪🇬</span>
                  <div className="flex flex-col flex-1">
                    <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                      Arabic (العربية)
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      {selectedDialect}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-base">unfold_more</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Modern Standard (MSA)', 'Cairo/Alex Tech', 'Gulf (Khaleeji)'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDialect(d)}
                      className={`font-label-mono text-label-mono px-2 py-1 rounded text-xs transition-all ${
                        selectedDialect === d
                          ? 'bg-primary-container text-on-primary font-bold'
                          : 'bg-surface-container-highest text-on-surface font-medium hover:bg-surface-container'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Listening Target */}
              <div className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-3 border border-outline-variant/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-label-mono text-label-mono text-on-surface-variant font-semibold">
                    SYNTHESIZED LISTENING TARGET
                  </span>
                  <span className="font-label-mono text-label-mono text-secondary font-bold">EARPIECE</span>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-lg shadow-sm border border-outline-variant/30">
                  <span className="text-xl leading-none">🇺🇸</span>
                  <div className="flex flex-col flex-1">
                    <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                      English (United States)
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      General Academic &amp; Tech Vocab
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-base">unfold_more</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-on-surface-variant text-xs">
                  <span className="font-body-sm text-body-sm">Secondary reading display:</span>
                  <span className="font-label-mono text-label-mono bg-surface-container px-2 py-0.5 rounded text-on-surface font-medium">
                    DE (German)
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Jargon Preservation Switch */}
            <div className="p-5 bg-surface-container rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-lg">terminal</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                      Technical Jargon &amp; Code Term Preservation
                    </span>
                    <span className="font-label-mono text-label-mono bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full text-[10px]">
                      AI HEURISTIC
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl text-xs">
                    Automatically suppresses translation on raw variable names, SQL keywords (
                    <code className="font-body-code text-body-code bg-surface-container-highest px-1 rounded text-[11px]">
                      LEFT JOIN
                    </code>
                    ), Kubernetes manifests, and CLI commands.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={jargonPreserve}
                  onChange={() => setJargonPreserve(!jargonPreserve)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
              </label>
            </div>
          </section>

          {/* SECTION 3: Appearance & Accessibility */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">accessibility_new</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight">
                  Display &amp; Sensory Accessibility
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Adjust visual contrasts, caption scales, and ambient room feedback
                </p>
              </div>
            </div>

            {/* Theme Canvas Picker */}
            <div className="flex flex-col gap-3">
              <span className="font-label-md text-label-md font-semibold text-on-surface text-xs sm:text-sm">
                Interface Canvas Tone
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Light */}
                <div
                  onClick={() => setIsDarkMode(false)}
                  className={`flex items-center justify-between p-4 rounded-xl shadow-sm cursor-pointer border transition-all ${
                    !isDarkMode
                      ? 'bg-surface-container-high border-primary ring-1 ring-primary'
                      : 'bg-surface-container-low border-outline-variant/30 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center shadow-inner border border-outline-variant/40">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                        Linen Scholar (Light)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                        Low-glare organic paper
                      </span>
                    </div>
                  </div>
                  {!isDarkMode && (
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                  )}
                </div>

                {/* Dark */}
                <div
                  onClick={() => setIsDarkMode(true)}
                  className={`flex items-center justify-between p-4 rounded-xl shadow-sm cursor-pointer border transition-all ${
                    isDarkMode
                      ? 'bg-[#1C2321] text-[#E8EDEA] border-primary ring-1 ring-primary'
                      : 'bg-[#1C2321]/90 text-white border-outline-variant/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#141918] flex items-center justify-center border border-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5DB8AC]"></span>
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-xs sm:text-sm">
                        Forest Charcoal (Dark)
                      </span>
                      <span className="font-body-sm text-body-sm text-slate-400 text-xs">
                        Acoustic booth ambient
                      </span>
                    </div>
                  </div>
                  {isDarkMode && (
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                  )}
                </div>
              </div>
            </div>

            {/* Live In-Room Translation Caption Size */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Live In-Room Translation Caption Size
                </span>
                <span className="font-label-mono text-label-mono text-primary font-bold">
                  {captionSize} ({captionSize === 'Small' ? '14px' : captionSize === 'Medium' ? '16px' : captionSize === 'Large' ? '18px' : '22px'})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1 text-center font-label-md text-label-md text-xs">
                {(['Small', 'Medium', 'Large', 'Extra Large'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setCaptionSize(sz)}
                    className={`py-2.5 rounded-lg transition-all ${
                      captionSize === sz
                        ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <div className="flex flex-col pr-3">
                  <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">
                    High Contrast Waveforms
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Enhances speech cadence edges
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={() => setHighContrast(!highContrast)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <div className="flex flex-col pr-3">
                  <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">
                    Reduced Ambient Motion
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Disables pulsing speaker rings
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reducedMotion}
                    onChange={() => setReducedMotion(!reducedMotion)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Sound Check Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col gap-5 sticky top-24 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold text-sm sm:text-base">
                  Sound Check
                </span>
              </div>
              <span className="font-label-mono text-label-mono bg-secondary-container px-2 py-0.5 rounded text-on-secondary-container font-semibold text-xs">
                48 kHz · 24-bit
              </span>
            </div>

            {/* Hardware Interface Info */}
            <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">mic</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">
                    MacBook Pro Mic (Array)
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Beamforming Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => alert('Audio interfaces available: Built-in Array (48kHz), Focusrite Scarlett (96kHz)')}
                className="p-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-container text-on-surface-variant"
                title="Switch Input"
              >
                <span className="material-symbols-outlined text-sm">settings_input_composite</span>
              </button>
            </div>

            {/* Live Audio Meter & Visualizer */}
            <div className="bg-surface-container rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant text-xs">
                <span>INPUT DECIBELS</span>
                <span className="text-primary font-bold">-14.2 dBFS (Nominal)</span>
              </div>

              {/* Dynamic Waveform Visualizer */}
              <div className="h-20 w-full flex items-end justify-between gap-1 px-1 py-2 bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/30">
                <span className="w-1.5 bg-primary/40 rounded-full h-3"></span>
                <span className="w-1.5 bg-primary/50 rounded-full h-5"></span>
                <span className="w-1.5 bg-primary rounded-full h-10"></span>
                <span className="w-1.5 bg-primary rounded-full h-14"></span>
                <span className="w-1.5 bg-secondary-container rounded-full h-16 animate-pulse"></span>
                <span className="w-1.5 bg-secondary rounded-full h-12"></span>
                <span className="w-1.5 bg-primary rounded-full h-9"></span>
                <span className="w-1.5 bg-primary/60 rounded-full h-4"></span>
                <span className="w-1.5 bg-primary/40 rounded-full h-6"></span>
                <span className="w-1.5 bg-primary rounded-full h-11"></span>
                <span className="w-1.5 bg-secondary rounded-full h-15"></span>
                <span className="w-1.5 bg-secondary-container rounded-full h-13"></span>
                <span className="w-1.5 bg-primary rounded-full h-8"></span>
                <span className="w-1.5 bg-primary/50 rounded-full h-5"></span>
                <span className="w-1.5 bg-primary/30 rounded-full h-3"></span>
              </div>

              {soundCheckStatus && (
                <div className="text-xs font-label-mono text-primary font-medium text-center">
                  {soundCheckStatus}
                </div>
              )}

              <button
                onClick={handleTestPhrase}
                disabled={testingSample}
                className="w-full py-2.5 px-4 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary font-label-md text-label-md font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-sm"
              >
                <span className="material-symbols-outlined text-base">record_voice_over</span>
                <span>{testingSample ? 'Testing Audio...' : 'Speak Sample Phrase to Test'}</span>
              </button>
            </div>

            {/* Translation Pipeline Latency Breakdown */}
            <div className="flex flex-col gap-2.5 pt-1">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider font-semibold text-xs">
                Translation Pipeline Latency
              </span>
              <div className="p-3.5 bg-surface-container-low rounded-xl flex flex-col gap-2 border border-outline-variant/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">Input: Arabic (EG)</span>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">arrow_forward</span>
                  <span className="font-body-sm text-body-sm font-semibold text-primary">Target: English (US)</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full" style={{ width: '45%' }} title="Acoustic Recognition: 14ms"></div>
                  <div className="bg-primary-container h-full" style={{ width: '30%' }} title="Neural Translation: 10ms"></div>
                  <div className="bg-secondary h-full" style={{ width: '25%' }} title="Voice Synthesis: 8ms"></div>
                </div>
                <div className="flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant pt-1 text-[11px]">
                  <span>Total Delay: <strong className="text-on-surface">32ms</strong></span>
                  <span>P99: <strong className="text-secondary">41ms</strong></span>
                </div>
              </div>
            </div>

            {/* Live Sample Transcript Probe Result */}
            <div className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-2 border border-outline-variant/20">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase font-semibold text-xs">
                Acoustic Probe Result
              </span>
              <div className="p-2.5 bg-surface-container-lowest rounded-lg flex flex-col gap-1 border border-outline-variant/30">
                <span className="font-body-sm text-body-sm text-on-surface-variant italic text-xs font-arabic" dir="rtl">
                  "إحنا عملنا دمج للـ pull request الخاص بالـ database"
                </span>
                <div className="flex items-center gap-1.5 pt-1 text-primary">
                  <span className="material-symbols-outlined text-sm">graphic_eq</span>
                  <span className="font-body-sm text-body-sm font-medium text-on-surface text-xs">
                    "We merged the database pull request."
                  </span>
                </div>
              </div>
              <span className="font-label-mono text-label-mono text-primary text-right font-medium text-xs">
                Confidence: 99.4% · Synthesized
              </span>
            </div>

            {/* Hardware Info Card */}
            <div className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border border-outline-variant/20">
              <img
                className="w-12 h-12 rounded-lg object-cover shrink-0"
                alt="Studio microphone"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6JeFnkA0g0Rj-y9rNu6j-GLzN7i4G5duIwzIG7grPwBOdPK5FQyUHIfr-ed8tiNgml_bAqDi9JkxRtBKdvPfP4-uzQ-MrbXxVdcYJ2ozWJyHBvZ9S3_ALOjUomYXsX1npqbSLSrK2vJDrHU4pEcRkXYreVCAy7_mH7OKZYnHgFAzt3kXRlaDTQpuKe68BdDFTO1SnJnBsUljr0Vcl-NwsL21XtqrxaOvuOlIZevZEarxptFGhbRn9"
              />
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">
                  Noise Cancellation
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                  Spectral subtraction running on CoreML
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Bottom Save & Status Bar */}
      <div className="fixed bottom-0 left-0 lg:left-72 right-0 z-30 px-4 sm:px-8 py-4 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(31,43,40,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/20">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">cloud_done</span>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
              Changes synced to local edge node
            </span>
            <span className="font-label-mono text-label-mono text-on-surface-variant text-[11px]">
              Auto-saved 2 minutes ago · Latency Bridge v2.4
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all font-medium text-xs sm:text-sm"
          >
            Reset to Engine Defaults
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-bold shadow-md active:scale-95 transition-all flex items-center gap-2 text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-base">check</span>
            <span>Apply Engine Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
