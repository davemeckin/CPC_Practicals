(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{QYuT:function(e,t,n){},dkd4:function(e,t,n){"use strict";n.r(t),n.d(t,"query",(function(){return h}));var a=n("q1tI"),o=n.n(a),r=n("Wbzz"),i=(n("9eSz"),n("Bl7J")),l=n("vrFN"),s=n("RMg3"),c=n("bj0T"),u=n("jPax"),h=(n("QYuT"),n("8ypT"),"3105699768");t.default=function(e){e.data;return o.a.createElement(i.a,null,o.a.createElement(s.a,null),o.a.createElement(l.a,{title:"Workshop 07"}),o.a.createElement("p",null),o.a.createElement("h1",null,"Hello and welcome back!"),o.a.createElement("p",null,"We looked at some examples and the coursework in the sixth workshop.The fourth workshop is aimed at helping you understand how we can design some simple interactions with 3D objects to produce a little DJ web toy. So, we will:"),o.a.createElement("p",null,o.a.createElement("ul",null,o.a.createElement("li",null,"Work from starter code provided that you will fork a new codesandbox from. This is because, to demonstrate the concepts, we've scaffolding your learning a bit for this week's challenge. "),o.a.createElement("li",null,"Take a little look at Quaternions as a method for rotating objects in space."),o.a.createElement("li",null,"Have a quick raycasting demonstration"),o.a.createElement("li",null,"Challenge you a bit more to think about what's going on in the code by describing to what ",o.a.createElement("strong",null,"should")," happen; getting you to have a go at programming it yourself; then allowing you to see our solutions."),o.a.createElement("li",null,"Use raycasting, event listeners and some fun Tone js features to create our dj turntable and mixer interface"))),o.a.createElement("p",null,"Here's what we're going to be building (mouse over; click and drag on the deck to see what happens. Also mouse over; click and drag on the cross fader of the mixer):"),o.a.createElement("iframe",{src:"https://codesandbox.io/embed/recursing-dust-xtr7i?fontsize=14&hidenavigation=1&theme=dark&view=preview",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W04_END_v02",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),o.a.createElement("p",null,"We've purposefully left the visual design as grey here as this is something that you can customise as you go. You'll notice that we also only have one deck in this version, as this is something that you will add as stretch goal later..."),o.a.createElement("p",null,o.a.createElement("strong",null,"Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.")),o.a.createElement("h2",null,"Task 1 - Rotating Using Quaternions: A Quick Example"),o.a.createElement("p",null,o.a.createElement("p",null,"Before we go on to making the actual thing though, let's just take a quick look at a couple of concepts that we talked about in the lecture. First of all, rotation using Quaternions. Now, as we said, you don't need to understand the complex maths involved to use quaternions as Mr Doob (Three js author) has kindly wrapped up that functionality for us."),o.a.createElement("p",null,"Take a look at the example below and use the arrow keys to rotate the cube:"),o.a.createElement("iframe",{src:"https://codesandbox.io/embed/w04t01-5em5e?fontsize=14&hidenavigation=1&theme=dark",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W04_T01",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),o.a.createElement("p",null)),o.a.createElement("p",null,"Now, this may not seem all that exciting right now, but think of the possibilities you have of rotating all kinds of objects, or arrays of objects, or arrays of arrays of objects like last workshop! To achieve this functionality we've done a couple of things"),o.a.createElement(u.a,{allowZeroExpanded:"true"},o.a.createElement(u.b,null,o.a.createElement(u.d,null,o.a.createElement(u.c,null,"First, at the top of our index.js before the init() function, we define a JS object that links quaternion rotations to arrow keys")),o.a.createElement(u.e,null,o.a.createElement("p",null,o.a.createElement("code",null,o.a.createElement(c.a,{text:"const ANGULAR_SPEED = 0.5;\nconst MOVEMENTS = {\n  ArrowUp: new THREE.Quaternion().setFromAxisAngle( //create a new quaternion and call the set from axis angle method\n    new THREE.Vector3(1, 0, 0), //create a new vector which will rotate around the X axis\n    THREE.MathUtils.degToRad(ANGULAR_SPEED * 6) //convert degrees to radians for our rotation amount in the positive direction\n  ),\n  ArrowDown: new THREE.Quaternion().setFromAxisAngle(\n    new THREE.Vector3(1, 0, 0), //create a new vector which will rotate around the X axis\n    THREE.MathUtils.degToRad(-ANGULAR_SPEED * 6) //convert degrees to radians for our rotation amount in the negative direction\n  ),\n  ArrowLeft: new THREE.Quaternion().setFromAxisAngle(\n    new THREE.Vector3(0, 1, 0), //create a new vector which will rotate around the Y axis\n    THREE.MathUtils.degToRad(-ANGULAR_SPEED * 6) //convert degrees to radians for our rotation amount in the negative direction\n  ),\n  ArrowRight: new THREE.Quaternion().setFromAxisAngle(\n    new THREE.Vector3(0, 1, 0), //create a new vector which will rotate around the Y axis\n    THREE.MathUtils.degToRad(ANGULAR_SPEED * 6) //convert degrees to radians for our rotation amount in the positive direction\n  )\n};",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"}))))),o.a.createElement(u.b,null,o.a.createElement(u.d,null,o.a.createElement(u.c,null,"Then, using the arrow keys object and Three js quaternions object, rotate our cube")),o.a.createElement(u.e,null,o.a.createElement("p",null,o.a.createElement("code",null,o.a.createElement(c.a,{text:'document.addEventListener("keydown", onDocumentKeyDown, false);\n\nfunction onDocumentKeyDown(event) {\n\tevent.preventDefault(); // stop scrolling the page using the arrow keys\n  if (MOVEMENTS[event.key]) {\n    const cur = cube.quaternion; // store our current quaternion in a variable\n    const rot = MOVEMENTS[event.key]; // get our next rotation value from the JS object corresponding to the key that was pressed\n    cur.multiplyQuaternions(rot, cur); // multiplyQuaternions with current and next to perform the rotation\n  }\n}',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})))))),o.a.createElement("p",null,"While we're not actually going to use quaternions in our DJ webtoy, we feel it is very important that you have this example to work from if you do end up wanting to rotate objects using this method in your own projects later!"),o.a.createElement("h2",null,"Task 2 - Raycasting: A Quick Example"),o.a.createElement("p",null,"Another key concept, along with rotation, is raycasting. As we discussed in the lecture, this is a common method used in 3D interaction to see whether our cursor is hovering over something that we might want to interact with. So, imagine a ray being cast from the camera to the mouse cursor and then through any other objects in the scene that follow after that."),o.a.createElement("p",null,"Take a look at the simple example below. You can see that when the mouse hovers over the cube, it turns red. Also take a look at the JS console in this example. We are printing an array that is being maintained by the raycaster object. Whent the mouse isn't over anything, the array is empty. But when the mouse casts a ray through the cube object, you can see the array is updated:"),o.a.createElement("iframe",{src:"https://codesandbox.io/embed/w04t02-yrqvg?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W04_T02",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),o.a.createElement("p",null),o.a.createElement("p",null,"Take a moment to look at the update function in index.js and understand what is going on here. It's important as we're going to use this quite a lot in our DJ example."),o.a.createElement("p",null),o.a.createElement("p",null),o.a.createElement("h2",null,"Task 3 - DJ Sprinkles Part 1"),o.a.createElement("h5",null,"Work from the starter project provided here and fork it to begin work in codesandbox:"),o.a.createElement("p",null),o.a.createElement("iframe",{src:"https://codesandbox.io/embed/w04t03starter-opv39?fontsize=14&hidenavigation=1&theme=dark",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W04_T03_STARTER",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),o.a.createElement("p",null),o.a.createElement("p",null),o.a.createElement("p",null,"As you can see, this is a considerably more complex project already, despite it looking so simple!"),o.a.createElement("p",null,"Take a look around - open the djObject.js file too and have a look in there. You can see that we've made a different javascript file and defined some classes in there that we are then exporting. We import them in index.js and that means we can use them just like we used the walker and mover classes in the previous weeks. This way of doing things just means we can break up our code into easier to read files that aren't millions of lines long. We're still just drawing some primative geometries but this time we're using the extrude functionality to make a cylinder that will represent our DJ turntable's platter."),o.a.createElement("p",null,"It's also very important to not that we have used some of the key principles of Object Oriented Programming (OOP) here. We've modelled our funtionality on real world objects by breaking our various graphical elements up in to their component parts. But perhaps more importantly, we're using the ",o.a.createElement("code",null," extends ")," keyword so that some of our objects actually inherit lots of functionlity from the THREE.Mesh object. This is useful as we can than customise our objects while maintaining all the great stuff meshes can do."),o.a.createElement("p",null,"We're using a different rotation method here too: the bounding box instead of quaternions as we're actually only rotating our turntable platter around on axis. "),o.a.createElement("p",null,"It's also worth noting that we have already added the event listeners needed as well as some slightly hack-y code for translating mouse movement into something useful for our purposes."),o.a.createElement("p",null,"Right, now we've covered what's there, we need to think about what it is we need to do in order to make our webtoy functional."),o.a.createElement("p",null,"Let's break down our desired functionality for this first bit, we need to:"),o.a.createElement("ul",null,o.a.createElement("li",null,"Play an audio file"),o.a.createElement("li",null,"Create and update our Turntable so that it keeps spinning to keep the party going..."),o.a.createElement("li",null,"Add a texture onto our turntable so that we can see it rotating (and make it look more like a record)")),o.a.createElement("p",null,"Right, let's start coding. We're going to start in our init() function, just beneath the line where we set the camera position."),o.a.createElement("p",null,"Let's add our Tone crossfader and audio file player. We've already added a silly tune for you to use but you're more than welcome to use your own. So, first we make the crossfader and connect that to our master output. Then we make our Tone player and specify that once it has loaded the file, loop it and automatically start playing it:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:'crossFade = new Tone.CrossFade().toDestination();\n  player1 = new Tone.Player("./sounds/Warrpy.mp3", () => {\n    player1.loop = true;\n    player1.autostart = true;\n  }).connect(crossFade.a);',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"Now we have sound, but we can't see anything. "),o.a.createElement("p",null,"Just below where we created our audio stuff in the init() function, let's make a new turntable object at a position that is left a bit on the x axis and add it to our scene:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:' turntable1 = new Turntable(new THREE.Vector3(-60, 0, 0), "platter1");\n  scene.add(turntable1);',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"Now we need update our turntable to keep it spinning, so let's go ahead and add the call to update in our time dependent section of our main update function (this is labelled in the comments of the code):"),o.a.createElement("p",null,"At the moment we're just going to pass an empty array as the third argument, but later on we will change this so that it will the array of objects in the line of sight of the raycaster..."),o.a.createElement("code",null,o.a.createElement(c.a,{text:" turntable1.update(clicked, mouse.y, [], player1);",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"Cool, we should now be able see our deck, but it's difficult to actually tell that the platter is spinning right? So let's go ahead and add a texture to our platter."),o.a.createElement("p",null,"We've taken the liberty of adding an image that we can use as a texture in the images folder. "),o.a.createElement("p",null,"Open the djObjects.js folder again and head to the constructor of the platter object. This should be line 8 or so..."),o.a.createElement("p",null,"So, to create the texture from the image we need to load it, then set some wrap settings so that it fits on our cylinder:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:'let texture = new THREE.TextureLoader().load("./images/6284.jpg");\n    texture.wrapT = THREE.RepeatWrapping;\n    texture.wrapS = THREE.RepeatWrapping;\n    texture.repeat.set(1 / 128, 1 / 128);\n    texture.offset.set(0.5, 0.5);',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"Then, just below that we add the texure to the by updating the map value to being our texture variable. You new updated material definition should look like this:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:"let material = new THREE.MeshStandardMaterial({\n      map: texture,\n      side: THREE.DoubleSide,\n      color: new THREE.Color(0xffffff)\n    });",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"Alright, you should now have a spinning deck with a record on it playing a silly tune...!"),o.a.createElement("p",null),o.a.createElement("h2",null,"Task 4 - DJ Sprinkles Part 2"),o.a.createElement("p",null,"Next up we want to add some interaction to our project..."),o.a.createElement("p",null,"Let's break down our desired functionality for this second bit, we need to:"),o.a.createElement("ul",null,o.a.createElement("li",null,"Use our raycaster in the update function to create an array of objects that the ray from the mouse is intersecting with"),o.a.createElement("li",null,"Send our array of intersected objects to our turntable"),o.a.createElement("li",null,"Get the turntable to check whether it is the object being interacted with"),o.a.createElement("li",null,"Change the audio file playback and turntable platter rotation accordingly")),o.a.createElement("p",null),o.a.createElement("p",null,"Okey dokey, so in our time dependent update function code in index.js, we're going to head to the line just above where we call ",o.a.createElement("code",null,"turntable1.update(clicked, mouse.y, [], player1)")," let's create a ray that goes from our camera through our mouse and through the scene. Then we'll create a new array called intersects that will contain our objects. We've set the \"recursive\" flag on the intersectObjects method to true here, because our platter is actually contained within the turntable object and that is really the thing we're interested in manipulating."),o.a.createElement("code",null,o.a.createElement(c.a,{text:"\nraycaster.setFromCamera(mouse, camera);\n// calculate objects intersecting the picking ray\nlet intersects = raycaster.intersectObjects(scene.children, true);",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"Just below that, let's change the call to turntable's update method so that we now pass in the intersects array:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:"turntable1.update(clicked, mouse.y, intersects, player1);",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"Right, now we move on to finding whether this object is picked or not..."),o.a.createElement("p",null,"Not going to lie, this starts to get into some relatively tricksy logic. So let's talk through what we need to do in the update function of our turntable:"),o.a.createElement("ul",null,o.a.createElement("li",null,"We're going to check whether the intersects array is greater than 0 i.e is our mouse casting a ray over any object in our scene"),o.a.createElement("li",null,"Then, in a nested if statement, we're going to check whether the first object in the array (the closest object) matches the name of our object"),o.a.createElement("li",null,"We want to change colour of our object if it the name does match, so we'll add a bit of logic in there for that")),o.a.createElement("p",null,"Have a go at trying to code this yourself. Don't worry we have provided the solution below, but you should be trying to think through these interaction design problems yourself too so spend 10-15 minutes trying it out. Here is some pseudo code:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:"\nif intersects array has something in it:\n\tif the first thing in intersects array does NOT match the name of the object we're concerned with:\n\t\tchange the colour of our object to its normal colour\n\t\tensure our mouseOverThis flag is false\n\tif the first object in intersects does match the name of our object\n\t\tensure our mouseOverThis flag is true\n\t\tchange the colour of our object to something visible like purple\n\nelse: reset everything to its normal colour and ensure our mouseOverThis flag is false",language:"python",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"Then we want to ensure the rotation of the platter and the Tone player react accordingly when our mouse is down and we are dragging up and down to scratch the record. Again, our solution requires a bit of chained logic to ensure our click and drag interactions work ok. Here is some pseudo code to get you to think about it. Have a go at trying to code this yourself"),o.a.createElement("code",null,o.a.createElement(c.a,{text:"\nif the mouse is clicked AND the mouseOverThis flag is true AND our direction of rotation in relation to mouse movement is positive:\n\tplay the audio file forwards \n\tset the direction of rotation to positive 1\n\tmap the mouse movement up and down to the playbackRate \nelse if the mouse if NOT clicked AND mouseOverThis is false AND our direction of rotation in relation to mouse movement is positive:\n\tplay the audio file forwards at normal speed\nelse if the mouse is clicked AND the mouseOverThis flag is true AND our direction of rotation in relation to mouse movement is negative:\n\tplay the audio file backwards \n\tset the direction of rotation to negative 1\n\tmap the mouse movement up and down to the playbackRate \nelse if the mouse if NOT clicked AND mouseOverThis is false AND our direction of rotation in relation to mouse movement is negative:\n\tplay the audio file backwards at normal speed",language:"python",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"So, there is a lot going on here obviously so don't worry if you struggled with getting this right. There are also multiple ways of doing this but we came up with the solution hidden in this drop down"),o.a.createElement(u.a,{allowZeroExpanded:"true"},o.a.createElement(u.b,null,o.a.createElement(u.d,null,o.a.createElement(u.c,null,"This is what our turntable's update method ends up looking like:")),o.a.createElement(u.e,null,o.a.createElement("p",null,o.a.createElement("code",null,o.a.createElement(c.a,{text:'update(clicked, targetRotation, intersects, player) {\n    let rotator = targetRotation - this.platter.rotation.z;\n\n    // if there is one (or more) intersections\n   \n    if (intersects.length > 0) {\n      // if the closest object intersected is not the currently stored intersection object\n      if (intersects[0].object !== this.intersected) {\n        // restore previous intersection object (if it exists) to its original color\n        if (this.intersected) {\n          if (this.intersected.name === this.platter.name) {\n            this.intersected.material.color.setHex(this.intersected.currentHex);\n          }\n        }\n        // store reference to closest object as current intersection object\n        this.intersected = intersects[0].object;\n\n        // store color of closest object (for later restoration)\n        if (this.intersected.name === this.platter.name) {\n          this.mouseOverThis = true;\n\n          this.intersected.currentHex = this.intersected.material.color.getHex();\n          // set a new color for closest object\n          this.intersected.material.color.setHex(0xff00ff);\n        } else {\n          this.mouseOverThis = false;\n        }\n      }\n    } // there are no intersections\n    else {\n      // restore previous intersection object (if it exists) to its original color\n      if (this.intersected) {\n        if (this.intersected.name === this.platter.name) {\n          this.intersected.material.color.setHex(this.intersected.currentHex);\n        }\n      }\n      // remove previous intersection object reference\n      // by setting current intersection object to "nothing"\n      this.intersected = null;\n      this.mouseOverThis = false;\n    }\n\n    if (clicked && this.mouseOverThis && rotator > 0) {\n      player.reverse = false;\n      this.direction = 1;\n      player.playbackRate = THREE.MathUtils.clamp(\n        THREE.MathUtils.mapLinear(rotator, -0.5, 0.5, -2.0, 2.0),\n        0.0,\n        1.0\n      );\n      this.platter.rotation.z += rotator;\n    } else if (!clicked && !this.mouseOverThis && rotator > 0) {\n      player.playbackRate = 1;\n    } else if (clicked && this.mouseOverThis && rotator < 0.0) {\n      player.reverse = true;\n      this.direction = -1;\n      player.playbackRate = THREE.MathUtils.clamp(\n        THREE.MathUtils.mapLinear(rotator, 1.5, -0.5, 2.0, 0.0),\n        0.0,\n        2.0\n      );\n      this.platter.rotation.z += rotator;\n    } else if (!clicked && !this.mouseOverThis && rotator < 0) {\n      player.playbackRate = 1;\n    } else {\n      player.playbackRate = 1;\n    }\n    if (clicked && this.mouseOverThis) {\n    }\n    this.platter.update(this.direction);\n  }\n ',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})))))),o.a.createElement("p",null),o.a.createElement("h2",null,"Task 5 - DJ Sprinkles Part 3"),o.a.createElement("p",null,"Phew, that was fairly hardcore, but actually it means we can reuse a fair bit of it for adding our mixer now. "),o.a.createElement("p",null,"Once again, let's break down our desired functionality for this third bit, we need to:"),o.a.createElement("ul",null,o.a.createElement("li",null,"Create and update our mixer object"),o.a.createElement("li",null,"Do some similar raycaster stuff on checking whether the mixer is the object that is being interacted with"),o.a.createElement("li",null,"Updating our crossfader wiper's position"),o.a.createElement("li",null,"Updating the Tone crossfader object to fade between two sources")),o.a.createElement("p",null),o.a.createElement("p",null,"So, let's add our Mixer in init() just below the bits where we added the turntable:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:"mixer = new Mixer(new THREE.Vector3(0, -10, 0));\n  scene.add(mixer);",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"We also want to update our mixer just like the turntable, so add this line in the time dependent update code just below where we update the turntable:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:"mixer.update(clicked, mouse.x * 2, intersects, crossFade);",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"Now we need to go through the same process of figuring our whether the mouse is over the mixer's crossfader wiper and do some stuff to the audio signal and the wiper's position. You try and have a go at this, safe in the knowledge that the solution is provided below. Here is some pseudo code:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:"\nif intersects array has something in it:\n\tif the first thing in intersects array does NOT match the name of the object we're concerned with:\n\t\tchange the colour of our object to its normal colour\n\t\tensure our mouseOverThis flag is false\n\tif the first object in intersects does match the name of our object\n\t\tensure our mouseOverThis flag is true\n\t\tchange the colour of our object to something visible like purple\n\nelse: reset everything to its normal colour and ensure our mouseOverThis flag is false\n\n\nthen: \nif the mouse is clicked AND the mouseOverThis flag is true:\n\tset our Tone crossfader value based on the x position of the mouse\n\tupdate the wiper's position based on the x position of the mouse",language:"python",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"OK we did our version, so check the drop down below for the full mixer update function."),o.a.createElement(u.a,{allowZeroExpanded:"true"},o.a.createElement(u.b,null,o.a.createElement(u.d,null,o.a.createElement(u.c,null,"This is what our mixer's update method ends up looking like:")),o.a.createElement(u.e,null,o.a.createElement("p",null,o.a.createElement("code",null,o.a.createElement(c.a,{text:'update(clicked, mouseX, intersects, crossFade) {\n    if (intersects.length > 0) {\n      // if the closest object intersected is not the currently stored intersection object\n      if (intersects[0].object != this.intersected) {\n        // restore previous intersection object (if it exists) to its original color\n        if (this.intersected) {\n          if (this.intersected.name === this.fader.name) {\n            this.intersected.material.color.setHex(this.intersected.currentHex);\n          }\n        }\n        // store reference to closest object as current intersection object\n        this.intersected = intersects[0].object;\n        // store color of closest object (for later restoration)\n        if (this.intersected.name === this.fader.name) {\n          this.mouseOverThis = true;\n\n          this.intersected.currentHex = this.intersected.material.color.getHex();\n          // set a new color for closest object\n          this.intersected.material.color.setHex(0xff0000);\n        } else {\n          //this.mouseOverThis = false;\n        }\n      }\n    } // there are no intersections\n    else {\n      // restore previous intersection object (if it exists) to its original color\n      if (this.intersected) {\n        if (this.intersected.name === this.fader.name) {\n          this.intersected.material.color.setHex(this.intersected.currentHex);\n        }\n      }\n      // remove previous intersection object reference\n      //     by setting current intersection object to "nothing"\n      this.intersected = null;\n      this.mouseOverThis = false;\n    }\n\n    if (clicked && this.mouseOverThis) {\n      this.xfade = THREE.MathUtils.clamp(\n        THREE.MathUtils.mapLinear(mouseX, -0.3, 0.3, 0.0, 1.0),\n        0.0,\n        1.0\n      );\n\n      crossFade.fade.value = this.xfade;\n\n      this.fader.update(mouseX);\n    } \n  }\n ',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})))))),o.a.createElement("p",null),o.a.createElement("p",null,"OK alright OK! Now we have a scratchable single deck and turntable woohoo!"),o.a.createElement("h2",null,"Task 6 - Stretch Task"),o.a.createElement("p",null),o.a.createElement("p",null),o.a.createElement("p",null,"OK so hopefully now you have made your fun and interactive dj web toy! Of course, it wouldn't be right if you only had one deck would it? So here are some stretch goals:",o.a.createElement("ul",null,o.a.createElement("li",null,"Attach another Tone audio player and connect it to channel b of the crossfader"),o.a.createElement("li",null,"Add another deck and link it with the second tone audio player"),o.a.createElement("li",null,"Try adding some disco lights, can you make them react to the music with the Tone.js ",o.a.createElement("a",{href:"https://tonejs.github.io/examples/analysis",target:"_blank"},"audio analyser")," "),o.a.createElement("li",null,"Try adding a VU meter to the mixer based on the amplitude of the audio signal"))),o.a.createElement("p",null,"Right we're at the final task for this workshop hooray! Nice one for making our dj mixer! "),o.a.createElement("p",null,"Super important final task: go to file->export to .zip in your codesandbox and download your project!"),o.a.createElement("p",null,'Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 4".'),o.a.createElement(r.Link,{to:"/"},"Go back to the homepage"))}}}]);
//# sourceMappingURL=component---src-pages-workshop-07-js-27f83bb761e1acfaef42.js.map