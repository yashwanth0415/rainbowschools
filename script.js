document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow + scroll progress ---------- */
  const header = document.getElementById('siteHeader');
  const scrollRainbow = document.getElementById('scrollRainbow');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollRainbow.style.width = pct + '%';
    updateActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  hamburgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
  });
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = ['home','about','academics','gallery','admission','contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function updateActiveNav(){
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ---------- Animated stat counters ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function animateCounters(){
    if (countersStarted) return;
    countersStarted = true;
    statNums.forEach(el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  const heroStatsEl = document.querySelector('.hero-stats');
  if (heroStatsEl){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) animateCounters(); });
    }, { threshold: 0.4 });
    obs.observe(heroStatsEl);
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCard = document.getElementById('lightboxCard');
  document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.dataset.caption || 'Gallery photo';
      const color = getComputedStyle(item).getPropertyValue('--c').trim();
      lightboxCaption.innerHTML = caption;
      lightboxCard.querySelector('i').style.color = color || '';
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  /* ---------- Admission Enquiry Modal ---------- */
  const enquireModal = document.getElementById('enquireModal');
  const enquireForm = document.getElementById('enquireForm');
  const modalSuccess = document.getElementById('modalSuccess');
  const modalHeading = document.getElementById('modalHeading');

  const openTriggers = [
    'openEnquireBtn1','openEnquireBtn2','openEnquireBtn3','openEnquireBtn4','fabEnquireBtn'
  ];
  openTriggers.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openEnquireModal);
  });

  function openEnquireModal(){
    enquireModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeEnquireModal(){
    enquireModal.classList.remove('open');
    document.body.style.overflow = '';
    // reset to form view after transition
    setTimeout(() => {
      modalSuccess.classList.remove('show');
      enquireForm.style.display = '';
      modalHeading.style.display = '';
      enquireForm.reset();
    }, 300);
  }
  document.getElementById('closeEnquireBtn').addEventListener('click', closeEnquireModal);
  enquireModal.addEventListener('click', e => { if (e.target === enquireModal) closeEnquireModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeEnquireModal(); });
  document.getElementById('modalDoneBtn').addEventListener('click', closeEnquireModal);

  enquireForm.addEventListener('submit', e => {
    e.preventDefault();
    // Simulated submission — replace with a real endpoint call when ready.
    enquireForm.style.display = 'none';
    modalHeading.style.display = 'none';
    modalSuccess.classList.add('show');
  });

  /* ---------- Contact form (inline, simulated) ---------- */
  const contactForm = document.getElementById('contactForm');
  const contactNote = document.getElementById('contactNote');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactNote.textContent = 'Thanks! We\u2019ve received your message and will get back to you soon.';
    contactForm.reset();
    setTimeout(() => { contactNote.textContent = ''; }, 6000);
  });

});
