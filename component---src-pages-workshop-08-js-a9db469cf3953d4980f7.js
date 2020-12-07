(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{QYuT:function(e,t,n){},RoEh:function(e,t,n){"use strict";n.r(t),n.d(t,"query",(function(){return h}));var a=n("q1tI"),o=n.n(a),r=n("Wbzz"),s=(n("9eSz"),n("Bl7J")),l=n("vrFN"),i=n("RMg3"),c=n("bj0T"),u=n("jPax"),h=(n("QYuT"),n("8ypT"),"950068632");t.default=function(e){e.data;return o.a.createElement(s.a,null,o.a.createElement(i.a,null),o.a.createElement(l.a,{title:"Workshop 08"}),o.a.createElement("p",null),o.a.createElement("h1",null,"Hello and welcome back!"),o.a.createElement("p",null,"If you have come here without doing the previous worksheet (called Week 07/08) please go back and do that before this one. The reason is that we are adding some sound stuff to that one this week, so we need to use that completed sheet (up to task 6) as a basis for what we're going to do this week."),o.a.createElement("p",null,"Here's what we're making, use the left and right arrow keys to move the avatar around..."),o.a.createElement("iframe",{src:"https://codesandbox.io/embed/w07end01-zzoye?fontsize=14&hidenavigation=1&theme=dark&view=preview",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W07_END_01",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),o.a.createElement("p",null),o.a.createElement("p",null,o.a.createElement("strong",null,"Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.")),o.a.createElement("h2",null,"Task 1 - Triggering the crash sound"),o.a.createElement("p",null,"So, pick up from where you left off last week. This was one of the stretch goals so if you've already does this bit feel free to carry on to the next task..."),o.a.createElement("h3",null,"Part 1"),o.a.createElement("p",null),o.a.createElement("p",null,"It makes sense for us to trigger the crash sound from within our Avatar class, because that is the point where we are detecting collisions."),o.a.createElement("p",null),o.a.createElement("p",null,'So, let\'s go ahead and look in runnerObjects.js: as you can see at the top we are importing our CrashSound from sounds.js. So now all we need to do is create a new instance of CrashSound, and call the "play" method whenever a collision is detected.'),o.a.createElement("p",null,"You should be able to do this yourself so we're not providing code, but two things need to happen:"),o.a.createElement("ul",null,o.a.createElement("li",null,"Firstly, at the bottom of the constructor of the Avatar class in runnerObjects.js, declare a new variable called ",o.a.createElement("code",null," this.synth ")," and assign it to a new instance of CrashSound."),o.a.createElement("li",null,"Secondly, call ",o.a.createElement("code",null,"this.synth.play()")," in the correct if statement that is testing whether a crash has happened in the Avatar's update method. HINT remember Task 6 Part 1 from last week?")),o.a.createElement("p",null),o.a.createElement("p",null,"Great you should now be hearing a little twinkle arpeggiated synth sound on collisions now!"),o.a.createElement("p",null),o.a.createElement("h2",null,"Task 2 - Drums"),o.a.createElement("p",null,"In order for us to create some music in the browser with Tone.js, there are a couple of critical things we need to understand. First, the idea of events in Tone, which is explained really well ",o.a.createElement("a",{href:"https://github.com/Tonejs/Tone.js/wiki/Events",target:"_blank"},"here"),". As you will see in the code we write below, we will be using a lot of the concepts covered in that page to create a little backing track for our endless runner... "),o.a.createElement("p",null,"The other really important, and heavily related, concept is how time can be represented in Tone. As we know in music and sound, timing is everything. And there are various ways of representing time including both in seconds and in more musical ways like divisions of the beat. We're using a bit of both in our examples below, so make sure you read this page ",o.a.createElement("a",{href:"https://github.com/Tonejs/Tone.js/wiki/Time",target:"_blank"},"here")," thoroughly too."),o.a.createElement("p",null),o.a.createElement("h3",null,"Part 1"),o.a.createElement("p",null),o.a.createElement("p",null,"OK, now we're going to add a backing track. And let's start with the drums. We've adapted the example from  ",o.a.createElement("a",{href:"https://tonejs.github.io/examples/shiny",target:"_blank"},"here")," for this. We're doing this to demonstrate a lot of cool functionality that is built in to Tone.js for sequencing musical events. Please ensure you visit all the links provided in the comments for deeper explanations about how each element works together."),o.a.createElement("p",null,"First of all, back in sounds.js, let's create a new class for our drum backing track. We'll do this at the bottom of sounds.js and call it DrumBackingTrack:"),o.a.createElement(u.a,{allowZeroExpanded:"true"},o.a.createElement(u.b,null,o.a.createElement(u.d,null,o.a.createElement(u.c,null,"Hopefully you should have been able to do this yourself, but just in case here is what is required...")),o.a.createElement(u.e,null,o.a.createElement("p",null,o.a.createElement("code",null,o.a.createElement(c.a,{text:"export class DrumBackingTrack {\n  // our drum back beat nicked quite a lot from here https://tonejs.github.io/examples/shiny\n  constructor() {\n  }\n}",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})))))),o.a.createElement("p",null),o.a.createElement("p",null,"OK, now everything else in this task will happen in the constructor of our DrumBackingTrack class..."),o.a.createElement("p",null),o.a.createElement("h3",null,"Part 2 -Effects"),o.a.createElement("p",null),o.a.createElement("p",null,"We want to add a bit of crunch and compression to our drums to make them a bit more lively. So, in the constructor of DrumBackingTrack in sound.js, let's create a compressor and some distortion. Links are provided in the comments to these built in Tone objects."),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(c.a,{text:"// a compressor\n    this.drumCompress = new Tone.Compressor({\n      // https://tonejs.github.io/docs/14.7.34/Compressor\n      volume: -30, // reducing output volume by 30 dB\n      threshold: -30, // setting compressor's threshold to -30 dB\n      ratio: 10, // setting gain reduction ratio at 10:1\n      attack: 0.01, // fast attack\n      release: 0.2 // fast release\n    }).toDestination(); // connect to master\n\n    this.distortion = new Tone.Distortion({\n      // https://tonejs.github.io/docs/14.7.28/Distortion\n      distortion: 0.4, // distortion amount (0 - 1) so setting at 40%\n      wet: 0.4 // mix between wet and dry signals (0 - 1) so also setting at 40%\n    });",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("h3",null,"Part 3 - Hi Hats"),o.a.createElement("p",null),o.a.createElement("p",null,"Great, now let's add some hi hats. We're just going to use a sample from the Tone js sound library, but you can obviously customise this to use your own if you'd like. It's our old friend Tone.Player, but below we're using a new event based object called Tone.Loop, which will enable us to time when we trigger the hi hat sound in a musical way:"),o.a.createElement("p",null),o.a.createElement("p",null,"Take a look at the ",o.a.createElement("code",null,"chain() ")," method here. It's really cool because it allows us to connect our source (the Tone.player) to multiple effects in an effects chain."),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(c.a,{text:'// hats\n    this.hats = new Tone.Player({\n      // we\'ve seen this before\n      url: "https://tonejs.github.io/audio/drum-samples/CR78/hihat.mp3", // reading from the Tone.js library of audio files this time\n      volume: -53, // reducing volume by 53 dB\n      fadeOut: 0.01 // adding a short fade out\n    }).chain(this.distortion, this.drumCompress); // using the chain method to connect the hi hat player through distortion and compression\n\n    this.hatsLoop = new Tone.Loop({\n      // https://tonejs.github.io/docs/14.7.58/Loop.html\n      callback: function (time) {\n        // setting the callback function through the JS object being passed to the constructor\n        this.hats.start(time).stop(time + 0.05); // starting the player then stopping it 0.05 seconds afterwards\n      }.bind(this), // we bind this callback function to the current execution context so that "this" relates to our object instance, not the anonymous callback function\'s "this"\n      interval: "16n", // 16th note (semiquaver) division\n      probability: 1.0 // setting probability to 1.0 means this will trigger on every 16th note. Try reducing the probability to see what happens\n    }).start("1m");',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"OK there's one other part in here that you might be scratching your head over. And that's the line where we're calling ",o.a.createElement("code",null,".bind(this)"),' on the callback function in the Tone.Loop. The reason we have to do this is that the callback is what\'s called an anonymous function. That means it has it\'s own execution context, which in turn means that it has it\'s own "this" when it is executed. In order to make "this" relate to our DrumBackingTrack object, and not some other new "this", we need to call ',o.a.createElement("code",null,".bind(this)"),' so that "this" relates to our instance of DrumBackingTrack. More info can be found in the first section ',o.a.createElement("a",{href:"https://jochasinga.medium.com/context-smuggle-with-injection-6f38e0ae478e",target:"_blank"},"here"),"."),o.a.createElement("p",null," "),o.a.createElement("h3",null,"Part 4 - Snare Drum"),o.a.createElement("p",null),o.a.createElement("p",null,"We're also using a snare drum sample from the Tone js library here. "),o.a.createElement("p",null),o.a.createElement("p",null,"Now, instead of using a Tone.Loop, we're using a Tone.Sequence this time. Take a look at the page about Events linked above for more info. We just want to trigger the snare sound on the 2 and 4, so we use an array with \"null\" in it to have a rest, so that we don't trigger the snare on the 1 and 3."),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(c.a,{text:'// SNARE PART\n    this.snare = new Tone.Player({\n      // as above for the hi hats\n      url: "https://tonejs.github.io/audio/drum-samples/breakbeat9/snare.mp3",\n      fadeOut: 0.1,\n      volume: -41\n    }).chain(this.distortion, this.drumCompress);\n\n    this.snarePart = new Tone.Sequence( // https://tonejs.github.io/docs/14.7.58/Sequence\n      function (time, velocity) {\n        this.snare.start(time).stop(time + 0.5); // starting the player then stopping it 0.05 seconds afterwards\n      }.bind(this), // we bind this callback function to the current execution context so that "this" relates to our object instance, not the anonymous callback function\'s "this"\n      [null, 1, null, 1], // using null so that the function doesn\'t get called on the 1 and 3 divisions, only on the 2 and 4 divisions.\n      "4n" // trigger interval is quater notes (quavers)\n    ).start("1m"); // start 1 measure (1 bar) after the Tone.Transport has started. This ensures everything starts together',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("h3",null,"Part 5 - Kick"),o.a.createElement("p",null),o.a.createElement("p",null,"This time we're actually using synthesis for our kick drum, rather than a sample. So do take a look at the comments and make sure you visit the URLs to understand what's going on: "),o.a.createElement("p",null),o.a.createElement("code",null,o.a.createElement(c.a,{text:'this.kick = new Tone.MembraneSynth({\n      //https://tonejs.github.io/docs/14.7.58/MembraneSynth\n      volume: -30, // reduce volume by 30 dB\n      pitchDecay: 0.09, // setting a short pitch decay\n      octaves: 6, // fairly high number of octaves for the pitch to ramp down over\n      oscillator: {\n        // setting oscillator type to square wave for some timbral complexity \n        type: "square4"\n      },\n      envelope: {\n        // percussive envelope\n        attack: 0.0001,\n        decay: 0.2,\n        sustain: 0.0\n      }\n    }).connect(this.drumCompress); // connecting to the compressor\n    this.kickPart = new Tone.Sequence( // https://tonejs.github.io/docs/14.7.58/Sequence\n      (time, probability) => {\n        this.kick.triggerAttackRelease("C1", time); // triggering the attack and release phases immediately to get the percussive envelope effect\n      },\n      [\n        // a sequence array of kick drum probabilities: a none "null" means the kick will be triggered, all other divisions are null so a kick is not triggered\n        1,\n        null,\n        null,\n        null,\n        null,\n        1,\n        null,\n        null,\n        null,\n        1,\n        null,\n        null,\n        null,\n        null,\n        null,\n        1\n      ],\n\n      "8n" // sequence callback will be called on 8th note (quaver) divisions\n    ).start("1m"); // start 1 measure (1 bar) after the Tone.Transport has started. This ensures everything starts together',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("h3",null,"Part 6"),o.a.createElement("p",null,"Now all we have to do is four things (which you should definitely be able to do by now so we won't supply all the code code) : "),o.a.createElement("ul",null,o.a.createElement("li",null,'At the top of index.js, import the DrumBackingTrack class from "sounds.js"'),o.a.createElement("li",null,"Still at the top of index.js but in the variable declrations, declare a new variable called drumBackingTrack"),o.a.createElement("li",null,"Just above the point where we call ",o.a.createElement("code",null,"Tone.Transport.start()"),", let's set the BPM of our Tone.js project to 168. We do this by writing ",o.a.createElement("code",null,"Tone.Transport.bpm.value = 168;")," "),o.a.createElement("li",null,"Underneath the point that we call ",o.a.createElement("code",null,"Tone.Transport.start()")," in the init() function, assign a new instance of DrumBackingTrack to our variable. We're starting off all the patterns in our class in the constructor so now you should be hearing your drum beat!")),o.a.createElement("p",null),o.a.createElement("h2",null,"Task 3 - Bass"),o.a.createElement("h3",null,"Part 1"),o.a.createElement("p",null,"OK now we're going to do the bass part, it's going to work in exactly the same way. So go ahead and create a class called BassBackingTrack just below the DrumBackingTrack one in sounds.js."),o.a.createElement("p",null,"We are not supplying the code for this bit as you have done it so many times now!"),o.a.createElement("h3",null,"Part 2"),o.a.createElement("p",null),o.a.createElement("p",null,"OK, now in the constructor of the BassBackingTrack class, let's add our bass synth and connect it to the master output and the reverb for a bit of space. Take a look through the comments and follow the URL to understand what's going on."),o.a.createElement("code",null,o.a.createElement(c.a,{text:' // BASS\n    this.bass = new Tone.FMSynth({\n      // https://tonejs.github.io/docs/14.7.58/FMSynth.html\n      volume: -14, // reduce volume by 14 dB\n      harmonicity: 3, // set harmonicity to 3 - the ratio between the two voices\n      modulationIndex: 3.5, // set modulation index amount - this is basically the amount of modulation\n      oscillator: {\n        // setting a custom oscillator wave form with specific partials\n        type: "custom",\n        partials: [0, 1, 0, 2]\n      },\n      envelope: {\n        //  percussive amplitude envelope\n        attack: 0.08,\n        decay: 0.3,\n        sustain: 0\n      },\n      modulation: {\n        // using sawtooth wave as the modulator\n        type: "sawtooth"\n      },\n      modulationEnvelope: {\n        // fairly slow attack on the modulation envelope which controls modulation amount\n        attack: 0.1,\n        decay: 0.2,\n        sustain: 0.3,\n        release: 0.01\n      }\n    }).toDestination(); // connect bass to master\n    this.bass.connect(reverb); // connect bass to reverb',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"Still in the constructor, let's create our bass part. This one is a bit more complex in terms of adding a bit of variation. We bake in that variation by using the probability key, as well as how note number and note length. This is then used by the Tone.Part's callback function to trigger the bass notes:"),o.a.createElement("code",null,o.a.createElement(c.a,{text:'this.bassPart = new Tone.Part( // https://tonejs.github.io/docs/14.7.58/Part.html\n      function (time, event) {\n        // our callback function\n        if (Math.random() < event.prob) {\n          // is a random float between 0 and 1 (exlusive) less than the probability we\'ve set below?\n          this.bass.triggerAttackRelease(event.note, event.dur, time); // trigger our bass sound with the corresponding note array below\n        }\n      }.bind(this), // we bind this callback function to the current execution context so that "this" relates to our object instance, not the anonymous callback function\'s "this"\n      [\n        // an array of JS objects containing note data for timing, note number, duration and probability which is used in the callback above\n        { time: "0:0", note: "C2", dur: "4n.", prob: 1 },\n        { time: "0:2", note: "C2", dur: "8n", prob: 0.6 },\n        { time: "0:2.6666", note: "C2", dur: "8n", prob: 0.4 },\n        { time: "0:3.33333", note: "C2", dur: "8n", prob: 0.9 },\n        { time: "1:0", note: "C2", dur: "4n.", prob: 1 },\n        { time: "1:2", note: "C2", dur: "8n", prob: 0.6 },\n        { time: "1:2.6666", note: "C2", dur: "8n", prob: 0.4 },\n        { time: "1:3.33333", note: "F2", dur: "8n", prob: 0.9 },\n        { time: "2:0", note: "F2", dur: "4n.", prob: 1 },\n        { time: "2:2", note: "F2", dur: "8n", prob: 0.6 },\n        { time: "2:2.6666", note: "F2", dur: "8n", prob: 0.4 },\n        { time: "2:3.33333", note: "F2", dur: "8n", prob: 0.9 },\n        { time: "3:0", note: "F2", dur: "4n.", prob: 1 },\n        { time: "3:2", note: "F2", dur: "8n", prob: 0.6 },\n        { time: "3:2.6666", note: "F2", dur: "8n", prob: 0.4 },\n        { time: "3:3.33333", note: "F1", dur: "8n", prob: 0.9 }\n      ]\n    ).start("1m"); // start 1 measure (1 bar) after the Tone.Transport has started. This ensures everything starts together\n\n    this.bassPart.loop = true; // loop our part\n    this.bassPart.loopEnd = "4m"; // make sure we loop every 4 measures (bars)',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),o.a.createElement("p",null),o.a.createElement("p",null,"Right, finally, you have to follow the same steps as with the DrumBackingTrack: import in index.js; define a global variable; initialise that variable with a new instance of BassBackingTrack "),o.a.createElement("p",null,"OK so hopefully now you have made a cool little endless runner project with sound design and music! Here are some stretch goals:",o.a.createElement("ul",null,o.a.createElement("li",null,"Try going through and customising some of the sounds/patterns and making them your own."),o.a.createElement("li",null,"Can you increase the tempo of the music as time goes on? You will have to set the bpm property of ",o.a.createElement("a",{href:"https://tonejs.github.io/docs/14.7.58/Transport.html",target:"_blank"},"Tone.Transport"),". "),o.a.createElement("li",null,'What about implementing starting and stopping the bass and drum sequences based on interactions or "in world" events like timing or a certain number of collisions?'),o.a.createElement("li",null,'Or what about creating a new "Lead Synth" part?'))),o.a.createElement("p",null,"Right we're at the final task for this workshop hooray!  "),o.a.createElement("p",null,"Super important final task: go to file->export to .zip in your codesandbox and download your project!"),o.a.createElement("p",null,'Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 7_8".'),o.a.createElement(r.Link,{to:"/"},"Go back to the homepage"))}}}]);
//# sourceMappingURL=component---src-pages-workshop-08-js-a9db469cf3953d4980f7.js.map