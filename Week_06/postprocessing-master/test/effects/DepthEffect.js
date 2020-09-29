import test from "ava";
import { DepthEffect } from "../../build/postprocessing.esm.js";

test("can be created and destroyed", t => {

	const object = new DepthEffect();
	object.dispose();

	t.truthy(object);

});
