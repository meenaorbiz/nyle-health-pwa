let currentClonedAudio: HTMLAudioElement | null = null;

export async function playClonedVoice(text: string, languageCode = "en-IN"): Promise<void> {
  if (currentClonedAudio) {
    currentClonedAudio.pause();
    currentClonedAudio = null;
  }

  const res = await fetch("/api/tts/sarvam-clone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, languageCode }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Voice synthesis failed");
  }

  const { audio } = await res.json();

  const bytes = Uint8Array.from(atob(audio), (c) => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: "audio/wav" });
  const audioUrl = URL.createObjectURL(blob);

  currentClonedAudio = new Audio(audioUrl);
  await currentClonedAudio.play();
}

export function stopClonedVoice(): void {
  if (currentClonedAudio) {
    currentClonedAudio.pause();
    currentClonedAudio = null;
  }
}
