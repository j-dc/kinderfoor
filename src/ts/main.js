import vuurwerkUrl from '../img/vuurwerk.png';

const fireworksContainer = document.getElementById('kf-fireworks');

function createFirework() {
  if (!fireworksContainer) return;

  const firework = document.createElement('img');
  firework.src = vuurwerkUrl;
  firework.alt = '';
  firework.className = 'kf-firework';

  const header = document.getElementById('kf-page-header');
  const rect = header ? header.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };

  const px = Math.random() * rect.width * 0.82 + rect.width * 0.08;
  const py = Math.random() * rect.height * 0.62 + rect.height * 0.18;

  firework.style.left = `${px}px`;
  firework.style.top = `${py}px`;
  firework.style.animationDelay = `${Math.random() * 1.5}s`;
  firework.style.animationDuration = `${(1.8 + Math.random() * 2.4).toFixed(2)}s`;

  fireworksContainer.appendChild(firework);

  setTimeout(() => {
    firework.remove();
  }, 4500);
}

function loopFireworks() {
  createFirework();
  const interval = 700 + Math.random() * 1200;
  window.setTimeout(loopFireworks, interval);
}

if (fireworksContainer) {
  loopFireworks();
}

// Eenvoudige lokale opslag van "Mijn Kinderfoor Droom"
const form = document.getElementById('dream-form');
const saveBtn = document.getElementById('dream-save');
const nameInput = document.getElementById('dream-name');
const ideaInput = document.getElementById('dream-idea');

const STORAGE_KEY = 'kinderfoor-dream';

function loadDream() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data.name) nameInput.value = data.name;
    if (data.idea) ideaInput.value = data.idea;
  } catch {
    // ignore
  }
}

function saveDream() {
  const payload = {
    name: nameInput.value.trim(),
    idea: ideaInput.value.trim()
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  alert('Je Kinderfoor droom is lokaal bewaard op deze computer.');
}

if (form && saveBtn) {
  loadDream();
  saveBtn.addEventListener('click', saveDream);
}
