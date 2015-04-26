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
	// SINGLETON
	// --------------------------------------------------------------------------
	public static var instance(default, null) : Main;

	// --------------------------------------------------------------------------
	// STATES
	// --------------------------------------------------------------------------

	static var _allStates = new Map<String, GameState>();
	static var _currentState : GameState;
	static var _stateScene2D : h2d.Scene;
	static var _stateScene3D : h3d.scene.Scene;

	private function _gotoState(nextState : GameState)
	{
		if(_currentState != null)
		{
			_currentState.onExit(nextState);
			s2d.removeChild(_stateScene2D);
			s3d.removeChild(_stateScene3D);
		}

		_stateScene2D = new h2d.Scene();
		_stateScene3D = new h3d.scene.Scene();

		nextState.onEnter(_stateScene2D, _stateScene3D, _currentState);
		s2d.addChild(_stateScene2D);
		s3d.addChild(_stateScene3D);

		_currentState = nextState;

		engine.render(s3d);

		onResize();
	}

	public function gotoState(stateName : String)
	{
		var scene = _allStates.get(stateName);
		if(scene == null)
			throw "No GameState called '" + stateName + "' exists";
		_gotoState(scene);
	}

	public function pushEvent(stateName : String, ?args : Dynamic)
	{
		_currentState.onEvent(stateName, args);
	}

	// --------------------------------------------------------------------------
	// STARTUP
	// --------------------------------------------------------------------------

	override function init() 
	{
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
		_currentState.onResize(s2d.width, s2d.height);
	}

	static function main() 
	{
		Res.initEmbed();
		instance = new Main();
	}

}
