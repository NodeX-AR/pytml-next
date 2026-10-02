---
title: 'Pytml 3: Beginner-Friendly Python and HTML in the Browser'
author: 'Aswanth R (NodeX-AR)'
---

## Abstract

Pytml is a browser programming layer designed to let beginners combine Python and HTML without
introducing a second general-purpose language. Pytml 3 separates the document/compiler layer from
the Python runtime: HTML and Pytml UI controls are compiled into a browser execution plan while
Python is executed by CPython compiled for WebAssembly with Emscripten.

## Design

Pytml programs are identified by tags such as `<py1>` and `<py2>`. These identifiers are not
filenames. Multiple blocks with the same identifier share program state and execute in document order.
Normal Python syntax is preserved. Normal HTML and CSS are preserved. Pytml adds a small set of
beginner-oriented controls and a DOM/event bridge for buttons, inputs, scrolling, touch, pointer,
keyboard, joystick and media interactions.

## Runtime and packages

The runtime boundary is owned by Pytml. It does not load Pyodide or PyScript. CPython's official
Emscripten build support provides the Python implementation; Pytml supplies the browser adapter,
input/output integration and package layer. `micropip` remains part of the user-facing package API.
Pure-Python wheels can be installed when compatible, while native packages such as NumPy, pandas,
and Matplotlib require Pytml-compatible WebAssembly wheels built for the pinned CPython ABI.

## Limitations

WebAssembly browser execution has platform-specific limitations. Blocking I/O, unrestricted process
creation, and some operating-system facilities are not available in the same way as desktop Python.
The runtime and package ecosystem therefore document browser-specific behavior rather than claiming
full desktop equivalence.

## Project status

Pytml 3 is the independent-engine development line. The JavaScript/compiler layer is source-complete
for its documented UI model; the production CPython WebAssembly runtime is a generated native artifact
built by the included runtime script.
