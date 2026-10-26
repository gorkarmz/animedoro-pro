/**
 * Animedoro - Aplicación Pomodoro Minimalista
 * 30 min Trabajo / 1 Episodio de Anime de Descanso (20 min)
 * Integración con Animedatos.com
 */

(() => {
  // --- Estado y Configuración por defecto ---
  const STORAGE_KEY = 'animedoro_settings_v1';
  const EPISODES_KEY = 'animedoro_episodes_v1';
  const THEME_KEY = 'animedoro_theme_v1';

  const DEFAULT_SETTINGS = {
    workDuration: 30, // en minutos
    breakDuration: 20, // en minutos
    soundEnabled: true,
    autoStart: false
  };

  let settings = { ...DEFAULT_SETTINGS };
  let episodesCompleted = 0;
  
  // Estado del temporizador
  let currentMode = 'work'; // 'work' | 'break'
  let timeLeft = settings.workDuration * 60; // en segundos
  let totalDuration = settings.workDuration * 60;
  let isRunning = false;
  let timerInterval = null;
  let targetEndTime = null;

  // Constantes visuales
  const CIRCLE_RADIUS = 126;
  const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

  // --- Elementos del DOM ---
  const timeDisplay = document.getElementById('timeDisplay');
  const timerStatus = document.getElementById('timerStatus');
  const subStatus = document.getElementById('subStatus');
  const progressCircle = document.getElementById('progressCircle');
  
  const startPauseBtn = document.getElementById('startPauseBtn');
  const startIcon = document.getElementById('startIcon');
  const startText = document.getElementById('startText');
  const resetBtn = document.getElementById('resetBtn');
  const skipBtn = document.getElementById('skipBtn');

  const modeWorkBtn = document.getElementById('modeWorkBtn');
  const modeBreakBtn = document.getElementById('modeBreakBtn');
  const badgeWorkTime = document.getElementById('badgeWorkTime');
  const badgeBreakTime = document.getElementById('badgeBreakTime');

  const episodesCountElem = document.getElementById('episodesCount');
  const incEpBtn = document.getElementById('incEpBtn');
  const decEpBtn = document.getElementById('decEpBtn');

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Ajustes Modal
  const openSettingsBtn = document.getElementById('openSettingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const workDurationInput = document.getElementById('workDurationInput');
  const breakDurationInput = document.getElementById('breakDurationInput');
  const soundEnabledInput = document.getElementById('soundEnabledInput');
  const autoStartInput = document.getElementById('autoStartInput');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
  const testSoundBtn = document.getElementById('testSoundBtn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Animedatos Search & Tags
  const animedatosSearchForm = document.getElementById('animedatosSearchForm');
  const animeSearchInput = document.getElementById('animeSearchInput');
  const tagChips = document.querySelectorAll('.tag-chip');

  // --- Web Audio API para timbre agradable ---
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playChime() {
    if (!settings.soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    // Acorde de campana zen suave: C5 (523Hz), E5 (659Hz), G5 (784Hz)
    const notes = [523.25, 659.25, 783.99];
    const now = audioCtx.currentTime;

    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);

      // Envolvente de volumen suave tipo campanilla
      gain.gain.setValueAtTime(0.001, now + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.2, now + index * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 1.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 1.8);
    });
  }

  // --- Carga y guardado de datos ---
  function loadStoredData() {
    // Ajustes
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
      }
    } catch (e) {
      console.warn('No se pudieron cargar los ajustes:', e);
    }

    // Episodios
    try {
      const savedEpisodes = localStorage.getItem(EPISODES_KEY);
      if (savedEpisodes !== null) {
        episodesCompleted = parseInt(savedEpisodes, 10) || 0;
      }
    } catch (e) {
      console.warn('No se pudieron cargar los episodios:', e);
    }

    // Tema
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) {
        applyTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
      }
    } catch (e) {
      applyTheme('light');
    }

    updateBadges();
    updateEpisodesDisplay();
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Error al guardar ajustes:', e);
    }
  }

  function saveEpisodes() {
    try {
      localStorage.setItem(EPISODES_KEY, episodesCompleted.toString());
    } catch (e) {
      console.warn('Error al guardar episodios:', e);
    }
  }

  // --- Tema Claro / Oscuro ---
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.title = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // --- Formato y Renderizado del Temporizador ---
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateDisplay() {
    const formatted = formatTime(timeLeft);
    timeDisplay.textContent = formatted;

    // Actualizar anillo de progreso SVG
    const progressFraction = totalDuration > 0 ? timeLeft / totalDuration : 0;
    const offset = CIRCUMFERENCE * (1 - progressFraction);
    progressCircle.style.strokeDashoffset = offset;

    // Actualizar título de la pestaña del navegador
    const modeName = currentMode === 'work' ? 'Trabajo' : 'Anime Break';
    const statusIcon = isRunning ? '⏱' : '⏸';
    document.title = `${statusIcon} (${formatted}) Animedoro - ${modeName}`;
  }

  function updateModeUI() {
    if (currentMode === 'work') {
      modeWorkBtn.classList.add('active');
      modeBreakBtn.classList.remove('active');
      timerStatus.textContent = 'Sesión de concentración';
      subStatus.textContent = isRunning ? 'Enfócate en tu objetivo' : 'Listo para trabajar';
      document.documentElement.style.setProperty('--ring-stroke', 'var(--accent-work)');
    } else {
      modeWorkBtn.classList.remove('active');
      modeBreakBtn.classList.add('active');
      timerStatus.textContent = '📺 Descanso: 1 Episodio de Anime';
      subStatus.textContent = isRunning ? 'Disfruta tu episodio' : 'Listo para ver anime';
      document.documentElement.style.setProperty('--ring-stroke', 'var(--accent-break)');
    }
  }

  function updateBadges() {
    badgeWorkTime.textContent = `${settings.workDuration}m`;
    badgeBreakTime.textContent = `1 Ep (${settings.breakDuration}m)`;
  }

  function updateEpisodesDisplay() {
    episodesCountElem.textContent = episodesCompleted;
  }

  // --- Control del Temporizador ---
  function setMode(mode, resetTime = true) {
    currentMode = mode;
    pauseTimer();

    if (currentMode === 'work') {
      totalDuration = settings.workDuration * 60;
    } else {
      totalDuration = settings.breakDuration * 60;
    }

    if (resetTime) {
      timeLeft = totalDuration;
    }

    updateModeUI();
    updateDisplay();
  }

  function startTimer() {
    initAudio();
    if (isRunning) return;

    isRunning = true;
    startIcon.textContent = '❚❚';
    startText.textContent = 'Pausar';
    subStatus.textContent = currentMode === 'work' ? 'Enfócate en tu objetivo' : 'Disfruta tu episodio';

    // Usamos timestamp absoluto para evitar retrasos por throttling en pestañas en segundo plano
    targetEndTime = Date.now() + timeLeft * 1000;

    timerInterval = setInterval(() => {
      const remainingMs = targetEndTime - Date.now();
      if (remainingMs <= 0) {
        timeLeft = 0;
        updateDisplay();
        handleSessionComplete();
      } else {
        timeLeft = Math.ceil(remainingMs / 1000);
        updateDisplay();
      }
    }, 250);
  }

  function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    startIcon.textContent = '▶';
    startText.textContent = 'Continuar';
    subStatus.textContent = 'En pausa';
    updateDisplay();
  }

  function toggleStartPause() {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function resetCurrentTimer() {
    pauseTimer();
    timeLeft = totalDuration;
    startText.textContent = 'Iniciar';
    subStatus.textContent = 'Listo para empezar';
    updateDisplay();
  }

  function skipToNext() {
    pauseTimer();
    if (currentMode === 'work') {
      setMode('break', true);
    } else {
      setMode('work', true);
    }
  }

  function handleSessionComplete() {
    pauseTimer();
    playChime();

    if (currentMode === 'work') {
      episodesCompleted += 1;
      saveEpisodes();
      updateEpisodesDisplay();

      // Cambiar a descanso de anime
      setMode('break', true);
      subStatus.textContent = '¡Sesión de trabajo terminada! Hora de tu anime 🍿';
    } else {
      // Descanso de anime terminado, volver a trabajo
      setMode('work', true);
      subStatus.textContent = '¡Episodio terminado! Volvemos al trabajo 🚀';
    }

    if (settings.autoStart) {
      setTimeout(() => {
        startTimer();
      }, 1000);
    } else {
      startText.textContent = 'Iniciar';
    }
  }

  // --- Animedatos Integration ---
  function searchAnime(query) {
    if (!query || !query.trim()) {
      window.open('https://www.animedatos.com/', '_blank');
      return;
    }
    const cleanQuery = query.trim();
    const searchUrl = `https://www.animedatos.com/?s=${encodeURIComponent(cleanQuery)}`;
    window.open(searchUrl, '_blank');
  }

  // --- Event Listeners ---
  // Botones de Modo
  modeWorkBtn.addEventListener('click', () => {
    if (currentMode !== 'work') setMode('work', true);
  });

  modeBreakBtn.addEventListener('click', () => {
    if (currentMode !== 'break') setMode('break', true);
  });

  // Controles
  startPauseBtn.addEventListener('click', toggleStartPause);
  resetBtn.addEventListener('click', resetCurrentTimer);
  skipBtn.addEventListener('click', skipToNext);

  // Contador de Episodios
  incEpBtn.addEventListener('click', () => {
    episodesCompleted += 1;
    saveEpisodes();
    updateEpisodesDisplay();
  });

  decEpBtn.addEventListener('click', () => {
    if (episodesCompleted > 0) {
      episodesCompleted -= 1;
      saveEpisodes();
      updateEpisodesDisplay();
    }
  });

  // Tema
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Animedatos Search
  animedatosSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchAnime(animeSearchInput.value);
  });

  tagChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const animeName = chip.getAttribute('data-anime');
      animeSearchInput.value = animeName;
      searchAnime(animeName);
    });
  });

  // Modal de Ajustes
  openSettingsBtn.addEventListener('click', () => {
    workDurationInput.value = settings.workDuration;
    breakDurationInput.value = settings.breakDuration;
    soundEnabledInput.checked = settings.soundEnabled;
    autoStartInput.checked = settings.autoStart;
    settingsModal.removeAttribute('hidden');
  });

  closeSettingsBtn.addEventListener('click', () => {
    settingsModal.setAttribute('hidden', '');
  });

  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      settingsModal.setAttribute('hidden', '');
    }
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const timeVal = parseInt(btn.getAttribute('data-time'), 10);
      if (timeVal) {
        breakDurationInput.value = timeVal;
      }
    });
  });

  testSoundBtn.addEventListener('click', () => {
    playChime();
  });

  resetDefaultsBtn.addEventListener('click', () => {
    workDurationInput.value = DEFAULT_SETTINGS.workDuration;
    breakDurationInput.value = DEFAULT_SETTINGS.breakDuration;
    soundEnabledInput.checked = DEFAULT_SETTINGS.soundEnabled;
    autoStartInput.checked = DEFAULT_SETTINGS.autoStart;
  });

  saveSettingsBtn.addEventListener('click', () => {
    const newWork = parseInt(workDurationInput.value, 10);
    const newBreak = parseInt(breakDurationInput.value, 10);

    if (newWork >= 1 && newWork <= 180) {
      settings.workDuration = newWork;
    }
    if (newBreak >= 1 && newBreak <= 120) {
      settings.breakDuration = newBreak;
    }

    settings.soundEnabled = soundEnabledInput.checked;
    settings.autoStart = autoStartInput.checked;

    saveSettings();
    updateBadges();

    // Actualizar temporizador actual si no está en marcha
    if (!isRunning) {
      setMode(currentMode, true);
    }

    settingsModal.setAttribute('hidden', '');
  });

  // Atajos de teclado
  window.addEventListener('keydown', (e) => {
    // No activar atajos si el usuario está escribiendo en un input
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.code === 'Space') {
      e.preventDefault();
      toggleStartPause();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      resetCurrentTimer();
    } else if (e.key === 's' || e.key === 'S') {
      e.preventDefault();
      skipToNext();
    }
  });

  // Inicialización
  loadStoredData();
  setMode('work', true);
})();
