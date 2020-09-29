class Entity {
	constructor(scene) {
		// this.geometry = new THREE.BoxGeometry( 1, 1);
  //   	this.material = new THREE.MeshNormalMaterial( );
  //   	this.plane = new THREE.Mesh( this.geometry, this.material );
  //   	scene.add( this.plane );
	}

	reset() {

	}

	update() {

	}
}

class Environment extends Entity {
  constructor(scene) {
        super();
        this.size = 0;
        this.collidable = false;

       // this.geometry = new THREE.PlaneGeometry( 2000, 2000, 256, 256 );
        this.geometry = new THREE.PlaneBufferGeometry( 10000, 10000, 384, 384 );
        this.material = new THREE.MeshLambertMaterial({ color: 0x007F00});
        this.mesh = new THREE.Mesh( this.geometry, this.material );

        this.mesh.position.x = this.mesh.position.y = this.mesh.position.z = 0;

        this.mesh.rotation.set(Math.PI * -0.5, 0, 0);

        

        var perlin = new Perlin();
        var peak = 15;
        var smoothing = 5;

        var vertices = this.geometry.attributes.position.array;
        for (var i = 0; i < vertices.length; i += 3) {
            vertices[i+2] = peak * perlin.noise(
                (this.mesh.position.x + vertices[i])/smoothing, 
                (this.mesh.position.z + vertices[i+1])/smoothing
            );
            //console.log(vertices[i]);
        }
        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.computeVertexNormals();


        scene.add( this.mesh );
  }

  reset() {

  }

  update() {

  }
}

class Avatar extends Entity {
  
  constructor(scene) {
    super();
    this.collidable = true;
    this.size = 5.0;
    this.radius = 1.75;

    //add items to scene
    this.sphereGeometry = new THREE.DodecahedronGeometry( this.radius, 1);
    this.sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xe5f2f2 ,flatShading: true} )
    this.hero = new THREE.Mesh( this.sphereGeometry, this.sphereMaterial );
    this.hero.castShadow=true;
    this.hero.receiveShadow=true;
    this.hero.position.y=1;
    scene.add( this.hero );
    this.synth = new CrashSound();
  }

  reset() {

  }

  update(ground, obstacles, now) {
    super.update();
  
    this.hero.rotation.x -= 0.2;

    let raycaster = new THREE.Raycaster();
 
    let distance = 3; 
    let delta = 0.001;
    let direction = new THREE.Vector3(0, -1, 0);
  
    raycaster.set(this.hero.position, direction);

    var velocity = new THREE.Vector3();
   
    let intersects = raycaster.intersectObject(ground.mesh); //use intersectObjects() to check the intersection on multiple
    
    //new position 
    if(intersects.length > 0) {
      if (distance > intersects[0].distance) {        
          this.hero.position.y += (distance - intersects[0].distance) - 1; // the -1 is a fix for a shake effect I had
      }

      //gravity and prevent falling through floor
      if (distance >= intersects[0].distance && velocity.y <= 0) {
          velocity.y = 0;
      } else if (distance <= intersects[0].distance && velocity.y === 0) {
          velocity.y -= delta ;
      }
      this.hero.translateY(velocity.y);
     }

    if ( this.collidedWithObstacle(obstacles) )
    {
        console.log(" ------ CRASH ------- ");
        this.synth.play(now);
    }

    this.hero.position.z -= 0.5;
  //  console.log(this.synth.pattern.state);

  }

  distanceTo(x, z) {
        // (xA-xB)²+(yA-yB)²+(zA-zB)² < (rA+rB)²

        let dist = Math.abs ( Math.sqrt (
                        ( ( this.hero.position.x - x ) * ( this.hero.position.x - x ) ) +
                        ( ( this.hero.position.z - z ) * ( this.hero.position.z - z ) )
                    ) );

        //  console.log("DistanceTo() = " + dist);
        return dist;
    }

   isCollidedWith(that) {
        // size + size > distance
        let collidedWith = (this.size + that.size) > this.distanceTo(that.meshgroup.position.x,  that.meshgroup.position.z);
        //  console.log("IsCollidedWith() " + collidedWith + " " + (this.size + that.size));
        //console.log(this.distanceTo(that.meshgroup.position.x,  that.meshgroup.position.z),n);
        return collidedWith;
    }

    collidedWithObstacle(obstacles) {
        for(var n=0; n<obstacles.length; n++) {
            if ( obstacles[n].collidable == true ) {
              //console.log("in here", obstacles);
                if ( this.isCollidedWith(obstacles[n]) == true ) {
                  obstacles[n].material.color.setHex(0xff0000);
                  obstacles.splice(n,1);
                    return true;
                }
            }
        }
        return false;
    }
}

class TreeObstacle extends Entity {

  constructor(x, y, z, ground, scene) {
      super()

      let raycaster = new THREE.Raycaster();
      let direction = new THREE.Vector3(0, -1, 0);
      let distance = -2; 
      let velocity = new THREE.Vector3();
      let delta = -0.1;

      this.collidable = true;
      this.size = 5.0;
      this.collidable = true;
      this.geometry = new THREE.ConeGeometry( 0.5, 1, 7, 21);
      this.material = new THREE.MeshStandardMaterial( { color: 0x23ff23 ,flatShading: true} )
      this.meshgroup = new THREE.Group();
      this.meshArray = [];
      for (let i = 0; i < 3; i++) {
      	this.meshArray.push(this.mesh = new THREE.Mesh( this.geometry, this.material ));
      	this.meshArray[i].position.y = 0.75+(i*0.25);
  	  	this.meshArray[i].scale.set(0.7-(i*0.25), 0.7-(i*0.25), 0.7-(i*0.25));
  	  	this.meshgroup.add(this.meshArray[i]);
      }

      

  	  this.meshgroup.position.x = x;
      this.meshgroup.position.y = y;
  	  this.meshgroup.position.z = z;
      this.meshgroup.scale.set(10,10,10);

      raycaster.set(this.meshgroup.position, direction);
      let intersects = raycaster.intersectObject(ground.mesh);
      if(intersects.length > 0) {
       
        //if (distance < intersects[0].distance) {  
           
            this.meshgroup.position.y = intersects[0].point.y; // the -1 is a fix for a shake effect I had
            console.log(intersects[0],this.meshgroup.position.y); 
        //}
        //   //gravity and prevent falling through floor
        // if (distance >= intersects[0].distance && velocity.y <= 0) {
        //     velocity.y = 0;
        // } else if (distance <= intersects[0].distance && velocity.y === 0) {
        //     velocity.y -= delta ;
        // }
        // this.meshgroup.translateY(velocity.y);
      }

      

      

      
	  
	   scene.add(this.meshgroup);

  }

  reset() {
  	super.reset();
  }

  update() {
      super.update();
      //this.meshgroup.position.z += 0.01;
  }
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}


class CrashSound extends Entity {

  constructor() {
      super();
      this.synth = new Tone.PolySynth({
         "volume": -10,
        
      }).toDestination();
      this.synth.set({
        envelope: {
          attack: 0.001,
          decay: 0.3,
          sustain: 0.01,
          release: 0.3,
          }
        });
      this.synth.set({"oscillator": {
                "type": "square" 
                }
      });

      this.pattern = new Tone.Pattern((function(time, note){
        this.synth.triggerAttackRelease(note, "16n");
        }).bind(this), ["C4","C5", "D4", "D5","E5", "E5","C6", "D6", "E6","F6", "G6"], "up");
        //https://tonejs.github.io/docs/r12/CtrlPattern

      this.pattern.loop = false;
      this.pattern.interval = "32n";
    
  }

  reset() {

  }

  play(now) {
    
    //this.synth.triggerAttackRelease("C5", "4n");
    this.pattern.index = 0;
    this.pattern.start();
    this.pattern.stop(Tone.now()+0.05);
  }

}



/**************************************/

/* THIS IS AN IMPLEMENTATION OF PERLIN NOISE FROM ANOTHER PROGRAMMER, YOU DO NOT NEED TO UNDERSTAND THE INNER WORKINGS, JUST HOW TO USE IT*/

/* THIS CODE IS TAKEN FROM here: https://github.com/stephanbaker/PerlinTerrain, which referenced this: https://gist.github.com/banksean/304522#file-perlin-noise-simplex-js */

class Perlin {
    constructor() {
        this.grad3 =    
            [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0], 
            [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1], 
            [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]; 
        this.p = [];
        for (var i=0; i<256; i++) {
            this.p[i] = Math.floor(Math.random()*256);
        }
        
        // To remove the need for index wrapping, double the permutation table length 
        this.perm = []; 
        for(i=0; i<512; i++) {
            this.perm[i]=this.p[i & 255];
        } 

        // A lookup table to traverse the simplex around a given point in 4D. 
        // Details can be found where this table is used, in the 4D noise method. 
        this.simplex = [ 
            [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0], 
            [0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0], 
            [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], 
            [1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0], 
            [1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0], 
            [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], 
            [2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0], 
            [2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]; 
    }

    dot(g, x, y) { 
        return g[0]*x + g[1]*y;
    }

    noise(xin, yin) { 
        var n0, n1, n2; // Noise contributions from the three corners 
        // Skew the input space to determine which simplex cell we're in 
        var F2 = 0.5*(Math.sqrt(3.0)-1.0); 
        var s = (xin+yin)*F2; // Hairy factor for 2D 
        var i = Math.floor(xin+s); 
        var j = Math.floor(yin+s); 
        var G2 = (3.0-Math.sqrt(3.0))/6.0; 
        var t = (i+j)*G2; 
        var X0 = i-t; // Unskew the cell origin back to (x,y) space 
        var Y0 = j-t; 
        var x0 = xin-X0; // The x,y distances from the cell origin 
        var y0 = yin-Y0; 
        // For the 2D case, the simplex shape is an equilateral triangle. 
        // Determine which simplex we are in. 
        var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords 
        if(x0>y0) {i1=1; j1=0;} // lower triangle, XY order: (0,0)->(1,0)->(1,1) 
        else {i1=0; j1=1;}      // upper triangle, YX order: (0,0)->(0,1)->(1,1) 
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and 
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where 
        // c = (3-sqrt(3))/6 
        var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords 
        var y1 = y0 - j1 + G2; 
        var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords 
        var y2 = y0 - 1.0 + 2.0 * G2; 
        // Work out the hashed gradient indices of the three simplex corners 
        var ii = i & 255; 
        var jj = j & 255; 
        var gi0 = this.perm[ii+this.perm[jj]] % 12; 
        var gi1 = this.perm[ii+i1+this.perm[jj+j1]] % 12; 
        var gi2 = this.perm[ii+1+this.perm[jj+1]] % 12; 
        // Calculate the contribution from the three corners 
        var t0 = 0.5 - x0*x0-y0*y0; 
        if(t0<0) n0 = 0.0; 
        else { 
            t0 *= t0; 
            n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);  // (x,y) of grad3 used for 2D gradient 
        } 
        var t1 = 0.5 - x1*x1-y1*y1; 
        if(t1<0) n1 = 0.0; 
        else { 
            t1 *= t1; 
            n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1); 
        }
        var t2 = 0.5 - x2*x2-y2*y2; 
        if(t2<0) n2 = 0.0; 
        else { 
            t2 *= t2; 
            n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2); 
        } 
        // Add contributions from each corner to get the final noise value. 
        // The result is scaled to return values in the interval [-1,1]. 
        return 70.0 * (n0 + n1 + n2); 
    }
}