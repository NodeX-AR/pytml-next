# Pytml 3 — Python + HTML, made for beginners

Pytml lets beginners build browser applications with **normal Python and normal HTML**.
It adds a small amount of beginner-friendly markup for controls while keeping Python's
syntax intact.

> **Important:** Pytml 3 no longer uses Pyodide or PyScript as its runtime. The browser
> runtime is designed around CPython compiled to WebAssembly with Emscripten. The package
> and browser bridges are owned by Pytml.

## Quick example

```html
<!doctype html>
<html>
<body>
  <input id="name" placeholder="Your name">
  <button id="hello">Say hello</button>
  <p id="result"></p>

  <py1>
  def greet():
      result.text = "Hello " + name.value

  hello.on("click", greet)
  </py1>

  <script src="pytml.js"></script>
</body>
</html>
```

The HTML stays HTML. The Python stays Python.

## Multiple programs

`py1`, `py2`, `py3`, etc. are **program identifiers**, not filenames.
All blocks using the same identifier share that program's state:

```html
<py1>
x = 10
</py1>

<py2>
y = 20
</py2>

<py1>
print(x)
</py1>
```

A block can also load source from a file:

```html
<py2 src="app.py"></py2>
```

## Beginner controls

Pytml recognizes controls such as:

- `<btn1>Save</btn1>` — button
- `<input1>` / `<text1>` — text input
- `<textarea1>` — multiline text
- `<number1>` — number input
- `<password1>` — password input
- `<search1>` — search input
- `<range1>` / `<slider1>` — range controls
- `<checkbox1>` / `<switch1>` — toggles
- `<radio1>` — radio controls
- `<select1>` — selection control
- `<file1>` — file picker
- `<date1>` / `<time1>` — date/time controls
- `<color1>` — color picker
- `<scroll1>` — scrollable area
- `<joystick1>` — touch/pointer joystick
- `<canvas1>` — canvas
- `<video1>` / `<audio1>` — media

These are conveniences, not replacements for HTML. Standard HTML elements and CSS continue to work.

## Browser events

Controls support click, pointer, mouse, touch, keyboard, input, change, focus, blur,
scroll, wheel, drag/drop, media and form events.

```python

def moved(event):
    print(event["x"], event["y"])

joystick1.on("pointermove", moved)
```

## Packages

Pytml keeps a `micropip`-compatible package workflow:

```python
import micropip
await micropip.install("numpy")
```

Pure-Python wheels can be installed directly when compatible. Native packages need
Pytml WebAssembly wheels built for the exact Pytml CPython/Emscripten ABI. The repository
includes the package-build layout for this rather than pretending desktop wheels work in WASM.

## Runtime build

The source tree contains the Pytml browser/compiler layer and the build scripts for the
CPython WebAssembly runtime. A production distribution must contain the generated runtime:

```text
runtime/dist/
  pytml-runtime.js
  pytml-runtime.wasm
  python_stdlib.zip
```

Build prerequisites:

- Node.js 20+
- Python 3.13/3.14 matching the pinned runtime recipe
- Emscripten SDK
- a native compiler/build toolchain
- a CPython source checkout matching `runtime/CPYTHON_VERSION`

Run:

```bash
npm install
npm test
npm run build:runtime
npm run build
```

The build intentionally fails clearly when Emscripten or the CPython source checkout is missing.
It never falls back to Pyodide.

## Project layout

```text
src/              Pytml compiler + browser bridge
runtime/          CPython/Emscripten runtime build configuration
examples/         beginner and advanced examples
docs/             language and runtime documentation
tests/             compiler/runtime bridge tests
website/          Pytml documentation/demo site
tools/             build scripts
```

## Design principles

1. Python syntax remains Python.
2. HTML remains HTML.
3. `<pyN>` identifies programs; it is not a filename.
4. Beginner controls should be discoverable and easy to use.
5. No hidden Pyodide dependency.
6. Package support is a first-class feature.
7. Errors should point to the original Pytml source.
