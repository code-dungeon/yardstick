import * as glob from 'glob';
export namespace util {
  export function isModuleInstalled(module: string): boolean {
    try {
      require.resolve(module);
      return true;
    } catch (e) {
      return false;
    }
  }

  export function isArrayOption<T>(option: Array<T> | T): option is Array<T> {
    return Array.isArray(option);
  }

  export function getFilesWithPattern(option: Array<string> | string): Array<string> {
    const files: Array<string> = [];
    let filePatterns: Array<string>;

    if( option === undefined ){
      return files;
    } else if( isArrayOption(option)){
      filePatterns = option;
    }else {
      filePatterns = [option];
    }

    filePatterns.forEach( (pattern) => {
      if( pattern === '' ){
        return;
      }
      const filesFound: Array<string> = glob.sync(pattern);
      files.push(...filesFound);
    });

    return files;
  }

  export function getCompilerRequire(compiler: string, commandArg: string = '--require'): Array<string> {
    const module: string = `${compiler}/register`;

    if (isModuleInstalled(module)) {
      return [commandArg, module];
    }

    return [];
  }

  export function getTypescriptCompilerOption(): Array<string> {
    if (isModuleInstalled('ts-node')) {
      return [`export TS_NODE_COMPILER_OPTIONS='{"removeComments":false}';`];
    }

    return [];
  }

  export function getCoffeescriptCompilerOption(): Array<string> {
    return [];
  }

  export function getBabelCompilerOption(): Array<string> {
    return [];
  }
}
