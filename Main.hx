import hxd.Math;
import h3d.scene.DirLight;
import h3d.scene.Mesh;
import h3d.prim.Cube;
import h3d.Vector;

class Main extends hxd.App 
{
	override function init() 
	{
		var prim = new Cube();
		prim.translate( -0.5, -0.5, -0.5);
		prim.addNormals();
	
		for(x in 0...10)
		{
			for(y in 0...10)
			{
				var b = new Mesh(prim, s3d);
				b.x = x - 5;
				b.y = y - 5;
				b.scaleZ = 5;
				b.z = Math.floor(Math.random(4));
				trace(b.z);
				b.material.color.setColor(0xFFFFFF);
				b.material.mainPass.enableLights = true;	
			}
		}

		// set up the camera
		s3d.camera.zNear = 2;
		s3d.camera.pos.set(0, -6, 27);
		s3d.camera.target.set(0, 0, 0);

		// set up light
		s3d.lightSystem.ambientLight.set(0.2, 0.2, 0.2);
		var sun = new DirLight(new Vector(0, 1, -2), s3d);
		sun.color.set(0.5, 0.5, 0.5);

		// done
		engine.render(s3d);
	}

	override function update( dt : Float ) 
	{
	}

	static function main() 
	{
		new Main();
	}

}
