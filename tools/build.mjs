import {mkdir, cp, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
const root = new URL('..', import.meta.url).pathname;
const out = join(root,'dist');
await mkdir(join(out,'runtime'),{recursive:true});
await cp(join(root,'src'),join(out,'src'),{recursive:true});
await cp(join(root,'pytml.js'),join(out,'pytml.js'));
await cp(join(root,'examples'),join(out,'examples'),{recursive:true});
await cp(join(root,'docs'),join(out,'docs'),{recursive:true});
try { await cp(join(root,'runtime','dist'),join(out,'runtime'),{recursive:true}); } catch {}
await writeFile(join(out,'VERSION'), '3.0.0-alpha.1\n');
console.log(`Pytml build written to ${out}`);
