
// JavaScript extracted from index.html
let currentSlide = 0;
let slides;
let totalSlides;
let timerInterval;
let startTime;
let elapsedTime = 0;
let isTimerRunning = false;

function initializeSlides() {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    showSlide(currentSlide);
    updateSlideCounter();
}

// Wait for DOM to be ready before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSlides);
} else {
    initializeSlides();
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    updateSlideCounter();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function updateSlideCounter() {
    document.getElementById('slideCounter').textContent = `${currentSlide + 1} / ${totalSlides}`;
}

function startTimer() {
    if (!isTimerRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 1000);
        isTimerRunning = true;
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isTimerRunning = false;
    document.getElementById('timeIndicator').textContent = '⏱️ Session Time: 0:00';
}

function updateTimer() {
    if (isTimerRunning) {
        elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        let indicator = '⏱️ Session Time: ' + timeString;
        
        // Add time warnings
        if (minutes >= 165) { // 2h 45m - near end
            indicator += ' 🔴 Wrap-up time!';
        } else if (minutes >= 150) { // 2h 30m - getting close
            indicator += ' 🟡 Final section';
        } else if (minutes >= 90) { // 1h 30m - break time
            indicator += ' ☕ Break suggested';
        }
        
        document.getElementById('timeIndicator').textContent = indicator;
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            previousSlide();
            break;
        case 'Home':
            event.preventDefault();
            currentSlide = 0;
            showSlide(currentSlide);
            break;
        case 'End':
            event.preventDefault();
            currentSlide = totalSlides - 1;
            showSlide(currentSlide);
            break;
        case 'F11':
            event.preventDefault();
            toggleFullscreen();
            break;
    }
});

updateSlideCounter();
// setInterval(() => {
//     if (!isTimerRunning) nextSlide();
// }, 10000);
