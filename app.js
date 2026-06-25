(function () {
  const categories = window.GRAMMAR_CATEGORIES;
  const questions = window.GRAMMAR_QUESTIONS;
  const generatedQuestions = window.GRAMMAR_GENERATED_QUESTIONS || [];
  const knownProfile = window.GRAMMAR_KNOWN_PROFILE || {};
  const coachLessons = window.GRAMMAR_COACH_LESSONS || {};
  const app = document.getElementById('app');
  const liveRegion = document.getElementById('live-region');
  const storageKey = 'grammar-atlas-progress-v2';
  const categoryQuizSize = 10;
  const bankDrillSize = 25;

  const state = {
    screen: 'home',
    mode: null,
    title: '',
    queue: [],
    index: 0,
    selected: null,
    revealed: false,
    answers: [],
    startedAt: null,
    result: null,
    coachCategory: null
  };

  let progress = loadProgress();

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && Array.isArray(saved.attempts)) {
        saved.coachCompleted = Array.isArray(saved.coachCompleted) ? saved.coachCompleted : [];
        return saved;
      }
    } catch (error) {
      console.warn('Progression illisible, nouveau départ.', error);
    }
    return { attempts: [], coachCompleted: [] };
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  function icon(name, size = 20) {
    const paths = {
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      chart: '<path d="M4 19V9m6 10V5m6 14v-7m4 7H2"/>',
      spark: '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 3 .6 1.9L22 5.5l-1.9.6L19.5 8l-.6-1.9L17 5.5l1.9-.6L19 3Z"/>',
      target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"/>',
      rotate: '<path d="M20 7v5h-5"/><path d="M18.5 16a8 8 0 1 1 .8-9L20 12"/>',
      home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
      chevron: '<path d="m9 18 6-6-6-6"/>'
    };
    return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function categoryById(id) {
    return categories.find((category) => category.id === id);
  }

  function getCategoryHistory(id) {
    const answers = progress.attempts.flatMap((attempt) => attempt.answers || []).filter((answer) => answer.category === id);
    const correct = answers.filter((answer) => answer.correct).length;
    const baseline = Number.isFinite(knownProfile[id]) ? knownProfile[id] : null;
    const baselineWeight = baseline === null ? 0 : 3;
    const weightedCorrect = correct + (baseline === null ? 0 : (baseline / 100) * baselineWeight);
    const totalCount = answers.length + baselineWeight;
    return {
      count: totalCount,
      score: totalCount ? Math.round((weightedCorrect / totalCount) * 100) : null,
      newAnswers: answers.length,
      baseline: baseline !== null
    };
  }

  function getPriorityCategories(limit = 3, lessonsOnly = false) {
    return categories
      .map((category) => ({ ...category, ...getCategoryHistory(category.id) }))
      .filter((category) => !lessonsOnly || coachLessons[category.id])
      .sort((a, b) => a.score - b.score || a.index.localeCompare(b.index))
      .slice(0, limit);
  }

  function announce(message) {
    liveRegion.textContent = '';
    window.setTimeout(() => { liveRegion.textContent = message; }, 30);
  }

  function shell(content, options = {}) {
    const compact = options.compact ? ' site-header--compact' : '';
    return `
      <header class="site-header${compact}">
        <button class="brand" type="button" data-action="home" aria-label="Retour à l'accueil">
          <span class="brand-mark" aria-hidden="true">GA</span>
          <span class="brand-name">Grammar Atlas</span>
        </button>
        <div class="header-note">
          <span class="status-dot" aria-hidden="true"></span>
          Diagnostic IELTS · non officiel
        </div>
      </header>
      <main id="main" tabindex="-1">${content}</main>
      ${options.hideFooter ? '' : footer()}
    `;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div>
          <span class="brand-name">Grammar Atlas</span>
          <p>Un outil local : tes résultats restent dans ce navigateur.</p>
        </div>
        <p>Notions structurées d’après le programme <a href="https://ieltsonlinetests.com/ielts-grammar/ielts-grammar-101-iot" target="_blank" rel="noreferrer">IELTS Grammar 101</a>.</p>
      </footer>
    `;
  }

  function renderHome() {
    state.screen = 'home';
    const lastAttempt = progress.attempts[0];
    const attemptedCategories = categories.filter((category) => getCategoryHistory(category.id).count > 0).length;
    const scoredCategories = categories.map((category) => getCategoryHistory(category.id)).filter((history) => history.score !== null);
    const globalScore = scoredCategories.length ? Math.round(scoredCategories.reduce((sum, history) => sum + history.score, 0) / scoredCategories.length) : null;
    const priorities = getPriorityCategories(3, true);
    const firstPriority = priorities[0];

    const continueCard = lastAttempt ? `
      <aside class="history-card" aria-label="Dernier résultat">
        <div class="history-score"><strong>${lastAttempt.score}%</strong><span>dernier score</span></div>
        <div>
          <p class="eyebrow">Dernier passage</p>
          <h3>${escapeHtml(lastAttempt.title)}</h3>
          <p>${formatDate(lastAttempt.date)} · ${lastAttempt.answers.length} questions</p>
        </div>
        <button class="icon-button" type="button" data-action="view-last" aria-label="Voir le dernier bilan">${icon('arrow')}</button>
      </aside>
    ` : '';

    app.innerHTML = shell(`
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow"><span>Mode dernière ligne droite</span> Moins de 24 h</p>
          <h1>On ne révise pas tout. On répare <em>ce qui te coûte.</em></h1>
          <p class="hero-lead">Ton parcours commence par ${firstPriority.name.toLowerCase()} et les adverbes. Une règle courte, un exemple IELTS, puis une application immédiate.</p>
          <div class="hero-actions">
            <button class="button button--primary" type="button" data-action="open-coach">
              Ouvrir mon plan 24 h ${icon('arrow')}
            </button>
            <button class="button button--secondary" type="button" data-action="start-bank">Drill 25 phrases IELTS</button>
            <button class="button button--secondary" type="button" data-action="open-lesson" data-category="${firstPriority.id}">Ma première leçon · 12 min</button>
          </div>
          <ul class="hero-meta" aria-label="Caractéristiques du plan">
            <li>${icon('clock', 18)} 2 h 15 ciblées</li>
            <li>${icon('target', 18)} 3 priorités</li>
            <li>${icon('book', 18)} ${questions.length} phrases en banque</li>
          </ul>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="poster-card poster-card--back"><span>IF</span><p>condition</p></div>
          <div class="poster-card poster-card--middle"><span>∴</span><p>therefore</p></div>
          <div class="poster-card poster-card--front">
            <span class="poster-kicker">Ta prochaine priorité · ${firstPriority.score}%</span>
            <strong>${firstPriority.name}</strong>
            <div class="mini-rule"><i></i><i></i><i></i><i></i></div>
            <p>Objectif : reconnaître le squelette de la phrase avant de choisir une réponse.</p>
          </div>
        </div>
      </section>

      <section class="coach-callout" aria-labelledby="coach-callout-title">
        <div class="coach-callout__clock"><span>&lt;24</span><small>heures</small></div>
        <div class="coach-callout__copy">
          <p class="eyebrow">Plan personnalisé activé</p>
          <h2 id="coach-callout-title">Trois faiblesses. Une seule mission.</h2>
          <p>${priorities.map((category) => `${category.name} (${category.score}%)`).join(' · ')}. On les travaille dans cet ordre, avec ${generatedQuestions.length || 1000} phrases de correction/complétion, sans perdre de temps sur tes points déjà solides.</p>
        </div>
        <button class="button button--primary" type="button" data-action="start-adaptive">Lancer le drill ciblé ${icon('arrow')}</button>
      </section>

      ${continueCard}

      <section class="overview" aria-labelledby="overview-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Ton profil importé</p>
            <h2 id="overview-title">Les 11 territoires</h2>
          </div>
          <div class="overview-stats" aria-label="Résumé de progression">
            <div><strong>${globalScore === null ? '—' : `${globalScore}%`}</strong><span>moyenne</span></div>
            <div><strong>${attemptedCategories}/11</strong><span>explorés</span></div>
          </div>
        </div>
        <div class="topic-grid">
          ${categories.map((category) => topicCard(category)).join('')}
        </div>
      </section>

      <section class="method-strip">
        <div class="method-number">${icon('spark', 28)}</div>
        <div><p class="eyebrow">Comment ça marche</p><h2>Réponds. Comprends. Recommence.</h2></div>
        <p>Chaque erreur est classée par type — forme, choix, temps, structure ou logique — pour éviter le vague “je suis nul en grammaire”.</p>
      </section>
    `);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function topicCard(category) {
    const history = getCategoryHistory(category.id);
    const scoreLabel = history.score === null ? 'Non testé' : `${history.score}%`;
    const width = history.score === null ? 0 : history.score;
    const drillCount = Math.min(categoryQuizSize, questions.filter((question) => question.category === category.id).length);
    return `
      <article class="topic-card" style="--topic:${category.color}">
        <div class="topic-top"><span class="topic-index">${category.index}</span><span class="topic-score">${scoreLabel}</span></div>
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <div class="topic-bar" aria-label="Maîtrise : ${scoreLabel}"><span style="width:${width}%"></span></div>
        <button class="topic-action" type="button" data-action="start-category" data-category="${category.id}">
          Tester ce point <span>${drillCount} phrases</span> ${icon('chevron', 17)}
        </button>
      </article>
    `;
  }

  function renderCoach() {
    state.screen = 'coach';
    const priorities = getPriorityCategories(5, true);
    const primary = priorities.slice(0, 3);
    const strengths = categories
      .map((category) => ({ ...category, ...getCategoryHistory(category.id) }))
      .filter((category) => category.score >= 90);
    const completed = progress.coachCompleted || [];

    app.innerHTML = shell(`
      <section class="coach-hero">
        <div>
          <button class="quiet-button" type="button" data-action="home">${icon('home', 18)} Accueil</button>
          <p class="eyebrow">Programme d’urgence · personnalisé</p>
          <h1>Les prochaines heures ont déjà un ordre.</h1>
          <p>Tu n’as pas besoin de devenir meilleur partout. Tu dois rendre automatiques les règles qui ont réellement provoqué tes erreurs.</p>
          <div class="hero-actions">
            <button class="button button--primary" type="button" data-action="open-lesson" data-category="${primary[0].id}">Commencer maintenant ${icon('arrow')}</button>
            <button class="button button--secondary" type="button" data-action="start-adaptive">Drill adaptatif · 12 questions</button>
          </div>
        </div>
        <aside class="coach-focus-card">
          <span class="coach-focus-card__label">Si tu n’as que 30 minutes</span>
          <ol>
            ${primary.map((category, index) => `<li><span>0${index + 1}</span><strong>${category.name}</strong><small>${category.score}% actuellement</small></li>`).join('')}
          </ol>
          <p>Ne touche pas à tes points forts. Ils sont déjà disponibles le jour J.</p>
        </aside>
      </section>

      <section class="coach-dashboard" aria-labelledby="priority-title">
        <div class="section-heading">
          <div><p class="eyebrow">Apprendre avant de retester</p><h2 id="priority-title">Tes leçons prioritaires</h2></div>
          <div class="coach-progress"><strong>${completed.length}/${priorities.length}</strong><span>leçons vues</span></div>
        </div>
        <div class="coach-priority-grid">
          ${priorities.map((category, index) => coachPriorityCard(category, index, completed.includes(category.id))).join('')}
        </div>
      </section>

      <section class="last-day-plan" aria-labelledby="last-day-title">
        <div class="section-heading">
          <div><p class="eyebrow">Aujourd’hui → examen</p><h2 id="last-day-title">Le plan sans panique</h2></div>
          <p class="plan-total">Total utile : ≈ 2 h 15</p>
        </div>
        <div class="timeline-grid">
          <article><span>Maintenant · 55 min</span><h3>Comprendre</h3><p>Parties de phrase + adverbes. Lis les deux mini-leçons et fais leurs exercices.</p><button type="button" data-action="open-lesson" data-category="sentence-parts">Démarrer ${icon('arrow', 17)}</button></article>
          <article><span>Après une pause · 40 min</span><h3>Sécuriser</h3><p>Noms et temps verbaux. Concentre-toi sur les signaux, pas sur les exceptions.</p><button type="button" data-action="open-lesson" data-category="nouns">Continuer ${icon('arrow', 17)}</button></article>
          <article><span>Ce soir · 25 min</span><h3>Rappeler</h3><p>Un drill uniquement sur tes priorités. Termine en relisant les explications fausses.</p><button type="button" data-action="start-adaptive">Lancer le drill ${icon('arrow', 17)}</button></article>
          <article><span>Demain · 15 min</span><h3>Activer</h3><p>Un sprint transversal, puis stop. Aucune nouvelle règle juste avant l’épreuve.</p><button type="button" data-action="start-sprint">Sprint final ${icon('arrow', 17)}</button></article>
        </div>
      </section>

      <section class="strength-vault">
        <div><p class="eyebrow">À ne pas sur-réviser</p><h2>Tes acquis sont déjà là.</h2></div>
        <div class="strength-chips">${strengths.map((category) => `<span style="--topic:${category.color}">${icon('check', 16)} ${category.name} · ${category.score}%</span>`).join('')}</div>
      </section>
    `);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function coachPriorityCard(category, index, isCompleted) {
    const lesson = coachLessons[category.id];
    return `
      <article class="coach-priority-card ${isCompleted ? 'coach-priority-card--done' : ''}" style="--topic:${category.color}">
        <div class="coach-priority-card__top"><span>0${index + 1}</span><strong>${category.score}%</strong></div>
        <p class="eyebrow">${lesson.eyebrow}</p>
        <h3>${category.name}</h3>
        <p>${lesson.promise}</p>
        <div class="coach-memory">${lesson.memory}</div>
        <button type="button" data-action="open-lesson" data-category="${category.id}">${isCompleted ? `${icon('check', 17)} Revoir la leçon` : `Apprendre maintenant ${icon('arrow', 17)}`}</button>
      </article>
    `;
  }

  function renderCoachLesson(categoryId) {
    const lesson = coachLessons[categoryId];
    const category = categoryById(categoryId);
    if (!lesson || !category) {
      renderCoach();
      return;
    }
    state.screen = 'lesson';
    state.coachCategory = categoryId;
    const completed = (progress.coachCompleted || []).includes(categoryId);

    app.innerHTML = shell(`
      <div class="lesson-page" style="--topic:${category.color}">
        <nav class="lesson-nav" aria-label="Navigation de la leçon">
          <button class="quiet-button" type="button" data-action="open-coach">${icon('chevron', 18)} Retour au plan</button>
          <span>${completed ? `${icon('check', 16)} Déjà parcourue` : 'Mini-leçon personnalisée'}</span>
        </nav>

        <header class="lesson-hero">
          <div class="lesson-number">${category.index}</div>
          <div><p class="eyebrow">${lesson.eyebrow} · ${category.name}</p><h1>${lesson.title}</h1><p>${lesson.promise}</p></div>
        </header>

        <section class="memory-banner" aria-label="Phrase à retenir">
          <span>Le raccourci à garder</span><strong>${lesson.memory}</strong>
        </section>

        <section class="concept-list" aria-label="Les trois réflexes">
          ${lesson.concepts.map((concept, index) => `
            <article class="concept-card">
              <div class="concept-card__number">${String(index + 1).padStart(2, '0')}</div>
              <div class="concept-card__body">
                <p class="eyebrow">${concept.label}</p>
                <h2>${concept.title}</h2>
                <p class="concept-rule">${concept.rule}</p>
                <div class="example-pair">
                  <div class="example example--wrong"><span>À éviter</span><p>${concept.wrong}</p></div>
                  <div class="example example--correct"><span>À viser</span><p>${concept.correct}</p></div>
                </div>
                <p class="concept-why"><strong>Pourquoi :</strong> ${concept.why}</p>
              </div>
            </article>
          `).join('')}
        </section>

        <section class="lesson-recap">
          <div><p class="eyebrow">Au moment de répondre</p><h2>Ta checklist en 10 secondes</h2><ol>${lesson.checklist.map((item) => `<li>${icon('check', 17)} ${item}</li>`).join('')}</ol></div>
          <aside><span>Conseil IELTS</span><p>${lesson.examTip}</p></aside>
        </section>

        <section class="lesson-cta">
          <div><p class="eyebrow">Maintenant, on vérifie</p><h2>10 situations. Explication immédiate.</h2><p>Ne cherche pas à être rapide : applique consciemment le raccourci que tu viens de lire.</p></div>
          <button class="button button--primary" type="button" data-action="practice-lesson" data-category="${categoryId}">M’entraîner sur cette règle ${icon('arrow')}</button>
        </section>
      </div>
    `);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function startAdaptiveDrill() {
    const priorities = getPriorityCategories(3, true);
    const wrongIds = new Set(progress.attempts.flatMap((attempt) => (attempt.answers || []).filter((answer) => !answer.correct).map((answer) => answer.questionId)));
    const selected = priorities.flatMap((category) => {
      const pool = questions.filter((question) => question.category === category.id);
      return [...pool.filter((question) => wrongIds.has(question.id)), ...shuffle(pool.filter((question) => !wrongIds.has(question.id)))].slice(0, 4);
    });
    startQuiz('coach', 'Drill adaptatif · priorités 24 h', shuffle(selected));
  }

  function startBankDrill() {
    const priorityIds = getPriorityCategories(6, false).map((category) => category.id);
    const priorityPool = shuffle(questions.filter((question) => priorityIds.includes(question.category)));
    const supportPool = shuffle(questions.filter((question) => !priorityIds.includes(question.category)));
    const priorityCount = Math.ceil(bankDrillSize * 0.76);
    const selected = [
      ...priorityPool.slice(0, priorityCount),
      ...supportPool.slice(0, bankDrillSize - priorityCount)
    ];
    startQuiz('bank', 'Drill IELTS · 25 phrases', shuffle(selected));
  }

  function practiceLesson(categoryId) {
    progress.coachCompleted = Array.from(new Set([...(progress.coachCompleted || []), categoryId]));
    saveProgress();
    startCategory(categoryId);
  }

  function startDiagnostic() {
    const selected = categories.flatMap((category) => shuffle(questions.filter((question) => question.category === category.id)).slice(0, 3));
    startQuiz('diagnostic', 'Diagnostic complet', shuffle(selected));
  }

  function startSprint() {
    const selected = categories.map((category) => shuffle(questions.filter((question) => question.category === category.id))[0]);
    startQuiz('sprint', 'Sprint transversal', shuffle(selected));
  }

  function startCategory(categoryId) {
    const category = categoryById(categoryId);
    const selected = shuffle(questions.filter((question) => question.category === categoryId)).slice(0, categoryQuizSize);
    startQuiz('category', `Focus · ${category.name}`, selected);
  }

  function startWeaknesses() {
    const incorrectIds = state.result.answers.filter((answer) => !answer.correct).map((answer) => answer.questionId);
    let selected = questions.filter((question) => incorrectIds.includes(question.id));
    if (selected.length < 3) {
      const weakest = getLowestCategory(state.result);
      selected = questions.filter((question) => question.category === weakest.id);
    }
    startQuiz('review', 'Revanche sur mes erreurs', shuffle(selected).slice(0, categoryQuizSize));
  }

  function startQuiz(mode, title, queue) {
    Object.assign(state, {
      screen: 'quiz', mode, title, queue, index: 0, selected: null,
      revealed: false, answers: [], startedAt: Date.now(), result: null
    });
    renderQuiz();
  }

  function renderQuiz() {
    const question = state.queue[state.index];
    const category = categoryById(question.category);
    const activeLesson = coachLessons[question.category];
    const showCoachHint = activeLesson && ['coach', 'category', 'review'].includes(state.mode);
    const percent = Math.round((state.index / state.queue.length) * 100);
    const correct = state.revealed && state.selected === question.answer;
    const feedback = state.revealed ? `
      <div class="feedback ${correct ? 'feedback--correct' : 'feedback--wrong'}" role="status">
        <div class="feedback-icon">${icon(correct ? 'check' : 'close', 22)}</div>
        <div>
          <p class="feedback-title">${correct ? 'Exact — bien vu.' : `Pas tout à fait. La réponse est ${String.fromCharCode(65 + question.answer)}.`}</p>
          <p>${question.explanation}</p>
          <span class="rule-chip">Règle · ${question.rule}</span>
          ${showCoachHint ? `<span class="rule-chip rule-chip--memory">Réflexe · ${activeLesson.memory}</span>` : ''}
        </div>
      </div>
    ` : '';

    app.innerHTML = shell(`
      <div class="quiz-page" style="--topic:${category.color}">
        <div class="quiz-topbar">
          <button class="quiet-button" type="button" data-action="quit-quiz">${icon('home', 18)} Quitter</button>
          <div class="quiz-progress-copy"><span>${state.title}</span><strong>${state.index + 1} / ${state.queue.length}</strong></div>
        </div>
        <div class="progress-track" aria-label="Progression : ${percent}%"><span style="width:${percent}%"></span></div>

        <section class="question-layout" aria-labelledby="question-title">
          <aside class="question-context">
            <span class="category-block">${category.index}</span>
            <p class="eyebrow">${category.name}</p>
            <h2>${question.type}</h2>
            <p>${category.description}</p>
            <div class="context-tip"><strong>Raccourci</strong><span>Touches 1–4 pour répondre, Entrée pour continuer.</span></div>
          </aside>

          <div class="question-card">
            <div class="question-labels"><span>Question ${state.index + 1}</span><span>${question.errorType}</span></div>
            <h1 id="question-title" tabindex="-1">${question.prompt}</h1>
            ${showCoachHint ? `<div class="quiz-memory"><span>Ton raccourci</span><strong>${activeLesson.memory}</strong></div>` : ''}
            <div class="choices" role="group" aria-label="Choix de réponse">
              ${question.options.map((option, index) => choiceButton(option, index, question)).join('')}
            </div>
            ${feedback}
            <div class="question-footer">
              <span>${state.revealed ? 'L’explication est ajoutée à ton bilan.' : 'Choisis la réponse qui te paraît la plus juste.'}</span>
              <button class="button button--primary button--next" type="button" data-action="next-question" ${state.revealed ? '' : 'disabled'}>
                ${state.index === state.queue.length - 1 ? 'Voir mon bilan' : 'Question suivante'} ${icon('arrow')}
              </button>
            </div>
          </div>
        </section>
      </div>
    `, { compact: true, hideFooter: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function choiceButton(option, index, question) {
    let stateClass = '';
    let suffix = '';
    if (state.revealed) {
      if (index === question.answer) {
        stateClass = ' choice--correct';
        suffix = icon('check', 19);
      } else if (index === state.selected) {
        stateClass = ' choice--wrong';
        suffix = icon('close', 19);
      }
    } else if (index === state.selected) {
      stateClass = ' choice--selected';
    }
    return `
      <button class="choice${stateClass}" type="button" data-action="select-answer" data-answer="${index}" ${state.revealed ? 'disabled' : ''}>
        <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
        <span class="choice-text">${option}</span>
        <span class="choice-state">${suffix}</span>
      </button>
    `;
  }

  function selectAnswer(index) {
    if (state.screen !== 'quiz' || state.revealed) return;
    const question = state.queue[state.index];
    state.selected = index;
    state.revealed = true;
    state.answers.push({
      questionId: question.id,
      category: question.category,
      selected: index,
      correct: index === question.answer,
      errorType: question.errorType
    });
    announce(index === question.answer ? 'Bonne réponse.' : `Réponse incorrecte. ${question.explanation}`);
    renderQuiz();
  }

  function nextQuestion() {
    if (!state.revealed) return;
    if (state.index >= state.queue.length - 1) {
      finishQuiz();
      return;
    }
    state.index += 1;
    state.selected = null;
    state.revealed = false;
    renderQuiz();
    document.getElementById('question-title')?.focus({ preventScroll: true });
  }

  function finishQuiz() {
    const correct = state.answers.filter((answer) => answer.correct).length;
    const result = {
      id: Date.now(),
      date: new Date().toISOString(),
      mode: state.mode,
      title: state.title,
      score: Math.round((correct / state.answers.length) * 100),
      duration: Math.max(1, Math.round((Date.now() - state.startedAt) / 60000)),
      answers: state.answers
    };
    progress.attempts.unshift(result);
    progress.attempts = progress.attempts.slice(0, 30);
    saveProgress();
    state.result = result;
    state.screen = 'results';
    renderResults();
  }

  function renderResults(result = state.result) {
    state.screen = 'results';
    state.result = result;
    const categoryScores = getAttemptCategoryScores(result);
    const lowest = categoryScores.filter((item) => item.count > 0).sort((a, b) => a.score - b.score).slice(0, 3);
    const errors = result.answers.filter((answer) => !answer.correct);
    const level = getLevel(result.score);
    const errorCounts = errors.reduce((acc, answer) => {
      acc[answer.errorType] = (acc[answer.errorType] || 0) + 1;
      return acc;
    }, {});

    app.innerHTML = shell(`
      <section class="results-hero">
        <div class="result-stamp">Bilan<br>${new Date(result.date).getFullYear()}</div>
        <div class="results-copy">
          <p class="eyebrow">${result.title} · ${result.duration} min</p>
          <h1>${level.title}</h1>
          <p>${level.message}</p>
          <div class="result-actions">
            <button class="button button--primary" type="button" data-action="retry-weak">Retravailler mes erreurs ${icon('rotate')}</button>
            <button class="button button--secondary" type="button" data-action="open-coach">Continuer le plan 24 h</button>
            <button class="text-action" type="button" data-action="home">Accueil</button>
          </div>
        </div>
        <div class="score-disc" aria-label="Score de ${result.score}%">
          <span>Score</span><strong>${result.score}</strong><small>/ 100</small>
        </div>
      </section>

      <section class="results-grid">
        <div class="results-panel results-panel--wide">
          <div class="panel-heading"><div><p class="eyebrow">Vue d’ensemble</p><h2>Maîtrise par territoire</h2></div><span>${result.answers.length - errors.length}/${result.answers.length} réponses justes</span></div>
          <div class="skill-bars">
            ${categoryScores.filter((item) => item.count > 0).map((item) => `
              <div class="skill-row">
                <div class="skill-name"><span style="--topic:${item.color}">${item.index}</span><strong>${item.name}</strong></div>
                <div class="skill-track"><span style="width:${item.score}%;--topic:${item.color}"></span></div>
                <strong class="skill-score">${item.score}%</strong>
              </div>
            `).join('')}
          </div>
        </div>

        <aside class="results-panel priorities-panel">
          <p class="eyebrow">À travailler d’abord</p>
          <h2>Ton plan d’attaque</h2>
          <ol class="priority-list">
            ${lowest.map((item, index) => `
              <li><span>0${index + 1}</span><div><strong>${item.name}</strong><small>${item.correct}/${item.count} juste${item.correct > 1 ? 's' : ''}</small></div><button type="button" data-action="start-category" data-category="${item.id}" aria-label="Travailler ${item.name}">${icon('arrow', 18)}</button></li>
            `).join('')}
          </ol>
        </aside>
      </section>

      <section class="error-section" aria-labelledby="error-title">
        <div class="section-heading">
          <div><p class="eyebrow">Journal d’erreurs</p><h2 id="error-title">${errors.length ? 'Ce qui t’a piégé' : 'Aucune erreur cette fois'}</h2></div>
          <div class="error-tags">${Object.entries(errorCounts).map(([type, count]) => `<span>${type} · ${count}</span>`).join('')}</div>
        </div>
        ${errors.length ? `<div class="error-list">${errors.map(errorCard).join('')}</div>` : `<div class="perfect-card">${icon('spark', 34)}<h3>Copie parfaite.</h3><p>Relance un diagnostic : les questions changent à chaque passage.</p></div>`}
      </section>

      <section class="disclaimer"><strong>À garder en tête</strong><p>Ce score est un diagnostic d’entraînement, pas une estimation officielle de band IELTS. Il mesure uniquement les notions échantillonnées ici.</p></section>
    `);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function errorCard(answer, index) {
    const question = questions.find((item) => item.id === answer.questionId);
    const category = categoryById(answer.category);
    return `
      <details class="error-card" ${index === 0 ? 'open' : ''}>
        <summary>
          <span class="error-index" style="--topic:${category.color}">${String(index + 1).padStart(2, '0')}</span>
          <span><small>${category.name} · ${answer.errorType}</small><strong>${question.prompt}</strong></span>
          ${icon('chevron', 20)}
        </summary>
        <div class="error-detail">
          <div><span>Ta réponse</span><p class="wrong-text">${question.options[answer.selected]}</p></div>
          <div><span>Bonne réponse</span><p class="correct-text">${question.options[question.answer]}</p></div>
          <p class="error-explanation"><strong>${question.rule}.</strong> ${question.explanation}</p>
        </div>
      </details>
    `;
  }

  function getAttemptCategoryScores(result) {
    return categories.map((category) => {
      const answers = result.answers.filter((answer) => answer.category === category.id);
      const correct = answers.filter((answer) => answer.correct).length;
      return { ...category, count: answers.length, correct, score: answers.length ? Math.round((correct / answers.length) * 100) : 0 };
    });
  }

  function getLowestCategory(result) {
    return getAttemptCategoryScores(result).filter((item) => item.count > 0).sort((a, b) => a.score - b.score)[0] || categories[0];
  }

  function getLevel(score) {
    if (score >= 90) return { title: 'Très solide.', message: 'Ta grammaire est précise sur cet échantillon. Concentre-toi maintenant sur la variété et l’emploi naturel des structures.' };
    if (score >= 75) return { title: 'Une base solide.', message: 'Tu maîtrises l’essentiel. Quelques angles morts précis t’empêchent encore d’être pleinement régulier.' };
    if (score >= 55) return { title: 'En bonne progression.', message: 'Tes acquis sont là, mais certaines règles ne sont pas encore automatiques. Le plan ci-dessous te montre où agir.' };
    return { title: 'On a trouvé le chantier.', message: 'Bonne nouvelle : tes difficultés sont maintenant visibles et classées. Commence par les trois priorités ci-dessous.' };
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]);
  }

  app.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    if (action === 'home') renderHome();
    if (action === 'start-diagnostic') startDiagnostic();
    if (action === 'start-sprint') startSprint();
    if (action === 'open-coach') renderCoach();
    if (action === 'open-lesson') renderCoachLesson(button.dataset.category);
    if (action === 'start-adaptive') startAdaptiveDrill();
    if (action === 'start-bank') startBankDrill();
    if (action === 'practice-lesson') practiceLesson(button.dataset.category);
    if (action === 'start-category') startCategory(button.dataset.category);
    if (action === 'select-answer') selectAnswer(Number(button.dataset.answer));
    if (action === 'next-question') nextQuestion();
    if (action === 'quit-quiz') renderHome();
    if (action === 'retry-weak') startWeaknesses();
    if (action === 'view-last' && progress.attempts[0]) renderResults(progress.attempts[0]);
  });

  document.addEventListener('keydown', (event) => {
    if (state.screen !== 'quiz') return;
    if (!state.revealed && ['1', '2', '3', '4'].includes(event.key)) {
      selectAnswer(Number(event.key) - 1);
    } else if (state.revealed && event.key === 'Enter') {
      event.preventDefault();
      nextQuestion();
    }
  });

  renderHome();
})();
