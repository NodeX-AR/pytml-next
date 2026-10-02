export function createElementProxy(el, runtime) {
  return {
    get value(){ return el.value; }, set value(v){ el.value = v == null ? '' : String(v); },
    get text(){ return el.textContent; }, set text(v){ el.textContent = v == null ? '' : String(v); },
    get html(){ return el.innerHTML; }, set html(v){ el.innerHTML = String(v ?? ''); },
    get checked(){ return !!el.checked; }, set checked(v){ el.checked = !!v; },
    get disabled(){ return !!el.disabled; }, set disabled(v){ el.disabled = !!v; },
    get visible(){ return getComputedStyle(el).display !== 'none'; }, set visible(v){ el.style.display = v ? '' : 'none'; },
    get x(){ return el.getBoundingClientRect().x; }, get y(){ return el.getBoundingClientRect().y; },
    get width(){ return el.getBoundingClientRect().width; }, get height(){ return el.getBoundingClientRect().height; },
    get scrollTop(){ return el.scrollTop ?? 0; }, set scrollTop(v){ el.scrollTop = Number(v); },
    get scrollLeft(){ return el.scrollLeft ?? 0; }, set scrollLeft(v){ el.scrollLeft = Number(v); },
    get class_name(){ return el.className; }, set class_name(v){ el.className = String(v); },
    get element(){ return el; },
    attr(name){ return el.getAttribute(name); },
    set_attr(name,value){ el.setAttribute(name,String(value)); },
    remove_attr(name){ el.removeAttribute(name); },
    add_class(name){ el.classList.add(name); },
    remove_class(name){ el.classList.remove(name); },
    toggle_class(name){ return el.classList.toggle(name); },
    focus(){ el.focus(); }, blur(){ el.blur(); }, click(){ el.click(); },
    on(event, callback){
      const handler = (e) => runtime.callPython(callback, normalizeEvent(e));
      el.addEventListener(event, handler);
      return () => el.removeEventListener(event, handler);
    },
    off(event, callback){ el.removeEventListener(event, callback); },
  };
}

export function normalizeEvent(e){
  const r=e.currentTarget?.getBoundingClientRect?.();
  const d=e.detail || {};
  return {
    type:e.type, x:e.clientX ?? d.x ?? 0, y:e.clientY ?? d.y ?? 0,
    dx:e.movementX ?? d.dx ?? 0, dy:e.movementY ?? d.dy ?? 0,
    key:e.key ?? '', code:e.code ?? '', button:e.button ?? 0,
    deltaX:e.deltaX ?? 0, deltaY:e.deltaY ?? 0,
    ctrlKey:!!e.ctrlKey, shiftKey:!!e.shiftKey, altKey:!!e.altKey, metaKey:!!e.metaKey,
    value:e.target?.value ?? '', checked:!!e.target?.checked,
    scrollTop:e.target?.scrollTop ?? 0, scrollLeft:e.target?.scrollLeft ?? 0,
    width:r?.width ?? 0, height:r?.height ?? 0,
    joystick_x:d.x ?? undefined, joystick_y:d.y ?? undefined,
    magnitude:d.magnitude ?? undefined, angle:d.angle ?? undefined,
  };
}

export function collectBindings(root, runtime){
  const bindings={};
  root.querySelectorAll('[id], [data-pytml-id]').forEach(el=>{
    const name=el.id || el.dataset.pytmlId;
    if(name && /^[A-Za-z_]\w*$/.test(name)) bindings[name]=createElementProxy(el,runtime);
  });
  return bindings;
}
