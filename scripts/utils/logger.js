require('colors');

function padTime(msg) {
  while (msg.toString().length < 2) {
    msg = '0' + msg.toString();
  }
  return msg;
}

module.exports = function (tag, color, bold) {
  this.getPrefix = () => {
    let date = new Date();
    let prefix = `[BUILD ${padTime(date.getHours())}:${padTime(date.getMinutes())}:${padTime(date.getSeconds())}`;
    if (tag) {
      prefix += ` ${tag}`;
    }
    prefix += '] ';
    if (color) {
      prefix = prefix[color];
    }
    if (bold) {
      prefix = prefix.bold;
    }
    return prefix;
  };

  this.log = (msg) => {
    console.log(`${this.getPrefix()}${msg}`);
  };

  this.warn = (msg) => {
    console.log(`${this.getPrefix()}${msg.yellow}`);
  };

  this.error = (msg) => {
    console.log(`${this.getPrefix()}${msg.red}`);
  };
};
