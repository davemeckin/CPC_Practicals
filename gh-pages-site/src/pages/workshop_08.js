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

const Workshop08 = ({data}) => (
  <Layout>
  <Navbar/>
    <SEO title="Workshop 08" />
    <p></p>
    <h1>Hello and welcome back!</h1>
    <p>If you have come here without doing the previous worksheet (called Week 07/08) please go back and do that before this one. The reason is that we are adding some sound stuff to that one this week, so we need to use that completed sheet (up to task 6) as a basis for what we're going to do this week.</p>

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
    

    <h2>Task 1 - Triggering the crash sound</h2>
    <p>So, pick up from where you left off last week. This was one of the stretch goals but it's a good idea to follow this task as we need to update a tiny bit of code...</p>
   

    
    

   <h3>Part 1</h3>
   <p></p>
  <p>It makes sense for us to trigger the crash sound from within our Avatar class, because that is the point where we are detecting collisions.</p>

  <p>First of all, let's head into the sounds.js file. Take a look at the CrashSound class. We just need to update this slightly as we found a *tiny little bug* in the starter code from last week...!</p>

  <p>Please just replace the <code>play()</code> method of the CrashSound class, with this update. We're essentially just checking whether or not it's already playing before starting the pattern:</p>

  <p></p>

  <code>
    <CodeBlock text = {`play() {
    this.pattern.index = 0; // reset the index
    this.pattern.stop(); // stop pattern first
    if (this.pattern.state !== "started") {
      // check whether the pattern has already started, and if not, start it.
      this.pattern.start().stop("+0.2"); // start the pattern then stop it 0.2 seconds later
    }
  }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>

  <p></p>

  <p>So, let's go ahead and look in runnerObjects.js: as you can see at the top we are importing our CrashSound from sounds.js. So now all we need to do is create a new instance of CrashSound, and call the "play" method whenever a collision is detected.</p>

  <p>You should be able to do this yourself so we're not providing code, but two things need to happen:</p>

  <ul>
    <li>Firstly, at the bottom of the constructor of the Avatar class in runnerObjects.js, declare a new variable called <code> this.synth </code> and assign it to a new instance of CrashSound.</li>
    <li>Secondly, call <code>this.synth.play()</code> in the correct if statement that is testing whether a crash has happened in the Avatar's update method. HINT remember Task 6 Part 1 from last week?</li>
  </ul>

    <p></p>
    <p>Great you should now be hearing a little twinkle arpeggiated synth sound on collisions now!</p>
    <p></p>


    <h2>Task 2 - Drums</h2>


    <p>In order for us to create some music in the browser with Tone.js, there are a couple of critical things we need to understand. First, the idea of events in Tone, which is explained really well <a href="https://github.com/Tonejs/Tone.js/wiki/Events" target="_blank">here</a>. As you will see in the code we write below, we will be using a lot of the concepts covered in that page to create a little backing track for our endless runner... </p>

    <p>The other really important, and heavily related, concept is how time can be represented in Tone. As we know in music and sound, timing is everything. And there are various ways of representing time including both in seconds and in more musical ways like divisions of the beat. We're using a bit of both in our examples below, so make sure you read this page <a href="https://github.com/Tonejs/Tone.js/wiki/Time" target="_blank">here</a> thoroughly too.</p>
    <p></p>
    <h3>Part 1</h3>



    <p></p>
     <p>OK, now we're going to add a backing track. And let's start with the drums. We've adapted the example from  <a href="https://tonejs.github.io/examples/shiny" target="_blank">here</a> for this. We're doing this to demonstrate a lot of cool functionality that is built in to Tone.js for sequencing musical events. Please ensure you visit all the links provided in the comments for deeper explanations about how each element works together.</p>

     <p>First of all, back in sounds.js, let's create a new class for our drum backing track. We'll do this at the bottom of sounds.js and call it DrumBackingTrack:</p>

  

       <Accordion allowZeroExpanded = "true">
   <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Hopefully you should have been able to do this yourself, but just in case here is what is required...
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
            <CodeBlock text = {`export class DrumBackingTrack {
  // our drum back beat nicked quite a lot from here https://tonejs.github.io/examples/shiny
  constructor() {
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
              </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
           
            
      </Accordion>

      <p></p>

      <p>OK, now everything else in this task will happen in the constructor of our DrumBackingTrack class...</p>

      <p></p>

<h3>Part 2 -Effects</h3>

      <p></p>

  <p>We want to add a bit of crunch and compression to our drums to make them a bit more lively. So, in the constructor of DrumBackingTrack in sound.js, let's create a compressor and some distortion. Links are provided in the comments to these built in Tone objects.</p>

  <p></p>

  <code>
    <CodeBlock text = {`// a compressor
    this.drumCompress = new Tone.Compressor({
      // https://tonejs.github.io/docs/14.7.34/Compressor
      volume: -30, // reducing output volume by 30 dB
      threshold: -30, // setting compressor's threshold to -30 dB
      ratio: 10, // setting gain reduction ratio at 10:1
      attack: 0.01, // fast attack
      release: 0.2 // fast release
    }).toDestination(); // connect to master

    this.distortion = new Tone.Distortion({
      // https://tonejs.github.io/docs/14.7.28/Distortion
      distortion: 0.4, // distortion amount (0 - 1) so setting at 40%
      wet: 0.4 // mix between wet and dry signals (0 - 1) so also setting at 40%
    });`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>

  <p></p>

  <h3>Part 3 - Hi Hats</h3>
   <p></p>
   <p>Great, now let's add some hi hats. We're just going to use a sample from the Tone js sound library, but you can obviously customise this to use your own if you'd like. It's our old friend Tone.Player, but below we're using a new event based object called Tone.Loop, which will enable us to time when we trigger the hi hat sound in a musical way:</p>
    <p></p>



    <p>Take a look at the <code>chain() </code> method here. It's really cool because it allows us to connect our source (the Tone.player) to multiple effects in an effects chain.</p>

    
    <p></p>
 <code>
    <CodeBlock text = {`// hats
    this.hats = new Tone.Player({
      // we've seen this before
      url: "https://tonejs.github.io/audio/drum-samples/CR78/hihat.mp3", // reading from the Tone.js library of audio files this time
      volume: -53, // reducing volume by 53 dB
      fadeOut: 0.01 // adding a short fade out
    }).chain(this.distortion, this.drumCompress); // using the chain method to connect the hi hat player through distortion and compression

    this.hatsLoop = new Tone.Loop({
      // https://tonejs.github.io/docs/14.7.58/Loop.html
      callback: function (time) {
        // setting the callback function through the JS object being passed to the constructor
        this.hats.start(time).stop(time + 0.05); // starting the player then stopping it 0.05 seconds afterwards
      }.bind(this), // we bind this callback function to the current execution context so that "this" relates to our object instance, not the anonymous callback function's "this"
      interval: "16n", // 16th note (semiquaver) division
      probability: 1.0 // setting probability to 1.0 means this will trigger on every 16th note. Try reducing the probability to see what happens
    }).start("1m");`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>

   <p></p>

   <p>OK there's one other part in here that you might be scratching your head over. And that's the line where we're calling <code>.bind(this)</code> on the callback function in the Tone.Loop. The reason we have to do this is that the callback is what's called an anonymous function. That means it has it's own execution context, which in turn means that it has it's own "this" when it is executed. In order to make "this" relate to our DrumBackingTrack object, and not some other new "this", we need to call <code>.bind(this)</code> so that "this" relates to our instance of DrumBackingTrack. More info can be found in the first section <a href="https://jochasinga.medium.com/context-smuggle-with-injection-6f38e0ae478e" target="_blank">here</a>.</p>
   <p> </p>
   <h3>Part 4 - Snare Drum</h3>
    <p></p>
   <p>We're also using a snare drum sample from the Tone js library here. </p>
    <p></p>

    <p>Now, instead of using a Tone.Loop, we're using a Tone.Sequence this time. Take a look at the page about Events linked above for more info. We just want to trigger the snare sound on the 2 and 4, so we use an array with "null" in it to have a rest, so that we don't trigger the snare on the 1 and 3.</p>

    <p></p>

 <code>
    <CodeBlock text = {`// SNARE PART
    this.snare = new Tone.Player({
      // as above for the hi hats
      url: "https://tonejs.github.io/audio/drum-samples/breakbeat9/snare.mp3",
      fadeOut: 0.1,
      volume: -41
    }).chain(this.distortion, this.drumCompress);

    this.snarePart = new Tone.Sequence( // https://tonejs.github.io/docs/14.7.58/Sequence
      function (time, velocity) {
        this.snare.start(time).stop(time + 0.5); // starting the player then stopping it 0.05 seconds afterwards
      }.bind(this), // we bind this callback function to the current execution context so that "this" relates to our object instance, not the anonymous callback function's "this"
      [null, 1, null, 1], // using null so that the function doesn't get called on the 1 and 3 divisions, only on the 2 and 4 divisions.
      "4n" // trigger interval is quater notes (quavers)
    ).start("1m"); // start 1 measure (1 bar) after the Tone.Transport has started. This ensures everything starts together`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>

   <p></p>
   <h3>Part 5 - Kick</h3>
   <p></p>
   <p>This time we're actually using synthesis for our kick drum, rather than a sample. So do take a look at the comments and make sure you visit the URLs to understand what's going on: </p>
    <p></p>

 <code>
    <CodeBlock text = {`this.kick = new Tone.MembraneSynth({
      //https://tonejs.github.io/docs/14.7.58/MembraneSynth
      volume: -30, // reduce volume by 30 dB
      pitchDecay: 0.09, // setting a short pitch decay
      octaves: 6, // fairly high number of octaves for the pitch to ramp down over
      oscillator: {
        // setting oscillator type to square wave for some timbral complexity 
        type: "square4"
      },
      envelope: {
        // percussive envelope
        attack: 0.0001,
        decay: 0.2,
        sustain: 0.0
      }
    }).connect(this.drumCompress); // connecting to the compressor
    this.kickPart = new Tone.Sequence( // https://tonejs.github.io/docs/14.7.58/Sequence
      (time, probability) => {
        this.kick.triggerAttackRelease("C1", time); // triggering the attack and release phases immediately to get the percussive envelope effect
      },
      [
        // a sequence array of kick drum probabilities: a none "null" means the kick will be triggered, all other divisions are null so a kick is not triggered
        1,
        null,
        null,
        null,
        null,
        1,
        null,
        null,
        null,
        1,
        null,
        null,
        null,
        null,
        null,
        1
      ],

      "8n" // sequence callback will be called on 8th note (quaver) divisions
    ).start("1m"); // start 1 measure (1 bar) after the Tone.Transport has started. This ensures everything starts together`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>

   <p></p>
   <h3>Part 6</h3>

   <p>Now all we have to do is four things (which you should definitely be able to do by now so we won't supply all the code code) : </p>

   <ul>
    <li>At the top of index.js, import the DrumBackingTrack class from "sounds.js"</li>
    <li>Still at the top of index.js but in the variable declrations, declare a new variable called drumBackingTrack</li>
    <li>Just above the point where we call <code>Tone.Transport.start()</code>, let's set the BPM of our Tone.js project to 168. We do this by writing <code>Tone.Transport.bpm.value = 168;</code> </li>
    <li>Underneath the point that we call <code>Tone.Transport.start()</code> in the init() function, assign a new instance of DrumBackingTrack to our variable. We're starting off all the patterns in our class in the constructor so now you should be hearing your drum beat!</li>
  </ul>

  <p></p>

    <h2>Task 3 - Bass</h2>

    <h3>Part 1</h3>
 
   <p>OK now we're going to do the bass part, it's going to work in exactly the same way. So go ahead and create a class called BassBackingTrack just below the DrumBackingTrack one in sounds.js.</p>

   <p>We are not supplying the code for this bit as you have done it so many times now!</p>

   <h3>Part 2</h3>

   <p></p>

   <p>OK, now in the constructor of the BassBackingTrack class, let's add our bass synth and connect it to the master output and the reverb for a bit of space. Take a look through the comments and follow the URL to understand what's going on.</p>

 <code>
    <CodeBlock text = {` // BASS
    this.bass = new Tone.FMSynth({
      // https://tonejs.github.io/docs/14.7.58/FMSynth.html
      volume: -14, // reduce volume by 14 dB
      harmonicity: 3, // set harmonicity to 3 - the ratio between the two voices
      modulationIndex: 3.5, // set modulation index amount - this is basically the amount of modulation
      oscillator: {
        // setting a custom oscillator wave form with specific partials
        type: "custom",
        partials: [0, 1, 0, 2]
      },
      envelope: {
        //  percussive amplitude envelope
        attack: 0.08,
        decay: 0.3,
        sustain: 0
      },
      modulation: {
        // using sawtooth wave as the modulator
        type: "sawtooth"
      },
      modulationEnvelope: {
        // fairly slow attack on the modulation envelope which controls modulation amount
        attack: 0.1,
        decay: 0.2,
        sustain: 0.3,
        release: 0.01
      }
    }).toDestination(); // connect bass to master
    this.bass.connect(reverb); // connect bass to reverb`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>

   <p></p>

   <p>Still in the constructor, let's create our bass part. This one is a bit more complex in terms of adding a bit of variation. We bake in that variation by using the probability key, as well as how note number and note length. This is then used by the Tone.Part's callback function to trigger the bass notes:</p>

 <code>
    <CodeBlock text = {`this.bassPart = new Tone.Part( // https://tonejs.github.io/docs/14.7.58/Part.html
      function (time, event) {
        // our callback function
        if (Math.random() < event.prob) {
          // is a random float between 0 and 1 (exlusive) less than the probability we've set below?
          this.bass.triggerAttackRelease(event.note, event.dur, time); // trigger our bass sound with the corresponding note array below
        }
      }.bind(this), // we bind this callback function to the current execution context so that "this" relates to our object instance, not the anonymous callback function's "this"
      [
        // an array of JS objects containing note data for timing, note number, duration and probability which is used in the callback above
        { time: "0:0", note: "C2", dur: "4n.", prob: 1 },
        { time: "0:2", note: "C2", dur: "8n", prob: 0.6 },
        { time: "0:2.6666", note: "C2", dur: "8n", prob: 0.4 },
        { time: "0:3.33333", note: "C2", dur: "8n", prob: 0.9 },
        { time: "1:0", note: "C2", dur: "4n.", prob: 1 },
        { time: "1:2", note: "C2", dur: "8n", prob: 0.6 },
        { time: "1:2.6666", note: "C2", dur: "8n", prob: 0.4 },
        { time: "1:3.33333", note: "F2", dur: "8n", prob: 0.9 },
        { time: "2:0", note: "F2", dur: "4n.", prob: 1 },
        { time: "2:2", note: "F2", dur: "8n", prob: 0.6 },
        { time: "2:2.6666", note: "F2", dur: "8n", prob: 0.4 },
        { time: "2:3.33333", note: "F2", dur: "8n", prob: 0.9 },
        { time: "3:0", note: "F2", dur: "4n.", prob: 1 },
        { time: "3:2", note: "F2", dur: "8n", prob: 0.6 },
        { time: "3:2.6666", note: "F2", dur: "8n", prob: 0.4 },
        { time: "3:3.33333", note: "F1", dur: "8n", prob: 0.9 }
      ]
    ).start("1m"); // start 1 measure (1 bar) after the Tone.Transport has started. This ensures everything starts together

    this.bassPart.loop = true; // loop our part
    this.bassPart.loopEnd = "4m"; // make sure we loop every 4 measures (bars)`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>

   <p></p>

   <p>Right, finally, you have to follow the same steps as with the DrumBackingTrack: import in index.js; define a global variable; initialise that variable with a new instance of BassBackingTrack </p>

  <p>OK so hopefully now you have made a cool little endless runner project with sound design and music! Here are some stretch goals:
    <ul>
      <li>Try going through and customising some of the sounds/patterns and making them your own.</li>
      <li>Can you increase the tempo of the music as time goes on? You will have to set the bpm property of <a href="https://tonejs.github.io/docs/14.7.58/Transport.html" target="_blank">Tone.Transport</a>. </li> 
      <li>What about implementing starting and stopping the bass and drum sequences based on interactions or "in world" events like timing or a certain number of collisions?</li>
      <li>Or what about creating a new "Lead Synth" part?</li>
      
    </ul>
    </p>

    <p>Right we're at the final task for this workshop hooray!  </p>
    <p>Super important final task: go to file->export to .zip in your codesandbox and download your project!</p>
    <p>Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 7_8".</p>
   

    <Link to="/">Go back to the homepage</Link>
   
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

export default Workshop08
