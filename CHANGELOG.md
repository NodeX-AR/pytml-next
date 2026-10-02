# Changelog

## 3.0.0-alpha.1 — Pytml Next engine

- Replaced the old Pyodide-dependent architecture with a Pytml-owned runtime boundary.
- Added `<py1>`, `<py2>`, … program identifiers with shared state per identifier.
- Preserved normal Python syntax and normal HTML.
- Added beginner control tags for buttons, text/number/password/search inputs, textareas,
  ranges/sliders, checkboxes/switches, radios, selects, files, dates, times, colors, scrolling,
  joysticks, canvas and media.
- Added pointer, mouse, touch, keyboard, input/change, scroll/wheel, drag/drop and media events.
- Added a Python-side `pytml` DOM bridge.
- Added the CPython/Emscripten runtime build pipeline.
- Reworked the documentation, examples, website and project metadata around Pytml 3.
- Preserved the `micropip` package workflow and documented the need for Pytml-compatible native wheels.
