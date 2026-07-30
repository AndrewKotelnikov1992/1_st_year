const art = {
  intro: String.raw`
      .-''''-.
    .'  .--.  '.
   /   /    \   \
  |   |  01  |   |
   \   \____/   /
    '.        .'
      '-.__.-'
  ACCESS TOKEN FOUND`,
  moon: String.raw`
        _..._
      .'     '.
     /  .- -.  \
    |  (  H  )  |
     \  '- -'  /
      '.___.'
   HONEYMOON DATABASE`,
  cosmic: String.raw`
          .      *
     *        .        .
        .   .-"""-.  *
     .     /  .-.  \      .
          |  (   )  |
     *     \  '-'  /   .
            '-...-'
   SIZE COMPARISON MODULE`,
  pasta: String.raw`
       \  |  /
     .-========-.
    /  ~  ~  ~   \
   |  o   o   o   |
    \  ~  ~  ~   /
     '-========-'
     VONGOLE SIMULATOR`,
  final: String.raw`
    *       .        *
        .-''''''-.
      .'  DINNER  '.
     /   FOR TWO    \
     \    19:00     /
      '.          .'
        '-......-'
    MISSION COMPLETE`
};

const steps = [
  {
    type: 'intro',
    art: art.intro,
    kicker: 'QR-КОД ПРИНЯТ',
    title: 'ПРИВЕТ, ЛЮБИМАЯ',
    copy: [
      'Это закрытый терминал первого года нашей семейной жизни.',
      'Чтобы узнать финальные инструкции, нужно пройти 3 проверки памяти.'
    ],
    button: 'НАЧАТЬ МИССИЮ'
  },
  {
    type: 'question',
    art: art.moon,
    kicker: 'QUESTION 01 / 03',
    title: 'МЕДОВЫЙ МЕСЯЦ',
    copy: ['Где был наш медовый месяц?'],
    answers: [
      { label: 'A) Club Marvy', correct: true },
      { label: 'Б) На даче у родителей', correct: false },
      { label: 'В) На хате у Макса', correct: false }
    ],
    success: 'Верно. Море найдено. Память подтверждена.'
  },
  {
    type: 'question',
    art: art.cosmic,
    kicker: 'QUESTION 02 / 03',
    title: 'МАСШТАБ',
    copy: ['Что больше?'],
    answers: [
      { label: 'A) Попка у любимки', correct: true },
      { label: 'Б) Чёрная дыра Стрелец A* в центре Млечного пути', correct: false },
      { label: 'В) Моя мамка', correct: false }
    ],
    success: 'Абсолютно верно. Астрофизики нервно сверяют расчёты.'
  },
  {
    type: 'question',
    art: art.pasta,
    kicker: 'QUESTION 03 / 03',
    title: 'ВКУС ГОДА',
    copy: ['Если бы наш первый год был блюдом, то каким?'],
    answers: [
      { label: 'A) Паста с морем, вином и “ещё чуть-чуть чеснока”', correct: true },
      { label: 'Б) Гречка без соли', correct: false },
      { label: 'В) Сухарь в вакууме', correct: false }
    ],
    success: 'Правильно. Запах чеснока и моря уже загружается.'
  },
  {
    type: 'final',
    art: art.final,
    kicker: 'ACCESS GRANTED',
    title: 'ФИНАЛ',
    copy: [
      '<div class="final-card">' +
      '<p class="big">Приглашаю тебя на семейный ужин.</p>' +
      '<p>Он состоится <strong>в эту субботу</strong>.</p>' +
      '<p>Время прибытия: <strong>19:00</strong>.</p>' +
      '<p>Дресс-код: <strong>надень свой лучший вечерний туалет</strong>.</p>' +
      '<p>Я буду ждать тебя. Очень.</p>' +
      '</div>'
    ],
    button: 'ПРОЙТИ ЕЩЁ РАЗ'
  }
];

const asciiEl = document.getElementById('ascii');
const kickerEl = document.getElementById('kicker');
const titleEl = document.getElementById('title');
const copyEl = document.getElementById('copy');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const hintEl = document.getElementById('hint');

let stepIndex = 0;
let canContinue = true;

function renderStep(index) {
  const step = steps[index];
  canContinue = step.type !== 'question';

  asciiEl.textContent = step.art;
  kickerEl.textContent = step.kicker;
  titleEl.textContent = step.title;
  copyEl.innerHTML = step.copy.map(line => step.type === 'final' ? line : `<p>${line}</p>`).join('');
  answersEl.innerHTML = '';
  hintEl.textContent = step.type === 'question' ? 'Выбери ответ. Терминал принимает только правду.' : '';
  nextBtn.textContent = step.button || 'ДАЛЬШЕ';
  nextBtn.disabled = step.type === 'question';
  nextBtn.style.display = 'block';

  if (step.type === 'question') {
    step.answers.forEach((answer) => {
      const btn = document.createElement('button');
      btn.className = 'answer';
      btn.type = 'button';
      btn.textContent = answer.label;
      btn.addEventListener('click', () => chooseAnswer(btn, answer, step));
      answersEl.appendChild(btn);
    });
  }
}

function chooseAnswer(button, answer, step) {
  const all = [...answersEl.querySelectorAll('.answer')];

  if (answer.correct) {
    all.forEach(btn => btn.disabled = true);
    button.classList.add('correct');
    hintEl.textContent = step.success;
    nextBtn.disabled = false;
    canContinue = true;
    nextBtn.textContent = 'ПРИНЯТО →';
    return;
  }

  button.classList.add('wrong');
  button.disabled = true;
  hintEl.textContent = 'Нет. Терминал мягко качает головой. Попробуй ещё раз.';
}

nextBtn.addEventListener('click', () => {
  if (!canContinue) return;
  if (stepIndex === steps.length - 1) {
    stepIndex = 0;
  } else {
    stepIndex += 1;
  }
  renderStep(stepIndex);
});

renderStep(stepIndex);
