import hxd.Math;
import hxd.Key in K;
import hxd.Res;

import h3d.scene.DirLight;
import h3d.scene.Mesh;
import h3d.prim.Cube;
import h3d.Vector;

class Main extends hxd.App 
{
	// --------------------------------------------------------------------------
	// STATES
	// --------------------------------------------------------------------------

	static var _allStates = new Map<String, GameState>();
	static var _currentState : GameState;

	private function _gotoState(nextState : GameState)
	{
		if(_currentState != null)
			_currentState.onExit(nextState);
		nextState.onEnter(_currentState);
		_currentState = nextState;
	}

	public function gotoState(stateName : String)
	{
		var scene = _allStates.get(stateName);
		if(scene == null)
			throw "No GameState called '" + stateName + "' exists";
		_gotoState(scene);
	}

	public static function pushEvent(stateName : String, 
		?args : Dynamic)
	{
		_currentState.onEvent(stateName, args);
	}

	// --------------------------------------------------------------------------
	// STARTUP
	// --------------------------------------------------------------------------

	override function init() 
	{
		Global.s2d = s2d;
		Global.s3d = s3d;
		Global.engine = engine;

		var yerp = new h3d.scene.Scene();

		var derp = new h3d.scene.Object();

		s3d.addChild(derp);



		_allStates["Title"] = new TitleState();
		_allStates["InGame"] = new InGameState();

		gotoState("Title");
	}

	override function update( dt : Float ) 
	{
		_currentState.onUpdate(dt);
	}

	override function onResize() 
	{
		_currentState.onResize();
	}

	static function main() 
	{
		Res.initEmbed();
		new Main();
	}

}
