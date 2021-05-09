'use strict';
class Timer {
  constructor(rootElement) {
    this.root = rootElement;
    this.start = null;
    this.current = 0;
    this.interval = null;
    this.time = this.setTime;

    this.init();
  }
  init() {
    this.btnStart = this.createElement('button', { classNames: ['start'], handlers: { click: this.startTimer } });
    this.btnReset = this.createElement('button', { classNames: ['reset'], handlers: { click: this.resetTimer }, attributes: { hidden: true } });
    this.btnPause = this.createElement('button', { classNames: ['pause'], handlers: { click: this.pauseTimer }, attributes: { hidden: true } });
    this.btnResume = this.createElement('button', { classNames: ['resume'], handlers: { click: this.resumeTimer }, attributes: { hidden: true } });
    this.spanTime = this.createElement('span', { classNames: ['time'] });
    this.spanTime.innerText = this.setTime(0);;
    this.btnReset.innerText = `Reset`;
    this.btnStart.innerText = `Start`;
    this.btnPause.innerText = `Pause`;
    this.btnResume.innerText = `Resume`;
    this.btnsWrap = this.createElement('div',
      { classNames: ['btns-wrap'] },
      this.btnPause, this.btnStart, this.btnReset, this.btnResume);
    // return [this.spanTime, this.btnsWrap];
    this.root.append(this.spanTime, this.btnsWrap);
  }

  startTimer() {
    this.start = Date.now();
    this.current = 0;
    console.log(this.spanTime);
    this.interval = setInterval(() => {
      this.current = Date.now() - this.start;
      // this.spanTime.innerText = this.setTime(this.current);
      this.btnStart.hidden = true;
      this.btnPause.hidden = false;
      this.btnReset.hidden = false;
    });
  }
  pauseTimer() {
    clearInterval(this.interval);
    this.btnPause.hidden = true;
    this.btnResume.hidden = false;
  }
  resetTimer() {
    clearInterval(interval);
    this.interval = null;
    this.start = null;
    this.current = null;
    this.btnStart.hidden = false;
    this.btnResume.hidden = true;
    this.btnPause.hidden = true;
    this.btnReset.hidden = true;
    this.spanTime.innerText = this.setTime(0);
  }
  resumeTimer() {
    this.btnPause.hidden = false;
    this.btnResume.hidden = true;
    this.start = Date.now();
    this.temp = current;
    this.interval = setInterval(() => {
      this.current = Date.now() - this.start + this.temp;
      this.spanTime.innerText = this.setTime(this.current);
      this.btnStart.hidden = true;
      this.btnPause.hidden = false;
      this.btnReset.hidden = false;
    });
  }
  setTime(time) {
    if (time === 0) {
      return `00:00:00.000`;
    }
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    const milliseconds = time % 1000;
    return `${hours}:${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}.${milliseconds}`;
  }
  createElement(
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
}