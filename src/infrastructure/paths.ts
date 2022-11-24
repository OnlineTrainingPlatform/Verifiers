import Os from 'os';
import path from 'path';

const SLASH = Os.platform() === 'linux' ? '/' : '\\';

export function rootPath(): string {
  if (!process.env.ROOT_PATH) {
    const srcPath = __dirname.substring(0, __dirname.lastIndexOf(SLASH));
    return srcPath.substring(0, srcPath.lastIndexOf(SLASH));
  }
  return process.env.ROOT_PATH;
}

export function verifytaLinuxPath(): string {
  return path.join(rootPath(), 'uppaal', 'bin-Linux', 'verifyta');
}

export function verifytaWindowsPath(): string {
  return path.join(rootPath(), 'uppaal', 'bin-Windows', 'verifyta.exe');
}

export function verifytaTestModelsPath(
  model: string | undefined = undefined,
): string {
  if (!model) {
    return path.join(rootPath(), 'test-models');
  }

  if (!model.endsWith('.xml')) {
    model += '.xml';
  }
  return path.join(rootPath(), 'test-models', model);
}

export function xmlTempsPath(): string {
  return path.join(rootPath(), 'xml-temps');
}
