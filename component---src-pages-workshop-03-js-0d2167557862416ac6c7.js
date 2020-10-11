(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{uvYV:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return d}));var n=a("q1tI"),o=a.n(n),l=a("Wbzz"),r=a("9eSz"),s=a.n(r),i=a("Bl7J"),c=a("vrFN"),u=a("RMg3"),h=a("bj0T"),m=a("jPax"),d=(a("QYuT"),a("8ypT"),"3105699768");t.default=function(e){var t=e.data;return o.a.createElement(i.a,null,o.a.createElement(u.a,null),o.a.createElement(c.a,{title:"Workshop 03"}),o.a.createElement("p",null),o.a.createElement("h1",null,"Hello and welcome back!"),o.a.createElement("p",null,"The third workshop is aimed at helping you understand how we can start to apply deterministic and non-deterministic algorithms to our objects moving in space, to create emergent audio-visual experiences. So, we will:"),o.a.createElement("p",null,o.a.createElement("ul",null,o.a.createElement("li",null,"Work from the template we made from the first workshop  "),o.a.createElement("li",null,"Create our second generative system where we will start to apply forces to moving objects to create patterns in visuals and sound"),o.a.createElement("li",null,"Experiment with creating sine wave patterns"),o.a.createElement("li",null,"Experiment with using noise to create more non-deterministic patterns"))),o.a.createElement("p",null,"Here's what we're going to be building (let it play for a bit to work out what's going on here):"),o.a.createElement("iframe",{src:"https://codesandbox.io/embed/w03end-jil00?fontsize=14&hidenavigation=1&theme=dark&view=preview",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W03_END",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),o.a.createElement("p",null,o.a.createElement("strong",null,"Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.")),o.a.createElement("h2",null,"Task 1 - Importing Libraries and Declaring Our Variables"),o.a.createElement("p",null,"If you have reached here without completing workshops 1 and 2, please return to those as this is where we make the template that we start from on the following workshops."),o.a.createElement("p",null,"Right, create a new codesandbox project using the final workshop 1 task as a template."),o.a.createElement("p",null,'In the explorer tab on the left hand, navigate to the dependencies search box. You should already be able to see that we have three as a dependency. Now we\'re going to add two more simply by searching for the names and selecting them. Let\'s add "tone" and "noisejs". So, your dependenices tab should look like this now:'),o.a.createElement("p",null),o.a.createElement("div",{className:"imageWrapper"},o.a.createElement(s.a,{fluid:t.file.childImageSharp.fluid,alt:""})),o.a.createElement("p",null),o.a.createElement("p",null,"At the very top of your index.js file where we import Three, let's also import Tone and Noisejs like so:"),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(h.a,{text:'import * as THREE from "three";\nimport * as Tone from "tone";\nimport { Noise } from "noisejs";\nimport { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";\nimport "./styles.css";',language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"And let's just go ahead and delete all the sound making stuff where we read the sound file and play it with THREE.PositionalAudio. We're moving on to using Tone.js this week so we'll be synthesising in the browser, rather than simply playing back audio files."),o.a.createElement("p",null,"Next up, we're going to declare some global variables near the top of our index.js, before we define the init() function. So, we've got the number of movers; a variable to hold a movers array which we'll use later, another variable for our synths array that we're going to make; and finally a variable to hold an array for our musical scale that we'll use to change the frequency of the synths:"),o.a.createElement("code",null,o.a.createElement(h.a,{text:"let numMovers, movers, synths;\nlet musicalScale;",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"And in the init() function, let's move our camera back on the Z axis a bit so we can see what's going on:"),o.a.createElement("code",null,o.a.createElement(h.a,{text:"camera.position.z = 25;",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null),o.a.createElement("p",null,"If you didn't quite get there last time, go ahead and add a ",o.a.createElement("a",{href:"https://threejs.org/docs/#api/en/helpers/GridHelper",target:"_blank"},"grid helper")," to your scene."),o.a.createElement("h2",null,"Task 2 - Our Mover Class"),o.a.createElement("p",null),o.a.createElement("p",null,"Just like last time with the random walker, we're going to create a class that holds all our data and encapsulates our functionality. This time we'll add an extra method called display(). Let's make this just below the init() function :"),o.a.createElement("p",null),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(h.a,{text:"class Mover {\n\tconstructor() {\n\t\t\n\t}\n\n\tstep() {\n\t\n\t\t\n\t}\n\n\tdisplay() {\n\n\t}\n}",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"Again, just like the walker, we'll add some parameters to pass to the constructor. And in the constructor we'll set the position and create some vectors that we will use later for moving our movers around the space."),o.a.createElement("p",null),o.a.createElement("ul",null,o.a.createElement("li",null,"We're going to set the position"),o.a.createElement("li",null,"We're going to have an offset property too which will allow us to change the start point of our individual movers once we begin to move them"),o.a.createElement("li",null,"Our angle, velocity and amplitude vectors will be used when calculating our sine wave function later"),o.a.createElement("li",null,"Hopefully the geometry/material/box business is pretty familiar now :)"),o.a.createElement("li",null,"And we're going to create an instance of noise for each mover which we will query later in the update function")),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(h.a,{text:"class Mover {\n\tconstructor(x,y,z,offset) {\n\n\tthis.x = x;\n\tthis.y = y;\n\tthis.z = z;\n\n\t    this.angle = new THREE.Vector3(0, offset, 0);\n\t    this.velocity = new THREE.Vector3(0.1, 0.01, 0.01);\n\t    this.amplitude = new THREE.Vector3(0.5, 2.5, 0.5);\n\t    this.geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);\n\t    this.mat = new THREE.MeshPhongMaterial({\n\t      color: new THREE.Color(0.2, 0.2, 0.2)\n\t    });\n\t    this.box = new THREE.Mesh(this.geo, this.mat);\n\t    this.box.position.set(this.x, this.y, this.z);\n\t    this.noise = new Noise();\n\t    scene.add(this.box);\n\n\t}\n\n\tupdate() {\n\t\tthis.angle.add(this.velocity);\n\t}\n\n\tdisplay() {\n\t\tthis.box.position.set(this.x,this.y,this.z);\n  }\n \n}",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null),o.a.createElement("p",null,"Right, towards the bottom of init() before we call play(), let's initialise the global variables we made earlier. We'll have 36 rows of movers, then we'll create the blank arrays that we're going to fill. And finally let's create our musical scale array which will be used later to pick the frequencies that we're going to have each mover play: "),o.a.createElement("code",null,o.a.createElement(h.a,{text:"numMovers = 36;\n  movers = [];\n  synths = [];\n  musicalScale = [0, 4, 7, 11, 14];",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("h2",null,"Task 3 - Creating a 2D Array of Movers"),o.a.createElement("p",null,"Now we're going to actually use our Mover class by using a 2 Dimensional array - an array of arrays! It will be a grid 36 boxes long and 18 wide. And we'll just set the x and z positions while leaving the y position at 0 as that is the thing that we'll be updating later. We will also leave the offset at 0 for now, just to demonstrate what happens when we change that:"),o.a.createElement("p",null,"We're going to make this towards the bottom of the init() function above the line where we call play()"),o.a.createElement("p",null,"Try creating your own two dimensional array of movers that have a the following initialisation arguments passed to them as they're created: ",o.a.createElement("code",null,"i - 10, 0, j - 5, 0")),o.a.createElement(m.a,{allowZeroExpanded:"true"},o.a.createElement(m.b,null,o.a.createElement(m.d,null,o.a.createElement(m.c,null,"Don't worry if you're struggling, click the dropdown to see the solution")),o.a.createElement(m.e,null,o.a.createElement("p",null,o.a.createElement("code",null,o.a.createElement(h.a,{text:"//\n  for (let i = 0; i < numMovers; i++) {\n    for (let j = 0; j < numMovers / 2; j++) {\n      movers.push([]);\n      movers[i].push(new Mover(i - 10, 0, j - 5, 0)); // no offset yet\n    }\n  }",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})))))),o.a.createElement("p",null),o.a.createElement("p",null,"OK so, not only do we need to create our movers, but we will also need to update them and display them using a for loop too. Let's change our update function to loop through all of our movers and update them:"),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(h.a,{text:"//our update function\n\nfunction update() {\n  orbit.update();\n  //update stuff in here\n  delta += clock.getDelta();\n\n  if (delta > interval) {\n    // The draw or time dependent code are here\n    delta = delta % interval;\n  }\n\n  for(let i = 0; i < numMovers; i++) {\n\n\t\tfor (let j = 0;j < numMovers/2; j++){\n\t\t\tmovers[i][j].update();\n\t\t}\t\n\t}\n}",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"The same is required for the display() function, which we call from render, so let's update that as follows too: "),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(h.a,{text:"// simple render function\n\nfunction render() {\n  for (let i = 0; i < numMovers; i++) {\n    for (let j = 0; j < numMovers / 2; j++) {\n      movers[i][j].display();\n    }\n  }\n  renderer.render(scene, camera);\n}",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"So now we have everything in place to start moving our movers around to create some nice patterns."),o.a.createElement("h2",null,"Task 4 - Adding Oscillations and Noise"),o.a.createElement("p",null),o.a.createElement("p",null,"Right we have our grid layout, but nothing is moving yet. First of all, let's make our movers oscillate update and down using the sine function. With all the vectors that we create earlier and the in built javascript sine function, we can do this really easily by adding the following line to the update method in our Mover class. Let's add it BELOW the line where we add the velocity and angle vectors:"),o.a.createElement("p",null,"Sine"),o.a.createElement("code",null,o.a.createElement(h.a,{text:"this.y = Math.sin(this.angle.y) * this.amplitude.y;",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"Now you should be able to see your movers doing something, but they're all moving in synchrony right?! That's not what we want, we want to address each row individually and move them to create a sine wave pattern. In order to do this, let's pop back to where we create the movers in the init() function. We're going to change that offset paramter and update it such that updates the y value of the angle vector:"),o.a.createElement("code",null,o.a.createElement(h.a,{text:"//\n  for (let i = 0; i < numMovers; i++) {\n    for (let j = 0; j < numMovers / 2; j++) {\n      movers.push([]);\n      movers[i].push(new Mover(i - 10, 0, j - 5, i * 0.25));\n    }\n  }",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"OK, now we're cooking!"),o.a.createElement("p",null,"And from here, it's super easy to add a bit of Perlin noise that we talked about in the lecture too, for some extra generative behaviour. Let's go back to the update() method of our Mover class. We're just going to call the classic 2D perlin noise using our angle and amplitude as coordinates. Then we scale it a bit by multiplying it by 5. Finally we add that to our sine wave function and now we're really getting some interesting emergent patterns happening."),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(h.a,{text:"let perl = this.noise.perlin2(this.angle.y, this.amplitude.y) * 5;\n this.angle.add(this.velocity);\n this.y = Math.sin(this.angle.y) * this.amplitude.y + perl;",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null),o.a.createElement("h2",null,"Task 5 - Adding Sound"),o.a.createElement("p",null,"Right it's all very well making pretty visual patterns and that, but we're hear to make audio visual pieces. Let's just make sure Single Synth at top of init(), just below the bit where we get rid of the overlay. This will just let us test that our sound using Tone is working. I've added some comments to show what each line is doing:"),o.a.createElement("code",null,o.a.createElement(h.a,{text:'//sound\nlet synthy = new Tone.MonoSynth({ // declare synth and set some parameters\n    oscillator: {\n      type: "square" // set the oscillator type\n    },\n    envelope: {\n      attack: 3 // fading in our sound over 3 seconds using a volume envelope \n    },\n    filterEnvelope: { // attaching an envelope to our low pass filter\n      attack: 3,\n      decay: 3,\n      sustain: 1,\n    \n    },\n    filter: { // setting the frequency and resonance of our filter\n      frequency: 20000,\n      Q: 4\n    }\n  });\n  synthy.toDestination(); // connect to our output\n  synthy.triggerAttack(70, 0, 0.01); //trigger the envelope\n\n  ',language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"OK you should hear a fairly annoying sound now! Let's delete that synth and start to do some more interesting stuff to create a sound scape that is driven by the movement of the visual elements on screen. We're going to:  "),o.a.createElement("ul",null,o.a.createElement("li",null,"Create a synth per row of our 2D grid of movers"),o.a.createElement("li",null,"Constrain the frequency of each synth to a note of our musical scale array as we loop through our for loop"),o.a.createElement("li",null,"Connect our synths to the master output"),o.a.createElement("li",null,"Trigger our synth to start making sound")),o.a.createElement("code",null,o.a.createElement(h.a,{text:'for (let i = 0; i < numMovers; i++) {\n    let octave = parseInt(i/12,10); // find our octave based on where we\'re at with our iteration of "i"\n\tlet freq = 36 + (musicalScale[i%5] + (octave*12));// starting from base 36 (C2) pick a value to add from our musicalScale array then increase our octave to spread our scale\n\t\t\tsynths.push(new Tone.MonoSynth({ // add a new synth to our synth array\n\t\t\t\toscillator: {\n\t\t\t\t\ttype: "sawtooth"\n\t\t\t\t},\n\t\t\t\tenvelope: {\n\t\t\t\t\tattack: 0.01\n\t\t\t\t}\n\t\t\t\t\n\t\t\t}));\n\t\tsynths[i].toDestination(); //connect our synth to the main output\n\t\tsynths[i].triggerAttack(Tone.Frequency(freq, "midi")+Math.random(6),0,0.01); // trigger at our desired frequency with a bit of randomness to add "thickness" to the sound\n    for (let j = 0; j < numMovers / 2; j++) {\n      movers.push([]);\n\n      movers[i].push(new Mover(i - 10, 0, j - 5, i * 0.25));\n    }\n  }',language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"Now we've got a nice crushed chord going on, but we can take this further to map the movement of each row to the volume of our synth such that the pattern will then directly correlate to the rhythm of the audio being created. Essentially, we're modulating the amplitude to create rhythmic patterns. "),o.a.createElement("p",null,"It does get a little bit tricksy at this point because we have to do a few steps to translate the movement along the y axis into something that is usable as an audio paramter."),o.a.createElement("p",null,"In our update function, we're going to change so that:  "),o.a.createElement("ul",null,o.a.createElement("li",null,"We will take the y position of the the first row of each of the movers"),o.a.createElement("li",null,"Then map (using the built in Three js mapLinear function) that value to between -1 and 1 - when tweaking this was found to give the best results for fading the volume"),o.a.createElement("li",null,"Despite mapping between -1 and 1, we actually only ever want our gain to go between the values of 0 and 1. So we use the Three js built in function call clamp to constrain our values so that they will never go below 0 or above 1"),o.a.createElement("li",null,"Then we convert that value to something usable for Tone js using its built in function called gainToDb"),o.a.createElement("li",null,"And after all of that we set our synth volume using a tiny little ramp to prevent clicks from happening as 60fps is actually not quick enough for audio and we need to interpolate between the values to smooth them out")),o.a.createElement("code",null,o.a.createElement(h.a,{text:"function update() {\n  orbit.update();\n  //update stuff in here\n  delta += clock.getDelta();\n\n  for (let i = 0; i < numMovers; i++) {\n    let boxPosMap = THREE.MathUtils.mapLinear( // map the mover's box position from world coordinates to between -1 and 1\n      movers[i][0].box.position.y,\n      -movers[i][0].amplitude.y / 10,\n      movers[i][0].amplitude.y,\n      -1,\n      1\n    );\n    let boxPosMapClamp = THREE.MathUtils.clamp(boxPosMap, 0, 3); // ensure our newly mapped value never goes above 3 or below 0\n    let boxPosGainTodB = Tone.gainToDb(boxPosMapClamp); // convert our mapped and constrained value to decibels\n    synths[i].volume.linearRampTo(boxPosGainTodB, 0.01); // set the volume of our synth with the correctly calibrated value mapped from the box position\n    for (let j = 0; j < numMovers / 2; j++) { //update our movers\n      movers[i][j].update();\n    }\n  }\n\n  if (delta > interval) {\n    // The draw or time dependent code are here\n    \n    delta = delta % interval;\n  }\n}",language:"javascript",theme:h.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null,"Phew! Big step up but now you can see how to create a pretty neat generative audio-visual system, well done!"),o.a.createElement("h2",null,"Task 6 - Stretch Tasks"),o.a.createElement("p",null,"OK so hopefully now you have made your generative wave pattern sequencer type thing, leave it running for a while to see how the dynamic, rhythm and tonality change over time. Here are a few of stretch goals for you to work to really extend the knowledge you've developed so far:",o.a.createElement("ul",null,o.a.createElement("li",null,"Change the geometry type to a different shape. Use ",o.a.createElement("a",{href:"https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html",target:"_blank"},"this list")," to try and implement something a bit more interesting than a cube... "),o.a.createElement("li",null,"Try adding some ",o.a.createElement("a",{href:"https://dustinpfister.github.io/2018/04/16/threejs-fog/",target:"_blank"},"fog effects")," "),o.a.createElement("li",null,"Change the musical scale array to different integers to see how that can "),o.a.createElement("li",null,"Try changing the y values in the amplitude and velocity vectors in the Mover class"),o.a.createElement("li",null,"Add effects to the sound like ",o.a.createElement("a",{href:"https://tonejs.github.io/examples/reverb/",target:"_blank"},"reverb")," and ",o.a.createElement("a",{href:"https://tonejs.github.io/docs/14.7.33/FeedbackDelay",target:"_blank"},"delay"),"  "),o.a.createElement("li",null,"Try and make multiple waves to get cross rhythms and more complex audio-visual structures?"),o.a.createElement("li",null,"Fade master volume based on where the camera is "),o.a.createElement("li",null,"Change the colour of the row depending on whether the volume is high or not "))),o.a.createElement("p",null,'Right we\'re at the final task for this workshop hooray! Nice one for making our "hello world" but also creating a template that we can work from from now on. One final thing to experiment with, try adding a ',o.a.createElement("a",{href:"https://threejs.org/docs/#api/en/helpers/GridHelper",target:"_blank"},"grid helper")," to your scene and see how that changes the visual landscape. This is a tiny stretch goal so we're not going to tell you exactly how to do it!"),o.a.createElement("p",null,"Super important final task: go to file->export to .zip in your codesandbox and download your project!"),o.a.createElement("p",null,'Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 1".'),o.a.createElement(l.Link,{to:"/"},"Go back to the homepage"))}}}]);
//# sourceMappingURL=component---src-pages-workshop-03-js-0d2167557862416ac6c7.js.map