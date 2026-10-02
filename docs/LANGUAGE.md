# Pytml language

## `<pyN>` blocks

A Pytml program is identified by a tag such as `<py1>`, `<py2>`, or `<py42>`.
The number is an identifier only.

Multiple blocks with the same identifier execute in document order in one shared namespace.

```html
<py1>
name = "Ada"
</py1>

<py1>
print(name)
</py1>
```

## External source

```html
<py1 src="main.py"></py1>
```

Inline and external blocks can be mixed.

## UI references

Pytml exposes DOM elements by their HTML `id` to the corresponding Python program.
For example:

```html
<input id="name">
<button id="send">Send</button>

<py1>

def send():
    print(name.value)

send.on("click", send)
</py1>
```

The same bridge works with standard HTML and Pytml convenience controls.

## Convenience controls

Pytml control tags use a prefix plus an identifier number. The identifier is local to
the page and becomes the Python reference.

Examples:

```html
<btn1>One</btn1>
<input1 placeholder="Type here">
<textarea1></textarea1>
<checkbox1>Remember</checkbox1>
<joystick1></joystick1>
```

## Event object

Callbacks receive a normal Python dictionary containing useful browser event fields.
The exact fields depend on the event. Common fields include `type`, `x`, `y`, `dx`, `dy`,
`key`, `code`, `button`, `deltaX`, `deltaY`, modifier keys, `value`, and scroll offsets.

## Input

Pytml preserves Python's familiar API:

```python
name = input("Name: ")
```

The runtime implements this using a browser prompt/input surface without requiring the
programmer to rewrite the statement as `await input(...)`.
