class GameState
{
	// ----------------------------------
	// OPTIONAL INTERFACE
	// ----------------------------------

	public function onUpdate(dt : Float) : Void
	{
		// override me
	}

	public function onEnter(source : GameState) : Void
	{
		// override me
	}

	public function onExit(destination : GameState) : Void
	{
		// override me
	}

	public function onResize() : Void
	{
		// override me
	}

	public function onEvent(name : String, ?args : Dynamic) : Void
	{
		// override me
	}
}