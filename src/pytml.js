import {compileDocument} from './compiler.js';
import {collectBindings} from './dom-bridge.js';
import {PytmlRuntimeAdapter} from './runtime/adapter.js';

class Pytml {
  constructor(options={}){ this.options=options; this.runtime=options.runtime || new PytmlRuntimeAdapter(options); this.programs=new Map(); this.started=false; }
  async start(){
    if(this.started) return this;
    this.started=true;
    this.injectStyles();
    const compiled=compileDocument(document);
    await this.runtime.initialize(this.options);
    for(const [id,blocks] of compiled.programs){
      const context={programId:id, bindings:collectBindings(document,this.runtime), runtime:this.runtime};
      this.programs.set(id,{...context, blocks});
      for(const block of blocks){
        let source=block.code;
        if(block.src) source=await (await fetch(block.src)).text();
        if(source.trim()) await this.runtime.execute(source,id,context);
      }
      blocks.forEach(b=>b.element.hidden=true);
    }
    document.dispatchEvent(new CustomEvent('pytml:ready',{detail:this}));
    return this;
  }
  injectStyles(){ if(document.getElementById('pytml-runtime-style')) return; const s=document.createElement('style'); s.id='pytml-runtime-style'; s.textContent=`[data-pytml-id]{box-sizing:border-box}.pytml-joystick{width:120px;height:120px;border-radius:50%;background:rgba(127,127,127,.2);border:1px solid rgba(127,127,127,.5);user-select:none}`; document.head.append(s); }
}

export function start(options={}){ const p=new Pytml(options); return p.start(); }
export {Pytml};
if(typeof window!=='undefined') window.pytml={start,Pytml};
