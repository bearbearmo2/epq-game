# What the game has to include
a series of basic puzzles

have an introduction / tutorial course first that teaches mechanics and rules

be able to look back at previous puzzles and try again

be playable on an ipad

new rules are introduced using set steps:

```
1. have a simple puzzle consisting nothing but the introduced mechanic

3. the puzzle can only be completed by using the mechanic in the most basic way, using it in more complex ways does not help

4. the next puzzle uses the mechanic in a different way (if possible) to complete the puzzle

5. the next puzzle uses the mechanic in the same way as the last, but is more hidden

6. repeat 4 and 5 until all the quirks of the mechanic have been taught

7. start introducing the mechanic to be used in multiple ways in one puzzle, do many puzzles using the mechanic fully so it is taught well
```
A small test at the start which tests the same things the puzzles teach

a small test at the end which is very similar to the first (same difficulty same puzzle types)

record the completion time of puzzles and store them in a database under anonymous aliases (hashed usernames?)

potentially create an extention that allows a teacher to see the data for each child and what they might need help with 

---

# rough plan one

puzzle mechanics like the whitness, a rectangle with lines crossing it that can be drawn over

introduce different mechanics through shapes (teach shapes)

each shape has different requirements e.g, a traingle can only be touched once

introduce colours (teach colours)

each colour has different requirements e.g, white has to be seperated from black

introduce combining colours, e.g, if red and blue are in the same space, there has to be a purple too

introduce colours inside of shapes, combined rules etc;

Test on colour combinations and shapes

---

# rough plan two
something like the machinarium minigame puzzles

youre a small red square, you have to get inside 2 bigger squares which then open the door and you leave

introduce other shapes - triangles go into everything, squares go into hexagons but not triangles, hexagons only go into hexagons;

introduce other colours - have to push all blue colours into the right places as well as red for door to open

introduce colour combinations - red and blue can go into purple, but green can't

Test on colour combinations and shapes

---

# rough plan three

---

# detailed plan

continued from plan two

centered level

no background only border or edges

one square of border is the door

player is a dot

player can move horizontally and vertically not diagonal

player moves one square at a time

containers are shapes with one edge missing

2 container sizes, small and large

player can fit in any container

3 container shapes, triangle, square, hexagon

containers have different rules:

	triangle can fit in anything (including self);

	square can fit in square and hexagon;

	hexagon only fits in hexagon;

have to get small shape into its bigger shape to open door

(relevent to later levels, shape does not matter only colour)

squares blue

triangles red

hexagons yellow

unrequired shapes coloured grey

eventually add in different colours, e.g purple, orange, green

only small shapes have secondary colours

small shapes have to go into a container that is one of its basic colours

e.g, purple can go into a red or blue container

leave level through door starts next level

at least 10 levels