const memories = [
    { img: 'images/1.jpeg', cap: 'The day our journey began 💍', color: '#ff4d6d', shape: '❤️' },
    { img: 'images/2.jpeg', cap: 'Moments that made us laugh and love ❤️', color: '#ff758f', shape: '⭐' },
    { img: 'images/3.jpeg', cap: 'Dreaming of forever together ✨', color: '#ff85a1', shape: '🌸' },
    { img: 'images/4.jpeg', cap: 'The beginning of our eternal promise 💖', color: '#ff91af', shape: '💗' },
    { img: 'images/5.jpeg', cap: 'A celebration of love and togetherness 🎉', color: '#ffb3c1', shape: '🎈' },
    { img: 'images/6.jpeg', cap: 'Our love, our life, our forever ❤️', color: '#ffc4d6', shape: '🌹' }
];

let currentIndex = 0;
const stage = document.getElementById('stage');
const music = document.getElementById('romantic-music');
const musicBtn = document.getElementById('music-toggle');
const instruction = document.getElementById('instruction');
let hasStartedMusic = false;

// Function to handle Music Playback on first interaction
function startMusic() {
    if (!hasStartedMusic) {
        music.play().then(() => {
            musicBtn.innerText = "⏸ Pause Music";
            hasStartedMusic = true;
        }).catch(err => console.log("Waiting for user click..."));
    }
}

musicBtn.onclick = (e) => {
    e.stopPropagation();
    if (music.paused) {
        music.play();
        musicBtn.innerText = "⏸ Pause Music";
    } else {
        music.pause();
        musicBtn.innerText = "🎵 Play Music";
    }
    hasStartedMusic = true;
};

function spawnBalloon() {
    // After 6 photos, show the final message directly
    if (currentIndex >= memories.length) {
        showFinalMessage();
        return;
    }

    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.fontSize = '85px';
    balloon.innerHTML = memories[currentIndex].shape;
    balloon.style.color = memories[currentIndex].color;
    stage.appendChild(balloon);

    let pos = -150;
    const riseInterval = setInterval(() => {
        // Stops exactly in the middle of the screen
        if (pos >= window.innerHeight / 2 - 100) {
            clearInterval(riseInterval);
        } else {
            pos += 3;
            balloon.style.bottom = pos + 'px';
        }
    }, 15);

    // Balloon Pop Interaction
    balloon.onclick = function(e) {
        startMusic();
        if (instruction) instruction.style.display = 'none'; // Hide permanently after first pop
        popBalloon(balloon);
    };
}

function popBalloon(balloon) {
    balloon.remove();
    createFullPageSparkles(); // Burst hearts across whole screen

    const card = document.createElement('div');
    card.className = 'memory-card show';
    card.innerHTML = `
        <img src="${memories[currentIndex].img}" alt="Memory">
        <p>${memories[currentIndex].cap}</p>
        <button id="next-btn">Next Memory ➔</button>
    `;
    stage.appendChild(card);

    document.getElementById('next-btn').onclick = function() {
        this.parentElement.remove();
        currentIndex++;
        spawnBalloon();
    };
}

function createFullPageSparkles() {
    for (let i = 0; i < 65; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '❤️';
        
        // Randomly scatter from everywhere
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        
        const tx = (Math.random() - 0.5) * 800 + 'px';
        const ty = (Math.random() - 0.5) * 800 + 'px';
        sparkle.style.setProperty('--tx', tx);
        sparkle.style.setProperty('--ty', ty);
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }
}

function showFinalMessage() {
    if(instruction) instruction.remove();
    const final = document.getElementById('final-message');
    final.classList.remove('hidden');
    setTimeout(() => {
        final.style.opacity = '1';
        createFullPageSparkles(); // Final celebration sparkles
    }, 500);
}

// Start
window.onload = spawnBalloon;