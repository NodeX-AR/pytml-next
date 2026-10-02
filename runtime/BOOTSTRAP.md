# Runtime bootstrap contract

The generated CPython Emscripten module must expose two browser globals before executing Pytml code:

- `pytml_host.input(prompt)` — returns the next input value through Pytml's asynchronous input UI.
- `pytml_dom.call(operation, element_id, ...)` — DOM property/event bridge.

The Python `pytml` package in this directory is installed into the generated runtime's standard
library/site-packages area by the runtime build step.
