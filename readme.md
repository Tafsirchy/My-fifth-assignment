### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

===>
# getElementById(id):

Returns one element with the given id.
Fastest and most commonly used.
Returns null if not found.

# getElementsByClassName(className):

Returns a live HTMLCollection of all elements with that class.
updates automatically if DOM changes.
Not a real array (no map, forEach without converting).

# querySelector(selector):

Returns the first element matching any CSS selector
Returns null if not found.
Not a live collection (no automatic updates).

# querySelectorAll(selector)

Returns a static NodeList of all matching elements.
Supports any CSS selector.
Static = does not update when DOM changes.



### 2. How do you create and insert a new element into the DOM?

===>
# Create element: 
const div = document.createElement("div");
# Add content to the element:
div.textContent = "Hello, World!";
# Add element to the DOM:
document.body.appendChild(div);
parent.append(div);



### 3. What is Event Bubbling and how does it work?

===>
When an event starts at the innermost element and travels upward through its ancestors.

Clicking inside a <button> triggers:

button click
div click
body click
html click
document click

Unless stopped, the event keeps “bubbling up” to parent elements.


### 4. What is Event Delegation in JavaScript? Why is it useful?

===>
Event Delegation is attaching one event listener to a parent instead of many listeners to every child.

It works on use event bubbling to catch events from child elements.Check which child triggered the event using e.target.

Why Useful?
Better performance (one listener instead of hundreds)
Works for dynamically added elements
Cleaner, scalable code

### 5. What is the difference between preventDefault() and stopPropagation() methods?

===>
# preventDefault():

Stops the default browser action.

Examples:

Prevent link navigation
Prevent form submission
Prevent right-click menu

# stopPropagation():

===>
Stops the event from bubbling up to parent elements.