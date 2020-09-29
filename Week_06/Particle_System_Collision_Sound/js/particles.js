// Particle System Class

class ParticleSystem {
  


  constructor(startPosition) {
    this.particles = [];
    this.position = startPosition;
  }



   addParticle(scene) {
   	let newParticle = new Particle(new THREE.Vector3(THREE.MathUtils.randFloat(-1,1),THREE.MathUtils.randFloat(-1,1),THREE.MathUtils.randFloat(-1,1)),new THREE.Vector3(0.5,0.5,0.5),new THREE.Color( 0xFF0000 ));
    this.particles.push(newParticle);
    //console.log(this.particles);
    scene.add(newParticle);
  }

   update(scene) {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i,1); //remove from array
        this.particles[i].geometry.dispose();
		this.particles[i].material.dispose();
		scene.remove( this.particles[i] );
       // console.log("particle ", i, " died");
      }
    }
  }
}


// Particle Class

class Particle extends THREE.Mesh {

	constructor(position, size, incomingColour) {
		
		let geometry = new THREE.BoxGeometry(size.x,size.y,size.z);
		let material = new THREE.MeshPhongMaterial({
			color: incomingColour,
			specular: new THREE.Color( 0x131313 ),
			shininess: 5.0
			}); 
		super( geometry, material );
		
		this.particleGeometry = geometry;
		this.particleMaterial = material;
		this.colour = incomingColour;
		this.castShadow = true;
		this.receiveShadow = true;

		this.currentPosition = position;
		this.acceleration = new THREE.Vector3(0.0,-0.005,0.0);
		this.velocity = new THREE.Vector3(THREE.MathUtils.randFloat(-1,1),THREE.MathUtils.randFloat(-1,1),THREE.MathUtils.randFloat(-1,1));
		this.lifespan = 255;

		this.translateOnAxis( position, 0.01 );
	}

	update(){
		this.velocity.add(this.acceleration);
		this.currentPosition.add(this.velocity);
		this.translateOnAxis(this.currentPosition,0.01);
		//console.log(this.position);
		this.lifespan -= 1;
		this.particleMaterial.color = new THREE.Color(this.lifespan/255,0,0);
	}


	isDead() {
	    if (this.lifespan < 0.0) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
}