import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('project contains the new Pytml architecture', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url),'utf8');
  assert.match(readme,/CPython WebAssembly/);
  assert.doesNotMatch(readme,/pytml\.js.*Pyodide.*Python/i);
});

test('language docs define pyN as identifiers', async () => {
  const docs = await readFile(new URL('../docs/LANGUAGE.md', import.meta.url),'utf8');
  assert.match(docs,/identifier/i);
  assert.match(docs,/<py1>/);
});
