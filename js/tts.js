function speakAI(text) {
    if (!text) return;

    // Спира, ако вече говори
    speechSynthesis.cancel();

    const voices = speechSynthesis.getVoices();

    // Търси български глас
    const bgVoice = voices.find(v => v.lang === "bg-BG");

    if (bgVoice) {
        // Ако има български глас, го използва 
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "bg-BG";
        utterance.voice = bgVoice;
        utterance.rate = 0.9;   
        utterance.pitch = 1;

        speechSynthesis.speak(utterance);

    } else {
        // Ако няма български глас, използва Google TTS fallback
        const audio = new Audio(
            "https://translate.google.com/translate_tts?ie=UTF-8&tl=bg&client=tw-ob&q=" 
            + encodeURIComponent(text)
        );

        audio.play().catch(err => {
            console.log("Браузърът блокира звука:", err);
        });
    }
}

// Зарежда гласовете правилно
window.speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
};