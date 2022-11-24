import {
  rootPath,
  verifytaLinuxPath,
  verifytaTestModelsPath,
  verifytaWindowsPath,
} from '../paths';

import Os from 'os';
const SLASH = Os.platform() === 'linux' ? '/' : '\\';

describe('rootPath', () => {
  it('Should return root path should return directory before src', () => {
    const actual = rootPath();
    expect(actual.endsWith('Verifiers')).toBe(true);
  });
});

describe('verifytaLinuxPath', () => {
  it('Should return the path to the verifyta file', () => {
    const actual = verifytaLinuxPath();
    expect(
      actual.endsWith(`${SLASH}verifyta${SLASH}linux${SLASH}verifyta`),
    ).toBe(true);
  });
});

describe('verifytaWindowsPath', () => {
  it('Should return the path to the .exe of verifyta', () => {
    const actual = verifytaWindowsPath();
    expect(
      actual.endsWith(`${SLASH}verifyta${SLASH}windows${SLASH}verifyta.exe`),
    ).toBe(true);
  });
});

describe('verifytaTestModelsPath', () => {
  it('Should return the directory with the test models', () => {
    const actual = verifytaTestModelsPath();
    expect(actual.endsWith(`${SLASH}test-models`)).toBe(true);
  }),
    it('Should return the directory with the test models and the model file if it was provided', () => {
      const actual = verifytaTestModelsPath('model');
      expect(actual.endsWith(`${SLASH}test-models${SLASH}model.xml`)).toBe(
        true,
      );
    });
});
