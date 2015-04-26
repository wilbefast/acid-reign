import h3d.scene.DirLight;
import h3d.scene.Mesh;
import h3d.prim.Cube;
import h3d.Vector;

import hxd.Key in K;
import hxd.Math;

class InGameState extends GameState
{
	// ----------------------------------
	// IMPLEMENTS GAMESTATE
	// ----------------------------------

	public override function onEnter(s2d : h2d.Scene, s3d : h3d.scene.Scene, 
		source : GameState) : Void
	{
		// prepare the tile primitive
		var prim = new Cube();
		prim.translate( -0.5, -0.5, -0.5);
		prim.addNormals();
	
		// ground tiles
		for(x in 0...10)
		{
			for(y in 0...10)
			{
				if(Math.random() > 0.5)
				{
					var tile = new Mesh(prim, s3d);
					tile.x = x - 5;
					tile.y = y - 5;
					tile.scaleZ = 5;
					tile.z = Math.floor(Math.random(4));
					tile.material.color.setColor(0xFFFF80);
					tile.material.mainPass.enableLights = true;	
				}
			}
		}

		// acid
		var acid = new Mesh(prim, s3d);
		acid.x = acid.y = acid.z = 0;
		acid.scaleX = acid.scaleY = 15;
		acid.material.color.setColor(0x00FF00);
		acid.material.mainPass.enableLights = true;

		// set up the camera
		s3d.camera.zNear = 2;
		s3d.camera.pos.set(0, -6, 27);
		s3d.camera.target.set(0, 0, 0);

		// set up light
		s3d.lightSystem.ambientLight.set(0.2, 0.2, 0.2);
		var sun = new DirLight(new Vector(0, 1, -2), s3d);
		sun.color.set(0.5, 0.5, 0.5);

	}
	
	public override function onUpdate(dt : Float)
	{
		if(K.isPressed(K.ESCAPE))
			Main.instance.gotoState("Title");
	}
}