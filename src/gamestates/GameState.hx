class GameState
{
	public function new()
	{

	}

	// ----------------------------------
	// OPTIONAL INTERFACE
	// ----------------------------------

	public function onUpdate(dt : Float) : Void
	{
		// override me
	}

	public function onEnter(s2d : h2d.Scene, s3d : h3d.scene.Scene, 
		source : GameState) : Void
	{
		// override me
	}

	public function onExit(destination : GameState) : Void
	{
		// override me
	}

	public function onResize(width : Int, height : Int) : Void
	{
		// override me
	}

	public function onEvent(name : String, ?args : Dynamic) : Void
	{
		// override me
	}
}