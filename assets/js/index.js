'use strict';

const rootElements = document.querySelectorAll('.timerWrap');

for (const elem of rootElements) {
  createTimer(elem);
}

function createTimer(rootElement) {
  const btnStart = createElement('button', { classNames: ['start'], handlers: { click: startTimer } });
  const btnReset = createElement('button', { classNames: ['reset'], handlers: { click: resetTimer }, attributes: { hidden: true } });
  const btnPause = createElement('button', { classNames: ['pause'], handlers: { click: pauseTimer }, attributes: { hidden: true } });
  const btnResume = createElement('button', { classNames: ['resume'], handlers: { click: resumeTimer }, attributes: { hidden: true } });
  const spanTime = createElement('span', { classNames: ['time'] });
  setTime(0, spanTime);
  btnReset.innerText = `Reset`;
  btnStart.innerText = `Start`;
  btnPause.innerText = `Pause`;
  btnResume.innerText = `Resume`;
  const btnsWrap = createElement('div',
    { classNames: ['Wrap'] },
    btnStart, btnReset, btnResume, btnPause);

  rootElement.append(spanTime, btnsWrap);

  let start = null;
  let current = 0;
  let interval = null;

  btnStart.addEventListener('click', startTimer);
  btnReset.addEventListener('click', resetTimer);
  btnPause.addEventListener('click', pauseTimer);
  btnResume.addEventListener('click', resumeTimer);

  function startTimer() {
    start = Date.now();
    current = 0;
    interval = null;
    interval = setInterval(() => {
      current = Date.now() - start;
      setTime(current, spanTime);
      btnStart.hidden = true;
      btnPause.hidden = false;
      btnReset.hidden = false;
    });
  }
  function pauseTimer(e) {
    clearInterval(interval);
    e.target.hidden = true;
    btnResume.hidden = false;
  }
  function resetTimer(e) {
    clearInterval(interval);
    interval = null;
    start = null;
    current = null;
    btnStart.hidden = false;
    btnResume.hidden = true;
    btnPause.hidden = true;
    e.target.hidden = true;
    setTime(0, spanTime);
  }
  function resumeTimer(e) {
    btnPause.hidden = false;
    e.target.hidden = true;
    start = Date.now();
    let temp = current;
    interval = setInterval(() => {
      current = Date.now() - start + temp;
      setTime(current, spanTime);
      btnStart.hidden = true;
      btnPause.hidden = false;
      btnReset.hidden = false;
    });
  }
}

function createElement(
  tagName,
  { classNames = [], handlers = {}, attributes = {} } = {},
  ...children
) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);
  for (const [attrName, attrValue] of Object.entries(attributes)) {
    elem.setAttribute(attrName, attrValue);
  }
  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }
  elem.append(...children);
  return elem;
}

/*
UTILS
*/
function setTime(time, elem) {
  if (time === 0) {
    elem.innerText = `00:00:00.000`;
    return;
  }
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
  const min = Math.floor(time / 60000);
  const sec = ((time % 60000) / 1000).toFixed(0);
  const mil = time % 1000;
  elem.innerText = `${hours}:${(min < 10 ? "0" : "") + min}:${(sec < 10 ? "0" : "") + sec}.${(mil < 10 ? "00" : mil < 100 ? "0" : "") + mil}`;
}
// for (const elem of rootElements) {
  // elem.append(...new Timer().init());
  // const addTimer =  new Timer(elem);
  // addTimer.init();
// }