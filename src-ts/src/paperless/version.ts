/**
 * Version information
 * Corresponds to paperless/version.py
 */

export const version = {
  version: '2.0.0',
  major: 2,
  minor: 0,
  patch: 0,
};

export function getVersionString(): string {
  return `${version.major}.${version.minor}.${version.patch}`;
}

export default version;
