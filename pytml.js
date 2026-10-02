/* Pytml 3 browser loader. Classic <script src="pytml.js"></script> is supported. */
(function () {
  const current = document.currentScript;
  const base = current ? new URL('.', current.src).href : new URL('.', location.href).href;
  import(new URL('src/pytml.js', base).href)
    .then(({start}) => start())
    .catch((error) => {
      console.error('[Pytml] Failed to start:', error);
      document.dispatchEvent(new CustomEvent('pytml:error', {detail:error}));
    });
})();
