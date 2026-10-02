# Pytml architecture

```text
HTML/CSS
   │
   ├── native DOM
   ├── Pytml convenience controls
   └── <pyN> source blocks
           │
           ▼
     Pytml document compiler
           │
           ├── extracts programs
           ├── preserves source locations
           ├── maps convenience controls to DOM
           └── builds program execution plan
           │
           ▼
      Pytml browser bridge
           │
           ├── DOM properties
           ├── events
           ├── input()/stdout/stderr
           ├── timers
           └── fetch/package bridge
           │
           ▼
    Pytml CPython WASM runtime
           │
           ├── CPython compiler/interpreter
           ├── Python stdlib
           └── micropip-compatible package layer
```

Pytml does not translate Python into JavaScript. Python is compiled/executed by CPython.
The Pytml compiler is a document/UI compiler that surrounds Python with browser capabilities.

## Runtime contract

The browser compiler expects a runtime adapter with:

- `initialize(options)`
- `execute(source, programId, context)`
- `interrupt(programId)`
- `installPackage(specifier)`

The adapter is intentionally independent of the DOM implementation. This makes the runtime
replaceable while keeping the language stable.
