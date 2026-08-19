/* ==========================================================================
   COGNIX AI - INTERACTIVE LOGIC (PARTICLES, PLAYGROUND SIMULATOR & UI CONTROLS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initTypingEffect();
  initHeroParticles();
  initPlayground();
  initStatCounters();
  initPricingToggle();
  initFaqAccordion();
  initApiModal();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE LOGIC
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  // Check saved preference
  const savedTheme = localStorage.getItem('cognix-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('cognix-theme', newTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. HERO DYNAMIC TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById('typing-target');
  if (!target) return;

  const phrases = [
    "Enterprise Search",
    "Multi-Agent Swarms",
    "Real-time RAG Pipelines",
    "Self-Healing Code Synthesis",
    "Multimodal Vision Systems"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      target.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. HERO BACKGROUND PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Create Particles
  const numParticles = Math.min(Math.floor(window.innerWidth / 20), 65);
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw particles & links
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(157, 78, 221, ${0.2 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE PLAYGROUND / INFERENCE DEMO
   -------------------------------------------------------------------------- */
function initPlayground() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const promptSelect = document.getElementById('prompt-select');
  const customInput = document.getElementById('custom-prompt');
  const runBtn = document.getElementById('run-inference-btn');
  const outputContainer = document.getElementById('terminal-output');
  const metricLatency = document.getElementById('metric-latency');
  const metricRate = document.getElementById('metric-rate');

  if (!promptSelect || !outputContainer) return;

  const templates = {
    code: [
      {
        label: "TypeScript Async Cache Vector Handler",
        prompt: "Generate a TypeScript RAG vector search handler with sub-20ms cache strategy.",
        code: `<span class="kw-code">import</span> { CognixVectorStore, CacheLayer } <span class="kw-code">from</span> <span class="kw-str">'@cognix/core'</span>;

<span class="kw-comment">// Initialize Ultra-Low Latency Vector Store</span>
<span class="kw-code">export async function</span> <span class="kw-func">queryKnowledgeBase</span>(userQuery: <span class="kw-str">string</span>) {
  <span class="kw-code">const</span> cache = <span class="kw-code">new</span> CacheLayer({ ttlMs: 30000 });
  <span class="kw-code">const</span> cachedResult = <span class="kw-code">await</span> cache.get(userQuery);
  <span class="kw-code">if</span> (cachedResult) <span class="kw-code">return</span> cachedResult; <span class="kw-comment">// Cache Hit ~ 2ms</span>

  <span class="kw-code">const</span> vectorStore = <span class="kw-code">new</span> CognixVectorStore({ index: <span class="kw-str">'prod-v1'</span> });
  <span class="kw-code">const</span> embeddings = <span class="kw-code">await</span> vectorStore.embedQuery(userQuery);
  
  <span class="kw-code">const</span> matches = <span class="kw-code">await</span> vectorStore.searchHNSW(embeddings, { topK: 5 });
  <span class="kw-code">await</span> cache.set(userQuery, matches);
  <span class="kw-code">return</span> matches;
}`
      },
      {
        label: "Python Multi-Agent Swarm Orchestrator",
        prompt: "Write a Python script to deploy a self-healing agent swarm.",
        code: `<span class="kw-code">from</span> cognix.agents <span class="kw-code">import</span> Swarm, Agent, Tool

planner = Agent(name=<span class="kw-str">"Planner"</span>, role=<span class="kw-str">"Decompose Tasks"</span>)
executor = Agent(name=<span class="kw-str">"Executor"</span>, role=<span class="kw-str">"Execute Code & Test"</span>)
validator = Agent(name=<span class="kw-str">"Validator"</span>, role=<span class="kw-str">"Security Audit"</span>)

swarm = Swarm(agents=[planner, executor, validator])
result = swarm.run_parallel(query=<span class="kw-str">"Refactor PostgreSQL schema"</span>)
print(f<span class="kw-str">"Swarm Execution Complete. Status: {result.status}"</span>)`
      }
    ],
    agent: [
      {
        label: "Autonomous Customer Support Resolution",
        prompt: "Run an autonomous agent to resolve a customer refund request.",
        code: `<span class="kw-comment">[Cognix Agent Swarm Initializing...]</span>
-> Step 1: Querying Customer DB for Order #9842... [MATCH FOUND]
-> Step 2: Validating Return Eligibility Policy... [PASSED]
-> Step 3: Triggering Stripe Refund Webhook API... [SUCCESS]
-> Step 4: Synthesizing Email Confirmation & Sending via SendGrid...
<span class="kw-str">✓ Task Completed autonomously in 284ms. 0 Human Interventions Required.</span>`
      }
    ],
    data: [
      {
        label: "Petabyte Anomaly Detection SQL Pipeline",
        prompt: "Analyze financial transaction logs for real-time fraud indicators.",
        code: `<span class="kw-comment">-- Cognix Real-Time Neural Anomaly Query</span>
<span class="kw-code">SELECT</span> transaction_id, user_id, amount,
       COGNIX_NEURAL_SCORE(features) <span class="kw-code">AS</span> fraud_probability
<span class="kw-code">FROM</span> stream_transactions
<span class="kw-code">WHERE</span> timestamp >= NOW() - INTERVAL '5 seconds'
<span class="kw-code">HAVING</span> fraud_probability > 0.98;
<span class="kw-comment">-- Result: 3 Suspicious Events Flagged. Latency: 11ms</span>`
      }
    ],
    vision: [
      {
        label: "4K Document OCR & Structured Extraction",
        prompt: "Extract tabular invoice metrics from scanned PDF image.",
        code: `<span class="kw-code">const</span> invoiceData = <span class="kw-code">await</span> cognix.vision.analyze({
  image: <span class="kw-str">'s3://docs/invoice_8492.png'</span>,
  extractSchema: {
    vendorName: <span class="kw-str">'string'</span>,
    totalAmount: <span class="kw-str">'number'</span>,
    taxId: <span class="kw-str">'string'</span>
  }
});
<span class="kw-comment">// Extracted: { vendorName: "Acme Corp", totalAmount: 4850.00, confidence: 0.998 }</span>`
      }
    ]
  };

  let activeCategory = 'code';

  function populateSelect(category) {
    promptSelect.innerHTML = '';
    const items = templates[category] || [];
    items.forEach((item, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = item.label;
      promptSelect.appendChild(opt);
    });
    if (items.length > 0) {
      customInput.value = items[0].prompt;
      renderOutput(items[0].code);
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.tab;
      populateSelect(activeCategory);
    });
  });

  promptSelect.addEventListener('change', (e) => {
    const idx = parseInt(e.target.value);
    const item = templates[activeCategory][idx];
    if (item) {
      customInput.value = item.prompt;
      renderOutput(item.code);
    }
  });

  let streamTimer = null;

  function renderOutput(rawContent) {
    if (streamTimer) clearInterval(streamTimer);
    outputContainer.innerHTML = '';
    
    // Simulate streaming typing
    let index = 0;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawContent;
    const fullText = tempDiv.innerHTML;

    outputContainer.innerHTML = fullText;

    // Randomize telemetry metrics slightly
    if (metricLatency) metricLatency.textContent = (Math.floor(Math.random() * 6) + 10) + 'ms';
    if (metricRate) metricRate.textContent = (Math.floor(Math.random() * 40) + 160) + ' t/s';
  }

  runBtn.addEventListener('click', () => {
    const customText = customInput.value;
    runBtn.disabled = true;
    runBtn.innerHTML = `<span>Inferring...</span>`;

    setTimeout(() => {
      runBtn.disabled = false;
      runBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Run Inference</span>`;
      
      const currentItems = templates[activeCategory];
      const selectedItem = currentItems[promptSelect.value] || currentItems[0];
      renderOutput(selectedItem ? selectedItem.code : `<span class="kw-str">✓ Processing complete for prompt: "${customText}"</span>`);
    }, 400);
  });

  // Initial Load
  populateSelect('code');
}

/* --------------------------------------------------------------------------
   6. ANIMATED COUNTERS ON SCROLL
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const increment = target / 60;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = isDecimal ? current.toFixed(2) : Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = isDecimal ? target.toFixed(2) : target;
            }
          };

          updateCounter();
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('benchmarks');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   7. PRICING BILLING SWITCHER
   -------------------------------------------------------------------------- */
function initPricingToggle() {
  const toggleBtn = document.getElementById('billing-toggle');
  const priceAmounts = document.querySelectorAll('.price-amount');
  let isAnnual = false;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isAnnual = !isAnnual;
      toggleBtn.classList.toggle('active', isAnnual);

      priceAmounts.forEach(el => {
        const val = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = val;
          el.style.opacity = '1';
        }, 150);
      });
    });
  }
}

/* --------------------------------------------------------------------------
   8. FAQ ACCORDION LOGIC
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.parentElement;
      const isOpen = faqItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faqItem.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. API KEY GENERATOR MODAL DIALOG
   -------------------------------------------------------------------------- */
function initApiModal() {
  const modal = document.getElementById('api-modal');
  const openBtns = [
    document.getElementById('open-api-modal-nav'),
    document.getElementById('open-api-modal-hero'),
    document.getElementById('btn-tier-dev'),
    document.getElementById('btn-tier-pro')
  ];
  const closeBtn = document.getElementById('close-modal-btn');
  const doneBtn = document.getElementById('close-modal-done');
  const copyBtn = document.getElementById('copy-key-btn');
  const apiKeyInput = document.getElementById('generated-api-key');
  const ctaForm = document.getElementById('newsletter-form');

  function openModal() {
    if (!modal) return;
    // Generate fresh key
    const randomHex = Array.from({length: 24}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    if (apiKeyInput) apiKeyInput.value = `cg_live_${randomHex}`;
    modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  openBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // Copy Key Button
  if (copyBtn && apiKeyInput) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(apiKeyInput.value).then(() => {
        const copyText = document.getElementById('copy-text');
        if (copyText) {
          copyText.textContent = 'Copied!';
          copyBtn.style.borderColor = 'var(--accent-emerald)';
          setTimeout(() => {
            copyText.textContent = 'Copy Key';
            copyBtn.style.borderColor = 'var(--border-glass)';
          }, 2000);
        }
      });
    });
  }
}
