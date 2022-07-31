class Log {
  static forceDisplayAll = false;
  static forceHideAllLog = false;

  constructor(display = true) {
    this.display = display;
  }
  log = (info, type = "log") => {
    (Log.forceDisplayAll || this.display) &&
      !Log.forceHideAllLog &&
      eval(`console.${type}`)(info);
  };
}

const logMaker = (display = true) => new Log(display).log;
const log = logMaker();

export { Log, logMaker, log };
