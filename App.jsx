import React, { useState, useEffect, useCallback } from 'react';
import { Copy, RefreshCw, ShieldCheck, ShieldAlert, Shield, Check, Lock } from 'lucide-react';

const App = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState('medium');

  const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBER_CHARS = '0123456789';
  const SYMBOL_CHARS = '!@$?*+-=';

  const WORDS = [
    "Swift", "Silent", "Brave", "Calm", "Ocean", "Mountain", "River", "Forest",
    "Cosmic", "Solar", "Lunar", "Star", "Nebula", "Orbit", "Planet", "Comet",
    "Falcon", "Eagle", "Hawk", "Owl", "Tiger", "Lion", "Wolf", "Bear",
    "Ruby", "Emerald", "Sapphire", "Gold", "Silver", "Crystal", "Opal", "Jade"
  ];

  const generatePassword = useCallback(() => {
    if (length === 8) {
      let charSet = '';
      if (includeUppercase) charSet += UPPERCASE_CHARS;
      if (includeLowercase) charSet += LOWERCASE_CHARS;
      if (includeNumbers) charSet += NUMBER_CHARS;
      if (includeSymbols) charSet += SYMBOL_CHARS;
      if (charSet === '') charSet = LOWERCASE_CHARS;

      let newPassword = '';
      const mandatory = [];
      if (includeUppercase) mandatory.push(UPPERCASE_CHARS[Math.floor(Math.random() * UPPERCASE_CHARS.length)]);
      if (includeLowercase) mandatory.push(LOWERCASE_CHARS[Math.floor(Math.random() * LOWERCASE_CHARS.length)]);
      if (includeNumbers) mandatory.push(NUMBER_CHARS[Math.floor(Math.random() * NUMBER_CHARS.length)]);
      if (includeSymbols) mandatory.push(SYMBOL_CHARS[Math.floor(Math.random() * SYMBOL_CHARS.length)]);

      for (let i = 0; i < length - mandatory.length; i++) {
        newPassword += charSet[Math.floor(Math.random() * charSet.length)];
      }
      setPassword((newPassword + mandatory.join('')).split('').sort(() => 0.5 - Math.random()).join('').slice(0, 8));
      setStrength('weak');
    } else {
      let w1 = WORDS[Math.floor(Math.random() * WORDS.length)];
      let w2 = WORDS[Math.floor(Math.random() * WORDS.length)];
      while (w1 === w2) w2 = WORDS[Math.floor(Math.random() * WORDS.length)];

      const num = NUMBER_CHARS[Math.floor(Math.random() * NUMBER_CHARS.length)];
      const sym = SYMBOL_CHARS[Math.floor(Math.random() * SYMBOL_CHARS.length)];
      
      const targetTextLen = length - 2;
      let base = w1 + w2;

      if (base.length < targetTextLen) {
        while (base.length < targetTextLen) base += LOWERCASE_CHARS[Math.floor(Math.random() * LOWERCASE_CHARS.length)];
      }
      if (base.length > targetTextLen) base = base.substring(0, targetTextLen);

      setPassword(base + num + sym);
      setStrength(length === 12 ? 'medium' : 'strong');
    }
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => { generatePassword(); }, [generatePassword, length]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Password Generator
        </h1>

        <div className="relative bg-slate-900 rounded-xl p-4 flex items-center justify-between border border-slate-700">
          <span className="font-mono text-xl text-emerald-400 break-all">{password}</span>
          <div className="flex gap-2">
            <button onClick={generatePassword} className="p-2 text-slate-400 hover:text-white"><RefreshCw size={20} /></button>
            <button onClick={copyToClipboard} className="p-2 text-slate-400 hover:text-white">{copied ? <Check size={20} /> : <Copy size={20} />}</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[8, 12, 15].map(l => (
            <button key={l} onClick={() => setLength(l)} className={`py-2 rounded-lg font-bold border transition-all ${length === l ? 'bg-blue-600 border-blue-500' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
              {l} Char
            </button>
          ))}
        </div>

        {length === 8 ? (
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase">Random Settings</p>
            {['Uppercase', 'Lowercase', 'Numbers', 'Symbols'].map(opt => (
              <div key={opt} className="flex justify-between text-sm py-1 border-b border-slate-700/50">
                <span>{opt}</span>
                <span className="text-blue-400">Auto-Included</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg flex gap-2">
            <Lock size={16} className="text-blue-400 shrink-0" />
            <p className="text-xs text-blue-200">Mode: 2 Words + 1 Number + 1 Symbol ({SYMBOL_CHARS})</p>
          </div>
        )}

        <button onClick={generatePassword} className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl transition-all">
          Generate
        </button>
      </div>
    </div>
  );
};

export default App;
