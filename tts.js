function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    // ЗАДЪЛЖИТЕЛНО: български език
    utterance.lang = 'bg-BG';

    // опит за избор на български глас
    const voices = speechSynthesis.getVoices();
    const bgVoice = voices.find(v => v.lang === 'bg-BG');

    if (bgVoice) {
        utterance.voice = bgVoice;
    }

    speechSynthesis.cancel(); // спира предишно говорене
    speechSynthesis.speak(utterance);
}

// ако използваш speakAI
function speakAI(text) {
    speak(text);
}
window.speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
};
