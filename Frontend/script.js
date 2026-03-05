document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('apod-form');
    const dateInput = document.getElementById('birthday-date');
    const submitBtn = document.getElementById('submit-btn');

    // 3D Space Effect Generator
    const spaceContainer = document.getElementById('space-container');
    const numStars = 60;

    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div');
        star.classList.add('star-3d');

        // Random positions spreading from center (rounded to prevent subpixel rendering lag)
        let x = Math.round((Math.random() - 0.5) * 2000);
        let y = Math.round((Math.random() - 0.5) * 2000);

        // Random delays and durations for a chaotic, non-uniform effect
        let delay = (Math.random() * 5).toFixed(2);
        let duration = (8 + Math.random() * 10).toFixed(2);

        star.style.setProperty('--x', `${x}px`);
        star.style.setProperty('--y', `${y}px`);
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;

        // Give some stars pink/purple tint to match the theme
        if (Math.random() > 0.8) {
            star.style.backgroundColor = '#ffb6c1';
        }

        spaceContainer.appendChild(star);
    }

    // UI Elements
    const loadingContainer = document.getElementById('loading-container');
    const errorContainer = document.getElementById('error-container');
    const resultContainer = document.getElementById('result-container');

    // Result Elements
    const apodTitle = document.getElementById('apod-title');
    const apodDateDisplay = document.getElementById('apod-date-display');
    const apodImage = document.getElementById('apod-image');
    const apodVideo = document.getElementById('apod-video');
    const apodExplanation = document.getElementById('apod-explanation');
    const apodCopyright = document.getElementById('apod-copyright');
    const errorMessage = document.getElementById('error-message');

    // Set max date to today to prevent future dates, and min date to NASA API limit (1995-06-16)
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);
    dateInput.setAttribute('min', '1995-06-16');

    // API URL (FastAPI Backend)
    const backendUrl = 'http://localhost:8000/apod/';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const selectedDate = dateInput.value;
        if (!selectedDate) return;

        // Reset UI
        hideAllSections();
        showSection(loadingContainer);
        submitBtn.disabled = true;

        try {
            const response = await fetch(`${backendUrl}${selectedDate}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Falha ao buscar os dados da NASA.');
            }

            const data = await response.json();
            displayData(data);

        } catch (error) {
            showError(error.message);
        } finally {
            submitBtn.disabled = false;
        }
    });

    function displayData(data) {
        hideAllSections();

        apodTitle.textContent = data.title || 'Sem Título';

        // Format date beautifully
        const [year, month, day] = data.date.split('-');
        apodDateDisplay.textContent = `${day}/${month}/${year}`;

        apodExplanation.textContent = data.explanation;

        if (data.copyright) {
            apodCopyright.textContent = data.copyright;
            apodCopyright.parentElement.classList.remove('hidden');
        } else {
            apodCopyright.parentElement.classList.add('hidden');
        }

        // Handle Image vs Video (APOD sometimes returns Youtube videos)
        if (data.media_type === 'video') {
            apodImage.classList.add('hidden');
            apodVideo.src = data.url;
            apodVideo.classList.remove('hidden');
        } else {
            apodVideo.classList.add('hidden');
            apodImage.src = data.url;
            apodImage.alt = data.title;
            apodImage.classList.remove('hidden');
        }

        showSection(resultContainer);
    }

    function showError(msg) {
        hideAllSections();
        errorMessage.textContent = msg;
        showSection(errorContainer);
    }

    function hideAllSections() {
        loadingContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
    }

    function showSection(section) {
        section.classList.remove('hidden');
        // Trigger reflow to restart animations if any
        void section.offsetWidth;
        section.classList.add('fade-in-up');
    }
});
