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
