let initialized = false;

/**
 * Call this on the user's FIRST interaction (e.g., clicking "Start Intake" button)
 * to unlock Web Speech API on iOS/Android.
 */
export const unlockMobileSpeech = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  const silentUtterance = new SpeechSynthesisUtterance('');
  window.speechSynthesis.speak(silentUtterance);
  initialized = true;
};

/**
 * Speak text using available native female voices on mobile browsers
 */
export const speakMobileText = (text: string, lang: string = 'en') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    const targetLangPrefix = lang.split('-')[0].toLowerCase();
    
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'es' ? 'es-ES' : 'en-IN';

    const matchedVoice = voices.find((v) => {
      const isLangMatch = v.lang.toLowerCase().startsWith(targetLangPrefix);
      const name = v.name.toLowerCase();
      
      return isLangMatch && (
        name.includes('female') || 
        name.includes('samantha') || 
        name.includes('google') || 
        name.includes('natural') || 
        name.includes('compact')
      );
    }) || voices.find((v) => v.lang.toLowerCase().startsWith(targetLangPrefix));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    synth.speak(utterance);
  };

  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => {
      speak();
      synth.onvoiceschanged = null;
    };
  } else {
    speak();
  }
};
