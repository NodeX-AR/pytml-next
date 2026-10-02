# Pytml package repository

This directory documents the package format used by Pytml. It is intentionally empty of large
binary wheels in the source repository.

A Pytml wheel must declare a compatible CPython/Emscripten ABI. Pure-Python wheels can use the
standard `py3-none-any` tag when their dependencies are browser-compatible.

Scientific packages with native extensions must be built specifically for Pytml's pinned runtime.
See `docs/PACKAGES.md`.
