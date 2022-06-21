import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Navbar from "../components/navbar"
//import CodeBlock from "../components/codeblock"
import { CopyBlock } from "react-code-blocks";
import { CodeBlock, dracula, github } from "react-code-blocks";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
 
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import "../components/layout.css"

//var thisIsMyCopy = "function myTimer() \n { \n let d = new Date();document.getElementById(\"demo\").innerHTML = d.toLocaleTimeString();}";

const Workshop07 = ({data}) => (
  <Layout>
  <Navbar/>
    <SEO title="Workshop 07" />
    <p></p>
    <h1>Hello and welcome back!</h1>
    <p>We looked at some inspirational examples and the coursework in Week 6.The Week 7 workshop is aimed at helping you understand how we can design some simple interactions with 3D objects to produce a little DJ web toy. So, we will:</p>
	<p>
     <ul>
		  <li>Work from starter code provided that you will fork a new codesandbox from. This is because, to demonstrate the concepts, we've scaffolding your learning a bit for this week's challenge. </li>
		  <li>Take a little look at Quaternions as a method for rotating objects in space.</li>
		  <li>Have a quick raycasting demonstration</li>
		  <li>Challenge you a bit more to think about what's going on in the code by describing to what <strong>should</strong> happen; getting you to have a go at programming it yourself; then allowing you to see our solutions.</li>
		  <li>Use raycasting, event listeners and some fun Tone js features to create our dj turntable and mixer interface</li>
	</ul>
	</p>

  <p>The first two tasks are fairly quick demonstrations of the concepts that were discussed in the lecture. They also provide some useful code that you could reuse later if you wanted. The real stuff gets going with Task 3.</p>

	<p>Here's what we're going to be building (mouse over; click and drag on the deck to see what happens. Also mouse over; click and drag on the cross fader of the mixer):</p>


  <iframe src="https://codesandbox.io/embed/turntablesend-qbrd7?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="TurntablesEnd"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
	
   <p>We've purposefully left the visual design as grey here as this is something that you can customise as you go. You'll notice that we also only have one deck in this version, as this is something that you will add as stretch goal later...</p>
	<p><strong>Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.</strong>
	</p>
    

    <h2>Task 1 - Rotating Using Quaternions: A Quick Example</h2>
    <p>
    <p>Before we go on to making the actual thing though, let's just take a quick look at a couple of concepts that we talked about in the lecture. First of all, rotation using Quaternions. Now, as we said, you don't need to understand the complex maths involved to use quaternions as Mr Doob (Three js author) has kindly wrapped up that functionality for us.</p>
 
 	<p>Take a look at the example below and use the arrow keys to rotate the cube:</p>

 <iframe src="https://codesandbox.io/embed/w04t01-5em5e?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W04_T01"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   <p></p>

	</p>


   	<p>Now, this may not seem all that exciting right now, but think of the possibilities you have of rotating all kinds of objects, or arrays of objects, or arrays of arrays of objects like last workshop! To achieve this functionality we've done a couple of things</p>
	
	 <Accordion allowZeroExpanded = "true">
	 <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        First, at the top of our index.js before the init() function, we define a JS object that links quaternion rotations to arrow keys
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
						<CodeBlock text = {`const ANGULAR_SPEED = 0.5;
const MOVEMENTS = {
  ArrowUp: new THREE.Quaternion().setFromAxisAngle( //create a new quaternion and call the set from axis angle method
    new THREE.Vector3(1, 0, 0), //create a new vector which will rotate around the X axis
    THREE.MathUtils.degToRad(ANGULAR_SPEED * 6) //convert degrees to radians for our rotation amount in the positive direction
  ),
  ArrowDown: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0), //create a new vector which will rotate around the X axis
    THREE.MathUtils.degToRad(-ANGULAR_SPEED * 6) //convert degrees to radians for our rotation amount in the negative direction
  ),
  ArrowLeft: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0), //create a new vector which will rotate around the Y axis
    THREE.MathUtils.degToRad(-ANGULAR_SPEED * 6) //convert degrees to radians for our rotation amount in the negative direction
  ),
  ArrowRight: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0), //create a new vector which will rotate around the Y axis
    THREE.MathUtils.degToRad(ANGULAR_SPEED * 6) //convert degrees to radians for our rotation amount in the positive direction
  )
};`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
				
                    </p>
                    <p></p>
                    <p></p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Then, using the arrow keys object and Three js quaternions object, rotate our cube
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
						<CodeBlock text = {`document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
	event.preventDefault(); // stop scrolling the page using the arrow keys
  if (MOVEMENTS[event.key]) {
    const cur = cube.quaternion; // store our current quaternion in a variable
    const rot = MOVEMENTS[event.key]; // get our next rotation value from the JS object corresponding to the key that was pressed
    cur.multiplyQuaternions(rot, cur); // multiplyQuaternions with current and next to perform the rotation
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
				<p></p>
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            
      </Accordion>
      <p></p>
      <p>What happens if you change the ANGULAR_SPEED variable to something greater than  0.5? </p>
      <p></p>
  
   <p>While we're not actually going to use quaternions in our DJ webtoy, we feel it is very important that you have this example to work from if you do end up wanting to rotate objects using this method in your own projects later!</p>
    
    <h2>Task 2 - Raycasting: A Quick Example</h2>

    <p>Another key concept, along with rotation, is raycasting. As we discussed in the lecture, this is a common method used in 3D interaction to see whether our cursor is hovering over something that we might want to interact with. So, imagine a ray being cast from the camera to the mouse cursor and then through any other objects in the scene that follow after that.</p>


   <p>Take a look at the simple example below. You can see that when the mouse hovers over the cube, it turns red. Also take a look at the JS console in this example. We are printing an array that is being maintained by the raycaster object. Whent the mouse isn't over anything, the array is empty. But when the mouse casts a ray through the cube object, you can see the array is updated:</p>
  <iframe src="https://codesandbox.io/embed/w04t02-yrqvg?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W04_T02"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   <p></p>

   

   <p>Take a moment to look at the update function in index.js and understand what is going on here. It's important as we're going to use this quite a lot in our DJ example.</p>
    

    

     
    <p></p>

    

	

	<p></p>

    <h2>Task 3 - DJ Sprinkles Part 1</h2>

    <h5>Work from the starter project provided here and fork it to begin work in codesandbox:</h5>

    <p></p>
      <iframe src="https://codesandbox.io/embed/w04t03starter-opv39?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W04_T03_STARTER"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

   <p></p>

    

    <p></p>
  
    

    <p>As you can see, this is a considerably more complex project already, despite it looking so simple!</p>

    <p>Take a look around - open the djObjects.js file too and have a look in there. You can see that we've made a different javascript file and defined some classes in there that we are then exporting. We import them in index.js and that means we can use them just like we used the walker and mover classes in the previous weeks. This way of doing things just means we can break up our code into easier to read files that aren't millions of lines long.

    We're still just drawing some primative geometries but this time we're using the extrude functionality to make a cylinder that will represent our DJ turntable's platter.</p>

    <p>It's also very important to note that we have used some of the key principles of Object Oriented Programming (OOP) here. We've modelled our functionality on real world objects by breaking our various graphical elements up in to their component parts.
    But perhaps more importantly, we're using the <code> extends </code> keyword so that some of our objects actually inherit lots of functionlity from the THREE.Mesh object (and later the THREE.Object3D object). This is useful as we can than customise our objects while maintaining all the great stuff meshes (and Object3D's) can do.</p>

     <p>We're using a different rotation method here too: the bounding box instead of quaternions as we're actually only rotating our turntable platter around one axis. </p>

	<p>It's also worth noting that we have already added the event listeners needed as well as some slightly hack-y code for translating mouse movement into something useful for our purposes.</p>	
  
  <p>Right, now we've covered what's there, we need to think about what it is we need to do in order to make our webtoy functional.</p>


    <p>Let's break down our desired functionality for this first bit, we need to:</p>

   <ul>
    	<li>Play an audio file</li>
    	<li>Create and update our Turntable so that it keeps spinning to keep the party going...</li>
    	<li>Add a texture onto our turntable so that we can see it rotating (and make it look more like a record)</li>
    
    </ul>

    <p>OK, let's start coding. We're going to start in our init() function, just beneath the line where we add the event listeners (there are some comments in there to help you find the right section).</p>

    <p>Let's add our Tone crossfader and audio file player. We've already added a silly tune for you to use but you're more than welcome to use your own. So, first we make the crossfader and connect that to our master output.
    Then we make our Tone player and specify that once it has loaded the file, loop it and automatically start playing it:</p>

    <code>
	<CodeBlock text = {`crossFade = new Tone.CrossFade().toDestination(); // create a new Tone crossfader and connect it to the master output
  player1 = new Tone.Player("./sounds/Warrpy.mp3", () => { //make a new Tone audio file player with callback function to execute once the file has loaded
    player1.loop = true; // loop our audio for continuous playback
    player1.autostart = true; // play audio automatically
  }).connect(crossFade.a); // connect the player to the input a of the cross fader`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
	</code>

	<p>Now we have sound, but we can't see anything. </p>

	<p>Just below where we created our audio stuff in the init() function, let's make a new turntable object at a position that is left a bit on the x axis and add it to our scene:</p>

				   		<code>
						<CodeBlock text = {` turntable1 = new Turntable(new THREE.Vector3(-60, 0, 0), "platter1"); // create a new turntable 
  scene.add(turntable1); //add the turntable to our scene`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
	<p>Now we need to update our turntable to keep it spinning, so let's go ahead and add the call to update in our time dependent section of our main update function (this is labelled in the comments of the code):</p>
	<p>At the moment we're just going to pass an empty array as the third argument, but later on we will change this so that it will the array of objects in the line of sight of the raycaster...</p>
	   		
				   		<code>
						<CodeBlock text = {` turntable1.update(clicked, mouse.y, [], player1); // update our turntable`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
              
     
    <p>Cool, we should now be able see our deck, but it's difficult to actually tell that the platter is spinning right? So let's go ahead and add a texture to our platter.</p>
    <p>We've taken the liberty of adding an image that we can use as a texture in the images folder. </p>
     <p>Open the djObjects.js file again and head to the constructor of the platter object. This should be line 8 or so...</p>
     <p>So, to create the texture from the image we need to load it, then set some wrap settings so that it fits on our cylinder:</p>

    <code>
						<CodeBlock text = {`let texture = new THREE.TextureLoader().load("./images/6284.jpg"); //load our texture image
    texture.wrapS = THREE.RepeatWrapping; // repeat texture horizontaly
    texture.wrapT = THREE.RepeatWrapping; // repeat texture vertically
    texture.repeat.set(1 / 128, 1 / 128); // zooming into our texture image
    texture.offset.set(0.5, 0.5); // offsetting to the centre of our image`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
				   		<p></p>
	<p>Then, just below that we add the texure to the by updating the map value to being our texture variable. The new updated material definition should look like this:</p>
				   		<code>
						<CodeBlock text = {`let material = new THREE.MeshStandardMaterial({ // make a new material
      map: texture, // assign our new texture to the map parameter
      side: THREE.DoubleSide, // make our texture doublesided
      color: new THREE.Color(0xffffff) // set the colour to white to enable texture to been seen
    });`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
    
    <p></p>
    <p>Alright, you should now have a spinning deck with a record on it playing a silly tune...!</p>
    <p></p>

    <h2>Task 4 - DJ Sprinkles Part 2</h2>

    <p>Next up we want to add some interaction to our project...</p>

    <p>Let's break down our desired functionality for this second bit, we need to:</p>

   <ul>
    	<li>Use our raycaster in the update function to create an array of objects that the ray from the mouse is intersecting with</li>
    	<li>Send our array of intersected objects to our turntable</li>
    	<li>Get the turntable to check whether it is the object being interacted with</li>
    	<li>Change the audio file playback and turntable platter rotation accordingly</li>
		
    </ul>

    <p></p>
    <p>Okey dokey, so in our time dependent update function code in index.js, we're going to head to the line just above where we call <code>turntable1.update(clicked, mouse.y, [], player1)</code> let's create a ray that goes from our camera through our mouse and through the scene.
    Then we'll create a new array called intersects that will contain our objects. We've set the "recursive" flag on the intersectObjects method to true here, because our platter is actually contained within the turntable object and that is really the thing we're interested in manipulating.</p>
     <code>
						<CodeBlock text = {`
raycaster.setFromCamera(mouse, camera); // calculate objects intersecting the picking ray
let intersects = raycaster.intersectObjects(scene.children, true); // create a new array that will hold any objects within the scene that the ray hits`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
               <p></p>
	<p>
    Just below that, let's change the call to turntable's update method so that we now pass in the intersects array, instead of the empty one we were passing in before. Can you think what we need to change? Don't worry if you need to check the dropdown below:
    </p>
	<code>
						

    
				   		</code>
     
               <Accordion allowZeroExpanded = "true">
	 <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        This is what our Turntable's update call should now look like:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
                         <CodeBlock text = {`turntable1.update(clicked, mouse.y, intersects, player1); // passing our intersects array in, rather than an empty array like before`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
				
                    </p>
                    <p></p>
                </AccordionItemPanel>
            </AccordionItem>

            
      </Accordion>

    <p>Right, now we move on to finding whether this object is picked or not...</p>
    <p>Not going to lie, this starts to get into some relatively tricksy logic. So let's talk through what we need to do in the update function of our turntable:</p>
    <ul>
    	<li>We're going to check whether the intersects array is greater than 0 i.e is our mouse casting a ray over any object in our scene</li>
    	<li>Then, in a nested if statement, we're going to check whether the first object in the array (the closest object) matches the name of our object</li>
    	<li>We want to change colour of our object if it the name does match, so we'll add a bit of logic in there for that</li>
    	
    </ul>
    <p>Have a go at trying to code this yourself. Don't worry we have provided the solution below, but you should be trying to think through these interaction design problems yourself too so spend 10-15 minutes trying it out. Here is some pseudo code:</p>
     <code>
						<CodeBlock text = {`
if intersects array has something in it i.e if the length is greater than 1:
	if the first thing in intersects array does NOT match the name of the object we're concerned with:
		change the colour of our object to its normal colour
		ensure our mouseOverThis flag is false
	if the first object in intersects does match the name of our object
		ensure our mouseOverThis flag is true
		change the colour of our object to something visible like purple

else: reset everything to its normal colour and ensure our mouseOverThis flag is false`} language = {"python"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>

               <Accordion allowZeroExpanded = "true">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        This is the first part of our Turntable's update function:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
						<CodeBlock text = {`update(clicked, targetRotation, intersects, player) {
    let rotator = targetRotation - this.platter.rotation.z;

    // if there is one (or more) intersections
   
    if (intersects.length > 0) {
      // if the closest object intersected is not the currently stored intersection object
      if (intersects[0].object !== this.intersected) {
        // restore previous intersection object (if it exists) to its original color
        if (this.intersected) {
          if (this.intersected.name === this.platter.name) {
            this.intersected.material.color.setHex(this.intersected.currentHex);
          }
        }
        // store reference to closest object as current intersection object
        this.intersected = intersects[0].object;

        // store color of closest object (for later restoration)
        if (this.intersected.name === this.platter.name) {
          this.mouseOverThis = true;

          this.intersected.currentHex = this.intersected.material.color.getHex();
          // set a new color for closest object
          this.intersected.material.color.setHex(0xff00ff);
        } else {
          this.mouseOverThis = false;
        }
      }
    } // there are no intersections
    else {
      // restore previous intersection object (if it exists) to its original color
      if (this.intersected) {
        if (this.intersected.name === this.platter.name) {
          this.intersected.material.color.setHex(this.intersected.currentHex);
        }
      }
      // remove previous intersection object reference
      // by setting current intersection object to "nothing"
      this.intersected = null;
      this.mouseOverThis = false;
    }

   
   
    this.platter.update(this.direction);
  }
 `} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
				
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            
      </Accordion>

    <p></p>

		<p>Then we want to ensure the rotation of the platter and the Tone player react accordingly when our mouse is down and we are dragging up and down to scratch the record. Again, our solution requires a bit of chained logic to ensure our click and drag interactions work ok. Here is some pseudo code to get you to think about it (this still happens in the update method, below what we just wrote). Have a go at trying to code this yourself</p>
    
    	 
		<code>
						<CodeBlock text = {`
if the mouse is clicked AND the mouseOverThis flag is true AND our direction of rotation in relation to mouse movement is positive:
	play the audio file forwards 
	set the direction of rotation to positive 1
	map the mouse movement up and down to the playbackRate 
else if the mouse is NOT clicked AND mouseOverThis is false AND our direction of rotation in relation to mouse movement is positive:
	play the audio file forwards at normal speed
else if the mouse is clicked AND the mouseOverThis flag is true AND our direction of rotation in relation to mouse movement is negative:
	play the audio file backwards 
	set the direction of rotation to negative 1
	map the mouse movement up and down to the playbackRate 
else if the mouse if NOT clicked AND mouseOverThis is false AND our direction of rotation in relation to mouse movement is negative:
	play the audio file backwards at normal speed`} language = {"python"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
    <p></p>

  

	<p>So, there is a lot going on here obviously so don't worry if you struggled with getting this right. There are also multiple ways of doing this but we came up with the solution hidden in this drop down</p>

    	 <Accordion allowZeroExpanded = "true">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        This is what our turntable's update method ends up looking like:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
						<CodeBlock text = {`update(clicked, targetRotation, intersects, player) {
    let rotator = targetRotation - this.platter.rotation.z;

    // if there is one (or more) intersections
   
    if (intersects.length > 0) {
      // if the closest object intersected is not the currently stored intersection object
      if (intersects[0].object !== this.intersected) {
        // restore previous intersection object (if it exists) to its original color
        if (this.intersected) {
          if (this.intersected.name === this.platter.name) {
            this.intersected.material.color.setHex(this.intersected.currentHex);
          }
        }
        // store reference to closest object as current intersection object
        this.intersected = intersects[0].object;

        // store color of closest object (for later restoration)
        if (this.intersected.name === this.platter.name) {
          this.mouseOverThis = true;

          this.intersected.currentHex = this.intersected.material.color.getHex();
          // set a new color for closest object
          this.intersected.material.color.setHex(0xff00ff);
        } else {
          this.mouseOverThis = false;
        }
      }
    } // there are no intersections
    else {
      // restore previous intersection object (if it exists) to its original color
      if (this.intersected) {
        if (this.intersected.name === this.platter.name) {
          this.intersected.material.color.setHex(this.intersected.currentHex);
        }
      }
      // remove previous intersection object reference
      // by setting current intersection object to "nothing"
      this.intersected = null;
      this.mouseOverThis = false;
    }

    //if the mouse is clicked AND the mouseOverThis flag is true AND our direction of rotation in relation to mouse movement is positive:
    if (clicked && this.mouseOverThis && rotator > 0) { 
      player.reverse = false; //play the audio file forwards 
      this.direction = 1; //set the direction of rotation to positive 1
      player.playbackRate = THREE.MathUtils.clamp( //map the mouse movement up and down to the playbackRate 
        THREE.MathUtils.mapLinear(rotator, -0.5, 0.5, -2.0, 2.0),
        0.0,
        1.0
      );
      this.platter.rotation.z += rotator;
    } else if (!clicked && !this.mouseOverThis && rotator > 0) { else if the mouse is NOT clicked AND mouseOverThis is false AND our direction of rotation in relation to mouse movement is positive:
      player.playbackRate = 1; // playback at normal speed
    } else if (clicked && this.mouseOverThis && rotator < 0.0) { else if the mouse is clicked AND the mouseOverThis flag is true AND our direction of rotation in relation to mouse movement is negative:
      player.reverse = true; //play the audio file backwards 
      this.direction = -1; //set the direction of rotation to negative 1
      player.playbackRate = THREE.MathUtils.clamp( //map the mouse movement up and down to the playbackRate 
        THREE.MathUtils.mapLinear(rotator, 1.5, -0.5, 2.0, 0.0),
        0.0,
        2.0
      );
      this.platter.rotation.z += rotator;
    } else if (!clicked && !this.mouseOverThis && rotator < 0) { //else if the mouse if NOT clicked AND mouseOverThis is false AND our direction of rotation in relation to mouse movement is negative:
      player.playbackRate = 1; // playback at normal speed
    } else {
      player.playbackRate = 1; // anything else, just play back at normal speed
    }
   
    this.platter.update(this.direction);
  }
 `} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
				
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            
      </Accordion>

    <p></p>

    <p>This is a lot of code in one function. How can we make this neater? Perhaps it would be good to break the two sections up into to separate methods that belong to turntable that are called from Turntable.update()? In the final code, we ended up breaking it down into one method called checkIntersects() and one called scratch()... Can you work out how to do this?</p>
    <p></p>

    <h2>Task 5 - DJ Sprinkles Part 3</h2>


    <p>Phew, that was fairly hardcore, but actually it means we can reuse a fair bit of it for adding our mixer now. </p>

    <p>Once again, let's break down our desired functionality for this third bit, we need to:</p>

   <ul>
    	<li>Create and update our mixer object</li>
    	<li>Do some similar raycaster stuff on checking whether the mixer is the object that is being interacted with</li>
    	<li>Updating our crossfader wiper's position</li>
    	<li>Updating the Tone crossfader object to fade between two sources</li>
		
    </ul>

    <p></p>

    <p>So, let's add our Mixer in init() just below the bits where we added the turntable:</p>
    <code>
						<CodeBlock text = {`mixer = new Mixer(new THREE.Vector3(0, -10, 0)); // create a new mixer in the centre of the screen 
  scene.add(mixer); // add mixer to the scene`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
<p>We also want to update our mixer just like the turntable, so add this line in the time dependent update code just below where we update the turntable:</p>
				   		<code>
						<CodeBlock text = {`mixer.update(clicked, mouse.x * 2, intersects, crossFade); // updating our mixer to check whether it has been selected and xfade between the two channels`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>

   <p></p>	   		

    <p>Now we need to go through the same process of figuring our whether the mouse is over the mixer's crossfader wiper and do some stuff to the audio signal and the wiper's position. You try and have a go at this, safe in the knowledge that the solution is provided below. Here is some pseudo code:</p>

     <code>
						<CodeBlock text = {`
if intersects array has something in it:
	if the first thing in intersects array does NOT match the name of the object we're concerned with:
		change the colour of our object to its normal colour
		ensure our mouseOverThis flag is false
	if the first object in intersects does match the name of our object
		ensure our mouseOverThis flag is true
		change the colour of our object to something visible like purple

else: reset everything to its normal colour and ensure our mouseOverThis flag is false


then: 
if the mouse is clicked AND the mouseOverThis flag is true:
	set our Tone crossfader value based on the x position of the mouse
	update the wiper's position based on the x position of the mouse`} language = {"python"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
    <p></p>
    <p>OK we did our version, so check the drop down below for the full mixer update function.</p>

     <Accordion allowZeroExpanded = "true">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        This is what our mixer's update method ends up looking like:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
						<CodeBlock text = {`update(clicked, mouseX, intersects, crossFade) {
    if (intersects.length > 0) { //if intersects array has something in it:
      // if the closest object intersected is not the currently stored intersection object
      if (intersects[0].object != this.intersected) {
        // restore previous intersection object (if it exists) to its original color
        if (this.intersected) {
          if (this.intersected.name === this.fader.name) {
            this.intersected.material.color.setHex(this.intersected.currentHex);
          }
        }
        // store reference to closest object as current intersection object
        this.intersected = intersects[0].object;
        // store color of closest object (for later restoration)
        if (this.intersected.name === this.fader.name) {
          this.mouseOverThis = true;

          this.intersected.currentHex = this.intersected.material.color.getHex();
          // set a new color for closest object
          this.intersected.material.color.setHex(0xff0000);
        } else {
          //this.mouseOverThis = false;
        }
      }
    } // there are no intersections
    else {
      // restore previous intersection object (if it exists) to its original color
      if (this.intersected) {
        if (this.intersected.name === this.fader.name) {
          this.intersected.material.color.setHex(this.intersected.currentHex);
        }
      }
      // remove previous intersection object reference
      //     by setting current intersection object to "nothing"
      this.intersected = null;
      this.mouseOverThis = false;
    }

    if (clicked && this.mouseOverThis) { //if the mouse is clicked AND the mouseOverThis flag is true:
      this.xfade = THREE.MathUtils.clamp( //set our Tone crossfader value based on the x position of the mouse
        THREE.MathUtils.mapLinear(mouseX, -0.3, 0.3, 0.0, 1.0),
        0.0,
        1.0
      );

      crossFade.fade.value = this.xfade;  //set our Tone crossfader value based on the x position of the mouse

      this.fader.update(mouseX); //update the wiper's position based on the x position of the mouse
    } 
  }
 `} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
				   		</code>
				
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            
      </Accordion>
    
      <p></p>
       <p>OK alright OK! Now we have a scratchable single deck and turntable woohoo!</p>
	<h2>Task 6 - Stretch Task</h2>
	<p></p>
	<p></p>
    
    

    <p>OK so hopefully now you have made your fun and interactive dj web toy! Of course, it wouldn't be right if you only had one deck would it? So here are some stretch goals:
    <ul>
    	<li>Attach another Tone audio player and connect it to channel b of the crossfader</li>
    	<li>Add another deck and link it with the second tone audio player</li>
      <li>Split the djObject.js file into 2 separate files, one called Turnable.js and one called Mixer.js</li>
    	<li>Try adding some disco lights, can you make them react to the music with the Tone.js <a href="https://tonejs.github.io/examples/analysis" target="_blank">audio analyser</a> </li> 
    	<li>Try adding a VU meter to the mixer based on the amplitude of the audio signal,  you can use a <a href = "https://tonejs.github.io/docs/r13/MeterTone.Meter" target="_blank">Tone.Meter</a>for this</li>
    	
    </ul>
    </p>

    <p>Right we're at the final task for this workshop hooray! Nice one for making our dj mixer! </p>
    <p>Super important final task: go to file->export to .zip in your codesandbox and download your project!</p>
    <p>Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 4".</p>
   

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "WS03/WS3dependencies.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }`

export default Workshop07
