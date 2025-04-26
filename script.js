// Typing Effect
async function typeWriter(element, phrases) {
    while (true) { // Make it loop continuously
        for (let phrase of phrases) {
            // Clear the previous text
            element.textContent = '';
            
            // Type each character of the current phrase
            for (let i = 0; i < phrase.length; i++) {
                element.textContent += phrase[i];
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            // Wait longer between phrases
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

// Initialize typing effect
window.addEventListener('load', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = [
            "Hi I am Parth Salunke",
            "I am a Full Stack Developer",
            "I am a Problem Solver",
            "I am a Tech Enthusiast"
        ];
        
        // Start typing effect
        typeWriter(typingText, phrases).catch(console.error);
    }
}); 