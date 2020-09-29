# CPC_Practicals
 Creative_and_Physical_Computing

## Practical 01 - Getting Started

Welcome to your first taste of Creative and Physical Computing! Semester 1 will focus on intermediate level creative coding in the browser. This will help you develop your creativity and programming abilities through a series of fun little tasks. We will be focusing on using 3D images and creating simple generative sounds to create interactive audio-visual experiences on the web.

Semester 1 = Focus more on visuals with some audio accompaniment.
Semester 2 = Focus more on musical instruments and interaction with physical objects.

### Key Areas

 - Tools we will be using.
 - Web Structure - HTML/CSS/JS.
 - Three.js Introduction.

### Tools

#### Browser

We recommend using [Google Chrome](https://www.google.co.uk/chrome/), though most modern web browsers such as Firefox and Safari should also work.

Some information about how browsers work can be found [here](https://medium.com/@monica1109/how-does-web-browsers-work-c95ad628a509).

#### Text Editor

We will be writing and editing quite a bit of code, which will be interpreted by our browser. So we need a good text editor to ensure we can make our lives easy and our code legible. We recommend [Sublime Text](https://www.sublimetext.com/).


#### Github

Writing a lot of code and developing interactive experiences means we need to keep track of all the changes we make. We recommend using Github to help you save your work and ensure 

#### Local Server

When working on the web, we often need to work "locally" on our machines while we're developing our projects, so that we don't have half-working stuff strewn all over the web, and so we can test stuff in controlled environments. Additionally, browsers don't necessarily have all the functionality to load the files that we might need. So we will need to use a local server to ensure everything works properly.

The good people at p5 (the programming library we used in Level 1 Introduction to Creative Coding) compiled a few options for you here - [have a look](https://github.com/processing/p5.js/wiki/Local-server) and see which one works best for you. We would recommend using the Python Simple HTTP Server...


### Web Structure - HTML/CSS/JavaScript

#### Hypertext Markup Language

- Structuring documents etc
- Main structure
- Canvas

#### Cascading Style Sheets

- Presenting/formatting documents
- Classes and ids

#### JavaScript

- Programming interaction

#### Making a Basic Web Page


### Introduction to Three.js - Anatomy of a Scene

#### Download and Setup

As is always best, we're going to start by using the Three.js documentation to get us going. Head [here](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) and follow the first two paragraphs, once you get to the "Creating the scene" section, come back here and carry on, as we'll be customising our scene a little bit from theirs...

So, we're going to:

	- Download Three.js

	- add to folder js

	- Make a basic index.html

	- link to js file

#### Key First Concepts

- 2D -> 3D
- Coordinate systems
- Anatomy of the scene
- Render function loop

#### Our First Scene

Just as how digital audio bases its structural functionality on real-world studio objects (signal flow/routing/patching etc), the digital 3D world of Three js bases its structural functionality on movies. We have a scene, objects in that scene, then a camera to view stuff in the scene and finally lights to light up the objects so that the camera can see the objects. 

OK let's use the super basic HTML webpage and accompanying "JS" folder that we made earlier - best to duplicate it (cmd+d on a mac) and put it in a new folder called FirstScene. We're put all of our code in here for today, though in future we will separate out our HTML, CSS and JS files...



```HTML
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Intro to Three - Workshop 1</title>
		</head>
	<body>
		<script src="js/three.js"></script>
		<script>
			// Cool stuff shall go in here
		</script>
	</body>
</html>
```



- Lights/camera/action

- Camera field of view (https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html)
- Animation!