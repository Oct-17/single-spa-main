const PLUGIN_NAME = 'my-plugin';

class MyPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
      console.log(PLUGIN_NAME, "::", "stats::", stats);
      console.log(PLUGIN_NAME, "::", "running::", compiler.output);
      console.log(PLUGIN_NAME, "::", "options::", this.options?.message);
    });
  }
}

export default MyPlugin;
