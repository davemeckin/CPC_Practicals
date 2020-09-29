
const WHEEL_RADIUS = 25.0;
const WHEEL_EXTRUDE = 2.2;


class Platter extends THREE.Mesh {

	

	constructor(position) {
		
		// make the platter geometry and extrude
		let texture = new THREE.TextureLoader().load( './images/6284.jpg' );
		texture.wrapT = THREE.RepeatWrapping;
		texture.wrapS = THREE.RepeatWrapping;
		//texture.repeat.set( 0.01225, 0.01225 );
		texture.repeat.set( 1/128, 1/128 );
		texture.offset.set( 0.5, 0.5 );
		
		let material = new THREE.MeshStandardMaterial( {
			map: texture,
			side: THREE.DoubleSide,
			color: new THREE.Color( 0xFFFFFF ),
			
		} );

		
	
		let wheelShape = new THREE.Shape();
		wheelShape.ellipse( 0.0, 0.0, WHEEL_RADIUS, WHEEL_RADIUS, Math.PI * -2.5,Math.PI * -0.5);

		let extrudeSettings = { depth: WHEEL_EXTRUDE, curveSegments: 128, bevelEnabled: false, bevelSegments: 16, steps: 5, bevelSize: 3.0, bevelThickness: 1.0 };
		let geometry = new THREE.ExtrudeGeometry( wheelShape, extrudeSettings );
		geometry.translate( position.x, position.y, position.z  );
		let centre = new THREE.Vector3();
		geometry.computeBoundingBox();
		geometry.boundingBox.getCenter(centre);
		geometry.center();
		
		
		
		super( geometry, material );
		// this.startingPosition = position;
		// let quaternion = new THREE.Quaternion().setFromAxisAngle( this.startingPosition.normalize(), 0.0 );
		// this.rotation.setEulerFromQuaternion( quaternion );
		this.position.copy(centre);
		//this.position.applyQuaternion( quaternion );
		this.castShadow = true;
		this.receiveShadow = true;
		}
	

	update(rotator) {
		
		this.rotation.z -= 0.025;
	}

	display() {
		
	}
}

class Plinth extends THREE.Mesh {

	

	constructor(position, size, incomingColour) {
		

		let plinthGeometry = new THREE.BoxGeometry(size.x,size.y,size.z);
		let plinthMaterial = new THREE.MeshPhongMaterial({
			color: incomingColour,
			specular: new THREE.Color( 0x131313 ),
			shininess: 5.0
			}); 
		plinthGeometry.translate( position.x, position.y, position.z - (WHEEL_EXTRUDE * 2) );
		//plinthGeometry.center();
		
		super( plinthGeometry, plinthMaterial );
		this.castShadow = true;
		this.receiveShadow = true;
		}
	

	update() {

	}

	display() {
		
	}
}

class Turntable extends THREE.Object3D {



	constructor(position, platterName) {
		super();
		this.mouseOverThis = false;

		this.platter = new Platter(position);
		this.platter.name = platterName;
		this.plinth = new Plinth(position, new THREE.Vector3(60,60,10), new THREE.Color( 0x434343 ));
		this.group = new THREE.Group();
		this.group.add(this.platter);
		this.group.add(this.plinth);

		this.intersected = null;

		this.add(this.group);
		
		
	}

	update(clicked, targetRotation, intersects, player) {

		let rotator = ( targetRotation - this.platter.rotation.z ) * 0.05;
		// if there is one (or more) intersections

			if ( intersects.length > 0 )
				{
					

				    // if the closest object intersected is not the currently stored intersection object
				    if ( intersects[ 0 ].object != this.intersected )
				    {
				        // restore previous intersection object (if it exists) to its original color
				        if ( this.intersected ) {
				            if (this.intersected.name === this.platter.name) {
				        	this.intersected.material.color.setHex( this.intersected.currentHex );
				    	}
				    }
				        // store reference to closest object as current intersection object
				        this.intersected = intersects[ 0 ].object;
				        // store color of closest object (for later restoration)
				        if (this.intersected.name === this.platter.name) {
										
										this.mouseOverThis = true;
										
										 this.intersected.currentHex = this.intersected.material.color.getHex();
								        // set a new color for closest object
								        this.intersected.material.color.setHex( 0xff00ff );
								        //console.log("this.intersected", this.intersected);
				       }
				       
				    }
				}
				else // there are no intersections
				{
				    // restore previous intersection object (if it exists) to its original color
				    if ( this.intersected ) {
				    	if (this.intersected.name === this.platter.name) {
				        	this.intersected.material.color.setHex( this.intersected.currentHex );
				    	}
				    }
				    // remove previous intersection object reference
				    //     by setting current intersection object to "nothing"
				    this.intersected = null;
				    this.mouseOverThis = false;
				}

				if ((clicked) && (this.mouseOverThis) && (rotator > 0)) {
					player.reverse = true;
					player.playbackRate = (Math.abs(rotator))*10;
					this.platter.rotation.z += rotator;
					//console.log((Math.abs(rotator))*10);
				} else if ((!clicked) && (!this.mouseOverThis) && (rotator > 0)){
					//player1.reverse = true;
					//console.log("hello");
					player.playbackRate = 1;

				} else if ((clicked) && (this.mouseOverThis) && (rotator < 0.0)) {
					//console.log(rotator);
					player.reverse = false;
					player.playbackRate = (Math.abs(rotator))*10;
					this.platter.rotation.z += rotator;
					//console.log((Math.abs(rotator))*10);
				} else if ((!clicked) && (!this.mouseOverThis) && (rotator < 0)) {
					//player1.reverse = false;
					player.playbackRate = 1;
					//this.platter.update(rotator);
				} else {
					player.playbackRate = 1;
				}
		this.platter.update(rotator);

	}

	display() {
		
	}
}


class Fader extends THREE.Mesh {
	constructor(position) {

		let wiperGeometry = new THREE.CylinderGeometry( 0.8 / Math.sqrt( 2 ), 1 / Math.sqrt( 2 ), 1, 4, 1 ); // size of top can be changed
		let wiperMaterial = new THREE.MeshLambertMaterial();
		let width = 4;
		let height = 4;
		let depth = 8;
		wiperGeometry.rotateY( Math.PI / 4 );

		wiperGeometry.computeFlatVertexNormals();
		wiperGeometry.translate( position.x, position.y + 10.5, position.z + 2.5);

		

		

		super( wiperGeometry, wiperMaterial );
		this.castShadow = true;
		this.receiveShadow = true;
		this.scale.set( width, height, depth );
		this.rotation.x = (Math.PI * 2) / 4;
	}

	update(mouseX) {
		//console.log(THREE.MathUtils.mapLinear(mouseX, -500,500, -10,10));
		this.position.x = THREE.MathUtils.mapLinear(mouseX, -200,200, -10,10);

	}

	display() {
		
	}
}

class Mixer extends THREE.Object3D{
	constructor(position) {
		super();
		this.mouseOverThis = false;
		this.mouseOverThis = false;

		this.fader = new Fader(position);
		this.fader.name = "fader";
		this.plinth = new Plinth(position, new THREE.Vector3(40,40,10), new THREE.Color( 0xD3D3D3 ));
		this.group = new THREE.Group();
		this.group.add(this.fader);
		this.group.add(this.plinth);

		this.intersected = null;

		this.add(this.group);
		
	}

	update(clicked, mouseX, intersects, crossFade) {

		if ( intersects.length > 0 )
				{
					

				    // if the closest object intersected is not the currently stored intersection object
				    if ( intersects[ 0 ].object != this.intersected )
				    {
				        // restore previous intersection object (if it exists) to its original color
				        if ( this.intersected ) {
				            if (this.intersected.name === this.fader.name) {
				        	this.intersected.material.color.setHex( this.intersected.currentHex );
				    	}
				    }
				        // store reference to closest object as current intersection object
				        this.intersected = intersects[ 0 ].object;
				        // store color of closest object (for later restoration)
				        if (this.intersected.name === this.fader.name) {
										
										this.mouseOverThis = true;
										
										 this.intersected.currentHex = this.intersected.material.color.getHex();
								        // set a new color for closest object
								        this.intersected.material.color.setHex( 0xff0000 );

								        
				       }
				       
				    }
				}
				else // there are no intersections
				{
				    // restore previous intersection object (if it exists) to its original color
				    if ( this.intersected ) {
				    	if (this.intersected.name === this.fader.name) {
				        	this.intersected.material.color.setHex( this.intersected.currentHex );
				    	}
				    }
				    // remove previous intersection object reference
				    //     by setting current intersection object to "nothing"
				    this.intersected = null;
				    this.mouseOverThis = false;
				}

				if ((clicked) && (this.mouseOverThis)) {
					let xfade  = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(mouseX, -200,200, 0.0,1.0),0.0,1.0);

					console.log(xfade);
					crossFade.fade.value = xfade;
					this.fader.update(mouseX);
				}
					
				 else {
					
				}
		

	}

	display() {
		
	}
}

class Table {
	constructor() {
		
	}

	update() {

	}

	display() {
		
	}
}