export class PytmlRuntimeAdapter {
  constructor(options={}) { this.options=options; this.ready=false; this.programs=new Map(); }
  async initialize(){
    if (globalThis.PytmlRuntime?.initialize) {
      await globalThis.PytmlRuntime.initialize(this.options);
      this.ready=true; return;
    }
    throw new Error('Pytml CPython WASM runtime is missing. Build runtime/ with npm run build:runtime and serve the generated runtime assets. Pytml does not fall back to Pyodide.');
  }
  async execute(source, programId, context){
    if (!globalThis.PytmlRuntime?.execute) throw new Error('PytmlRuntime.execute is unavailable.');
    return globalThis.PytmlRuntime.execute(source,{programId,context});
  }
  async interrupt(programId){ return globalThis.PytmlRuntime?.interrupt?.(programId); }
  async installPackage(specifier){ return globalThis.PytmlRuntime?.installPackage?.(specifier); }
  async callPython(callback,event){ return globalThis.PytmlRuntime?.call?.(callback,event); }
}
