import h2d.Res;
import h2d.Text;

class TitleState extends GameState
{
	public function new()
	{
		super("Title");
	}
	
	// ----------------------------------
	// IMPLEMENTS GAMESTATE
	// ----------------------------------

	private override function onEnter(source : GameState) : Void
	{
		trace("Entered Title");

		// load a true type font, can be not very high quality
		var font = Res.trueTypeFont.build(64);

		// creates a text display with the given font
		var tf = new Text(font, s2d);

		// set the text color
		tf.textColor = 0xFFFFFF;

		// adds a red shadow
		tf.dropShadow = { dx : 3, dy : 3, color : 0xFF0000, alpha : 0.8 };

		// set the text color
		tf.text = "Héllò h2d !";

		// set the text position
		tf.x = 20;
		tf.y = s2d.height - 80;		
	}
}