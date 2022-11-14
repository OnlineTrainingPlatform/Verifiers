import path from 'path';
import { ROOT_PATH } from '../environment';

export function rootPath(): string {
  if (!ROOT_PATH) {
    return __dirname.substring(0, __dirname.lastIndexOf('/') - 1);
  }
  return ROOT_PATH;
}

export function verifytaLinuxPath(): string {
  return path.join(rootPath(), 'verifyta', 'linux', 'verifyta');
}

export function verifytaWindowsPath(): string {
  return path.join(rootPath(), 'verifyta', 'windows', 'verifyta.exe');
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
