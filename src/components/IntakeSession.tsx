'use client';

import React, { useState } from 'react';
import { unlockMobileSpeech, speakMobileText } from '@/utils/tts';

export default function IntakeSession() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    { id: 'q_name', text: "Hello! Welcome to Nyle Health. Could you please tell me your full name?" },
    { id: 'q_reason', text: "Thank you. Can you describe what symptoms or health concerns you are experiencing today?" },
    { id: 'q_duration', text: "Got it. How long have you been experiencing these symptoms?" }
  ];

  const handleStart = () => {
    // 1. Unlock mobile browser TTS context on first user tap
    unlockMobileSpeech();
    setStarted(true);

    // 2. Read out the first question
    speakMobileText(questions[0].text, 'en');
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
      speakMobileText(questions[nextStep].text, 'en');
    } else {
      speakMobileText("Thank you! Your intake is complete.", 'en');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
      {!started ? (
        <div>
          <h2>Nyle Health Patient Intake</h2>
          <button 
            onClick={handleStart}
            style={{
              padding: '12px 24px',
              fontSize: '18px',
              backgroundColor: '#0284c7',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Start Intake Session 🔊
          </button>
        </div>
      ) : (
        <div>
          <h3>Question {currentStep + 1} of {questions.length}</h3>
          <p style={{ fontSize: '20px', margin: '20px 0' }}>
            {questions[currentStep].text}
          </p>
          <button 
            onClick={handleNext}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#16a34a',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Next Question ➡️
          </button>
        </div>
      )}
    </div>
  );
}
