# Pytml CPython runtime

This directory is the source/build boundary for Pytml's independent Python runtime.
It is **not Pyodide**. Pytml uses the CPython Emscripten build flow directly.

The current recipe pins CPython 3.14.2. Update `CPYTHON_VERSION` deliberately and test the
runtime before publishing a new Pytml release.

The build uses CPython's `Platforms/emscripten` tooling, which performs the required host
build, dependency build, and WebAssembly build. See the official CPython Emscripten instructions
for platform-specific prerequisites.
