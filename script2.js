document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Effect Logic
    const typeElement = document.getElementById('typing-text');
    
    if (typeElement) {
        const textToType = typeElement.getAttribute('data-text');
        let index = 0;

        function typeWriter() {
            if (index < textToType.length) {
                typeElement.textContent += textToType.charAt(index);
                index++;
                // Randomize typing speed for realism
                setTimeout(typeWriter, Math.random() * 100 + 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // 2. Active Page Highlighting
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        // Matches exact page or highlights home if root
        if (link.getAttribute('href') === currentPage) {
            link.style.borderBottom = "2px solid var(--neon-cyan)";
            link.style.color = "var(--neon-cyan)";
        }
    });

    console.log("%c AETHERI WEB DESIGN ", "background: #000; color: #00f3ff; font-size: 15px; padding: 5px; border: 1px solid #00f3ff;");
});