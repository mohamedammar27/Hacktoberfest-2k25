document.addEventListener('DOMContentLoaded', function() {

    // --- Typing Effect ---
    const typingElement = document.querySelector('.typing-effect');
    const words = ["a Full-Stack Developer", "an AI-ML Enthusiast", "a Student"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);

        typingElement.textContent = currentChar;

        // Add a fallback to ensure the element isn't empty
        if (typingElement.textContent === '') {
            typingElement.innerHTML = '&nbsp;';
        }

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100); // Typing speed
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50); // Deleting speed
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1200); // Pause before start/end
        }
    }

    type();


    // --- Scroll Reveal Animation ---
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial check on load
    handleScrollAnimation();

});

