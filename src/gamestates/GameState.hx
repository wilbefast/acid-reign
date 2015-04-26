class GameState
{
	// --------------------------------------------------------------------------
	// CONTEXT
	// --------------------------------------------------------------------------

	static var _all = new Map<String, GameState>();

	static var _current : GameState;

	// --------------------------------------------------------------------------
	// CREATION
	// --------------------------------------------------------------------------

	public function new(name : String)
	{
		if(_all.exists(name))
			throw "A GameState called '" + name + "' already exists";
		_all[name] = this;
		if(_current == null)
			_goto(this);
	}

	// --------------------------------------------------------------------------
	// NAVIGATION
	// --------------------------------------------------------------------------

	private function _goto(next : GameState)
	{
		if(_current != null)
			_current.onExit(next);
		next.onEnter(_current);
		_current = next;
	}

	public function goto(name : String)
	{
		var scene = _all.get(name);
		if(scene == null)
			throw "No GameState called '" + name + "' exists";
		_goto(scene);
	}

	// ----------------------------------
	// DISPATCH
	// ----------------------------------

	public static function pushEvent(name : String, 
		?args : Dynamic)
	{
		_current.onEvent(name, args);
	}

	public static function pushUpdate(dt : Float)
	{
		_current.onUpdate(dt);		
	}

	// ----------------------------------
	// OPTIONAL INTERFACE
	// ----------------------------------

	private function onUpdate(dt : Float) : Void
	{
		// override me
	}

	private function onEnter(source : GameState) : Void
	{
		// override me
	}

	private function onExit(destination : GameState) : Void
	{
		// override me
	}

	private function onEvent(name : String, ?args : Dynamic) : Void
	{
		// override me
	}
}