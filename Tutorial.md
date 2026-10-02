# Pytml beginner tutorial

## 1. Your first program

```html
<script src="pytml.js"></script>
<py1>
print("Hello from Pytml!")
</py1>
```

## 2. Use HTML

```html
<input id="name" placeholder="Your name">
<button id="go">Go</button>
<p id="result"></p>

<py1>
def greet():
    result.text = "Hello " + name.value

go.on("click", greet)
</py1>
```

## 3. Use a beginner button

```html
<py1>
score = 0

<btn1>+1</btn1>


def add():
    global score
    score += 1
    print(score)

btn1.on("click", add)
</py1>
```

## 4. Touch joystick

```html
<joystick1></joystick1>
<pre id="debug"></pre>

<py1>
def move(e):
    debug.text = f"x={e['x']:.2f} y={e['y']:.2f}"

joystick1.on("pointermove", move)
</py1>
```

## 5. Multiple programs

Use `<py1>`, `<py2>`, etc. to organize a page. Reusing an identifier shares state.
