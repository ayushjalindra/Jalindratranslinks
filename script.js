// ==================== DOM REFERENCES ====================
const highwayCorridor = document.getElementById('highway-corridor');
const convoyTrain = document.getElementById('convoy-train');
const wheels = document.querySelectorAll('.js-wheel');
const tassel = document.querySelector('.js-tassel');
const highwayDashes = document.getElementById('highway-lane-dashes');
const initialEmptyPrompt = document.getElementById('initial-empty-prompt');

// Header & Stage Status Elements
const scrollPctDisplay = document.getElementById('scroll-pct-display');
const headerBarFill = document.getElementById('header-bar-fill');
const liveConvoyCaption = document.getElementById('live-convoy-caption');
const stageStepPill = document.getElementById('stage-step-pill');

// Sequence Nodes & Sidebar Cards
const seqTruck = document.getElementById('seq-truck');
const seqT1 = document.getElementById('seq-t1');
const seqT2 = document.getElementById('seq-t2');
const seqT3 = document.getElementById('seq-t3');

const statusCardTruck = document.getElementById('status-card-truck');
const statusCardT1 = document.getElementById('status-card-t1');
const statusCardT2 = document.getElementById('status-card-t2');
const statusCardT3 = document.getElementById('status-card-t3');

const badgeTruck = document.getElementById('badge-truck');
const badgeT1 = document.getElementById('badge-t1');
const badgeT2 = document.getElementById('badge-t2');
const badgeT3 = document.getElementById('badge-t3');

const manifestCard1 = document.getElementById('manifest-card-1');
const manifestCard2 = document.getElementById('manifest-card-2');
const manifestCard3 = document.getElementById('manifest-card-3');

// Telemetry Elements
const tcBars = document.querySelectorAll('#tc-bars .b-col');
const convoySpeedText = document.getElementById('convoy-speed-text');
const mapActiveLine = document.getElementById('map-active-line');
const mapStageLabel = document.getElementById('map-stage-label');
const mapKmLabel = document.getElementById('map-km-label');

// Executive Leadership Reveal Elements
const founderBackdrop = document.getElementById('founder-overlay-backdrop');
const founderModal = document.getElementById('founder-reveal-modal');
const btnReplayConvoy = document.getElementById('btn-replay-convoy');
const btnJumpFounder = document.getElementById('btn-jump-founder');

// Logo Elements
const brandLogoImgs = document.querySelectorAll('.js-brand-logo');

// Footer Interactive Controls
const btnNormalView = document.getElementById('btn-normal-view');
const btnGlowView = document.getElementById('btn-glow-view');
const densityPills = document.querySelectorAll('.density-pill');
const cargoGroups = document.querySelectorAll('.js-cargo-boxes');
const totalPayloadVal = document.getElementById('total-payload-val');

// ==================== 1. SEAMLESS VECTOR LOGO FALLBACK ====================
const wingedLogoFallback = `data:image/svg+xml;utf8,` + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 220">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff5500"/>
      <stop offset="50%" stop-color="#e11d48"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="360" height="220" rx="16" fill="#ffffff"/>
  <path d="M195 110 C225 55, 275 22, 330 12 C295 45, 265 78, 220 118 Z" fill="url(#g)"/>
  <path d="M200 122 C235 80, 280 55, 325 48 C290 75, 260 100, 222 128 Z" fill="#06b6d4"/>
  <rect x="135" y="58" width="125" height="65" rx="6" fill="#1e3a8a" stroke="#0f172a" stroke-width="3"/>
  <path d="M95 65 L145 65 L145 125 L88 125 Z" fill="#ff5500" stroke="#0f172a" stroke-width="3"/>
  <path d="M65 132 Q140 155 295 102 L285 92 L318 98 L295 120 L292 110 Q140 165 65 132 Z" fill="url(#g)"/>
  <text x="108" y="176" font-family="Georgia, serif" font-size="27" font-weight="900" fill="#0f172a" text-anchor="middle">JALINDRA</text>
  <text x="258" y="176" font-family="Arial, sans-serif" font-style="italic" font-size="25" font-weight="900" fill="url(#g)" text-anchor="middle">TRANSLINKS</text>
  <text x="180" y="198" font-family="Arial, sans-serif" font-size="9.5" font-weight="800" fill="#334155" text-anchor="middle" letter-spacing="1.8">COMMERCIAL TRANSPORTATION &amp; LOGISTICS</text>
</svg>`);

brandLogoImgs.forEach(img => {
  img.addEventListener('error', function onErr() {
    if (!this.dataset.fallbackApplied) {
      this.dataset.fallbackApplied = 'true';
      this.src = wingedLogoFallback;
    }
  });
});

// ==================== 2. RIGHT-TO-LEFT TATA SIGNA 5532.S + 3-TRAILER ENGINE ====================
const CONVOY_TOTAL_WIDTH = 2380;

function renderConvoyScroll() {
  const scrollTop = window.scrollY;
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
  const pct = Math.round(progress * 100);

  // Update Header Progress
  scrollPctDisplay.textContent = `${pct}%`;
  headerBarFill.style.width = `${pct}%`;

  const stageWidth = highwayCorridor.getBoundingClientRect().width;

  // Phase 1 (0% -> 82% scroll): Tata Signa 5532.S COE + 3 Trailers roll from off-screen RIGHT to off-screen LEFT
  const driveProgress = Math.min(progress / 0.82, 1);
  const startRightX = stageWidth + 60;
  const endLeftX = -CONVOY_TOTAL_WIDTH + Math.min(stageWidth * 0.35, 260);
  const currentConvoyX = startRightX + driveProgress * (endLeftX - startRightX);

  convoyTrain.style.transform = `translate3d(${currentConvoyX}px, 0, 0)`;

  // Fade out Initial Empty Frame Card as soon as Tata Signa 5532.S flat-nose cab enters from right
  if (progress < 0.025) {
    initialEmptyPrompt.style.opacity = '1';
    initialEmptyPrompt.style.transform = 'translate(-50%, -50%) scale(1)';
  } else {
    initialEmptyPrompt.style.opacity = '0';
    initialEmptyPrompt.style.transform = 'translate(-50%, -50%) scale(0.92)';
  }

  // Spin all 11 wheels counter-clockwise (-deg) for true Right-to-Left physics
  const wheelRotation = -driveProgress * 2880;
  wheels.forEach(w => {
    w.style.transform = `rotate(${wheelRotation}deg)`;
  });

  // Swing front bumper tassel backward with wind resistance
  if (tassel) {
    const swingDeg = -10 + Math.sin(progress * 50) * 8;
    tassel.style.transform = `rotate(${swingDeg}deg)`;
  }

  // Move highway lane dashes to the right as truck drives left
  highwayDashes.style.transform = `translate3d(${driveProgress * 460}px, 0, 0)`;

  // Determine which unit is currently centered in the stage for sequential order highlights
  const viewportCenterInConvoy = (stageWidth * 0.5) - currentConvoyX;

  [seqTruck, seqT1, seqT2, seqT3].forEach(el => el.classList.remove('active'));
  [statusCardTruck, statusCardT1, statusCardT2, statusCardT3].forEach(el => el.classList.remove('active'));
  [manifestCard1, manifestCard2, manifestCard3].forEach(el => el.classList.remove('active-trailer'));

  if (progress < 0.025) {
    liveConvoyCaption.textContent = 'Initial Frame Empty — Scroll Down to Dispatch Tata Signa 5532.S from Right';
    stageStepPill.textContent = 'STAGE 00 // EMPTY';
    mapStageLabel.textContent = 'INITIAL FRAME (EMPTY)';
    convoySpeedText.textContent = '0 KM/H';
    badgeTruck.textContent = 'STANDBY';
    badgeT1.textContent = 'QUEUED';
    badgeT2.textContent = 'QUEUED';
    badgeT3.textContent = 'QUEUED';
  } else if (viewportCenterInConvoy < 515) {
    seqTruck.classList.add('active');
    statusCardTruck.classList.add('active');
    liveConvoyCaption.textContent = '01. Tata Signa 5532.S Flat-Nose COE Head Entering from Right...';
    stageStepPill.textContent = '01 // TATA SIGNA 5532.S';
    mapStageLabel.textContent = '01. TATA 5532.S HEAD';
    convoySpeedText.textContent = '68 KM/H';
    badgeTruck.textContent = 'LEADING';
  } else if (viewportCenterInConvoy < 1110) {
    seqT1.classList.add('active');
    statusCardT1.classList.add('active');
    manifestCard1.classList.add('active-trailer');
    liveConvoyCaption.textContent = '02. First Coupled Trailer Passing: "SOMETHING"';
    stageStepPill.textContent = '02 // SOMETHING';
    mapStageLabel.textContent = '02. TRAILER: SOMETHING';
    convoySpeedText.textContent = '74 KM/H';
    badgeTruck.textContent = 'PASSED';
    badgeT1.textContent = 'ON STAGE';
  } else if (viewportCenterInConvoy < 1720) {
    seqT2.classList.add('active');
    statusCardT2.classList.add('active');
    manifestCard2.classList.add('active-trailer');
    liveConvoyCaption.textContent = '03. Second Coupled Trailer Passing: "COMING"';
    stageStepPill.textContent = '03 // COMING';
    mapStageLabel.textContent = '03. TRAILER: COMING';
    convoySpeedText.textContent = '78 KM/H';
    badgeT1.textContent = 'PASSED';
    badgeT2.textContent = 'ON STAGE';
  } else if (progress <= 0.76) {
    seqT3.classList.add('active');
    statusCardT3.classList.add('active');
    manifestCard3.classList.add('active-trailer');
    liveConvoyCaption.textContent = '04. Third Coupled Trailer Passing: "SOON"';
    stageStepPill.textContent = '04 // SOON';
    mapStageLabel.textContent = '04. TRAILER: SOON';
    convoySpeedText.textContent = '82 KM/H';
    badgeT2.textContent = 'PASSED';
    badgeT3.textContent = 'ON STAGE';
  } else {
    liveConvoyCaption.textContent = '05. Executive Leadership Board — Founder, CEO & Finance Manager';
    stageStepPill.textContent = '05 // LEADERSHIP BOARD';
    mapStageLabel.textContent = 'DELIVERED • BOARD REVEAL';
    convoySpeedText.textContent = 'ARRIVED';
    badgeT3.textContent = 'DELIVERED';
  }

  // Update Telemetry Bars & Route Map Line
  const litBars = Math.round(progress * tcBars.length);
  tcBars.forEach((bar, i) => {
    bar.classList.toggle('active', i < litBars);
  });

  const mapDashOffset = 380 - progress * 380;
  mapActiveLine.style.strokeDashoffset = mapDashOffset;
  mapKmLabel.textContent = `${Math.round(progress * 1800).toLocaleString()} / 1,800 KM`;

  // Phase 2 (76% -> 100% scroll): Grow Executive Leadership Monument from 0.2x to 1.0x
  if (progress > 0.76) {
    const founderProgress = Math.min((progress - 0.76) / 0.22, 1);
    const scaleVal = 0.2 + founderProgress * 0.8;
    founderBackdrop.style.opacity = founderProgress;
    founderBackdrop.style.pointerEvents = founderProgress > 0.75 ? 'auto' : 'none';
    founderModal.style.transform = `scale(${scaleVal})`;
  } else {
    founderBackdrop.style.opacity = 0;
    founderBackdrop.style.pointerEvents = 'none';
    founderModal.style.transform = `scale(0.2)`;
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      renderConvoyScroll();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

window.addEventListener('resize', renderConvoyScroll);
renderConvoyScroll();

// ==================== 3. INTERACTIVE STAGE CONTROLS ====================
btnGlowView.addEventListener('click', () => {
  btnGlowView.classList.add('active');
  btnNormalView.classList.remove('active');
  convoyTrain.classList.add('festival-glow');
});

btnNormalView.addEventListener('click', () => {
  btnNormalView.classList.add('active');
  btnGlowView.classList.remove('active');
  convoyTrain.classList.remove('festival-glow');
});

densityPills.forEach(pill => {
  pill.addEventListener('click', () => {
    densityPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const density = parseInt(pill.dataset.density, 10);
    cargoGroups.forEach(group => {
      const boxes = group.querySelectorAll('rect');
      boxes.forEach((box, i) => {
        box.style.opacity = i < density + 1 ? '0.92' : '0.15';
      });
    });
    const weights = {
      1: '18,500 KG / 55,000 KG',
      2: '34,000 KG / 55,000 KG',
      3: '45,800 KG / 55,000 KG',
      4: '54,200 KG / 55,000 KG'
    };
    totalPayloadVal.textContent = weights[density];
  });
});

btnReplayConvoy.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

btnJumpFounder.addEventListener('click', () => {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
});