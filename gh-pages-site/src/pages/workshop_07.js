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
    <p>We're now in the final phase of "these are the key concepts and this is how you do stuff" type of teaching. This last example that we're going to work through is something that puts a lot of the things that we've been looking at over the previous weeks into one applied project: an endless runner type of game/web-toy.</p>
	 
    <p>It is, by it's nature, bigger and more complex than the stuff we've been working on so far. So we've supplied the structure in terms of the main classes, so you can understand how to go about designing the visual, interaction and sonic elements of the piece as we go. It is critical that you read every line/block of code in order to understand what's going on...</p>
    <p> Right, preamble over, over the next couple of weeks we will:</p>
    <p>
       <ul>
  		  <li>Work from starter code provided that you will fork a new codesandbox from. This is because, to hit the ground running, we've designed the structure of the piece to let you understand how the parts all fit together...</li>
  		  <li>Create a game-type of environment with ground plane, then see how we can manipulate vertices and faces to create some interesting effects.</li>
  		  <li>Add some nice lighting and fog to our environment.</li>
        <li>Add an avatar into our world, then start moving through our scene.</li>
        <li>Put some obstacles into the scene, in this case it will be trees.</li>
        <li>Look at one of the key mechanics in creative/game-based coding: collision detection.</li>
  		  <li>Challenge you a bit more to think about what's going on in the code by describing to what <strong>should</strong> happen; getting you to have a go at programming it yourself; then allowing you to see our solutions.</li>
  		  
  	</ul>
  	</p>

	<p>Here's what we're making, use the left and right arrow keys to move the avatar around...</p>
	

   <iframe src="https://codesandbox.io/embed/w07end01-zzoye?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W07_END_01"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
	
   <p></p>
	<p><strong>Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.</strong>
	</p>
    

    <h2>Task 1 - Creating the ground</h2>
    <p></p>
   

   <p>Right, we're going to use a starter project again. <strong>So please fork the project below.</strong> As in the previous week's starter code, it's basically just our normal template but we've added some a couple of other pre-defined class files for you to work with. Which JS files are importing which libraries/other JS files?</p>


   <iframe src="https://codesandbox.io/embed/w07start-bc0cz?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W07_START"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

  <p>This time we've already added all the global variables, so let's get cracking with creating a ground plane</p>
    
    

   <h3>Part 1</h3>
   <p></p>
  <p>Take a look through the Environment class to get an understanding of how it's working. Now, back in index.js around line 83 where it's specified, create a new instance of Environment and assign it to the variable called "ground". As you can see from the constructor of Environment, we need to pass our scene in as an argument. How do you do this?</p>

  <p></p>

   <Accordion allowZeroExpanded = "true">
   <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Hopefully you should have been able to do this yourself, but just in case here is the line that is required...
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
            <CodeBlock text = {`ground = new Environment(scene);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
              </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
           
            
      </Accordion>

      <p></p>



  <p></p>
<p>Try just enabling the orbit controls for a second to see what's going on with this plane. That means finding the line that says <code> orbit.enabled = false;</code> and setting it to true. Refresh the codesandbox browser to take a look in the scene.</p>

  <p>Remember to set it back to false once you've taken a look around.</p>
  
  <p></p>
  <p></p>
  <h3>Part 2</h3>

<p></p>
<p>Right, so that ground plane is kind of, well, plain...! If you cast your mind back to week 03 when we were talking about using noise to manipulate vertices of objects <a href="https://codesandbox.io/s/w03noisespheremanipulation-n64kw?file=/src/index.js" target="_blank">(this example)</a>, well that's what we're going to do here.</p>

<p>First we're going to iterate over the vertices of the plane and add a bit of randomness to the x and y positions.</p>
<p>Then, we're going to assign a random colour to each vertex of the face. Faces are triangular shapes used to compute the "skin" of a particular object. We're going to use <strong>H</strong>ue <strong>S</strong>aturation and <strong>V</strong>alue colour space to set the colours, as it's easier to get ranges within a certain colour this way. <a href="https://threejs.org/docs/#api/en/core/Face3.vertexColors" target="_blank">Here</a> is a more info on faces if you would like some.  </p>
<p></p>

<p>OK, now go into the runnerObjects.js file and around line 16, after we've created the plane geometry, add the following code:</p>

   <code>
  <CodeBlock text = {`for (let i = 0; i < this.geometry.vertices.length; i++) {
      //iterate through plane vertices and slightly randmise x and y positions to create some variation in the plane
      let vertex = this.geometry.vertices[i];
      vertex.x += Math.random() * 30 - 15;
      vertex.y += Math.random() * 30 - 15;
    }

    for (let i = 0, l = this.geometry.faces.length; i < l; i++) {
      // iterate through faces of plane geometry and randomise the colour to be varitions of green
      let face = this.geometry.faces[i];
      face.vertexColors[0] = new THREE.Color().setHSL(
        // Hue Saturation and Value (HSL) are easier to use for randomisation within a certain colour
        0.33, //green
        THREE.MathUtils.randFloat(0.5, 0.8), //randomise saturation between 0.5 and 0.8
        THREE.MathUtils.randFloat(0.5, 0.8) //randomise value between 0.5 and 0.8
      );
      face.vertexColors[1] = new THREE.Color().setHSL(
        0.33,
        THREE.MathUtils.randFloat(0.5, 0.8), //randomise saturation between 0.5 and 0.8
        THREE.MathUtils.randFloat(0.5, 0.8) //randomise value between 0.5 and 0.8
      );
      face.vertexColors[2] = new THREE.Color().setHSL(
        0.33,
        THREE.MathUtils.randFloat(0.5, 0.8), //randomise saturation between 0.5 and 0.8
        THREE.MathUtils.randFloat(0.5, 0.8) //randomise value between 0.5 and 0.8
      );
    }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p>Now, one last bit, we need to update our material to use vertexColors instead of a normal colour. So head into the part just below where we create our material and update it accordingly with the code below:</p>
  <p></p>
   <code>
  <CodeBlock text = {`vertexColors: THREE.VertexColors //ensure vertex colours is set so that we can use the randomsation`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>



  <p>OK, we've got a bit of texture on our plane now, good stuff!</p>

  
    <h2>Task 2 - Lighting/Shadows and Fog</h2>
    <p><p/>
    <p></p>
   <h3>Part 1</h3>
  <p>So, we've got some texture, but it would be good to add some visual effects to our scene. So we're going to add a directional light, and this time we're going to ensure it casts a wide shadow to that all the objects in our scene will be bathed in light but will also cast a shadow onto the ground plane, to help give a sense of realism. </p>
   <p><a href="https://threejs.org/docs/#api/en/lights/shadows/DirectionalLightShadow" target="_blank">More info about lights and shadows here...</a></p> 
   <p>Now, we might not see the results of this until task 3, but it's important that we get it set up now. There are quite a few lines below but they're essentially just specifying, the near and far planes of the shadow limits, all the corner edges of the shadow limits and then making sure our shadow map (the resolution of the shadow) is nice and detailed.</p>
    
   <p>So go and add the following code in correct place in the init() function in index.js. It is labelled, and should go just beneath where you initialise the directional light.</p>

    <code>
  <CodeBlock text = {`  light.position.set(-20, 50, -5); // set the light's initial position
  light.castShadow = true; // ensure that this light will cast a shadow
  // Please read here for more information about the below: https://threejs.org/docs/#api/en/lights/shadows/DirectionalLightShadow
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 5000;
  light.shadow.camera.left = -500;
  light.shadow.camera.bottom = -500;
  light.shadow.camera.right = 500;
  light.shadow.camera.top = 500;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

 <h3>Part 2</h3>

 <p>Right now we're going to set our scene's background to all white using HEX values. And we're going to add some fog so that it obscures the horizon a bit and objects will appear out of the mist! These are both things we've done before so have a think about what should go where in the init() function in index.js.</p>

    <a href="https://threejs.org/docs/#api/en/scenes/FogExp2" target="_blank">Take a look here if you need more information about how to create the fog effect...</a>  
<p></p>
   <Accordion allowZeroExpanded = "true">
   <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        If you're really struggling, these are the two lines of code that will set our background to white and add the fog...
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
            <CodeBlock text = {`scene.background = new THREE.Color(0xffffff); // set white background
scene.fog = new THREE.FogExp2(0xf0fff0, 0.006); // create some fog for VFX`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
              </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
           
            
      </Accordion>

      <p></p>

      <p>So now you can see that we've whited out our scene with making a white background and adding some fog. Things are looking good, but nothing is moving yet?! That's our next task...</p>
      <p></p>
      <p></p>

    <h2>Task 3 - Adding our Avatar and getting things moving</h2>

    
    <p></p>
    <h3>Part 1</h3>
  
<p></p>
<p>OK, now we want to create our avatar. How do we do this, and where? (it is labelled in the starter code so this one's on you)</p>

 <Accordion allowZeroExpanded = "true">
   <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        It's a singe line, what argument needs to be passed to the constructor?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
            <CodeBlock text = {`avatar = new Avatar(scene);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
              </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
           
            
      </Accordion>

<p></p>

<p>Great, now we can see a grey block-y ball type thing in our scene! And hopefully it's casting a nice shadow onto the plane too...</p>



    <h3>Part 2 in update function</h3>
  
  <p>Now is the time to really get things moving. And as we now know, we want to perform updates to the objects in our scene in the <strong>update function</strong> of index.js.</p>
<p>Have a think about what needs to happen. We want to: </p>

 <ul>
        <li>Use our "speed" variable to update our camera's z position each time update is called.</li>
        <li>Then we want to use the camera's position to update the position of our directional light.</li>
        <li>Then we need to make sure our avatar gets updated by calling it's update() function. Take a look at the update function and see which arguments need to be passed in...</li>
        <li>Finally we also need to call the ground's (which is an instance of Environment) update function and pass in the necessary argument.</li>
    </ul>

    <p>This code should be added at the top of the main update function in index.js, outside the slower timed code</p>

<Accordion allowZeroExpanded = "true">
   <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Have a go, but the required code to go in the update function in index.js is here.
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
            <CodeBlock text = {`camera.position.z -= speed; //move camera through scene by subtracting speed from its current position
  light.position.copy(camera.position); // use the camera's position to update the directional light's position by copying the camera's position vector3
  light.position.y += 200; // ensure light then stays high above
  light.position.z -= 150; // ensure light then stays in the distance shining back at us
  avatar.update(speed, obstacles, keyboard); // call avatar's update function, passing in our speed, obstacles array and keyboard object as arguments
  ground.update(camera); // call Environment's update function, passing in our camera as an argument`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
              </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
           
            
      </Accordion>

<p></p>
    <h3>Part 3 </h3>


    <p>Now we're moving. But, hmmm, the avatar looks a bit weird because it's not rolling along the ground, just sort of floating. So, at the top of the Avatar class's update function, add the following:</p>

    <code>
  <CodeBlock text = {`this.hero.rotation.x -= 0.28;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>



<p></p>
    <h3>Part 4</h3>

    <p>Great, but have you noticed that the light still seems to be looking a bit odd, it's like it's not actually pointing where it's supposed to. Well, that's becuase we haven't specified it to target our avatar.</p>

    <p>We do that in the init() function after we've created the light and the avatar, by specifying the light's target, which can be any Object3D:</p>

    <code>
  <CodeBlock text = {`light.target = avatar.hero;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>


    <h3>Part 5 - Adding interaction in avatar's update function</h3>

    <p>Last but not least regarding our avatar, we now want it to move left and right using our arrow keys. That means adding or subtracting from its current position on the x axis, when the corresponding keyboard key is pressed. We've implemented a class that holds an array of booleans relating to which keycode is pressed. Take a look in the keyboard class, the documentKeyDown() and documentKeyUp() event handler functions in index.js. Can you get what's going on here? Maybe try some console.log() statements in those event handler functions to understand what's happening when a key is pressed...</p>
    
    <p>This structure works well because we can actually get our Avatar to do it's own movement, because we're passing the keyboard object (that contains the key code information) to it each time update is called. Now I happen to know that the codes for the left and right arrow keys are 37 and 39 respectively. So let's go ahead and add the following code to the Avatar's update function in runnerObjects.js...</p>

    <code>
  <CodeBlock text = {` if (keyboard.isKeydown(37) === true) {
      // is the left arrow key pressed?
      this.hero.position.x -= 0.25; // move our "hero" mesh to the left
    }

    if (keyboard.isKeydown(39) === true) {
      // is the right arrow key pressed?
      this.hero.position.x += 0.25; // move our "hero" mesh to the right
    }
`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p>Can you try changing the keys that it's listening for "a" and "d" keys instead of the arrow keys?</p>
  
 <a href="https://keycode.info/" target="_blank">Here is a pretty nifty little site that can help with finding which key codes to use...</a> 

  <p></p>

   <h2>Task 4 - Adding Trees</h2>
   <p></p>

   <p>We've taken care of the class definition of the trees for you here. But take a look through to understand what's going on. Each tree is basically just three cones stacked on top of one another, simple really. But we're using code to create them procedurally so we don't have to use models.</p>

    <h3>Part 1</h3>

    <p>First of all we want to make a function to create an array full of our tree obstacles. We'll set them at random positions on the x and z axes. This will be handled in our made logic in index.js, so find the relevant section underneath the init() function add the following code:</p>

    <code>
  <CodeBlock text = {`function createTrees(avatar, ground) {
  for (let i = 0; i < numObstacles; i++) { // loop through until we reach numObstacles
    let randPosX = THREE.MathUtils.randInt(-200, 200); // generate a random position to be used in x axis
    let randPosZ = THREE.MathUtils.randInt(-1000, -3000); // generate a random position to be used in the y axis

    obstacles.push(new TreeObstacle(randPosX, 7, randPosZ, scene)); // add a new tree to our obstacles array, passing in the random x and z values, keeping them at 7 on the y axis so that they sit nicely on the ground plane
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

 <h3>Part 2 in init()</h3>

<p></p>
<p>Good stuff, now we just need to call our createTrees function from within the init() function.</p>

    <code>
  <CodeBlock text = {`createTrees(avatar, ground);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p>Cool, we now get to a bit of a forest! But if we let it go on a while the forest runs out...! So we need a method of respawning or simply just moving our trees once we've passed them...</p>

    <h3>Task 5 - Respawning Trees</h3>
   <p></p>
    <p></p>

    

    <h3>Part 1</h3>

    <p>What we need to do, is check whether each instance of TreeObstacle is in front of, or behind the camera. If it's behind us, we're going to sneakily move it to another random position in the distance so it will then emerge from the fog as if it's a new tree!</p>
  <p>Just below where we defined the createTrees function. We're now going to go ahead and define a moveTrees function!</p>

    <code>
  <CodeBlock text = {`function moveTrees() {
  for (let i = 0; i < obstacles.length; i++) { //iterate through our obstacles array
    let meshGroup = obstacles[i].meshGroup; // create a local variable and assign our meshGroup of cones contained within the TreeObstacle to it

    // respawn
    if (meshGroup.position.z > camera.position.z) { // is the obstacle behind us?
      obstacles[i].reset(); // call the reset function to move the obstacle and change its colour to green
    }
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

   <h3>Part 2 - in update function</h3>

   <p>Now all we need to do is call the moveTrees function from within the slower time code in the update function:</p>

    <code>
  <CodeBlock text = {`moveTrees();`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

   <h2>Task 6 - Collision Detection</h2>

   <p></p>
   <p>As you can see in the example at the start of this sheet, the trees turn red when the avatar hits them. Simple right?!</p>

   <p>Well, yes and no...</p>

    <p>... the problem is that we need to constantly whether or not our avatar is colliding with objects in our scene. Those objects are not the Environment, but are the TreeObstacles. </p>


   <p>First of all we need to break our problem down:</p>

   <ul>
        <li>We need to make sure that we only care about objects that are "collidable", so we'll use a boolean flag to set them to "collidable" or not.</li>
        <li>Upon each call to update, we need to iterate through our entire obstacles array.</li>
        <li>For each object in the array, we need to test, using simple pythagoras' theorem, whether the disance between our avatar and the obstacle in question is less than a certain amount.  </li>
        <li>If the distance between the avatar and the object is less than the sum of the sizes of both objects, we know we're collding:</li>
    </ul>

<div className="imageWrapper">
  <Img
        
        fluid={data.file.childImageSharp.fluid}
        alt=""
      />
      </div>
      <p></p>

 <p>As always, the great Daniel Shiffman has some really well described videos about collision detection, albeit in 2D, <a href="https://www.youtube.com/watch?v=uAfw-ko3kB8" target="_blank">here.</a> We'd recommend watching 7.6 and 7.7 if some of this is still unclear...</p>

   <p></p>
   <p>Take a look through the two helper methods we've defined in the Avatar class. One is called distanceTo(x,z) and the other is called isCollidedWith(that). Take a look through the code and comments to understand each method is doing. We are actually slightly cheating here to make things simpler, so we're working in 2D on the x and z axes, not using the y axis.</p>
   
   <h3>Part 1</h3>

   <p>First of all, in the Avatar's update method, let's add the code to call the third helper method called collidedWithObstacle(obstacles): </p>
    <code>
  <CodeBlock text = {`if (this.collidedWithObstacle(obstacles)) {
      // have we collided with an obstacle?
      console.log(" ------ CRASH ------- "); // print to console
    }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p>We're just going to print to the console for now, but we could do some cool stuff like trigger a sound based on this collision event.</p>


   <h3>Part 2</h3>
<p></p>
<p>OK, now for the tricksy bit. In the collidedWithObstacle(obstacles) method, we need to iterate through all our obstacles; test whether they're collidable or not; see if the distance between the two objects is less than the sizes of both objects; then if they are we change the colour of our obstacle and return true. If nothing has collided with the instance of avatar then we can return false and carry on:</p>
   <p></p>
   <code>
  <CodeBlock text = {`for (let n = 0; n < obstacles.length; n++) {
      // iterate through entire obstacles array
      if (obstacles[n].collidable === true) {
        // make sure that we actually care whether we collide with the object or not
        if (this.isCollidedWith(obstacles[n]) === true) {
          // have we collided?
          obstacles[n].material.color.setHex(0xff0000); //change the colour of that obstacle to red

          return true; // return true to our main update function so we can trigger our sound (and maybe do other stuff)
        }
      }
    }
    return false; // we didn't collide with anything so return false to our update function
  }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>
   

  <p>OK so hopefully now you have made a cool little endless runner project! Here are some stretch goals:
    <ul>
      <li>Create another set of obstacles using some kind of THREE js shape primitive.</li>
      <li>Try and figure out how to trigger the CrashSound when the collision occurs.</li>
      <li>Implement a scoring system based on whether or not you are supposed to collect points or lose points depending on which obstacle you hit.</li>
      <li>Implement a way of increasing speed based on how many points you have. Could that be a level type system?</li>
    </ul>
    </p>

    <p>Right we're at the final task for this workshop hooray!  </p>
    <p>Super important final task: go to file->export to .zip in your codesandbox and download your project!</p>
    <p>Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 7_8".</p>
   

    <Link to="/">Go back to the homepage</Link>
    </p>
  </Layout>
)


export const query = graphql`
  query {
    file(relativePath: { eq: "WS07/collision.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }`

export default Workshop07
