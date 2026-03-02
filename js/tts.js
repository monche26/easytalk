// === EasyTalk TTS - Безплатна версия ===

function speakAI(text) {
    if (!text) return;

    // Спира ако вече говори
    speechSynthesis.cancel();

    const voices = speechSynthesis.getVoices();

    // Търсим български глас
    const bgVoice = voices.find(v => v.lang === "bg-BG");

    if (bgVoice) {
        // Ако има български глас → използваме него
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "bg-BG";
        utterance.voice = bgVoice;
        utterance.rate = 0.9;   // малко по-бавно
        utterance.pitch = 1;

        speechSynthesis.speak(utterance);

    } else {
        // Ако няма български глас → Google TTS fallback
        const audio = new Audio(
            "https://translate.google.com/translate_tts?ie=UTF-8&tl=bg&client=tw-ob&q=" 
            + encodeURIComponent(text)
        );

        audio.play().catch(err => {
            console.log("Браузърът блокира звука:", err);
        });
    }
}

// Зареждаме гласовете правилно (важно за Chrome)
window.speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
};