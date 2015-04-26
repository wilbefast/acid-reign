class GameStateManager
{
	// --------------------------------------------------------------------------
	// SINGLETON
	// --------------------------------------------------------------------------

	private var _current : GameState = null;

	private static var _instance : GameStateManager;

	private function new()
	{
	}

	public static function get()
	{
		if(_instance == null)
			_instance = new GameStateManager();
		return _instance;
	}

	// --------------------------------------------------------------------------
	// NAVIGATION
	// --------------------------------------------------------------------------


	static var _all = new Map<String, GameState>();
	static var _current : GameState;

	private function _gotoState(nextState : GameState)
	{
		if(_current != null)
		{
			_current.onExit(nextState);
			_s3d.removeChild(_current.s3d);
			_s2d.removeChild(_current.s2d);
		}
		_s3d.addChild(nextState.s3d);
		_s2d.addChild(nextState.s2d);
		nextState.onEnter(_current);
		_current = nextState;
		engine.render(_s3d);
	}

	public function gotoState(stateName : String)
	{
		var scene = _all.get(stateName);
		if(scene == null)
			throw "No GameState called '" + stateName + "' exists";
		_gotoState(scene);
	}

	public static function pushEvent(stateName : String, ?args : Dynamic)
	{
		_current.onEvent(stateName, args);
	}
}