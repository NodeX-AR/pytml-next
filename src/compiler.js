const CONTROL_MAP = {
  btn: ['button', 'button'], input: ['input','text'], text: ['input','text'],
  textarea: ['textarea', null], number: ['input','number'], password: ['input','password'],
  search: ['input','search'], range: ['input','range'], slider: ['input','range'],
  checkbox: ['label','checkbox'], switch: ['label','checkbox'], radio: ['label','radio'],
  select: ['select', null], file: ['input','file'], color: ['input','color'],
  date: ['input','date'], time: ['input','time'], scroll: ['div', null],
  joystick: ['div', null], canvas: ['canvas', null], img: ['img', null],
  video: ['video', null], audio: ['audio', null], form: ['form', null]
};

export function discoverPrograms(root = document) {
  const programs = new Map();
  for (const el of root.querySelectorAll('*')) {
    const tag = el.tagName.toLowerCase();
    if (!/^py\d+$/.test(tag)) continue;
    if (!programs.has(tag)) programs.set(tag, []);
    programs.get(tag).push({element: el, src: el.getAttribute('src'), code: el.textContent});
  }
  root.querySelectorAll('py[data-id], script[type="text/pytml"]').forEach((el) => {
    const id = (el.getAttribute('data-id') || el.getAttribute('id') || 'py1').toLowerCase();
    if (!programs.has(id)) programs.set(id, []);
    programs.get(id).push({element: el, src: el.getAttribute('src'), code: el.textContent});
  });
  return programs;
}

export function expandControls(root = document) {
  const candidates = [...root.querySelectorAll('*')].filter(el => /^([a-z]+)(\d+)$/.test(el.tagName.toLowerCase()));
  for (const el of candidates) {
    const [, kind, number] = el.tagName.toLowerCase().match(/^([a-z]+)(\d+)$/) || [];
    if (!CONTROL_MAP[kind] || el.__pytmlExpanded) continue;
    const [tag, inputType] = CONTROL_MAP[kind];
    const node = document.createElement(tag);
    for (const attr of [...el.attributes]) node.setAttribute(attr.name, attr.value);
    node.dataset.pytmlId = `${kind}${number}`;
    node.id = node.id || `${kind}${number}`;
    if (inputType) node.type = inputType;
    if (kind === 'btn') node.textContent = el.textContent.trim();
    else if (kind === 'checkbox' || kind === 'switch' || kind === 'radio') {
      const label = document.createElement('span'); label.textContent = el.textContent.trim();
      node.replaceWith(document.createElement('span'));
      const wrapper = node.previousSibling || document.createElement('span');
      wrapper.append(node, label);
      el.replaceWith(wrapper);
      continue;
    } else if (tag === 'div' && el.textContent.trim()) node.textContent = el.textContent;
    if (kind === 'scroll') node.style.overflow = 'auto';
    if (kind === 'joystick') node.classList.add('pytml-joystick');
    if (kind === 'canvas') node.width = node.width || 320, node.height = node.height || 180;
    el.replaceWith(node);
  }
  root.querySelectorAll('.pytml-joystick').forEach(installJoystick);
}

function installJoystick(el) {
  if (el.__pytmlJoystick) return;
  el.__pytmlJoystick = true;
  el.style.touchAction = 'none';
  el.style.position ||= 'relative';
  const knob = document.createElement('div');
  knob.className = 'pytml-joystick-knob';
  Object.assign(knob.style,{position:'absolute',left:'50%',top:'50%',width:'32%',aspectRatio:'1',transform:'translate(-50%,-50%)',borderRadius:'50%',background:'currentColor',pointerEvents:'none'});
  el.append(knob);
  const update = (ev, active=true) => {
    const r=el.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
    const max=Math.min(r.width,r.height)/2, dx=ev.clientX-cx, dy=ev.clientY-cy;
    const mag=Math.min(1,Math.hypot(dx,dy)/max), angle=Math.atan2(dy,dx);
    const x=Math.cos(angle)*mag, y=Math.sin(angle)*mag;
    knob.style.left=`${50+x*35}%`; knob.style.top=`${50+y*35}%`;
    el.dispatchEvent(new CustomEvent('pytmljoystick',{detail:{x,y,magnitude:mag,angle,active}}));
  };
  el.addEventListener('pointerdown',e=>{el.setPointerCapture?.(e.pointerId);update(e,true);});
  el.addEventListener('pointermove',e=>{if(el.hasPointerCapture?.(e.pointerId)) update(e,true);});
  const reset=e=>{try{el.releasePointerCapture?.(e.pointerId)}catch{} knob.style.left='50%';knob.style.top='50%';el.dispatchEvent(new CustomEvent('pytmljoystick',{detail:{x:0,y:0,magnitude:0,angle:0,active:false}}));};
  el.addEventListener('pointerup',reset); el.addEventListener('pointercancel',reset);
}

export function compileDocument(root = document) {
  expandControls(root);
  return { programs: discoverPrograms(root), root };
}
