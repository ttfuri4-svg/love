/* ============================================================
   Полина ❤ — анимации
   ============================================================ */

/* ---------- AOS: анимации при скролле ---------- */
AOS.init({
  duration: 1100,
  easing: 'ease-out-cubic',
  once: true,
  offset: 90
});

/* ---------- Имя «Полина»: буквы появляются одной за другой (анимация в CSS) ---------- */
const nameEl = document.getElementById('heroName');
nameEl.innerHTML = [...nameEl.textContent]
  .map((ch, i) => `<span class="letter" style="--i:${i}"><span class="l-in">${ch}</span></span>`)
  .join('');

/* ---------- параллакс: герой растворяется при скролле ---------- */
gsap.registerPlugin(ScrollTrigger);
gsap.to('.hero-inner', {
  yPercent: 38,
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

/* ---------- эффект печатного текста ---------- */
const phrases = [
  'самая невероятная девушка на свете',
  'и моё сердце выбрало только тебя',
  'каждую секунду — люблю тебя сильнее',
  'ты — мой самый счастливый случай'
];
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[pi];
  typedEl.textContent = phrase.slice(0, ci);
  let delay = deleting ? 28 : 55;
  if (!deleting && ci === phrase.length) { delay = 1900; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
  ci += deleting ? -1 : 1;
  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 2200);

/* ---------- летающие сердечки на фоне ---------- */
const heartsBox = document.getElementById('bgHearts');
const GLOSS = ['❤', '💗', '💖', '💕', '💘', '🌹', '✨', '💞', '🐈', '😺', '🐾'];

function spawnHeart() {
  const s = document.createElement('span');
  s.className = 'fheart';
  s.textContent = GLOSS[Math.floor(Math.random() * GLOSS.length)];
  const dur = 7 + Math.random() * 7;
  s.style.left = Math.random() * 100 + 'vw';
  s.style.fontSize = 13 + Math.random() * 26 + 'px';
  s.style.setProperty('--dx', Math.random() * 180 - 90 + 'px');
  s.style.setProperty('--rot', Math.random() * 360 - 180 + 'deg');
  s.style.animationDuration = dur + 's';
  s.style.opacity = 0.45 + Math.random() * 0.55;
  heartsBox.appendChild(s);
  setTimeout(() => s.remove(), dur * 1000 + 300);
}
for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 420);
setInterval(spawnHeart, 700);

/* ---------- мерцающие звёзды ---------- */
const starsBox = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
  const st = document.createElement('i');
  st.className = 'star';
  const sz = 1 + Math.random() * 2;
  st.style.width = st.style.height = sz + 'px';
  st.style.left = Math.random() * 100 + 'vw';
  st.style.top = Math.random() * 100 + 'vh';
  st.style.animationDuration = 2.2 + Math.random() * 4 + 's';
  st.style.animationDelay = Math.random() * 4 + 's';
  starsBox.appendChild(st);
}

/* ---------- сердечки там, где кликнули ---------- */
const BURST = ['#ff7aa8', '#ffc1d6', '#f7b2d0', '#ffffff'];
document.addEventListener('pointerdown', e => {
  for (let i = 0; i < 8; i++) {
    const h = document.createElement('span');
    h.className = 'click-heart';
    h.textContent = Math.random() < .8 ? '♥' : '✦';
    h.style.color = BURST[i % BURST.length];
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    h.style.fontSize = 12 + Math.random() * 15 + 'px';
    document.body.appendChild(h);
    const ang = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 75;
    h.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(${Math.cos(ang) * dist - 50}px, ${Math.sin(ang) * dist - 50}px) scale(.25)`, opacity: 0 }
    ], { duration: 850 + Math.random() * 450, easing: 'cubic-bezier(.15,.65,.3,1)' })
     .onfinish = () => h.remove();
  }
});

/* ---------- счётчик «ударов сердца» ---------- */
const counterEl = document.getElementById('loveCount');
const EPOCH = new Date(2024, 0, 1).getTime();
function tick() {
  const n = Math.floor((Date.now() - EPOCH) / 1000);
  counterEl.textContent = n.toLocaleString('ru-RU');
}
tick();
setInterval(tick, 1000);

/* ---------- сколько мы уже вместе (с 31.03.2026) ---------- */
const TOGETHER_FROM = new Date(2026, 2, 31).getTime(); // 31 марта 2026, 00:00
const daysEl = document.getElementById('daysT');
const hoursEl = document.getElementById('hoursT');
const minsEl = document.getElementById('minsT');
const secsEl = document.getElementById('secsT');

function tickTogether() {
  const diff = Math.max(0, Date.now() - TOGETHER_FROM);
  daysEl.textContent = Math.floor(diff / 86400000);
  hoursEl.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, '0');
  minsEl.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, '0');
  secsEl.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, '0');
}
tickTogether();
setInterval(tickTogether, 1000);