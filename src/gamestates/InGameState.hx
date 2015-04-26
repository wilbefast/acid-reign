class InGameState extends GameState
{
	public function new()
	{
	}

	// ----------------------------------
	// IMPLEMENTS GAMESTATE
	// ----------------------------------

	public override function onEnter(source : GameState) : Void
	{
		trace("Entered InGame");
	}
	
}