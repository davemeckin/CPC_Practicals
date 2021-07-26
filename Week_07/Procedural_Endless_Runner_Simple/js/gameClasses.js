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

        this.geometry = new THREE.PlaneGeometry( 1000, 5000, 9, 100  );
        for ( let i = 0; i < this.geometry.vertices.length; i ++ ) {
            let vertex = this.geometry.vertices[i];
            //vertex.x += ( Math.random() * 30 ) - 15;
            vertex.y += ( Math.random() * 30 ) - 15;
        }

        

        for ( let i = 0, l = this.geometry.faces.length; i < l; i++ ) {
          let face = this.geometry.faces[ i ];
          face.vertexColors[ 0 ] = new THREE.Color().setHSL( 0.33,
                      THREE.MathUtils.randFloat(0.5,1.0),
                      THREE.MathUtils.randFloat(0.5,1.0));
          face.vertexColors[ 1 ] = new THREE.Color().setHSL( 0.33,
                      THREE.MathUtils.randFloat(0.5,1.0),
                      THREE.MathUtils.randFloat(0.5,1.0));
          face.vertexColors[ 2 ] = new THREE.Color().setHSL( 0.33,
                      THREE.MathUtils.randFloat(0.5,1.0),
                      THREE.MathUtils.randFloat(0.5,1.0));
        }
        //this.geometry = new THREE.PlaneBufferGeometry( 10000, 10000, 384, 384 );
        this.material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
        this.mesh1 = new THREE.Mesh( this.geometry, this.material );

        this.mesh1.position.x = this.mesh1.position.y = 0;
        this.mesh1.position.z = 1000;
        this.mesh1.receiveShadow = true;
        this.mesh1.rotation.set(Math.PI * -0.5, 0, 0);

        this.mesh2 = new THREE.Mesh( this.geometry, this.material );

        this.mesh2.position.x = this.mesh2.position.y = 0;
        this.mesh2.receiveShadow = true;

        this.mesh2.position.z = -4000;
        this.mesh2.rotation.set(Math.PI * -0.5, 0, 0);

        this.groundGroup = new THREE.Group();
        this.groundGroup.add(this.mesh1);
        this.groundGroup.add(this.mesh2);


        scene.add( this.groundGroup);
        
  }

  reset() {

  }

  update(camera) {
   
    // move groundMesh
        if (this.mesh1.position.z-2500 > camera.position.z - 500 ) {
          this.mesh1.position.z -= 5000;
          console.log("moveMesh1",this.mesh1.position.z )
        }
        if (this.mesh2.position.z-2500 > camera.position.z - 500 ) {
          this.mesh2.position.z -= 5000;
          console.log("moveMesh2",this.mesh2.position.z)
        }

  }
}

class Avatar extends Entity {
  
  constructor(scene) {
    super();
    this.collidable = true;
    this.size = 5.0;
    this.radius = 5.0;

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

  update(speed, ground, obstacles, now) {
    super.update();
  
    this.hero.rotation.x -= 0.2;
  

    if ( this.collidedWithObstacle(obstacles) )
    {
        console.log(" ------ CRASH ------- ");
        this.synth.play(now);
    }

    this.hero.position.z -= speed;

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
        let collidedWith = (this.size + that.size) > this.distanceTo(that.meshGroup.position.x,  that.meshGroup.position.z);
        //  console.log("IsCollidedWith() " + collidedWith + " " + (this.size + that.size));
        //console.log(this.distanceTo(that.meshgroup.position.x,  that.meshgroup.position.z),n);
        return collidedWith;
    }

    collidedWithObstacle(obstacles) {
        for(var n=0; n<obstacles.length; n++) {
            if ( obstacles[n].collidable == true ) {
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
      super();

      this.collidable = true;
      this.size = 5.0;
      this.collidable = true;
      this.geometry = new THREE.ConeGeometry( 0.5, 1, 7, 21);
      this.material = new THREE.MeshStandardMaterial( { color: 0x23ff23 ,flatShading: true} )
      this.meshGroup = new THREE.Group();
      this.meshArray = [];
      for (let i = 0; i < 3; i++) {
      	this.meshArray.push(this.mesh = new THREE.Mesh( this.geometry, this.material ));
      	this.meshArray[i].position.y = 0.75+(i*0.25);
  	  	this.meshArray[i].scale.set(0.7-(i*0.25), 0.7-(i*0.25), 0.7-(i*0.25));
  	  	this.meshGroup.add(this.meshArray[i]);
      }

      

  	  this.meshGroup.position.x = x;
      this.meshGroup.position.y = y;
  	  this.meshGroup.position.z = z;
      this.meshGroup.scale.set(10,10,10);
 
	  
	   scene.add(this.meshGroup);

  }

  reset() {
  	super.reset();
  }

  update() {
      super.update();
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
    
    this.pattern.index = 0;
    this.pattern.start();
    this.pattern.stop(Tone.now()+0.05);
  }

}



