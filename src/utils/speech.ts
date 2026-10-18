/**
 * Web Speech Synthesis (TTS) and Web Speech Recognition (STT) helpers
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  synth = window.speechSynthesis;
}

export interface SpeakOptions {
  rate?: number; // 0.75 for slow, 1.0 for normal
  pitch?: number;
  lang?: "en-US" | "en-GB" | "vi-VN";
  emphasizeEnding?: boolean;
  endingSound?: string; // e.g. "/t/", "/s/", "/k/", "/d/", "/ks/"
  onEnd?: () => void;
}

export function speakText(text: string, options: SpeakOptions = {}): void {
  if (!synth) {
    console.warn("Speech synthesis is not supported on this browser.");
    options.onEnd?.();
    return;
  }

  // Cancel any ongoing speech
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate ?? 0.92; // slightly slower ensures crystal-clear ending consonants
  utterance.pitch = options.pitch ?? 1.05; // natural child-friendly voice
  utterance.lang = options.lang ?? "en-US";

  // Try to pick a high quality natural voice if available
  const voices = synth.getVoices();
  const preferredVoice = voices.find(
    (v) =>
      v.lang.startsWith(options.lang || "en") &&
      (v.name.includes("Natural") ||
        v.name.includes("Google") ||
        v.name.includes("Samantha") ||
        v.name.includes("Jenny") ||
        v.name.includes("Guy") ||
        v.name.includes("Aria"))
  );
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onend = () => {
    options.onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn("Speech synthesis utterance error:", e);
    options.onEnd?.();
  };

  synth.speak(utterance);
}

/**
 * Phonics & Ending Sound Slow-Motion Trainer
 * Speaks the target word slowly and clearly to train aspirated / plosive final consonants
 */
export function speakSlowPhonics(word: string, endingSound?: string): void {
  speakText(word, {
    rate: 0.75, // slow motion phonics speed
    pitch: 1.0,
    lang: "en-US",
  });
}

/**
 * Speaks target word followed by explicit ending consonant sound
 */
export function speakWithEndingSoundDrill(word: string, endingSound: string): void {
  // First speak the word clearly
  speakText(word, {
    rate: 0.82,
    onEnd: () => {
      // Short pause then speak clear ending sound
      setTimeout(() => {
        const cleanSound = endingSound.replace(/\//g, "").trim();
        speakText(cleanSound, { rate: 0.7, pitch: 1.1 });
      }, 350);
    },
  });
}

export function stopSpeech(): void {
  if (synth) {
    synth.cancel();
  }
}

export const stopSpeaking = stopSpeech;

// Speech recognition helper
export interface SpeechRecognitionController {
  start: () => void;
  stop: () => void;
  abort: () => void;
  isListening: boolean;
}

export function createSpeechRecognizer(
  onResult: (transcript: string, isFinal: boolean) => void,
  onStatusChange?: (isListening: boolean) => void,
  onError?: (error: string) => void,
  lang: string = "en-US"
): SpeechRecognitionController {
  if (typeof window === "undefined") {
    return {
      start: () => {},
      stop: () => {},
      abort: () => {},
      isListening: false,
    };
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Speech Recognition API is not supported in this browser.");
    return {
      start: () => {
        onError?.("Microphone speech recognition is not supported in this browser. You can type your answer!");
      },
      stop: () => {},
      abort: () => {},
      isListening: false,
    };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = lang;

  let listening = false;
  let lastCapturedText = "";

  recognition.onstart = () => {
    listening = true;
    lastCapturedText = "";
    onStatusChange?.(true);
  };

  recognition.onresult = (event: any) => {
    let finalTranscript = "";
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const currentText = (finalTranscript || interimTranscript).trim();
    if (currentText) {
      lastCapturedText = currentText;
    }
    onResult(currentText, !!finalTranscript);
  };

  recognition.onerror = (event: any) => {
    console.warn("Speech recognition error:", event.error);
    listening = false;
    onStatusChange?.(false);
    onError?.(event.error === "not-allowed" ? "Microphone permission was denied." : "Microphone error: " + event.error);
  };

  recognition.onend = () => {
    listening = false;
    onStatusChange?.(false);
    if (lastCapturedText) {
      onResult(lastCapturedText, true);
    }
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch (e) {
        console.warn("Recognition already started or error:", e);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (e) {}
    },
    abort: () => {
      try {
        recognition.abort();
      } catch (e) {}
    },
    get isListening() {
      return listening;
    },
  };
}
