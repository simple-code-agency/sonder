module.exports = class {
  constructor(messages) {
    this.messages = messages;
  }
  
  apply(compiler) {
    compiler.hooks.done.tap('after-serve-info', stats => {
      if(stats.hasErrors()) {
        return;
      }
      
      this.messages.forEach(message => console.log(message));
    });
  }
};
