// Typing Effect
const typing = document.querySelector('.typing');
const words = [
  "Network Engineer 🌐",
  "Routing & Switching Expert ⚙️",
  "Network Monitoring Specialist 📡"
];
let i = 0, j = 0, deleting = false;
function type() {
  const current = words[i];
  typing.textContent = current.substring(0, j);
  if (!deleting && j < current.length) j++, setTimeout(type, 100);
  else if (deleting && j > 0) j--, setTimeout(type, 50);
  else {
    deleting = !deleting;
    if (!deleting) i = (i + 1) % words.length;
    setTimeout(type, 1000);
  }
}
type();

// Fade-in on Scroll
const faders = document.querySelectorAll('.fade-in');
const appear = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      appear.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
faders.forEach(fader => appear.observe(fader));

// Navbar Active Highlight
window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 80;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop)
      link.classList.add('active');
    else link.classList.remove('active');
  });
});

// Mobile Navbar Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('toggle');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('toggle');
  });
});

// Background Network Animation
const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');
let nodes = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 60; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#32ffb5";
    ctx.fill();
    for (let j = i + 1; j < nodes.length; j++) {
      const m = nodes[j];
      const dist = Math.hypot(n.x - m.x, n.y - m.y);
      if (dist < 120) {
        ctx.strokeStyle = "rgba(0,191,255,0.2)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      }
    }
    n.x += n.dx; n.y += n.dy;
    if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.dy *= -1;
  }
  requestAnimationFrame(draw);
}
draw();
