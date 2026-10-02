#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CPYTHON_VERSION="${CPYTHON_VERSION:-3.14.2}"
CPYTHON_DIR="${CPYTHON_DIR:-$ROOT/runtime/cpython}"
OUT="$ROOT/runtime/dist"

command -v python3 >/dev/null || { echo 'python3 is required'; exit 1; }
command -v node >/dev/null || { echo 'node is required'; exit 1; }

if [ ! -d "$CPYTHON_DIR/.git" ]; then
  mkdir -p "$(dirname "$CPYTHON_DIR")"
  git clone --depth 1 --branch "v$CPYTHON_VERSION" https://github.com/python/cpython.git "$CPYTHON_DIR"
fi

cd "$CPYTHON_DIR"
python3 Platforms/emscripten install-emscripten
python3 Platforms/emscripten build all --host-runner node

mkdir -p "$OUT"
BUILD_DIR="$CPYTHON_DIR/cross-build/wasm32-emscripten/build/python"
if [ -d "$BUILD_DIR" ]; then
  cp -f "$BUILD_DIR"/*.js "$OUT/" 2>/dev/null || true
  cp -f "$BUILD_DIR"/*.wasm "$OUT/" 2>/dev/null || true
  cp -f "$BUILD_DIR"/*.zip "$OUT/" 2>/dev/null || true
cp -R "$ROOT/runtime/pytml" "$OUT/pytml"
fi

cat > "$OUT/README.txt" <<TXT
Pytml CPython WebAssembly runtime
Built from CPython $CPYTHON_VERSION using the official Emscripten build flow.

See docs/ARCHITECTURE.md for the browser adapter contract.
TXT

echo "Runtime build finished. Generated assets are in $OUT"
