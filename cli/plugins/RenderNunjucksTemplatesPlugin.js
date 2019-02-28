const fs = require('fs');
const path = require('path');
const glob = require('glob');
const nunjucks = require('nunjucks');

module.exports = class {
  constructor(options) {
    this.options = options;
    this.partialPattern = /_(.*)$/;
    this.rootAbsolute = path.resolve(this.options.root);
    
    nunjucks.configure(this.options.root, { autoescape: true });
  }
  
  apply(compiler) {
    compiler.hooks.done.tap('RenderNunjucksTemplatesPlugin', (stats) => {
      if(stats.hasErrors()) {
        return;
      }
      
      glob(`**/*.${this.options.ext}`, { cwd: this.rootAbsolute }, (err, files) => {
        if(err) console.log(err);
    
        files.forEach(file => {
          const basenameNoExt = path.basename(file, `.${this.options.ext}`);
          if(!this.partialPattern.test(basenameNoExt)) {
            const outputName = file.replace(path.basename(file), `${basenameNoExt}.html`);
        
            fs.writeFile(path.resolve(this.options.output, outputName), nunjucks.render(file), (err) => {
              if(err) console.log(err);
            });
          }
        });
      });
    });
  }
};
