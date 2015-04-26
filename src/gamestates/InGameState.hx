class InGameState extends GameState
{
	public function new()
	{
		super("InGame");
	}

	// ----------------------------------
	// IMPLEMENTS GAMESTATE
	// ----------------------------------

	private override function onEnter(source : GameState) : Void
	{
		trace("Entered InGame");
	}
	
}