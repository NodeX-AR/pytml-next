# Pytml packages

Pytml exposes a familiar `micropip` API inside Python programs.

```python
import micropip
await micropip.install("requests")
```

There are two supported wheel classes:

1. `py3-none-any` pure-Python wheels.
2. Pytml WASM wheels built against the pinned CPython/Emscripten ABI.

Native scientific packages such as NumPy, pandas and Matplotlib must be compiled for the
same WASM runtime. The package index therefore contains ABI metadata and checks it before install.

Pytml does not claim that a normal desktop `.whl` is browser-compatible.
