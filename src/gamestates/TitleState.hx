import hxd.Res;

import hxd.Math;
import hxd.Key in K;
import hxd.Res;

import h2d.Text;

class TitleState extends GameState
{
	var text : h2d.Text;
	
	// ----------------------------------
	// IMPLEMENTS GAMESTATE
	// ----------------------------------

	public override function onEnter(s2d : h2d.Scene, s3d : h3d.scene.Scene,
		source : GameState) : Void
	{
		var font = Res.trueTypeFont.build(64);

		text = new Text(font, s2d);
		text.textColor = 0xFFFFFF;
		text.dropShadow = { dx : 3, dy : 3, color : 0x00FF00, alpha : 0.8 };
		text.text = "Acid Reign";
	}


	// if we the window has been resized
	public override function onResize(width : Int, height : Int) 
	{
		// move our text up/down accordingly
		if( text != null ) 
		{
			var b = text.getBounds();
			trace(b);
			text.x = (width - b.width) * 0.5;
			text.y = (height - b.height) * 0.5;
		}
	}


	public override function onUpdate(dt : Float)
	{
		if(K.isPressed(K.ENTER))
			Main.instance.gotoState("InGame");
	}

}