export namespace util {
  export function isModuleInstalled(module: string): boolean {
    try {
      require.resolve(module);
      return true;
    } catch (e) {
      return false;
    }
  }

  export function getCompilerRequire(compiler: string): Array<string> {
    const module: string = `${compiler}/register`;

    if (isModuleInstalled(module)) {
      return ['--require', module];
    }

    return [];
  }

  export function getTypescriptCompilerOption(): Array<string> {
    if (isModuleInstalled('ts-node')) {
      return [`export TS_NODE_COMPILER_OPTIONS='{"removeComments":false}';`];
    }
  }

  export function getCoffeescriptCompilerOption(): Array<string> {
    return [];
  }

  export function getBabelCompilerOption(): Array<string> {
    return [];
  }
}
