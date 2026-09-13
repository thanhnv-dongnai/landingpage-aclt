const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('DOMContentLoaded', () => {
  navbar.classList.remove('opacity-0', '-translate-y-4');
  navbar.classList.add('animate__animated', 'animate__fadeInDown');
  if (window.lucide) lucide.createIcons();
});

menuToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
  navMenu.classList.toggle('flex');
});

document.querySelectorAll('#navMenu a').forEach((link) => link.addEventListener('click', () => {
  if (window.innerWidth < 1024) {
    navMenu.classList.add('hidden');
    navMenu.classList.remove('flex');
  }
}));

const animateOnView = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    element.classList.add('animate__animated', element.dataset.animation || 'animate__fadeInUp', 'is-visible');
    observer.unobserve(element);
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => animateOnView.observe(element));

const counters = document.querySelectorAll('.counter');
const countUp = (counter) => {
  const target = Number(counter.dataset.target || 0);
  const suffix = counter.dataset.suffix || '';
  const start = performance.now();
  const duration = 1200;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    counter.textContent = `${Math.floor(progress * target)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { countUp(entry.target); observer.unobserve(entry.target); }
  });
}, { threshold: .7 });
counters.forEach((counter) => counterObserver.observe(counter));

const cta = document.querySelector('.cta-pulse');
if (cta) setInterval(() => {
  cta.classList.add('animate__animated', 'animate__pulse');
  setTimeout(() => cta.classList.remove('animate__animated', 'animate__pulse'), 1000);
}, 3000);

window.addEventListener('scroll', () => {
  scrollTop?.classList.toggle('hidden', window.scrollY < 500);
});
scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('registrationForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById('formMessage');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  message.textContent = 'Cảm ơn bạn! Nhà trường sẽ liên hệ tư vấn trong thời gian sớm nhất.';
  message.classList.remove('hidden');
  form.reset();
});

document.getElementById('newsletterForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('input').value = '';
  alert('Đăng ký nhận thông tin thành công!');
});

const consultButton = document.getElementById('consultButton');
const consultModal = document.getElementById('consultModal');
const closeConsult = document.getElementById('closeConsult');
const toggleConsult = (open) => consultModal?.classList.toggle('flex', open);
consultButton?.addEventListener('click', () => toggleConsult(true));
closeConsult?.addEventListener('click', () => toggleConsult(false));
consultModal?.addEventListener('click', (event) => { if (event.target === consultModal) toggleConsult(false); });
document.getElementById('consultForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.getElementById('consultMessage');
  message.textContent = 'Cảm ơn bạn! Nhà trường sẽ liên hệ tư vấn sớm nhất.';
  message.classList.remove('hidden');
  event.currentTarget.reset();
});

const feeModal = document.getElementById('feeModal');
document.getElementById('feePreview')?.addEventListener('click', () => feeModal?.classList.add('flex'));
document.getElementById('closeFee')?.addEventListener('click', () => feeModal?.classList.remove('flex'));
feeModal?.addEventListener('click', (event) => { if (event.target === feeModal) feeModal.classList.remove('flex'); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { toggleConsult(false); feeModal?.classList.remove('flex'); }
});
