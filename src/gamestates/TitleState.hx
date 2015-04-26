import hxd.Res;

import h2d.Text;












import hxd.Math;
import hxd.Key in K;
import hxd.Res;

import h3d.scene.DirLight;
import h3d.scene.Mesh;
import h3d.prim.Cube;
import h3d.Vector;






class TitleState extends GameState
{
	var text : h2d.Text;

	public function new()
	{
	}
	
	// ----------------------------------
	// IMPLEMENTS GAMESTATE
	// ----------------------------------

	public override function onEnter(source : GameState) : Void
	{
		var font = Res.trueTypeFont.build(64);

		text = new Text(font, Global.s2d);
		text.textColor = 0xFFFFFF;
		text.dropShadow = { dx : 3, dy : 3, color : 0x00FF00, alpha : 0.8 };
		text.text = "Acid Reign";
		//text.textAlign = h2d.Align.Center;

		var b = text.getBounds();
		trace(b);
		text.x = (Global.s2d.width - b.width) * 0.5;
		text.y = (Global.s2d.height - b.height) * 0.5;









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
					var tile = new Mesh(prim, Global.s3d);
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
		var acid = new Mesh(prim, Global.s3d);
		acid.x = acid.y = acid.z = 0;
		acid.scaleX = acid.scaleY = 15;
		acid.material.color.setColor(0x00FF00);
		acid.material.mainPass.enableLights = true;

		// set up the camera
		Global.s3d.camera.zNear = 2;
		Global.s3d.camera.pos.set(0, -6, 27);
		Global.s3d.camera.target.set(0, 0, 0);

		// set up light
		Global.s3d.lightSystem.ambientLight.set(0.2, 0.2, 0.2);
		var sun = new DirLight(new Vector(0, 1, -2), Global.s3d);
		sun.color.set(0.5, 0.5, 0.5);

		// done
		Global.engine.render(Global.s3d);




	}


	// if we the window has been resized
	public override function onResize() 
	{
		// move our text up/down accordingly
		if( text != null ) 
		{
			var b = text.getBounds();
			trace(b);
			text.x = (Global.s2d.width - b.width) * 0.5;
			text.y = (Global.s2d.height - b.height) * 0.5;
		}
	}

}