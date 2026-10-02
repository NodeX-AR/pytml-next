# Building the Pytml runtime

Pytml's runtime is CPython built for `wasm32-emscripten` and wrapped by a Pytml-owned browser
adapter. Emscripten emits a JavaScript loader plus WebAssembly because browser integration needs
runtime support in addition to the `.wasm` module.

## Build

```bash
npm run build:runtime
```

The script clones the pinned CPython tag when necessary and invokes CPython's Emscripten build
machinery. A successful build places generated runtime files under `runtime/dist/`.

## Why the build is separate

The runtime is a large native artifact. It should not be generated in every JavaScript package
install, and it should not be hidden behind a third-party Python-in-browser runtime.

## Browser adapter

The generated CPython loader is connected through `src/runtime/adapter.js`. The adapter contract
keeps the Pytml language/compiler independent from the exact CPython build output.
