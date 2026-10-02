"""Small Python-side DOM API used by Pytml's generated CPython runtime."""
try:
    import js
except ImportError:  # Allows documentation/unit tooling outside the browser.
    js = None

class Element:
    def __init__(self, element_id): self.id = element_id
    def _call(self, name, *args):
        if js is None: raise RuntimeError("Pytml UI is only available in a browser runtime")
        fn = getattr(js, "pytml_dom", None)
        if fn is None: raise RuntimeError("Pytml DOM bridge is not initialized")
        return fn.call(name, self.id, *args)
    @property
    def value(self): return self._call("get", self.id, "value")
    @value.setter
    def value(self,v): self._call("set", self.id, "value", v)
    @property
    def text(self): return self._call("get", self.id, "text")
    @text.setter
    def text(self,v): self._call("set", self.id, "text", v)
    @property
    def html(self): return self._call("get", self.id, "html")
    @html.setter
    def html(self,v): self._call("set", self.id, "html", v)
    @property
    def checked(self): return bool(self._call("get", self.id, "checked"))
    @checked.setter
    def checked(self,v): self._call("set", self.id, "checked", bool(v))
    @property
    def scrollTop(self): return self._call("get", self.id, "scrollTop")
    @scrollTop.setter
    def scrollTop(self,v): self._call("set", self.id, "scrollTop", v)
    @property
    def scrollLeft(self): return self._call("get", self.id, "scrollLeft")
    @scrollLeft.setter
    def scrollLeft(self,v): self._call("set", self.id, "scrollLeft", v)
    def attr(self,name): return self._call("attr", self.id, name)
    def set_attr(self,name,value): return self._call("set_attr", self.id, name, value)
    def add_class(self,name): return self._call("add_class", self.id, name)
    def remove_class(self,name): return self._call("remove_class", self.id, name)
    def focus(self): return self._call("focus", self.id)
    def blur(self): return self._call("blur", self.id)
    def click(self): return self._call("click", self.id)
    def on(self,event,callback):
        return self._call("on", self.id, event, callback)

def element(element_id): return Element(str(element_id))

def bind(namespace):
    """Return an object whose attributes are DOM element IDs."""
    class Namespace:
        def __getattr__(self,name): return Element(name)
    return Namespace()

def input(prompt=""):
    """Pytml's browser-aware implementation of Python's familiar input() API."""
    if js is None: return __builtins__["input"](prompt)
    return js.pytml_host.input(str(prompt))
