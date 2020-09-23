# Planning

### 🛑 STOP

### 🧠 UNDERSTAND

### 🧩 PLAN

### 💫 EXECUTE

### 🤯 REFLECT


-----

## 🛑 STOP

Take a deep breath. This project is big, but it is awesome! It is mighty, but you are a kick-ass web developer, and can ABSOLUTELY conquer it!  

-----

## 🧠 UNDERSTAND

There are **2 RULES** in Conway's Game of Life. (And an assumation.)

1. If the cell is *alive* **and** has 2 or 3 neighbors, then it remains alive. Else, it dies.
2. If the cell is *dead* **and** has exactly 3 neighbors, then it comes to life. Else it remains dead.

3. *Cells that are off the edge of the grid are typically assumed to be dead. If you code it to wrap around the far side though, the ones in view can be alive!*

### How do I build this thing?!?

JavaScript | React | Python

- Javascript entry page that displays a grid with buttons for start, pause, stop, clear, (other things for options)
    - Grid holds cells that have properties suck as current state (alive/dead), clickable for initial configuration, but not when running, state will toggle on click and during simulation according to rules of live.

- Appropriate data structure to hold the grid

- Timeout function for building the next generation and update the display

- 3 custom features

- Text area for describing the game rules

- text area for describing the game algorithm, founder, turing, etc,

### Algorithm

- Every cell:
    - examine all eight neighbors
    - apply rules to determine if this cell's state changes
    - when main loop completes
        - swap current and next grid
        - repeat until simulation is stopped

- Break down steps into appropriate sub-tasks with helper functions to assist in readability

- use **double-buffering** to update the grid with the next generation

- choose whether to make the edge cells all dead, or wrap around to the far side.

### Custom Features

- **Create a few sample cell configurations that users can load and run**

- **Add an option that creates a random cell configuration that users can run**

- **Add additional cell properties, like color or size, and incorporate them into your visualization**

- **Allow users to specify the speed of the simulation**

- Provide functionality to manually step through the simulation one generation at a time, as opposed to animating automatically

- **Allow users to change the dimension of the grid being displayed**

- ~~Given a specific generation, calculate the configuration of cells at that point in time, and jump to that state, bypassing animation (i.e. skip ahead n generations)~~

- If you have an idea for a custom feature not on this list, run it by your TL or instructor

### Stretch

- Implement 2+ additional custom features above
    - already highlighted above

- Deploy your app to a hosting service
    - Planning on Heroku or Vercel(netlify)

### Wireframe

Consider creating one when you figure out what in the world you are doing, Brit!

-----

## 🧩 PLAN

Will be using NPM as package manager

- Create React App

- game-of-life

- components folder
    - Game.js

- styles folder
    - Game.css
    - Styles.js ????

- Use a dark rusty red with charcoal lines for the grid

- Use a cream color for live cells

- Page background will be black with the cream color words 

- Headings in a version of the red

- Buttons in red with cream words, Cream with red words when active

- Border around grid changes when game is running

-----

## 💫 EXECUTE

-----

## 🤯 REFLECT

After all is said and done: Consider *Conway's "Game of Life":

- How does this even work???

- Why is it useful?

- How is the notion of Turing Completeness related to it?

-----