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
		// prepare the player cubeitive
		var sphere = new h3d.prim.Sphere();
		sphere.translate(0, 0, 0.5);
		sphere.addNormals();

		// prepare the tile cubeitive
		var cube = new Cube();
		cube.translate( -0.5, -0.5, -0.5);
		cube.addNormals();
	
		// ground tiles
		var player : h3d.scene.Object = null;
		for(x in -5...5)
		{
			for(y in -5...5)
			{
				if(Math.random() > 0.5 || (x == 0 && y == 0))
				{
					var tile = new Mesh(cube, s3d);
					tile.x = x;
					tile.y = y;
					tile.scaleZ = 5;
				
					tile.z = Math.floor(Math.random(4));
					tile.material.color.setColor(0xFFFF80);
					tile.material.mainPass.enableLights = true;	
				
					if(x == 0 && y == 0)
					{
						player = new Mesh(sphere, s3d);
						player.x = x;
						player.y = y;
						player.scale(0.5);
						player.z = tile.z + 3;
						tile.material.color.setColor(0xFFFFFF);
						tile.material.mainPass.enableLights = true;	
					}
				}
			}
		}

		// acid
		var acid = new Mesh(cube, s3d);
		acid.x = acid.y = acid.z = 0;
		acid.scaleX = acid.scaleY = 15;
		acid.material.color.setColor(0x00FF00);
		acid.material.mainPass.enableLights = true;

		// set up the camera
		s3d.camera.zNear = 2;
		s3d.camera.pos.set(0, -6, 27);
		//s3d.camera.follow = { target : player };

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