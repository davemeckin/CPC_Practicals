import WebGPUBinding from './WebGPUBinding.js';

class WebGPUSampledTexture extends WebGPUBinding {

	constructor( name ) {

		super( name );

		this.dimension = '2d';

		this.type = 'sampled-texture';
		this.visibility = GPUShaderStage.FRAGMENT;

		this.textureGPU = null; // set by the renderer

		Object.defineProperty( this, 'isSampledTexture', { value: true } );

	}


}

class WebGPUSampledCubeTexture extends WebGPUSampledTexture {

	constructor( name ) {

		super( name );

		this.dimension = 'cube';

		Object.defineProperty( this, 'isSampledCubeTexture', { value: true } );

	}

}

export { WebGPUSampledTexture, WebGPUSampledCubeTexture };
