(function (console) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,__class__: List
};
var hxd_App = function(engine) {
	var _g = this;
	if(engine != null) {
		this.engine = engine;
		engine.onReady = $bind(this,this.setup);
		haxe_Timer.delay($bind(this,this.setup),0);
	} else hxd_System.start(function() {
		_g.engine = engine = new h3d_Engine();
		engine.onReady = $bind(_g,_g.setup);
		engine.init();
	});
};
$hxClasses["hxd.App"] = hxd_App;
hxd_App.__name__ = true;
hxd_App.prototype = {
	onResize: function() {
	}
	,setup: function() {
		var _g = this;
		this.engine.onResized = function() {
			_g.s2d.checkResize();
			_g.onResize();
		};
		this.s3d = new h3d_scene_Scene();
		this.s2d = new h2d_Scene();
		this.s3d.addPass(this.s2d);
		this.init();
		hxd_Timer.skip();
		this.mainLoop();
		hxd_System.setLoop($bind(this,this.mainLoop));
		hxd_Key.initialize();
	}
	,init: function() {
	}
	,mainLoop: function() {
		hxd_Timer.update();
		this.s2d.checkEvents();
		this.update(hxd_Timer.tmod);
		this.s2d.setElapsedTime(hxd_Timer.tmod / 60);
		this.s3d.setElapsedTime(hxd_Timer.tmod / 60);
		this.engine.render(this.s3d);
	}
	,update: function(dt) {
	}
	,__class__: hxd_App
};
var Main = function(engine) {
	this.time = 0.0;
	hxd_App.call(this,engine);
};
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.__super__ = hxd_App;
Main.prototype = $extend(hxd_App.prototype,{
	init: function() {
		var prim = new h3d_prim_Cube();
		prim.translate(-0.5,-0.5,-0.5);
		prim.addNormals();
		var _g = 0;
		while(_g < 10) {
			var x = _g++;
			var _g1 = 0;
			while(_g1 < 10) {
				var y = _g1++;
				if(Math.random() > 0.5) {
					var tile = new h3d_scene_Mesh(prim,null,this.s3d);
					tile.set_x(x - 5);
					tile.set_y(y - 5);
					tile.scaleZ = 5;
					tile.flags |= 1;
					true;
					5;
					tile.set_z(hxd_Math.floor(Math.random() * 4));
					tile.material.mshader.color__.setColor(16777088,null);
					tile.material.passes.enableLights = true;
				}
			}
		}
		var acid = new h3d_scene_Mesh(prim,null,this.s3d);
		acid.set_x(acid.set_y((function($this) {
			var $r;
			acid.z = 0;
			{
				acid.flags |= 1;
				true;
			}
			$r = 0;
			return $r;
		}(this))));
		acid.set_scaleX((function($this) {
			var $r;
			acid.scaleY = 15;
			{
				acid.flags |= 1;
				true;
			}
			$r = 15;
			return $r;
		}(this)));
		acid.material.mshader.color__.setColor(65280,null);
		acid.material.passes.enableLights = true;
		this.s3d.camera.zNear = 2;
		this.s3d.camera.pos.set(0,-6,27,null);
		this.s3d.camera.target.set(0,0,0,null);
		this.s3d.lightSystem.ambientLight.set(0.2,0.2,0.2,null);
		var sun = new h3d_scene_DirLight(new h3d_Vector(0,1,-2),this.s3d);
		sun.get_color().set(0.5,0.5,0.5,null);
		this.engine.render(this.s3d);
	}
	,update: function(dt) {
		this.time += dt;
		var dir = new h3d_Vector(0.0,0.0,0.0);
		if(hxd_Key.isDown(38)) dir.y++;
		if(hxd_Key.isDown(40)) dir.y--;
		if(hxd_Key.isDown(37)) dir.x--;
		if(hxd_Key.isDown(39)) dir.x++;
		dir.x *= dt;
		dir.y *= dt;
		dir.z *= dt;
		dir = dir.add(this.s3d.camera.pos);
		this.s3d.camera.pos.set(dir.x,dir.y,dir.z,null);
	}
	,__class__: Main
});
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return false;
	}
	return true;
};
Type.allEnums = function(e) {
	return e.__empty_constructs__;
};
var h2d_Sprite = function(parent) {
	this.matA = 1;
	this.matB = 0;
	this.matC = 0;
	this.matD = 1;
	this.absX = 0;
	this.absY = 0;
	this.posChanged = true;
	this.x = 0;
	this.posChanged = true;
	this.y = 0;
	this.posChanged = true;
	this.scaleX = 1;
	this.posChanged = true;
	this.scaleY = 1;
	this.posChanged = true;
	this.rotation = 0;
	this.posChanged = false;
	this.visible = true;
	this.childs = [];
	this.filters = [];
	if(parent != null) parent.addChild(this);
};
$hxClasses["h2d.Sprite"] = h2d_Sprite;
h2d_Sprite.__name__ = true;
h2d_Sprite.prototype = {
	getBounds: function(relativeTo,out) {
		if(out == null) out = new h2d_col_Bounds();
		if(relativeTo != null) relativeTo.syncPos();
		this.syncPos();
		this.getBoundsRec(relativeTo,out);
		if(out.xMax <= out.xMin || out.yMax <= out.yMin) {
			this.addBounds(relativeTo,out,-1,-1,2,2);
			out.xMax = out.xMin = (out.xMax + out.xMin) * 0.5;
			out.yMax = out.yMin = (out.yMax + out.yMin) * 0.5;
		}
		return out;
	}
	,getBoundsRec: function(relativeTo,out) {
		var n = this.childs.length;
		if(n == 0) {
			out.xMin = 1e20;
			out.yMin = 1e20;
			out.xMax = -1e20;
			out.yMax = -1e20;
			return;
		}
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
		if(n == 1) {
			var c1 = this.childs[0];
			if(c1.visible) c1.getBounds(relativeTo,out); else {
				out.xMin = 1e20;
				out.yMin = 1e20;
				out.xMax = -1e20;
				out.yMax = -1e20;
			}
			return;
		}
		var xmin = Infinity;
		var ymin = Infinity;
		var xmax = -Infinity;
		var ymax = -Infinity;
		var _g2 = 0;
		var _g11 = this.childs;
		while(_g2 < _g11.length) {
			var c2 = _g11[_g2];
			++_g2;
			if(!c2.visible) continue;
			c2.getBoundsRec(relativeTo,out);
			if(out.xMin < xmin) xmin = out.xMin;
			if(out.yMin < ymin) ymin = out.yMin;
			if(out.xMax > xmax) xmax = out.xMax;
			if(out.yMax > ymax) ymax = out.yMax;
		}
		out.xMin = xmin;
		out.yMin = ymin;
		out.xMax = xmax;
		out.yMax = ymax;
	}
	,addBounds: function(relativeTo,out,dx,dy,width,height) {
		if(width <= 0 || height <= 0) return;
		if(relativeTo == null) {
			var x1;
			var y1;
			out.addPos(dx * this.matA + dy * this.matC + this.absX,dx * this.matB + dy * this.matD + this.absY);
			out.addPos((dx + width) * this.matA + dy * this.matC + this.absX,(dx + width) * this.matB + dy * this.matD + this.absY);
			out.addPos(dx * this.matA + (dy + height) * this.matC + this.absX,dx * this.matB + (dy + height) * this.matD + this.absY);
			out.addPos((dx + width) * this.matA + (dy + height) * this.matC + this.absX,(dx + width) * this.matB + (dy + height) * this.matD + this.absY);
			return;
		}
		if(relativeTo == this) {
			if(out.xMin > dx) out.xMin = dx;
			if(out.yMin > dy) out.yMin = dy;
			if(out.xMax < dx + width) out.xMax = dx + width;
			if(out.yMax < dy + height) out.yMax = dy + height;
			return;
		}
		var det = 1 / (relativeTo.matA * relativeTo.matD - relativeTo.matB * relativeTo.matC);
		var rA = relativeTo.matD * det;
		var rB = -relativeTo.matB * det;
		var rC = -relativeTo.matC * det;
		var rD = relativeTo.matA * det;
		var rX = this.absX - relativeTo.absX;
		var rY = this.absY - relativeTo.absY;
		var x;
		var y;
		x = dx * this.matA + dy * this.matC + rX;
		y = dx * this.matB + dy * this.matD + rY;
		out.addPos(x * rA + y * rC,x * rB + y * rD);
		x = (dx + width) * this.matA + dy * this.matC + rX;
		y = (dx + width) * this.matB + dy * this.matD + rY;
		out.addPos(x * rA + y * rC,x * rB + y * rD);
		x = dx * this.matA + (dy + height) * this.matC + rX;
		y = dx * this.matB + (dy + height) * this.matD + rY;
		out.addPos(x * rA + y * rC,x * rB + y * rD);
		x = (dx + width) * this.matA + (dy + height) * this.matC + rX;
		y = (dx + width) * this.matB + (dy + height) * this.matD + rY;
		out.addPos(x * rA + y * rC,x * rB + y * rD);
	}
	,getScene: function() {
		var p = this;
		while(p.parent != null) p = p.parent;
		return (p instanceof h2d_Scene)?p:null;
	}
	,addChild: function(s) {
		this.addChildAt(s,this.childs.length);
	}
	,addChildAt: function(s,pos) {
		if(pos < 0) pos = 0;
		if(pos > this.childs.length) pos = this.childs.length;
		var p = this;
		while(p != null) {
			if(p == s) throw new js__$Boot_HaxeError("Recursive addChild");
			p = p.parent;
		}
		if(s.parent != null) {
			var old = s.allocated;
			s.allocated = false;
			s.parent.removeChild(s);
			s.allocated = old;
		}
		this.childs.splice(pos,0,s);
		if(!this.allocated && s.allocated) s.onDelete();
		s.parent = this;
		s.posChanged = true;
		if(this.allocated) {
			if(!s.allocated) s.onAlloc(); else s.onParentChanged();
		}
	}
	,onParentChanged: function() {
	}
	,onAlloc: function() {
		this.allocated = true;
		var _g = 0;
		var _g1 = this.childs;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onAlloc();
		}
	}
	,onDelete: function() {
		this.allocated = false;
		var _g = 0;
		var _g1 = this.childs;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onDelete();
		}
	}
	,removeChild: function(s) {
		if(HxOverrides.remove(this.childs,s)) {
			if(s.allocated) s.onDelete();
			s.parent = null;
		}
	}
	,draw: function(ctx) {
	}
	,sync: function(ctx) {
		var changed = this.posChanged;
		if(changed) {
			this.calcAbsPos();
			this.posChanged = false;
		}
		this.lastFrame = ctx.frame;
		var p = 0;
		var len = this.childs.length;
		while(p < len) {
			var c = this.childs[p];
			if(c == null) break;
			if(c.lastFrame != ctx.frame) {
				if(changed) c.posChanged = true;
				c.sync(ctx);
			}
			if(this.childs[p] != c) {
				p = 0;
				len = this.childs.length;
			} else p++;
		}
	}
	,syncPos: function() {
		if(this.parent != null) this.parent.syncPos();
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
	}
	,calcAbsPos: function() {
		if(this.parent == null) {
			var cr;
			var sr;
			if(this.rotation == 0) {
				cr = 1.;
				sr = 0.;
				this.matA = this.scaleX;
				this.matB = 0;
				this.matC = 0;
				this.matD = this.scaleY;
			} else {
				cr = Math.cos(this.rotation);
				sr = Math.sin(this.rotation);
				this.matA = this.scaleX * cr;
				this.matB = this.scaleX * sr;
				this.matC = this.scaleY * -sr;
				this.matD = this.scaleY * cr;
			}
			this.absX = this.x;
			this.absY = this.y;
		} else {
			if(this.rotation == 0) {
				this.matA = this.scaleX * this.parent.matA;
				this.matB = this.scaleX * this.parent.matB;
				this.matC = this.scaleY * this.parent.matC;
				this.matD = this.scaleY * this.parent.matD;
			} else {
				var cr1 = Math.cos(this.rotation);
				var sr1 = Math.sin(this.rotation);
				var tmpA = this.scaleX * cr1;
				var tmpB = this.scaleX * sr1;
				var tmpC = this.scaleY * -sr1;
				var tmpD = this.scaleY * cr1;
				this.matA = tmpA * this.parent.matA + tmpB * this.parent.matC;
				this.matB = tmpA * this.parent.matB + tmpB * this.parent.matD;
				this.matC = tmpC * this.parent.matA + tmpD * this.parent.matC;
				this.matD = tmpC * this.parent.matB + tmpD * this.parent.matD;
			}
			this.absX = this.x * this.parent.matA + this.y * this.parent.matC + this.parent.absX;
			this.absY = this.x * this.parent.matB + this.y * this.parent.matD + this.parent.absY;
		}
	}
	,emitTile: function(ctx,tile) {
		if(h2d_Sprite.nullDrawable == null) h2d_Sprite.nullDrawable = new h2d_Drawable(null);
		h2d_Sprite.nullDrawable.absX = this.absX;
		h2d_Sprite.nullDrawable.absY = this.absY;
		h2d_Sprite.nullDrawable.matA = this.matA;
		h2d_Sprite.nullDrawable.matB = this.matB;
		h2d_Sprite.nullDrawable.matC = this.matC;
		h2d_Sprite.nullDrawable.matD = this.matD;
		ctx.drawTile(h2d_Sprite.nullDrawable,tile);
		return;
		ctx.beginDrawBatch(h2d_Sprite.nullDrawable,tile.innerTex);
		var ax = this.absX + tile.dx * this.matA + tile.dy * this.matC;
		var ay = this.absY + tile.dx * this.matB + tile.dy * this.matD;
		var buf = ctx.buffer;
		var pos = ctx.bufPos;
		while(buf.length < pos + 32) buf.push(0.);
		var key = pos++;
		buf[key] = ax;
		var key1 = pos++;
		buf[key1] = ay;
		var key2 = pos++;
		buf[key2] = tile.u;
		var key3 = pos++;
		buf[key3] = tile.v;
		var key4 = pos++;
		buf[key4] = 1.;
		var key5 = pos++;
		buf[key5] = 1.;
		var key6 = pos++;
		buf[key6] = 1.;
		var key7 = pos++;
		buf[key7] = 1.;
		var tw = tile.width;
		var th = tile.height;
		var dx1 = tw * this.matA;
		var dy1 = tw * this.matB;
		var dx2 = th * this.matC;
		var dy2 = th * this.matD;
		var key8 = pos++;
		buf[key8] = ax + dx1;
		var key9 = pos++;
		buf[key9] = ay + dy1;
		var key10 = pos++;
		buf[key10] = tile.u2;
		var key11 = pos++;
		buf[key11] = tile.v;
		var key12 = pos++;
		buf[key12] = 1.;
		var key13 = pos++;
		buf[key13] = 1.;
		var key14 = pos++;
		buf[key14] = 1.;
		var key15 = pos++;
		buf[key15] = 1.;
		var key16 = pos++;
		buf[key16] = ax + dx2;
		var key17 = pos++;
		buf[key17] = ay + dy2;
		var key18 = pos++;
		buf[key18] = tile.u;
		var key19 = pos++;
		buf[key19] = tile.v2;
		var key20 = pos++;
		buf[key20] = 1.;
		var key21 = pos++;
		buf[key21] = 1.;
		var key22 = pos++;
		buf[key22] = 1.;
		var key23 = pos++;
		buf[key23] = 1.;
		var key24 = pos++;
		buf[key24] = ax + dx1 + dx2;
		var key25 = pos++;
		buf[key25] = ay + dy1 + dy2;
		var key26 = pos++;
		buf[key26] = tile.u2;
		var key27 = pos++;
		buf[key27] = tile.v2;
		var key28 = pos++;
		buf[key28] = 1.;
		var key29 = pos++;
		buf[key29] = 1.;
		var key30 = pos++;
		buf[key30] = 1.;
		var key31 = pos++;
		buf[key31] = 1.;
		ctx.bufPos = pos;
	}
	,clipBounds: function(ctx,bounds) {
		var _g = this;
		var view = ctx.tmpBounds;
		view.xMin = 1e20;
		view.yMin = 1e20;
		view.xMax = -1e20;
		view.yMax = -1e20;
		var x = bounds.xMin;
		var y = bounds.yMin;
		view.addPos(x * _g.matA + y * _g.matC + _g.absX,x * _g.matB + y * _g.matD + _g.absY);
		var x1 = bounds.xMax;
		var y1 = bounds.yMin;
		view.addPos(x1 * _g.matA + y1 * _g.matC + _g.absX,x1 * _g.matB + y1 * _g.matD + _g.absY);
		var x2 = bounds.xMin;
		var y2 = bounds.yMax;
		view.addPos(x2 * _g.matA + y2 * _g.matC + _g.absX,x2 * _g.matB + y2 * _g.matD + _g.absY);
		var x3 = bounds.xMax;
		var y3 = bounds.yMax;
		view.addPos(x3 * _g.matA + y3 * _g.matC + _g.absX,x3 * _g.matB + y3 * _g.matD + _g.absY);
		var scene = this.getScene();
		if(view.xMin < 0) view.xMin = 0;
		if(view.yMin < 0) view.yMin = 0;
		if(view.xMax > scene.width) view.xMax = scene.width;
		if(view.yMax > scene.height) view.yMax = scene.height;
		var invDet = 1 / (this.matA * this.matD - this.matB * this.matC);
		var sxMin = view.xMin;
		var syMin = view.yMin;
		var sxMax = view.xMax;
		var syMax = view.yMax;
		view.xMin = 1e20;
		view.yMin = 1e20;
		view.xMax = -1e20;
		view.yMax = -1e20;
		var x4 = sxMin;
		var y4 = syMin;
		x4 -= _g.absX;
		y4 -= _g.absY;
		view.addPos((x4 * _g.matD - y4 * _g.matC) * invDet,(-x4 * _g.matB + y4 * _g.matA) * invDet);
		var x5 = sxMax;
		var y5 = syMin;
		x5 -= _g.absX;
		y5 -= _g.absY;
		view.addPos((x5 * _g.matD - y5 * _g.matC) * invDet,(-x5 * _g.matB + y5 * _g.matA) * invDet);
		var x6 = sxMin;
		var y6 = syMax;
		x6 -= _g.absX;
		y6 -= _g.absY;
		view.addPos((x6 * _g.matD - y6 * _g.matC) * invDet,(-x6 * _g.matB + y6 * _g.matA) * invDet);
		var x7 = sxMax;
		var y7 = syMax;
		x7 -= _g.absX;
		y7 -= _g.absY;
		view.addPos((x7 * _g.matD - y7 * _g.matC) * invDet,(-x7 * _g.matB + y7 * _g.matA) * invDet);
		bounds.xMin = hxd_Math.max(bounds.xMin,view.xMin);
		bounds.yMin = hxd_Math.max(bounds.yMin,view.yMin);
		bounds.xMax = hxd_Math.min(bounds.xMax,view.xMax);
		bounds.yMax = hxd_Math.min(bounds.yMax,view.yMax);
	}
	,drawFilters: function(ctx) {
		var bounds = ctx.tmpBounds;
		var total = new h2d_col_Bounds();
		var maxExtent = -1.;
		var _g = 0;
		var _g1 = this.filters;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			f.sync(ctx,this);
			if(f.autoBounds) {
				if(f.boundsExtend > maxExtent) maxExtent = f.boundsExtend;
			} else {
				f.getBounds(this,bounds);
				if(bounds.xMin < total.xMin) total.xMin = bounds.xMin;
				if(bounds.xMax > total.xMax) total.xMax = bounds.xMax;
				if(bounds.yMin < total.yMin) total.yMin = bounds.yMin;
				if(bounds.yMax > total.yMax) total.yMax = bounds.yMax;
			}
		}
		if(maxExtent >= 0) {
			this.getBounds(this,bounds);
			bounds.xMin -= maxExtent;
			bounds.yMin -= maxExtent;
			bounds.xMax += maxExtent;
			bounds.yMax += maxExtent;
			if(bounds.xMin < total.xMin) total.xMin = bounds.xMin;
			if(bounds.xMax > total.xMax) total.xMax = bounds.xMax;
			if(bounds.yMin < total.yMin) total.yMin = bounds.yMin;
			if(bounds.yMax > total.yMax) total.yMax = bounds.yMax;
		}
		this.clipBounds(ctx,total);
		var xMin = Math.floor(total.xMin + 1e-10);
		var yMin = Math.floor(total.yMin + 1e-10);
		var width = Math.ceil(total.xMax - xMin - 1e-10);
		var height = Math.ceil(total.yMax - yMin - 1e-10);
		if(width <= 0 || height <= 0 || total.xMax < total.xMin) return;
		var t = ctx.textures.allocTarget("filterTemp",ctx,width,height,false);
		ctx.pushTarget(t,xMin,yMin);
		ctx.engine.clear(0);
		var oldA = this.matA;
		var oldB = this.matB;
		var oldC = this.matC;
		var oldD = this.matD;
		var oldX = this.absX;
		var oldY = this.absY;
		this.matA = 1;
		this.matB = 0;
		this.matC = 0;
		this.matD = 1;
		this.absX = 0;
		this.absY = 0;
		var _g2 = 0;
		var _g11 = this.childs;
		while(_g2 < _g11.length) {
			var c = _g11[_g2];
			++_g2;
			c.posChanged = true;
		}
		this.draw(ctx);
		var _g3 = 0;
		var _g12 = this.childs;
		while(_g3 < _g12.length) {
			var c1 = _g12[_g3];
			++_g3;
			c1.drawRec(ctx);
		}
		this.matA = oldA;
		this.matB = oldB;
		this.matC = oldC;
		this.matD = oldD;
		this.absX = oldX;
		this.absY = oldY;
		var $final = h2d_Tile.fromTexture(t);
		$final.dx = xMin;
		$final.dy = yMin;
		var _g4 = 0;
		var _g13 = this.filters;
		while(_g4 < _g13.length) {
			var f1 = _g13[_g4];
			++_g4;
			$final = f1.draw(ctx,$final);
			if($final == null) {
				ctx.popTarget();
				return;
			}
			$final.dx = xMin;
			$final.dy = yMin;
		}
		ctx.popTarget();
		this.emitTile(ctx,$final);
	}
	,drawRec: function(ctx) {
		if(!this.visible) return;
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
		if(this.filters.length > 0) this.drawFilters(ctx); else {
			this.draw(ctx);
			var _g2 = 0;
			var _g11 = this.childs;
			while(_g2 < _g11.length) {
				var c1 = _g11[_g2];
				++_g2;
				c1.drawRec(ctx);
			}
		}
	}
	,__class__: h2d_Sprite
};
var h2d_Drawable = function(parent) {
	h2d_Sprite.call(this,parent);
	this.blendMode = h2d_BlendMode.Alpha;
	this.color = new h3d_Vector(1,1,1,1);
};
$hxClasses["h2d.Drawable"] = h2d_Drawable;
h2d_Drawable.__name__ = true;
h2d_Drawable.__super__ = h2d_Sprite;
h2d_Drawable.prototype = $extend(h2d_Sprite.prototype,{
	emitTile: function(ctx,tile) {
		if(tile == null) tile = new h2d_Tile(null,0,0,5,5);
		ctx.drawTile(this,tile);
		return;
		ctx.beginDrawBatch(this,tile.innerTex);
		var ax = this.absX + tile.dx * this.matA + tile.dy * this.matC;
		var ay = this.absY + tile.dx * this.matB + tile.dy * this.matD;
		var buf = ctx.buffer;
		var pos = ctx.bufPos;
		while(buf.length < pos + 32) buf.push(0.);
		var key = pos++;
		buf[key] = ax;
		var key1 = pos++;
		buf[key1] = ay;
		var key2 = pos++;
		buf[key2] = tile.u;
		var key3 = pos++;
		buf[key3] = tile.v;
		var key4 = pos++;
		buf[key4] = this.color.x;
		var key5 = pos++;
		buf[key5] = this.color.y;
		var key6 = pos++;
		buf[key6] = this.color.z;
		var key7 = pos++;
		buf[key7] = this.color.w;
		var tw = tile.width;
		var th = tile.height;
		var dx1 = tw * this.matA;
		var dy1 = tw * this.matB;
		var dx2 = th * this.matC;
		var dy2 = th * this.matD;
		var key8 = pos++;
		buf[key8] = ax + dx1;
		var key9 = pos++;
		buf[key9] = ay + dy1;
		var key10 = pos++;
		buf[key10] = tile.u2;
		var key11 = pos++;
		buf[key11] = tile.v;
		var key12 = pos++;
		buf[key12] = this.color.x;
		var key13 = pos++;
		buf[key13] = this.color.y;
		var key14 = pos++;
		buf[key14] = this.color.z;
		var key15 = pos++;
		buf[key15] = this.color.w;
		var key16 = pos++;
		buf[key16] = ax + dx2;
		var key17 = pos++;
		buf[key17] = ay + dy2;
		var key18 = pos++;
		buf[key18] = tile.u;
		var key19 = pos++;
		buf[key19] = tile.v2;
		var key20 = pos++;
		buf[key20] = this.color.x;
		var key21 = pos++;
		buf[key21] = this.color.y;
		var key22 = pos++;
		buf[key22] = this.color.z;
		var key23 = pos++;
		buf[key23] = this.color.w;
		var key24 = pos++;
		buf[key24] = ax + dx1 + dx2;
		var key25 = pos++;
		buf[key25] = ay + dy1 + dy2;
		var key26 = pos++;
		buf[key26] = tile.u2;
		var key27 = pos++;
		buf[key27] = tile.v2;
		var key28 = pos++;
		buf[key28] = this.color.x;
		var key29 = pos++;
		buf[key29] = this.color.y;
		var key30 = pos++;
		buf[key30] = this.color.z;
		var key31 = pos++;
		buf[key31] = this.color.w;
		ctx.bufPos = pos;
	}
	,__class__: h2d_Drawable
});
var h2d_BlendMode = $hxClasses["h2d.BlendMode"] = { __ename__ : true, __constructs__ : ["None","Alpha","Add","SoftAdd","Multiply","Erase","Screen"] };
h2d_BlendMode.None = ["None",0];
h2d_BlendMode.None.toString = $estr;
h2d_BlendMode.None.__enum__ = h2d_BlendMode;
h2d_BlendMode.Alpha = ["Alpha",1];
h2d_BlendMode.Alpha.toString = $estr;
h2d_BlendMode.Alpha.__enum__ = h2d_BlendMode;
h2d_BlendMode.Add = ["Add",2];
h2d_BlendMode.Add.toString = $estr;
h2d_BlendMode.Add.__enum__ = h2d_BlendMode;
h2d_BlendMode.SoftAdd = ["SoftAdd",3];
h2d_BlendMode.SoftAdd.toString = $estr;
h2d_BlendMode.SoftAdd.__enum__ = h2d_BlendMode;
h2d_BlendMode.Multiply = ["Multiply",4];
h2d_BlendMode.Multiply.toString = $estr;
h2d_BlendMode.Multiply.__enum__ = h2d_BlendMode;
h2d_BlendMode.Erase = ["Erase",5];
h2d_BlendMode.Erase.toString = $estr;
h2d_BlendMode.Erase.__enum__ = h2d_BlendMode;
h2d_BlendMode.Screen = ["Screen",6];
h2d_BlendMode.Screen.toString = $estr;
h2d_BlendMode.Screen.__enum__ = h2d_BlendMode;
h2d_BlendMode.__empty_constructs__ = [h2d_BlendMode.None,h2d_BlendMode.Alpha,h2d_BlendMode.Add,h2d_BlendMode.SoftAdd,h2d_BlendMode.Multiply,h2d_BlendMode.Erase,h2d_BlendMode.Screen];
var h2d_Interactive = function() {
	this.propagateEvents = false;
	this.cancelEvents = false;
};
$hxClasses["h2d.Interactive"] = h2d_Interactive;
h2d_Interactive.__name__ = true;
h2d_Interactive.__super__ = h2d_Drawable;
h2d_Interactive.prototype = $extend(h2d_Drawable.prototype,{
	onAlloc: function() {
		this.scene = this.getScene();
		if(this.scene != null) this.scene.addEventTarget(this);
		h2d_Drawable.prototype.onAlloc.call(this);
	}
	,draw: function(ctx) {
		if(this.backgroundColor != null) this.emitTile(ctx,h2d_Tile.fromColor(this.backgroundColor,this.width | 0,this.height | 0,(this.backgroundColor >>> 24) / 255));
	}
	,getBoundsRec: function(relativeTo,out) {
		h2d_Drawable.prototype.getBoundsRec.call(this,relativeTo,out);
		if(this.backgroundColor != null) this.addBounds(relativeTo,out,0,0,this.width | 0,this.height | 0);
	}
	,onParentChanged: function() {
		if(this.scene != null) {
			this.scene.removeEventTarget(this);
			this.scene.addEventTarget(this);
		}
	}
	,calcAbsPos: function() {
		h2d_Drawable.prototype.calcAbsPos.call(this);
		if(this.scene != null && this.scene.currentOver == this) {
			var stage = hxd_Stage.getInstance();
			var e = new hxd_Event(hxd_EventKind.EMove,stage.get_mouseX(),stage.get_mouseY());
			this.scene.onEvent(e);
		}
	}
	,onDelete: function() {
		if(this.scene != null) {
			this.scene.removeEventTarget(this);
			if(this.scene.currentOver == this) {
				this.scene.currentOver = null;
				hxd_System.setCursor(hxd_Cursor.Default);
			}
			if(this.scene.currentFocus == this) this.scene.currentFocus = null;
		}
		h2d_Drawable.prototype.onDelete.call(this);
	}
	,checkBounds: function(e) {
		var _g = e.kind;
		switch(_g[1]) {
		case 4:case 1:case 6:case 7:
			return false;
		default:
			return true;
		}
	}
	,handleEvent: function(e) {
		if(this.isEllipse && this.checkBounds(e)) {
			var cx = this.width * 0.5;
			var cy = this.height * 0.5;
			var dx = (e.relX - cx) / cx;
			var dy = (e.relY - cy) / cy;
			if(dx * dx + dy * dy > 1) {
				e.cancel = true;
				return;
			}
		}
		if(this.propagateEvents) e.propagate = true;
		if(this.cancelEvents) e.cancel = true;
		var _g = e.kind;
		switch(_g[1]) {
		case 2:
			this.onMove(e);
			break;
		case 0:
			if(this.enableRightButton || e.button == 0) {
				this.isMouseDown = e.button;
				this.onPush(e);
			}
			break;
		case 1:
			if(this.enableRightButton || e.button == 0) {
				this.onRelease(e);
				if(this.isMouseDown == e.button) this.onClick(e);
			}
			this.isMouseDown = -1;
			break;
		case 3:
			hxd_System.setCursor(this.cursor);
			this.onOver(e);
			break;
		case 4:
			this.isMouseDown = -1;
			hxd_System.setCursor(hxd_Cursor.Default);
			this.onOut(e);
			break;
		case 5:
			this.onWheel(e);
			break;
		case 7:
			this.onFocusLost(e);
			if(!e.cancel && this.scene != null && this.scene.currentFocus == this) this.scene.currentFocus = null;
			break;
		case 6:
			this.onFocus(e);
			if(!e.cancel && this.scene != null) this.scene.currentFocus = this;
			break;
		case 9:
			this.onKeyUp(e);
			break;
		case 8:
			this.onKeyDown(e);
			break;
		}
	}
	,onOver: function(e) {
	}
	,onOut: function(e) {
	}
	,onPush: function(e) {
	}
	,onRelease: function(e) {
	}
	,onClick: function(e) {
	}
	,onMove: function(e) {
	}
	,onWheel: function(e) {
	}
	,onFocus: function(e) {
	}
	,onFocusLost: function(e) {
	}
	,onKeyUp: function(e) {
	}
	,onKeyDown: function(e) {
	}
	,__class__: h2d_Interactive
});
var h2d_Layers = function(parent) {
	h2d_Sprite.call(this,parent);
	this.layers = [];
	this.layerCount = 0;
};
$hxClasses["h2d.Layers"] = h2d_Layers;
h2d_Layers.__name__ = true;
h2d_Layers.__super__ = h2d_Sprite;
h2d_Layers.prototype = $extend(h2d_Sprite.prototype,{
	addChild: function(s) {
		this.addChildAt(s,0);
	}
	,addChildAt: function(s,layer) {
		if(s.parent == this) {
			var old = s.allocated;
			s.allocated = false;
			this.removeChild(s);
			s.allocated = old;
		}
		while(layer >= this.layerCount) this.layers[this.layerCount++] = this.childs.length;
		h2d_Sprite.prototype.addChildAt.call(this,s,this.layers[layer]);
		var _g1 = layer;
		var _g = this.layerCount;
		while(_g1 < _g) {
			var i = _g1++;
			this.layers[i]++;
		}
	}
	,removeChild: function(s) {
		var _g1 = 0;
		var _g = this.childs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.childs[i] == s) {
				this.childs.splice(i,1);
				if(s.allocated) s.onDelete();
				s.parent = null;
				var k = this.layerCount - 1;
				while(k >= 0 && this.layers[k] > i) {
					this.layers[k]--;
					k--;
				}
				break;
			}
		}
	}
	,__class__: h2d_Layers
});
var h3d_impl_RenderContext = function() {
	this.engine = h3d_Engine.CURRENT;
	this.frame = 0;
	this.time = 0.;
	this.elapsedTime = 1. / hxd_Stage.getInstance().getFrameRate();
};
$hxClasses["h3d.impl.RenderContext"] = h3d_impl_RenderContext;
h3d_impl_RenderContext.__name__ = true;
h3d_impl_RenderContext.prototype = {
	__class__: h3d_impl_RenderContext
};
var h2d_RenderContext = function(s2d) {
	this.tmpBounds = new h2d_col_Bounds();
	h3d_impl_RenderContext.call(this);
	this.s2d = s2d;
	this.bufPos = 0;
	this.manager = new h3d_shader_Manager(["output.position","output.color"]);
	this.pass = new h3d_mat_Pass("",null);
	this.pass.depth(true,h3d_mat_Compare.Always);
	this.pass.set_culling(h3d_mat_Face.None);
	this.baseShader = new h3d_shader_Base2d();
	this.baseShader.priority = 100;
	this.baseShader.zValue__ = 0.;
	this.baseShaderList = new hxsl_ShaderList(this.baseShader);
	this.targetsStack = [];
	this.textures = new h3d_impl_TextureCache();
};
$hxClasses["h2d.RenderContext"] = h2d_RenderContext;
h2d_RenderContext.__name__ = true;
h2d_RenderContext.__super__ = h3d_impl_RenderContext;
h2d_RenderContext.prototype = $extend(h3d_impl_RenderContext.prototype,{
	begin: function() {
		this.texture = null;
		this.currentObj = null;
		this.bufPos = 0;
		this.stride = 0;
		this.baseShader.set_pixelAlign(false);
		this.baseShader.halfPixelInverse__.set(0.5 / this.engine.width,0.5 / this.engine.height,null,null);
		this.baseShader.viewport__.set(-this.s2d.width * 0.5,-this.s2d.height * 0.5,2 / this.s2d.width,-2 / this.s2d.height);
		this.baseShaderList.next = null;
		this.initShaders(this.baseShaderList);
		this.engine.selectMaterial(this.pass);
		this.textures.begin(this);
	}
	,initShaders: function(shaders) {
		this.currentShaders = shaders;
		this.compiledShader = this.manager.compileShaders(shaders);
		if(this.buffers == null) this.buffers = new h3d_shader_Buffers(this.compiledShader); else this.buffers.grow(this.compiledShader);
		this.manager.fillGlobals(this.buffers,this.compiledShader);
		this.engine.selectShader(this.compiledShader);
		this.engine.uploadShaderBuffers(this.buffers,0);
	}
	,end: function() {
		this.texture = null;
		this.currentObj = null;
		this.baseShaderList.next = null;
		if(this.targetsStack.length != 0) throw new js__$Boot_HaxeError("Missing popTarget()");
	}
	,pushTarget: function(t,startX,startY,width,height) {
		if(height == null) height = -1;
		if(width == null) width = -1;
		if(startY == null) startY = 0;
		if(startX == null) startX = 0;
		this.engine.setTarget(t);
		this.initShaders(this.baseShaderList);
		if(width < 0) if(t == null) width = this.s2d.width; else width = t.width;
		if(height < 0) if(t == null) height = this.s2d.height; else height = t.height;
		this.baseShader.halfPixelInverse__.set(0.5 / (t == null?this.engine.width:t.width),0.5 / (t == null?this.engine.height:t.height),null,null);
		this.baseShader.viewport__.set(-width * 0.5 - startX,-height * 0.5 - startY,2 / width,-2 / height);
		this.targetsStack.push({ t : t, x : startX, y : startY, w : width, h : height});
	}
	,popTarget: function(restore) {
		if(restore == null) restore = true;
		var tinf = this.targetsStack.pop();
		if(tinf == null) throw new js__$Boot_HaxeError("Too many popTarget()");
		if(!restore) return;
		tinf = this.targetsStack[this.targetsStack.length - 1];
		var t;
		if(tinf == null) t = null; else t = tinf.t;
		var startX;
		if(tinf == null) startX = 0; else startX = tinf.x;
		var startY;
		if(tinf == null) startY = 0; else startY = tinf.y;
		var width;
		if(tinf == null) width = this.s2d.width; else width = tinf.w;
		var height;
		if(tinf == null) height = this.s2d.height; else height = tinf.h;
		this.engine.setTarget(t);
		this.initShaders(this.baseShaderList);
		this.baseShader.halfPixelInverse__.set(0.5 / (t == null?this.engine.width:t.width),0.5 / (t == null?this.engine.height:t.height),null,null);
		this.baseShader.viewport__.set(-width * 0.5 - startX,-height * 0.5 - startY,2 / width,-2 / height);
	}
	,beforeDraw: function() {
		if(this.texture == null) this.texture = h3d_mat_Texture.fromColor(16711935);
		this.baseShader.texture__ = this.texture;
		this.texture.set_filter(this.currentObj.filter?h3d_mat_Filter.Linear:h3d_mat_Filter.Nearest);
		this.texture.set_wrap(this.currentObj.tileWrap?h3d_mat_Wrap.Repeat:h3d_mat_Wrap.Clamp);
		this.pass.setBlendMode(this.currentObj.blendMode);
		this.manager.fillParams(this.buffers,this.compiledShader,this.currentShaders);
		this.engine.selectMaterial(this.pass);
		this.engine.uploadShaderBuffers(this.buffers,1);
		this.engine.uploadShaderBuffers(this.buffers,2);
	}
	,beginDrawBatch: function(obj,texture) {
		this.beginDraw(obj,texture,false);
	}
	,drawTile: function(obj,tile) {
		this.beginDraw(obj,tile.innerTex,true,true);
		this.baseShader.color__.set(obj.color.x,obj.color.y,obj.color.z,obj.color.w);
		this.baseShader.absoluteMatrixA__.set(tile.width * obj.matA,tile.height * obj.matC,obj.absX + tile.dx * obj.matA + tile.dy * obj.matC,null);
		this.baseShader.absoluteMatrixB__.set(tile.width * obj.matB,tile.height * obj.matD,obj.absY + tile.dx * obj.matB + tile.dy * obj.matD,null);
		this.baseShader.uvPos__.set(tile.u,tile.v,tile.u2 - tile.u,tile.v2 - tile.v);
		this.beforeDraw();
		if(this.fixedBuffer == null || this.fixedBuffer.isDisposed()) {
			this.fixedBuffer = new h3d_Buffer(4,8,[h3d_BufferFlag.Quads,h3d_BufferFlag.RawFormat]);
			var k;
			var this1;
			this1 = new Array(0);
			k = this1;
			var _g = 0;
			var _g1 = [0,0,0,0,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1];
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				k.push(v);
			}
			this.fixedBuffer.uploadVector(k,0,4);
		}
		this.engine.renderQuadBuffer(this.fixedBuffer,null,null);
	}
	,beginDraw: function(obj,texture,isRelative,hasUVPos) {
		if(hasUVPos == null) hasUVPos = false;
		var stride = 8;
		var shaderChanged = false;
		var paramsChanged = false;
		var objShaders = obj.shaders;
		var curShaders = this.currentShaders.next;
		while(objShaders != null && curShaders != null) {
			var s = objShaders.s;
			var t = curShaders.s;
			objShaders = objShaders.next;
			curShaders = curShaders.next;
			if(s == t) continue;
			paramsChanged = true;
			s.updateConstants(this.manager.globals);
			if(s.instance != t.instance) shaderChanged = true;
		}
		if(objShaders != null || curShaders != null || this.baseShader.isRelative__ != isRelative || this.baseShader.hasUVPos__ != hasUVPos) shaderChanged = true;
		if(shaderChanged) {
			this.baseShader.set_hasUVPos(hasUVPos);
			this.baseShader.set_isRelative(isRelative);
			this.baseShader.updateConstants(this.manager.globals);
			this.baseShaderList.next = obj.shaders;
			this.initShaders(this.baseShaderList);
		} else if(paramsChanged) {
			if(this.currentShaders != this.baseShaderList) throw new js__$Boot_HaxeError("!");
			this.currentShaders.next = obj.shaders;
		}
		this.texture = texture;
		this.stride = stride;
		this.currentObj = obj;
	}
	,__class__: h2d_RenderContext
});
var h3d_IDrawable = function() { };
$hxClasses["h3d.IDrawable"] = h3d_IDrawable;
h3d_IDrawable.__name__ = true;
h3d_IDrawable.prototype = {
	__class__: h3d_IDrawable
};
var h2d_Scene = function() {
	h2d_Layers.call(this,null);
	var e = h3d_Engine.CURRENT;
	this.ctx = new h2d_RenderContext(this);
	this.width = e.width;
	this.height = e.height;
	this.interactive = [];
	this.pushList = [];
	this.eventListeners = [];
	this.stage = hxd_Stage.getInstance();
	this.posChanged = true;
};
$hxClasses["h2d.Scene"] = h2d_Scene;
h2d_Scene.__name__ = true;
h2d_Scene.__interfaces__ = [h3d_IDrawable];
h2d_Scene.__super__ = h2d_Layers;
h2d_Scene.prototype = $extend(h2d_Layers.prototype,{
	checkResize: function() {
		if(this.fixedSize) return;
		var engine = h3d_Engine.CURRENT;
		if(this.width != engine.width || this.height != engine.height) {
			this.width = engine.width;
			this.height = engine.height;
			this.posChanged = true;
		}
	}
	,onAlloc: function() {
		this.stage.addEventTarget($bind(this,this.onEvent));
		h2d_Layers.prototype.onAlloc.call(this);
	}
	,onDelete: function() {
		this.stage.removeEventTarget($bind(this,this.onEvent));
		h2d_Layers.prototype.onDelete.call(this);
	}
	,onEvent: function(e) {
		if(this.pendingEvents != null) this.pendingEvents.push(e);
	}
	,screenXToLocal: function(mx) {
		return (mx - this.x) * this.width / (this.stage.get_width() * this.scaleX);
	}
	,screenYToLocal: function(my) {
		return (my - this.y) * this.height / (this.stage.get_height() * this.scaleY);
	}
	,dispatchListeners: function(event) {
		event.propagate = true;
		event.cancel = false;
		var _g = 0;
		var _g1 = this.eventListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(event);
			if(!event.propagate) break;
		}
	}
	,emitEvent: function(event) {
		var x = event.relX;
		var y = event.relY;
		var rx = x * this.matA + y * this.matB + this.absX;
		var ry = x * this.matC + y * this.matD + this.absY;
		var handled = false;
		var checkOver = false;
		var checkPush = false;
		var cancelFocus = false;
		var _g = event.kind;
		switch(_g[1]) {
		case 2:
			checkOver = true;
			break;
		case 0:
			cancelFocus = true;
			checkPush = true;
			break;
		case 1:
			checkPush = true;
			break;
		case 9:case 8:case 5:
			if(this.currentFocus != null) {
				this.currentFocus.handleEvent(event);
				if(!event.propagate) return;
			}
			break;
		default:
		}
		var _g1 = 0;
		var _g11 = this.interactive;
		while(_g1 < _g11.length) {
			var i = _g11[_g1];
			++_g1;
			var dx = rx - i.absX;
			var dy = ry - i.absY;
			var w1 = i.width * i.matA;
			var h1 = i.width * i.matC;
			var ky = h1 * dx + w1 * dy;
			if(ky < 0) continue;
			var w2 = i.height * i.matB;
			var h2 = i.height * i.matD;
			var kx = w2 * dy + h2 * dx;
			if(kx < 0) continue;
			var max = w1 * h2 - h1 * w2;
			if(ky >= max || kx >= max) continue;
			var visible = true;
			var p = i;
			while(p != null) {
				if(!p.visible) {
					visible = false;
					break;
				}
				p = p.parent;
			}
			if(!visible) continue;
			event.relX = kx / max * i.width;
			event.relY = ky / max * i.height;
			i.handleEvent(event);
			if(event.cancel) event.cancel = false; else if(checkOver) {
				if(this.currentOver != i) {
					var old = event.propagate;
					if(this.currentOver != null) {
						event.kind = hxd_EventKind.EOut;
						this.currentOver.handleEvent(event);
					}
					event.kind = hxd_EventKind.EOver;
					event.cancel = false;
					i.handleEvent(event);
					if(event.cancel) this.currentOver = null; else {
						this.currentOver = i;
						checkOver = false;
					}
					event.kind = hxd_EventKind.EMove;
					event.cancel = false;
					event.propagate = old;
				} else checkOver = false;
			} else {
				if(checkPush) {
					if(event.kind == hxd_EventKind.EPush) this.pushList.push(i); else HxOverrides.remove(this.pushList,i);
				}
				if(cancelFocus && i == this.currentFocus) cancelFocus = false;
			}
			if(event.propagate) {
				event.propagate = false;
				continue;
			}
			handled = true;
			break;
		}
		if(cancelFocus && this.currentFocus != null) {
			event.kind = hxd_EventKind.EFocusLost;
			this.currentFocus.handleEvent(event);
			event.kind = hxd_EventKind.EPush;
		}
		if(checkOver && this.currentOver != null) {
			event.kind = hxd_EventKind.EOut;
			this.currentOver.handleEvent(event);
			event.kind = hxd_EventKind.EMove;
			this.currentOver = null;
		}
		if(!handled) {
			if(event.kind == hxd_EventKind.EPush) this.pushList.push(null);
			this.dispatchListeners(event);
		}
	}
	,hasEvents: function() {
		return this.interactive.length > 0 || this.eventListeners.length > 0;
	}
	,checkEvents: function() {
		if(this.pendingEvents == null) {
			if(!this.hasEvents()) return;
			this.pendingEvents = [];
		}
		var old = this.pendingEvents;
		if(old.length == 0) return;
		this.pendingEvents = null;
		var _g = 0;
		while(_g < old.length) {
			var e = old[_g];
			++_g;
			var ox = e.relX;
			var oy = e.relY;
			e.relX = this.screenXToLocal(ox);
			e.relY = this.screenYToLocal(oy);
			if(this.currentDrag != null && (this.currentDrag.ref == null || this.currentDrag.ref == e.touchId)) {
				this.currentDrag.f(e);
				if(e.cancel) {
					e.relX = ox;
					e.relY = oy;
					continue;
				}
			}
			this.emitEvent(e);
			if(e.kind == hxd_EventKind.ERelease && this.pushList.length > 0) {
				e.relX = this.screenXToLocal(ox);
				e.relY = this.screenYToLocal(oy);
				var _g1 = 0;
				var _g2 = this.pushList;
				while(_g1 < _g2.length) {
					var i = _g2[_g1];
					++_g1;
					if(i == null) this.dispatchListeners(e); else {
						i.isMouseDown = -1;
						i.handleEvent(e);
					}
				}
				this.pushList = [];
			}
			e.relX = ox;
			e.relY = oy;
		}
		if(this.hasEvents()) this.pendingEvents = [];
	}
	,addEventTarget: function(i) {
		var level;
		var i1 = i;
		var lv = 0;
		while(i1 != null) {
			i1 = i1.parent;
			lv++;
		}
		level = lv;
		var _g1 = 0;
		var _g = this.interactive.length;
		while(_g1 < _g) {
			var index = _g1++;
			var i11 = i;
			var i2 = this.interactive[index];
			var lv1 = level;
			var lv2;
			var i3 = i2;
			var lv3 = 0;
			while(i3 != null) {
				i3 = i3.parent;
				lv3++;
			}
			lv2 = lv3;
			var p1 = i11;
			var p2 = i2;
			while(lv1 > lv2) {
				i11 = p1;
				p1 = p1.parent;
				lv1--;
			}
			while(lv2 > lv1) {
				i2 = p2;
				p2 = p2.parent;
				lv2--;
			}
			while(p1 != p2) {
				i11 = p1;
				p1 = p1.parent;
				i2 = p2;
				p2 = p2.parent;
			}
			if((function($this) {
				var $r;
				var id = -1;
				{
					var _g11 = 0;
					var _g2 = p1.childs.length;
					while(_g11 < _g2) {
						var k = _g11++;
						if(p1.childs[k] == i11) {
							id = k;
							break;
						}
					}
				}
				$r = id;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var id1 = -1;
				{
					var _g12 = 0;
					var _g3 = p2.childs.length;
					while(_g12 < _g3) {
						var k1 = _g12++;
						if(p2.childs[k1] == i2) {
							id1 = k1;
							break;
						}
					}
				}
				$r = id1;
				return $r;
			}(this))) {
				this.interactive.splice(index,0,i);
				return;
			}
		}
		this.interactive.push(i);
	}
	,removeEventTarget: function(i) {
		var _g1 = 0;
		var _g = this.interactive.length;
		while(_g1 < _g) {
			var k = _g1++;
			if(this.interactive[k] == i) {
				this.interactive.splice(k,1);
				break;
			}
		}
	}
	,setElapsedTime: function(v) {
		this.ctx.elapsedTime = v;
	}
	,render: function(engine) {
		this.ctx.engine = engine;
		this.ctx.frame++;
		this.ctx.time += this.ctx.elapsedTime;
		this.sync(this.ctx);
		if(this.childs.length == 0) return;
		this.ctx.begin();
		this.drawRec(this.ctx);
		this.ctx.end();
	}
	,sync: function(ctx) {
		if(!this.allocated) this.onAlloc();
		if(!this.fixedSize && (this.width != ctx.engine.width || this.height != ctx.engine.height)) {
			this.width = ctx.engine.width;
			this.height = ctx.engine.height;
			this.posChanged = true;
		}
		h2d_Layers.prototype.sync.call(this,ctx);
	}
	,__class__: h2d_Scene
});
var h2d_Tile = function(tex,x,y,w,h,dx,dy) {
	if(dy == null) dy = 0;
	if(dx == null) dx = 0;
	this.innerTex = tex;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.dx = dx;
	this.dy = dy;
	if(tex != null) this.setTexture(tex);
};
$hxClasses["h2d.Tile"] = h2d_Tile;
h2d_Tile.__name__ = true;
h2d_Tile.fromColor = function(color,width,height,alpha,allocPos) {
	if(alpha == null) alpha = 1.;
	if(height == null) height = 1;
	if(width == null) width = 1;
	var t = new h2d_Tile(h3d_mat_Texture.fromColor(color,alpha,allocPos),0,0,1,1);
	t.width = width;
	t.height = height;
	return t;
};
h2d_Tile.fromTexture = function(t) {
	return new h2d_Tile(t,0,0,t.width,t.height);
};
h2d_Tile.prototype = {
	setTexture: function(tex) {
		this.innerTex = tex;
		if(tex != null) {
			this.u = this.x / tex.width;
			this.v = this.y / tex.height;
			this.u2 = (this.x + this.width) / tex.width;
			this.v2 = (this.y + this.height) / tex.height;
		}
	}
	,__class__: h2d_Tile
};
var h2d_col_Bounds = function() {
	this.xMin = 1e20;
	this.yMin = 1e20;
	this.xMax = -1e20;
	this.yMax = -1e20;
};
$hxClasses["h2d.col.Bounds"] = h2d_col_Bounds;
h2d_col_Bounds.__name__ = true;
h2d_col_Bounds.prototype = {
	addPos: function(x,y) {
		if(x < this.xMin) this.xMin = x;
		if(x > this.xMax) this.xMax = x;
		if(y < this.yMin) this.yMin = y;
		if(y > this.yMax) this.yMax = y;
	}
	,__class__: h2d_col_Bounds
};
var h2d_filter_Filter = function() {
	this.boundsExtend = 0.;
	this.autoBounds = true;
};
$hxClasses["h2d.filter.Filter"] = h2d_filter_Filter;
h2d_filter_Filter.__name__ = true;
h2d_filter_Filter.prototype = {
	sync: function(ctx,s) {
	}
	,getBounds: function(s,bounds) {
		s.getBounds(s,bounds);
		bounds.xMin -= this.boundsExtend;
		bounds.yMin -= this.boundsExtend;
		bounds.xMax += this.boundsExtend;
		bounds.yMax += this.boundsExtend;
	}
	,draw: function(ctx,input) {
		return input;
	}
	,__class__: h2d_filter_Filter
};
var h3d_BufferFlag = $hxClasses["h3d.BufferFlag"] = { __ename__ : true, __constructs__ : ["Dynamic","Triangles","Quads","Managed","RawFormat","NoAlloc"] };
h3d_BufferFlag.Dynamic = ["Dynamic",0];
h3d_BufferFlag.Dynamic.toString = $estr;
h3d_BufferFlag.Dynamic.__enum__ = h3d_BufferFlag;
h3d_BufferFlag.Triangles = ["Triangles",1];
h3d_BufferFlag.Triangles.toString = $estr;
h3d_BufferFlag.Triangles.__enum__ = h3d_BufferFlag;
h3d_BufferFlag.Quads = ["Quads",2];
h3d_BufferFlag.Quads.toString = $estr;
h3d_BufferFlag.Quads.__enum__ = h3d_BufferFlag;
h3d_BufferFlag.Managed = ["Managed",3];
h3d_BufferFlag.Managed.toString = $estr;
h3d_BufferFlag.Managed.__enum__ = h3d_BufferFlag;
h3d_BufferFlag.RawFormat = ["RawFormat",4];
h3d_BufferFlag.RawFormat.toString = $estr;
h3d_BufferFlag.RawFormat.__enum__ = h3d_BufferFlag;
h3d_BufferFlag.NoAlloc = ["NoAlloc",5];
h3d_BufferFlag.NoAlloc.toString = $estr;
h3d_BufferFlag.NoAlloc.__enum__ = h3d_BufferFlag;
h3d_BufferFlag.__empty_constructs__ = [h3d_BufferFlag.Dynamic,h3d_BufferFlag.Triangles,h3d_BufferFlag.Quads,h3d_BufferFlag.Managed,h3d_BufferFlag.RawFormat,h3d_BufferFlag.NoAlloc];
var h3d_Buffer = function(vertices,stride,flags,allocPos) {
	this.id = h3d_Buffer.GUID++;
	this.vertices = vertices;
	this.flags = 0;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f[1];
		}
	}
	if((this.flags & 1 << h3d_BufferFlag.Quads[1]) != 0 || (this.flags & 1 << h3d_BufferFlag.Triangles[1]) != 0) this.flags |= 1 << h3d_BufferFlag.Managed[1];
	if(!((this.flags & 1 << h3d_BufferFlag.NoAlloc[1]) != 0)) h3d_Engine.CURRENT.mem.allocBuffer(this,stride);
};
$hxClasses["h3d.Buffer"] = h3d_Buffer;
h3d_Buffer.__name__ = true;
h3d_Buffer.ofFloats = function(v,stride,flags,allocPos) {
	var nvert = v.length / stride | 0;
	var b = new h3d_Buffer(nvert,stride,flags,allocPos);
	b.uploadVector(v,0,nvert);
	return b;
};
h3d_Buffer.prototype = {
	isDisposed: function() {
		return this.buffer == null || this.buffer.vbuf == null;
	}
	,dispose: function() {
		if(this.buffer != null) {
			this.buffer.freeBuffer(this);
			this.buffer = null;
			if(this.next != null) this.next.dispose();
		}
	}
	,totalVertices: function() {
		var count = 0;
		var b = this;
		while(b != null) {
			count += b.vertices;
			b = b.next;
		}
		return count;
	}
	,uploadVector: function(buf,bufPos,vertices) {
		var cur = this;
		while(vertices > 0) {
			if(cur == null) throw new js__$Boot_HaxeError("Too many vertices");
			var count;
			if(vertices > cur.vertices) count = cur.vertices; else count = vertices;
			cur.buffer.uploadVertexBuffer(cur.position,count,buf,bufPos);
			bufPos += count * this.buffer.stride;
			vertices -= count;
			cur = cur.next;
		}
	}
	,__class__: h3d_Buffer
};
var h3d_Camera = function(fovY,zoom,screenRatio,zNear,zFar,rightHanded) {
	if(rightHanded == null) rightHanded = false;
	if(zFar == null) zFar = 4000.;
	if(zNear == null) zNear = 0.02;
	if(screenRatio == null) screenRatio = 1.333333;
	if(zoom == null) zoom = 1.;
	if(fovY == null) fovY = 25.;
	this.viewY = 0.;
	this.viewX = 0.;
	this.fovY = fovY;
	this.zoom = zoom;
	this.screenRatio = screenRatio;
	this.zNear = zNear;
	this.zFar = zFar;
	this.rightHanded = rightHanded;
	this.pos = new h3d_Vector(2,3,4);
	this.up = new h3d_Vector(0,0,1);
	this.target = new h3d_Vector(0,0,0);
	this.m = new h3d_Matrix();
	this.mcam = new h3d_Matrix();
	this.mproj = new h3d_Matrix();
	this.update();
};
$hxClasses["h3d.Camera"] = h3d_Camera;
h3d_Camera.__name__ = true;
h3d_Camera.prototype = {
	getInverseViewProj: function() {
		if(this.minv == null) this.minv = new h3d_Matrix();
		if(this.needInv) {
			this.minv.inverse(this.m);
			this.needInv = false;
		}
		return this.minv;
	}
	,update: function() {
		if(this.follow != null) {
			this.pos.set(0,0,0,null);
			this.target.set(0,0,0,null);
			this.follow.pos.localToGlobal(this.pos);
			this.follow.target.localToGlobal(this.target);
		}
		this.makeCameraMatrix(this.mcam);
		this.makeFrustumMatrix(this.mproj);
		this.m.multiply(this.mcam,this.mproj);
		this.needInv = true;
	}
	,makeCameraMatrix: function(m) {
		var az;
		if(this.rightHanded) az = this.pos.sub(this.target); else az = this.target.sub(this.pos);
		az.normalize();
		var ax = this.up.cross(az);
		ax.normalize();
		if(Math.sqrt(ax.x * ax.x + ax.y * ax.y + ax.z * ax.z) == 0) {
			ax.x = az.y;
			ax.y = az.z;
			ax.z = az.x;
		}
		var ay = new h3d_Vector(az.y * ax.z - az.z * ax.y,az.z * ax.x - az.x * ax.z,az.x * ax.y - az.y * ax.x,1);
		m._11 = ax.x;
		m._12 = ay.x;
		m._13 = az.x;
		m._14 = 0;
		m._21 = ax.y;
		m._22 = ay.y;
		m._23 = az.y;
		m._24 = 0;
		m._31 = ax.z;
		m._32 = ay.z;
		m._33 = az.z;
		m._34 = 0;
		m._41 = -ax.dot3(this.pos);
		m._42 = -ay.dot3(this.pos);
		m._43 = -az.dot3(this.pos);
		m._44 = 1;
	}
	,makeFrustumMatrix: function(m) {
		m.zero();
		var bounds = this.orthoBounds;
		if(bounds != null) {
			var w = 1 / (bounds.xMax - bounds.xMin);
			var h = 1 / (bounds.yMax - bounds.yMin);
			var d = 1 / (bounds.zMax - bounds.zMin);
			m._11 = 2 * w;
			m._22 = 2 * h;
			m._33 = d;
			m._41 = -(bounds.xMin + bounds.xMax) * w;
			m._42 = -(bounds.yMin + bounds.yMax) * h;
			m._43 = -bounds.zMin * d;
			m._44 = 1;
		} else {
			var degToRad = Math.PI / 180;
			var halfFovX = Math.atan(Math.tan(this.fovY * 0.5 * degToRad) * this.screenRatio);
			var scale = this.zoom / Math.tan(halfFovX);
			m._11 = scale;
			m._22 = scale * this.screenRatio;
			m._33 = this.zFar / (this.zFar - this.zNear);
			m._34 = 1;
			m._43 = -(this.zNear * this.zFar) / (this.zFar - this.zNear);
		}
		m._11 += this.viewX * m._14;
		m._21 += this.viewX * m._24;
		m._31 += this.viewX * m._34;
		m._41 += this.viewX * m._44;
		m._12 += this.viewY * m._14;
		m._22 += this.viewY * m._24;
		m._32 += this.viewY * m._34;
		m._42 += this.viewY * m._44;
		if(this.rightHanded) {
			m._33 *= -1;
			m._34 *= -1;
		}
	}
	,__class__: h3d_Camera
};
var h3d_Engine = function(hardware,aa) {
	if(aa == null) aa = 0;
	if(hardware == null) hardware = true;
	this.tmpVector = new h3d_Vector();
	this.frameCount = 0;
	this.backgroundColor = -16777216;
	this.hardware = hardware;
	this.antiAlias = aa;
	this.autoResize = true;
	this.set_fullScreen(!hxd_System.get_isWindowed());
	var stage = hxd_Stage.getInstance();
	this.realFps = stage.getFrameRate();
	this.lastTime = haxe_Timer.stamp();
	stage.addResizeEvent($bind(this,this.onStageResize));
	this.driver = new h3d_impl_GlDriver();
	h3d_Engine.CURRENT = this;
};
$hxClasses["h3d.Engine"] = h3d_Engine;
h3d_Engine.__name__ = true;
h3d_Engine.prototype = {
	init: function() {
		this.driver.init($bind(this,this.onCreate),!this.hardware);
	}
	,selectShader: function(shader) {
		if(this.driver.selectShader(shader)) this.shaderSwitches++;
	}
	,selectMaterial: function(pass) {
		this.driver.selectMaterial(pass);
	}
	,uploadShaderBuffers: function(buffers,which) {
		this.driver.uploadShaderBuffers(buffers,which);
	}
	,selectBuffer: function(buf) {
		if(buf.isDisposed()) return false;
		this.driver.selectBuffer(buf);
		return true;
	}
	,renderQuadBuffer: function(b,start,max) {
		if(max == null) max = -1;
		if(start == null) start = 0;
		this.renderBuffer(b,this.mem.quadIndexes,2,start,max);
		return;
	}
	,renderBuffer: function(b,indexes,vertPerTri,startTri,drawTri) {
		if(drawTri == null) drawTri = -1;
		if(startTri == null) startTri = 0;
		if(indexes.isDisposed()) return;
		do {
			var ntri = b.vertices / vertPerTri | 0;
			var pos = b.position / vertPerTri | 0;
			if(startTri > 0) {
				if(startTri >= ntri) {
					startTri -= ntri;
					b = b.next;
					continue;
				}
				pos += startTri;
				ntri -= startTri;
				startTri = 0;
			}
			if(drawTri >= 0) {
				if(drawTri == 0) return;
				drawTri -= ntri;
				if(drawTri < 0) {
					ntri += drawTri;
					drawTri = 0;
				}
			}
			if(ntri > 0 && this.selectBuffer(b)) {
				this.driver.draw(indexes.ibuf,pos * 3,ntri);
				this.drawTriangles += ntri;
				this.drawCalls++;
			}
			b = b.next;
		} while(b != null);
	}
	,renderIndexed: function(b,indexes,startTri,drawTri) {
		if(drawTri == null) drawTri = -1;
		if(startTri == null) startTri = 0;
		if(b.next != null) throw new js__$Boot_HaxeError("Buffer is split");
		if(indexes.isDisposed()) return;
		var maxTri = indexes.count / 3 | 0;
		if(drawTri < 0) drawTri = maxTri - startTri;
		if(drawTri > 0 && this.selectBuffer(b)) {
			this.driver.draw(indexes.ibuf,startTri * 3,drawTri);
			this.drawTriangles += drawTri;
			this.drawCalls++;
		}
	}
	,set_debug: function(d) {
		this.debug = d;
		this.driver.setDebug(this.debug);
		return d;
	}
	,onCreate: function(disposed) {
		if(this.autoResize) {
			var stage = hxd_Stage.getInstance();
			this.width = stage.get_width();
			this.height = stage.get_height();
		}
		if(disposed) this.mem.onContextLost(); else {
			this.mem = new h3d_impl_MemoryManager(this.driver);
			this.mem.init();
		}
		this.hardware = this.driver.hasFeature(h3d_impl_Feature.HardwareAccelerated);
		this.set_debug(this.debug);
		this.set_fullScreen(this.fullScreen);
		this.resize(this.width,this.height);
		if(disposed) this.onContextLost(); else this.onReady();
	}
	,onContextLost: function() {
	}
	,onReady: function() {
	}
	,onStageResize: function() {
		if(this.autoResize && !this.driver.isDisposed()) {
			var stage = hxd_Stage.getInstance();
			var w = stage.get_width();
			var h = stage.get_height();
			if(w != this.width || h != this.height) this.resize(w,h);
			this.onResized();
		}
	}
	,set_fullScreen: function(v) {
		this.fullScreen = v;
		if(this.mem != null && hxd_System.get_isWindowed()) hxd_Stage.getInstance().setFullScreen(v);
		return v;
	}
	,onResized: function() {
	}
	,resize: function(width,height) {
		if(width < 32) width = 32;
		if(height < 32) height = 32;
		this.width = width;
		this.height = height;
		if(!this.driver.isDisposed()) this.driver.resize(width,height);
	}
	,begin: function() {
		if(this.driver.isDisposed()) return false;
		this.frameCount++;
		this.drawTriangles = 0;
		this.shaderSwitches = 0;
		this.drawCalls = 0;
		this.currentTarget = null;
		this.driver.begin(this.frameCount);
		if(this.backgroundColor != null) this.clear(this.backgroundColor,1,0);
		return true;
	}
	,reset: function() {
		this.driver.reset();
	}
	,hasFeature: function(f) {
		return this.driver.hasFeature(f);
	}
	,end: function() {
		this.driver.present();
		this.reset();
	}
	,setTarget: function(tex) {
		var prev = this.currentTarget;
		if(prev == tex) return prev;
		this.currentTarget = tex;
		this.driver.setRenderTarget(tex);
		return prev;
	}
	,clear: function(color,depth,stencil) {
		if(color != null) this.tmpVector.setColor(color,null);
		this.driver.clear(color == null?null:this.tmpVector,depth,stencil);
	}
	,render: function(obj) {
		if(!this.begin()) return false;
		obj.render(this);
		this.end();
		var delta = haxe_Timer.stamp() - this.lastTime;
		this.lastTime += delta;
		if(delta > 0) {
			var curFps = 1. / delta;
			if(curFps > this.realFps * 2) curFps = this.realFps * 2; else if(curFps < this.realFps * 0.5) curFps = this.realFps * 0.5;
			var f = delta / .5;
			if(f > 0.3) f = 0.3;
			this.realFps = this.realFps * (1 - f) + curFps * f;
		}
		return true;
	}
	,__class__: h3d_Engine
};
var h3d_Indexes = function(count) {
	this.mem = h3d_Engine.CURRENT.mem;
	this.count = count;
	this.mem.allocIndexes(this);
};
$hxClasses["h3d.Indexes"] = h3d_Indexes;
h3d_Indexes.__name__ = true;
h3d_Indexes.alloc = function(i) {
	var idx = new h3d_Indexes(i.length);
	idx.upload(i,0,i.length);
	return idx;
};
h3d_Indexes.prototype = {
	isDisposed: function() {
		return this.ibuf == null;
	}
	,upload: function(indexes,pos,count,bufferPos) {
		if(bufferPos == null) bufferPos = 0;
		this.mem.driver.uploadIndexBuffer(this.ibuf,pos,count,indexes,bufferPos);
	}
	,dispose: function() {
		if(this.ibuf != null) this.mem.deleteIndexes(this);
	}
	,__class__: h3d_Indexes
};
var h3d_Matrix = function() {
};
$hxClasses["h3d.Matrix"] = h3d_Matrix;
h3d_Matrix.__name__ = true;
h3d_Matrix.prototype = {
	zero: function() {
		this._11 = 0.0;
		this._12 = 0.0;
		this._13 = 0.0;
		this._14 = 0.0;
		this._21 = 0.0;
		this._22 = 0.0;
		this._23 = 0.0;
		this._24 = 0.0;
		this._31 = 0.0;
		this._32 = 0.0;
		this._33 = 0.0;
		this._34 = 0.0;
		this._41 = 0.0;
		this._42 = 0.0;
		this._43 = 0.0;
		this._44 = 0.0;
	}
	,identity: function() {
		this._11 = 1.0;
		this._12 = 0.0;
		this._13 = 0.0;
		this._14 = 0.0;
		this._21 = 0.0;
		this._22 = 1.0;
		this._23 = 0.0;
		this._24 = 0.0;
		this._31 = 0.0;
		this._32 = 0.0;
		this._33 = 1.0;
		this._34 = 0.0;
		this._41 = 0.0;
		this._42 = 0.0;
		this._43 = 0.0;
		this._44 = 1.0;
	}
	,multiply3x4: function(a,b) {
		this.multiply3x4inline(a,b);
	}
	,multiply3x4inline: function(a,b) {
		var m11 = a._11;
		var m12 = a._12;
		var m13 = a._13;
		var m21 = a._21;
		var m22 = a._22;
		var m23 = a._23;
		var a31 = a._31;
		var a32 = a._32;
		var a33 = a._33;
		var a41 = a._41;
		var a42 = a._42;
		var a43 = a._43;
		var b11 = b._11;
		var b12 = b._12;
		var b13 = b._13;
		var b21 = b._21;
		var b22 = b._22;
		var b23 = b._23;
		var b31 = b._31;
		var b32 = b._32;
		var b33 = b._33;
		var b41 = b._41;
		var b42 = b._42;
		var b43 = b._43;
		this._11 = m11 * b11 + m12 * b21 + m13 * b31;
		this._12 = m11 * b12 + m12 * b22 + m13 * b32;
		this._13 = m11 * b13 + m12 * b23 + m13 * b33;
		this._14 = 0;
		this._21 = m21 * b11 + m22 * b21 + m23 * b31;
		this._22 = m21 * b12 + m22 * b22 + m23 * b32;
		this._23 = m21 * b13 + m22 * b23 + m23 * b33;
		this._24 = 0;
		this._31 = a31 * b11 + a32 * b21 + a33 * b31;
		this._32 = a31 * b12 + a32 * b22 + a33 * b32;
		this._33 = a31 * b13 + a32 * b23 + a33 * b33;
		this._34 = 0;
		this._41 = a41 * b11 + a42 * b21 + a43 * b31 + b41;
		this._42 = a41 * b12 + a42 * b22 + a43 * b32 + b42;
		this._43 = a41 * b13 + a42 * b23 + a43 * b33 + b43;
		this._44 = 1;
	}
	,multiply: function(a,b) {
		var a11 = a._11;
		var a12 = a._12;
		var a13 = a._13;
		var a14 = a._14;
		var a21 = a._21;
		var a22 = a._22;
		var a23 = a._23;
		var a24 = a._24;
		var a31 = a._31;
		var a32 = a._32;
		var a33 = a._33;
		var a34 = a._34;
		var a41 = a._41;
		var a42 = a._42;
		var a43 = a._43;
		var a44 = a._44;
		var b11 = b._11;
		var b12 = b._12;
		var b13 = b._13;
		var b14 = b._14;
		var b21 = b._21;
		var b22 = b._22;
		var b23 = b._23;
		var b24 = b._24;
		var b31 = b._31;
		var b32 = b._32;
		var b33 = b._33;
		var b34 = b._34;
		var b41 = b._41;
		var b42 = b._42;
		var b43 = b._43;
		var b44 = b._44;
		this._11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		this._12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		this._13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		this._14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
		this._21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		this._22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		this._23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		this._24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
		this._31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		this._32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		this._33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		this._34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
		this._41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		this._42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		this._43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		this._44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
	}
	,inverse3x4: function(m) {
		var m11 = m._11;
		var m12 = m._12;
		var m13 = m._13;
		var m21 = m._21;
		var m22 = m._22;
		var m23 = m._23;
		var m31 = m._31;
		var m32 = m._32;
		var m33 = m._33;
		var m41 = m._41;
		var m42 = m._42;
		var m43 = m._43;
		this._11 = m22 * m33 - m23 * m32;
		this._12 = m13 * m32 - m12 * m33;
		this._13 = m12 * m23 - m13 * m22;
		this._14 = 0;
		this._21 = m23 * m31 - m21 * m33;
		this._22 = m11 * m33 - m13 * m31;
		this._23 = m13 * m21 - m11 * m23;
		this._24 = 0;
		this._31 = m21 * m32 - m22 * m31;
		this._32 = m12 * m31 - m11 * m32;
		this._33 = m11 * m22 - m12 * m21;
		this._34 = 0;
		this._41 = -m21 * m32 * m43 + m21 * m33 * m42 + m31 * m22 * m43 - m31 * m23 * m42 - m41 * m22 * m33 + m41 * m23 * m32;
		this._42 = m11 * m32 * m43 - m11 * m33 * m42 - m31 * m12 * m43 + m31 * m13 * m42 + m41 * m12 * m33 - m41 * m13 * m32;
		this._43 = -m11 * m22 * m43 + m11 * m23 * m42 + m21 * m12 * m43 - m21 * m13 * m42 - m41 * m12 * m23 + m41 * m13 * m22;
		this._44 = m11 * m22 * m33 - m11 * m23 * m32 - m21 * m12 * m33 + m21 * m13 * m32 + m31 * m12 * m23 - m31 * m13 * m22;
		this._44 = 1;
		var det = m11 * this._11 + m12 * this._21 + m13 * this._31;
		if((det < 0?-det:det) < 1e-10) {
			this.zero();
			return;
		}
		var invDet = 1.0 / det;
		this._11 *= invDet;
		this._12 *= invDet;
		this._13 *= invDet;
		this._21 *= invDet;
		this._22 *= invDet;
		this._23 *= invDet;
		this._31 *= invDet;
		this._32 *= invDet;
		this._33 *= invDet;
		this._41 *= invDet;
		this._42 *= invDet;
		this._43 *= invDet;
	}
	,inverse: function(m) {
		var m11 = m._11;
		var m12 = m._12;
		var m13 = m._13;
		var m14 = m._14;
		var m21 = m._21;
		var m22 = m._22;
		var m23 = m._23;
		var m24 = m._24;
		var m31 = m._31;
		var m32 = m._32;
		var m33 = m._33;
		var m34 = m._34;
		var m41 = m._41;
		var m42 = m._42;
		var m43 = m._43;
		var m44 = m._44;
		this._11 = m22 * m33 * m44 - m22 * m34 * m43 - m32 * m23 * m44 + m32 * m24 * m43 + m42 * m23 * m34 - m42 * m24 * m33;
		this._12 = -m12 * m33 * m44 + m12 * m34 * m43 + m32 * m13 * m44 - m32 * m14 * m43 - m42 * m13 * m34 + m42 * m14 * m33;
		this._13 = m12 * m23 * m44 - m12 * m24 * m43 - m22 * m13 * m44 + m22 * m14 * m43 + m42 * m13 * m24 - m42 * m14 * m23;
		this._14 = -m12 * m23 * m34 + m12 * m24 * m33 + m22 * m13 * m34 - m22 * m14 * m33 - m32 * m13 * m24 + m32 * m14 * m23;
		this._21 = -m21 * m33 * m44 + m21 * m34 * m43 + m31 * m23 * m44 - m31 * m24 * m43 - m41 * m23 * m34 + m41 * m24 * m33;
		this._22 = m11 * m33 * m44 - m11 * m34 * m43 - m31 * m13 * m44 + m31 * m14 * m43 + m41 * m13 * m34 - m41 * m14 * m33;
		this._23 = -m11 * m23 * m44 + m11 * m24 * m43 + m21 * m13 * m44 - m21 * m14 * m43 - m41 * m13 * m24 + m41 * m14 * m23;
		this._24 = m11 * m23 * m34 - m11 * m24 * m33 - m21 * m13 * m34 + m21 * m14 * m33 + m31 * m13 * m24 - m31 * m14 * m23;
		this._31 = m21 * m32 * m44 - m21 * m34 * m42 - m31 * m22 * m44 + m31 * m24 * m42 + m41 * m22 * m34 - m41 * m24 * m32;
		this._32 = -m11 * m32 * m44 + m11 * m34 * m42 + m31 * m12 * m44 - m31 * m14 * m42 - m41 * m12 * m34 + m41 * m14 * m32;
		this._33 = m11 * m22 * m44 - m11 * m24 * m42 - m21 * m12 * m44 + m21 * m14 * m42 + m41 * m12 * m24 - m41 * m14 * m22;
		this._34 = -m11 * m22 * m34 + m11 * m24 * m32 + m21 * m12 * m34 - m21 * m14 * m32 - m31 * m12 * m24 + m31 * m14 * m22;
		this._41 = -m21 * m32 * m43 + m21 * m33 * m42 + m31 * m22 * m43 - m31 * m23 * m42 - m41 * m22 * m33 + m41 * m23 * m32;
		this._42 = m11 * m32 * m43 - m11 * m33 * m42 - m31 * m12 * m43 + m31 * m13 * m42 + m41 * m12 * m33 - m41 * m13 * m32;
		this._43 = -m11 * m22 * m43 + m11 * m23 * m42 + m21 * m12 * m43 - m21 * m13 * m42 - m41 * m12 * m23 + m41 * m13 * m22;
		this._44 = m11 * m22 * m33 - m11 * m23 * m32 - m21 * m12 * m33 + m21 * m13 * m32 + m31 * m12 * m23 - m31 * m13 * m22;
		var det = m11 * this._11 + m12 * this._21 + m13 * this._31 + m14 * this._41;
		if((det < 0?-det:det) < 1e-10) {
			this.zero();
			return;
		}
		det = 1.0 / det;
		this._11 *= det;
		this._12 *= det;
		this._13 *= det;
		this._14 *= det;
		this._21 *= det;
		this._22 *= det;
		this._23 *= det;
		this._24 *= det;
		this._31 *= det;
		this._32 *= det;
		this._33 *= det;
		this._34 *= det;
		this._41 *= det;
		this._42 *= det;
		this._43 *= det;
		this._44 *= det;
	}
	,__class__: h3d_Matrix
};
var h3d_Quat = function(x,y,z,w) {
	if(w == null) w = 1.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
$hxClasses["h3d.Quat"] = h3d_Quat;
h3d_Quat.__name__ = true;
h3d_Quat.prototype = {
	saveToMatrix: function(m) {
		var xx = this.x * this.x;
		var xy = this.x * this.y;
		var xz = this.x * this.z;
		var xw = this.x * this.w;
		var yy = this.y * this.y;
		var yz = this.y * this.z;
		var yw = this.y * this.w;
		var zz = this.z * this.z;
		var zw = this.z * this.w;
		m._11 = 1 - 2 * (yy + zz);
		m._12 = 2 * (xy + zw);
		m._13 = 2 * (xz - yw);
		m._14 = 0;
		m._21 = 2 * (xy - zw);
		m._22 = 1 - 2 * (xx + zz);
		m._23 = 2 * (yz + xw);
		m._24 = 0;
		m._31 = 2 * (xz + yw);
		m._32 = 2 * (yz - xw);
		m._33 = 1 - 2 * (xx + yy);
		m._34 = 0;
		m._41 = 0;
		m._42 = 0;
		m._43 = 0;
		m._44 = 1;
		return m;
	}
	,__class__: h3d_Quat
};
var h3d_Vector = function(x,y,z,w) {
	if(w == null) w = 1.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
$hxClasses["h3d.Vector"] = h3d_Vector;
h3d_Vector.__name__ = true;
h3d_Vector.prototype = {
	sub: function(v) {
		return new h3d_Vector(this.x - v.x,this.y - v.y,this.z - v.z,this.w - v.w);
	}
	,add: function(v) {
		return new h3d_Vector(this.x + v.x,this.y + v.y,this.z + v.z,this.w + v.w);
	}
	,cross: function(v) {
		return new h3d_Vector(this.y * v.z - this.z * v.y,this.z * v.x - this.x * v.z,this.x * v.y - this.y * v.x,1);
	}
	,dot3: function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	,normalize: function() {
		var k = this.x * this.x + this.y * this.y + this.z * this.z;
		if(k < 1e-10) k = 0; else k = 1. / Math.sqrt(k);
		this.x *= k;
		this.y *= k;
		this.z *= k;
	}
	,set: function(x,y,z,w) {
		if(w == null) w = 1.;
		if(z == null) z = 0.;
		if(y == null) y = 0.;
		if(x == null) x = 0.;
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	,load: function(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = v.w;
	}
	,transform3x4: function(m) {
		var px = this.x * m._11 + this.y * m._21 + this.z * m._31 + this.w * m._41;
		var py = this.x * m._12 + this.y * m._22 + this.z * m._32 + this.w * m._42;
		var pz = this.x * m._13 + this.y * m._23 + this.z * m._33 + this.w * m._43;
		this.x = px;
		this.y = py;
		this.z = pz;
	}
	,setColor: function(c,scale) {
		if(scale == null) scale = 1.0;
		var s = scale / 255;
		this.x = (c >> 16 & 255) * s;
		this.y = (c >> 8 & 255) * s;
		this.z = (c & 255) * s;
		this.w = (c >>> 24) * s;
	}
	,__class__: h3d_Vector
};
var h3d_anim__$Animation_AnimWait = function() { };
$hxClasses["h3d.anim._Animation.AnimWait"] = h3d_anim__$Animation_AnimWait;
h3d_anim__$Animation_AnimWait.__name__ = true;
h3d_anim__$Animation_AnimWait.prototype = {
	__class__: h3d_anim__$Animation_AnimWait
};
var h3d_anim_Animation = function() { };
$hxClasses["h3d.anim.Animation"] = h3d_anim_Animation;
h3d_anim_Animation.__name__ = true;
h3d_anim_Animation.prototype = {
	sync: function(decompose) {
		if(decompose == null) decompose = false;
		throw new js__$Boot_HaxeError("assert");
	}
	,isPlaying: function() {
		return !this.pause && (this.speed < 0?-this.speed:this.speed) > 0.000001;
	}
	,endFrame: function() {
		return this.frameCount;
	}
	,update: function(dt) {
		if(!this.isInstance) throw new js__$Boot_HaxeError("You must instanciate this animation first");
		if(!this.isPlaying()) return 0;
		var w = this.waits;
		var prev = null;
		while(w != null) {
			var wt = (w.frame - this.frame) / (this.speed * this.sampling);
			if(wt <= 0) {
				prev = w;
				w = w.next;
				continue;
			}
			if(wt > dt) break;
			this.frame = w.frame;
			dt -= wt;
			if(prev == null) this.waits = w.next; else prev.next = w.next;
			w.callb();
			return dt;
		}
		if(this.onAnimEnd != null) {
			var end = this.endFrame();
			var et = (end - this.frame) / (this.speed * this.sampling);
			if(et <= dt && et > 0) {
				this.frame = end;
				dt -= et;
				this.onAnimEnd();
				if(this.frame == end && this.isPlaying()) {
					if(this.loop) this.frame = 0; else dt = 0;
				}
				return dt;
			}
		}
		this.frame += dt * this.speed * this.sampling;
		if(this.frame >= this.frameCount) {
			if(this.loop) this.frame %= this.frameCount; else this.frame = this.frameCount;
		}
		return 0;
	}
	,__class__: h3d_anim_Animation
};
var h3d_col_Bounds = function() {
	this.xMin = 1e20;
	this.xMax = -1e20;
	this.yMin = 1e20;
	this.yMax = -1e20;
	this.zMin = 1e20;
	this.zMax = -1e20;
};
$hxClasses["h3d.col.Bounds"] = h3d_col_Bounds;
h3d_col_Bounds.__name__ = true;
h3d_col_Bounds.prototype = {
	empty: function() {
		this.xMin = 1e20;
		this.xMax = -1e20;
		this.yMin = 1e20;
		this.yMax = -1e20;
		this.zMin = 1e20;
		this.zMax = -1e20;
	}
	,__class__: h3d_col_Bounds
};
var h3d_col_Frustum = function(mvp) {
	this.checkNearFar = true;
	this.pleft = new h3d_col_Plane(mvp._14 + mvp._11,mvp._24 + mvp._21,mvp._34 + mvp._31,-(mvp._44 + mvp._41));
	this.pright = new h3d_col_Plane(mvp._14 - mvp._11,mvp._24 - mvp._21,mvp._34 - mvp._31,mvp._41 - mvp._44);
	this.ptop = new h3d_col_Plane(mvp._14 - mvp._12,mvp._24 - mvp._22,mvp._34 - mvp._32,mvp._42 - mvp._44);
	this.pbottom = new h3d_col_Plane(mvp._14 + mvp._12,mvp._24 + mvp._22,mvp._34 + mvp._32,-(mvp._44 + mvp._42));
	this.pnear = new h3d_col_Plane(mvp._13,mvp._23,mvp._33,-mvp._43);
	this.pfar = new h3d_col_Plane(mvp._14 - mvp._13,mvp._24 - mvp._23,mvp._34 - mvp._33,mvp._43 - mvp._44);
	this.pleft.normalize();
	this.pright.normalize();
	this.ptop.normalize();
	this.pbottom.normalize();
	this.pnear.normalize();
	this.pfar.normalize();
};
$hxClasses["h3d.col.Frustum"] = h3d_col_Frustum;
h3d_col_Frustum.__name__ = true;
h3d_col_Frustum.prototype = {
	checkSphere: function(s) {
		var p = new h3d_col_Point(s.x,s.y,s.z);
		if(this.pleft.distance(p) < -s.r) return false;
		if(this.pright.distance(p) < -s.r) return false;
		if(this.ptop.distance(p) < -s.r) return false;
		if(this.pbottom.distance(p) < -s.r) return false;
		if(this.checkNearFar) {
			if(this.pnear.distance(p) < -s.r) return false;
			if(this.pfar.distance(p) < -s.r) return false;
		}
		return true;
	}
	,__class__: h3d_col_Frustum
};
var h3d_col_Plane = function(nx,ny,nz,d) {
	this.nx = nx;
	this.ny = ny;
	this.nz = nz;
	this.d = d;
};
$hxClasses["h3d.col.Plane"] = h3d_col_Plane;
h3d_col_Plane.__name__ = true;
h3d_col_Plane.prototype = {
	normalize: function() {
		var len = 1. / Math.sqrt(this.nx * this.nx + this.ny * this.ny + this.nz * this.nz);
		this.nx *= len;
		this.ny *= len;
		this.nz *= len;
		this.d *= len;
	}
	,distance: function(p) {
		return this.nx * p.x + this.ny * p.y + this.nz * p.z - this.d;
	}
	,__class__: h3d_col_Plane
};
var h3d_col_Point = function(x,y,z) {
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["h3d.col.Point"] = h3d_col_Point;
h3d_col_Point.__name__ = true;
h3d_col_Point.prototype = {
	cross: function(p) {
		return new h3d_col_Point(this.y * p.z - this.z * p.y,this.z * p.x - this.x * p.z,this.x * p.y - this.y * p.x);
	}
	,normalize: function() {
		var k = this.x * this.x + this.y * this.y + this.z * this.z;
		if(k < 1e-10) k = 0; else k = 1. / Math.sqrt(k);
		this.x *= k;
		this.y *= k;
		this.z *= k;
	}
	,__class__: h3d_col_Point
};
var h3d_col_Sphere = function(x,y,z,r) {
	if(r == null) r = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
};
$hxClasses["h3d.col.Sphere"] = h3d_col_Sphere;
h3d_col_Sphere.__name__ = true;
h3d_col_Sphere.prototype = {
	__class__: h3d_col_Sphere
};
var h3d_impl_Feature = $hxClasses["h3d.impl.Feature"] = { __ename__ : true, __constructs__ : ["StandardDerivatives","FloatTextures","PerTargetDepthBuffer","TargetUseDefaultDepthBuffer","HardwareAccelerated","FullClearRequired"] };
h3d_impl_Feature.StandardDerivatives = ["StandardDerivatives",0];
h3d_impl_Feature.StandardDerivatives.toString = $estr;
h3d_impl_Feature.StandardDerivatives.__enum__ = h3d_impl_Feature;
h3d_impl_Feature.FloatTextures = ["FloatTextures",1];
h3d_impl_Feature.FloatTextures.toString = $estr;
h3d_impl_Feature.FloatTextures.__enum__ = h3d_impl_Feature;
h3d_impl_Feature.PerTargetDepthBuffer = ["PerTargetDepthBuffer",2];
h3d_impl_Feature.PerTargetDepthBuffer.toString = $estr;
h3d_impl_Feature.PerTargetDepthBuffer.__enum__ = h3d_impl_Feature;
h3d_impl_Feature.TargetUseDefaultDepthBuffer = ["TargetUseDefaultDepthBuffer",3];
h3d_impl_Feature.TargetUseDefaultDepthBuffer.toString = $estr;
h3d_impl_Feature.TargetUseDefaultDepthBuffer.__enum__ = h3d_impl_Feature;
h3d_impl_Feature.HardwareAccelerated = ["HardwareAccelerated",4];
h3d_impl_Feature.HardwareAccelerated.toString = $estr;
h3d_impl_Feature.HardwareAccelerated.__enum__ = h3d_impl_Feature;
h3d_impl_Feature.FullClearRequired = ["FullClearRequired",5];
h3d_impl_Feature.FullClearRequired.toString = $estr;
h3d_impl_Feature.FullClearRequired.__enum__ = h3d_impl_Feature;
h3d_impl_Feature.__empty_constructs__ = [h3d_impl_Feature.StandardDerivatives,h3d_impl_Feature.FloatTextures,h3d_impl_Feature.PerTargetDepthBuffer,h3d_impl_Feature.TargetUseDefaultDepthBuffer,h3d_impl_Feature.HardwareAccelerated,h3d_impl_Feature.FullClearRequired];
var h3d_impl_Driver = function() { };
$hxClasses["h3d.impl.Driver"] = h3d_impl_Driver;
h3d_impl_Driver.__name__ = true;
h3d_impl_Driver.prototype = {
	hasFeature: function(f) {
		return false;
	}
	,isDisposed: function() {
		return true;
	}
	,begin: function(frame) {
	}
	,clear: function(color,depth,stencil) {
	}
	,reset: function() {
	}
	,init: function(onCreate,forceSoftware) {
		if(forceSoftware == null) forceSoftware = false;
	}
	,resize: function(width,height) {
	}
	,selectShader: function(shader) {
		return false;
	}
	,selectMaterial: function(pass) {
	}
	,uploadShaderBuffers: function(buffers,which) {
	}
	,selectBuffer: function(buffer) {
	}
	,draw: function(ibuf,startIndex,ntriangles) {
	}
	,setRenderTarget: function(tex) {
	}
	,present: function() {
	}
	,setDebug: function(b) {
	}
	,allocTexture: function(t) {
		return null;
	}
	,allocIndexes: function(count) {
		return null;
	}
	,allocVertexes: function(m) {
		return null;
	}
	,disposeTexture: function(t) {
	}
	,disposeIndexes: function(i) {
	}
	,disposeVertexes: function(v) {
	}
	,uploadIndexBuffer: function(i,startIndice,indiceCount,buf,bufPos) {
	}
	,uploadVertexBuffer: function(v,startVertex,vertexCount,buf,bufPos) {
	}
	,uploadTexturePixels: function(t,pixels,mipLevel,side) {
	}
	,__class__: h3d_impl_Driver
};
var h3d_impl__$GlDriver_CompiledShader = function(s,vertex,shader) {
	this.s = s;
	this.vertex = vertex;
	this.shader = shader;
};
$hxClasses["h3d.impl._GlDriver.CompiledShader"] = h3d_impl__$GlDriver_CompiledShader;
h3d_impl__$GlDriver_CompiledShader.__name__ = true;
h3d_impl__$GlDriver_CompiledShader.prototype = {
	__class__: h3d_impl__$GlDriver_CompiledShader
};
var h3d_impl__$GlDriver_CompiledProgram = function() {
};
$hxClasses["h3d.impl._GlDriver.CompiledProgram"] = h3d_impl__$GlDriver_CompiledProgram;
h3d_impl__$GlDriver_CompiledProgram.__name__ = true;
h3d_impl__$GlDriver_CompiledProgram.prototype = {
	__class__: h3d_impl__$GlDriver_CompiledProgram
};
var h3d_impl_GlDriver = function() {
	this.canvas = hxd_Stage.getCanvas();
	if(this.canvas == null) throw new js__$Boot_HaxeError("Canvas #webgl not found");
	this.gl = js_html__$CanvasElement_CanvasUtil.getContextWebGL(this.canvas,{ alpha : false});
	if(this.gl == null) throw new js__$Boot_HaxeError("Could not acquire GL context");
	if(typeof(WebGLDebugUtils) != "undefined") this.gl = WebGLDebugUtils.makeDebugContext(this.gl);
	this.programs = new haxe_ds_IntMap();
	this.curAttribs = 0;
	this.curMatBits = -1;
	this.gl.pixelStorei(37440,1);
};
$hxClasses["h3d.impl.GlDriver"] = h3d_impl_GlDriver;
h3d_impl_GlDriver.__name__ = true;
h3d_impl_GlDriver.__super__ = h3d_impl_Driver;
h3d_impl_GlDriver.prototype = $extend(h3d_impl_Driver.prototype,{
	begin: function(frame) {
		this.frame = frame;
		this.reset();
	}
	,reset: function() {
		this.gl.useProgram(null);
		this.curShader = null;
		this.curBuffer = null;
	}
	,compileShader: function(glout,shader) {
		var type;
		if(shader.vertex) type = 35633; else type = 35632;
		var s = this.gl.createShader(type);
		var code = glout.run(shader.data);
		this.gl.shaderSource(s,code);
		this.gl.compileShader(s);
		if(this.gl.getShaderParameter(s,35713) != 1) {
			var log = this.gl.getShaderInfoLog(s);
			var line = code.split("\n")[Std.parseInt(HxOverrides.substr(log,9,null)) - 1];
			if(line == null) line = ""; else line = "(" + StringTools.trim(line) + ")";
			throw new js__$Boot_HaxeError("An error occurred compiling the shaders: " + log + line);
		}
		return new h3d_impl__$GlDriver_CompiledShader(s,shader.vertex,shader);
	}
	,initShader: function(p,s,shader) {
		var prefix;
		if(s.vertex) prefix = "vertex"; else prefix = "fragment";
		s.globals = this.gl.getUniformLocation(p.p,prefix + "Globals");
		s.params = this.gl.getUniformLocation(p.p,prefix + "Params");
		var _g = [];
		var _g2 = 0;
		var _g1 = shader.textures2DCount;
		while(_g2 < _g1) {
			var i = _g2++;
			_g.push(this.gl.getUniformLocation(p.p,prefix + "Textures[" + i + "]"));
		}
		s.textures = _g;
	}
	,selectShader: function(shader) {
		var p = this.programs.h[shader.id];
		if(p == null) {
			p = new h3d_impl__$GlDriver_CompiledProgram();
			var glout = new hxsl_GlslOut();
			p.vertex = this.compileShader(glout,shader.vertex);
			p.fragment = this.compileShader(glout,shader.fragment);
			p.p = this.gl.createProgram();
			this.gl.attachShader(p.p,p.vertex.s);
			this.gl.attachShader(p.p,p.fragment.s);
			this.gl.linkProgram(p.p);
			this.gl.deleteShader(p.vertex.s);
			this.gl.deleteShader(p.fragment.s);
			if(this.gl.getProgramParameter(p.p,35714) != 1) {
				var log = this.gl.getProgramInfoLog(p.p);
				throw new js__$Boot_HaxeError("Program linkage failure: " + log);
			}
			this.initShader(p,p.vertex,shader.vertex);
			this.initShader(p,p.fragment,shader.fragment);
			p.attribNames = [];
			p.attribs = [];
			p.stride = 0;
			var _g = 0;
			var _g1 = shader.vertex.data.vars;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				var _g2 = v.kind;
				switch(_g2[1]) {
				case 1:
					var t = 5126;
					var size;
					{
						var _g3 = v.type;
						switch(_g3[1]) {
						case 5:
							var n = _g3[2];
							size = n;
							break;
						case 9:
							var n1 = _g3[2];
							t = 5120;
							size = n1;
							break;
						case 3:
							size = 1;
							break;
						default:
							throw new js__$Boot_HaxeError("assert " + Std.string(v.type));
						}
					}
					var index = this.gl.getAttribLocation(p.p,glout.varNames.h[v.id]);
					if(index < 0) continue;
					p.attribs.push({ offset : p.stride, index : index, size : size, type : t});
					p.attribNames.push(v.name);
					p.stride += size;
					break;
				default:
				}
			}
			this.programs.h[shader.id] = p;
		}
		if(this.curShader == p) return false;
		this.gl.useProgram(p.p);
		var _g11 = this.curAttribs;
		var _g4 = p.attribs.length;
		while(_g11 < _g4) {
			var i = _g11++;
			this.gl.enableVertexAttribArray(i);
			this.curAttribs++;
		}
		while(this.curAttribs > p.attribs.length) this.gl.disableVertexAttribArray(--this.curAttribs);
		this.curShader = p;
		this.curBuffer = null;
		return true;
	}
	,uploadShaderBuffers: function(buf,which) {
		this.uploadBuffer(this.curShader.vertex,buf.vertex,which);
		this.uploadBuffer(this.curShader.fragment,buf.fragment,which);
	}
	,uploadBuffer: function(s,buf,which) {
		switch(which) {
		case 0:
			if(s.globals != null) {
				var a = new Float32Array(buf.globals).subarray(0,s.shader.globalsSize * 4);
				this.gl.uniform4fv(s.globals,a);
			}
			break;
		case 1:
			if(s.params != null) {
				var a1 = new Float32Array(buf.params).subarray(0,s.shader.paramsSize * 4);
				this.gl.uniform4fv(s.params,a1);
			}
			break;
		case 2:
			var _g1 = 0;
			var _g = s.textures.length;
			while(_g1 < _g) {
				var i = _g1++;
				var t = buf.tex[i];
				if(t == null || t.t == null && t.realloc == null) t = h3d_mat_Texture.fromColor(16711935);
				if(t != null && t.t == null && t.realloc != null) {
					t.alloc();
					t.realloc();
				}
				t.lastFrame = this.frame;
				this.gl.activeTexture(33984 + i);
				this.gl.uniform1i(s.textures[i],i);
				this.gl.bindTexture(3553,t.t.t);
				var flags = h3d_impl_GlDriver.TFILTERS[t.mipMap[1]][t.filter[1]];
				this.gl.texParameteri(3553,10240,flags[0]);
				this.gl.texParameteri(3553,10241,flags[1]);
				var w = h3d_impl_GlDriver.TWRAP[t.wrap[1]];
				this.gl.texParameteri(3553,10242,w);
				this.gl.texParameteri(3553,10243,w);
			}
			break;
		}
	}
	,selectMaterial: function(pass) {
		this.selectMaterialBits(pass.bits);
	}
	,selectMaterialBits: function(bits) {
		var diff = bits ^ this.curMatBits;
		if(this.curMatBits < 0) diff = -1;
		if(diff == 0) return;
		if((diff & 3) != 0) {
			var cull = bits & 3;
			if(cull == 0) this.gl.disable(2884); else {
				if((this.curMatBits & 3) == 0) this.gl.enable(2884);
				this.gl.cullFace(h3d_impl_GlDriver.FACES[cull]);
			}
		}
		if((diff & 4194240) != 0) {
			var csrc = bits >> 6 & 15;
			var cdst = bits >> 10 & 15;
			var asrc = bits >> 14 & 15;
			var adst = bits >> 18 & 15;
			if(csrc == asrc && cdst == adst) {
				if(csrc == 0 && cdst == 1) this.gl.disable(3042); else {
					if(this.curMatBits < 0 || (this.curMatBits >> 6 & 15) == 0 && (this.curMatBits >> 10 & 15) == 1) this.gl.enable(3042);
					this.gl.blendFunc(h3d_impl_GlDriver.BLEND[csrc],h3d_impl_GlDriver.BLEND[cdst]);
				}
			} else {
				if(this.curMatBits < 0 || (this.curMatBits >> 6 & 15) == 0 && (this.curMatBits >> 10 & 15) == 1) this.gl.enable(3042);
				this.gl.blendFuncSeparate(h3d_impl_GlDriver.BLEND[csrc],h3d_impl_GlDriver.BLEND[cdst],h3d_impl_GlDriver.BLEND[asrc],h3d_impl_GlDriver.BLEND[adst]);
			}
		}
		if((diff & 62914560) != 0) {
			var cop = bits >> 22 & 3;
			var aop = bits >> 24 & 3;
			if(cop == aop) this.gl.blendEquation(h3d_impl_GlDriver.OP[cop]); else this.gl.blendEquationSeparate(h3d_impl_GlDriver.OP[cop],h3d_impl_GlDriver.OP[aop]);
		}
		if((diff & 4) != 0) this.gl.depthMask((bits >> 2 & 1) != 0);
		if((diff & 56) != 0) {
			var cmp = bits >> 3 & 7;
			if(cmp == 0) this.gl.disable(2929); else {
				if(this.curMatBits < 0 || (this.curMatBits >> 3 & 7) == 0) this.gl.enable(2929);
				this.gl.depthFunc(h3d_impl_GlDriver.COMPARE[cmp]);
			}
		}
		if((diff & 1006632960) != 0) {
			var m = bits >> 26 & 15;
			this.gl.colorMask((m & 1) != 0,(m & 2) != 0,(m & 4) != 0,(m & 8) != 0);
		}
		this.curMatBits = bits;
	}
	,clear: function(color,depth,stencil) {
		var bits = 0;
		if(color != null) {
			this.gl.clearColor(color.x,color.y,color.z,color.w);
			bits |= 16384;
		}
		if(depth != null) {
			this.gl.clearDepth(depth);
			bits |= 256;
		}
		if(stencil != null) {
			this.gl.clearStencil(stencil);
			bits |= 1024;
		}
		if(bits != 0) this.gl.clear(bits);
	}
	,resize: function(width,height) {
		if(this.canvas.style.width == "") {
			this.canvas.style.width = Std["int"](width / window.devicePixelRatio) + "px";
			this.canvas.style.height = Std["int"](height / window.devicePixelRatio) + "px";
		}
		this.canvas.width = width;
		this.canvas.height = height;
		this.bufferWidth = width;
		this.bufferHeight = height;
		this.gl.viewport(0,0,width,height);
	}
	,allocTexture: function(t) {
		if((t.flags & 1 << h3d_mat_TextureFlags.TargetUseDefaultDepth[1]) != 0) throw new js__$Boot_HaxeError("TargetUseDefaultDepth not supported in GL");
		var tt = this.gl.createTexture();
		var tt1 = { t : tt, width : t.width, height : t.height, fmt : 5121};
		if((t.flags & 1 << h3d_mat_TextureFlags.FmtFloat[1]) != 0) tt1.fmt = 5126; else if((t.flags & 1 << h3d_mat_TextureFlags.Fmt5_5_5_1[1]) != 0) tt1.fmt = 32820; else if((t.flags & 1 << h3d_mat_TextureFlags.Fmt5_6_5[1]) != 0) tt1.fmt = 33635; else if((t.flags & 1 << h3d_mat_TextureFlags.Fmt4_4_4_4[1]) != 0) tt1.fmt = 32819;
		t.lastFrame = this.frame;
		this.gl.bindTexture(3553,tt1.t);
		var mipMap;
		if((t.flags & 1 << h3d_mat_TextureFlags.MipMapped[1]) != 0) mipMap = 9985; else mipMap = 9729;
		this.gl.texParameteri(3553,10240,mipMap);
		this.gl.texParameteri(3553,10241,mipMap);
		this.gl.texImage2D(3553,0,6408,tt1.width,tt1.height,0,6408,tt1.fmt,null);
		if((t.flags & 1 << h3d_mat_TextureFlags.Target[1]) != 0) {
			var fb = this.gl.createFramebuffer();
			this.gl.bindFramebuffer(36160,fb);
			this.gl.framebufferTexture2D(36160,36064,3553,tt1.t,0);
			tt1.fb = fb;
			if((t.flags & 1 << h3d_mat_TextureFlags.TargetDepth[1]) != 0) {
				tt1.rb = this.gl.createRenderbuffer();
				this.gl.bindRenderbuffer(36161,tt1.rb);
				this.gl.renderbufferStorage(36161,33189,tt1.width,tt1.height);
				this.gl.framebufferRenderbuffer(36160,36096,36161,tt1.rb);
				this.gl.bindRenderbuffer(36161,null);
			}
			this.gl.bindFramebuffer(36160,null);
		}
		this.gl.bindTexture(3553,null);
		return tt1;
	}
	,allocVertexes: function(m) {
		var b = this.gl.createBuffer();
		this.gl.bindBuffer(34962,b);
		if(m.size * m.stride == 0) throw new js__$Boot_HaxeError("assert");
		this.gl.bufferData(34962,m.size * m.stride * 4,(m.flags & 1 << h3d_BufferFlag.Dynamic[1]) != 0?35048:35044);
		this.gl.bindBuffer(34962,null);
		return { b : b, stride : m.stride};
	}
	,allocIndexes: function(count) {
		var b = this.gl.createBuffer();
		this.gl.bindBuffer(34963,b);
		this.gl.bufferData(34963,count * 2,35044);
		this.gl.bindBuffer(34963,null);
		return b;
	}
	,disposeTexture: function(t) {
		this.gl.deleteTexture(t.t);
		if(t.rb != null) this.gl.deleteRenderbuffer(t.rb);
		if(t.fb != null) this.gl.deleteFramebuffer(t.fb);
	}
	,disposeIndexes: function(i) {
		this.gl.deleteBuffer(i);
	}
	,disposeVertexes: function(v) {
		this.gl.deleteBuffer(v.b);
	}
	,uploadTexturePixels: function(t,pixels,mipLevel,side) {
		this.gl.bindTexture(3553,t.t.t);
		pixels.convert(hxd_PixelFormat.RGBA);
		var pixels1 = new Uint8Array(pixels.bytes.b.buffer);
		this.gl.texImage2D(3553,mipLevel,6408,t.width,t.height,0,6408,5121,pixels1);
		if((t.flags & 1 << h3d_mat_TextureFlags.MipMapped[1]) != 0) this.gl.generateMipmap(3553);
		this.gl.bindTexture(3553,null);
	}
	,uploadVertexBuffer: function(v,startVertex,vertexCount,buf,bufPos) {
		var stride = v.stride;
		this.gl.bindBuffer(34962,v.b);
		var buf1 = new Float32Array(buf);
		var sub = new Float32Array(buf1.buffer,bufPos,vertexCount * stride);
		this.gl.bufferSubData(34962,startVertex * stride * 4,sub);
		this.gl.bindBuffer(34962,null);
	}
	,uploadIndexBuffer: function(i,startIndice,indiceCount,buf,bufPos) {
		this.gl.bindBuffer(34963,i);
		var buf1 = new Uint16Array(buf);
		var sub = new Uint16Array(buf1.buffer,bufPos,indiceCount);
		this.gl.bufferSubData(34963,startIndice * 2,sub);
		this.gl.bindBuffer(34963,null);
	}
	,selectBuffer: function(v) {
		if(v == this.curBuffer) return;
		if(this.curBuffer != null && v.buffer == this.curBuffer.buffer && (v.buffer.flags & 1 << h3d_BufferFlag.RawFormat[1]) != 0 == ((this.curBuffer.flags & 1 << h3d_BufferFlag.RawFormat[1]) != 0)) {
			this.curBuffer = v;
			return;
		}
		if(this.curShader == null) throw new js__$Boot_HaxeError("No shader selected");
		this.curBuffer = v;
		var m = v.buffer.vbuf;
		if(m.stride < this.curShader.stride) throw new js__$Boot_HaxeError("Buffer stride (" + m.stride + ") and shader stride (" + this.curShader.stride + ") mismatch");
		this.gl.bindBuffer(34962,m.b);
		if((v.flags & 1 << h3d_BufferFlag.RawFormat[1]) != 0) {
			var _g = 0;
			var _g1 = this.curShader.attribs;
			while(_g < _g1.length) {
				var a = _g1[_g];
				++_g;
				this.gl.vertexAttribPointer(a.index,a.size,a.type,false,m.stride * 4,a.offset * 4);
			}
		} else {
			var offset = 8;
			var _g11 = 0;
			var _g2 = this.curShader.attribs.length;
			while(_g11 < _g2) {
				var i = _g11++;
				var a1 = this.curShader.attribs[i];
				var _g21 = this.curShader.attribNames[i];
				var s = _g21;
				switch(_g21) {
				case "position":
					this.gl.vertexAttribPointer(a1.index,a1.size,a1.type,false,m.stride * 4,0);
					break;
				case "normal":
					if(m.stride < 6) throw new js__$Boot_HaxeError("Buffer is missing NORMAL data, set it to RAW format ?");
					this.gl.vertexAttribPointer(a1.index,a1.size,a1.type,false,m.stride * 4,12);
					break;
				case "uv":
					if(m.stride < 8) throw new js__$Boot_HaxeError("Buffer is missing UV data, set it to RAW format ?");
					this.gl.vertexAttribPointer(a1.index,a1.size,a1.type,false,m.stride * 4,24);
					break;
				default:
					this.gl.vertexAttribPointer(a1.index,a1.size,a1.type,false,m.stride * 4,offset * 4);
					offset += a1.size;
					if(offset > m.stride) throw new js__$Boot_HaxeError("Buffer is missing '" + s + "' data, set it to RAW format ?");
				}
			}
		}
	}
	,draw: function(ibuf,startIndex,ntriangles) {
		this.gl.bindBuffer(34963,ibuf);
		this.gl.drawElements(4,ntriangles * 3,5123,startIndex * 2);
		this.gl.bindBuffer(34963,null);
	}
	,present: function() {
		this.gl.finish();
	}
	,isDisposed: function() {
		return this.gl.isContextLost();
	}
	,setRenderTarget: function(tex) {
		if(tex == null) {
			this.gl.bindFramebuffer(36160,null);
			this.gl.viewport(0,0,this.bufferWidth,this.bufferHeight);
			return;
		}
		if(tex.t == null) tex.alloc();
		tex.lastFrame = this.frame;
		this.gl.bindFramebuffer(36160,tex.t.fb);
		this.gl.viewport(0,0,tex.width,tex.height);
	}
	,init: function(onCreate,forceSoftware) {
		if(forceSoftware == null) forceSoftware = false;
		var ready = false;
		window.addEventListener("load",function(_) {
			if(!ready) {
				ready = true;
				onCreate(false);
			}
		});
	}
	,hasFeature: function(f) {
		switch(f[1]) {
		case 0:
			return this.gl.getExtension("OES_standard_derivatives") != null;
		case 1:
			return this.gl.getExtension("OES_texture_float") != null && this.gl.getExtension("OES_texture_float_linear") != null;
		case 2:
			return true;
		case 3:
			return false;
		case 4:
			return true;
		case 5:
			return false;
		}
	}
	,__class__: h3d_impl_GlDriver
});
var h3d_impl__$ManagedBuffer_FreeCell = function(pos,count,next) {
	this.pos = pos;
	this.count = count;
	this.next = next;
};
$hxClasses["h3d.impl._ManagedBuffer.FreeCell"] = h3d_impl__$ManagedBuffer_FreeCell;
h3d_impl__$ManagedBuffer_FreeCell.__name__ = true;
h3d_impl__$ManagedBuffer_FreeCell.prototype = {
	__class__: h3d_impl__$ManagedBuffer_FreeCell
};
var h3d_impl_ManagedBuffer = function(stride,size,flags) {
	this.flags = 0;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f[1];
		}
	}
	this.mem = h3d_Engine.CURRENT.mem;
	this.size = size;
	this.stride = stride;
	this.freeList = new h3d_impl__$ManagedBuffer_FreeCell(0,size,null);
	this.mem.allocManaged(this);
};
$hxClasses["h3d.impl.ManagedBuffer"] = h3d_impl_ManagedBuffer;
h3d_impl_ManagedBuffer.__name__ = true;
h3d_impl_ManagedBuffer.prototype = {
	uploadVertexBuffer: function(start,vertices,buf,bufPos) {
		if(bufPos == null) bufPos = 0;
		this.mem.driver.uploadVertexBuffer(this.vbuf,start,vertices,buf,bufPos);
	}
	,allocPosition: function(nvert,align) {
		var free = this.freeList;
		while(free != null) {
			if(free.count >= nvert) {
				var d = (align - free.pos % align) % align;
				if(d == 0) break;
				if(free.count >= nvert + d) {
					free.next = new h3d_impl__$ManagedBuffer_FreeCell(free.pos + d,free.count - d,free.next);
					free.count = d;
					free = free.next;
					break;
				}
			}
			free = free.next;
		}
		if(free == null) return -1;
		var pos = free.pos;
		free.pos += nvert;
		free.count -= nvert;
		return pos;
	}
	,allocBuffer: function(b) {
		var align;
		if((b.flags & 1 << h3d_BufferFlag.Quads[1]) != 0) align = 4; else if((b.flags & 1 << h3d_BufferFlag.Triangles[1]) != 0) align = 3; else align = 1;
		var p = this.allocPosition(b.vertices,align);
		if(p < 0) return false;
		b.position = p;
		b.buffer = this;
		return true;
	}
	,freeBuffer: function(b) {
		var prev = null;
		var f = this.freeList;
		var nvert = b.vertices;
		var end = b.position + nvert;
		while(f != null) {
			if(f.pos == end) {
				f.pos -= nvert;
				f.count += nvert;
				if(prev != null && prev.pos + prev.count == f.pos) {
					prev.count += f.count;
					prev.next = f.next;
				}
				nvert = 0;
				break;
			}
			if(f.pos > end) {
				if(prev != null && prev.pos + prev.count == b.position) prev.count += nvert; else {
					var n = new h3d_impl__$ManagedBuffer_FreeCell(b.position,nvert,f);
					if(prev == null) this.freeList = n; else prev.next = n;
				}
				nvert = 0;
				break;
			}
			prev = f;
			f = f.next;
		}
		if(nvert != 0) throw new js__$Boot_HaxeError("assert");
		if(this.freeList.count == this.size && !((this.flags & 1 << h3d_BufferFlag.Managed[1]) != 0)) this.dispose();
	}
	,dispose: function() {
		this.mem.freeManaged(this);
	}
	,__class__: h3d_impl_ManagedBuffer
};
var h3d_impl_MemoryManager = function(driver) {
	this.bufferCount = 0;
	this.texMemory = 0;
	this.usedMemory = 0;
	this.driver = driver;
};
$hxClasses["h3d.impl.MemoryManager"] = h3d_impl_MemoryManager;
h3d_impl_MemoryManager.__name__ = true;
h3d_impl_MemoryManager.prototype = {
	init: function() {
		this.indexes = [];
		this.textures = [];
		this.buffers = [];
		this.initIndexes();
	}
	,initIndexes: function() {
		var indices;
		var this1;
		this1 = new Array(0);
		indices = this1;
		var _g = 0;
		while(_g < 65533) {
			var i = _g++;
			indices.push(i);
		}
		this.triIndexes = h3d_Indexes.alloc(indices);
		var indices1;
		var this2;
		this2 = new Array(0);
		indices1 = this2;
		var p = 0;
		var _g1 = 0;
		var _g2 = 16383;
		while(_g1 < _g2) {
			var i1 = _g1++;
			var k = i1 << 2;
			indices1.push(k);
			indices1.push(k + 1);
			indices1.push(k + 2);
			indices1.push(k + 2);
			indices1.push(k + 1);
			indices1.push(k + 3);
		}
		indices1.push(65533);
		this.quadIndexes = h3d_Indexes.alloc(indices1);
	}
	,garbage: function() {
	}
	,cleanManagedBuffers: function() {
		var _g1 = 0;
		var _g = this.buffers.length;
		while(_g1 < _g) {
			var i = _g1++;
			var b = this.buffers[i];
			var prev = null;
			while(b != null) {
				if(b.freeList.count == b.size) {
					b.dispose();
					if(prev == null) this.buffers[i] = b.next; else prev.next = b.next;
				} else prev = b;
				b = b.next;
			}
		}
	}
	,allocManaged: function(m) {
		if(m.vbuf != null) return;
		var mem = m.size * m.stride * 4;
		while(this.usedMemory + mem > 262144000 || this.bufferCount >= 4096 || (m.vbuf = this.driver.allocVertexes(m)) == null) {
			var size = this.usedMemory - this.freeMemorySize();
			this.garbage();
			this.cleanManagedBuffers();
			if(this.usedMemory - this.freeMemorySize() == size) {
				if(this.bufferCount >= 4096) throw new js__$Boot_HaxeError("Too many buffer");
				throw new js__$Boot_HaxeError("Memory full");
			}
		}
		this.usedMemory += mem;
		this.bufferCount++;
	}
	,freeManaged: function(m) {
		if(m.vbuf == null) return;
		this.driver.disposeVertexes(m.vbuf);
		m.vbuf = null;
		this.usedMemory -= m.size * m.stride * 4;
		this.bufferCount--;
	}
	,allocBuffer: function(b,stride) {
		var max;
		if((b.flags & 1 << h3d_BufferFlag.Quads[1]) != 0) max = 65532; else if((b.flags & 1 << h3d_BufferFlag.Triangles[1]) != 0) max = 65533; else max = 65534;
		if(b.vertices > max) {
			if(max == 65534) throw new js__$Boot_HaxeError("Cannot split buffer with " + b.vertices + " vertices if it's not Quads/Triangles");
			var rem = b.vertices - max;
			b.vertices = max;
			this.allocBuffer(b,stride);
			var n = b;
			while(n.next != null) n = n.next;
			var flags = [];
			var _g = 0;
			var _g1 = h3d_impl_MemoryManager.ALL_FLAGS;
			while(_g < _g1.length) {
				var f = _g1[_g];
				++_g;
				if((b.flags & 1 << f[1]) != 0) flags.push(f);
			}
			n.next = new h3d_Buffer(rem,stride,flags);
			return;
		}
		if(!((b.flags & 1 << h3d_BufferFlag.Managed[1]) != 0)) {
			var m1 = new h3d_impl_ManagedBuffer(stride,b.vertices);
			if(!m1.allocBuffer(b)) throw new js__$Boot_HaxeError("assert");
			return;
		}
		var m = this.buffers[stride];
		var prev = null;
		while(m != null) {
			if(m.allocBuffer(b)) return;
			prev = m;
			m = m.next;
		}
		var align;
		if((b.flags & 1 << h3d_BufferFlag.Triangles[1]) != 0) align = 3; else if((b.flags & 1 << h3d_BufferFlag.Quads[1]) != 0) align = 4; else align = 0;
		if(m == null && align > 0) {
			var total = b.vertices;
			var size = total;
			while(size > 2048) {
				m = this.buffers[stride];
				size >>= 1;
				size -= size % align;
				b.vertices = size;
				while(m != null) {
					if(m.allocBuffer(b)) {
						var flags1 = [];
						var _g2 = 0;
						var _g11 = h3d_impl_MemoryManager.ALL_FLAGS;
						while(_g2 < _g11.length) {
							var f1 = _g11[_g2];
							++_g2;
							if((b.flags & 1 << f1[1]) != 0) flags1.push(f1);
						}
						b.next = new h3d_Buffer(total - size,stride,flags1);
						return;
					}
					m = m.next;
				}
			}
			b.vertices = total;
		}
		m = new h3d_impl_ManagedBuffer(stride,65533,[h3d_BufferFlag.Managed]);
		if(prev == null) this.buffers[stride] = m; else prev.next = m;
		if(!m.allocBuffer(b)) throw new js__$Boot_HaxeError("assert");
	}
	,deleteIndexes: function(i) {
		HxOverrides.remove(this.indexes,i);
		this.driver.disposeIndexes(i.ibuf);
		i.ibuf = null;
		this.usedMemory -= i.count * 2;
	}
	,allocIndexes: function(i) {
		i.ibuf = this.driver.allocIndexes(i.count);
		this.indexes.push(i);
		this.usedMemory += i.count * 2;
	}
	,bpp: function(t) {
		return 4;
	}
	,cleanTextures: function(force) {
		if(force == null) force = true;
		this.textures.sort($bind(this,this.sortByLRU));
		var _g = 0;
		var _g1 = this.textures;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			if(t.realloc == null) continue;
			if(force || t.lastFrame < h3d_Engine.CURRENT.frameCount - 3600) {
				t.dispose();
				return true;
			}
		}
		return false;
	}
	,sortByLRU: function(t1,t2) {
		return t1.lastFrame - t2.lastFrame;
	}
	,deleteTexture: function(t) {
		HxOverrides.remove(this.textures,t);
		this.driver.disposeTexture(t.t);
		t.t = null;
		this.texMemory -= t.width * t.height * this.bpp(t);
	}
	,allocTexture: function(t) {
		var free = this.cleanTextures(false);
		t.t = this.driver.allocTexture(t);
		if(t.t == null) {
			if(!this.cleanTextures(true)) throw new js__$Boot_HaxeError("Maximum texture memory reached");
			this.allocTexture(t);
			return;
		}
		this.textures.push(t);
		this.texMemory += t.width * t.height * this.bpp(t);
	}
	,onContextLost: function() {
		this.dispose();
		this.initIndexes();
	}
	,dispose: function() {
		this.triIndexes.dispose();
		this.quadIndexes.dispose();
		this.triIndexes = null;
		this.quadIndexes = null;
		var _g = 0;
		var _g1 = this.textures.slice();
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.dispose();
		}
		var _g2 = 0;
		var _g11 = this.buffers.slice();
		while(_g2 < _g11.length) {
			var b = _g11[_g2];
			++_g2;
			var b1 = b;
			while(b1 != null) {
				b1.dispose();
				b1 = b1.next;
			}
		}
		var _g3 = 0;
		var _g12 = this.indexes.slice();
		while(_g3 < _g12.length) {
			var i = _g12[_g3];
			++_g3;
			i.dispose();
		}
		this.buffers = [];
		this.indexes = [];
		this.textures = [];
		this.bufferCount = 0;
		this.usedMemory = 0;
		this.texMemory = 0;
	}
	,freeMemorySize: function() {
		var size = 0;
		var _g = 0;
		var _g1 = this.buffers;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			var b1 = b;
			while(b1 != null) {
				var free = b1.freeList;
				while(free != null) {
					size += free.count * b1.stride * 4;
					free = free.next;
				}
				b1 = b1.next;
			}
		}
		return size;
	}
	,__class__: h3d_impl_MemoryManager
};
var h3d_impl_TextureCache = function() {
	this.position = 0;
	this.cache = [];
	var engine = h3d_Engine.CURRENT;
	this.hasDefaultDepth = engine.driver.hasFeature(h3d_impl_Feature.TargetUseDefaultDepthBuffer);
	this.fullClearRequired = engine.driver.hasFeature(h3d_impl_Feature.FullClearRequired);
};
$hxClasses["h3d.impl.TextureCache"] = h3d_impl_TextureCache;
h3d_impl_TextureCache.__name__ = true;
h3d_impl_TextureCache.prototype = {
	begin: function(ctx) {
		if(this.frame != ctx.frame) {
			while(this.cache.length > this.position) {
				var t = this.cache.pop();
				if(t != null) t.dispose();
			}
			this.frame = ctx.frame;
			this.position = 0;
		}
	}
	,allocTarget: function(name,ctx,width,height,hasDepth) {
		if(hasDepth == null) hasDepth = true;
		this.begin(ctx);
		var t = this.cache[this.position];
		if(t == null || t.t == null && t.realloc == null || t.width != width || t.height != height || (t.flags & 1 << (this.hasDefaultDepth?h3d_mat_TextureFlags.TargetUseDefaultDepth:h3d_mat_TextureFlags.TargetDepth)[1]) != 0 != hasDepth) {
			if(t != null) t.dispose();
			var flags = [h3d_mat_TextureFlags.Target];
			if(hasDepth) flags.push(this.hasDefaultDepth?h3d_mat_TextureFlags.TargetUseDefaultDepth:h3d_mat_TextureFlags.TargetDepth);
			t = new h3d_mat_Texture(width,height,flags);
			this.cache[this.position] = t;
		}
		t.setName(name);
		this.position++;
		return t;
	}
	,__class__: h3d_impl_TextureCache
};
var h3d_mat_Face = $hxClasses["h3d.mat.Face"] = { __ename__ : true, __constructs__ : ["None","Back","Front","Both"] };
h3d_mat_Face.None = ["None",0];
h3d_mat_Face.None.toString = $estr;
h3d_mat_Face.None.__enum__ = h3d_mat_Face;
h3d_mat_Face.Back = ["Back",1];
h3d_mat_Face.Back.toString = $estr;
h3d_mat_Face.Back.__enum__ = h3d_mat_Face;
h3d_mat_Face.Front = ["Front",2];
h3d_mat_Face.Front.toString = $estr;
h3d_mat_Face.Front.__enum__ = h3d_mat_Face;
h3d_mat_Face.Both = ["Both",3];
h3d_mat_Face.Both.toString = $estr;
h3d_mat_Face.Both.__enum__ = h3d_mat_Face;
h3d_mat_Face.__empty_constructs__ = [h3d_mat_Face.None,h3d_mat_Face.Back,h3d_mat_Face.Front,h3d_mat_Face.Both];
var h3d_mat_Blend = $hxClasses["h3d.mat.Blend"] = { __ename__ : true, __constructs__ : ["One","Zero","SrcAlpha","SrcColor","DstAlpha","DstColor","OneMinusSrcAlpha","OneMinusSrcColor","OneMinusDstAlpha","OneMinusDstColor","ConstantColor","ConstantAlpha","OneMinusConstantColor","OneMinusConstantAlpha","SrcAlphaSaturate"] };
h3d_mat_Blend.One = ["One",0];
h3d_mat_Blend.One.toString = $estr;
h3d_mat_Blend.One.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.Zero = ["Zero",1];
h3d_mat_Blend.Zero.toString = $estr;
h3d_mat_Blend.Zero.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.SrcAlpha = ["SrcAlpha",2];
h3d_mat_Blend.SrcAlpha.toString = $estr;
h3d_mat_Blend.SrcAlpha.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.SrcColor = ["SrcColor",3];
h3d_mat_Blend.SrcColor.toString = $estr;
h3d_mat_Blend.SrcColor.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.DstAlpha = ["DstAlpha",4];
h3d_mat_Blend.DstAlpha.toString = $estr;
h3d_mat_Blend.DstAlpha.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.DstColor = ["DstColor",5];
h3d_mat_Blend.DstColor.toString = $estr;
h3d_mat_Blend.DstColor.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.OneMinusSrcAlpha = ["OneMinusSrcAlpha",6];
h3d_mat_Blend.OneMinusSrcAlpha.toString = $estr;
h3d_mat_Blend.OneMinusSrcAlpha.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.OneMinusSrcColor = ["OneMinusSrcColor",7];
h3d_mat_Blend.OneMinusSrcColor.toString = $estr;
h3d_mat_Blend.OneMinusSrcColor.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.OneMinusDstAlpha = ["OneMinusDstAlpha",8];
h3d_mat_Blend.OneMinusDstAlpha.toString = $estr;
h3d_mat_Blend.OneMinusDstAlpha.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.OneMinusDstColor = ["OneMinusDstColor",9];
h3d_mat_Blend.OneMinusDstColor.toString = $estr;
h3d_mat_Blend.OneMinusDstColor.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.ConstantColor = ["ConstantColor",10];
h3d_mat_Blend.ConstantColor.toString = $estr;
h3d_mat_Blend.ConstantColor.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.ConstantAlpha = ["ConstantAlpha",11];
h3d_mat_Blend.ConstantAlpha.toString = $estr;
h3d_mat_Blend.ConstantAlpha.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.OneMinusConstantColor = ["OneMinusConstantColor",12];
h3d_mat_Blend.OneMinusConstantColor.toString = $estr;
h3d_mat_Blend.OneMinusConstantColor.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.OneMinusConstantAlpha = ["OneMinusConstantAlpha",13];
h3d_mat_Blend.OneMinusConstantAlpha.toString = $estr;
h3d_mat_Blend.OneMinusConstantAlpha.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.SrcAlphaSaturate = ["SrcAlphaSaturate",14];
h3d_mat_Blend.SrcAlphaSaturate.toString = $estr;
h3d_mat_Blend.SrcAlphaSaturate.__enum__ = h3d_mat_Blend;
h3d_mat_Blend.__empty_constructs__ = [h3d_mat_Blend.One,h3d_mat_Blend.Zero,h3d_mat_Blend.SrcAlpha,h3d_mat_Blend.SrcColor,h3d_mat_Blend.DstAlpha,h3d_mat_Blend.DstColor,h3d_mat_Blend.OneMinusSrcAlpha,h3d_mat_Blend.OneMinusSrcColor,h3d_mat_Blend.OneMinusDstAlpha,h3d_mat_Blend.OneMinusDstColor,h3d_mat_Blend.ConstantColor,h3d_mat_Blend.ConstantAlpha,h3d_mat_Blend.OneMinusConstantColor,h3d_mat_Blend.OneMinusConstantAlpha,h3d_mat_Blend.SrcAlphaSaturate];
var h3d_mat_Compare = $hxClasses["h3d.mat.Compare"] = { __ename__ : true, __constructs__ : ["Always","Never","Equal","NotEqual","Greater","GreaterEqual","Less","LessEqual"] };
h3d_mat_Compare.Always = ["Always",0];
h3d_mat_Compare.Always.toString = $estr;
h3d_mat_Compare.Always.__enum__ = h3d_mat_Compare;
h3d_mat_Compare.Never = ["Never",1];
h3d_mat_Compare.Never.toString = $estr;
h3d_mat_Compare.Never.__enum__ = h3d_mat_Compare;
h3d_mat_Compare.Equal = ["Equal",2];
h3d_mat_Compare.Equal.toString = $estr;
h3d_mat_Compare.Equal.__enum__ = h3d_mat_Compare;
h3d_mat_Compare.NotEqual = ["NotEqual",3];
h3d_mat_Compare.NotEqual.toString = $estr;
h3d_mat_Compare.NotEqual.__enum__ = h3d_mat_Compare;
h3d_mat_Compare.Greater = ["Greater",4];
h3d_mat_Compare.Greater.toString = $estr;
h3d_mat_Compare.Greater.__enum__ = h3d_mat_Compare;
h3d_mat_Compare.GreaterEqual = ["GreaterEqual",5];
h3d_mat_Compare.GreaterEqual.toString = $estr;
h3d_mat_Compare.GreaterEqual.__enum__ = h3d_mat_Compare;
h3d_mat_Compare.Less = ["Less",6];
h3d_mat_Compare.Less.toString = $estr;
h3d_mat_Compare.Less.__enum__ = h3d_mat_Compare;
h3d_mat_Compare.LessEqual = ["LessEqual",7];
h3d_mat_Compare.LessEqual.toString = $estr;
h3d_mat_Compare.LessEqual.__enum__ = h3d_mat_Compare;
h3d_mat_Compare.__empty_constructs__ = [h3d_mat_Compare.Always,h3d_mat_Compare.Never,h3d_mat_Compare.Equal,h3d_mat_Compare.NotEqual,h3d_mat_Compare.Greater,h3d_mat_Compare.GreaterEqual,h3d_mat_Compare.Less,h3d_mat_Compare.LessEqual];
var h3d_mat_MipMap = $hxClasses["h3d.mat.MipMap"] = { __ename__ : true, __constructs__ : ["None","Nearest","Linear"] };
h3d_mat_MipMap.None = ["None",0];
h3d_mat_MipMap.None.toString = $estr;
h3d_mat_MipMap.None.__enum__ = h3d_mat_MipMap;
h3d_mat_MipMap.Nearest = ["Nearest",1];
h3d_mat_MipMap.Nearest.toString = $estr;
h3d_mat_MipMap.Nearest.__enum__ = h3d_mat_MipMap;
h3d_mat_MipMap.Linear = ["Linear",2];
h3d_mat_MipMap.Linear.toString = $estr;
h3d_mat_MipMap.Linear.__enum__ = h3d_mat_MipMap;
h3d_mat_MipMap.__empty_constructs__ = [h3d_mat_MipMap.None,h3d_mat_MipMap.Nearest,h3d_mat_MipMap.Linear];
var h3d_mat_Filter = $hxClasses["h3d.mat.Filter"] = { __ename__ : true, __constructs__ : ["Nearest","Linear"] };
h3d_mat_Filter.Nearest = ["Nearest",0];
h3d_mat_Filter.Nearest.toString = $estr;
h3d_mat_Filter.Nearest.__enum__ = h3d_mat_Filter;
h3d_mat_Filter.Linear = ["Linear",1];
h3d_mat_Filter.Linear.toString = $estr;
h3d_mat_Filter.Linear.__enum__ = h3d_mat_Filter;
h3d_mat_Filter.__empty_constructs__ = [h3d_mat_Filter.Nearest,h3d_mat_Filter.Linear];
var h3d_mat_Wrap = $hxClasses["h3d.mat.Wrap"] = { __ename__ : true, __constructs__ : ["Clamp","Repeat"] };
h3d_mat_Wrap.Clamp = ["Clamp",0];
h3d_mat_Wrap.Clamp.toString = $estr;
h3d_mat_Wrap.Clamp.__enum__ = h3d_mat_Wrap;
h3d_mat_Wrap.Repeat = ["Repeat",1];
h3d_mat_Wrap.Repeat.toString = $estr;
h3d_mat_Wrap.Repeat.__enum__ = h3d_mat_Wrap;
h3d_mat_Wrap.__empty_constructs__ = [h3d_mat_Wrap.Clamp,h3d_mat_Wrap.Repeat];
var h3d_mat_Operation = $hxClasses["h3d.mat.Operation"] = { __ename__ : true, __constructs__ : ["Add","Sub","ReverseSub"] };
h3d_mat_Operation.Add = ["Add",0];
h3d_mat_Operation.Add.toString = $estr;
h3d_mat_Operation.Add.__enum__ = h3d_mat_Operation;
h3d_mat_Operation.Sub = ["Sub",1];
h3d_mat_Operation.Sub.toString = $estr;
h3d_mat_Operation.Sub.__enum__ = h3d_mat_Operation;
h3d_mat_Operation.ReverseSub = ["ReverseSub",2];
h3d_mat_Operation.ReverseSub.toString = $estr;
h3d_mat_Operation.ReverseSub.__enum__ = h3d_mat_Operation;
h3d_mat_Operation.__empty_constructs__ = [h3d_mat_Operation.Add,h3d_mat_Operation.Sub,h3d_mat_Operation.ReverseSub];
var h3d_mat_TextureFlags = $hxClasses["h3d.mat.TextureFlags"] = { __ename__ : true, __constructs__ : ["Target","TargetDepth","TargetUseDefaultDepth","Cubic","MipMapped","IsNPOT","NoAlloc","Dynamic","FmtFloat","Fmt5_6_5","Fmt4_4_4_4","Fmt5_5_5_1","AlphaPremultiplied","WasCleared"] };
h3d_mat_TextureFlags.Target = ["Target",0];
h3d_mat_TextureFlags.Target.toString = $estr;
h3d_mat_TextureFlags.Target.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.TargetDepth = ["TargetDepth",1];
h3d_mat_TextureFlags.TargetDepth.toString = $estr;
h3d_mat_TextureFlags.TargetDepth.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.TargetUseDefaultDepth = ["TargetUseDefaultDepth",2];
h3d_mat_TextureFlags.TargetUseDefaultDepth.toString = $estr;
h3d_mat_TextureFlags.TargetUseDefaultDepth.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.Cubic = ["Cubic",3];
h3d_mat_TextureFlags.Cubic.toString = $estr;
h3d_mat_TextureFlags.Cubic.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.MipMapped = ["MipMapped",4];
h3d_mat_TextureFlags.MipMapped.toString = $estr;
h3d_mat_TextureFlags.MipMapped.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.IsNPOT = ["IsNPOT",5];
h3d_mat_TextureFlags.IsNPOT.toString = $estr;
h3d_mat_TextureFlags.IsNPOT.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.NoAlloc = ["NoAlloc",6];
h3d_mat_TextureFlags.NoAlloc.toString = $estr;
h3d_mat_TextureFlags.NoAlloc.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.Dynamic = ["Dynamic",7];
h3d_mat_TextureFlags.Dynamic.toString = $estr;
h3d_mat_TextureFlags.Dynamic.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.FmtFloat = ["FmtFloat",8];
h3d_mat_TextureFlags.FmtFloat.toString = $estr;
h3d_mat_TextureFlags.FmtFloat.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.Fmt5_6_5 = ["Fmt5_6_5",9];
h3d_mat_TextureFlags.Fmt5_6_5.toString = $estr;
h3d_mat_TextureFlags.Fmt5_6_5.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.Fmt4_4_4_4 = ["Fmt4_4_4_4",10];
h3d_mat_TextureFlags.Fmt4_4_4_4.toString = $estr;
h3d_mat_TextureFlags.Fmt4_4_4_4.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.Fmt5_5_5_1 = ["Fmt5_5_5_1",11];
h3d_mat_TextureFlags.Fmt5_5_5_1.toString = $estr;
h3d_mat_TextureFlags.Fmt5_5_5_1.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.AlphaPremultiplied = ["AlphaPremultiplied",12];
h3d_mat_TextureFlags.AlphaPremultiplied.toString = $estr;
h3d_mat_TextureFlags.AlphaPremultiplied.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.WasCleared = ["WasCleared",13];
h3d_mat_TextureFlags.WasCleared.toString = $estr;
h3d_mat_TextureFlags.WasCleared.__enum__ = h3d_mat_TextureFlags;
h3d_mat_TextureFlags.__empty_constructs__ = [h3d_mat_TextureFlags.Target,h3d_mat_TextureFlags.TargetDepth,h3d_mat_TextureFlags.TargetUseDefaultDepth,h3d_mat_TextureFlags.Cubic,h3d_mat_TextureFlags.MipMapped,h3d_mat_TextureFlags.IsNPOT,h3d_mat_TextureFlags.NoAlloc,h3d_mat_TextureFlags.Dynamic,h3d_mat_TextureFlags.FmtFloat,h3d_mat_TextureFlags.Fmt5_6_5,h3d_mat_TextureFlags.Fmt4_4_4_4,h3d_mat_TextureFlags.Fmt5_5_5_1,h3d_mat_TextureFlags.AlphaPremultiplied,h3d_mat_TextureFlags.WasCleared];
var h3d_mat_Material = function(shader) {
	if(shader != null) this.addPass(new h3d_mat_Pass("default",null)).addShader(shader);
};
$hxClasses["h3d.mat.Material"] = h3d_mat_Material;
h3d_mat_Material.__name__ = true;
h3d_mat_Material.prototype = {
	addPass: function(p) {
		var prev = null;
		var cur = this.passes;
		while(cur != null) {
			prev = cur;
			cur = cur.nextPass;
		}
		if(prev == null) this.passes = p; else prev.nextPass = p;
		p.nextPass = null;
		return p;
	}
	,__class__: h3d_mat_Material
};
var h3d_mat_MeshMaterial = function(texture) {
	this.mshader = new h3d_shader_BaseMesh();
	this.set_blendMode(h2d_BlendMode.None);
	h3d_mat_Material.call(this,this.mshader);
	this.set_texture(texture);
};
$hxClasses["h3d.mat.MeshMaterial"] = h3d_mat_MeshMaterial;
h3d_mat_MeshMaterial.__name__ = true;
h3d_mat_MeshMaterial.__super__ = h3d_mat_Material;
h3d_mat_MeshMaterial.prototype = $extend(h3d_mat_Material.prototype,{
	set_blendMode: function(v) {
		if(this.passes != null) {
			this.passes.setBlendMode(v);
			switch(v[1]) {
			case 0:
				this.passes.set_depthWrite(true);
				this.passes.setPassName("default");
				break;
			case 1:
				this.passes.set_depthWrite(true);
				this.passes.setPassName("alpha");
				break;
			case 2:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			case 3:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			case 4:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			case 5:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			case 6:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			}
		}
		return this.blendMode = v;
	}
	,set_texture: function(t) {
		if(t == null) {
			if(this.textureShader != null) {
				this.passes.removeShader(this.textureShader);
				this.textureShader = null;
			}
		} else {
			if(this.textureShader == null) {
				this.textureShader = new h3d_shader_Texture();
				this.passes.addShader(this.textureShader);
			}
			this.textureShader.texture__ = t;
		}
		return t;
	}
	,__class__: h3d_mat_MeshMaterial
});
var h3d_mat_Pass = function(name,shaders,parent) {
	this.bits = 0;
	this.parentPass = parent;
	this.shaders = shaders;
	this.setPassName(name);
	this.set_culling(h3d_mat_Face.Back);
	this.blend(h3d_mat_Blend.One,h3d_mat_Blend.Zero);
	this.depth(true,h3d_mat_Compare.Less);
	this.set_blendOp(this.set_blendAlphaOp(h3d_mat_Operation.Add));
	this.set_colorMask(15);
};
$hxClasses["h3d.mat.Pass"] = h3d_mat_Pass;
h3d_mat_Pass.__name__ = true;
h3d_mat_Pass.prototype = {
	setPassName: function(name) {
		this.name = name;
		this.passId = hxsl_Globals.allocID(name);
	}
	,blend: function(src,dst) {
		this.set_blendSrc(src);
		this.set_blendAlphaSrc(src);
		this.set_blendDst(dst);
		this.set_blendAlphaDst(dst);
	}
	,setBlendMode: function(b) {
		switch(b[1]) {
		case 0:
			this.blend(h3d_mat_Blend.One,h3d_mat_Blend.Zero);
			break;
		case 1:
			this.blend(h3d_mat_Blend.SrcAlpha,h3d_mat_Blend.OneMinusSrcAlpha);
			break;
		case 2:
			this.blend(h3d_mat_Blend.SrcAlpha,h3d_mat_Blend.One);
			break;
		case 3:
			this.blend(h3d_mat_Blend.OneMinusDstColor,h3d_mat_Blend.One);
			break;
		case 4:
			this.blend(h3d_mat_Blend.DstColor,h3d_mat_Blend.Zero);
			break;
		case 5:
			this.blend(h3d_mat_Blend.Zero,h3d_mat_Blend.OneMinusSrcColor);
			break;
		case 6:
			this.blend(h3d_mat_Blend.One,h3d_mat_Blend.OneMinusSrcColor);
			break;
		}
	}
	,depth: function(write,test) {
		this.set_depthWrite(write);
		this.set_depthTest(test);
	}
	,addShader: function(s) {
		this.shaders = new hxsl_ShaderList(s,this.shaders);
		return s;
	}
	,removeShader: function(s) {
		var sl = this.shaders;
		var prev = null;
		while(sl != null) {
			if(sl.s == s) {
				if(prev == null) this.shaders = sl.next; else prev.next = sl.next;
				return true;
			}
			prev = sl;
			sl = sl.next;
		}
		return false;
	}
	,getShadersRec: function() {
		if(this.parentPass == null || this.parentShaders == this.parentPass.shaders) return this.shaders;
		var s = this.shaders;
		var prev = null;
		while(s != null && s != this.parentShaders) {
			prev = s;
			s = s.next;
		}
		this.parentShaders = this.parentPass.shaders;
		if(prev == null) this.shaders = this.parentShaders; else prev.next = this.parentShaders;
		return this.shaders;
	}
	,set_culling: function(v) {
		this.bits = this.bits & -4 | v[1];
		return this.culling = v;
	}
	,set_depthWrite: function(v) {
		this.bits = this.bits & -5 | (v?1:0) << 2;
		return this.depthWrite = v;
	}
	,set_depthTest: function(v) {
		this.bits = this.bits & -57 | v[1] << 3;
		return this.depthTest = v;
	}
	,set_blendSrc: function(v) {
		this.bits = this.bits & -961 | v[1] << 6;
		return this.blendSrc = v;
	}
	,set_blendDst: function(v) {
		this.bits = this.bits & -15361 | v[1] << 10;
		return this.blendDst = v;
	}
	,set_blendAlphaSrc: function(v) {
		this.bits = this.bits & -245761 | v[1] << 14;
		return this.blendAlphaSrc = v;
	}
	,set_blendAlphaDst: function(v) {
		this.bits = this.bits & -3932161 | v[1] << 18;
		return this.blendAlphaDst = v;
	}
	,set_blendOp: function(v) {
		this.bits = this.bits & -12582913 | v[1] << 22;
		return this.blendOp = v;
	}
	,set_blendAlphaOp: function(v) {
		this.bits = this.bits & -50331649 | v[1] << 24;
		return this.blendAlphaOp = v;
	}
	,set_colorMask: function(v) {
		this.bits = this.bits & -1006632961 | (v & 15) << 26;
		return this.colorMask = v;
	}
	,__class__: h3d_mat_Pass
};
var h3d_mat_Texture = function(w,h,flags,allocPos) {
	var engine = h3d_Engine.CURRENT;
	this.mem = engine.mem;
	this.id = ++h3d_mat_Texture.UID;
	this.flags = 0;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f[1];
		}
	}
	var tw = 1;
	var th = 1;
	while(tw < w) tw <<= 1;
	while(th < h) th <<= 1;
	if(tw != w || th != h) this.flags |= 1 << h3d_mat_TextureFlags.IsNPOT[1];
	if((this.flags & 1 << h3d_mat_TextureFlags.Target[1]) != 0) this.realloc = function() {
	};
	this.width = w;
	this.height = h;
	this.set_mipMap((this.flags & 1 << h3d_mat_TextureFlags.MipMapped[1]) != 0?h3d_mat_MipMap.Nearest:h3d_mat_MipMap.None);
	this.set_filter(h3d_mat_Filter.Linear);
	this.set_wrap(h3d_mat_Wrap.Clamp);
	this.bits &= 32767;
	this.alloc();
};
$hxClasses["h3d.mat.Texture"] = h3d_mat_Texture;
h3d_mat_Texture.__name__ = true;
h3d_mat_Texture.fromColor = function(color,alpha,allocPos) {
	if(alpha == null) alpha = 1.;
	var aval = alpha * 255 | 0;
	if(aval < 0) aval = 0; else if(aval > 255) aval = 255;
	var key = color & 16777215 | aval << 24;
	var t = h3d_mat_Texture.COLOR_CACHE.h[key];
	if(t != null) return t;
	var t1 = new h3d_mat_Texture(1,1,null,allocPos);
	t1.clear(color,alpha);
	t1.realloc = function() {
		t1.clear(color,alpha);
	};
	h3d_mat_Texture.COLOR_CACHE.h[key] = t1;
	return t1;
};
h3d_mat_Texture.prototype = {
	alloc: function() {
		if(this.t == null) this.mem.allocTexture(this);
	}
	,setName: function(n) {
		this.name = n;
	}
	,set_mipMap: function(m) {
		this.bits |= 524288;
		this.bits = this.bits & -4 | m[1];
		return this.mipMap = m;
	}
	,set_filter: function(f) {
		this.bits |= 524288;
		this.bits = this.bits & -25 | f[1] << 3;
		return this.filter = f;
	}
	,set_wrap: function(w) {
		this.bits |= 524288;
		this.bits = this.bits & -193 | w[1] << 6;
		return this.wrap = w;
	}
	,clear: function(color,alpha) {
		if(alpha == null) alpha = 1.;
		this.alloc();
		var p = hxd_Pixels.alloc(this.width,this.height,hxd_PixelFormat.BGRA);
		var k = 0;
		var b = color & 255;
		var g = color >> 8 & 255;
		var r = color >> 16 & 255;
		var a = alpha * 255 | 0;
		if(a < 0) a = 0; else if(a > 255) a = 255;
		var _g1 = 0;
		var _g = this.width * this.height;
		while(_g1 < _g) {
			var i = _g1++;
			p.bytes.set(k++,b);
			p.bytes.set(k++,g);
			p.bytes.set(k++,r);
			p.bytes.set(k++,a);
		}
		this.uploadPixels(p);
		p.dispose();
	}
	,uploadPixels: function(pixels,mipLevel,side) {
		if(side == null) side = 0;
		if(mipLevel == null) mipLevel = 0;
		this.alloc();
		this.mem.driver.uploadTexturePixels(this,pixels,mipLevel,side);
	}
	,dispose: function() {
		if(this.t != null) this.mem.deleteTexture(this);
	}
	,__class__: h3d_mat_Texture
};
var h3d_pass_Base = function() {
	this.forceProcessing = false;
	this.priority = 0;
};
$hxClasses["h3d.pass.Base"] = h3d_pass_Base;
h3d_pass_Base.__name__ = true;
h3d_pass_Base.prototype = {
	setContext: function(ctx) {
		this.ctx = ctx;
	}
	,draw: function(passes) {
		return passes;
	}
	,__class__: h3d_pass_Base
};
var h3d_pass_ScreenFx = function(shader) {
	this.shader = shader;
	this.shaders = new hxsl_ShaderList(shader);
	this.manager = new h3d_shader_Manager(["output.position","output.color"]);
	this.pass = new h3d_mat_Pass(Std.string(this),new hxsl_ShaderList(shader));
	this.pass.set_culling(h3d_mat_Face.None);
	this.pass.depth(false,h3d_mat_Compare.Always);
	this.plan = new h3d_prim_Plan2D();
	this.engine = h3d_Engine.CURRENT;
	this.fullClearRequired = this.engine.hasFeature(h3d_impl_Feature.FullClearRequired);
};
$hxClasses["h3d.pass.ScreenFx"] = h3d_pass_ScreenFx;
h3d_pass_ScreenFx.__name__ = true;
h3d_pass_ScreenFx.prototype = {
	render: function() {
		var rts = this.manager.compileShaders(this.shaders);
		this.engine.selectMaterial(this.pass);
		this.engine.selectShader(rts);
		if(this.buffers == null) this.buffers = new h3d_shader_Buffers(rts); else this.buffers.grow(rts);
		this.manager.fillGlobals(this.buffers,rts);
		this.manager.fillParams(this.buffers,rts,this.shaders);
		this.engine.uploadShaderBuffers(this.buffers,0);
		this.engine.uploadShaderBuffers(this.buffers,1);
		this.engine.uploadShaderBuffers(this.buffers,2);
		this.plan.render(this.engine);
	}
	,dispose: function() {
		this.plan.dispose();
	}
	,__class__: h3d_pass_ScreenFx
};
var h3d_pass_Blur = function(quality,passes,sigma) {
	if(sigma == null) sigma = 1.;
	if(passes == null) passes = 1;
	if(quality == null) quality = 1;
	h3d_pass_ScreenFx.call(this,new h3d_shader_Blur());
	this.set_quality(quality);
	this.passes = passes;
	this.set_sigma(sigma);
};
$hxClasses["h3d.pass.Blur"] = h3d_pass_Blur;
h3d_pass_Blur.__name__ = true;
h3d_pass_Blur.__super__ = h3d_pass_ScreenFx;
h3d_pass_Blur.prototype = $extend(h3d_pass_ScreenFx.prototype,{
	set_quality: function(q) {
		this.values = null;
		return this.quality = q;
	}
	,set_sigma: function(s) {
		this.values = null;
		return this.sigma = s;
	}
	,gauss: function(x,s) {
		if(s <= 0) if(x == 0) return 1; else return 0;
		var sq = s * s;
		var p = Math.pow(2.718281828459,-(x * x) / (2 * sq));
		return p / Math.sqrt(2 * Math.PI * sq);
	}
	,calcValues: function() {
		this.values = [];
		var tot = 0.;
		var _g1 = 0;
		var _g = this.quality + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var g = this.gauss(i,this.sigma);
			this.values[i] = g;
			tot += g;
			if(i > 0) tot += g;
		}
		var _g11 = 0;
		var _g2 = this.quality + 1;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.values[i1] /= tot;
		}
	}
	,apply: function(src,tmp,output,isDepth) {
		if(isDepth == null) isDepth = false;
		if(this.quality <= 0 || this.passes <= 0 || this.sigma <= 0) return;
		if(output == null) output = src;
		var alloc = tmp == null;
		if(alloc) tmp = new h3d_mat_Texture(src.width,src.height,[h3d_mat_TextureFlags.Target]);
		if(this.values == null) this.calcValues();
		this.shader.set_Quality(this.quality + 1);
		this.shader.values__ = this.values;
		this.shader.set_isDepth(isDepth);
		var _g1 = 0;
		var _g = this.passes;
		while(_g1 < _g) {
			var i = _g1++;
			this.shader.texture__ = src;
			this.shader.pixel__.set(1 / src.width,0,null,null);
			this.engine.setTarget(tmp);
			if(this.fullClearRequired) this.engine.clear(0,1,0);
			this.render();
			this.shader.texture__ = tmp;
			this.shader.pixel__.set(0,1 / tmp.height,null,null);
			this.engine.setTarget(output);
			if(this.fullClearRequired) this.engine.clear(0,1,0);
			this.render();
		}
		this.engine.setTarget(null);
		if(alloc) tmp.dispose();
	}
	,__class__: h3d_pass_Blur
});
var hxsl_Shader = function() {
	this.priority = 0;
	var cl = js_Boot.getClass(this);
	this.shader = cl._SHADER;
	this.constModified = true;
	if(this.shader == null) {
		this.shader = new hxsl_SharedShader(cl.SRC);
		cl._SHADER = this.shader;
	}
};
$hxClasses["hxsl.Shader"] = hxsl_Shader;
hxsl_Shader.__name__ = true;
hxsl_Shader.prototype = {
	getParamValue: function(index) {
		throw new js__$Boot_HaxeError("assert");
		return null;
	}
	,updateConstants: function(globals) {
		throw new js__$Boot_HaxeError("assert");
	}
	,updateConstantsFinal: function(globals) {
		var c = this.shader.consts;
		while(c != null) {
			if(c.globalId == 0) {
				c = c.next;
				continue;
			}
			var v = globals.map.h[c.globalId];
			var _g = c.v.type;
			switch(_g[1]) {
			case 1:
				var v1 = v;
				if(v1 >>> c.bits != 0) throw new js__$Boot_HaxeError("Constant " + c.v.name + " is outside range (" + v1 + " > " + ((1 << c.bits) - 1) + ")");
				this.constBits |= v1 << c.pos;
				break;
			case 2:
				var v2 = v;
				if(v2) this.constBits |= 1 << c.pos;
				break;
			default:
				throw new js__$Boot_HaxeError("assert");
			}
			c = c.next;
		}
		this.instance = this.shader.getInstance(this.constBits);
	}
	,__class__: hxsl_Shader
};
var h3d_pass__$Border_BorderShader = function() {
	this.color__ = new h3d_Vector();
	hxsl_Shader.call(this);
};
$hxClasses["h3d.pass._Border.BorderShader"] = h3d_pass__$Border_BorderShader;
h3d_pass__$Border_BorderShader.__name__ = true;
h3d_pass__$Border_BorderShader.__super__ = hxsl_Shader;
h3d_pass__$Border_BorderShader.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		default:
		}
		return null;
	}
	,__class__: h3d_pass__$Border_BorderShader
});
var h3d_pass_Border = function(width,height,size) {
	if(size == null) size = 1;
	h3d_pass_ScreenFx.call(this,new h3d_pass__$Border_BorderShader());
	var bbuf;
	var this1;
	this1 = new Array(0);
	bbuf = this1;
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - size / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - size / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(size / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push(size / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - (height - size) / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - (height - size) / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push((width - size) / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push((width - size) / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	var plan = new h3d_prim_RawPrimitive(this.engine,bbuf,2);
	plan.buffer.flags &= 268435455 - (1 << h3d_BufferFlag.Triangles[1]);
	plan.buffer.flags |= 1 << h3d_BufferFlag.Quads[1];
	this.plan.dispose();
	this.plan = plan;
	this.shader.color__.set(1,1,1,1);
};
$hxClasses["h3d.pass.Border"] = h3d_pass_Border;
h3d_pass_Border.__name__ = true;
h3d_pass_Border.__super__ = h3d_pass_ScreenFx;
h3d_pass_Border.prototype = $extend(h3d_pass_ScreenFx.prototype,{
	__class__: h3d_pass_Border
});
var h3d_pass_Default = function() {
	h3d_pass_Base.call(this);
	this.manager = new h3d_shader_Manager(this.getOutputs());
	this.tcache = new h3d_impl_TextureCache();
	this.initGlobals();
};
$hxClasses["h3d.pass.Default"] = h3d_pass_Default;
h3d_pass_Default.__name__ = true;
h3d_pass_Default.__super__ = h3d_pass_Base;
h3d_pass_Default.prototype = $extend(h3d_pass_Base.prototype,{
	getOutputs: function() {
		return ["output.position","output.color"];
	}
	,processShaders: function(p,shaders) {
		var p1 = this.ctx.extraShaders;
		while(p1 != null) {
			shaders = this.ctx.allocShaderList(p1.s,shaders);
			p1 = p1.next;
		}
		return shaders;
	}
	,setupShaders: function(passes) {
		var p = passes;
		var lightInit = false;
		while(p != null) {
			var shaders = p.pass.getShadersRec();
			shaders = this.processShaders(p,shaders);
			if(p.pass.enableLights && this.ctx.lightSystem != null) {
				if(!lightInit) {
					this.ctx.lightSystem.initLights(this.manager.globals,this.ctx);
					lightInit = true;
				}
				shaders = this.ctx.lightSystem.computeLight(p.obj,shaders);
			}
			p.shader = this.manager.compileShaders(shaders);
			p.shaders = shaders;
			p = p.next;
		}
	}
	,uploadParams: function() {
		this.manager.fillParams(this.cachedBuffer,this.ctx.drawPass.shader,this.ctx.drawPass.shaders);
		this.ctx.engine.uploadShaderBuffers(this.cachedBuffer,1);
		this.ctx.engine.uploadShaderBuffers(this.cachedBuffer,2);
	}
	,draw: function(passes) {
		var $it0 = this.ctx.sharedGlobals.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			this.manager.globals.fastSet(k,this.ctx.sharedGlobals.h[k]);
		}
		this.setGlobals();
		this.setupShaders(passes);
		passes = haxe_ds_ListSort.sortSingleLinked(passes,function(o1,o2) {
			var d = o1.shader.id - o2.shader.id;
			if(d != 0) return d;
			return 0;
		});
		this.ctx.uploadParams = $bind(this,this.uploadParams);
		var p = passes;
		var buf = this.cachedBuffer;
		var prevShader = null;
		var drawTri = 0;
		var drawCalls = 0;
		var shaderSwitches = 0;
		if(this.ctx.engine.driver.logEnable) {
			drawTri = this.ctx.engine.drawTriangles;
			drawCalls = this.ctx.engine.drawCalls;
			shaderSwitches = this.ctx.engine.shaderSwitches;
		}
		while(p != null) {
			this.set_globalModelView(p.obj.absPos);
			if(p.shader.globals.h.hasOwnProperty(this.globalModelViewInverse_id)) this.set_globalModelViewInverse(p.obj.getInvPos());
			if(prevShader != p.shader) {
				prevShader = p.shader;
				this.ctx.engine.selectShader(p.shader);
				if(buf == null) buf = this.cachedBuffer = new h3d_shader_Buffers(p.shader); else buf.grow(p.shader);
				this.manager.fillGlobals(buf,p.shader);
				this.ctx.engine.uploadShaderBuffers(buf,0);
			}
			if(!p.pass.dynamicParameters) {
				this.manager.fillParams(buf,p.shader,p.shaders);
				this.ctx.engine.uploadShaderBuffers(buf,1);
				this.ctx.engine.uploadShaderBuffers(buf,2);
			}
			this.ctx.drawPass = p;
			this.ctx.engine.selectMaterial(p.pass);
			p.obj.draw(this.ctx);
			p = p.next;
		}
		if(this.ctx.engine.driver.logEnable) null;
		this.ctx.nextPass();
		return passes;
	}
	,set_cameraView: function(v) {
		this.manager.globals.fastSet(this.cameraView_id,v);
		return v;
	}
	,set_cameraProj: function(v) {
		this.manager.globals.fastSet(this.cameraProj_id,v);
		return v;
	}
	,set_cameraPos: function(v) {
		this.manager.globals.fastSet(this.cameraPos_id,v);
		return v;
	}
	,set_cameraProjDiag: function(v) {
		this.manager.globals.fastSet(this.cameraProjDiag_id,v);
		return v;
	}
	,set_cameraViewProj: function(v) {
		this.manager.globals.fastSet(this.cameraViewProj_id,v);
		return v;
	}
	,set_cameraInverseViewProj: function(v) {
		this.manager.globals.fastSet(this.cameraInverseViewProj_id,v);
		return v;
	}
	,set_globalTime: function(v) {
		this.manager.globals.fastSet(this.globalTime_id,v);
		return v;
	}
	,set_pixelSize: function(v) {
		this.manager.globals.fastSet(this.pixelSize_id,v);
		return v;
	}
	,set_globalModelView: function(v) {
		this.manager.globals.fastSet(this.globalModelView_id,v);
		return v;
	}
	,set_globalModelViewInverse: function(v) {
		this.manager.globals.fastSet(this.globalModelViewInverse_id,v);
		return v;
	}
	,initGlobals: function() {
		var this1;
		this1 = hxsl_Globals.allocID("camera.view");
		this.cameraView_id = this1;
		var this2;
		this2 = hxsl_Globals.allocID("camera.proj");
		this.cameraProj_id = this2;
		var this3;
		this3 = hxsl_Globals.allocID("camera.position");
		this.cameraPos_id = this3;
		var this4;
		this4 = hxsl_Globals.allocID("camera.projDiag");
		this.cameraProjDiag_id = this4;
		var this5;
		this5 = hxsl_Globals.allocID("camera.viewProj");
		this.cameraViewProj_id = this5;
		var this6;
		this6 = hxsl_Globals.allocID("camera.inverseViewProj");
		this.cameraInverseViewProj_id = this6;
		var this7;
		this7 = hxsl_Globals.allocID("global.time");
		this.globalTime_id = this7;
		var this8;
		this8 = hxsl_Globals.allocID("global.pixelSize");
		this.pixelSize_id = this8;
		var this9;
		this9 = hxsl_Globals.allocID("global.modelView");
		this.globalModelView_id = this9;
		var this10;
		this10 = hxsl_Globals.allocID("global.modelViewInverse");
		this.globalModelViewInverse_id = this10;
	}
	,setGlobals: function() {
		this.set_cameraView(this.ctx.camera.mcam);
		this.set_cameraProj(this.ctx.camera.mproj);
		this.set_cameraPos(this.ctx.camera.pos);
		this.set_cameraProjDiag(new h3d_Vector(this.ctx.camera.mproj._11,this.ctx.camera.mproj._22,this.ctx.camera.mproj._33,this.ctx.camera.mproj._44));
		this.set_cameraViewProj(this.ctx.camera.m);
		this.set_cameraInverseViewProj(this.ctx.camera.getInverseViewProj());
		this.set_globalTime(this.ctx.time);
		this.set_pixelSize(new h3d_Vector(2 / this.ctx.engine.width,2 / this.ctx.engine.height));
	}
	,__class__: h3d_pass_Default
});
var h3d_pass_Depth = function() {
	this.reduceSize = 0;
	this.enableSky = false;
	h3d_pass_Default.call(this);
	this.priority = 10;
	this.depthMapId = hxsl_Globals.allocID("depthMap");
};
$hxClasses["h3d.pass.Depth"] = h3d_pass_Depth;
h3d_pass_Depth.__name__ = true;
h3d_pass_Depth.__super__ = h3d_pass_Default;
h3d_pass_Depth.prototype = $extend(h3d_pass_Default.prototype,{
	getOutputs: function() {
		return ["output.position","output.depth"];
	}
	,draw: function(passes) {
		var texture = this.tcache.allocTarget("depthMap",this.ctx,this.ctx.engine.width >> this.reduceSize,this.ctx.engine.height >> this.reduceSize);
		this.ctx.engine.setTarget(texture);
		this.ctx.engine.clear(this.enableSky?0:16711680,1);
		passes = h3d_pass_Default.prototype.draw.call(this,passes);
		this.ctx.sharedGlobals.h[this.depthMapId] = texture;
		return passes;
	}
	,__class__: h3d_pass_Depth
});
var h3d_pass_LightSystem = function() {
	this.perPixelLighting = true;
	this.maxLightsPerObject = 6;
	this.shadowDirection = new h3d_Vector(0,0,-1);
	this.ambientLight = new h3d_Vector(0.5,0.5,0.5);
	this.ambientShader = new h3d_shader_AmbientLight();
};
$hxClasses["h3d.pass.LightSystem"] = h3d_pass_LightSystem;
h3d_pass_LightSystem.__name__ = true;
h3d_pass_LightSystem.prototype = {
	initLights: function(globals,ctx) {
		this.lightCount = 0;
		this.ctx = ctx;
		var l = ctx.lights;
		var prev = null;
		var frustum = new h3d_col_Frustum(ctx.camera.m);
		var s = new h3d_col_Sphere();
		while(l != null) {
			s.x = l.absPos._41;
			s.y = l.absPos._42;
			s.z = l.absPos._43;
			s.r = l.cullingDistance;
			if(!frustum.checkSphere(s)) {
				if(prev == null) ctx.lights = l.next; else prev.next = l.next;
				l = l.next;
				continue;
			}
			this.lightCount++;
			l.objectDistance = 0.;
			prev = l;
			l = l.next;
		}
		if(this.lightCount <= this.maxLightsPerObject) ctx.lights = haxe_ds_ListSort.sortSingleLinked(ctx.lights,$bind(this,this.sortLight));
		globals.set("global.ambientLight",this.ambientLight);
		globals.set("global.perPixelLighting",this.perPixelLighting);
	}
	,sortLight: function(l1,l2) {
		var p = l1.priority - l2.priority;
		if(p != 0) return -p;
		if(l1.objectDistance < l2.objectDistance) return -1; else return 1;
	}
	,computeLight: function(obj,shaders) {
		var _g = this;
		if(this.lightCount > this.maxLightsPerObject) {
			var l1 = this.ctx.lights;
			while(l1 != null) {
				if((obj.flags & 16) != 0) l1.objectDistance = hxd_Math.distanceSq(l1.absPos._41 - this.ctx.camera.target.x,l1.absPos._42 - this.ctx.camera.target.y,l1.absPos._43 - this.ctx.camera.target.z); else l1.objectDistance = hxd_Math.distanceSq(l1.absPos._41 - obj.absPos._41,l1.absPos._42 - obj.absPos._42,l1.absPos._43 - obj.absPos._43);
				l1 = l1.next;
			}
			this.ctx.lights = haxe_ds_ListSort.sortSingleLinked(this.ctx.lights,$bind(this,this.sortLight));
		}
		shaders = _g.ctx.allocShaderList(this.ambientShader,shaders);
		var l = this.ctx.lights;
		var i = 0;
		while(l != null) {
			if(i++ == this.maxLightsPerObject) break;
			shaders = _g.ctx.allocShaderList(l.shader,shaders);
			l = l.next;
		}
		return shaders;
	}
	,__class__: h3d_pass_LightSystem
};
var h3d_pass_Normal = function() {
	h3d_pass_Default.call(this);
	this.priority = 10;
	this.normalMapId = hxsl_Globals.allocID("normalMap");
};
$hxClasses["h3d.pass.Normal"] = h3d_pass_Normal;
h3d_pass_Normal.__name__ = true;
h3d_pass_Normal.__super__ = h3d_pass_Default;
h3d_pass_Normal.prototype = $extend(h3d_pass_Default.prototype,{
	getOutputs: function() {
		return ["output.position","output.normal"];
	}
	,draw: function(passes) {
		var texture = this.tcache.allocTarget("normalMal",this.ctx,this.ctx.engine.width,this.ctx.engine.height);
		this.ctx.engine.setTarget(texture);
		this.ctx.engine.clear(0,1);
		passes = h3d_pass_Default.prototype.draw.call(this,passes);
		this.ctx.sharedGlobals.h[this.normalMapId] = texture;
		return passes;
	}
	,__class__: h3d_pass_Normal
});
var h3d_pass_Object = function() {
};
$hxClasses["h3d.pass.Object"] = h3d_pass_Object;
h3d_pass_Object.__name__ = true;
h3d_pass_Object.prototype = {
	__class__: h3d_pass_Object
};
var h3d_pass_Params = function() { };
$hxClasses["h3d.pass.Params"] = h3d_pass_Params;
h3d_pass_Params.__name__ = true;
var h3d_pass_ShadowMap = function(size) {
	this.bias = 0.01;
	this.power = 10.0;
	h3d_pass_Default.call(this);
	this.set_size(size);
	this.priority = 9;
	this.lightDirection = new h3d_Vector(0,0,-1);
	this.lightCamera = new h3d_Camera();
	this.lightCamera.orthoBounds = new h3d_col_Bounds();
	this.shadowMapId = hxsl_Globals.allocID("shadow.map");
	this.shadowProjId = hxsl_Globals.allocID("shadow.proj");
	this.shadowColorId = hxsl_Globals.allocID("shadow.color");
	this.shadowPowerId = hxsl_Globals.allocID("shadow.power");
	this.shadowBiasId = hxsl_Globals.allocID("shadow.bias");
	this.color = new h3d_Vector();
	this.blur = new h3d_pass_Blur(2,3);
	this.border = new h3d_pass_Border(size,size);
};
$hxClasses["h3d.pass.ShadowMap"] = h3d_pass_ShadowMap;
h3d_pass_ShadowMap.__name__ = true;
h3d_pass_ShadowMap.__super__ = h3d_pass_Default;
h3d_pass_ShadowMap.prototype = $extend(h3d_pass_Default.prototype,{
	set_size: function(s) {
		if(this.border != null) {
			this.border.dispose();
			this.border = new h3d_pass_Border(s,s);
		}
		return this.size = s;
	}
	,calcShadowBounds: function(camera) {
		var bounds = camera.orthoBounds;
		bounds.xMin = -10;
		bounds.yMin = -10;
		bounds.zMin = -10;
		bounds.xMax = 10;
		bounds.yMax = 10;
		bounds.zMax = 10;
	}
	,getOutputs: function() {
		return ["output.position","output.depth"];
	}
	,setGlobals: function() {
		h3d_pass_Default.prototype.setGlobals.call(this);
		this.lightCamera.orthoBounds.empty();
		this.calcShadowBounds(this.lightCamera);
		this.lightCamera.update();
		this.set_cameraViewProj(this.lightCamera.m);
	}
	,draw: function(passes) {
		var texture = this.tcache.allocTarget("shadowMap",this.ctx,this.size,this.size);
		var ct = this.ctx.camera.target;
		this.lightCamera.target.set(this.lightDirection.x,this.lightDirection.y,this.lightDirection.z,null);
		this.lightCamera.target.normalize();
		this.lightCamera.target.x += ct.x;
		this.lightCamera.target.y += ct.y;
		this.lightCamera.target.z += ct.z;
		this.lightCamera.pos.load(ct);
		this.lightCamera.update();
		this.ctx.engine.setTarget(texture);
		this.ctx.engine.clear(16777215,1,this.tcache.fullClearRequired?0:null);
		passes = h3d_pass_Default.prototype.draw.call(this,passes);
		if(this.border != null) this.border.render();
		if(this.blur.quality > 0 && this.blur.passes > 0) this.blur.apply(texture,this.tcache.allocTarget("tmpBlur",this.ctx,this.size,this.size,false),null,true);
		this.ctx.sharedGlobals.h[this.shadowMapId] = texture;
		this.ctx.sharedGlobals.h[this.shadowProjId] = this.lightCamera.m;
		this.ctx.sharedGlobals.h[this.shadowColorId] = this.color;
		this.ctx.sharedGlobals.h[this.shadowPowerId] = this.power;
		this.ctx.sharedGlobals.h[this.shadowBiasId] = this.bias;
		return passes;
	}
	,__class__: h3d_pass_ShadowMap
});
var h3d_prim_Primitive = function() { };
$hxClasses["h3d.prim.Primitive"] = h3d_prim_Primitive;
h3d_prim_Primitive.__name__ = true;
h3d_prim_Primitive.prototype = {
	triCount: function() {
		if(this.indexes != null) return this.indexes.count / 3 | 0; else if(this.buffer == null) return 0; else return Std["int"](this.buffer.totalVertices() / 3);
	}
	,alloc: function(engine) {
		throw new js__$Boot_HaxeError("not implemented");
	}
	,render: function(engine) {
		if(this.buffer == null || this.buffer.isDisposed()) this.alloc(engine);
		if(this.indexes == null) {
			if((this.buffer.flags & 1 << h3d_BufferFlag.Quads[1]) != 0) engine.renderBuffer(this.buffer,engine.mem.quadIndexes,2,0,-1); else engine.renderBuffer(this.buffer,engine.mem.triIndexes,3,0,-1);
		} else engine.renderIndexed(this.buffer,this.indexes);
	}
	,dispose: function() {
		if(this.buffer != null) {
			this.buffer.dispose();
			this.buffer = null;
		}
		if(this.indexes != null) {
			this.indexes.dispose();
			this.indexes = null;
		}
	}
	,__class__: h3d_prim_Primitive
};
var h3d_prim_Polygon = function(points,idx) {
	this.points = points;
	this.idx = idx;
};
$hxClasses["h3d.prim.Polygon"] = h3d_prim_Polygon;
h3d_prim_Polygon.__name__ = true;
h3d_prim_Polygon.__super__ = h3d_prim_Primitive;
h3d_prim_Polygon.prototype = $extend(h3d_prim_Primitive.prototype,{
	alloc: function(engine) {
		this.dispose();
		var size = 3;
		if(this.normals != null) size += 3;
		if(this.uvs != null) size += 2;
		if(this.colors != null) size += 3;
		var buf;
		var this1;
		this1 = new Array(0);
		buf = this1;
		var _g1 = 0;
		var _g = this.points.length;
		while(_g1 < _g) {
			var k = _g1++;
			var p = this.points[k];
			buf.push(p.x);
			buf.push(p.y);
			buf.push(p.z);
			if(this.normals != null) {
				var n = this.normals[k];
				buf.push(n.x);
				buf.push(n.y);
				buf.push(n.z);
			}
			if(this.uvs != null) {
				var t = this.uvs[k];
				buf.push(t.u);
				buf.push(t.v);
			}
			if(this.colors != null) {
				var c = this.colors[k];
				buf.push(c.x);
				buf.push(c.y);
				buf.push(c.z);
			}
		}
		var flags = [];
		if(this.idx == null) flags.push(h3d_BufferFlag.Triangles);
		if(this.normals == null) flags.push(h3d_BufferFlag.RawFormat);
		this.buffer = h3d_Buffer.ofFloats(buf,size,flags);
		if(this.idx != null) this.indexes = h3d_Indexes.alloc(this.idx);
	}
	,translate: function(dx,dy,dz) {
		var _g = 0;
		var _g1 = this.points;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.x += dx;
			p.y += dy;
			p.z += dz;
		}
	}
	,addNormals: function() {
		this.normals = [];
		var _g1 = 0;
		var _g = this.points.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.normals[i] = new h3d_col_Point();
		}
		var pos = 0;
		var _g11 = 0;
		var _g2 = this.triCount();
		while(_g11 < _g2) {
			var i1 = _g11++;
			var i0;
			var i11;
			var i2;
			if(this.idx == null) {
				i0 = pos++;
				i11 = pos++;
				i2 = pos++;
			} else {
				var key = pos++;
				i0 = this.idx[key];
				var key1 = pos++;
				i11 = this.idx[key1];
				var key2 = pos++;
				i2 = this.idx[key2];
			}
			var p0 = this.points[i0];
			var p1 = this.points[i11];
			var p2 = this.points[i2];
			var n = new h3d_col_Point(p1.x - p0.x,p1.y - p0.y,p1.z - p0.z).cross(new h3d_col_Point(p2.x - p0.x,p2.y - p0.y,p2.z - p0.z));
			this.normals[i0].x += n.x;
			this.normals[i0].y += n.y;
			this.normals[i0].z += n.z;
			this.normals[i11].x += n.x;
			this.normals[i11].y += n.y;
			this.normals[i11].z += n.z;
			this.normals[i2].x += n.x;
			this.normals[i2].y += n.y;
			this.normals[i2].z += n.z;
		}
		var _g3 = 0;
		var _g12 = this.normals;
		while(_g3 < _g12.length) {
			var n1 = _g12[_g3];
			++_g3;
			n1.normalize();
		}
	}
	,triCount: function() {
		var n = h3d_prim_Primitive.prototype.triCount.call(this);
		if(n != 0) return n;
		return (this.idx == null?this.points.length:this.idx.length) / 3 | 0;
	}
	,__class__: h3d_prim_Polygon
});
var h3d_prim_Cube = function(x,y,z) {
	if(z == null) z = 1.;
	if(y == null) y = 1.;
	if(x == null) x = 1.;
	var p = [new h3d_col_Point(0,0,0),new h3d_col_Point(x,0,0),new h3d_col_Point(0,y,0),new h3d_col_Point(0,0,z),new h3d_col_Point(x,y,0),new h3d_col_Point(x,0,z),new h3d_col_Point(0,y,z),new h3d_col_Point(x,y,z)];
	var idx;
	var this1;
	this1 = new Array(0);
	idx = this1;
	idx.push(0);
	idx.push(1);
	idx.push(5);
	idx.push(0);
	idx.push(5);
	idx.push(3);
	idx.push(1);
	idx.push(4);
	idx.push(7);
	idx.push(1);
	idx.push(7);
	idx.push(5);
	idx.push(3);
	idx.push(5);
	idx.push(7);
	idx.push(3);
	idx.push(7);
	idx.push(6);
	idx.push(0);
	idx.push(6);
	idx.push(2);
	idx.push(0);
	idx.push(3);
	idx.push(6);
	idx.push(2);
	idx.push(7);
	idx.push(4);
	idx.push(2);
	idx.push(6);
	idx.push(7);
	idx.push(0);
	idx.push(4);
	idx.push(1);
	idx.push(0);
	idx.push(2);
	idx.push(4);
	h3d_prim_Polygon.call(this,p,idx);
};
$hxClasses["h3d.prim.Cube"] = h3d_prim_Cube;
h3d_prim_Cube.__name__ = true;
h3d_prim_Cube.__super__ = h3d_prim_Polygon;
h3d_prim_Cube.prototype = $extend(h3d_prim_Polygon.prototype,{
	__class__: h3d_prim_Cube
});
var h3d_prim_Plan2D = function() {
};
$hxClasses["h3d.prim.Plan2D"] = h3d_prim_Plan2D;
h3d_prim_Plan2D.__name__ = true;
h3d_prim_Plan2D.__super__ = h3d_prim_Primitive;
h3d_prim_Plan2D.prototype = $extend(h3d_prim_Primitive.prototype,{
	alloc: function(engine) {
		var v;
		var this1;
		this1 = new Array(0);
		v = this1;
		v.push(-1);
		v.push(-1);
		v.push(0);
		v.push(1);
		v.push(-1);
		v.push(1);
		v.push(0);
		v.push(0);
		v.push(1);
		v.push(-1);
		v.push(1);
		v.push(1);
		v.push(1);
		v.push(1);
		v.push(1);
		v.push(0);
		this.buffer = h3d_Buffer.ofFloats(v,4,[h3d_BufferFlag.Quads,h3d_BufferFlag.RawFormat]);
	}
	,render: function(engine) {
		if(this.buffer == null) this.alloc(engine);
		engine.renderBuffer(this.buffer,engine.mem.quadIndexes,2,0,-1);
	}
	,__class__: h3d_prim_Plan2D
});
var h3d_prim_RawPrimitive = function(engine,vbuf,stride,ibuf) {
	var flags = [];
	if(ibuf == null) flags.push(h3d_BufferFlag.Triangles);
	if(stride < 8) flags.push(h3d_BufferFlag.RawFormat);
	this.buffer = h3d_Buffer.ofFloats(vbuf,stride,flags);
	if(ibuf != null) this.indexes = h3d_Indexes.alloc(ibuf);
};
$hxClasses["h3d.prim.RawPrimitive"] = h3d_prim_RawPrimitive;
h3d_prim_RawPrimitive.__name__ = true;
h3d_prim_RawPrimitive.__super__ = h3d_prim_Primitive;
h3d_prim_RawPrimitive.prototype = $extend(h3d_prim_Primitive.prototype,{
	__class__: h3d_prim_RawPrimitive
});
var h3d_prim_UV = function() { };
$hxClasses["h3d.prim.UV"] = h3d_prim_UV;
h3d_prim_UV.__name__ = true;
h3d_prim_UV.prototype = {
	__class__: h3d_prim_UV
};
var h3d_scene_Object = function(parent) {
	this.flags = 0;
	this.absPos = new h3d_Matrix();
	this.absPos.identity();
	this.x = 0;
	this.flags |= 1;
	true;
	0;
	this.y = 0;
	this.flags |= 1;
	true;
	0;
	this.z = 0;
	this.flags |= 1;
	true;
	0;
	this.scaleX = 1;
	this.flags |= 1;
	true;
	1;
	this.scaleY = 1;
	this.flags |= 1;
	true;
	1;
	this.scaleZ = 1;
	this.flags |= 1;
	true;
	1;
	this.qRot = new h3d_Quat();
	this.flags &= ~1;
	false;
	this.set_culled(false);
	this.flags |= 2;
	true;
	this.childs = [];
	if(parent != null) parent.addChild(this);
};
$hxClasses["h3d.scene.Object"] = h3d_scene_Object;
h3d_scene_Object.__name__ = true;
h3d_scene_Object.prototype = {
	set_posChanged: function(b) {
		if(b) this.flags |= 1; else this.flags &= ~1;
		return b;
	}
	,set_culled: function(b) {
		if(b) this.flags |= 4; else this.flags &= ~4;
		return b;
	}
	,localToGlobal: function(pt) {
		this.syncPos();
		if(pt == null) pt = new h3d_Vector();
		pt.transform3x4(this.absPos);
		return pt;
	}
	,getInvPos: function() {
		if(this.invPos == null) {
			this.invPos = new h3d_Matrix();
			this.invPos._44 = 0;
		}
		if(this.invPos._44 == 0) this.invPos.inverse3x4(this.absPos);
		return this.invPos;
	}
	,addChild: function(o) {
		this.addChildAt(o,this.childs.length);
	}
	,addChildAt: function(o,pos) {
		if(pos < 0) pos = 0;
		if(pos > this.childs.length) pos = this.childs.length;
		var p = this;
		while(p != null) {
			if(p == o) throw new js__$Boot_HaxeError("Recursive addChild");
			p = p.parent;
		}
		if(o.parent != null) o.parent.removeChild(o);
		this.childs.splice(pos,0,o);
		o.parent = this;
		o.lastFrame = -1;
		o.flags |= 1;
		true;
	}
	,removeChild: function(o) {
		if(HxOverrides.remove(this.childs,o)) o.parent = null;
	}
	,draw: function(ctx) {
	}
	,calcAbsPos: function() {
		this.qRot.saveToMatrix(this.absPos);
		this.absPos._11 *= this.scaleX;
		this.absPos._12 *= this.scaleX;
		this.absPos._13 *= this.scaleX;
		this.absPos._21 *= this.scaleY;
		this.absPos._22 *= this.scaleY;
		this.absPos._23 *= this.scaleY;
		this.absPos._31 *= this.scaleZ;
		this.absPos._32 *= this.scaleZ;
		this.absPos._33 *= this.scaleZ;
		this.absPos._41 = this.x;
		this.absPos._42 = this.y;
		this.absPos._43 = this.z;
		if(this.follow != null) {
			this.follow.syncPos();
			if((this.flags & 8) != 0) {
				var _g = this.absPos;
				_g._41 = _g._41 + this.follow.absPos._41;
				var _g1 = this.absPos;
				_g1._42 = _g1._42 + this.follow.absPos._42;
				var _g2 = this.absPos;
				_g2._43 = _g2._43 + this.follow.absPos._43;
			} else this.absPos.multiply3x4(this.absPos,this.follow.absPos);
		} else if(this.parent != null) this.absPos.multiply3x4inline(this.absPos,this.parent.absPos);
		if(this.defaultTransform != null) this.absPos.multiply3x4inline(this.defaultTransform,this.absPos);
		if(this.invPos != null) this.invPos._44 = 0;
	}
	,sync: function(ctx) {
	}
	,syncRec: function(ctx) {
		if(this.currentAnimation != null) {
			var old = this.parent;
			var dt = ctx.elapsedTime;
			while(dt > 0 && this.currentAnimation != null) dt = this.currentAnimation.update(dt);
			if(this.currentAnimation != null) this.currentAnimation.sync();
			if(this.parent == null && old != null) return;
		}
		var changed = (this.flags & 1) != 0;
		if(changed) this.calcAbsPos();
		this.sync(ctx);
		this.set_posChanged(this.follow == null);
		this.lastFrame = ctx.frame;
		var p = 0;
		var len = this.childs.length;
		while(p < len) {
			var c = this.childs[p];
			if(c == null) break;
			if(c.lastFrame != ctx.frame) {
				if(changed) {
					c.flags |= 1;
					true;
				}
				c.syncRec(ctx);
			}
			if(this.childs[p] != c) {
				p = 0;
				len = this.childs.length;
			} else p++;
		}
	}
	,syncPos: function() {
		if(this.parent != null) this.parent.syncPos();
		if((this.flags & 1) != 0) {
			this.flags &= ~1;
			false;
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.flags |= 1;
				true;
			}
		}
	}
	,emit: function(ctx) {
	}
	,emitRec: function(ctx) {
		if((this.flags & 4) != 0) return;
		if((this.flags & 1) != 0) {
			if(this.currentAnimation != null) this.currentAnimation.sync();
			this.flags &= ~1;
			false;
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.flags |= 1;
				true;
			}
		}
		this.emit(ctx);
		var _g2 = 0;
		var _g11 = this.childs;
		while(_g2 < _g11.length) {
			var c1 = _g11[_g2];
			++_g2;
			c1.emitRec(ctx);
		}
	}
	,set_x: function(v) {
		this.x = v;
		this.flags |= 1;
		true;
		return v;
	}
	,set_y: function(v) {
		this.y = v;
		this.flags |= 1;
		true;
		return v;
	}
	,set_z: function(v) {
		this.z = v;
		this.flags |= 1;
		true;
		return v;
	}
	,set_scaleX: function(v) {
		this.scaleX = v;
		this.flags |= 1;
		true;
		return v;
	}
	,__class__: h3d_scene_Object
};
var h3d_scene_Light = function(shader,parent) {
	this.priority = 0;
	this.cullingDistance = 1e10;
	h3d_scene_Object.call(this,parent);
	this.shader = shader;
};
$hxClasses["h3d.scene.Light"] = h3d_scene_Light;
h3d_scene_Light.__name__ = true;
h3d_scene_Light.__super__ = h3d_scene_Object;
h3d_scene_Light.prototype = $extend(h3d_scene_Object.prototype,{
	emit: function(ctx) {
		ctx.emitLight(this);
	}
	,__class__: h3d_scene_Light
});
var h3d_scene_DirLight = function(dir,parent) {
	this.dshader = new h3d_shader_DirLight();
	this.direction = dir;
	h3d_scene_Light.call(this,this.dshader,parent);
	this.priority = 100;
};
$hxClasses["h3d.scene.DirLight"] = h3d_scene_DirLight;
h3d_scene_DirLight.__name__ = true;
h3d_scene_DirLight.__super__ = h3d_scene_Light;
h3d_scene_DirLight.prototype = $extend(h3d_scene_Light.prototype,{
	get_color: function() {
		return this.dshader.color__;
	}
	,emit: function(ctx) {
		this.dshader.direction__.set(-this.direction.x,-this.direction.y,-this.direction.z,null);
		this.dshader.direction__.normalize();
		h3d_scene_Light.prototype.emit.call(this,ctx);
	}
	,__class__: h3d_scene_DirLight
});
var h3d_scene_Mesh = function(prim,mat,parent) {
	h3d_scene_Object.call(this,parent);
	this.primitive = prim;
	if(mat == null) mat = new h3d_mat_MeshMaterial(null);
	this.material = mat;
};
$hxClasses["h3d.scene.Mesh"] = h3d_scene_Mesh;
h3d_scene_Mesh.__name__ = true;
h3d_scene_Mesh.__super__ = h3d_scene_Object;
h3d_scene_Mesh.prototype = $extend(h3d_scene_Object.prototype,{
	draw: function(ctx) {
		this.primitive.render(ctx.engine);
	}
	,emit: function(ctx) {
		ctx.emit(this.material,this,null);
	}
	,__class__: h3d_scene_Mesh
});
var h3d_scene_RenderContext = function() {
	h3d_impl_RenderContext.call(this);
	this.cachedShaderList = [];
};
$hxClasses["h3d.scene.RenderContext"] = h3d_scene_RenderContext;
h3d_scene_RenderContext.__name__ = true;
h3d_scene_RenderContext.__super__ = h3d_impl_RenderContext;
h3d_scene_RenderContext.prototype = $extend(h3d_impl_RenderContext.prototype,{
	emit: function(mat,obj,index) {
		if(index == null) index = 0;
		var p = mat.passes;
		while(p != null) {
			this.emitPass(p,obj).index = index;
			p = p.nextPass;
		}
	}
	,start: function() {
		this.sharedGlobals = new haxe_ds_IntMap();
		this.lights = null;
		this.drawPass = null;
		this.passes = null;
		this.lights = null;
		this.uploadParams = null;
		this.cachedPos = 0;
		this.time += this.elapsedTime;
		this.frame++;
	}
	,nextPass: function() {
		this.cachedPos = 0;
		this.drawPass = null;
	}
	,emitPass: function(pass,obj) {
		var o = this.pool;
		if(o == null) o = new h3d_pass_Object(); else this.pool = o.next;
		o.pass = pass;
		o.obj = obj;
		o.next = this.passes;
		this.passes = o;
		return o;
	}
	,allocShaderList: function(s,next) {
		var sl = this.cachedShaderList[this.cachedPos++];
		if(sl == null) {
			sl = new hxsl_ShaderList(null);
			this.cachedShaderList[this.cachedPos - 1] = sl;
		}
		sl.s = s;
		sl.next = next;
		return sl;
	}
	,emitLight: function(l) {
		l.next = this.lights;
		this.lights = l;
	}
	,done: function() {
		this.drawPass = null;
		this.uploadParams = null;
		var p = this.passes;
		var prev = null;
		while(p != null) {
			p.obj = null;
			p.pass = null;
			p.shader = null;
			p.shaders = null;
			p.index = 0;
			prev = p;
			p = p.next;
		}
		if(prev != null) {
			prev.next = this.pool;
			this.pool = this.passes;
		}
		var _g = 0;
		var _g1 = this.cachedShaderList;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.s = null;
			c.next = null;
		}
		this.passes = null;
		this.lights = null;
	}
	,__class__: h3d_scene_RenderContext
});
var h3d_scene_PassGroup = function(name,passes) {
	this.name = name;
	this.passes = passes;
};
$hxClasses["h3d.scene.PassGroup"] = h3d_scene_PassGroup;
h3d_scene_PassGroup.__name__ = true;
h3d_scene_PassGroup.prototype = {
	__class__: h3d_scene_PassGroup
};
var h3d_scene_Renderer = function() {
	this.passes = new haxe_ds_StringMap();
	this.allPasses = [];
	this.tcache = new h3d_impl_TextureCache();
	this.passGroups = new haxe_ds_StringMap();
};
$hxClasses["h3d.scene.Renderer"] = h3d_scene_Renderer;
h3d_scene_Renderer.__name__ = true;
h3d_scene_Renderer.prototype = {
	createDefaultPass: function(name) {
		switch(name) {
		case "depth":
			if(this.depth != null) return this.depth;
			return this.depth = new h3d_pass_Depth();
		case "normal":
			if(this.normal != null) return this.normal;
			return this.normal = new h3d_pass_Normal();
		case "shadow":
			if(this.shadow != null) return this.shadow;
			return this.shadow = new h3d_pass_ShadowMap(1024);
		default:
			if(this.def != null) return this.def;
			return this.def = new h3d_pass_Default();
		}
	}
	,getPass: function(name) {
		var p = this.passes.get(name);
		if(p == null) {
			p = this.createDefaultPass(name);
			this.setPass(name,p);
		}
		return p;
	}
	,setPass: function(name,p) {
		var _g = 0;
		var _g1 = this.allPasses;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			if(p1.name == name) HxOverrides.remove(this.allPasses,p1);
		}
		this.passes.set(name,p);
		this.allPasses.push({ name : name, p : p});
		this.allPasses.sort(function(p11,p2) {
			return p2.p.priority - p11.p.priority;
		});
	}
	,depthSort: function(passes) {
		var p = passes;
		var cam = this.ctx.camera.m;
		while(p != null) {
			var z = p.obj.absPos._41 * cam._13 + p.obj.absPos._42 * cam._23 + p.obj.absPos._43 * cam._33 + cam._43;
			var w = p.obj.absPos._41 * cam._14 + p.obj.absPos._42 * cam._24 + p.obj.absPos._43 * cam._34 + cam._44;
			p.depth = z / w;
			p = p.next;
		}
		return haxe_ds_ListSort.sortSingleLinked(passes,function(p1,p2) {
			if(p1.depth > p2.depth) return -1; else return 1;
		});
	}
	,render: function() {
		var _g = 0;
		var _g1 = this.allPasses;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var pdata = this.passGroups.get(p.name);
			if(pdata != null && pdata.rendered) continue;
			if(pdata != null || p.p.forceProcessing) {
				p.p.setContext(this.ctx);
				var passes;
				if(pdata == null) passes = null; else passes = pdata.passes;
				if(p.name == "alpha") passes = this.depthSort(passes);
				if(p.name == "default") this.ctx.engine.setTarget(null);
				passes = p.p.draw(passes);
				if(pdata != null) {
					pdata.passes = passes;
					pdata.rendered = true;
				}
			}
		}
	}
	,process: function(ctx,passes) {
		this.ctx = ctx;
		var _g = 0;
		while(_g < passes.length) {
			var p = passes[_g];
			++_g;
			this.getPass(p.name).setContext(ctx);
			this.passGroups.set(p.name,p);
		}
		this.render();
		var _g1 = 0;
		while(_g1 < passes.length) {
			var p1 = passes[_g1];
			++_g1;
			this.passGroups.set(p1.name,null);
		}
	}
	,__class__: h3d_scene_Renderer
};
var h3d_scene_Scene = function() {
	h3d_scene_Object.call(this,null);
	this.camera = new h3d_Camera();
	this.ctx = new h3d_scene_RenderContext();
	this.renderer = new h3d_scene_Renderer();
	this.lightSystem = new h3d_pass_LightSystem();
	this.postPasses = [];
	this.prePasses = [];
};
$hxClasses["h3d.scene.Scene"] = h3d_scene_Scene;
h3d_scene_Scene.__name__ = true;
h3d_scene_Scene.__interfaces__ = [h3d_IDrawable];
h3d_scene_Scene.__super__ = h3d_scene_Object;
h3d_scene_Scene.prototype = $extend(h3d_scene_Object.prototype,{
	addPass: function(p,before) {
		if(before == null) before = false;
		if(before) this.prePasses.push(p); else this.postPasses.push(p);
	}
	,setElapsedTime: function(elapsedTime) {
		this.ctx.elapsedTime = elapsedTime;
	}
	,render: function(engine) {
		this.camera.screenRatio = engine.width / engine.height;
		this.camera.update();
		this.ctx.camera = this.camera;
		this.ctx.engine = engine;
		this.ctx.start();
		var _g = 0;
		var _g1 = this.prePasses;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.render(engine);
		}
		this.syncRec(this.ctx);
		this.emitRec(this.ctx);
		this.ctx.passes = haxe_ds_ListSort.sortSingleLinked(this.ctx.passes,function(p1,p2) {
			return p1.pass.passId - p2.pass.passId;
		});
		var curPass = this.ctx.passes;
		var passes = [];
		while(curPass != null) {
			var passId = curPass.pass.passId;
			var p3 = curPass;
			var prev1 = null;
			while(p3 != null && p3.pass.passId == passId) {
				prev1 = p3;
				p3 = p3.next;
			}
			prev1.next = null;
			passes.push(new h3d_scene_PassGroup(curPass.pass.name,curPass));
			curPass = p3;
		}
		this.ctx.lightSystem = this.lightSystem;
		this.renderer.process(this.ctx,passes);
		var count = 0;
		var prev = null;
		var _g2 = 0;
		while(_g2 < passes.length) {
			var p4 = passes[_g2];
			++_g2;
			if(!p4.rendered) throw new js__$Boot_HaxeError("Pass " + p4.name + " has not been rendered : don't know how to handle.");
			var p5 = p4.passes;
			if(prev != null) prev.next = p5;
			while(p5 != null) {
				prev = p5;
				p5 = p5.next;
			}
		}
		if(passes.length > 0) this.ctx.passes = passes[0].passes;
		this.ctx.done();
		var _g3 = 0;
		var _g11 = this.postPasses;
		while(_g3 < _g11.length) {
			var p6 = _g11[_g3];
			++_g3;
			p6.render(engine);
		}
		this.ctx.camera = null;
		this.ctx.engine = null;
	}
	,__class__: h3d_scene_Scene
});
var h3d_shader_AmbientLight = function() {
	hxsl_Shader.call(this);
};
$hxClasses["h3d.shader.AmbientLight"] = h3d_shader_AmbientLight;
h3d_shader_AmbientLight.__name__ = true;
h3d_shader_AmbientLight.__super__ = hxsl_Shader;
h3d_shader_AmbientLight.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		return null;
	}
	,__class__: h3d_shader_AmbientLight
});
var h3d_shader_Base2d = function() {
	this.viewport__ = new h3d_Vector();
	this.color__ = new h3d_Vector();
	this.absoluteMatrixB__ = new h3d_Vector();
	this.uvPos__ = new h3d_Vector();
	this.halfPixelInverse__ = new h3d_Vector();
	this.absoluteMatrixA__ = new h3d_Vector();
	this.zValue__ = 0;
	hxsl_Shader.call(this);
};
$hxClasses["h3d.shader.Base2d"] = h3d_shader_Base2d;
h3d_shader_Base2d.__name__ = true;
h3d_shader_Base2d.__super__ = hxsl_Shader;
h3d_shader_Base2d.prototype = $extend(hxsl_Shader.prototype,{
	set_hasUVPos: function(_v) {
		this.constModified = true;
		return this.hasUVPos__ = _v;
	}
	,set_pixelAlign: function(_v) {
		this.constModified = true;
		return this.pixelAlign__ = _v;
	}
	,set_isRelative: function(_v) {
		this.constModified = true;
		return this.isRelative__ = _v;
	}
	,updateConstants: function(globals) {
		this.constBits = 0;
		if(this.hasUVPos__) this.constBits |= 1;
		if(this.pixelAlign__) this.constBits |= 2;
		if(this.isRelative__) this.constBits |= 4;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.zValue__;
		case 1:
			return this.absoluteMatrixA__;
		case 2:
			return this.hasUVPos__;
		case 3:
			return this.texture__;
		case 4:
			return this.pixelAlign__;
		case 5:
			return this.halfPixelInverse__;
		case 6:
			return this.uvPos__;
		case 7:
			return this.isRelative__;
		case 8:
			return this.absoluteMatrixB__;
		case 9:
			return this.color__;
		case 10:
			return this.viewport__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_Base2d
});
var h3d_shader_BaseMesh = function() {
	this.color__ = new h3d_Vector();
	hxsl_Shader.call(this);
	this.color__.set(1,1,1,null);
};
$hxClasses["h3d.shader.BaseMesh"] = h3d_shader_BaseMesh;
h3d_shader_BaseMesh.__name__ = true;
h3d_shader_BaseMesh.__super__ = hxsl_Shader;
h3d_shader_BaseMesh.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_BaseMesh
});
var h3d_shader_ScreenShader = function() {
	hxsl_Shader.call(this);
};
$hxClasses["h3d.shader.ScreenShader"] = h3d_shader_ScreenShader;
h3d_shader_ScreenShader.__name__ = true;
h3d_shader_ScreenShader.__super__ = hxsl_Shader;
h3d_shader_ScreenShader.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		return null;
	}
	,__class__: h3d_shader_ScreenShader
});
var h3d_shader_Blur = function() {
	this.values__ = [];
	this.fixedColor__ = new h3d_Vector();
	this.pixel__ = new h3d_Vector();
	this.Quality__ = 0;
	h3d_shader_ScreenShader.call(this);
};
$hxClasses["h3d.shader.Blur"] = h3d_shader_Blur;
h3d_shader_Blur.__name__ = true;
h3d_shader_Blur.__super__ = h3d_shader_ScreenShader;
h3d_shader_Blur.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	set_Quality: function(_v) {
		this.constModified = true;
		return this.Quality__ = _v;
	}
	,set_isDepth: function(_v) {
		this.constModified = true;
		return this.isDepth__ = _v;
	}
	,updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.Quality__;
		if(v >>> 8 != 0) throw new js__$Boot_HaxeError("Quality" + " is out of range " + v + ">" + 255);
		this.constBits |= v;
		if(this.hasFixedColor__) this.constBits |= 256;
		if(this.isDepth__) this.constBits |= 512;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.Quality__;
		case 1:
			return this.pixel__;
		case 2:
			return this.hasFixedColor__;
		case 3:
			return this.fixedColor__;
		case 4:
			return this.values__;
		case 5:
			return this.texture__;
		case 6:
			return this.isDepth__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_Blur
});
var h3d_shader_ShaderBuffers = function(s) {
	var this1;
	this1 = new Array(s.globalsSize << 2);
	this.globals = this1;
	var this2;
	this2 = new Array(s.paramsSize << 2);
	this.params = this2;
	var this3;
	this3 = new Array(s.textures2DCount + s.texturesCubeCount);
	this.tex = this3;
};
$hxClasses["h3d.shader.ShaderBuffers"] = h3d_shader_ShaderBuffers;
h3d_shader_ShaderBuffers.__name__ = true;
h3d_shader_ShaderBuffers.prototype = {
	grow: function(s) {
		var ng = s.globalsSize << 2;
		var np = s.paramsSize << 2;
		var nt = s.textures2DCount + s.texturesCubeCount;
		if(this.globals.length < ng) {
			var this1;
			this1 = new Array(ng);
			this.globals = this1;
		}
		if(this.params.length < np) {
			var this2;
			this2 = new Array(np);
			this.params = this2;
		}
		if(this.tex.length < nt) {
			var this3;
			this3 = new Array(nt);
			this.tex = this3;
		}
	}
	,__class__: h3d_shader_ShaderBuffers
};
var h3d_shader_Buffers = function(s) {
	this.vertex = new h3d_shader_ShaderBuffers(s.vertex);
	this.fragment = new h3d_shader_ShaderBuffers(s.fragment);
};
$hxClasses["h3d.shader.Buffers"] = h3d_shader_Buffers;
h3d_shader_Buffers.__name__ = true;
h3d_shader_Buffers.prototype = {
	grow: function(s) {
		this.vertex.grow(s.vertex);
		this.fragment.grow(s.fragment);
	}
	,__class__: h3d_shader_Buffers
};
var h3d_shader_ColorAdd = function() {
	this.color__ = new h3d_Vector();
};
$hxClasses["h3d.shader.ColorAdd"] = h3d_shader_ColorAdd;
h3d_shader_ColorAdd.__name__ = true;
h3d_shader_ColorAdd.__super__ = hxsl_Shader;
h3d_shader_ColorAdd.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_ColorAdd
});
var h3d_shader_ColorKey = function() {
	this.colorKey__ = new h3d_Vector();
};
$hxClasses["h3d.shader.ColorKey"] = h3d_shader_ColorKey;
h3d_shader_ColorKey.__name__ = true;
h3d_shader_ColorKey.__super__ = hxsl_Shader;
h3d_shader_ColorKey.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.colorKey__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_ColorKey
});
var h3d_shader_ColorMatrix = function() {
	this.matrix__ = new h3d_Matrix();
};
$hxClasses["h3d.shader.ColorMatrix"] = h3d_shader_ColorMatrix;
h3d_shader_ColorMatrix.__name__ = true;
h3d_shader_ColorMatrix.__super__ = hxsl_Shader;
h3d_shader_ColorMatrix.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.matrix__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_ColorMatrix
});
var h3d_shader_DirLight = function() {
	this.direction__ = new h3d_Vector();
	this.color__ = new h3d_Vector();
	hxsl_Shader.call(this);
	this.color__.set(1,1,1,null);
};
$hxClasses["h3d.shader.DirLight"] = h3d_shader_DirLight;
h3d_shader_DirLight.__name__ = true;
h3d_shader_DirLight.__super__ = hxsl_Shader;
h3d_shader_DirLight.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		case 1:
			return this.direction__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_DirLight
});
var h3d_shader_Manager = function(output) {
	this.shaderCache = hxsl_Cache.get();
	this.globals = new hxsl_Globals();
	this.output = this.shaderCache.allocOutputVars(output);
};
$hxClasses["h3d.shader.Manager"] = h3d_shader_Manager;
h3d_shader_Manager.__name__ = true;
h3d_shader_Manager.prototype = {
	fillRec: function(v,type,out,pos) {
		switch(type[1]) {
		case 3:
			var val = v;
			out[pos] = val;
			return 1;
		case 5:
			var n = type[2];
			var v1 = v;
			var index = pos++;
			out[index] = v1.x;
			var index1 = pos++;
			out[index1] = v1.y;
			switch(n) {
			case 3:
				var index2 = pos++;
				out[index2] = v1.z;
				break;
			case 4:
				var index3 = pos++;
				out[index3] = v1.z;
				var index4 = pos++;
				out[index4] = v1.w;
				break;
			}
			return n;
		case 7:
			var m = v;
			var index5 = pos++;
			out[index5] = m._11;
			var index6 = pos++;
			out[index6] = m._21;
			var index7 = pos++;
			out[index7] = m._31;
			var index8 = pos++;
			out[index8] = m._41;
			var index9 = pos++;
			out[index9] = m._12;
			var index10 = pos++;
			out[index10] = m._22;
			var index11 = pos++;
			out[index11] = m._32;
			var index12 = pos++;
			out[index12] = m._42;
			var index13 = pos++;
			out[index13] = m._13;
			var index14 = pos++;
			out[index14] = m._23;
			var index15 = pos++;
			out[index15] = m._33;
			var index16 = pos++;
			out[index16] = m._43;
			var index17 = pos++;
			out[index17] = m._14;
			var index18 = pos++;
			out[index18] = m._24;
			var index19 = pos++;
			out[index19] = m._34;
			var index20 = pos++;
			out[index20] = m._44;
			return 16;
		case 8:
			var m1 = v;
			var index21 = pos++;
			out[index21] = m1._11;
			var index22 = pos++;
			out[index22] = m1._21;
			var index23 = pos++;
			out[index23] = m1._31;
			var index24 = pos++;
			out[index24] = m1._41;
			var index25 = pos++;
			out[index25] = m1._12;
			var index26 = pos++;
			out[index26] = m1._22;
			var index27 = pos++;
			out[index27] = m1._32;
			var index28 = pos++;
			out[index28] = m1._42;
			var index29 = pos++;
			out[index29] = m1._13;
			var index30 = pos++;
			out[index30] = m1._23;
			var index31 = pos++;
			out[index31] = m1._33;
			var index32 = pos++;
			out[index32] = m1._43;
			return 12;
		case 6:
			var m2 = v;
			var index33 = pos++;
			out[index33] = m2._11;
			var index34 = pos++;
			out[index34] = m2._21;
			var index35 = pos++;
			out[index35] = m2._31;
			var index36 = pos++;
			out[index36] = 0;
			var index37 = pos++;
			out[index37] = m2._12;
			var index38 = pos++;
			out[index38] = m2._22;
			var index39 = pos++;
			out[index39] = m2._32;
			var index40 = pos++;
			out[index40] = 0;
			var index41 = pos++;
			out[index41] = m2._13;
			var index42 = pos++;
			out[index42] = m2._23;
			var index43 = pos++;
			out[index43] = m2._33;
			var index44 = pos++;
			out[index44] = 0;
			return 12;
		case 14:
			var t = type[2];
			switch(type[2][1]) {
			case 5:
				switch(type[2][2]) {
				case 4:
					switch(type[2][3][1]) {
					case 1:
						switch(type[3][1]) {
						case 0:
							var len = type[3][2];
							var v2 = v;
							var _g = 0;
							while(_g < len) {
								var i = _g++;
								var n1 = v2[i];
								if(n1 == null) break;
								var index45 = pos++;
								out[index45] = n1.x;
								var index46 = pos++;
								out[index46] = n1.y;
								var index47 = pos++;
								out[index47] = n1.z;
								var index48 = pos++;
								out[index48] = n1.w;
							}
							return len * 4;
						default:
							throw new js__$Boot_HaxeError("assert " + Std.string(type));
						}
						break;
					default:
						switch(type[3][1]) {
						case 0:
							var len1 = type[3][2];
							var v3 = v;
							var size = 0;
							var _g1 = 0;
							while(_g1 < len1) {
								var i1 = _g1++;
								var n2 = v3[i1];
								if(n2 == null) break;
								size = this.fillRec(n2,t,out,pos);
								pos += size;
							}
							return len1 * size;
						default:
							throw new js__$Boot_HaxeError("assert " + Std.string(type));
						}
					}
					break;
				default:
					switch(type[3][1]) {
					case 0:
						var len2 = type[3][2];
						var v4 = v;
						var size1 = 0;
						var _g2 = 0;
						while(_g2 < len2) {
							var i2 = _g2++;
							var n3 = v4[i2];
							if(n3 == null) break;
							size1 = this.fillRec(n3,t,out,pos);
							pos += size1;
						}
						return len2 * size1;
					default:
						throw new js__$Boot_HaxeError("assert " + Std.string(type));
					}
				}
				break;
			case 8:
				switch(type[3][1]) {
				case 0:
					var len3 = type[3][2];
					var v5 = v;
					var _g3 = 0;
					while(_g3 < len3) {
						var i3 = _g3++;
						var m3 = v5[i3];
						if(m3 == null) break;
						var index49 = pos++;
						out[index49] = m3._11;
						var index50 = pos++;
						out[index50] = m3._21;
						var index51 = pos++;
						out[index51] = m3._31;
						var index52 = pos++;
						out[index52] = m3._41;
						var index53 = pos++;
						out[index53] = m3._12;
						var index54 = pos++;
						out[index54] = m3._22;
						var index55 = pos++;
						out[index55] = m3._32;
						var index56 = pos++;
						out[index56] = m3._42;
						var index57 = pos++;
						out[index57] = m3._13;
						var index58 = pos++;
						out[index58] = m3._23;
						var index59 = pos++;
						out[index59] = m3._33;
						var index60 = pos++;
						out[index60] = m3._43;
					}
					return len3 * 12;
				default:
					throw new js__$Boot_HaxeError("assert " + Std.string(type));
				}
				break;
			default:
				switch(type[3][1]) {
				case 0:
					var len4 = type[3][2];
					var v6 = v;
					var size2 = 0;
					var _g4 = 0;
					while(_g4 < len4) {
						var i4 = _g4++;
						var n4 = v6[i4];
						if(n4 == null) break;
						size2 = this.fillRec(n4,t,out,pos);
						pos += size2;
					}
					return len4 * size2;
				default:
					throw new js__$Boot_HaxeError("assert " + Std.string(type));
				}
			}
			break;
		case 12:
			var vl = type[2];
			var tot = 0;
			var _g5 = 0;
			while(_g5 < vl.length) {
				var vv = vl[_g5];
				++_g5;
				tot += this.fillRec(Reflect.field(v,vv.name),vv.type,out,pos + tot);
			}
			return tot;
		default:
			throw new js__$Boot_HaxeError("assert " + Std.string(type));
		}
		return 0;
	}
	,getParamValue: function(p,shaders) {
		if(p.perObjectGlobal != null) {
			var v1 = this.globals.map.h[p.perObjectGlobal.gid];
			if(v1 == null) throw new js__$Boot_HaxeError("Missing global value " + p.perObjectGlobal.path);
			return v1;
		}
		var si = shaders;
		var n = p.instance;
		while(n-- > 0) si = si.next;
		var v = si.s.getParamValue(p.index);
		if(v == null) throw new js__$Boot_HaxeError("Missing param value " + Std.string(si.s) + "." + p.name);
		return v;
	}
	,fillGlobals: function(buf,s) {
		var _g = this;
		var buf1 = buf.vertex;
		var s1 = s.vertex;
		var g = s1.globals;
		while(g != null) {
			var v = _g.globals.map.h[g.gid];
			if(v == null) {
				if(g.path == "__consts__") {
					_g.fillRec(s1.consts,g.type,buf1.globals,g.pos);
					g = g.next;
					continue;
				}
				throw new js__$Boot_HaxeError("Missing global value " + g.path);
			}
			_g.fillRec(v,g.type,buf1.globals,g.pos);
			g = g.next;
		}
		var buf2 = buf.fragment;
		var s2 = s.fragment;
		var g1 = s2.globals;
		while(g1 != null) {
			var v1 = _g.globals.map.h[g1.gid];
			if(v1 == null) {
				if(g1.path == "__consts__") {
					_g.fillRec(s2.consts,g1.type,buf2.globals,g1.pos);
					g1 = g1.next;
					continue;
				}
				throw new js__$Boot_HaxeError("Missing global value " + g1.path);
			}
			_g.fillRec(v1,g1.type,buf2.globals,g1.pos);
			g1 = g1.next;
		}
	}
	,fillParams: function(buf,s,shaders) {
		var _g = this;
		var buf1 = buf.vertex;
		var s1 = s.vertex;
		var p = s1.params;
		while(p != null) {
			var v = _g.getParamValue(p,shaders);
			_g.fillRec(v,p.type,buf1.params,p.pos);
			p = p.next;
		}
		var tid = 0;
		var p1 = s1.textures2D;
		while(p1 != null) {
			var t = _g.getParamValue(p1,shaders);
			if(t == null) t = h3d_mat_Texture.fromColor(16711935);
			var index = tid++;
			buf1.tex[index] = t;
			p1 = p1.next;
		}
		var p2 = s1.texturesCube;
		while(p2 != null) {
			var t1 = _g.getParamValue(p2,shaders);
			if(t1 == null) t1 = h3d_mat_Texture.fromColor(16711935);
			var index1 = tid++;
			buf1.tex[index1] = t1;
			p2 = p2.next;
		}
		var buf2 = buf.fragment;
		var s2 = s.fragment;
		var p3 = s2.params;
		while(p3 != null) {
			var v1 = _g.getParamValue(p3,shaders);
			_g.fillRec(v1,p3.type,buf2.params,p3.pos);
			p3 = p3.next;
		}
		var tid1 = 0;
		var p4 = s2.textures2D;
		while(p4 != null) {
			var t2 = _g.getParamValue(p4,shaders);
			if(t2 == null) t2 = h3d_mat_Texture.fromColor(16711935);
			var index2 = tid1++;
			buf2.tex[index2] = t2;
			p4 = p4.next;
		}
		var p5 = s2.texturesCube;
		while(p5 != null) {
			var t3 = _g.getParamValue(p5,shaders);
			if(t3 == null) t3 = h3d_mat_Texture.fromColor(16711935);
			var index3 = tid1++;
			buf2.tex[index3] = t3;
			p5 = p5.next;
		}
	}
	,compileShaders: function(shaders) {
		var _g = new hxsl__$ShaderList_ShaderIterator(shaders);
		while(_g.l != null) {
			var s = _g.next();
			s.updateConstants(this.globals);
		}
		return this.shaderCache.link(shaders,this.output);
	}
	,__class__: h3d_shader_Manager
};
var h3d_shader_Shadow = function() { };
$hxClasses["h3d.shader.Shadow"] = h3d_shader_Shadow;
h3d_shader_Shadow.__name__ = true;
h3d_shader_Shadow.__super__ = hxsl_Shader;
h3d_shader_Shadow.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.perPixel__) this.constBits |= 1;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.perPixel__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_Shadow
});
var h3d_shader_Skin = function() {
	this.MaxBones__ = 0;
	this.bonesMatrixes__ = [];
};
$hxClasses["h3d.shader.Skin"] = h3d_shader_Skin;
h3d_shader_Skin.__name__ = true;
h3d_shader_Skin.__super__ = hxsl_Shader;
h3d_shader_Skin.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.MaxBones__;
		if(v >>> 8 != 0) throw new js__$Boot_HaxeError("MaxBones" + " is out of range " + v + ">" + 255);
		this.constBits |= v;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.bonesMatrixes__;
		case 1:
			return this.MaxBones__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_Skin
});
var h3d_shader_Texture = function(tex) {
	this.killAlphaThreshold__ = 0;
	hxsl_Shader.call(this);
	this.texture__ = tex;
	this.killAlphaThreshold__ = h3d_pass_Params.defaultKillAlphaThreshold;
};
$hxClasses["h3d.shader.Texture"] = h3d_shader_Texture;
h3d_shader_Texture.__name__ = true;
h3d_shader_Texture.__super__ = hxsl_Shader;
h3d_shader_Texture.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.additive__) this.constBits |= 1;
		if(this.killAlpha__) this.constBits |= 2;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.additive__;
		case 1:
			return this.texture__;
		case 2:
			return this.killAlphaThreshold__;
		case 3:
			return this.killAlpha__;
		default:
		}
		return null;
	}
	,__class__: h3d_shader_Texture
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = true;
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_crypto_Md5 = function() {
};
$hxClasses["haxe.crypto.Md5"] = haxe_crypto_Md5;
haxe_crypto_Md5.__name__ = true;
haxe_crypto_Md5.encode = function(s) {
	var m = new haxe_crypto_Md5();
	var h = m.doEncode(haxe_crypto_Md5.str2blks(s));
	return m.hex(h);
};
haxe_crypto_Md5.str2blks = function(str) {
	var nblk = (str.length + 8 >> 6) + 1;
	var blks = [];
	var blksSize = nblk * 16;
	var _g = 0;
	while(_g < blksSize) {
		var i1 = _g++;
		blks[i1] = 0;
	}
	var i = 0;
	while(i < str.length) {
		blks[i >> 2] |= HxOverrides.cca(str,i) << (str.length * 8 + i) % 4 * 8;
		i++;
	}
	blks[i >> 2] |= 128 << (str.length * 8 + i) % 4 * 8;
	var l = str.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
};
haxe_crypto_Md5.prototype = {
	bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,addme: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,hex: function(a) {
		var str = "";
		var hex_chr = "0123456789abcdef";
		var _g = 0;
		while(_g < a.length) {
			var num = a[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < 4) {
				var j = _g1++;
				str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
			}
		}
		return str;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(x) {
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = this.addme(a,olda);
			b = this.addme(b,oldb);
			c = this.addme(c,oldc);
			d = this.addme(d,oldd);
			i += 16;
		}
		return [a,b,c,d];
	}
	,__class__: haxe_crypto_Md5
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = true;
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = true;
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,iterator: function() {
		var ret = [];
		this.iteratorLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,iteratorLoop: function(node,acc) {
		if(node != null) {
			this.iteratorLoop(node.left,acc);
			acc.push(node.value);
			this.iteratorLoop(node.right,acc);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = true;
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = true;
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ListSort = function() { };
$hxClasses["haxe.ds.ListSort"] = haxe_ds_ListSort;
haxe_ds_ListSort.__name__ = true;
haxe_ds_ListSort.sortSingleLinked = function(list,cmp) {
	if(list == null) return null;
	var insize = 1;
	var nmerges;
	var psize = 0;
	var qsize = 0;
	var p;
	var q;
	var e;
	var tail;
	while(true) {
		p = list;
		list = null;
		tail = null;
		nmerges = 0;
		while(p != null) {
			nmerges++;
			q = p;
			psize = 0;
			var _g = 0;
			while(_g < insize) {
				var i = _g++;
				psize++;
				q = q.next;
				if(q == null) break;
			}
			qsize = insize;
			while(psize > 0 || qsize > 0 && q != null) {
				if(psize == 0) {
					e = q;
					q = q.next;
					qsize--;
				} else if(qsize == 0 || q == null || cmp(p,q) <= 0) {
					e = p;
					p = p.next;
					psize--;
				} else {
					e = q;
					q = q.next;
					qsize--;
				}
				if(tail != null) tail.next = e; else list = e;
				tail = e;
			}
			p = q;
		}
		tail.next = null;
		if(nmerges <= 1) break;
		insize *= 2;
	}
	return list;
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(srcpos == 0 && len == src.length) this.b.set(src.b,pos); else this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
haxe_io_Error.__empty_constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_macro_Binop = $hxClasses["haxe.macro.Binop"] = { __ename__ : true, __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval","OpArrow"] };
haxe_macro_Binop.OpAdd = ["OpAdd",0];
haxe_macro_Binop.OpAdd.toString = $estr;
haxe_macro_Binop.OpAdd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpMult = ["OpMult",1];
haxe_macro_Binop.OpMult.toString = $estr;
haxe_macro_Binop.OpMult.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpDiv = ["OpDiv",2];
haxe_macro_Binop.OpDiv.toString = $estr;
haxe_macro_Binop.OpDiv.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpSub = ["OpSub",3];
haxe_macro_Binop.OpSub.toString = $estr;
haxe_macro_Binop.OpSub.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAssign = ["OpAssign",4];
haxe_macro_Binop.OpAssign.toString = $estr;
haxe_macro_Binop.OpAssign.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpEq = ["OpEq",5];
haxe_macro_Binop.OpEq.toString = $estr;
haxe_macro_Binop.OpEq.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpNotEq = ["OpNotEq",6];
haxe_macro_Binop.OpNotEq.toString = $estr;
haxe_macro_Binop.OpNotEq.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpGt = ["OpGt",7];
haxe_macro_Binop.OpGt.toString = $estr;
haxe_macro_Binop.OpGt.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpGte = ["OpGte",8];
haxe_macro_Binop.OpGte.toString = $estr;
haxe_macro_Binop.OpGte.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpLt = ["OpLt",9];
haxe_macro_Binop.OpLt.toString = $estr;
haxe_macro_Binop.OpLt.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpLte = ["OpLte",10];
haxe_macro_Binop.OpLte.toString = $estr;
haxe_macro_Binop.OpLte.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAnd = ["OpAnd",11];
haxe_macro_Binop.OpAnd.toString = $estr;
haxe_macro_Binop.OpAnd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpOr = ["OpOr",12];
haxe_macro_Binop.OpOr.toString = $estr;
haxe_macro_Binop.OpOr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpXor = ["OpXor",13];
haxe_macro_Binop.OpXor.toString = $estr;
haxe_macro_Binop.OpXor.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe_macro_Binop.OpBoolAnd.toString = $estr;
haxe_macro_Binop.OpBoolAnd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpBoolOr = ["OpBoolOr",15];
haxe_macro_Binop.OpBoolOr.toString = $estr;
haxe_macro_Binop.OpBoolOr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpShl = ["OpShl",16];
haxe_macro_Binop.OpShl.toString = $estr;
haxe_macro_Binop.OpShl.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpShr = ["OpShr",17];
haxe_macro_Binop.OpShr.toString = $estr;
haxe_macro_Binop.OpShr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpUShr = ["OpUShr",18];
haxe_macro_Binop.OpUShr.toString = $estr;
haxe_macro_Binop.OpUShr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpMod = ["OpMod",19];
haxe_macro_Binop.OpMod.toString = $estr;
haxe_macro_Binop.OpMod.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe_macro_Binop; $x.toString = $estr; return $x; };
haxe_macro_Binop.OpInterval = ["OpInterval",21];
haxe_macro_Binop.OpInterval.toString = $estr;
haxe_macro_Binop.OpInterval.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpArrow = ["OpArrow",22];
haxe_macro_Binop.OpArrow.toString = $estr;
haxe_macro_Binop.OpArrow.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.__empty_constructs__ = [haxe_macro_Binop.OpAdd,haxe_macro_Binop.OpMult,haxe_macro_Binop.OpDiv,haxe_macro_Binop.OpSub,haxe_macro_Binop.OpAssign,haxe_macro_Binop.OpEq,haxe_macro_Binop.OpNotEq,haxe_macro_Binop.OpGt,haxe_macro_Binop.OpGte,haxe_macro_Binop.OpLt,haxe_macro_Binop.OpLte,haxe_macro_Binop.OpAnd,haxe_macro_Binop.OpOr,haxe_macro_Binop.OpXor,haxe_macro_Binop.OpBoolAnd,haxe_macro_Binop.OpBoolOr,haxe_macro_Binop.OpShl,haxe_macro_Binop.OpShr,haxe_macro_Binop.OpUShr,haxe_macro_Binop.OpMod,haxe_macro_Binop.OpInterval,haxe_macro_Binop.OpArrow];
var haxe_macro_Unop = $hxClasses["haxe.macro.Unop"] = { __ename__ : true, __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] };
haxe_macro_Unop.OpIncrement = ["OpIncrement",0];
haxe_macro_Unop.OpIncrement.toString = $estr;
haxe_macro_Unop.OpIncrement.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpDecrement = ["OpDecrement",1];
haxe_macro_Unop.OpDecrement.toString = $estr;
haxe_macro_Unop.OpDecrement.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNot = ["OpNot",2];
haxe_macro_Unop.OpNot.toString = $estr;
haxe_macro_Unop.OpNot.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNeg = ["OpNeg",3];
haxe_macro_Unop.OpNeg.toString = $estr;
haxe_macro_Unop.OpNeg.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNegBits = ["OpNegBits",4];
haxe_macro_Unop.OpNegBits.toString = $estr;
haxe_macro_Unop.OpNegBits.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.__empty_constructs__ = [haxe_macro_Unop.OpIncrement,haxe_macro_Unop.OpDecrement,haxe_macro_Unop.OpNot,haxe_macro_Unop.OpNeg,haxe_macro_Unop.OpNegBits];
var hxd_BitmapData = function() { };
$hxClasses["hxd.BitmapData"] = hxd_BitmapData;
hxd_BitmapData.__name__ = true;
hxd_BitmapData.prototype = {
	__class__: hxd_BitmapData
};
var hxd_EventKind = $hxClasses["hxd.EventKind"] = { __ename__ : true, __constructs__ : ["EPush","ERelease","EMove","EOver","EOut","EWheel","EFocus","EFocusLost","EKeyDown","EKeyUp"] };
hxd_EventKind.EPush = ["EPush",0];
hxd_EventKind.EPush.toString = $estr;
hxd_EventKind.EPush.__enum__ = hxd_EventKind;
hxd_EventKind.ERelease = ["ERelease",1];
hxd_EventKind.ERelease.toString = $estr;
hxd_EventKind.ERelease.__enum__ = hxd_EventKind;
hxd_EventKind.EMove = ["EMove",2];
hxd_EventKind.EMove.toString = $estr;
hxd_EventKind.EMove.__enum__ = hxd_EventKind;
hxd_EventKind.EOver = ["EOver",3];
hxd_EventKind.EOver.toString = $estr;
hxd_EventKind.EOver.__enum__ = hxd_EventKind;
hxd_EventKind.EOut = ["EOut",4];
hxd_EventKind.EOut.toString = $estr;
hxd_EventKind.EOut.__enum__ = hxd_EventKind;
hxd_EventKind.EWheel = ["EWheel",5];
hxd_EventKind.EWheel.toString = $estr;
hxd_EventKind.EWheel.__enum__ = hxd_EventKind;
hxd_EventKind.EFocus = ["EFocus",6];
hxd_EventKind.EFocus.toString = $estr;
hxd_EventKind.EFocus.__enum__ = hxd_EventKind;
hxd_EventKind.EFocusLost = ["EFocusLost",7];
hxd_EventKind.EFocusLost.toString = $estr;
hxd_EventKind.EFocusLost.__enum__ = hxd_EventKind;
hxd_EventKind.EKeyDown = ["EKeyDown",8];
hxd_EventKind.EKeyDown.toString = $estr;
hxd_EventKind.EKeyDown.__enum__ = hxd_EventKind;
hxd_EventKind.EKeyUp = ["EKeyUp",9];
hxd_EventKind.EKeyUp.toString = $estr;
hxd_EventKind.EKeyUp.__enum__ = hxd_EventKind;
hxd_EventKind.__empty_constructs__ = [hxd_EventKind.EPush,hxd_EventKind.ERelease,hxd_EventKind.EMove,hxd_EventKind.EOver,hxd_EventKind.EOut,hxd_EventKind.EWheel,hxd_EventKind.EFocus,hxd_EventKind.EFocusLost,hxd_EventKind.EKeyDown,hxd_EventKind.EKeyUp];
var hxd_Event = function(k,x,y) {
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.button = 0;
	this.kind = k;
	this.relX = x;
	this.relY = y;
};
$hxClasses["hxd.Event"] = hxd_Event;
hxd_Event.__name__ = true;
hxd_Event.prototype = {
	__class__: hxd_Event
};
var hxd_Key = function() { };
$hxClasses["hxd.Key"] = hxd_Key;
hxd_Key.__name__ = true;
hxd_Key.isDown = function(code) {
	return hxd_Key.keyPressed[code] > 0;
};
hxd_Key.initialize = function() {
	if(hxd_Key.initDone) hxd_Key.dispose();
	hxd_Key.initDone = true;
	hxd_Key.keyPressed = [];
	hxd_Stage.getInstance().addEventTarget(hxd_Key.onEvent);
};
hxd_Key.dispose = function() {
	if(hxd_Key.initDone) {
		hxd_Stage.getInstance().removeEventTarget(hxd_Key.onEvent);
		hxd_Key.initDone = false;
		hxd_Key.keyPressed = [];
	}
};
hxd_Key.onEvent = function(e) {
	var _g = e.kind;
	switch(_g[1]) {
	case 8:
		hxd_Key.keyPressed[e.keyCode] = h3d_Engine.CURRENT.frameCount + 1;
		break;
	case 9:
		hxd_Key.keyPressed[e.keyCode] = -(h3d_Engine.CURRENT.frameCount + 1);
		break;
	case 0:
		hxd_Key.keyPressed[e.button] = h3d_Engine.CURRENT.frameCount + 1;
		break;
	case 1:
		hxd_Key.keyPressed[e.button] = -(h3d_Engine.CURRENT.frameCount + 1);
		break;
	default:
	}
};
var hxd_Math = function() { };
$hxClasses["hxd.Math"] = hxd_Math;
hxd_Math.__name__ = true;
hxd_Math.floor = function(f) {
	return Math.floor(f);
};
hxd_Math.round = function(f) {
	return Math.round(f);
};
hxd_Math.max = function(a,b) {
	if(a < b) return b; else return a;
};
hxd_Math.min = function(a,b) {
	if(a > b) return b; else return a;
};
hxd_Math.distanceSq = function(dx,dy,dz) {
	if(dz == null) dz = 0.;
	return dx * dx + dy * dy + dz * dz;
};
var hxd_PixelFormat = $hxClasses["hxd.PixelFormat"] = { __ename__ : true, __constructs__ : ["ARGB","BGRA","RGBA"] };
hxd_PixelFormat.ARGB = ["ARGB",0];
hxd_PixelFormat.ARGB.toString = $estr;
hxd_PixelFormat.ARGB.__enum__ = hxd_PixelFormat;
hxd_PixelFormat.BGRA = ["BGRA",1];
hxd_PixelFormat.BGRA.toString = $estr;
hxd_PixelFormat.BGRA.__enum__ = hxd_PixelFormat;
hxd_PixelFormat.RGBA = ["RGBA",2];
hxd_PixelFormat.RGBA.toString = $estr;
hxd_PixelFormat.RGBA.__enum__ = hxd_PixelFormat;
hxd_PixelFormat.__empty_constructs__ = [hxd_PixelFormat.ARGB,hxd_PixelFormat.BGRA,hxd_PixelFormat.RGBA];
var hxd_Flags = $hxClasses["hxd.Flags"] = { __ename__ : true, __constructs__ : ["ReadOnly","AlphaPremultiplied"] };
hxd_Flags.ReadOnly = ["ReadOnly",0];
hxd_Flags.ReadOnly.toString = $estr;
hxd_Flags.ReadOnly.__enum__ = hxd_Flags;
hxd_Flags.AlphaPremultiplied = ["AlphaPremultiplied",1];
hxd_Flags.AlphaPremultiplied.toString = $estr;
hxd_Flags.AlphaPremultiplied.__enum__ = hxd_Flags;
hxd_Flags.__empty_constructs__ = [hxd_Flags.ReadOnly,hxd_Flags.AlphaPremultiplied];
var hxd_Pixels = function(width,height,bytes,format,offset) {
	if(offset == null) offset = 0;
	this.width = width;
	this.height = height;
	this.bytes = bytes;
	this.format = format;
	this.offset = offset;
};
$hxClasses["hxd.Pixels"] = hxd_Pixels;
hxd_Pixels.__name__ = true;
hxd_Pixels.bytesPerPixel = function(format) {
	switch(format[1]) {
	case 0:case 1:case 2:
		return 4;
	}
};
hxd_Pixels.alloc = function(width,height,format) {
	return new hxd_Pixels(width,height,hxd_impl_Tmp.getBytes(width * height * hxd_Pixels.bytesPerPixel(format)),format);
};
hxd_Pixels.prototype = {
	copyInner: function() {
		var old = this.bytes;
		this.bytes = hxd_impl_Tmp.getBytes(this.width * this.height * 4);
		this.bytes.blit(0,old,this.offset,this.width * this.height * 4);
		this.offset = 0;
		this.flags &= 268435455 - (1 << hxd_Flags.ReadOnly[1]);
	}
	,convert: function(target) {
		if(this.format == target) return;
		if((this.flags & 1 << hxd_Flags.ReadOnly[1]) != 0) this.copyInner();
		{
			var _g = this.format;
			switch(_g[1]) {
			case 1:
				switch(target[1]) {
				case 0:
					var mem = hxd_impl_Memory.select(this.bytes);
					var _g2 = 0;
					var _g1 = this.width * this.height;
					while(_g2 < _g1) {
						var i = _g2++;
						var p = (i << 2) + this.offset;
						var a = hxd_impl_Memory.current.b[p];
						var r = hxd_impl_Memory.current.b[p + 1];
						var g = hxd_impl_Memory.current.b[p + 2];
						var b = hxd_impl_Memory.current.b[p + 3];
						hxd_impl_Memory.current.b[p] = b & 255;
						hxd_impl_Memory.current.b[p + 1] = g & 255;
						hxd_impl_Memory.current.b[p + 2] = r & 255;
						hxd_impl_Memory.current.b[p + 3] = a & 255;
					}
					hxd_impl_Memory.end();
					break;
				case 2:
					var mem1 = hxd_impl_Memory.select(this.bytes);
					var _g21 = 0;
					var _g11 = this.width * this.height;
					while(_g21 < _g11) {
						var i1 = _g21++;
						var p1 = (i1 << 2) + this.offset;
						var b1 = hxd_impl_Memory.current.b[p1];
						var r1 = hxd_impl_Memory.current.b[p1 + 2];
						hxd_impl_Memory.current.b[p1] = r1 & 255;
						hxd_impl_Memory.current.b[p1 + 2] = b1 & 255;
					}
					hxd_impl_Memory.end();
					break;
				default:
					throw new js__$Boot_HaxeError("Cannot convert from " + Std.string(this.format) + " to " + Std.string(target));
				}
				break;
			case 0:
				switch(target[1]) {
				case 1:
					var mem2 = hxd_impl_Memory.select(this.bytes);
					var _g22 = 0;
					var _g12 = this.width * this.height;
					while(_g22 < _g12) {
						var i2 = _g22++;
						var p2 = (i2 << 2) + this.offset;
						var a1 = hxd_impl_Memory.current.b[p2];
						var r2 = hxd_impl_Memory.current.b[p2 + 1];
						var g1 = hxd_impl_Memory.current.b[p2 + 2];
						var b2 = hxd_impl_Memory.current.b[p2 + 3];
						hxd_impl_Memory.current.b[p2] = b2 & 255;
						hxd_impl_Memory.current.b[p2 + 1] = g1 & 255;
						hxd_impl_Memory.current.b[p2 + 2] = r2 & 255;
						hxd_impl_Memory.current.b[p2 + 3] = a1 & 255;
					}
					hxd_impl_Memory.end();
					break;
				case 2:
					var mem3 = hxd_impl_Memory.select(this.bytes);
					var _g23 = 0;
					var _g13 = this.width * this.height;
					while(_g23 < _g13) {
						var i3 = _g23++;
						var p3 = (i3 << 2) + this.offset;
						var a2 = hxd_impl_Memory.current.b[p3];
						hxd_impl_Memory.current.b[p3] = hxd_impl_Memory.current.b[p3 + 1] & 255;
						hxd_impl_Memory.current.b[p3 + 1] = hxd_impl_Memory.current.b[p3 + 2] & 255;
						hxd_impl_Memory.current.b[p3 + 2] = hxd_impl_Memory.current.b[p3 + 3] & 255;
						hxd_impl_Memory.current.b[p3 + 3] = a2 & 255;
					}
					hxd_impl_Memory.end();
					break;
				default:
					throw new js__$Boot_HaxeError("Cannot convert from " + Std.string(this.format) + " to " + Std.string(target));
				}
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot convert from " + Std.string(this.format) + " to " + Std.string(target));
			}
		}
		this.format = target;
	}
	,dispose: function() {
		if(this.bytes != null) {
			if(!((this.flags & 1 << hxd_Flags.ReadOnly[1]) != 0)) hxd_impl_Tmp.saveBytes(this.bytes);
			this.bytes = null;
		}
	}
	,__class__: hxd_Pixels
};
var hxd_Stage = function() {
	this.curMouseY = 0.;
	this.curMouseX = 0.;
	var _g = this;
	this.eventTargets = new List();
	this.resizeEvents = new List();
	this.canvas = hxd_Stage.getCanvas();
	this.canvasPos = this.canvas.getBoundingClientRect();
	window.addEventListener("mousedown",$bind(this,this.onMouseDown));
	window.addEventListener("mousemove",$bind(this,this.onMouseMove));
	window.addEventListener("mouseup",$bind(this,this.onMouseUp));
	window.addEventListener("mousewheel",$bind(this,this.onMouseWheel));
	window.addEventListener("keydown",$bind(this,this.onKeyDown));
	window.addEventListener("keyup",$bind(this,this.onKeyUp));
	this.canvas.addEventListener("mousedown",function(e) {
		_g.onMouseDown(e);
		e.stopPropagation();
		e.preventDefault();
	});
	var curW = this.get_width();
	var curH = this.get_height();
	var t0 = new haxe_Timer(100);
	t0.run = function() {
		_g.canvasPos = _g.canvas.getBoundingClientRect();
		var cw = _g.get_width();
		var ch = _g.get_height();
		if(curW != cw || curH != ch) {
			curW = cw;
			curH = ch;
			_g.onResize(null);
		}
	};
};
$hxClasses["hxd.Stage"] = hxd_Stage;
hxd_Stage.__name__ = true;
hxd_Stage.getCanvas = function() {
	var canvas = window.document.getElementById("webgl");
	if(canvas == null) throw new js__$Boot_HaxeError("Missing canvas#webgl");
	return canvas;
};
hxd_Stage.getInstance = function() {
	if(hxd_Stage.inst == null) hxd_Stage.inst = new hxd_Stage();
	return hxd_Stage.inst;
};
hxd_Stage.prototype = {
	event: function(e) {
		var _g_head = this.eventTargets.h;
		var _g_val = null;
		while(_g_head != null) {
			var et;
			et = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			et(e);
		}
	}
	,addEventTarget: function(et) {
		this.eventTargets.add(et);
	}
	,removeEventTarget: function(et) {
		this.eventTargets.remove(et);
	}
	,addResizeEvent: function(f) {
		this.resizeEvents.push(f);
	}
	,getFrameRate: function() {
		return 60.;
	}
	,onResize: function(e) {
		var _g_head = this.resizeEvents.h;
		var _g_val = null;
		while(_g_head != null) {
			var r;
			r = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			r();
		}
	}
	,setFullScreen: function(v) {
	}
	,get_width: function() {
		return hxd_Math.round(this.canvasPos.width * window.devicePixelRatio);
	}
	,get_height: function() {
		return hxd_Math.round(this.canvasPos.height * window.devicePixelRatio);
	}
	,get_mouseX: function() {
		return hxd_Math.round((this.curMouseX - this.canvasPos.left) * window.devicePixelRatio);
	}
	,get_mouseY: function() {
		return hxd_Math.round((this.curMouseY - this.canvasPos.top) * window.devicePixelRatio);
	}
	,onMouseDown: function(e) {
		this.event(new hxd_Event(hxd_EventKind.EPush,this.get_mouseX(),this.get_mouseY()));
	}
	,onMouseUp: function(e) {
		this.event(new hxd_Event(hxd_EventKind.ERelease,this.get_mouseX(),this.get_mouseY()));
	}
	,onMouseMove: function(e) {
		this.curMouseX = e.clientX;
		this.curMouseY = e.clientY;
		this.event(new hxd_Event(hxd_EventKind.EMove,this.get_mouseX(),this.get_mouseY()));
	}
	,onMouseWheel: function(e) {
		var ev = new hxd_Event(hxd_EventKind.EWheel,this.get_mouseX(),this.get_mouseY());
		ev.wheelDelta = -e.wheelDelta / 30.0;
		this.event(ev);
	}
	,onKeyUp: function(e) {
		var ev = new hxd_Event(hxd_EventKind.EKeyUp,this.get_mouseX(),this.get_mouseY());
		ev.keyCode = e.keyCode;
		ev.charCode = e.charCode;
		this.event(ev);
	}
	,onKeyDown: function(e) {
		var ev = new hxd_Event(hxd_EventKind.EKeyDown,this.get_mouseX(),this.get_mouseY());
		ev.keyCode = e.keyCode;
		ev.charCode = e.charCode;
		this.event(ev);
	}
	,__class__: hxd_Stage
};
var hxd_Cursor = $hxClasses["hxd.Cursor"] = { __ename__ : true, __constructs__ : ["Default","Button","Move","TextInput","Hide","Custom"] };
hxd_Cursor.Default = ["Default",0];
hxd_Cursor.Default.toString = $estr;
hxd_Cursor.Default.__enum__ = hxd_Cursor;
hxd_Cursor.Button = ["Button",1];
hxd_Cursor.Button.toString = $estr;
hxd_Cursor.Button.__enum__ = hxd_Cursor;
hxd_Cursor.Move = ["Move",2];
hxd_Cursor.Move.toString = $estr;
hxd_Cursor.Move.__enum__ = hxd_Cursor;
hxd_Cursor.TextInput = ["TextInput",3];
hxd_Cursor.TextInput.toString = $estr;
hxd_Cursor.TextInput.__enum__ = hxd_Cursor;
hxd_Cursor.Hide = ["Hide",4];
hxd_Cursor.Hide.toString = $estr;
hxd_Cursor.Hide.__enum__ = hxd_Cursor;
hxd_Cursor.Custom = function(frames,speed,offsetX,offsetY) { var $x = ["Custom",5,frames,speed,offsetX,offsetY]; $x.__enum__ = hxd_Cursor; $x.toString = $estr; return $x; };
hxd_Cursor.__empty_constructs__ = [hxd_Cursor.Default,hxd_Cursor.Button,hxd_Cursor.Move,hxd_Cursor.TextInput,hxd_Cursor.Hide];
var hxd_System = function() { };
$hxClasses["hxd.System"] = hxd_System;
hxd_System.__name__ = true;
hxd_System.loopFunc = function() {
	var $window = window;
	var rqf = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
	rqf(hxd_System.loopFunc);
	if(hxd_System.LOOP != null) hxd_System.LOOP();
};
hxd_System.setLoop = function(f) {
	if(!hxd_System.LOOP_INIT) {
		hxd_System.LOOP_INIT = true;
		hxd_System.loopFunc();
	}
	hxd_System.LOOP = f;
};
hxd_System.start = function(callb) {
	callb();
};
hxd_System.setNativeCursor = function(c) {
	var canvas = window.document.getElementById("webgl");
	if(canvas != null) switch(c[1]) {
	case 0:
		canvas.style.cursor = "default";
		break;
	case 1:
		canvas.style.cursor = "pointer";
		break;
	case 2:
		canvas.style.cursor = "move";
		break;
	case 3:
		canvas.style.cursor = "text";
		break;
	case 4:
		canvas.style.cursor = "none";
		break;
	case 5:
		throw new js__$Boot_HaxeError("Custom cursor not supported");
		break;
	}
};
hxd_System.get_isWindowed = function() {
	return true;
};
var hxd_Timer = function() { };
$hxClasses["hxd.Timer"] = hxd_Timer;
hxd_Timer.__name__ = true;
hxd_Timer.update = function() {
	hxd_Timer.frameCount++;
	var newTime = haxe_Timer.stamp();
	hxd_Timer.deltaT = newTime - hxd_Timer.oldTime;
	hxd_Timer.oldTime = newTime;
	if(hxd_Timer.deltaT < hxd_Timer.maxDeltaTime) hxd_Timer.calc_tmod = hxd_Timer.calc_tmod * hxd_Timer.tmod_factor + (1 - hxd_Timer.tmod_factor) * hxd_Timer.deltaT * hxd_Timer.wantedFPS; else hxd_Timer.deltaT = 1 / hxd_Timer.wantedFPS;
	hxd_Timer.tmod = hxd_Timer.calc_tmod;
};
hxd_Timer.skip = function() {
	hxd_Timer.oldTime = haxe_Timer.stamp();
};
var hxd_impl_MemoryReader = function() {
};
$hxClasses["hxd.impl.MemoryReader"] = hxd_impl_MemoryReader;
hxd_impl_MemoryReader.__name__ = true;
hxd_impl_MemoryReader.prototype = {
	__class__: hxd_impl_MemoryReader
};
var hxd_impl_Memory = function() { };
$hxClasses["hxd.impl.Memory"] = hxd_impl_Memory;
hxd_impl_Memory.__name__ = true;
hxd_impl_Memory.select = function(b) {
	if(hxd_impl_Memory.current != null) hxd_impl_Memory.stack.push(hxd_impl_Memory.current);
	hxd_impl_Memory.current = b;
	return hxd_impl_Memory.inst;
};
hxd_impl_Memory.end = function() {
	hxd_impl_Memory.current = hxd_impl_Memory.stack.pop();
};
var hxd_impl_Tmp = function() { };
$hxClasses["hxd.impl.Tmp"] = hxd_impl_Tmp;
hxd_impl_Tmp.__name__ = true;
hxd_impl_Tmp.getBytes = function(size) {
	var found = -1;
	var _g1 = 0;
	var _g = hxd_impl_Tmp.bytes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var b = hxd_impl_Tmp.bytes[i];
		if(b.length >= size) found = i;
	}
	if(found >= 0) {
		var b1 = hxd_impl_Tmp.bytes[found];
		hxd_impl_Tmp.bytes.splice(found,1);
		return b1;
	}
	var sz = 1024;
	while(sz < size) sz = sz * 3 >> 1;
	return haxe_io_Bytes.alloc(sz);
};
hxd_impl_Tmp.saveBytes = function(b) {
	var _g1 = 0;
	var _g = hxd_impl_Tmp.bytes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(hxd_impl_Tmp.bytes[i].length <= b.length) {
			hxd_impl_Tmp.bytes.splice(i,0,b);
			if(hxd_impl_Tmp.bytes.length > 8) hxd_impl_Tmp.bytes.pop();
			return;
		}
	}
	hxd_impl_Tmp.bytes.push(b);
};
var hxsl_Type = $hxClasses["hxsl.Type"] = { __ename__ : true, __constructs__ : ["TVoid","TInt","TBool","TFloat","TString","TVec","TMat3","TMat4","TMat3x4","TBytes","TSampler2D","TSamplerCube","TStruct","TFun","TArray"] };
hxsl_Type.TVoid = ["TVoid",0];
hxsl_Type.TVoid.toString = $estr;
hxsl_Type.TVoid.__enum__ = hxsl_Type;
hxsl_Type.TInt = ["TInt",1];
hxsl_Type.TInt.toString = $estr;
hxsl_Type.TInt.__enum__ = hxsl_Type;
hxsl_Type.TBool = ["TBool",2];
hxsl_Type.TBool.toString = $estr;
hxsl_Type.TBool.__enum__ = hxsl_Type;
hxsl_Type.TFloat = ["TFloat",3];
hxsl_Type.TFloat.toString = $estr;
hxsl_Type.TFloat.__enum__ = hxsl_Type;
hxsl_Type.TString = ["TString",4];
hxsl_Type.TString.toString = $estr;
hxsl_Type.TString.__enum__ = hxsl_Type;
hxsl_Type.TVec = function(size,t) { var $x = ["TVec",5,size,t]; $x.__enum__ = hxsl_Type; $x.toString = $estr; return $x; };
hxsl_Type.TMat3 = ["TMat3",6];
hxsl_Type.TMat3.toString = $estr;
hxsl_Type.TMat3.__enum__ = hxsl_Type;
hxsl_Type.TMat4 = ["TMat4",7];
hxsl_Type.TMat4.toString = $estr;
hxsl_Type.TMat4.__enum__ = hxsl_Type;
hxsl_Type.TMat3x4 = ["TMat3x4",8];
hxsl_Type.TMat3x4.toString = $estr;
hxsl_Type.TMat3x4.__enum__ = hxsl_Type;
hxsl_Type.TBytes = function(size) { var $x = ["TBytes",9,size]; $x.__enum__ = hxsl_Type; $x.toString = $estr; return $x; };
hxsl_Type.TSampler2D = ["TSampler2D",10];
hxsl_Type.TSampler2D.toString = $estr;
hxsl_Type.TSampler2D.__enum__ = hxsl_Type;
hxsl_Type.TSamplerCube = ["TSamplerCube",11];
hxsl_Type.TSamplerCube.toString = $estr;
hxsl_Type.TSamplerCube.__enum__ = hxsl_Type;
hxsl_Type.TStruct = function(vl) { var $x = ["TStruct",12,vl]; $x.__enum__ = hxsl_Type; $x.toString = $estr; return $x; };
hxsl_Type.TFun = function(variants) { var $x = ["TFun",13,variants]; $x.__enum__ = hxsl_Type; $x.toString = $estr; return $x; };
hxsl_Type.TArray = function(t,size) { var $x = ["TArray",14,t,size]; $x.__enum__ = hxsl_Type; $x.toString = $estr; return $x; };
hxsl_Type.__empty_constructs__ = [hxsl_Type.TVoid,hxsl_Type.TInt,hxsl_Type.TBool,hxsl_Type.TFloat,hxsl_Type.TString,hxsl_Type.TMat3,hxsl_Type.TMat4,hxsl_Type.TMat3x4,hxsl_Type.TSampler2D,hxsl_Type.TSamplerCube];
var hxsl_VecType = $hxClasses["hxsl.VecType"] = { __ename__ : true, __constructs__ : ["VInt","VFloat","VBool"] };
hxsl_VecType.VInt = ["VInt",0];
hxsl_VecType.VInt.toString = $estr;
hxsl_VecType.VInt.__enum__ = hxsl_VecType;
hxsl_VecType.VFloat = ["VFloat",1];
hxsl_VecType.VFloat.toString = $estr;
hxsl_VecType.VFloat.__enum__ = hxsl_VecType;
hxsl_VecType.VBool = ["VBool",2];
hxsl_VecType.VBool.toString = $estr;
hxsl_VecType.VBool.__enum__ = hxsl_VecType;
hxsl_VecType.__empty_constructs__ = [hxsl_VecType.VInt,hxsl_VecType.VFloat,hxsl_VecType.VBool];
var hxsl_SizeDecl = $hxClasses["hxsl.SizeDecl"] = { __ename__ : true, __constructs__ : ["SConst","SVar"] };
hxsl_SizeDecl.SConst = function(v) { var $x = ["SConst",0,v]; $x.__enum__ = hxsl_SizeDecl; $x.toString = $estr; return $x; };
hxsl_SizeDecl.SVar = function(v) { var $x = ["SVar",1,v]; $x.__enum__ = hxsl_SizeDecl; $x.toString = $estr; return $x; };
hxsl_SizeDecl.__empty_constructs__ = [];
var hxsl_Error = function(msg,pos) {
	this.msg = msg;
	this.pos = pos;
};
$hxClasses["hxsl.Error"] = hxsl_Error;
hxsl_Error.__name__ = true;
hxsl_Error.t = function(msg,pos) {
	throw new js__$Boot_HaxeError(new hxsl_Error(msg,pos));
	return null;
};
hxsl_Error.prototype = {
	toString: function() {
		return "Error(" + this.msg + ")@" + Std.string(this.pos);
	}
	,__class__: hxsl_Error
};
var hxsl_VarKind = $hxClasses["hxsl.VarKind"] = { __ename__ : true, __constructs__ : ["Global","Input","Param","Var","Local","Output","Function"] };
hxsl_VarKind.Global = ["Global",0];
hxsl_VarKind.Global.toString = $estr;
hxsl_VarKind.Global.__enum__ = hxsl_VarKind;
hxsl_VarKind.Input = ["Input",1];
hxsl_VarKind.Input.toString = $estr;
hxsl_VarKind.Input.__enum__ = hxsl_VarKind;
hxsl_VarKind.Param = ["Param",2];
hxsl_VarKind.Param.toString = $estr;
hxsl_VarKind.Param.__enum__ = hxsl_VarKind;
hxsl_VarKind.Var = ["Var",3];
hxsl_VarKind.Var.toString = $estr;
hxsl_VarKind.Var.__enum__ = hxsl_VarKind;
hxsl_VarKind.Local = ["Local",4];
hxsl_VarKind.Local.toString = $estr;
hxsl_VarKind.Local.__enum__ = hxsl_VarKind;
hxsl_VarKind.Output = ["Output",5];
hxsl_VarKind.Output.toString = $estr;
hxsl_VarKind.Output.__enum__ = hxsl_VarKind;
hxsl_VarKind.Function = ["Function",6];
hxsl_VarKind.Function.toString = $estr;
hxsl_VarKind.Function.__enum__ = hxsl_VarKind;
hxsl_VarKind.__empty_constructs__ = [hxsl_VarKind.Global,hxsl_VarKind.Input,hxsl_VarKind.Param,hxsl_VarKind.Var,hxsl_VarKind.Local,hxsl_VarKind.Output,hxsl_VarKind.Function];
var hxsl_VarQualifier = $hxClasses["hxsl.VarQualifier"] = { __ename__ : true, __constructs__ : ["Const","Private","Nullable","PerObject","Name","Shared","Precision"] };
hxsl_VarQualifier.Const = function(max) { var $x = ["Const",0,max]; $x.__enum__ = hxsl_VarQualifier; $x.toString = $estr; return $x; };
hxsl_VarQualifier.Private = ["Private",1];
hxsl_VarQualifier.Private.toString = $estr;
hxsl_VarQualifier.Private.__enum__ = hxsl_VarQualifier;
hxsl_VarQualifier.Nullable = ["Nullable",2];
hxsl_VarQualifier.Nullable.toString = $estr;
hxsl_VarQualifier.Nullable.__enum__ = hxsl_VarQualifier;
hxsl_VarQualifier.PerObject = ["PerObject",3];
hxsl_VarQualifier.PerObject.toString = $estr;
hxsl_VarQualifier.PerObject.__enum__ = hxsl_VarQualifier;
hxsl_VarQualifier.Name = function(n) { var $x = ["Name",4,n]; $x.__enum__ = hxsl_VarQualifier; $x.toString = $estr; return $x; };
hxsl_VarQualifier.Shared = ["Shared",5];
hxsl_VarQualifier.Shared.toString = $estr;
hxsl_VarQualifier.Shared.__enum__ = hxsl_VarQualifier;
hxsl_VarQualifier.Precision = function(p) { var $x = ["Precision",6,p]; $x.__enum__ = hxsl_VarQualifier; $x.toString = $estr; return $x; };
hxsl_VarQualifier.__empty_constructs__ = [hxsl_VarQualifier.Private,hxsl_VarQualifier.Nullable,hxsl_VarQualifier.PerObject,hxsl_VarQualifier.Shared];
var hxsl_Prec = $hxClasses["hxsl.Prec"] = { __ename__ : true, __constructs__ : ["Low","Medium","High"] };
hxsl_Prec.Low = ["Low",0];
hxsl_Prec.Low.toString = $estr;
hxsl_Prec.Low.__enum__ = hxsl_Prec;
hxsl_Prec.Medium = ["Medium",1];
hxsl_Prec.Medium.toString = $estr;
hxsl_Prec.Medium.__enum__ = hxsl_Prec;
hxsl_Prec.High = ["High",2];
hxsl_Prec.High.toString = $estr;
hxsl_Prec.High.__enum__ = hxsl_Prec;
hxsl_Prec.__empty_constructs__ = [hxsl_Prec.Low,hxsl_Prec.Medium,hxsl_Prec.High];
var hxsl_Const = $hxClasses["hxsl.Const"] = { __ename__ : true, __constructs__ : ["CNull","CBool","CInt","CFloat","CString"] };
hxsl_Const.CNull = ["CNull",0];
hxsl_Const.CNull.toString = $estr;
hxsl_Const.CNull.__enum__ = hxsl_Const;
hxsl_Const.CBool = function(b) { var $x = ["CBool",1,b]; $x.__enum__ = hxsl_Const; $x.toString = $estr; return $x; };
hxsl_Const.CInt = function(v) { var $x = ["CInt",2,v]; $x.__enum__ = hxsl_Const; $x.toString = $estr; return $x; };
hxsl_Const.CFloat = function(v) { var $x = ["CFloat",3,v]; $x.__enum__ = hxsl_Const; $x.toString = $estr; return $x; };
hxsl_Const.CString = function(v) { var $x = ["CString",4,v]; $x.__enum__ = hxsl_Const; $x.toString = $estr; return $x; };
hxsl_Const.__empty_constructs__ = [hxsl_Const.CNull];
var hxsl_FunctionKind = $hxClasses["hxsl.FunctionKind"] = { __ename__ : true, __constructs__ : ["Vertex","Fragment","Init","Helper"] };
hxsl_FunctionKind.Vertex = ["Vertex",0];
hxsl_FunctionKind.Vertex.toString = $estr;
hxsl_FunctionKind.Vertex.__enum__ = hxsl_FunctionKind;
hxsl_FunctionKind.Fragment = ["Fragment",1];
hxsl_FunctionKind.Fragment.toString = $estr;
hxsl_FunctionKind.Fragment.__enum__ = hxsl_FunctionKind;
hxsl_FunctionKind.Init = ["Init",2];
hxsl_FunctionKind.Init.toString = $estr;
hxsl_FunctionKind.Init.__enum__ = hxsl_FunctionKind;
hxsl_FunctionKind.Helper = ["Helper",3];
hxsl_FunctionKind.Helper.toString = $estr;
hxsl_FunctionKind.Helper.__enum__ = hxsl_FunctionKind;
hxsl_FunctionKind.__empty_constructs__ = [hxsl_FunctionKind.Vertex,hxsl_FunctionKind.Fragment,hxsl_FunctionKind.Init,hxsl_FunctionKind.Helper];
var hxsl_TGlobal = $hxClasses["hxsl.TGlobal"] = { __ename__ : true, __constructs__ : ["Radians","Degrees","Sin","Cos","Tan","Asin","Acos","Atan","Pow","Exp","Log","Exp2","Log2","Sqrt","Inversesqrt","Abs","Sign","Floor","Ceil","Fract","Mod","Min","Max","Clamp","Mix","Step","SmoothStep","Length","Distance","Dot","Cross","Normalize","LReflect","Texture2D","TextureCube","ToInt","ToFloat","ToBool","Vec2","Vec3","Vec4","IVec2","IVec3","IVec4","BVec2","BVec3","BVec4","Mat2","Mat3","Mat4","Mat3x4","Saturate","Pack","Unpack","PackNormal","UnpackNormal","DFdx","DFdy","Fwidth"] };
hxsl_TGlobal.Radians = ["Radians",0];
hxsl_TGlobal.Radians.toString = $estr;
hxsl_TGlobal.Radians.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Degrees = ["Degrees",1];
hxsl_TGlobal.Degrees.toString = $estr;
hxsl_TGlobal.Degrees.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Sin = ["Sin",2];
hxsl_TGlobal.Sin.toString = $estr;
hxsl_TGlobal.Sin.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Cos = ["Cos",3];
hxsl_TGlobal.Cos.toString = $estr;
hxsl_TGlobal.Cos.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Tan = ["Tan",4];
hxsl_TGlobal.Tan.toString = $estr;
hxsl_TGlobal.Tan.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Asin = ["Asin",5];
hxsl_TGlobal.Asin.toString = $estr;
hxsl_TGlobal.Asin.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Acos = ["Acos",6];
hxsl_TGlobal.Acos.toString = $estr;
hxsl_TGlobal.Acos.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Atan = ["Atan",7];
hxsl_TGlobal.Atan.toString = $estr;
hxsl_TGlobal.Atan.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Pow = ["Pow",8];
hxsl_TGlobal.Pow.toString = $estr;
hxsl_TGlobal.Pow.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Exp = ["Exp",9];
hxsl_TGlobal.Exp.toString = $estr;
hxsl_TGlobal.Exp.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Log = ["Log",10];
hxsl_TGlobal.Log.toString = $estr;
hxsl_TGlobal.Log.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Exp2 = ["Exp2",11];
hxsl_TGlobal.Exp2.toString = $estr;
hxsl_TGlobal.Exp2.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Log2 = ["Log2",12];
hxsl_TGlobal.Log2.toString = $estr;
hxsl_TGlobal.Log2.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Sqrt = ["Sqrt",13];
hxsl_TGlobal.Sqrt.toString = $estr;
hxsl_TGlobal.Sqrt.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Inversesqrt = ["Inversesqrt",14];
hxsl_TGlobal.Inversesqrt.toString = $estr;
hxsl_TGlobal.Inversesqrt.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Abs = ["Abs",15];
hxsl_TGlobal.Abs.toString = $estr;
hxsl_TGlobal.Abs.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Sign = ["Sign",16];
hxsl_TGlobal.Sign.toString = $estr;
hxsl_TGlobal.Sign.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Floor = ["Floor",17];
hxsl_TGlobal.Floor.toString = $estr;
hxsl_TGlobal.Floor.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Ceil = ["Ceil",18];
hxsl_TGlobal.Ceil.toString = $estr;
hxsl_TGlobal.Ceil.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Fract = ["Fract",19];
hxsl_TGlobal.Fract.toString = $estr;
hxsl_TGlobal.Fract.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Mod = ["Mod",20];
hxsl_TGlobal.Mod.toString = $estr;
hxsl_TGlobal.Mod.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Min = ["Min",21];
hxsl_TGlobal.Min.toString = $estr;
hxsl_TGlobal.Min.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Max = ["Max",22];
hxsl_TGlobal.Max.toString = $estr;
hxsl_TGlobal.Max.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Clamp = ["Clamp",23];
hxsl_TGlobal.Clamp.toString = $estr;
hxsl_TGlobal.Clamp.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Mix = ["Mix",24];
hxsl_TGlobal.Mix.toString = $estr;
hxsl_TGlobal.Mix.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Step = ["Step",25];
hxsl_TGlobal.Step.toString = $estr;
hxsl_TGlobal.Step.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.SmoothStep = ["SmoothStep",26];
hxsl_TGlobal.SmoothStep.toString = $estr;
hxsl_TGlobal.SmoothStep.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Length = ["Length",27];
hxsl_TGlobal.Length.toString = $estr;
hxsl_TGlobal.Length.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Distance = ["Distance",28];
hxsl_TGlobal.Distance.toString = $estr;
hxsl_TGlobal.Distance.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Dot = ["Dot",29];
hxsl_TGlobal.Dot.toString = $estr;
hxsl_TGlobal.Dot.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Cross = ["Cross",30];
hxsl_TGlobal.Cross.toString = $estr;
hxsl_TGlobal.Cross.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Normalize = ["Normalize",31];
hxsl_TGlobal.Normalize.toString = $estr;
hxsl_TGlobal.Normalize.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.LReflect = ["LReflect",32];
hxsl_TGlobal.LReflect.toString = $estr;
hxsl_TGlobal.LReflect.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Texture2D = ["Texture2D",33];
hxsl_TGlobal.Texture2D.toString = $estr;
hxsl_TGlobal.Texture2D.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.TextureCube = ["TextureCube",34];
hxsl_TGlobal.TextureCube.toString = $estr;
hxsl_TGlobal.TextureCube.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.ToInt = ["ToInt",35];
hxsl_TGlobal.ToInt.toString = $estr;
hxsl_TGlobal.ToInt.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.ToFloat = ["ToFloat",36];
hxsl_TGlobal.ToFloat.toString = $estr;
hxsl_TGlobal.ToFloat.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.ToBool = ["ToBool",37];
hxsl_TGlobal.ToBool.toString = $estr;
hxsl_TGlobal.ToBool.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Vec2 = ["Vec2",38];
hxsl_TGlobal.Vec2.toString = $estr;
hxsl_TGlobal.Vec2.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Vec3 = ["Vec3",39];
hxsl_TGlobal.Vec3.toString = $estr;
hxsl_TGlobal.Vec3.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Vec4 = ["Vec4",40];
hxsl_TGlobal.Vec4.toString = $estr;
hxsl_TGlobal.Vec4.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.IVec2 = ["IVec2",41];
hxsl_TGlobal.IVec2.toString = $estr;
hxsl_TGlobal.IVec2.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.IVec3 = ["IVec3",42];
hxsl_TGlobal.IVec3.toString = $estr;
hxsl_TGlobal.IVec3.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.IVec4 = ["IVec4",43];
hxsl_TGlobal.IVec4.toString = $estr;
hxsl_TGlobal.IVec4.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.BVec2 = ["BVec2",44];
hxsl_TGlobal.BVec2.toString = $estr;
hxsl_TGlobal.BVec2.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.BVec3 = ["BVec3",45];
hxsl_TGlobal.BVec3.toString = $estr;
hxsl_TGlobal.BVec3.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.BVec4 = ["BVec4",46];
hxsl_TGlobal.BVec4.toString = $estr;
hxsl_TGlobal.BVec4.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Mat2 = ["Mat2",47];
hxsl_TGlobal.Mat2.toString = $estr;
hxsl_TGlobal.Mat2.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Mat3 = ["Mat3",48];
hxsl_TGlobal.Mat3.toString = $estr;
hxsl_TGlobal.Mat3.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Mat4 = ["Mat4",49];
hxsl_TGlobal.Mat4.toString = $estr;
hxsl_TGlobal.Mat4.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Mat3x4 = ["Mat3x4",50];
hxsl_TGlobal.Mat3x4.toString = $estr;
hxsl_TGlobal.Mat3x4.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Saturate = ["Saturate",51];
hxsl_TGlobal.Saturate.toString = $estr;
hxsl_TGlobal.Saturate.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Pack = ["Pack",52];
hxsl_TGlobal.Pack.toString = $estr;
hxsl_TGlobal.Pack.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Unpack = ["Unpack",53];
hxsl_TGlobal.Unpack.toString = $estr;
hxsl_TGlobal.Unpack.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.PackNormal = ["PackNormal",54];
hxsl_TGlobal.PackNormal.toString = $estr;
hxsl_TGlobal.PackNormal.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.UnpackNormal = ["UnpackNormal",55];
hxsl_TGlobal.UnpackNormal.toString = $estr;
hxsl_TGlobal.UnpackNormal.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.DFdx = ["DFdx",56];
hxsl_TGlobal.DFdx.toString = $estr;
hxsl_TGlobal.DFdx.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.DFdy = ["DFdy",57];
hxsl_TGlobal.DFdy.toString = $estr;
hxsl_TGlobal.DFdy.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.Fwidth = ["Fwidth",58];
hxsl_TGlobal.Fwidth.toString = $estr;
hxsl_TGlobal.Fwidth.__enum__ = hxsl_TGlobal;
hxsl_TGlobal.__empty_constructs__ = [hxsl_TGlobal.Radians,hxsl_TGlobal.Degrees,hxsl_TGlobal.Sin,hxsl_TGlobal.Cos,hxsl_TGlobal.Tan,hxsl_TGlobal.Asin,hxsl_TGlobal.Acos,hxsl_TGlobal.Atan,hxsl_TGlobal.Pow,hxsl_TGlobal.Exp,hxsl_TGlobal.Log,hxsl_TGlobal.Exp2,hxsl_TGlobal.Log2,hxsl_TGlobal.Sqrt,hxsl_TGlobal.Inversesqrt,hxsl_TGlobal.Abs,hxsl_TGlobal.Sign,hxsl_TGlobal.Floor,hxsl_TGlobal.Ceil,hxsl_TGlobal.Fract,hxsl_TGlobal.Mod,hxsl_TGlobal.Min,hxsl_TGlobal.Max,hxsl_TGlobal.Clamp,hxsl_TGlobal.Mix,hxsl_TGlobal.Step,hxsl_TGlobal.SmoothStep,hxsl_TGlobal.Length,hxsl_TGlobal.Distance,hxsl_TGlobal.Dot,hxsl_TGlobal.Cross,hxsl_TGlobal.Normalize,hxsl_TGlobal.LReflect,hxsl_TGlobal.Texture2D,hxsl_TGlobal.TextureCube,hxsl_TGlobal.ToInt,hxsl_TGlobal.ToFloat,hxsl_TGlobal.ToBool,hxsl_TGlobal.Vec2,hxsl_TGlobal.Vec3,hxsl_TGlobal.Vec4,hxsl_TGlobal.IVec2,hxsl_TGlobal.IVec3,hxsl_TGlobal.IVec4,hxsl_TGlobal.BVec2,hxsl_TGlobal.BVec3,hxsl_TGlobal.BVec4,hxsl_TGlobal.Mat2,hxsl_TGlobal.Mat3,hxsl_TGlobal.Mat4,hxsl_TGlobal.Mat3x4,hxsl_TGlobal.Saturate,hxsl_TGlobal.Pack,hxsl_TGlobal.Unpack,hxsl_TGlobal.PackNormal,hxsl_TGlobal.UnpackNormal,hxsl_TGlobal.DFdx,hxsl_TGlobal.DFdy,hxsl_TGlobal.Fwidth];
var hxsl_Component = $hxClasses["hxsl.Component"] = { __ename__ : true, __constructs__ : ["X","Y","Z","W"] };
hxsl_Component.X = ["X",0];
hxsl_Component.X.toString = $estr;
hxsl_Component.X.__enum__ = hxsl_Component;
hxsl_Component.Y = ["Y",1];
hxsl_Component.Y.toString = $estr;
hxsl_Component.Y.__enum__ = hxsl_Component;
hxsl_Component.Z = ["Z",2];
hxsl_Component.Z.toString = $estr;
hxsl_Component.Z.__enum__ = hxsl_Component;
hxsl_Component.W = ["W",3];
hxsl_Component.W.toString = $estr;
hxsl_Component.W.__enum__ = hxsl_Component;
hxsl_Component.__empty_constructs__ = [hxsl_Component.X,hxsl_Component.Y,hxsl_Component.Z,hxsl_Component.W];
var hxsl_TExprDef = $hxClasses["hxsl.TExprDef"] = { __ename__ : true, __constructs__ : ["TConst","TVar","TGlobal","TParenthesis","TBlock","TBinop","TUnop","TVarDecl","TCall","TSwiz","TIf","TDiscard","TReturn","TFor","TContinue","TBreak","TArray","TArrayDecl"] };
hxsl_TExprDef.TConst = function(c) { var $x = ["TConst",0,c]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TVar = function(v) { var $x = ["TVar",1,v]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TGlobal = function(g) { var $x = ["TGlobal",2,g]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TParenthesis = function(e) { var $x = ["TParenthesis",3,e]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TBlock = function(el) { var $x = ["TBlock",4,el]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TBinop = function(op,e1,e2) { var $x = ["TBinop",5,op,e1,e2]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TUnop = function(op,e1) { var $x = ["TUnop",6,op,e1]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TVarDecl = function(v,init) { var $x = ["TVarDecl",7,v,init]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TCall = function(e,args) { var $x = ["TCall",8,e,args]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TSwiz = function(e,regs) { var $x = ["TSwiz",9,e,regs]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TIf = function(econd,eif,eelse) { var $x = ["TIf",10,econd,eif,eelse]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TDiscard = ["TDiscard",11];
hxsl_TExprDef.TDiscard.toString = $estr;
hxsl_TExprDef.TDiscard.__enum__ = hxsl_TExprDef;
hxsl_TExprDef.TReturn = function(e) { var $x = ["TReturn",12,e]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TFor = function(v,it,loop) { var $x = ["TFor",13,v,it,loop]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TContinue = ["TContinue",14];
hxsl_TExprDef.TContinue.toString = $estr;
hxsl_TExprDef.TContinue.__enum__ = hxsl_TExprDef;
hxsl_TExprDef.TBreak = ["TBreak",15];
hxsl_TExprDef.TBreak.toString = $estr;
hxsl_TExprDef.TBreak.__enum__ = hxsl_TExprDef;
hxsl_TExprDef.TArray = function(e,index) { var $x = ["TArray",16,e,index]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.TArrayDecl = function(el) { var $x = ["TArrayDecl",17,el]; $x.__enum__ = hxsl_TExprDef; $x.toString = $estr; return $x; };
hxsl_TExprDef.__empty_constructs__ = [hxsl_TExprDef.TDiscard,hxsl_TExprDef.TContinue,hxsl_TExprDef.TBreak];
var hxsl_Tools = function() { };
$hxClasses["hxsl.Tools"] = hxsl_Tools;
hxsl_Tools.__name__ = true;
hxsl_Tools.allocVarId = function() {
	return ++hxsl_Tools.UID;
};
hxsl_Tools.getName = function(v) {
	if(v.qualifiers == null) return v.name;
	var _g = 0;
	var _g1 = v.qualifiers;
	while(_g < _g1.length) {
		var q = _g1[_g];
		++_g;
		switch(q[1]) {
		case 4:
			var n = q[2];
			return n;
		default:
		}
	}
	return v.name;
};
hxsl_Tools.getConstBits = function(v) {
	var _g = v.type;
	switch(_g[1]) {
	case 2:
		return 1;
	case 1:
		var _g1 = 0;
		var _g2 = v.qualifiers;
		while(_g1 < _g2.length) {
			var q = _g2[_g1];
			++_g1;
			switch(q[1]) {
			case 0:
				var n = q[2];
				if(n != null) {
					var bits = 0;
					while(n >= 1 << bits) bits++;
					return bits;
				}
				return 8;
			default:
			}
		}
		break;
	default:
	}
	return 0;
};
hxsl_Tools.isConst = function(v) {
	if(v.qualifiers != null) {
		var _g = 0;
		var _g1 = v.qualifiers;
		while(_g < _g1.length) {
			var q = _g1[_g];
			++_g;
			switch(q[1]) {
			case 0:
				return true;
			default:
			}
		}
	}
	return false;
};
hxsl_Tools.hasQualifier = function(v,q) {
	if(v.qualifiers != null) {
		var _g = 0;
		var _g1 = v.qualifiers;
		while(_g < _g1.length) {
			var q2 = _g1[_g];
			++_g;
			if(q2 == q) return true;
		}
	}
	return false;
};
hxsl_Tools.toString = function(t) {
	switch(t[1]) {
	case 5:
		var t1 = t[3];
		var size = t[2];
		var prefix;
		switch(t1[1]) {
		case 1:
			prefix = "";
			break;
		case 0:
			prefix = "I";
			break;
		case 2:
			prefix = "B";
			break;
		}
		return prefix + "Vec" + size;
	case 12:
		var vl = t[2];
		return "{" + ((function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				while(_g1 < vl.length) {
					var v = vl[_g1];
					++_g1;
					_g.push(v.name + " : " + hxsl_Tools.toString(v.type));
				}
			}
			$r = _g;
			return $r;
		}(this))).join(",") + "}";
	case 14:
		var s = t[3];
		var t2 = t[2];
		return hxsl_Tools.toString(t2) + "[" + (function($this) {
			var $r;
			switch(s[1]) {
			case 0:
				$r = (function($this) {
					var $r;
					var i = s[2];
					$r = "" + i;
					return $r;
				}($this));
				break;
			case 1:
				$r = (function($this) {
					var $r;
					var v1 = s[2];
					$r = v1.name;
					return $r;
				}($this));
				break;
			}
			return $r;
		}(this)) + "]";
	default:
		return HxOverrides.substr(t[0],1,null);
	}
};
hxsl_Tools.iter = function(e,f) {
	{
		var _g = e.e;
		switch(_g[1]) {
		case 3:
			var e1 = _g[2];
			f(e1);
			break;
		case 4:
			var el = _g[2];
			var _g1 = 0;
			while(_g1 < el.length) {
				var e2 = el[_g1];
				++_g1;
				f(e2);
			}
			break;
		case 5:
			var e21 = _g[4];
			var e11 = _g[3];
			f(e11);
			f(e21);
			break;
		case 6:
			var e12 = _g[3];
			f(e12);
			break;
		case 7:
			var init = _g[3];
			if(init != null) f(init);
			break;
		case 8:
			var args = _g[3];
			var e3 = _g[2];
			f(e3);
			var _g11 = 0;
			while(_g11 < args.length) {
				var a = args[_g11];
				++_g11;
				f(a);
			}
			break;
		case 9:
			var e4 = _g[2];
			f(e4);
			break;
		case 10:
			var eelse = _g[4];
			var eif = _g[3];
			var econd = _g[2];
			f(econd);
			f(eif);
			if(eelse != null) f(eelse);
			break;
		case 12:
			var e5 = _g[2];
			if(e5 != null) f(e5);
			break;
		case 13:
			var loop = _g[4];
			var it = _g[3];
			f(it);
			f(loop);
			break;
		case 16:
			var index = _g[3];
			var e6 = _g[2];
			f(e6);
			f(index);
			break;
		case 17:
			var el1 = _g[2];
			var _g12 = 0;
			while(_g12 < el1.length) {
				var e7 = el1[_g12];
				++_g12;
				f(e7);
			}
			break;
		case 0:case 1:case 2:case 11:case 14:case 15:
			break;
		}
	}
};
hxsl_Tools.map = function(e,f) {
	var ed;
	{
		var _g = e.e;
		switch(_g[1]) {
		case 3:
			var e1 = _g[2];
			ed = hxsl_TExprDef.TParenthesis(f(e1));
			break;
		case 4:
			var el = _g[2];
			ed = hxsl_TExprDef.TBlock((function($this) {
				var $r;
				var _g1 = [];
				{
					var _g2 = 0;
					while(_g2 < el.length) {
						var e2 = el[_g2];
						++_g2;
						_g1.push(f(e2));
					}
				}
				$r = _g1;
				return $r;
			}(this)));
			break;
		case 5:
			var e21 = _g[4];
			var e11 = _g[3];
			var op = _g[2];
			ed = hxsl_TExprDef.TBinop(op,f(e11),f(e21));
			break;
		case 6:
			var e12 = _g[3];
			var op1 = _g[2];
			ed = hxsl_TExprDef.TUnop(op1,f(e12));
			break;
		case 7:
			var init = _g[3];
			var v = _g[2];
			ed = hxsl_TExprDef.TVarDecl(v,init != null?f(init):null);
			break;
		case 8:
			var args = _g[3];
			var e3 = _g[2];
			ed = hxsl_TExprDef.TCall(f(e3),(function($this) {
				var $r;
				var _g11 = [];
				{
					var _g21 = 0;
					while(_g21 < args.length) {
						var a = args[_g21];
						++_g21;
						_g11.push(f(a));
					}
				}
				$r = _g11;
				return $r;
			}(this)));
			break;
		case 9:
			var c = _g[3];
			var e4 = _g[2];
			ed = hxsl_TExprDef.TSwiz(f(e4),c);
			break;
		case 10:
			var eelse = _g[4];
			var eif = _g[3];
			var econd = _g[2];
			ed = hxsl_TExprDef.TIf(f(econd),f(eif),eelse != null?f(eelse):null);
			break;
		case 12:
			var e5 = _g[2];
			ed = hxsl_TExprDef.TReturn(e5 != null?f(e5):null);
			break;
		case 13:
			var loop = _g[4];
			var it = _g[3];
			var v1 = _g[2];
			ed = hxsl_TExprDef.TFor(v1,f(it),f(loop));
			break;
		case 16:
			var index = _g[3];
			var e6 = _g[2];
			ed = hxsl_TExprDef.TArray(f(e6),f(index));
			break;
		case 17:
			var el1 = _g[2];
			ed = hxsl_TExprDef.TArrayDecl((function($this) {
				var $r;
				var _g12 = [];
				{
					var _g22 = 0;
					while(_g22 < el1.length) {
						var e7 = el1[_g22];
						++_g22;
						_g12.push(f(e7));
					}
				}
				$r = _g12;
				return $r;
			}(this)));
			break;
		case 0:case 1:case 2:case 11:case 14:case 15:
			ed = e.e;
			break;
		}
	}
	return { e : ed, t : e.t, p : e.p};
};
var hxsl_Tools2 = function() { };
$hxClasses["hxsl.Tools2"] = hxsl_Tools2;
hxsl_Tools2.__name__ = true;
hxsl_Tools2.toString = function(g) {
	var n = g[0];
	return n.charAt(0).toLowerCase() + HxOverrides.substr(n,1,null);
};
var hxsl_SearchMap = function() {
};
$hxClasses["hxsl.SearchMap"] = hxsl_SearchMap;
hxsl_SearchMap.__name__ = true;
hxsl_SearchMap.prototype = {
	__class__: hxsl_SearchMap
};
var hxsl_Cache = function() {
	this.constsToGlobal = false;
	this.linkCache = new haxe_ds_IntMap();
	this.outVarsMap = new haxe_ds_StringMap();
	this.outVars = [];
	this.byID = new haxe_ds_StringMap();
};
$hxClasses["hxsl.Cache"] = hxsl_Cache;
hxsl_Cache.__name__ = true;
hxsl_Cache.get = function() {
	var c = hxsl_Cache.INST;
	if(c == null) hxsl_Cache.INST = c = new hxsl_Cache();
	return c;
};
hxsl_Cache.prototype = {
	allocOutputVars: function(vars) {
		var key = vars.join(",");
		var id = this.outVarsMap.get(key);
		if(id != null) return id;
		vars = vars.slice();
		vars.sort(Reflect.compare);
		var key1 = vars.join(",");
		id = this.outVarsMap.get(key1);
		if(id != null) {
			this.outVarsMap.set(key,id);
			return id;
		}
		id = this.outVars.length;
		this.outVars.push(vars);
		this.outVarsMap.set(key,id);
		return id;
	}
	,link: function(shaders,outVars) {
		var c = this.linkCache.h[outVars];
		if(c == null) {
			c = new hxsl_SearchMap();
			this.linkCache.h[outVars] = c;
		}
		var _g = new hxsl__$ShaderList_ShaderIterator(shaders);
		while(_g.l != null) {
			var s = _g.next();
			var i = s.instance;
			if(c.next == null) c.next = new haxe_ds_IntMap();
			var cs = c.next.h[i.id];
			if(cs == null) {
				cs = new hxsl_SearchMap();
				c.next.h[i.id] = cs;
			}
			c = cs;
		}
		if(c.linked == null) c.linked = this.compileRuntimeShader(shaders,outVars);
		return c.linked;
	}
	,compileRuntimeShader: function(shaders,outVars) {
		var shaderDatas = [];
		var index = 0;
		var _g2 = new hxsl__$ShaderList_ShaderIterator(shaders);
		while(_g2.l != null) {
			var s4 = _g2.next();
			var i = s4.instance;
			shaderDatas.push({ inst : i, p : s4.priority, index : index++});
		}
		shaderDatas.reverse();
		haxe_ds_ArraySort.sort(shaderDatas,function(s11,s21) {
			return s21.p - s11.p;
		});
		var linker = new hxsl_Linker();
		var s1 = linker.link((function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				while(_g1 < shaderDatas.length) {
					var s = shaderDatas[_g1];
					++_g1;
					_g.push(s.inst.shader);
				}
			}
			$r = _g;
			return $r;
		}(this)),this.outVars[outVars]);
		var paramVars = new haxe_ds_IntMap();
		var _g11 = 0;
		var _g21 = linker.allVars;
		while(_g11 < _g21.length) {
			var v = _g21[_g11];
			++_g11;
			if(v.v.kind == hxsl_VarKind.Param) {
				{
					var _g3 = v.v.type;
					switch(_g3[1]) {
					case 12:
						continue;
						break;
					default:
					}
				}
				var inf = shaderDatas[v.instanceIndex];
				var value = { instance : inf.index, index : inf.inst.params.h[v.merged[0].id]};
				paramVars.h[v.id] = value;
			}
		}
		var prev = s1;
		var s2 = new hxsl_Splitter().split(s1);
		var prev1 = s2;
		var s3 = new hxsl_Dce().dce(s2.vertex,s2.fragment);
		var r = new hxsl_RuntimeShader();
		r.vertex = this.flattenShader(s3.vertex,hxsl_FunctionKind.Vertex,paramVars);
		r.vertex.vertex = true;
		r.fragment = this.flattenShader(s3.fragment,hxsl_FunctionKind.Fragment,paramVars);
		r.globals = new haxe_ds_IntMap();
		this.initGlobals(r,r.vertex);
		this.initGlobals(r,r.fragment);
		var sid = haxe_crypto_Md5.encode(hxsl_Printer.shaderToString(r.vertex.data) + hxsl_Printer.shaderToString(r.fragment.data));
		var r2 = this.byID.get(sid);
		if(r2 != null) r.id = r2.id; else this.byID.set(sid,r);
		return r;
	}
	,initGlobals: function(r,s) {
		var p = s.globals;
		while(p != null) {
			r.globals.h[p.gid] = true;
			p = p.next;
		}
		var p1 = s.params;
		while(p1 != null) {
			if(p1.perObjectGlobal != null) r.globals.h[p1.perObjectGlobal.gid] = true;
			p1 = p1.next;
		}
	}
	,getPath: function(v) {
		if(v.parent == null) return v.name;
		return this.getPath(v.parent) + "." + v.name;
	}
	,flattenShader: function(s,kind,params) {
		var flat = new hxsl_Flatten();
		var c = new hxsl_RuntimeShaderData();
		var data = flat.flatten(s,kind,this.constsToGlobal);
		c.consts = flat.consts;
		var $it0 = flat.allocData.keys();
		while( $it0.hasNext() ) {
			var g = $it0.next();
			var alloc = flat.allocData.h[g.__id__];
			var _g = g.kind;
			switch(_g[1]) {
			case 2:
				var out = [];
				var _g1 = 0;
				while(_g1 < alloc.length) {
					var a = alloc[_g1];
					++_g1;
					if(a.v == null) continue;
					var p = params.h[a.v.id];
					if(p == null) {
						var ap = new hxsl_AllocParam(a.v.name,a.pos,-1,-1,a.v.type);
						ap.perObjectGlobal = new hxsl_AllocGlobal(-1,this.getPath(a.v),a.v.type);
						out.push(ap);
						continue;
					}
					out.push(new hxsl_AllocParam(a.v.name,a.pos,p.instance,p.index,a.v.type));
				}
				var _g2 = 0;
				var _g11 = out.length - 1;
				while(_g2 < _g11) {
					var i = _g2++;
					out[i].next = out[i + 1];
				}
				{
					var _g12 = g.type;
					switch(_g12[1]) {
					case 14:
						switch(_g12[2][1]) {
						case 10:
							c.textures2D = out[0];
							c.textures2DCount = out.length;
							break;
						case 11:
							c.texturesCube = out[0];
							c.texturesCubeCount = out.length;
							break;
						case 5:
							switch(_g12[2][2]) {
							case 4:
								switch(_g12[2][3][1]) {
								case 1:
									switch(_g12[3][1]) {
									case 0:
										var size = _g12[3][2];
										c.params = out[0];
										c.paramsSize = size;
										break;
									default:
										throw new js__$Boot_HaxeError("assert");
									}
									break;
								default:
									throw new js__$Boot_HaxeError("assert");
								}
								break;
							default:
								throw new js__$Boot_HaxeError("assert");
							}
							break;
						default:
							throw new js__$Boot_HaxeError("assert");
						}
						break;
					default:
						throw new js__$Boot_HaxeError("assert");
					}
				}
				break;
			case 0:
				var out1;
				var _g13 = [];
				var _g21 = 0;
				while(_g21 < alloc.length) {
					var a1 = alloc[_g21];
					++_g21;
					if(a1.v != null) _g13.push(new hxsl_AllocGlobal(a1.pos,this.getPath(a1.v),a1.v.type));
				}
				out1 = _g13;
				var _g3 = 0;
				var _g22 = out1.length - 1;
				while(_g3 < _g22) {
					var i1 = _g3++;
					out1[i1].next = out1[i1 + 1];
				}
				{
					var _g23 = g.type;
					switch(_g23[1]) {
					case 14:
						switch(_g23[2][1]) {
						case 5:
							switch(_g23[2][2]) {
							case 4:
								switch(_g23[2][3][1]) {
								case 1:
									switch(_g23[3][1]) {
									case 0:
										var size1 = _g23[3][2];
										c.globals = out1[0];
										c.globalsSize = size1;
										break;
									default:
										throw new js__$Boot_HaxeError("assert");
									}
									break;
								default:
									throw new js__$Boot_HaxeError("assert");
								}
								break;
							default:
								throw new js__$Boot_HaxeError("assert");
							}
							break;
						default:
							throw new js__$Boot_HaxeError("assert");
						}
						break;
					default:
						throw new js__$Boot_HaxeError("assert");
					}
				}
				break;
			default:
				throw new js__$Boot_HaxeError("assert");
			}
		}
		if(c.globals == null) c.globalsSize = 0;
		if(c.params == null) c.paramsSize = 0;
		if(c.textures2D == null) c.textures2DCount = 0;
		if(c.texturesCube == null) c.texturesCubeCount = 0;
		c.data = data;
		return c;
	}
	,__class__: hxsl_Cache
};
var hxsl_Clone = function() {
	this.varMap = new haxe_ds_IntMap();
};
$hxClasses["hxsl.Clone"] = hxsl_Clone;
hxsl_Clone.__name__ = true;
hxsl_Clone.shaderData = function(s) {
	return new hxsl_Clone().shader(s);
};
hxsl_Clone.prototype = {
	tvar: function(v) {
		var v2 = this.varMap.h[v.id];
		if(v2 != null) return v2;
		v2 = { id : hxsl_Tools.allocVarId(), type : v.type, name : v.name, kind : v.kind};
		this.varMap.h[v.id] = v2;
		if(v.parent != null) v2.parent = this.tvar(v.parent);
		if(v.qualifiers != null) v2.qualifiers = v.qualifiers.slice();
		v2.type = this.ttype(v.type);
		return v2;
	}
	,tfun: function(f) {
		return { ret : this.ttype(f.ret), kind : f.kind, ref : this.tvar(f.ref), args : (function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				var _g2 = f.args;
				while(_g1 < _g2.length) {
					var a = _g2[_g1];
					++_g1;
					_g.push($this.tvar(a));
				}
			}
			$r = _g;
			return $r;
		}(this)), expr : this.texpr(f.expr)};
	}
	,ttype: function(t) {
		switch(t[1]) {
		case 12:
			var vl = t[2];
			return hxsl_Type.TStruct((function($this) {
				var $r;
				var _g = [];
				{
					var _g1 = 0;
					while(_g1 < vl.length) {
						var v = vl[_g1];
						++_g1;
						_g.push($this.tvar(v));
					}
				}
				$r = _g;
				return $r;
			}(this)));
		case 14:
			var size = t[3];
			var t1 = t[2];
			return hxsl_Type.TArray(this.ttype(t1),(function($this) {
				var $r;
				switch(size[1]) {
				case 0:
					$r = size;
					break;
				case 1:
					$r = (function($this) {
						var $r;
						var v1 = size[2];
						$r = hxsl_SizeDecl.SVar($this.tvar(v1));
						return $r;
					}($this));
					break;
				}
				return $r;
			}(this)));
		case 13:
			var vars = t[2];
			return hxsl_Type.TFun((function($this) {
				var $r;
				var _g2 = [];
				{
					var _g11 = 0;
					while(_g11 < vars.length) {
						var v2 = vars[_g11];
						++_g11;
						_g2.push({ args : (function($this) {
							var $r;
							var _g21 = [];
							{
								var _g3 = 0;
								var _g4 = v2.args;
								while(_g3 < _g4.length) {
									var a = _g4[_g3];
									++_g3;
									_g21.push({ name : a.name, type : $this.ttype(a.type)});
								}
							}
							$r = _g21;
							return $r;
						}($this)), ret : $this.ttype(v2.ret)});
					}
				}
				$r = _g2;
				return $r;
			}(this)));
		default:
			return t;
		}
	}
	,texpr: function(e) {
		var e2 = hxsl_Tools.map(e,$bind(this,this.texpr));
		e2.t = this.ttype(e.t);
		{
			var _g = e2.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				e2.e = hxsl_TExprDef.TVar(this.tvar(v));
				break;
			case 7:
				var init = _g[3];
				var v1 = _g[2];
				e2.e = hxsl_TExprDef.TVarDecl(this.tvar(v1),init);
				break;
			case 13:
				var loop = _g[4];
				var it = _g[3];
				var v2 = _g[2];
				e2.e = hxsl_TExprDef.TFor(this.tvar(v2),it,loop);
				break;
			default:
				e2.e = e2.e;
			}
		}
		return e2;
	}
	,shader: function(s) {
		return { name : s.name, vars : (function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				var _g2 = s.vars;
				while(_g1 < _g2.length) {
					var v = _g2[_g1];
					++_g1;
					_g.push($this.tvar(v));
				}
			}
			$r = _g;
			return $r;
		}(this)), funs : (function($this) {
			var $r;
			var _g11 = [];
			{
				var _g21 = 0;
				var _g3 = s.funs;
				while(_g21 < _g3.length) {
					var f = _g3[_g21];
					++_g21;
					_g11.push($this.tfun(f));
				}
			}
			$r = _g11;
			return $r;
		}(this))};
	}
	,__class__: hxsl_Clone
};
var hxsl__$Dce_Exit = function() {
};
$hxClasses["hxsl._Dce.Exit"] = hxsl__$Dce_Exit;
hxsl__$Dce_Exit.__name__ = true;
hxsl__$Dce_Exit.prototype = {
	__class__: hxsl__$Dce_Exit
};
var hxsl__$Dce_VarDeps = function(v) {
	this.v = v;
	this.used = false;
	this.deps = new haxe_ds_IntMap();
};
$hxClasses["hxsl._Dce.VarDeps"] = hxsl__$Dce_VarDeps;
hxsl__$Dce_VarDeps.__name__ = true;
hxsl__$Dce_VarDeps.prototype = {
	__class__: hxsl__$Dce_VarDeps
};
var hxsl_Dce = function() {
};
$hxClasses["hxsl.Dce"] = hxsl_Dce;
hxsl_Dce.__name__ = true;
hxsl_Dce.prototype = {
	dce: function(vertex,fragment) {
		this.used = new haxe_ds_IntMap();
		var inputs = [];
		var _g = 0;
		var _g1 = vertex.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			var i = this.get(v);
			if(v.kind == hxsl_VarKind.Input) inputs.push(i);
			if(v.kind == hxsl_VarKind.Output) i.keep = true;
		}
		var _g2 = 0;
		var _g11 = fragment.vars;
		while(_g2 < _g11.length) {
			var v1 = _g11[_g2];
			++_g2;
			var i1 = this.get(v1);
			if(v1.kind == hxsl_VarKind.Output) i1.keep = true;
		}
		var _g3 = 0;
		var _g12 = vertex.funs;
		while(_g3 < _g12.length) {
			var f = _g12[_g3];
			++_g3;
			this.check(f.expr,[]);
		}
		var _g4 = 0;
		var _g13 = fragment.funs;
		while(_g4 < _g13.length) {
			var f1 = _g13[_g4];
			++_g4;
			this.check(f1.expr,[]);
		}
		var $it0 = this.used.iterator();
		while( $it0.hasNext() ) {
			var v2 = $it0.next();
			if(v2.keep) this.markRec(v2);
		}
		while(inputs.length > 1 && !inputs[inputs.length - 1].used) inputs.pop();
		var _g5 = 0;
		while(_g5 < inputs.length) {
			var v3 = inputs[_g5];
			++_g5;
			this.markRec(v3);
		}
		var $it1 = this.used.iterator();
		while( $it1.hasNext() ) {
			var v4 = $it1.next();
			if(v4.used) continue;
			HxOverrides.remove(vertex.vars,v4.v);
			HxOverrides.remove(fragment.vars,v4.v);
		}
		var _g6 = 0;
		var _g14 = vertex.funs;
		while(_g6 < _g14.length) {
			var f2 = _g14[_g6];
			++_g6;
			f2.expr = this.mapExpr(f2.expr);
		}
		var _g7 = 0;
		var _g15 = fragment.funs;
		while(_g7 < _g15.length) {
			var f3 = _g15[_g7];
			++_g7;
			f3.expr = this.mapExpr(f3.expr);
		}
		return { fragment : fragment, vertex : vertex};
	}
	,get: function(v) {
		var vd = this.used.h[v.id];
		if(vd == null) {
			vd = new hxsl__$Dce_VarDeps(v);
			this.used.h[v.id] = vd;
		}
		return vd;
	}
	,markRec: function(v) {
		if(v.used) return;
		v.used = true;
		var $it0 = v.deps.iterator();
		while( $it0.hasNext() ) {
			var d = $it0.next();
			this.markRec(d);
		}
	}
	,link: function(v,writeTo) {
		var vd = this.get(v);
		var _g = 0;
		while(_g < writeTo.length) {
			var w = writeTo[_g];
			++_g;
			if(w == null) {
				vd.keep = true;
				continue;
			}
			w.deps.h[v.id] = vd;
		}
	}
	,hasDiscardRec: function(e) {
		var _g = e.e;
		switch(_g[1]) {
		case 11:
			throw new js__$Boot_HaxeError(new hxsl__$Dce_Exit());
			break;
		default:
			hxsl_Tools.iter(e,$bind(this,this.hasDiscardRec));
		}
	}
	,hasDiscard: function(e) {
		try {
			this.hasDiscardRec(e);
			return false;
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			if( js_Boot.__instanceof(e1,hxsl__$Dce_Exit) ) {
				return true;
			} else throw(e1);
		}
	}
	,check: function(e,writeTo) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				this.link(v,writeTo);
				break;
			case 5:
				switch(_g[2][1]) {
				case 4:
					switch(_g[3].e[1]) {
					case 1:
						var e1 = _g[4];
						var v1 = _g[3].e[2];
						writeTo.push(this.get(v1));
						this.check(e1,writeTo);
						writeTo.pop();
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var e2 = _g[4];
							var v2 = _g[3].e[2].e[2];
							writeTo.push(this.get(v2));
							this.check(e2,writeTo);
							writeTo.pop();
							break;
						default:
							hxsl_Tools.iter(e,(function(f,a1) {
								return function(e3) {
									f(e3,a1);
								};
							})($bind(this,this.check),writeTo));
						}
						break;
					default:
						hxsl_Tools.iter(e,(function(f,a1) {
							return function(e3) {
								f(e3,a1);
							};
						})($bind(this,this.check),writeTo));
					}
					break;
				case 20:
					switch(_g[3].e[1]) {
					case 1:
						var e4 = _g[4];
						var v3 = _g[3].e[2];
						writeTo.push(this.get(v3));
						this.check(e4,writeTo);
						writeTo.pop();
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var e5 = _g[4];
							var v4 = _g[3].e[2].e[2];
							writeTo.push(this.get(v4));
							this.check(e5,writeTo);
							writeTo.pop();
							break;
						default:
							hxsl_Tools.iter(e,(function(f,a1) {
								return function(e3) {
									f(e3,a1);
								};
							})($bind(this,this.check),writeTo));
						}
						break;
					default:
						hxsl_Tools.iter(e,(function(f,a1) {
							return function(e3) {
								f(e3,a1);
							};
						})($bind(this,this.check),writeTo));
					}
					break;
				default:
					hxsl_Tools.iter(e,(function(f,a1) {
						return function(e3) {
							f(e3,a1);
						};
					})($bind(this,this.check),writeTo));
				}
				break;
			case 7:
				var init = _g[3];
				var v5 = _g[2];
				if(init != null) {
					writeTo.push(this.get(v5));
					this.check(init,writeTo);
					writeTo.pop();
				} else hxsl_Tools.iter(e,(function(f,a1) {
					return function(e3) {
						f(e3,a1);
					};
				})($bind(this,this.check),writeTo));
				break;
			case 10:
				var eelse = _g[4];
				var eif = _g[3];
				var e6 = _g[2];
				if(this.hasDiscard(eif) || eelse != null && this.hasDiscard(eelse)) {
					writeTo.push(null);
					this.check(e6,writeTo);
					writeTo.pop();
					this.check(eif,writeTo);
					if(eelse != null) this.check(eelse,writeTo);
				} else hxsl_Tools.iter(e,(function(f,a1) {
					return function(e3) {
						f(e3,a1);
					};
				})($bind(this,this.check),writeTo));
				break;
			default:
				hxsl_Tools.iter(e,(function(f,a1) {
					return function(e3) {
						f(e3,a1);
					};
				})($bind(this,this.check),writeTo));
			}
		}
	}
	,mapExpr: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 4:
				var el = _g[2];
				var out = [];
				var count = 0;
				var _g1 = 0;
				while(_g1 < el.length) {
					var e1 = el[_g1];
					++_g1;
					var e2 = this.mapExpr(e1);
					{
						var _g2 = e2.e;
						switch(_g2[1]) {
						case 0:
							if(count < el.length) {
							} else out.push(e2);
							break;
						case 4:
							switch(_g2[2].length) {
							case 0:
								break;
							default:
								out.push(e2);
							}
							break;
						default:
							out.push(e2);
						}
					}
					count++;
				}
				return { e : hxsl_TExprDef.TBlock(out), p : e.p, t : e.t};
			case 7:
				var v = _g[2];
				if(!this.get(v).used) return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p}; else return hxsl_Tools.map(e,$bind(this,this.mapExpr));
				break;
			case 5:
				switch(_g[2][1]) {
				case 4:
					switch(_g[3].e[1]) {
					case 1:
						var v1 = _g[3].e[2];
						if(!this.get(v1).used) return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p}; else return hxsl_Tools.map(e,$bind(this,this.mapExpr));
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var v2 = _g[3].e[2].e[2];
							if(!this.get(v2).used) return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p}; else return hxsl_Tools.map(e,$bind(this,this.mapExpr));
							break;
						default:
							return hxsl_Tools.map(e,$bind(this,this.mapExpr));
						}
						break;
					default:
						return hxsl_Tools.map(e,$bind(this,this.mapExpr));
					}
					break;
				case 20:
					switch(_g[3].e[1]) {
					case 1:
						var v3 = _g[3].e[2];
						if(!this.get(v3).used) return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p}; else return hxsl_Tools.map(e,$bind(this,this.mapExpr));
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var v4 = _g[3].e[2].e[2];
							if(!this.get(v4).used) return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p}; else return hxsl_Tools.map(e,$bind(this,this.mapExpr));
							break;
						default:
							return hxsl_Tools.map(e,$bind(this,this.mapExpr));
						}
						break;
					default:
						return hxsl_Tools.map(e,$bind(this,this.mapExpr));
					}
					break;
				default:
					return hxsl_Tools.map(e,$bind(this,this.mapExpr));
				}
				break;
			default:
				return hxsl_Tools.map(e,$bind(this,this.mapExpr));
			}
		}
	}
	,__class__: hxsl_Dce
};
var hxsl_Eval = function() {
	this.varMap = new haxe_ds_ObjectMap();
	this.funMap = new haxe_ds_ObjectMap();
	this.constants = new haxe_ds_ObjectMap();
};
$hxClasses["hxsl.Eval"] = hxsl_Eval;
hxsl_Eval.__name__ = true;
hxsl_Eval.prototype = {
	setConstant: function(v,c) {
		var value = hxsl_TExprDef.TConst(c);
		this.constants.set(v,value);
	}
	,mapVar: function(v) {
		var v2 = this.varMap.h[v.__id__];
		if(v2 != null) if(v == v2) return v2; else return this.mapVar(v2);
		if(v.parent != null) {
			this.mapVar(v.parent);
			v2 = this.varMap.h[v.__id__];
			if(v2 != null) if(v == v2) return v2; else return this.mapVar(v2);
		}
		v2 = { id : hxsl_Tools.allocVarId(), name : v.name, type : v.type, kind : v.kind};
		if(v.parent != null) v2.parent = this.mapVar(v.parent);
		if(v.qualifiers != null) v2.qualifiers = v.qualifiers.slice();
		this.varMap.set(v,v2);
		this.varMap.set(v2,v2);
		{
			var _g = v2.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				v2.type = hxsl_Type.TStruct((function($this) {
					var $r;
					var _g1 = [];
					{
						var _g2 = 0;
						while(_g2 < vl.length) {
							var v1 = vl[_g2];
							++_g2;
							_g1.push($this.mapVar(v1));
						}
					}
					$r = _g1;
					return $r;
				}(this)));
				break;
			case 14:
				switch(_g[3][1]) {
				case 1:
					var t = _g[2];
					var vs = _g[3][2];
					var c = this.constants.h[vs.__id__];
					if(c != null) switch(c[1]) {
					case 0:
						switch(c[2][1]) {
						case 2:
							var v3 = c[2][2];
							v2.type = hxsl_Type.TArray(t,hxsl_SizeDecl.SConst(v3));
							break;
						default:
							hxsl_Error.t("Integer value expected for array size constant " + vs.name,null);
						}
						break;
					default:
						hxsl_Error.t("Integer value expected for array size constant " + vs.name,null);
					} else {
						var vs2 = this.mapVar(vs);
						v2.type = hxsl_Type.TArray(t,hxsl_SizeDecl.SVar(vs2));
					}
					break;
				default:
				}
				break;
			default:
			}
		}
		return v2;
	}
	,'eval': function(s) {
		var funs = [];
		var _g = 0;
		var _g1 = s.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var f2 = { kind : f.kind, ref : this.mapVar(f.ref), args : (function($this) {
				var $r;
				var _g2 = [];
				{
					var _g3 = 0;
					var _g4 = f.args;
					while(_g3 < _g4.length) {
						var a = _g4[_g3];
						++_g3;
						_g2.push($this.mapVar(a));
					}
				}
				$r = _g2;
				return $r;
			}(this)), ret : f.ret, expr : f.expr};
			if(f.kind != hxsl_FunctionKind.Helper) funs.push(f2);
			this.funMap.set(f2.ref,f);
		}
		var _g11 = 0;
		var _g5 = funs.length;
		while(_g11 < _g5) {
			var i = _g11++;
			funs[i].expr = this.evalExpr(funs[i].expr);
		}
		return { name : s.name, vars : (function($this) {
			var $r;
			var _g6 = [];
			{
				var _g12 = 0;
				var _g21 = s.vars;
				while(_g12 < _g21.length) {
					var v = _g21[_g12];
					++_g12;
					_g6.push($this.mapVar(v));
				}
			}
			$r = _g6;
			return $r;
		}(this)), funs : funs};
	}
	,hasReturn: function(e) {
		this.markReturn = false;
		this.hasReturnLoop(e);
		return this.markReturn;
	}
	,hasReturnLoop: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 12:
				this.markReturn = true;
				break;
			default:
				if(!this.markReturn) hxsl_Tools.iter(e,$bind(this,this.hasReturnLoop));
			}
		}
	}
	,handleReturn: function(e,$final) {
		if($final == null) $final = false;
		{
			var _g = e.e;
			switch(_g[1]) {
			case 12:
				var v = _g[2];
				if(!$final) hxsl_Error.t("Cannot inline not final return",e.p);
				if(v == null) return { e : hxsl_TExprDef.TBlock([]), t : hxsl_Type.TVoid, p : e.p};
				return this.handleReturn(v,true);
			case 4:
				var el = _g[2];
				var i = 0;
				var last = el.length;
				var out = [];
				try {
					while(i < last) {
						var e1 = el[i++];
						if(i == last) out.push(this.handleReturn(e1,$final)); else {
							var _g1 = e1.e;
							switch(_g1[1]) {
							case 10:
								if(_g1[4] == null) {
									var econd = _g1[2];
									var eif = _g1[3];
									if($final && this.hasReturn(eif)) {
										out.push(this.handleReturn({ e : hxsl_TExprDef.TIf(econd,eif,{ e : hxsl_TExprDef.TBlock(el.slice(i)), t : e1.t, p : e1.p}), t : e1.t, p : e1.p}));
										throw "__break__";
									} else out.push(this.handleReturn(e1));
								} else switch(_g1[4]) {
								default:
									out.push(this.handleReturn(e1));
								}
								break;
							default:
								out.push(this.handleReturn(e1));
							}
						}
					}
				} catch( e ) { if( e != "__break__" ) throw e; }
				var t;
				if($final) t = out[out.length - 1].t; else t = e.t;
				return { e : hxsl_TExprDef.TBlock(out), t : t, p : e.p};
			case 3:
				var v1 = _g[2];
				var v2 = this.handleReturn(v1,$final);
				return { e : hxsl_TExprDef.TParenthesis(v2), t : v2.t, p : e.p};
			case 10:
				var eelse = _g[4];
				var eif1 = _g[3];
				var cond = _g[2];
				if(eelse != null && $final) {
					var cond1 = this.handleReturn(cond);
					var eif2 = this.handleReturn(eif1,$final);
					return { e : hxsl_TExprDef.TIf(cond1,eif2,this.handleReturn(eelse,$final)), t : eif2.t, p : e.p};
				} else return hxsl_Tools.map(e,$bind(this,this.handleReturnDef));
				break;
			default:
				return hxsl_Tools.map(e,$bind(this,this.handleReturnDef));
			}
		}
	}
	,handleReturnDef: function(e) {
		return this.handleReturn(e);
	}
	,evalCall: function(g,args) {
		switch(g[1]) {
		case 36:
			switch(args.length) {
			case 1:
				switch(args[0].e[1]) {
				case 0:
					switch(args[0].e[2][1]) {
					case 2:
						var i = args[0].e[2][2];
						return hxsl_TExprDef.TConst(hxsl_Const.CFloat(i));
					default:
						return null;
					}
					break;
				default:
					return null;
				}
				break;
			default:
				return null;
			}
			break;
		default:
			return null;
		}
	}
	,evalExpr: function(e) {
		var _g6 = this;
		var d;
		{
			var _g = e.e;
			switch(_g[1]) {
			case 2:case 0:
				d = e.e;
				break;
			case 1:
				var v = _g[2];
				var c = this.constants.h[v.__id__];
				if(c != null) d = c; else {
					var v2 = this.mapVar(v);
					d = hxsl_TExprDef.TVar(v2);
				}
				break;
			case 7:
				var init = _g[3];
				var v1 = _g[2];
				d = hxsl_TExprDef.TVarDecl(this.mapVar(v1),init == null?null:this.evalExpr(init));
				break;
			case 16:
				var e2 = _g[3];
				var e1 = _g[2];
				var e11 = this.evalExpr(e1);
				var e21 = this.evalExpr(e2);
				{
					var _g1 = e11.e;
					var _g2 = e21.e;
					switch(_g1[1]) {
					case 17:
						switch(_g2[1]) {
						case 0:
							switch(_g2[2][1]) {
							case 2:
								var el = _g1[2];
								var i = _g2[2][2];
								if(i >= 0 && i < el.length) d = el[i].e; else d = hxsl_TExprDef.TArray(e11,e21);
								break;
							default:
								d = hxsl_TExprDef.TArray(e11,e21);
							}
							break;
						default:
							d = hxsl_TExprDef.TArray(e11,e21);
						}
						break;
					default:
						d = hxsl_TExprDef.TArray(e11,e21);
					}
				}
				break;
			case 9:
				var r = _g[3];
				var e3 = _g[2];
				d = hxsl_TExprDef.TSwiz(this.evalExpr(e3),r.slice());
				break;
			case 12:
				var e4 = _g[2];
				d = hxsl_TExprDef.TReturn(e4 == null?null:this.evalExpr(e4));
				break;
			case 8:
				var args = _g[3];
				var c1 = _g[2];
				var c2 = this.evalExpr(c1);
				var args1;
				var _g11 = [];
				var _g21 = 0;
				while(_g21 < args.length) {
					var a = args[_g21];
					++_g21;
					_g11.push(this.evalExpr(a));
				}
				args1 = _g11;
				{
					var _g22 = c2.e;
					switch(_g22[1]) {
					case 2:
						var g = _g22[2];
						var v3 = this.evalCall(g,args1);
						if(v3 != null) d = v3; else d = hxsl_TExprDef.TCall(c2,args1);
						break;
					case 1:
						var v4 = _g22[2];
						if(this.funMap.h.__keys__[v4.__id__] != null) {
							var f = this.funMap.h[v4.__id__];
							var outExprs = [];
							var undo = [];
							var _g4 = 0;
							var _g3 = f.args.length;
							while(_g4 < _g3) {
								var i1 = _g4++;
								var v5 = [f.args[i1]];
								var e6 = args1[i1];
								{
									var _g5 = e6.e;
									switch(_g5[1]) {
									case 0:
										var old = [this.constants.h[v5[0].__id__]];
										undo.push((function(old,v5) {
											return function() {
												if(old[0] == null) _g6.constants.remove(v5[0]); else _g6.constants.set(v5[0],old[0]);
											};
										})(old,v5));
										this.constants.set(v5[0],e6.e);
										break;
									case 1:
										switch(_g5[2].kind[1]) {
										case 1:case 2:case 0:
											var old1 = [this.constants.h[v5[0].__id__]];
											undo.push((function(old1,v5) {
												return function() {
													if(old1[0] == null) _g6.constants.remove(v5[0]); else _g6.constants.set(v5[0],old1[0]);
												};
											})(old1,v5));
											this.constants.set(v5[0],e6.e);
											break;
										default:
											var old2 = [this.varMap.h[v5[0].__id__]];
											if(old2[0] == null) undo.push((function(v5) {
												return function() {
													_g6.varMap.remove(v5[0]);
												};
											})(v5)); else {
												this.varMap.remove(v5[0]);
												undo.push((function(old2,v5) {
													return function() {
														_g6.varMap.set(v5[0],old2[0]);
													};
												})(old2,v5));
											}
											var v21 = this.mapVar(v5[0]);
											outExprs.push({ e : hxsl_TExprDef.TVarDecl(v21,e6), t : hxsl_Type.TVoid, p : e6.p});
										}
										break;
									default:
										var old3 = [this.varMap.h[v5[0].__id__]];
										if(old3[0] == null) undo.push((function(v5) {
											return function() {
												_g6.varMap.remove(v5[0]);
											};
										})(v5)); else {
											this.varMap.remove(v5[0]);
											undo.push((function(old3,v5) {
												return function() {
													_g6.varMap.set(v5[0],old3[0]);
												};
											})(old3,v5));
										}
										var v22 = this.mapVar(v5[0]);
										outExprs.push({ e : hxsl_TExprDef.TVarDecl(v22,e6), t : hxsl_Type.TVoid, p : e6.p});
									}
								}
							}
							var e5 = this.handleReturn(this.evalExpr(f.expr),true);
							var _g31 = 0;
							while(_g31 < undo.length) {
								var u = undo[_g31];
								++_g31;
								u();
							}
							{
								var _g32 = e5.e;
								switch(_g32[1]) {
								case 4:
									var el1 = _g32[2];
									var _g41 = 0;
									while(_g41 < el1.length) {
										var e7 = el1[_g41];
										++_g41;
										outExprs.push(e7);
									}
									break;
								default:
									outExprs.push(e5);
								}
							}
							d = hxsl_TExprDef.TBlock(outExprs);
						} else d = hxsl_Error.t("Cannot eval non-static call expresssion '" + new hxsl_Printer().exprString(c2) + "'",c2.p);
						break;
					default:
						d = hxsl_Error.t("Cannot eval non-static call expresssion '" + new hxsl_Printer().exprString(c2) + "'",c2.p);
					}
				}
				break;
			case 4:
				var el2 = _g[2];
				var out = [];
				var last = el2.length - 1;
				var _g23 = 0;
				var _g12 = el2.length;
				while(_g23 < _g12) {
					var i2 = _g23++;
					var e8 = this.evalExpr(el2[i2]);
					{
						var _g33 = e8.e;
						switch(_g33[1]) {
						case 0:
							if(i2 < last) {
							} else out.push(e8);
							break;
						case 1:
							if(i2 < last) {
							} else out.push(e8);
							break;
						default:
							out.push(e8);
						}
					}
				}
				if(out.length == 1) d = out[0].e; else d = hxsl_TExprDef.TBlock(out);
				break;
			case 5:
				var e22 = _g[4];
				var e12 = _g[3];
				var op = _g[2];
				var e13 = this.evalExpr(e12);
				var e23 = this.evalExpr(e22);
				switch(op[1]) {
				case 0:
					{
						var _g13 = e13.e;
						var _g24 = e23.e;
						switch(_g13[1]) {
						case 0:
							switch(_g13[2][1]) {
							case 2:
								switch(_g24[1]) {
								case 0:
									switch(_g24[2][1]) {
									case 2:
										var a1 = _g13[2][2];
										var b = _g24[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(Std["int"](a1 + b)));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g24[1]) {
								case 0:
									switch(_g24[2][1]) {
									case 3:
										var a2 = _g13[2][2];
										var b1 = _g24[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a2 + b1));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 3:
					{
						var _g14 = e13.e;
						var _g25 = e23.e;
						switch(_g14[1]) {
						case 0:
							switch(_g14[2][1]) {
							case 2:
								switch(_g25[1]) {
								case 0:
									switch(_g25[2][1]) {
									case 2:
										var a3 = _g14[2][2];
										var b2 = _g25[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(Std["int"](a3 - b2)));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g25[1]) {
								case 0:
									switch(_g25[2][1]) {
									case 3:
										var a4 = _g14[2][2];
										var b3 = _g25[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a4 - b3));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 1:
					{
						var _g15 = e13.e;
						var _g26 = e23.e;
						switch(_g15[1]) {
						case 0:
							switch(_g15[2][1]) {
							case 2:
								switch(_g26[1]) {
								case 0:
									switch(_g26[2][1]) {
									case 2:
										var a5 = _g15[2][2];
										var b4 = _g26[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(Std["int"](a5 * b4)));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g26[1]) {
								case 0:
									switch(_g26[2][1]) {
									case 3:
										var a6 = _g15[2][2];
										var b5 = _g26[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a6 * b5));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 2:
					{
						var _g16 = e13.e;
						var _g27 = e23.e;
						switch(_g16[1]) {
						case 0:
							switch(_g16[2][1]) {
							case 2:
								switch(_g27[1]) {
								case 0:
									switch(_g27[2][1]) {
									case 2:
										var a7 = _g16[2][2];
										var b6 = _g27[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(Std["int"](a7 / b6)));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g27[1]) {
								case 0:
									switch(_g27[2][1]) {
									case 3:
										var a8 = _g16[2][2];
										var b7 = _g27[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a8 / b7));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 19:
					{
						var _g17 = e13.e;
						var _g28 = e23.e;
						switch(_g17[1]) {
						case 0:
							switch(_g17[2][1]) {
							case 2:
								switch(_g28[1]) {
								case 0:
									switch(_g28[2][1]) {
									case 2:
										var a9 = _g17[2][2];
										var b8 = _g28[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(Std["int"](a9 % b8)));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g28[1]) {
								case 0:
									switch(_g28[2][1]) {
									case 3:
										var a10 = _g17[2][2];
										var b9 = _g28[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a10 % b9));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 13:
					{
						var _g18 = e13.e;
						var _g29 = e23.e;
						switch(_g18[1]) {
						case 0:
							switch(_g18[2][1]) {
							case 2:
								switch(_g29[1]) {
								case 0:
									switch(_g29[2][1]) {
									case 2:
										var a11 = _g18[2][2];
										var b10 = _g29[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a11 ^ b10));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 12:
					{
						var _g19 = e13.e;
						var _g210 = e23.e;
						switch(_g19[1]) {
						case 0:
							switch(_g19[2][1]) {
							case 2:
								switch(_g210[1]) {
								case 0:
									switch(_g210[2][1]) {
									case 2:
										var a12 = _g19[2][2];
										var b11 = _g210[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a12 | b11));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 11:
					{
						var _g110 = e13.e;
						var _g211 = e23.e;
						switch(_g110[1]) {
						case 0:
							switch(_g110[2][1]) {
							case 2:
								switch(_g211[1]) {
								case 0:
									switch(_g211[2][1]) {
									case 2:
										var a13 = _g110[2][2];
										var b12 = _g211[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a13 & b12));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 17:
					{
						var _g111 = e13.e;
						var _g212 = e23.e;
						switch(_g111[1]) {
						case 0:
							switch(_g111[2][1]) {
							case 2:
								switch(_g212[1]) {
								case 0:
									switch(_g212[2][1]) {
									case 2:
										var a14 = _g111[2][2];
										var b13 = _g212[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a14 >> b13));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 18:
					{
						var _g112 = e13.e;
						var _g213 = e23.e;
						switch(_g112[1]) {
						case 0:
							switch(_g112[2][1]) {
							case 2:
								switch(_g213[1]) {
								case 0:
									switch(_g213[2][1]) {
									case 2:
										var a15 = _g112[2][2];
										var b14 = _g213[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a15 >>> b14));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 16:
					{
						var _g113 = e13.e;
						var _g214 = e23.e;
						switch(_g113[1]) {
						case 0:
							switch(_g113[2][1]) {
							case 2:
								switch(_g214[1]) {
								case 0:
									switch(_g214[2][1]) {
									case 2:
										var a16 = _g113[2][2];
										var b15 = _g214[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a16 << b15));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 14:
					{
						var _g114 = e13.e;
						var _g215 = e23.e;
						switch(_g114[1]) {
						case 0:
							switch(_g114[2][1]) {
							case 1:
								switch(_g215[1]) {
								case 0:
									switch(_g215[2][1]) {
									case 1:
										var a17 = _g114[2][2];
										var b16 = _g215[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a17 && b16));
										break;
									default:
										var a18 = _g114[2][2];
										if(a18 == false) d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a18)); else d = e23.e;
									}
									break;
								default:
									var a19 = _g114[2][2];
									if(a19 == false) d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a19)); else d = e23.e;
								}
								break;
							default:
								switch(_g215[1]) {
								case 0:
									switch(_g215[2][1]) {
									case 1:
										var a20 = _g215[2][2];
										if(a20 == false) d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a20)); else d = e13.e;
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
							}
							break;
						default:
							switch(_g215[1]) {
							case 0:
								switch(_g215[2][1]) {
								case 1:
									var a21 = _g215[2][2];
									if(a21 == false) d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a21)); else d = e13.e;
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
						}
					}
					break;
				case 15:
					{
						var _g115 = e13.e;
						var _g216 = e23.e;
						switch(_g115[1]) {
						case 0:
							switch(_g115[2][1]) {
							case 1:
								switch(_g216[1]) {
								case 0:
									switch(_g216[2][1]) {
									case 1:
										var a22 = _g115[2][2];
										var b17 = _g216[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a22 || b17));
										break;
									default:
										var a23 = _g115[2][2];
										if(a23 == true) d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a23)); else d = e23.e;
									}
									break;
								default:
									var a24 = _g115[2][2];
									if(a24 == true) d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a24)); else d = e23.e;
								}
								break;
							default:
								switch(_g216[1]) {
								case 0:
									switch(_g216[2][1]) {
									case 1:
										var a25 = _g216[2][2];
										if(a25 == true) d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a25)); else d = e13.e;
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
							}
							break;
						default:
							switch(_g216[1]) {
							case 0:
								switch(_g216[2][1]) {
								case 1:
									var a26 = _g216[2][2];
									if(a26 == true) d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a26)); else d = e13.e;
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e13,e23);
							}
						}
					}
					break;
				case 5:
					{
						var _g116 = e13.e;
						var _g217 = e23.e;
						switch(_g116[1]) {
						case 0:
							switch(_g116[2][1]) {
							case 0:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									default:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 1:
										var a27 = _g116[2][2];
										var b18 = _g217[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a27 == b18?0:1) == 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 2:
										var a28 = _g116[2][2];
										var b19 = _g217[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a28 - b19 == 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 3:
										var a29 = _g116[2][2];
										var b20 = _g217[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a29 > b20?1:a29 == b20?0:-1) == 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 4:
										var a30 = _g116[2][2];
										var b21 = _g217[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a30 > b21?1:a30 == b21?0:-1) == 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 6:
					{
						var _g117 = e13.e;
						var _g218 = e23.e;
						switch(_g117[1]) {
						case 0:
							switch(_g117[2][1]) {
							case 0:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									default:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 1:
										var a31 = _g117[2][2];
										var b22 = _g218[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a31 == b22?0:1) != 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 2:
										var a32 = _g117[2][2];
										var b23 = _g218[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a32 - b23 != 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 3:
										var a33 = _g117[2][2];
										var b24 = _g218[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a33 > b24?1:a33 == b24?0:-1) != 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 4:
										var a34 = _g117[2][2];
										var b25 = _g218[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a34 > b25?1:a34 == b25?0:-1) != 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 7:
					{
						var _g118 = e13.e;
						var _g219 = e23.e;
						switch(_g118[1]) {
						case 0:
							switch(_g118[2][1]) {
							case 0:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									default:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 1:
										var a35 = _g118[2][2];
										var b26 = _g219[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a35 == b26?0:1) > 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 2:
										var a36 = _g118[2][2];
										var b27 = _g219[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a36 - b27 > 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 3:
										var a37 = _g118[2][2];
										var b28 = _g219[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a37 > b28?1:a37 == b28?0:-1) > 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 4:
										var a38 = _g118[2][2];
										var b29 = _g219[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a38 > b29?1:a38 == b29?0:-1) > 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 8:
					{
						var _g119 = e13.e;
						var _g220 = e23.e;
						switch(_g119[1]) {
						case 0:
							switch(_g119[2][1]) {
							case 0:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									default:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 1:
										var a39 = _g119[2][2];
										var b30 = _g220[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a39 == b30?0:1) >= 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 2:
										var a40 = _g119[2][2];
										var b31 = _g220[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a40 - b31 >= 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 3:
										var a41 = _g119[2][2];
										var b32 = _g220[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a41 > b32?1:a41 == b32?0:-1) >= 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									case 4:
										var a42 = _g119[2][2];
										var b33 = _g220[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a42 > b33?1:a42 == b33?0:-1) >= 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 9:
					{
						var _g120 = e13.e;
						var _g221 = e23.e;
						switch(_g120[1]) {
						case 0:
							switch(_g120[2][1]) {
							case 0:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									default:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 1:
										var a43 = _g120[2][2];
										var b34 = _g221[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a43 == b34?0:1) < 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 2:
										var a44 = _g120[2][2];
										var b35 = _g221[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a44 - b35 < 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 3:
										var a45 = _g120[2][2];
										var b36 = _g221[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a45 > b36?1:a45 == b36?0:-1) < 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 4:
										var a46 = _g120[2][2];
										var b37 = _g221[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a46 > b37?1:a46 == b37?0:-1) < 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 10:
					{
						var _g121 = e13.e;
						var _g222 = e23.e;
						switch(_g121[1]) {
						case 0:
							switch(_g121[2][1]) {
							case 0:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
										break;
									default:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 1:
										var a47 = _g121[2][2];
										var b38 = _g222[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a47 == b38?0:1) <= 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 2:
										var a48 = _g121[2][2];
										var b39 = _g222[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a48 - b39 <= 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 3:
										var a49 = _g121[2][2];
										var b40 = _g222[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a49 > b40?1:a49 == b40?0:-1) <= 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
										break;
									case 4:
										var a50 = _g121[2][2];
										var b41 = _g222[2][2];
										d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a50 > b41?1:a50 == b41?0:-1) <= 0));
										break;
									default:
										d = hxsl_TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl_TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl_TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 21:case 4:case 20:
					d = hxsl_TExprDef.TBinop(op,e13,e23);
					break;
				case 22:
					throw new js__$Boot_HaxeError("assert");
					break;
				}
				break;
			case 6:
				var e9 = _g[3];
				var op1 = _g[2];
				var e10 = this.evalExpr(e9);
				{
					var _g122 = e10.e;
					switch(_g122[1]) {
					case 0:
						var c3 = _g122[2];
						switch(op1[1]) {
						case 2:
							switch(c3[1]) {
							case 1:
								var b42 = c3[2];
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(!b42));
								break;
							default:
								d = hxsl_TExprDef.TUnop(op1,e10);
							}
							break;
						case 3:
							switch(c3[1]) {
							case 2:
								var i3 = c3[2];
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(-i3));
								break;
							case 3:
								var f1 = c3[2];
								d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(-f1));
								break;
							default:
								d = hxsl_TExprDef.TUnop(op1,e10);
							}
							break;
						default:
							d = hxsl_TExprDef.TUnop(op1,e10);
						}
						break;
					default:
						d = hxsl_TExprDef.TUnop(op1,e10);
					}
				}
				break;
			case 3:
				var e14 = _g[2];
				var e15 = this.evalExpr(e14);
				{
					var _g123 = e15.e;
					switch(_g123[1]) {
					case 0:
						d = e15.e;
						break;
					default:
						d = hxsl_TExprDef.TParenthesis(e15);
					}
				}
				break;
			case 10:
				var eelse = _g[4];
				var eif = _g[3];
				var econd = _g[2];
				var e16 = this.evalExpr(econd);
				{
					var _g124 = e16.e;
					switch(_g124[1]) {
					case 0:
						switch(_g124[2][1]) {
						case 1:
							var b43 = _g124[2][2];
							if(b43) d = this.evalExpr(eif).e; else if(eelse == null) d = hxsl_TExprDef.TConst(hxsl_Const.CNull); else d = this.evalExpr(eelse).e;
							break;
						default:
							d = hxsl_TExprDef.TIf(e16,this.evalExpr(eif),eelse == null?null:this.evalExpr(eelse));
						}
						break;
					default:
						d = hxsl_TExprDef.TIf(e16,this.evalExpr(eif),eelse == null?null:this.evalExpr(eelse));
					}
				}
				break;
			case 15:
				d = hxsl_TExprDef.TBreak;
				break;
			case 14:
				d = hxsl_TExprDef.TContinue;
				break;
			case 11:
				d = hxsl_TExprDef.TDiscard;
				break;
			case 13:
				var loop = _g[4];
				var it = _g[3];
				var v6 = _g[2];
				var v23 = this.mapVar(v6);
				var it1 = this.evalExpr(it);
				var e17;
				{
					var _g125 = it1.e;
					switch(_g125[1]) {
					case 5:
						switch(_g125[2][1]) {
						case 21:
							switch(_g125[3].e[1]) {
							case 0:
								switch(_g125[3].e[2][1]) {
								case 2:
									switch(_g125[4].e[1]) {
									case 0:
										switch(_g125[4].e[2][1]) {
										case 2:
											var start = _g125[3].e[2][2];
											var len = _g125[4].e[2][2];
											var out1 = [];
											var _g223 = start;
											while(_g223 < len) {
												var i4 = _g223++;
												var value = hxsl_TExprDef.TConst(hxsl_Const.CInt(i4));
												this.constants.set(v6,value);
												out1.push(this.evalExpr(loop));
											}
											this.constants.remove(v6);
											e17 = hxsl_TExprDef.TBlock(out1);
											break;
										default:
											e17 = hxsl_TExprDef.TFor(v23,it1,this.evalExpr(loop));
										}
										break;
									default:
										e17 = hxsl_TExprDef.TFor(v23,it1,this.evalExpr(loop));
									}
									break;
								default:
									e17 = hxsl_TExprDef.TFor(v23,it1,this.evalExpr(loop));
								}
								break;
							default:
								e17 = hxsl_TExprDef.TFor(v23,it1,this.evalExpr(loop));
							}
							break;
						default:
							e17 = hxsl_TExprDef.TFor(v23,it1,this.evalExpr(loop));
						}
						break;
					default:
						e17 = hxsl_TExprDef.TFor(v23,it1,this.evalExpr(loop));
					}
				}
				this.varMap.remove(v6);
				d = e17;
				break;
			case 17:
				var el3 = _g[2];
				d = hxsl_TExprDef.TArrayDecl((function($this) {
					var $r;
					var _g126 = [];
					{
						var _g224 = 0;
						while(_g224 < el3.length) {
							var e18 = el3[_g224];
							++_g224;
							_g126.push($this.evalExpr(e18));
						}
					}
					$r = _g126;
					return $r;
				}(this)));
				break;
			}
		}
		return { e : d, t : e.t, p : e.p};
	}
	,__class__: hxsl_Eval
};
var hxsl__$Flatten_Alloc = function(g,t,pos,size) {
	this.g = g;
	this.t = t;
	this.pos = pos;
	this.size = size;
};
$hxClasses["hxsl._Flatten.Alloc"] = hxsl__$Flatten_Alloc;
hxsl__$Flatten_Alloc.__name__ = true;
hxsl__$Flatten_Alloc.prototype = {
	__class__: hxsl__$Flatten_Alloc
};
var hxsl_Flatten = function() {
};
$hxClasses["hxsl.Flatten"] = hxsl_Flatten;
hxsl_Flatten.__name__ = true;
hxsl_Flatten.prototype = {
	flatten: function(s,kind,constsToGlobal) {
		this.globals = [];
		this.params = [];
		this.outVars = [];
		if(constsToGlobal) {
			this.consts = [];
			var p = s.funs[0].expr.p;
			var gc = { id : hxsl_Tools.allocVarId(), name : "__consts__", kind : hxsl_VarKind.Global, type : null};
			this.econsts = { e : hxsl_TExprDef.TVar(gc), t : null, p : p};
			s = { name : s.name, vars : s.vars.slice(), funs : (function($this) {
				var $r;
				var _g = [];
				{
					var _g1 = 0;
					var _g2 = s.funs;
					while(_g1 < _g2.length) {
						var f = _g2[_g1];
						++_g1;
						_g.push($this.mapFun(f,$bind($this,$this.mapConsts)));
					}
				}
				$r = _g;
				return $r;
			}(this))};
			var _g11 = 0;
			var _g21 = s.vars;
			while(_g11 < _g21.length) {
				var v = _g21[_g11];
				++_g11;
				{
					var _g3 = v.type;
					switch(_g3[1]) {
					case 9:
						this.allocConst(255,p);
						break;
					default:
					}
				}
			}
			if(this.consts.length > 0) {
				gc.type = this.econsts.t = hxsl_Type.TArray(hxsl_Type.TFloat,hxsl_SizeDecl.SConst(this.consts.length));
				s.vars.push(gc);
			}
		}
		this.varMap = new haxe_ds_ObjectMap();
		this.allocData = new haxe_ds_ObjectMap();
		var _g4 = 0;
		var _g12 = s.vars;
		while(_g4 < _g12.length) {
			var v1 = _g12[_g4];
			++_g4;
			this.gatherVar(v1);
		}
		var prefix;
		switch(kind[1]) {
		case 0:
			prefix = "vertex";
			break;
		case 1:
			prefix = "fragment";
			break;
		default:
			throw new js__$Boot_HaxeError("assert");
		}
		this.pack(prefix + "Globals",hxsl_VarKind.Global,this.globals,hxsl_VecType.VFloat);
		this.pack(prefix + "Params",hxsl_VarKind.Param,this.params,hxsl_VecType.VFloat);
		var allVars = this.globals.concat(this.params);
		var textures = this.packTextures(prefix + "Textures",allVars,hxsl_Type.TSampler2D).concat(this.packTextures(prefix + "TexturesCube",allVars,hxsl_Type.TSamplerCube));
		var funs;
		var _g5 = [];
		var _g13 = 0;
		var _g22 = s.funs;
		while(_g13 < _g22.length) {
			var f1 = _g22[_g13];
			++_g13;
			_g5.push(this.mapFun(f1,$bind(this,this.mapExpr)));
		}
		funs = _g5;
		var _g14 = 0;
		while(_g14 < textures.length) {
			var t = textures[_g14];
			++_g14;
			t.pos >>= 2;
		}
		return { name : s.name, vars : this.outVars, funs : funs};
	}
	,mapFun: function(f,mapExpr) {
		return { kind : f.kind, ret : f.ret, args : f.args, ref : f.ref, expr : mapExpr(f.expr)};
	}
	,mapExpr: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				var a = this.varMap.h[v.__id__];
				if(a == null) e = e; else e = this.access(a,v.type,e.p,(function(f,a1) {
					return function(a11,a2) {
						return f(a1,a11,a2);
					};
				})($bind(this,this.readIndex),a));
				break;
			case 16:
				switch(_g[2].e[1]) {
				case 1:
					var eindex = _g[3];
					var vp = _g[2].p;
					var v1 = _g[2].e[2];
					if(!(function($this) {
						var $r;
						var _g1 = eindex.e;
						$r = (function($this) {
							var $r;
							switch(_g1[1]) {
							case 0:
								$r = (function($this) {
									var $r;
									switch(_g1[2][1]) {
									case 2:
										$r = true;
										break;
									default:
										$r = false;
									}
									return $r;
								}($this));
								break;
							default:
								$r = false;
							}
							return $r;
						}($this));
						return $r;
					}(this))) {
						var a3 = this.varMap.h[v1.__id__];
						if(a3 == null) e = e; else {
							var _g11 = v1.type;
							switch(_g11[1]) {
							case 14:
								var t = _g11[2];
								var stride = this.varSize(t,a3.t);
								if(stride == 0 || (stride & 3) != 0) throw new js__$Boot_HaxeError(new hxsl_Error("Dynamic access to an Array which size is not 4 components-aligned is not allowed",e.p));
								stride >>= 2;
								eindex = this.mapExpr(eindex);
								var toInt = { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.ToInt), t : hxsl_Type.TFun([]), p : vp},[eindex]), t : hxsl_Type.TInt, p : vp};
								e = this.access(a3,t,vp,(function(f1,a4,a12,a21) {
									return function(a31,a41) {
										return f1(a4,a12,a21,a31,a41);
									};
								})($bind(this,this.readOffset),a3,stride,stride == 1?toInt:{ e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpMult,toInt,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(stride)), t : hxsl_Type.TInt, p : vp}), t : hxsl_Type.TInt, p : vp}));
								break;
							default:
								throw new js__$Boot_HaxeError("assert");
							}
						}
					} else e = hxsl_Tools.map(e,$bind(this,this.mapExpr));
					break;
				default:
					e = hxsl_Tools.map(e,$bind(this,this.mapExpr));
				}
				break;
			default:
				e = hxsl_Tools.map(e,$bind(this,this.mapExpr));
			}
		}
		return this.optimize(e);
	}
	,mapConsts: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 16:
				var eindex = _g[3];
				var eindex1 = _g[3];
				switch(_g[3].e[1]) {
				case 0:
					switch(_g[3].e[2][1]) {
					case 2:
						var ea = _g[2];
						return { e : hxsl_TExprDef.TArray(this.mapConsts(ea),eindex), t : e.t, p : e.p};
					default:
						var ea1 = _g[2];
						{
							var _g1 = ea1.t;
							switch(_g1[1]) {
							case 14:
								var t = _g1[2];
								var stride = this.varSize(t,hxsl_VecType.VFloat) >> 2;
								this.allocConst(stride,e.p);
								break;
							default:
							}
						}
					}
					break;
				default:
					var ea2 = _g[2];
					{
						var _g11 = ea2.t;
						switch(_g11[1]) {
						case 14:
							var t1 = _g11[2];
							var stride1 = this.varSize(t1,hxsl_VecType.VFloat) >> 2;
							this.allocConst(stride1,e.p);
							break;
						default:
						}
					}
				}
				break;
			case 5:
				switch(_g[2][1]) {
				case 1:
					switch(_g[4].t[1]) {
					case 8:
						this.allocConst(1,e.p);
						break;
					default:
					}
					break;
				default:
				}
				break;
			case 0:
				var c = _g[2];
				switch(c[1]) {
				case 3:
					var v = c[2];
					return this.allocConst(v,e.p);
				case 2:
					var v1 = c[2];
					return this.allocConst(v1,e.p);
				default:
					return e;
				}
				break;
			case 2:
				var g = _g[2];
				switch(g[1]) {
				case 52:
					this.allocConsts([1,255,65025,16581375],e.p);
					this.allocConsts([0.00392156862745098,0.00392156862745098,0.00392156862745098,0],e.p);
					break;
				case 53:
					this.allocConsts([1,0.00392156862745098,1.53787004998077679e-05,6.03086294110108446e-08],e.p);
					break;
				case 0:
					this.allocConst(Math.PI / 180,e.p);
					break;
				case 1:
					this.allocConst(180 / Math.PI,e.p);
					break;
				case 10:
					this.allocConst(0.6931471805599453,e.p);
					break;
				case 9:
					this.allocConst(1.4426950408889634,e.p);
					break;
				case 24:
					this.allocConst(1,e.p);
					break;
				case 55:
					this.allocConst(0.5,e.p);
					break;
				case 54:
					this.allocConst(1,e.p);
					this.allocConst(0.5,e.p);
					break;
				default:
				}
				break;
			case 8:
				switch(_g[2].e[1]) {
				case 2:
					switch(_g[2].e[2][1]) {
					case 40:
						switch(_g[3].length) {
						case 2:
							switch(_g[3][0].t[1]) {
							case 5:
								switch(_g[3][0].t[2]) {
								case 3:
									switch(_g[3][0].t[3][1]) {
									case 1:
										switch(_g[3][0].e[1]) {
										case 1:
											switch(_g[3][0].e[2].kind[1]) {
											case 0:case 2:case 1:case 3:
												switch(_g[3][1].e[1]) {
												case 0:
													switch(_g[3][1].e[2][1]) {
													case 2:
														switch(_g[3][1].e[2][2]) {
														case 1:
															return e;
														default:
														}
														break;
													default:
													}
													break;
												default:
												}
												break;
											default:
											}
											break;
										default:
										}
										break;
									default:
									}
									break;
								default:
								}
								break;
							default:
							}
							break;
						default:
						}
						break;
					default:
					}
					break;
				default:
				}
				break;
			default:
			}
		}
		return hxsl_Tools.map(e,$bind(this,this.mapConsts));
	}
	,allocConst: function(v,p) {
		var index = HxOverrides.indexOf(this.consts,v,0);
		if(index < 0) {
			index = this.consts.length;
			this.consts.push(v);
		}
		return { e : hxsl_TExprDef.TArray(this.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p};
	}
	,allocConsts: function(va,p) {
		var _g = this;
		var pad = va.length - 1 & 3;
		var index = -1;
		var _g1 = 0;
		var _g2 = this.consts.length - (va.length - 1);
		while(_g1 < _g2) {
			var i = _g1++;
			if(i >> 2 != i + pad >> 2) continue;
			var found = true;
			var _g3 = 0;
			var _g21 = va.length;
			while(_g3 < _g21) {
				var j = _g3++;
				if(this.consts[i + j] != va[j]) {
					found = false;
					break;
				}
			}
			if(found) {
				index = i;
				break;
			}
		}
		if(index < 0) {
			while(this.consts.length >> 2 != this.consts.length + pad >> 2) this.consts.push(0);
			index = this.consts.length;
			var _g4 = 0;
			while(_g4 < va.length) {
				var v = va[_g4];
				++_g4;
				this.consts.push(v);
			}
		}
		var _g5 = va.length;
		switch(_g5) {
		case 1:
			return { e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p};
		case 2:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Vec2), t : hxsl_Type.TVoid, p : p},[{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 1)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p}]), t : hxsl_Type.TVec(2,hxsl_VecType.VFloat), p : p};
		case 3:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Vec3), t : hxsl_Type.TVoid, p : p},[{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 1)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 2)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p}]), t : hxsl_Type.TVec(3,hxsl_VecType.VFloat), p : p};
		case 4:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Vec4), t : hxsl_Type.TVoid, p : p},[{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 1)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 3)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_g.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 4)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p}]), t : hxsl_Type.TVec(4,hxsl_VecType.VFloat), p : p};
		default:
			throw new js__$Boot_HaxeError("assert");
		}
	}
	,readIndex: function(a,index,pos) {
		return { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a.g), t : a.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt((a.pos >> 2) + index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a.t), p : pos};
	}
	,readOffset: function(a,stride,delta,index,pos) {
		var index1 = (a.pos >> 2) + index;
		var offset;
		if(index1 == 0) offset = delta; else offset = { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index1)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
		return { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a.g), t : a.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a.t), p : pos};
	}
	,access: function(a,t,pos,read) {
		switch(t[1]) {
		case 7:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mat4), t : hxsl_Type.TFun([]), p : pos},[read(0,pos),read(1,pos),read(2,pos),read(3,pos)]), t : hxsl_Type.TMat4, p : pos};
		case 8:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mat3x4), t : hxsl_Type.TFun([]), p : pos},[read(0,pos),read(1,pos),read(2,pos)]), t : hxsl_Type.TMat3x4, p : pos};
		case 6:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mat3), t : hxsl_Type.TFun([]), p : pos},[this.access(a,hxsl_Type.TMat3x4,pos,read)]), t : hxsl_Type.TMat3, p : pos};
		case 14:
			switch(t[3][1]) {
			case 0:
				var t1 = t[2];
				var len = t[3][2];
				var stride = a.size / len | 0;
				var earr;
				var _g = [];
				var _g1 = 0;
				while(_g1 < len) {
					var i = _g1++;
					_g.push((function($this) {
						var $r;
						var a1 = new hxsl__$Flatten_Alloc(a.g,a.t,a.pos + stride * i,stride);
						$r = $this.access(a1,t1,pos,(function(f,a2) {
							return function(a11,a21) {
								return f(a2,a11,a21);
							};
						})($bind($this,$this.readIndex),a1));
						return $r;
					}(this)));
				}
				earr = _g;
				return { e : hxsl_TExprDef.TArrayDecl(earr), t : t1, p : pos};
			default:
				var size = this.varSize(t,a.t);
				if(size <= 4) {
					var k = read(0,pos);
					if(size == 4) {
						if((a.pos & 3) != 0) throw new js__$Boot_HaxeError("assert");
						return k;
					} else {
						var sw = [];
						var _g2 = 0;
						while(_g2 < size) {
							var i1 = _g2++;
							sw.push(hxsl_Tools.SWIZ[i1 + (a.pos & 3)]);
						}
						return { e : hxsl_TExprDef.TSwiz(k,sw), t : t, p : pos};
					}
				}
				return hxsl_Error.t("Access not supported for " + hxsl_Tools.toString(t),null);
			}
			break;
		case 10:case 11:
			return read(0,pos);
		default:
			var size1 = this.varSize(t,a.t);
			if(size1 <= 4) {
				var k1 = read(0,pos);
				if(size1 == 4) {
					if((a.pos & 3) != 0) throw new js__$Boot_HaxeError("assert");
					return k1;
				} else {
					var sw1 = [];
					var _g3 = 0;
					while(_g3 < size1) {
						var i2 = _g3++;
						sw1.push(hxsl_Tools.SWIZ[i2 + (a.pos & 3)]);
					}
					return { e : hxsl_TExprDef.TSwiz(k1,sw1), t : t, p : pos};
				}
			}
			return hxsl_Error.t("Access not supported for " + hxsl_Tools.toString(t),null);
		}
	}
	,optimize: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 8:
				switch(_g[2].e[1]) {
				case 2:
					switch(_g[2].e[2][1]) {
					case 50:
						switch(_g[3].length) {
						case 1:
							switch(_g[3][0].e[1]) {
							case 8:
								switch(_g[3][0].e[2].e[1]) {
								case 2:
									switch(_g[3][0].e[2].e[2][1]) {
									case 49:
										var args = _g[3][0].e[3];
										var rem = 0;
										var size = 0;
										while(size < 4) {
											var t = args[args.length - 1 - rem].t;
											size += this.varSize(t,hxsl_VecType.VFloat);
											rem++;
										}
										if(size == 4) {
											var _g1 = 0;
											while(_g1 < rem) {
												var i = _g1++;
												args.pop();
											}
											var emat;
											{
												var _g11 = e.e;
												switch(_g11[1]) {
												case 8:
													var e1 = _g11[2];
													emat = e1;
													break;
												default:
													throw new js__$Boot_HaxeError("assert");
												}
											}
											return { e : hxsl_TExprDef.TCall(emat,args), t : e.t, p : e.p};
										}
										break;
									default:
									}
									break;
								default:
								}
								break;
							default:
							}
							break;
						default:
						}
						break;
					default:
					}
					break;
				default:
				}
				break;
			case 16:
				switch(_g[2].e[1]) {
				case 17:
					switch(_g[3].e[1]) {
					case 0:
						switch(_g[3].e[2][1]) {
						case 2:
							var el = _g[2].e[2];
							var i1 = _g[3].e[2][2];
							if(i1 >= 0 && i1 < el.length) return el[i1];
							hxsl_Error.t("Reading outside array bounds",e.p);
							break;
						default:
						}
						break;
					default:
					}
					break;
				default:
				}
				break;
			default:
			}
		}
		return e;
	}
	,packTextures: function(name,vars,t) {
		var alloc = [];
		var g = { id : hxsl_Tools.allocVarId(), name : name, type : t, kind : hxsl_VarKind.Param};
		var _g = 0;
		while(_g < vars.length) {
			var v = vars[_g];
			++_g;
			if(v.type != t) continue;
			var a = new hxsl__$Flatten_Alloc(g,null,alloc.length << 2,1);
			a.v = v;
			this.varMap.set(v,a);
			alloc.push(a);
		}
		g.type = hxsl_Type.TArray(t,hxsl_SizeDecl.SConst(alloc.length));
		if(alloc.length > 0) {
			this.outVars.push(g);
			this.allocData.set(g,alloc);
		}
		return alloc;
	}
	,pack: function(name,kind,vars,t) {
		var alloc = [];
		var apos = 0;
		var g = { id : hxsl_Tools.allocVarId(), name : name, type : hxsl_Type.TVec(0,t), kind : kind};
		var _g = 0;
		while(_g < vars.length) {
			var v = vars[_g];
			++_g;
			var _g1 = v.type;
			switch(_g1[1]) {
			case 10:case 11:
				continue;
				break;
			default:
			}
			var size = this.varSize(v.type,t);
			var best = null;
			var _g11 = 0;
			while(_g11 < alloc.length) {
				var a = alloc[_g11];
				++_g11;
				if(a.v == null && a.size >= size && (best == null || best.size > a.size)) best = a;
			}
			if(best != null) {
				var free = best.size - size;
				if(free > 0) {
					var i = Lambda.indexOf(alloc,best);
					var a1 = new hxsl__$Flatten_Alloc(g,t,best.pos + size,free);
					alloc.splice(i + 1,0,a1);
					best.size = size;
				}
				best.v = v;
				this.varMap.set(v,best);
			} else {
				var a2 = new hxsl__$Flatten_Alloc(g,t,apos,size);
				apos += size;
				a2.v = v;
				this.varMap.set(v,a2);
				alloc.push(a2);
				var pad = (4 - size % 4) % 4;
				if(pad > 0) {
					var a3 = new hxsl__$Flatten_Alloc(g,t,apos,pad);
					apos += pad;
					alloc.push(a3);
				}
			}
		}
		g.type = hxsl_Type.TArray(hxsl_Type.TVec(4,t),hxsl_SizeDecl.SConst(apos >> 2));
		if(apos > 0) {
			this.outVars.push(g);
			this.allocData.set(g,alloc);
		}
		return g;
	}
	,varSize: function(v,t) {
		switch(v[1]) {
		case 3:
			if(t == hxsl_VecType.VFloat) return 1; else throw new js__$Boot_HaxeError(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			break;
		case 5:
			var t2 = v[3];
			var n = v[2];
			if(t == t2) return n; else throw new js__$Boot_HaxeError(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			break;
		case 7:
			if(t == hxsl_VecType.VFloat) return 16; else throw new js__$Boot_HaxeError(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			break;
		case 8:
			if(t == hxsl_VecType.VFloat) return 12; else throw new js__$Boot_HaxeError(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			break;
		case 6:
			if(t == hxsl_VecType.VFloat) return 9; else throw new js__$Boot_HaxeError(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			break;
		case 14:
			switch(v[3][1]) {
			case 0:
				var at = v[2];
				var n1 = v[3][2];
				return this.varSize(at,t) * n1;
			default:
				throw new js__$Boot_HaxeError(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			}
			break;
		default:
			throw new js__$Boot_HaxeError(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
		}
	}
	,gatherVar: function(v) {
		{
			var _g = v.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				var _g1 = 0;
				while(_g1 < vl.length) {
					var v1 = vl[_g1];
					++_g1;
					this.gatherVar(v1);
				}
				break;
			default:
				var _g11 = v.kind;
				switch(_g11[1]) {
				case 0:
					if(hxsl_Tools.hasQualifier(v,hxsl_VarQualifier.PerObject)) this.params.push(v); else this.globals.push(v);
					break;
				case 2:
					this.params.push(v);
					break;
				default:
					this.outVars.push(v);
				}
			}
		}
	}
	,__class__: hxsl_Flatten
};
var hxsl_Globals = function() {
	this.map = new haxe_ds_IntMap();
};
$hxClasses["hxsl.Globals"] = hxsl_Globals;
hxsl_Globals.__name__ = true;
hxsl_Globals.allocID = function(path) {
	if(hxsl_Globals.MAP == null) {
		hxsl_Globals.MAP = new haxe_ds_StringMap();
		hxsl_Globals.ALL = [];
	}
	var id = hxsl_Globals.MAP.get(path);
	if(id == null) {
		id = hxsl_Globals.ALL.length;
		hxsl_Globals.ALL.push(path);
		hxsl_Globals.MAP.set(path,id);
	}
	return id;
};
hxsl_Globals.prototype = {
	set: function(path,v) {
		var key = hxsl_Globals.allocID(path);
		var value = v;
		this.map.set(key,value);
	}
	,fastSet: function(id,v) {
		var value = v;
		this.map.set(id,value);
	}
	,__class__: hxsl_Globals
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var hxsl_GlslOut = function() {
	this.varNames = new haxe_ds_IntMap();
	this.allNames = new haxe_ds_StringMap();
	this.flipY = true;
};
$hxClasses["hxsl.GlslOut"] = hxsl_GlslOut;
hxsl_GlslOut.__name__ = true;
hxsl_GlslOut.prototype = {
	add: function(v) {
		this.buf.add(v);
	}
	,decl: function(s) {
		var _g = 0;
		var _g1 = this.decls;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d == s) return;
		}
		this.decls.push(s);
	}
	,addType: function(t) {
		switch(t[1]) {
		case 0:
			this.buf.add("void");
			break;
		case 1:
			this.buf.add("int");
			break;
		case 9:
			var n = t[2];
			this.buf.add("vec");
			this.buf.add(n);
			break;
		case 2:
			this.buf.add("bool");
			break;
		case 3:
			this.buf.add("float");
			break;
		case 4:
			this.buf.add("string");
			break;
		case 5:
			var k = t[3];
			var size = t[2];
			switch(k[1]) {
			case 1:
				break;
			case 0:
				this.buf.add("i");
				break;
			case 2:
				this.buf.add("b");
				break;
			}
			this.buf.add("vec");
			this.buf.add(size);
			break;
		case 6:
			this.buf.add("mat3");
			break;
		case 7:
			this.buf.add("mat4");
			break;
		case 8:
			this.decl(hxsl_GlslOut.MAT34);
			this.buf.add("mat3x4");
			break;
		case 10:
			this.buf.add("sampler2D");
			break;
		case 11:
			this.buf.add("samplerCube");
			break;
		case 12:
			var vl = t[2];
			this.buf.add("struct { ");
			var _g = 0;
			while(_g < vl.length) {
				var v = vl[_g];
				++_g;
				this.addVar(v);
				this.buf.add(";");
			}
			this.buf.add(" }");
			break;
		case 13:
			this.buf.add("function");
			break;
		case 14:
			var size1 = t[3];
			var t1 = t[2];
			this.addType(t1);
			this.buf.add("[");
			switch(size1[1]) {
			case 1:
				var v1 = size1[2];
				this.add(this.varName(v1));
				break;
			case 0:
				var v2 = size1[2];
				this.buf.add(v2);
				break;
			}
			this.buf.add("]");
			break;
		}
	}
	,addVar: function(v) {
		{
			var _g = v.type;
			switch(_g[1]) {
			case 14:
				var size = _g[3];
				var t = _g[2];
				var old = v.type;
				v.type = t;
				this.addVar(v);
				v.type = old;
				this.buf.add("[");
				switch(size[1]) {
				case 1:
					var v1 = size[2];
					this.add(this.varName(v1));
					break;
				case 0:
					var n = size[2];
					this.buf.add(n);
					break;
				}
				this.buf.add("]");
				break;
			default:
				this.addType(v.type);
				this.buf.add(" ");
				this.add(this.varName(v));
			}
		}
	}
	,addValue: function(e,tabs) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 4:
				var el = _g[2];
				var name = "val" + this.exprValues.length;
				var tmp = this.buf;
				this.buf = new StringBuf();
				this.addType(e.t);
				this.buf.add(" ");
				this.buf.add(name);
				this.buf.add("(void)");
				var el2 = el.slice();
				var last = el2[el2.length - 1];
				el2[el2.length - 1] = { e : hxsl_TExprDef.TReturn(last), t : e.t, p : last.p};
				var e2 = { t : hxsl_Type.TVoid, e : hxsl_TExprDef.TBlock(el2), p : e.p};
				this.addExpr(e2,"");
				this.exprValues.push(this.buf.b);
				this.buf = tmp;
				this.buf.add(name);
				this.buf.add("()");
				break;
			default:
				this.addExpr(e,tabs);
			}
		}
	}
	,addExpr: function(e,tabs) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 0:
				var c = _g[2];
				switch(c[1]) {
				case 2:
					var v = c[2];
					this.buf.add(v);
					break;
				case 3:
					var f = c[2];
					var str = "" + f;
					this.buf.add(str);
					if(str.indexOf(".") == -1 && str.indexOf("e") == -1) this.buf.add(".");
					break;
				case 4:
					var v1 = c[2];
					this.buf.add("\"" + v1 + "\"");
					break;
				case 0:
					this.buf.add("null");
					break;
				case 1:
					var b = c[2];
					this.buf.add(b);
					break;
				}
				break;
			case 1:
				var v2 = _g[2];
				this.add(this.varName(v2));
				break;
			case 2:
				var g = _g[2];
				switch(g[1]) {
				case 50:
					this.decl(hxsl_GlslOut.MAT34);
					break;
				case 56:case 57:case 58:
					this.decl("#extension GL_OES_standard_derivatives:enable");
					break;
				case 52:
					this.decl("vec4 pack( float v ) { vec4 color = fract(v * vec4(1, 255, 255.*255., 255.*255.*255.)); return color - color.yzww * vec4(1. / 255., 1. / 255., 1. / 255., 0.); }");
					break;
				case 53:
					this.decl("float unpack( vec4 color ) { return dot(color,vec4(1., 1. / 255., 1. / (255. * 255.), 1. / (255. * 255. * 255.))); }");
					break;
				case 54:
					this.decl("vec4 packNormal( vec3 v ) { return vec4((v + vec3(1.)) * vec3(0.5),1.); }");
					break;
				case 55:
					this.decl("vec3 unpackNormal( vec4 v ) { return normalize((v.xyz - vec3(0.5)) * vec3(2.)); }");
					break;
				case 33:
					this.decl("vec4 _texture2D( sampler2D t, vec2 v ) { return texture2D(t,vec2(v.x," + (this.flipY?"0.999999-v.y":"v.y") + ")); }");
					break;
				default:
				}
				this.add(hxsl_GlslOut.GLOBALS.get(g));
				break;
			case 3:
				var e1 = _g[2];
				this.buf.add("(");
				this.addValue(e1,tabs);
				this.buf.add(")");
				break;
			case 4:
				var el = _g[2];
				this.buf.add("{\n");
				var t2 = tabs + "\t";
				var _g1 = 0;
				while(_g1 < el.length) {
					var e2 = el[_g1];
					++_g1;
					this.buf.add(t2);
					this.addExpr(e2,t2);
					this.buf.add(";\n");
				}
				this.buf.add(tabs);
				this.buf.add("}");
				break;
			case 5:
				var e21 = _g[4];
				var e11 = _g[3];
				var op = _g[2];
				{
					var _g11 = e11.t;
					var _g2 = e21.t;
					switch(op[1]) {
					case 1:
						switch(_g11[1]) {
						case 5:
							switch(_g11[2]) {
							case 3:
								switch(_g11[3][1]) {
								case 1:
									switch(_g2[1]) {
									case 8:
										this.decl(hxsl_GlslOut.MAT34);
										this.decl("vec3 m3x4mult( vec3 v, mat3x4 m) { vec4 ve = vec4(v,1.0); return vec3(dot(m.a,ve),dot(m.b,ve),dot(m.c,ve)); }");
										this.buf.add("m3x4mult(");
										this.addValue(e11,tabs);
										this.buf.add(",");
										this.addValue(e21,tabs);
										this.buf.add(")");
										break;
									default:
										this.addValue(e11,tabs);
										this.buf.add(" ");
										this.add(hxsl_Printer.opStr(op));
										this.buf.add(" ");
										this.addValue(e21,tabs);
									}
									break;
								default:
									this.addValue(e11,tabs);
									this.buf.add(" ");
									this.add(hxsl_Printer.opStr(op));
									this.buf.add(" ");
									this.addValue(e21,tabs);
								}
								break;
							default:
								this.addValue(e11,tabs);
								this.buf.add(" ");
								this.add(hxsl_Printer.opStr(op));
								this.buf.add(" ");
								this.addValue(e21,tabs);
							}
							break;
						default:
							this.addValue(e11,tabs);
							this.buf.add(" ");
							this.add(hxsl_Printer.opStr(op));
							this.buf.add(" ");
							this.addValue(e21,tabs);
						}
						break;
					default:
						this.addValue(e11,tabs);
						this.buf.add(" ");
						this.add(hxsl_Printer.opStr(op));
						this.buf.add(" ");
						this.addValue(e21,tabs);
					}
				}
				break;
			case 6:
				var e12 = _g[3];
				var op1 = _g[2];
				this.buf.add((function($this) {
					var $r;
					switch(op1[1]) {
					case 2:
						$r = "!";
						break;
					case 3:
						$r = "-";
						break;
					case 0:
						$r = "++";
						break;
					case 1:
						$r = "--";
						break;
					case 4:
						$r = "~";
						break;
					}
					return $r;
				}(this)));
				this.addValue(e12,tabs);
				break;
			case 7:
				var init = _g[3];
				var v3 = _g[2];
				this.locals.push(v3);
				if(init != null) {
					this.add(this.varName(v3));
					this.buf.add(" = ");
					this.addValue(init,tabs);
				} else this.buf.add("/*var*/");
				break;
			case 8:
				var e3 = _g[2];
				switch(_g[2].e[1]) {
				case 2:
					switch(_g[2].e[2][1]) {
					case 48:
						var args = _g[3];
						switch(_g[3].length) {
						case 1:
							var e4 = _g[3][0];
							if(e4.t == hxsl_Type.TMat3x4) {
								this.decl("mat3 _mat3( mat3x4 v ) { return mat3(v.a.xyz,v.b.xyz,v.c.xyz); }");
								this.buf.add("_mat3(");
								this.addValue(e4,tabs);
								this.buf.add(")");
							} else {
								this.addValue(e3,tabs);
								this.buf.add("(");
								var first = true;
								var _g12 = 0;
								while(_g12 < args.length) {
									var e5 = args[_g12];
									++_g12;
									if(first) first = false; else this.buf.add(", ");
									this.addValue(e5,tabs);
								}
								this.buf.add(")");
							}
							break;
						default:
							this.addValue(e3,tabs);
							this.buf.add("(");
							var first1 = true;
							var _g13 = 0;
							while(_g13 < args.length) {
								var e6 = args[_g13];
								++_g13;
								if(first1) first1 = false; else this.buf.add(", ");
								this.addValue(e6,tabs);
							}
							this.buf.add(")");
						}
						break;
					case 51:
						var args1 = _g[3];
						switch(_g[3].length) {
						case 1:
							var e7 = _g[3][0];
							this.buf.add("clamp(");
							this.addValue(e7,tabs);
							this.buf.add(", 0., 1.)");
							break;
						default:
							this.addValue(e3,tabs);
							this.buf.add("(");
							var first2 = true;
							var _g14 = 0;
							while(_g14 < args1.length) {
								var e8 = args1[_g14];
								++_g14;
								if(first2) first2 = false; else this.buf.add(", ");
								this.addValue(e8,tabs);
							}
							this.buf.add(")");
						}
						break;
					default:
						var args2 = _g[3];
						this.addValue(e3,tabs);
						this.buf.add("(");
						var first3 = true;
						var _g15 = 0;
						while(_g15 < args2.length) {
							var e9 = args2[_g15];
							++_g15;
							if(first3) first3 = false; else this.buf.add(", ");
							this.addValue(e9,tabs);
						}
						this.buf.add(")");
					}
					break;
				default:
					var args3 = _g[3];
					this.addValue(e3,tabs);
					this.buf.add("(");
					var first4 = true;
					var _g16 = 0;
					while(_g16 < args3.length) {
						var e10 = args3[_g16];
						++_g16;
						if(first4) first4 = false; else this.buf.add(", ");
						this.addValue(e10,tabs);
					}
					this.buf.add(")");
				}
				break;
			case 9:
				var regs = _g[3];
				var e13 = _g[2];
				var _g17 = e13.t;
				switch(_g17[1]) {
				case 3:
					var _g21 = 0;
					while(_g21 < regs.length) {
						var r = regs[_g21];
						++_g21;
						if(r != hxsl_Component.X) throw new js__$Boot_HaxeError("assert");
					}
					var _g22 = regs.length;
					switch(_g22) {
					case 1:
						this.addValue(e13,tabs);
						break;
					case 2:
						this.decl("vec2 _vec2( float v ) { return vec2(v,v); }");
						this.buf.add("_vec2(");
						this.addValue(e13,tabs);
						this.buf.add(")");
						break;
					case 3:
						this.decl("vec3 _vec3( float v ) { return vec3(v,v,v); }");
						this.buf.add("_vec3(");
						this.addValue(e13,tabs);
						this.buf.add(")");
						break;
					case 4:
						this.decl("vec4 _vec4( float v ) { return vec4(v,v,v,v); }");
						this.buf.add("_vec4(");
						this.addValue(e13,tabs);
						this.buf.add(")");
						break;
					default:
						throw new js__$Boot_HaxeError("assert");
					}
					break;
				default:
					this.addValue(e13,tabs);
					this.buf.add(".");
					var _g23 = 0;
					while(_g23 < regs.length) {
						var r1 = regs[_g23];
						++_g23;
						this.buf.add((function($this) {
							var $r;
							switch(r1[1]) {
							case 0:
								$r = "x";
								break;
							case 1:
								$r = "y";
								break;
							case 2:
								$r = "z";
								break;
							case 3:
								$r = "w";
								break;
							}
							return $r;
						}(this)));
					}
				}
				break;
			case 10:
				var eelse = _g[4];
				var eif = _g[3];
				var econd = _g[2];
				this.buf.add("if( ");
				this.addValue(econd,tabs);
				this.buf.add(") ");
				this.addExpr(eif,tabs);
				if(eelse != null) {
					this.buf.add(" else ");
					this.addExpr(eelse,tabs);
				}
				break;
			case 11:
				this.buf.add("discard");
				break;
			case 12:
				var e14 = _g[2];
				if(e14 == null) this.buf.add("return"); else {
					this.buf.add("return ");
					this.addValue(e14,tabs);
				}
				break;
			case 13:
				var loop = _g[4];
				var it = _g[3];
				var v4 = _g[2];
				this.buf.add("for(...)");
				break;
			case 14:
				this.buf.add("continue");
				break;
			case 15:
				this.buf.add("break");
				break;
			case 16:
				var index = _g[3];
				var e15 = _g[2];
				this.addValue(e15,tabs);
				this.buf.add("[");
				this.addValue(index,tabs);
				this.buf.add("]");
				break;
			case 17:
				var el1 = _g[2];
				this.buf.add("[");
				var first5 = true;
				var _g18 = 0;
				while(_g18 < el1.length) {
					var e16 = el1[_g18];
					++_g18;
					if(first5) first5 = false; else this.buf.add(", ");
					this.addValue(e16,tabs);
				}
				this.buf.add("]");
				break;
			}
		}
	}
	,varName: function(v) {
		if(v.kind == hxsl_VarKind.Output) if(this.isVertex) return "gl_Position"; else return "gl_FragColor";
		var n = this.varNames.h[v.id];
		if(n != null) return n;
		n = v.name;
		if(hxsl_GlslOut.KWDS.exists(n)) n = "_" + n;
		if(this.allNames.exists(n)) {
			var k = 2;
			n += "_";
			while(this.allNames.exists(n + k)) k++;
			n += k;
		}
		this.varNames.h[v.id] = n;
		this.allNames.set(n,v.id);
		return n;
	}
	,run: function(s) {
		this.locals = [];
		this.decls = [];
		this.buf = new StringBuf();
		this.exprValues = [];
		this.decls.push("precision mediump float;");
		if(s.funs.length != 1) throw new js__$Boot_HaxeError("assert");
		var f = s.funs[0];
		this.isVertex = f.kind == hxsl_FunctionKind.Vertex;
		var _g = 0;
		var _g1 = s.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			var _g2 = v.kind;
			switch(_g2[1]) {
			case 2:case 0:
				this.buf.add("uniform ");
				break;
			case 1:
				this.buf.add("attribute ");
				break;
			case 3:
				this.buf.add("varying ");
				break;
			case 6:case 5:
				continue;
				break;
			case 4:
				break;
			}
			if(v.qualifiers != null) {
				var _g21 = 0;
				var _g3 = v.qualifiers;
				while(_g21 < _g3.length) {
					var q = _g3[_g21];
					++_g21;
					switch(q[1]) {
					case 6:
						var p = q[2];
						switch(p[1]) {
						case 0:
							this.buf.add("lowp ");
							break;
						case 1:
							this.buf.add("mediump ");
							break;
						case 2:
							this.buf.add("highp ");
							break;
						}
						break;
					default:
					}
				}
			}
			this.addVar(v);
			this.buf.add(";\n");
		}
		this.buf.add("\n");
		var tmp = this.buf;
		this.buf = new StringBuf();
		this.buf.add("void main(void) {\n");
		{
			var _g4 = f.expr.e;
			switch(_g4[1]) {
			case 4:
				var el = _g4[2];
				var _g11 = 0;
				while(_g11 < el.length) {
					var e = el[_g11];
					++_g11;
					this.buf.add("\t");
					this.addExpr(e,"\t");
					this.buf.add(";\n");
				}
				break;
			default:
				this.addExpr(f.expr,"");
			}
		}
		this.buf.add("}");
		this.exprValues.push(this.buf.b);
		this.buf = tmp;
		var _g5 = 0;
		var _g12 = this.locals;
		while(_g5 < _g12.length) {
			var v1 = _g12[_g5];
			++_g5;
			this.addVar(v1);
			this.buf.add(";\n");
		}
		this.buf.add("\n");
		var _g6 = 0;
		var _g13 = this.exprValues;
		while(_g6 < _g13.length) {
			var e1 = _g13[_g6];
			++_g6;
			this.buf.add(e1);
			this.buf.add("\n\n");
		}
		this.decls.push(this.buf.b);
		this.buf = null;
		return this.decls.join("\n");
	}
	,__class__: hxsl_GlslOut
};
var hxsl__$Linker_AllocatedVar = function() {
};
$hxClasses["hxsl._Linker.AllocatedVar"] = hxsl__$Linker_AllocatedVar;
hxsl__$Linker_AllocatedVar.__name__ = true;
hxsl__$Linker_AllocatedVar.prototype = {
	__class__: hxsl__$Linker_AllocatedVar
};
var hxsl__$Linker_ShaderInfos = function(n,v) {
	this.name = n;
	this.vertex = v;
	this.processed = new haxe_ds_IntMap();
	this.usedFunctions = [];
	this.read = new haxe_ds_IntMap();
	this.write = new haxe_ds_IntMap();
};
$hxClasses["hxsl._Linker.ShaderInfos"] = hxsl__$Linker_ShaderInfos;
hxsl__$Linker_ShaderInfos.__name__ = true;
hxsl__$Linker_ShaderInfos.prototype = {
	__class__: hxsl__$Linker_ShaderInfos
};
var hxsl_Linker = function() {
};
$hxClasses["hxsl.Linker"] = hxsl_Linker;
hxsl_Linker.__name__ = true;
hxsl_Linker.prototype = {
	error: function(msg,p) {
		return hxsl_Error.t(msg,p);
	}
	,mergeVar: function(path,v,v2,p) {
		var _g = v.kind;
		switch(_g[1]) {
		case 0:case 1:case 3:case 4:case 5:
			break;
		case 2:case 6:
			throw new js__$Boot_HaxeError("assert");
			break;
		}
		if(v.kind != v2.kind && v.kind != hxsl_VarKind.Local && v2.kind != hxsl_VarKind.Local) this.error("'" + path + "' kind does not match : " + Std.string(v.kind) + " should be " + Std.string(v2.kind),p);
		{
			var _g1 = v.type;
			var _g11 = v2.type;
			switch(_g1[1]) {
			case 12:
				switch(_g11[1]) {
				case 12:
					var fl1 = _g1[2];
					var fl2 = _g11[2];
					var _g2 = 0;
					while(_g2 < fl1.length) {
						var f1 = fl1[_g2];
						++_g2;
						var ft = null;
						var _g3 = 0;
						while(_g3 < fl2.length) {
							var f2 = fl2[_g3];
							++_g3;
							if(f1.name == f2.name) {
								ft = f2;
								break;
							}
						}
						if(ft == null) fl2.push(this.allocVar(f1,p).v); else this.mergeVar(path + "." + ft.name,f1,ft,p);
					}
					break;
				default:
					if(!Type.enumEq(v.type,v2.type)) this.error("'" + path + "' type does not match : " + hxsl_Tools.toString(v.type) + " should be " + hxsl_Tools.toString(v2.type),p);
				}
				break;
			default:
				if(!Type.enumEq(v.type,v2.type)) this.error("'" + path + "' type does not match : " + hxsl_Tools.toString(v.type) + " should be " + hxsl_Tools.toString(v2.type),p);
			}
		}
	}
	,allocVar: function(v,p,path,parent) {
		if(v.parent != null && parent == null) {
			parent = this.allocVar(v.parent,p);
			var p1 = parent.v;
			path = p1.name;
			p1 = p1.parent;
			while(p1 != null) {
				path = p1.name + "." + path;
				p1 = p1.parent;
			}
		}
		var key;
		if(path == null) key = v.name; else key = path + "." + v.name;
		if(v.qualifiers != null) {
			var _g = 0;
			var _g1 = v.qualifiers;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				switch(q[1]) {
				case 4:
					var n = q[2];
					key = n;
					break;
				default:
				}
			}
		}
		var v2 = this.varMap.get(key);
		var vname = v.name;
		if(v2 != null) {
			var _g2 = 0;
			var _g11 = v2.merged;
			while(_g2 < _g11.length) {
				var vm = _g11[_g2];
				++_g2;
				if(vm == v) return v2;
			}
			if(v.kind == hxsl_VarKind.Param && !hxsl_Tools.hasQualifier(v,hxsl_VarQualifier.Shared) || v.kind == hxsl_VarKind.Function || v.kind == hxsl_VarKind.Var && hxsl_Tools.hasQualifier(v,hxsl_VarQualifier.Private) || (function($this) {
				var $r;
				var v1 = v2.v;
				$r = v1.kind == hxsl_VarKind.Param && !hxsl_Tools.hasQualifier(v1,hxsl_VarQualifier.Shared) || v1.kind == hxsl_VarKind.Function || v1.kind == hxsl_VarKind.Var && hxsl_Tools.hasQualifier(v1,hxsl_VarQualifier.Private);
				return $r;
			}(this)) || v.kind == hxsl_VarKind.Param && v2.v.kind == hxsl_VarKind.Param) {
				var k = 2;
				while(true) {
					var a1 = this.varMap.get(key + k);
					if(a1 == null) break;
					var _g3 = 0;
					var _g12 = a1.merged;
					while(_g3 < _g12.length) {
						var vm1 = _g12[_g3];
						++_g3;
						if(vm1 == v) return a1;
					}
					k++;
				}
				vname += k;
				key += k;
			} else {
				v2.merged.push(v);
				this.mergeVar(key,v,v2.v,p);
				this.varIdMap.h[v.id] = v2.id;
				return v2;
			}
		}
		var vid = this.allVars.length + 1;
		var v21 = { id : vid, name : vname, type : v.type, kind : v.kind == hxsl_VarKind.Output?hxsl_VarKind.Local:v.kind, qualifiers : v.qualifiers, parent : parent == null?null:parent.v};
		var a = new hxsl__$Linker_AllocatedVar();
		a.v = v21;
		a.merged = [v];
		a.path = key;
		a.id = vid;
		a.parent = parent;
		a.instanceIndex = this.curInstance;
		this.allVars.push(a);
		this.varMap.set(key,a);
		{
			var _g4 = v21.type;
			switch(_g4[1]) {
			case 12:
				var vl = _g4[2];
				v21.type = hxsl_Type.TStruct((function($this) {
					var $r;
					var _g13 = [];
					{
						var _g21 = 0;
						while(_g21 < vl.length) {
							var v3 = vl[_g21];
							++_g21;
							_g13.push($this.allocVar(v3,p,key,a).v);
						}
					}
					$r = _g13;
					return $r;
				}(this)));
				break;
			default:
			}
		}
		return a;
	}
	,mapExprVar: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				if(!this.locals.h.hasOwnProperty(v.id)) {
					var v1 = this.allocVar(v,e.p);
					if(this.curShader != null && !this.curShader.write.h.hasOwnProperty(v1.id)) {
						this.curShader.read.h[v1.id] = v1;
						if(this.curShader.vertex == null && v1.v.kind == hxsl_VarKind.Var) this.curShader.vertex = false;
					}
					return { e : hxsl_TExprDef.TVar(v1.v), t : v1.v.type, p : e.p};
				} else {
				}
				break;
			case 5:
				var e2 = _g[4];
				var e1 = _g[3];
				var op = _g[2];
				{
					var _g1 = e1.e;
					switch(op[1]) {
					case 4:
						switch(_g1[1]) {
						case 1:
							var v2 = _g1[2];
							if(!this.locals.h.hasOwnProperty(v2.id)) {
								var e21 = this.mapExprVar(e2);
								var v3 = this.allocVar(v2,e1.p);
								if(this.curShader != null) this.curShader.write.h[v3.id] = v3;
								return { e : hxsl_TExprDef.TBinop(op,{ e : hxsl_TExprDef.TVar(v3.v), t : v3.v.type, p : e.p},e21), t : e.t, p : e.p};
							} else {
								var v4 = _g1[2];
								if(!this.locals.h.hasOwnProperty(v4.id)) {
									var e11 = this.mapExprVar(e1);
									var e22 = this.mapExprVar(e2);
									var v5 = this.allocVar(v4,e11.p);
									if(this.curShader != null) this.curShader.write.h[v5.id] = v5;
									return { e : hxsl_TExprDef.TBinop(op,e11,e22), t : e.t, p : e.p};
								} else {
								}
							}
							break;
						case 9:
							switch(_g1[2].e[1]) {
							case 1:
								var v6 = _g1[2].e[2];
								if(!this.locals.h.hasOwnProperty(v6.id)) {
									var e12 = this.mapExprVar(e1);
									var e23 = this.mapExprVar(e2);
									var v7 = this.allocVar(v6,e12.p);
									if(this.curShader != null) this.curShader.write.h[v7.id] = v7;
									return { e : hxsl_TExprDef.TBinop(op,e12,e23), t : e.t, p : e.p};
								} else {
								}
								break;
							default:
							}
							break;
						default:
						}
						break;
					case 20:
						switch(_g1[1]) {
						case 1:
							var v8 = _g1[2];
							if(!this.locals.h.hasOwnProperty(v8.id)) {
								var e13 = this.mapExprVar(e1);
								var e24 = this.mapExprVar(e2);
								var v9 = this.allocVar(v8,e13.p);
								if(this.curShader != null) this.curShader.write.h[v9.id] = v9;
								return { e : hxsl_TExprDef.TBinop(op,e13,e24), t : e.t, p : e.p};
							} else {
							}
							break;
						case 9:
							switch(_g1[2].e[1]) {
							case 1:
								var v10 = _g1[2].e[2];
								if(!this.locals.h.hasOwnProperty(v10.id)) {
									var e14 = this.mapExprVar(e1);
									var e25 = this.mapExprVar(e2);
									var v11 = this.allocVar(v10,e14.p);
									if(this.curShader != null) this.curShader.write.h[v11.id] = v11;
									return { e : hxsl_TExprDef.TBinop(op,e14,e25), t : e.t, p : e.p};
								} else {
								}
								break;
							default:
							}
							break;
						default:
						}
						break;
					default:
					}
				}
				break;
			case 11:
				if(this.curShader != null) {
					this.curShader.vertex = false;
					this.curShader.hasDiscard = true;
				}
				break;
			case 7:
				var v12 = _g[2];
				this.locals.h[v12.id] = true;
				break;
			default:
			}
		}
		return hxsl_Tools.map(e,$bind(this,this.mapExprVar));
	}
	,addShader: function(name,vertex,e,p) {
		var s = new hxsl__$Linker_ShaderInfos(name,vertex);
		this.curShader = s;
		s.priority = p;
		s.body = this.mapExprVar(e);
		this.shaders.push(s);
		this.curShader = null;
		return s;
	}
	,sortByPriorityDesc: function(s1,s2) {
		return s2.priority - s1.priority;
	}
	,buildDependency: function(parent,v,isWritten) {
		var found = !isWritten;
		var _g = 0;
		var _g1 = this.shaders;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(parent == s) {
				found = true;
				continue;
			} else if(!found) continue;
			if(!s.write.h.hasOwnProperty(v.id)) continue;
			if(parent.vertex && s.vertex == false) continue;
			parent.deps.set(s,true);
			this.initDependencies(s);
			if(!s.read.h.hasOwnProperty(v.id)) return;
		}
		if(v.v.kind == hxsl_VarKind.Var) this.error("Variable " + v.path + " required by " + parent.name + " is missing initializer",null);
	}
	,initDependencies: function(s) {
		if(s.deps != null) return;
		s.deps = new haxe_ds_ObjectMap();
		var $it0 = s.read.iterator();
		while( $it0.hasNext() ) {
			var r = $it0.next();
			this.buildDependency(s,r,s.write.h.hasOwnProperty(r.id));
		}
		if(s.vertex == null) {
			var $it1 = s.deps.keys();
			while( $it1.hasNext() ) {
				var d = $it1.next();
				if(d.vertex == false) {
					s.vertex = false;
					break;
				}
			}
		}
	}
	,collect: function(cur,out,vertex) {
		if(cur.onStack) this.error("Loop in shader dependencies (" + cur.name + ")",null);
		if(cur.marked == vertex) return;
		cur.marked = vertex;
		cur.onStack = true;
		var deps;
		var _g = [];
		var $it0 = cur.deps.keys();
		while( $it0.hasNext() ) {
			var d = $it0.next();
			_g.push(d);
		}
		deps = _g;
		deps.sort($bind(this,this.sortByPriorityDesc));
		var _g1 = 0;
		while(_g1 < deps.length) {
			var d1 = deps[_g1];
			++_g1;
			this.collect(d1,out,vertex);
		}
		if(cur.vertex == null) cur.vertex = vertex;
		if(cur.vertex == vertex) out.push(cur);
		cur.onStack = false;
	}
	,uniqueLocals: function(expr,locals) {
		{
			var _g = expr.e;
			switch(_g[1]) {
			case 7:
				var v = _g[2];
				if(locals.exists(v.name)) {
					var k = 2;
					while(locals.exists(v.name + k)) k++;
					v.name += k;
				}
				locals.set(v.name,true);
				break;
			case 4:
				var el = _g[2];
				var locals1;
				var _g1 = new haxe_ds_StringMap();
				var $it0 = locals.keys();
				while( $it0.hasNext() ) {
					var k1 = $it0.next();
					if(__map_reserved[k1] != null) _g1.setReserved(k1,true); else _g1.h[k1] = true;
				}
				locals1 = _g1;
				var _g2 = 0;
				while(_g2 < el.length) {
					var e = el[_g2];
					++_g2;
					this.uniqueLocals(e,locals1);
				}
				break;
			default:
				hxsl_Tools.iter(expr,(function(f,a2) {
					return function(a1) {
						f(a1,a2);
					};
				})($bind(this,this.uniqueLocals),locals));
			}
		}
	}
	,link: function(shadersData,outVars) {
		var _g1 = this;
		this.varMap = new haxe_ds_StringMap();
		this.varIdMap = new haxe_ds_IntMap();
		this.allVars = [];
		this.shaders = [];
		this.locals = new haxe_ds_IntMap();
		var dupShaders = new haxe_ds_ObjectMap();
		var _g = [];
		var _g12 = 0;
		while(_g12 < shadersData.length) {
			var s1 = shadersData[_g12];
			++_g12;
			_g.push((function($this) {
				var $r;
				var s2 = s1;
				var sreal = s2;
				if(dupShaders.h.__keys__[s2.__id__] != null) s2 = hxsl_Clone.shaderData(s2);
				dupShaders.set(s2,sreal);
				$r = s2;
				return $r;
			}(this)));
		}
		shadersData = _g;
		this.curInstance = 0;
		var _g13 = 0;
		while(_g13 < shadersData.length) {
			var s3 = shadersData[_g13];
			++_g13;
			var _g21 = 0;
			var _g31 = s3.vars;
			while(_g21 < _g31.length) {
				var v2 = _g31[_g21];
				++_g21;
				this.allocVar(v2,null);
			}
			var _g22 = 0;
			var _g32 = s3.funs;
			while(_g22 < _g32.length) {
				var f1 = _g32[_g22];
				++_g22;
				var v3 = this.allocVar(f1.ref,f1.expr.p);
				v3.kind = f1.kind;
			}
			this.curInstance++;
		}
		var priority = 0;
		var _g14 = 0;
		while(_g14 < shadersData.length) {
			var s4 = shadersData[_g14];
			++_g14;
			var _g23 = 0;
			var _g33 = s4.funs;
			while(_g23 < _g33.length) {
				var f2 = _g33[_g23];
				++_g23;
				var v4 = this.allocVar(f2.ref,f2.expr.p);
				if(v4.kind == null) throw new js__$Boot_HaxeError("assert");
				var _g4 = v4.kind;
				if(_g4 != null) switch(_g4[1]) {
				case 0:case 1:
					this.addShader(s4.name + "." + (v4.kind == hxsl_FunctionKind.Vertex?"vertex":"fragment"),v4.kind == hxsl_FunctionKind.Vertex,f2.expr,priority);
					break;
				case 2:
					{
						var _g5 = f2.expr.e;
						switch(_g5[1]) {
						case 4:
							var el1 = _g5[2];
							var index = 0;
							var priority1 = -el1.length;
							var _g6 = 0;
							while(_g6 < el1.length) {
								var e1 = el1[_g6];
								++_g6;
								this.addShader(s4.name + ".__init__" + index++,null,e1,priority1++);
							}
							break;
						default:
							this.addShader(s4.name + ".__init__",null,f2.expr,-1);
						}
					}
					break;
				case 3:
					throw new js__$Boot_HaxeError("Unexpected helper function in linker " + v4.v.name);
					break;
				}
			}
			priority++;
		}
		this.shaders.sort($bind(this,this.sortByPriorityDesc));
		var entry = new hxsl__$Linker_ShaderInfos("<entry>",false);
		entry.deps = new haxe_ds_ObjectMap();
		var _g15 = 0;
		while(_g15 < outVars.length) {
			var outVar = outVars[_g15];
			++_g15;
			var v5 = this.varMap.get(outVar);
			if(v5 == null) throw new js__$Boot_HaxeError("Variable not found " + outVar);
			v5.v.kind = hxsl_VarKind.Output;
			this.buildDependency(entry,v5,false);
		}
		var _g16 = 0;
		var _g24 = this.shaders;
		while(_g16 < _g24.length) {
			var s5 = _g24[_g16];
			++_g16;
			if(s5.hasDiscard) {
				this.initDependencies(s5);
				entry.deps.set(s5,true);
			}
		}
		var v = [];
		var f = [];
		this.collect(entry,v,true);
		this.collect(entry,f,false);
		if(f.pop() != entry) throw new js__$Boot_HaxeError("assert");
		var _g17 = 0;
		var _g25 = this.shaders;
		while(_g17 < _g25.length) {
			var s6 = _g25[_g17];
			++_g17;
			s6.marked = null;
		}
		var _g18 = 0;
		var _g26 = v.concat(f);
		while(_g18 < _g26.length) {
			var s7 = _g26[_g18];
			++_g18;
			var $it0 = s7.deps.keys();
			while( $it0.hasNext() ) {
				var d = $it0.next();
				if(d.marked == null) this.error(d.name + " needed by " + s7.name + " is unreachable",null);
			}
			s7.marked = true;
		}
		var outVars1 = [];
		var varMap = new haxe_ds_IntMap();
		var addVar;
		var addVar1 = null;
		addVar1 = function(v6) {
			if(varMap.h.hasOwnProperty(v6.id)) return;
			varMap.h[v6.id] = true;
			if(v6.v.parent != null) addVar1(v6.parent); else outVars1.push(v6.v);
		};
		addVar = addVar1;
		var _g19 = 0;
		var _g27 = v.concat(f);
		while(_g19 < _g27.length) {
			var s8 = _g27[_g19];
			++_g19;
			var $it1 = s8.read.iterator();
			while( $it1.hasNext() ) {
				var v7 = $it1.next();
				addVar(v7);
			}
			var $it2 = s8.write.iterator();
			while( $it2.hasNext() ) {
				var v8 = $it2.next();
				addVar(v8);
			}
		}
		var cleanVar;
		var cleanVar1 = null;
		cleanVar1 = function(v9) {
			{
				var _g110 = v9.type;
				switch(_g110[1]) {
				case 12:
					var vl = _g110[2];
					if(v9.kind != hxsl_VarKind.Input) {
						var vout = [];
						var _g28 = 0;
						while(_g28 < vl.length) {
							var v10 = vl[_g28];
							++_g28;
							if(varMap.h.hasOwnProperty(v10.id)) {
								cleanVar1(v10);
								vout.push(v10);
							}
						}
						v9.type = hxsl_Type.TStruct(vout);
					} else {
					}
					break;
				default:
				}
			}
		};
		cleanVar = cleanVar1;
		var _g111 = 0;
		while(_g111 < outVars1.length) {
			var v11 = outVars1[_g111];
			++_g111;
			cleanVar(v11);
		}
		var build = function(kind,name,a) {
			var v1 = { id : hxsl_Tools.allocVarId(), name : name, type : hxsl_Type.TFun([{ ret : hxsl_Type.TVoid, args : []}]), kind : hxsl_VarKind.Function};
			outVars1.push(v1);
			var exprs = [];
			var _g11 = 0;
			while(_g11 < a.length) {
				var s = a[_g11];
				++_g11;
				{
					var _g2 = s.body.e;
					switch(_g2[1]) {
					case 4:
						var el = _g2[2];
						var _g3 = 0;
						while(_g3 < el.length) {
							var e = el[_g3];
							++_g3;
							exprs.push(e);
						}
						break;
					default:
						exprs.push(s.body);
					}
				}
			}
			var expr = { e : hxsl_TExprDef.TBlock(exprs), t : hxsl_Type.TVoid, p : exprs.length == 0?null:exprs[0].p};
			_g1.uniqueLocals(expr,new haxe_ds_StringMap());
			return { kind : kind, ref : v1, ret : hxsl_Type.TVoid, args : [], expr : expr};
		};
		var funs = [build(hxsl_FunctionKind.Vertex,"vertex",v),build(hxsl_FunctionKind.Fragment,"fragment",f)];
		var $it3 = dupShaders.keys();
		while( $it3.hasNext() ) {
			var s9 = $it3.next();
			var sreal1 = dupShaders.h[s9.__id__];
			if(s9 == sreal1) continue;
			var _g29 = 0;
			var _g112 = s9.vars.length;
			while(_g29 < _g112) {
				var i = _g29++;
				this.allocVar(s9.vars[i],null).merged.unshift(sreal1.vars[i]);
			}
		}
		return { name : "out", vars : outVars1, funs : funs};
	}
	,__class__: hxsl_Linker
};
var hxsl_Printer = function(varId) {
	if(varId == null) varId = false;
	this.varId = varId;
};
$hxClasses["hxsl.Printer"] = hxsl_Printer;
hxsl_Printer.__name__ = true;
hxsl_Printer.opStr = function(op) {
	switch(op[1]) {
	case 0:
		return "+";
	case 3:
		return "-";
	case 1:
		return "*";
	case 2:
		return "/";
	case 19:
		return "%";
	case 5:
		return "==";
	case 6:
		return "!=";
	case 7:
		return ">";
	case 9:
		return "<";
	case 8:
		return ">=";
	case 10:
		return "<=";
	case 13:
		return "^";
	case 12:
		return "|";
	case 11:
		return "&";
	case 16:
		return "<<";
	case 17:
		return ">>";
	case 18:
		return ">>>";
	case 14:
		return "&&";
	case 15:
		return "||";
	case 4:
		return "=";
	case 20:
		var op1 = op[2];
		return hxsl_Printer.opStr(op1) + "=";
	case 22:
		return "=>";
	case 21:
		return "...";
	}
};
hxsl_Printer.shaderToString = function(s,varId) {
	if(varId == null) varId = false;
	return new hxsl_Printer(varId).shaderString(s);
};
hxsl_Printer.prototype = {
	add: function(v) {
		this.buffer.add(v);
	}
	,shaderString: function(s) {
		this.buffer = new StringBuf();
		var _g = 0;
		var _g1 = s.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.addVar(v,hxsl_VarKind.Var);
			this.buffer.add(";\n");
		}
		if(s.vars.length > 0) this.buffer.add("\n");
		var _g2 = 0;
		var _g11 = s.funs;
		while(_g2 < _g11.length) {
			var f = _g11[_g2];
			++_g2;
			this.addFun(f);
			this.buffer.add("\n\n");
		}
		return this.buffer.b;
	}
	,exprString: function(e) {
		this.buffer = new StringBuf();
		this.addExpr(e,"");
		return this.buffer.b;
	}
	,addVar: function(v,defKind,tabs,parent) {
		if(tabs == null) tabs = "";
		if(v.qualifiers != null) {
			var _g = 0;
			var _g1 = v.qualifiers;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				this.add("@" + (function($this) {
					var $r;
					switch(q[1]) {
					case 0:
						$r = (function($this) {
							var $r;
							var max = q[2];
							$r = "const" + (max == null?"":"(" + max + ")");
							return $r;
						}($this));
						break;
					case 1:
						$r = "private";
						break;
					case 2:
						$r = "nullable";
						break;
					case 3:
						$r = "perObject";
						break;
					case 4:
						$r = (function($this) {
							var $r;
							var n = q[2];
							$r = "name('" + n + "')";
							return $r;
						}($this));
						break;
					case 5:
						$r = "shared";
						break;
					case 6:
						$r = (function($this) {
							var $r;
							var p = q[2];
							$r = Std.string(p).toLowerCase() + "p";
							return $r;
						}($this));
						break;
					}
					return $r;
				}(this)) + " ");
			}
		}
		if(v.kind != defKind) {
			var _g2 = v.kind;
			switch(_g2[1]) {
			case 4:
				this.buffer.add("@local ");
				break;
			case 0:
				this.buffer.add("@global ");
				break;
			case 3:
				this.buffer.add("@var ");
				break;
			case 2:
				this.buffer.add("@param ");
				break;
			case 1:
				this.buffer.add("@input ");
				break;
			case 6:
				this.buffer.add("@function ");
				break;
			case 5:
				this.buffer.add("@output ");
				break;
			}
		}
		this.buffer.add("var ");
		if(v.parent == parent) this.buffer.add(v.name + (this.varId?"@" + v.id:"")); else this.addVarName(v);
		this.buffer.add(" : ");
		{
			var _g3 = v.type;
			switch(_g3[1]) {
			case 12:
				var vl = _g3[2];
				this.buffer.add("{");
				var first = true;
				var _g11 = 0;
				while(_g11 < vl.length) {
					var v1 = vl[_g11];
					++_g11;
					if(first) first = false; else this.buffer.add(", ");
					this.addVar(v1,v1.kind,tabs,v1);
				}
				this.buffer.add("}");
				break;
			default:
				this.add(hxsl_Tools.toString(v.type));
			}
		}
	}
	,addFun: function(f) {
		this.buffer.add("function " + f.ref.name + "(");
		var first = true;
		var _g = 0;
		var _g1 = f.args;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(first) {
				this.buffer.add(" ");
				first = false;
			} else this.buffer.add(", ");
			this.addVar(a,hxsl_VarKind.Local);
		}
		if(f.args.length > 0) this.buffer.add(" ");
		this.add(") : " + hxsl_Tools.toString(f.ret) + " ");
		this.addExpr(f.expr,"");
	}
	,addVarName: function(v) {
		if(v.parent != null) {
			this.addVarName(v.parent);
			this.buffer.add(".");
		}
		this.buffer.add(v.name);
		if(this.varId) this.buffer.add("@" + v.id);
	}
	,addExpr: function(e,tabs) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				this.addVarName(v);
				break;
			case 7:
				var init = _g[3];
				var v1 = _g[2];
				this.addVar(v1,hxsl_VarKind.Local,tabs);
				if(init != null) {
					this.buffer.add(" = ");
					this.addExpr(init,tabs);
				}
				break;
			case 9:
				var regs = _g[3];
				var e1 = _g[2];
				this.addExpr(e1,tabs);
				this.buffer.add(".");
				var _g1 = 0;
				while(_g1 < regs.length) {
					var r = regs[_g1];
					++_g1;
					this.add(Std.string(r).toLowerCase());
				}
				break;
			case 12:
				var e2 = _g[2];
				this.buffer.add("return");
				if(e2 != null) {
					this.buffer.add(" ");
					this.addExpr(e2,tabs);
				}
				break;
			case 10:
				var eelse = _g[4];
				var eif = _g[3];
				var cond = _g[2];
				this.buffer.add("if( ");
				this.addExpr(cond,tabs);
				this.buffer.add(" ) ");
				this.addExpr(eif,tabs);
				if(eelse != null) {
					this.buffer.add(" else ");
					this.addExpr(eelse,tabs);
				}
				break;
			case 2:
				var g = _g[2];
				this.add(hxsl_Tools2.toString(g));
				break;
			case 8:
				var el = _g[3];
				var e3 = _g[2];
				this.addExpr(e3,tabs);
				this.buffer.add("(");
				var first = true;
				var _g11 = 0;
				while(_g11 < el.length) {
					var e4 = el[_g11];
					++_g11;
					if(first) first = false; else this.buffer.add(", ");
					this.addExpr(e4,tabs);
				}
				this.buffer.add(")");
				break;
			case 13:
				var loop = _g[4];
				var it = _g[3];
				var v2 = _g[2];
				this.buffer.add("for( " + v2.name + " in ");
				this.addExpr(it,tabs);
				this.buffer.add(") ");
				this.addExpr(loop,tabs);
				break;
			case 14:
				this.buffer.add("continue");
				break;
			case 15:
				this.buffer.add("break");
				break;
			case 11:
				this.buffer.add("discard");
				break;
			case 4:
				var el1 = _g[2];
				this.buffer.add("{");
				tabs += "\t";
				var _g12 = 0;
				while(_g12 < el1.length) {
					var e5 = el1[_g12];
					++_g12;
					this.buffer.add("\n" + tabs);
					this.addExpr(e5,tabs);
					this.buffer.add(";");
				}
				tabs = HxOverrides.substr(tabs,1,null);
				if(el1.length > 0) this.buffer.add("\n" + tabs);
				this.buffer.add("}");
				break;
			case 6:
				var e6 = _g[3];
				var op = _g[2];
				this.buffer.add((function($this) {
					var $r;
					switch(op[1]) {
					case 2:
						$r = "!";
						break;
					case 3:
						$r = "-";
						break;
					case 4:
						$r = "~";
						break;
					case 0:
						$r = "++";
						break;
					case 1:
						$r = "--";
						break;
					}
					return $r;
				}(this)));
				this.addExpr(e6,tabs);
				break;
			case 5:
				var e21 = _g[4];
				var e11 = _g[3];
				var op1 = _g[2];
				this.addExpr(e11,tabs);
				this.add(" " + hxsl_Printer.opStr(op1) + " ");
				this.addExpr(e21,tabs);
				break;
			case 16:
				var e22 = _g[3];
				var e12 = _g[2];
				this.addExpr(e12,tabs);
				this.buffer.add("[");
				this.addExpr(e22,tabs);
				this.buffer.add("]");
				break;
			case 3:
				var e7 = _g[2];
				this.buffer.add("(");
				this.addExpr(e7,tabs);
				this.buffer.add(")");
				break;
			case 0:
				var c = _g[2];
				this.buffer.add((function($this) {
					var $r;
					switch(c[1]) {
					case 0:
						$r = "null";
						break;
					case 1:
						$r = (function($this) {
							var $r;
							var b = c[2];
							$r = b;
							return $r;
						}($this));
						break;
					case 2:
						$r = (function($this) {
							var $r;
							var i = c[2];
							$r = i;
							return $r;
						}($this));
						break;
					case 3:
						$r = (function($this) {
							var $r;
							var f = c[2];
							$r = f;
							return $r;
						}($this));
						break;
					case 4:
						$r = (function($this) {
							var $r;
							var s = c[2];
							$r = "\"" + s + "\"";
							return $r;
						}($this));
						break;
					}
					return $r;
				}(this)));
				break;
			case 17:
				var el2 = _g[2];
				this.buffer.add("[");
				var first1 = true;
				var _g13 = 0;
				while(_g13 < el2.length) {
					var e8 = el2[_g13];
					++_g13;
					if(first1) first1 = false; else this.buffer.add(", ");
					this.addExpr(e8,tabs);
				}
				this.buffer.add("]");
				break;
			}
		}
	}
	,__class__: hxsl_Printer
};
var hxsl_AllocParam = function(name,pos,instance,index,type) {
	this.name = name;
	this.pos = pos;
	this.instance = instance;
	this.index = index;
	this.type = type;
};
$hxClasses["hxsl.AllocParam"] = hxsl_AllocParam;
hxsl_AllocParam.__name__ = true;
hxsl_AllocParam.prototype = {
	__class__: hxsl_AllocParam
};
var hxsl_AllocGlobal = function(pos,path,type) {
	this.pos = pos;
	this.path = path;
	this.gid = hxsl_Globals.allocID(path);
	this.type = type;
};
$hxClasses["hxsl.AllocGlobal"] = hxsl_AllocGlobal;
hxsl_AllocGlobal.__name__ = true;
hxsl_AllocGlobal.prototype = {
	__class__: hxsl_AllocGlobal
};
var hxsl_RuntimeShaderData = function() {
};
$hxClasses["hxsl.RuntimeShaderData"] = hxsl_RuntimeShaderData;
hxsl_RuntimeShaderData.__name__ = true;
hxsl_RuntimeShaderData.prototype = {
	__class__: hxsl_RuntimeShaderData
};
var hxsl_RuntimeShader = function() {
	this.id = hxsl_RuntimeShader.UID++;
};
$hxClasses["hxsl.RuntimeShader"] = hxsl_RuntimeShader;
hxsl_RuntimeShader.__name__ = true;
hxsl_RuntimeShader.prototype = {
	__class__: hxsl_RuntimeShader
};
var hxsl_ShaderList = function(s,n) {
	this.s = s;
	this.next = n;
};
$hxClasses["hxsl.ShaderList"] = hxsl_ShaderList;
hxsl_ShaderList.__name__ = true;
hxsl_ShaderList.prototype = {
	__class__: hxsl_ShaderList
};
var hxsl__$ShaderList_ShaderIterator = function(l) {
	this.l = l;
};
$hxClasses["hxsl._ShaderList.ShaderIterator"] = hxsl__$ShaderList_ShaderIterator;
hxsl__$ShaderList_ShaderIterator.__name__ = true;
hxsl__$ShaderList_ShaderIterator.prototype = {
	hasNext: function() {
		return this.l != null;
	}
	,next: function() {
		var s = this.l.s;
		this.l = this.l.next;
		return s;
	}
	,__class__: hxsl__$ShaderList_ShaderIterator
};
var hxsl_ShaderInstance = function(shader) {
	this.id = hxsl_Tools.allocVarId();
	this.shader = shader;
	this.params = new haxe_ds_IntMap();
};
$hxClasses["hxsl.ShaderInstance"] = hxsl_ShaderInstance;
hxsl_ShaderInstance.__name__ = true;
hxsl_ShaderInstance.prototype = {
	__class__: hxsl_ShaderInstance
};
var hxsl_ShaderGlobal = function(v,gid) {
	this.v = v;
	this.globalId = gid;
};
$hxClasses["hxsl.ShaderGlobal"] = hxsl_ShaderGlobal;
hxsl_ShaderGlobal.__name__ = true;
hxsl_ShaderGlobal.prototype = {
	__class__: hxsl_ShaderGlobal
};
var hxsl_ShaderConst = function(v,pos,bits) {
	this.v = v;
	this.pos = pos;
	this.bits = bits;
};
$hxClasses["hxsl.ShaderConst"] = hxsl_ShaderConst;
hxsl_ShaderConst.__name__ = true;
hxsl_ShaderConst.prototype = {
	__class__: hxsl_ShaderConst
};
var hxsl_SharedShader = function(src) {
	this.instanceCache = new haxe_ds_IntMap();
	this.data = haxe_Unserializer.run(src);
	this.consts = null;
	this.globals = [];
	var _g = 0;
	var _g1 = this.data.vars;
	while(_g < _g1.length) {
		var v = _g1[_g];
		++_g;
		this.browseVar(v);
	}
	if(this.consts == null) {
		var hasFun = false;
		var _g2 = 0;
		var _g11 = this.data.funs;
		try {
			while(_g2 < _g11.length) {
				var f = _g11[_g2];
				++_g2;
				var _g21 = f.ref.name;
				switch(_g21) {
				case "vertex":case "fragment":case "__init__":case "__init__vertex":case "__init__fragment":
					break;
				default:
					hasFun = true;
					throw "__break__";
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(!hasFun) {
			var i = new hxsl_ShaderInstance(this.data);
			this.paramsCount = 0;
			var _g3 = 0;
			var _g12 = this.data.vars;
			while(_g3 < _g12.length) {
				var v1 = _g12[_g3];
				++_g3;
				this.addSelfParam(i,v1);
			}
			this.instanceCache.h[0] = i;
		}
	}
};
$hxClasses["hxsl.SharedShader"] = hxsl_SharedShader;
hxsl_SharedShader.__name__ = true;
hxsl_SharedShader.prototype = {
	getInstance: function(constBits) {
		var i = this.instanceCache.h[constBits];
		if(i == null) return this.makeInstance(constBits); else return i;
	}
	,makeInstance: function(constBits) {
		var $eval = new hxsl_Eval();
		var c = this.consts;
		while(c != null) {
			$eval.setConstant(c.v,(function($this) {
				var $r;
				var _g = c.v.type;
				$r = (function($this) {
					var $r;
					switch(_g[1]) {
					case 2:
						$r = hxsl_Const.CBool((constBits >>> c.pos & 1) != 0);
						break;
					case 1:
						$r = hxsl_Const.CInt(constBits >>> c.pos & (1 << c.bits) - 1);
						break;
					default:
						$r = (function($this) {
							var $r;
							throw new js__$Boot_HaxeError("assert");
							return $r;
						}($this));
					}
					return $r;
				}($this));
				return $r;
			}(this)));
			c = c.next;
		}
		var i = new hxsl_ShaderInstance($eval["eval"](this.data));
		this.paramsCount = 0;
		var _g1 = 0;
		var _g11 = this.data.vars;
		while(_g1 < _g11.length) {
			var v = _g11[_g1];
			++_g1;
			this.addParam($eval,i,v);
		}
		this.instanceCache.h[constBits] = i;
		return i;
	}
	,addSelfParam: function(i,v) {
		{
			var _g = v.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				var _g1 = 0;
				while(_g1 < vl.length) {
					var v1 = vl[_g1];
					++_g1;
					this.addSelfParam(i,v1);
				}
				break;
			default:
				if(v.kind == hxsl_VarKind.Param) {
					i.params.h[v.id] = this.paramsCount;
					this.paramsCount++;
				}
			}
		}
	}
	,addParam: function($eval,i,v) {
		{
			var _g = v.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				var _g1 = 0;
				while(_g1 < vl.length) {
					var v1 = vl[_g1];
					++_g1;
					this.addParam($eval,i,v1);
				}
				break;
			default:
				if(v.kind == hxsl_VarKind.Param) {
					var key = $eval.varMap.h[v.__id__].id;
					i.params.h[key] = this.paramsCount;
					this.paramsCount++;
				}
			}
		}
	}
	,browseVar: function(v,path) {
		v.id = hxsl_Tools.allocVarId();
		if(path == null) path = hxsl_Tools.getName(v); else path += "." + v.name;
		{
			var _g = v.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				var _g1 = 0;
				while(_g1 < vl.length) {
					var vs = vl[_g1];
					++_g1;
					this.browseVar(vs,path);
				}
				break;
			default:
				var globalId = 0;
				if(v.kind == hxsl_VarKind.Global) {
					globalId = hxsl_Globals.allocID(path);
					this.globals.push(new hxsl_ShaderGlobal(v,globalId));
				}
				if(!hxsl_Tools.isConst(v)) return;
				var bits = hxsl_Tools.getConstBits(v);
				if(bits > 0) {
					var pos;
					if(this.consts == null) pos = 0; else pos = this.consts.pos + this.consts.bits;
					var c = new hxsl_ShaderConst(v,pos,bits);
					c.globalId = globalId;
					c.next = this.consts;
					this.consts = c;
				}
			}
		}
	}
	,__class__: hxsl_SharedShader
};
var hxsl__$Splitter_VarProps = function(v) {
	this.v = v;
	this.read = 0;
	this.write = 0;
};
$hxClasses["hxsl._Splitter.VarProps"] = hxsl__$Splitter_VarProps;
hxsl__$Splitter_VarProps.__name__ = true;
hxsl__$Splitter_VarProps.prototype = {
	__class__: hxsl__$Splitter_VarProps
};
var hxsl_Splitter = function() {
};
$hxClasses["hxsl.Splitter"] = hxsl_Splitter;
hxsl_Splitter.__name__ = true;
hxsl_Splitter.prototype = {
	split: function(s) {
		var vfun = null;
		var vvars = new haxe_ds_IntMap();
		var ffun = null;
		var fvars = new haxe_ds_IntMap();
		this.varNames = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = s.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var _g2 = f.kind;
			switch(_g2[1]) {
			case 0:
				this.vars = vvars;
				vfun = f;
				this.checkExpr(f.expr);
				break;
			case 1:
				this.vars = fvars;
				ffun = f;
				this.checkExpr(f.expr);
				break;
			default:
				throw new js__$Boot_HaxeError("assert");
			}
		}
		this.varMap = new haxe_ds_ObjectMap();
		var $it0 = vvars.iterator();
		while( $it0.hasNext() ) {
			var inf = $it0.next();
			var v = inf.v;
			var _g3 = v.kind;
			switch(_g3[1]) {
			case 3:case 4:
				if(fvars.h.hasOwnProperty(v.id)) v.kind = hxsl_VarKind.Var; else v.kind = hxsl_VarKind.Local;
				break;
			default:
			}
			var _g4 = v.kind;
			switch(_g4[1]) {
			case 3:case 5:
				if(inf.read > 0 || inf.write > 1) {
					var nv = { id : hxsl_Tools.allocVarId(), name : v.name, kind : v.kind, type : v.type};
					this.vars = vvars;
					var ninf = this.get(nv);
					v.kind = hxsl_VarKind.Local;
					var p = vfun.expr.p;
					var e = { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAssign,{ e : hxsl_TExprDef.TVar(nv), t : nv.type, p : p},{ e : hxsl_TExprDef.TVar(v), t : v.type, p : p}), t : nv.type, p : p};
					this.addExpr(vfun,e);
					this.checkExpr(e);
					if(nv.kind == hxsl_VarKind.Var) {
						var old = fvars.h[v.id];
						this.varMap.set(v,nv);
						fvars.remove(v.id);
						var np = new hxsl__$Splitter_VarProps(nv);
						np.read = old.read;
						np.write = old.write;
						fvars.h[nv.id] = np;
					}
				}
				break;
			default:
			}
		}
		var finits = [];
		var $it1 = fvars.iterator();
		while( $it1.hasNext() ) {
			var inf1 = $it1.next();
			var v1 = inf1.v;
			var _g5 = v1.kind;
			switch(_g5[1]) {
			case 1:
				var nv1 = { id : hxsl_Tools.allocVarId(), name : v1.name, kind : hxsl_VarKind.Var, type : v1.type};
				this.uniqueName(nv1);
				var i = vvars.h[v1.id];
				if(i == null) {
					i = new hxsl__$Splitter_VarProps(v1);
					vvars.h[v1.id] = i;
				}
				i.read++;
				var vp = new hxsl__$Splitter_VarProps(nv1);
				vp.write = 1;
				vvars.h[nv1.id] = vp;
				var fp = new hxsl__$Splitter_VarProps(nv1);
				fp.read = 1;
				fvars.h[nv1.id] = fp;
				this.addExpr(vfun,{ e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAssign,{ e : hxsl_TExprDef.TVar(nv1), t : v1.type, p : vfun.expr.p},{ e : hxsl_TExprDef.TVar(v1), t : v1.type, p : vfun.expr.p}), t : v1.type, p : vfun.expr.p});
				this.varMap.set(v1,nv1);
				inf1.local = true;
				break;
			case 3:
				if(inf1.write > 0) {
					var nv2 = { id : hxsl_Tools.allocVarId(), name : v1.name, kind : hxsl_VarKind.Local, type : v1.type};
					this.uniqueName(nv2);
					finits.push({ e : hxsl_TExprDef.TVarDecl(nv2,{ e : hxsl_TExprDef.TVar(v1), t : v1.type, p : ffun.expr.p}), t : hxsl_Type.TVoid, p : ffun.expr.p});
					this.varMap.set(v1,nv2);
				} else {
				}
				break;
			default:
			}
		}
		var $it2 = vvars.iterator();
		while( $it2.hasNext() ) {
			var v2 = $it2.next();
			this.checkVar(v2,true,vvars);
		}
		var $it3 = fvars.iterator();
		while( $it3.hasNext() ) {
			var v3 = $it3.next();
			this.checkVar(v3,false,vvars);
		}
		var $it4 = this.varMap.keys();
		while( $it4.hasNext() ) {
			var v4 = $it4.next();
			var v21;
			var key = this.varMap.h[v4.__id__];
			v21 = this.varMap.h[key.__id__];
			if(v21 != null) this.varMap.set(v4,v21);
		}
		ffun = { ret : ffun.ret, ref : ffun.ref, kind : ffun.kind, args : ffun.args, expr : this.mapVars(ffun.expr)};
		{
			var _g6 = ffun.expr.e;
			switch(_g6[1]) {
			case 4:
				var el = _g6[2];
				var _g11 = 0;
				while(_g11 < finits.length) {
					var e1 = finits[_g11];
					++_g11;
					el.unshift(e1);
				}
				break;
			default:
				finits.push(ffun.expr);
				ffun.expr = { e : hxsl_TExprDef.TBlock(finits), t : hxsl_Type.TVoid, p : ffun.expr.p};
			}
		}
		var vvars1;
		var _g7 = [];
		var $it5 = vvars.iterator();
		while( $it5.hasNext() ) {
			var v5 = $it5.next();
			if(!v5.local) _g7.push(v5.v);
		}
		vvars1 = _g7;
		var fvars1;
		var _g12 = [];
		var $it6 = fvars.iterator();
		while( $it6.hasNext() ) {
			var v6 = $it6.next();
			if(!v6.local) _g12.push(v6.v);
		}
		fvars1 = _g12;
		vvars1.sort(function(v11,v22) {
			return v11.id - v22.id;
		});
		fvars1.sort(function(v12,v23) {
			return v12.id - v23.id;
		});
		return { vertex : { name : "vertex", vars : vvars1, funs : [vfun]}, fragment : { name : "fragment", vars : fvars1, funs : [ffun]}};
	}
	,addExpr: function(f,e) {
		{
			var _g = f.expr.e;
			switch(_g[1]) {
			case 4:
				var el = _g[2];
				el.push(e);
				break;
			default:
				f.expr = { e : hxsl_TExprDef.TBlock([f.expr,e]), t : hxsl_Type.TVoid, p : f.expr.p};
			}
		}
	}
	,checkVar: function(v,vertex,vvars) {
		var _g = v.v.kind;
		switch(_g[1]) {
		case 4:
			if(v.requireInit) throw new js__$Boot_HaxeError("Variable " + v.v.name + " is written without being initialized"); else {
			}
			break;
		case 3:
			if(!vertex) {
				var i = vvars.h[v.v.id];
				if(i == null || i.write == 0) throw new js__$Boot_HaxeError("Varying " + v.v.name + " is not written by vertex shader");
			}
			break;
		default:
		}
	}
	,mapVars: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				var v2 = this.varMap.h[v.__id__];
				if(v2 == null) return e; else return { e : hxsl_TExprDef.TVar(v2), t : e.t, p : e.p};
				break;
			default:
				return hxsl_Tools.map(e,$bind(this,this.mapVars));
			}
		}
	}
	,get: function(v) {
		var i = this.vars.h[v.id];
		if(i == null) {
			i = new hxsl__$Splitter_VarProps(v);
			this.vars.h[v.id] = i;
			this.uniqueName(v);
		}
		return i;
	}
	,uniqueName: function(v) {
		if(v.kind == hxsl_VarKind.Global || v.kind == hxsl_VarKind.Output || v.kind == hxsl_VarKind.Input) return;
		v.parent = null;
		var n = this.varNames.get(v.name);
		if(n != null && n != v) {
			var k = 2;
			while(this.varNames.exists(v.name + k)) k++;
			v.name += k;
		}
		this.varNames.set(v.name,v);
	}
	,checkExpr: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				var inf = this.get(v);
				if(inf.write == 0) inf.requireInit = true;
				inf.read++;
				break;
			case 5:
				switch(_g[2][1]) {
				case 4:
					switch(_g[3].e[1]) {
					case 1:
						var e1 = _g[4];
						var v1 = _g[3].e[2];
						var inf1 = this.get(v1);
						inf1.write++;
						this.checkExpr(e1);
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var e2 = _g[4];
							var v2 = _g[3].e[2].e[2];
							var inf2 = this.get(v2);
							inf2.write++;
							this.checkExpr(e2);
							break;
						default:
							hxsl_Tools.iter(e,$bind(this,this.checkExpr));
						}
						break;
					default:
						hxsl_Tools.iter(e,$bind(this,this.checkExpr));
					}
					break;
				case 20:
					switch(_g[3].e[1]) {
					case 1:
						var e3 = _g[4];
						var v3 = _g[3].e[2];
						var inf3 = this.get(v3);
						if(inf3.write == 0) inf3.requireInit = true;
						inf3.read++;
						inf3.write++;
						this.checkExpr(e3);
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var e4 = _g[4];
							var v4 = _g[3].e[2].e[2];
							var inf4 = this.get(v4);
							if(inf4.write == 0) inf4.requireInit = true;
							inf4.read++;
							inf4.write++;
							this.checkExpr(e4);
							break;
						default:
							hxsl_Tools.iter(e,$bind(this,this.checkExpr));
						}
						break;
					default:
						hxsl_Tools.iter(e,$bind(this,this.checkExpr));
					}
					break;
				default:
					hxsl_Tools.iter(e,$bind(this,this.checkExpr));
				}
				break;
			case 7:
				var init = _g[3];
				var v5 = _g[2];
				var inf5 = this.get(v5);
				inf5.local = true;
				if(init != null) {
					this.checkExpr(init);
					inf5.write++;
				}
				break;
			default:
				hxsl_Tools.iter(e,$bind(this,this.checkExpr));
			}
		}
	}
	,__class__: hxsl_Splitter
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = true;
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = typeof(window) != "undefined" && window.ArrayBuffer || typeof(global) != "undefined" && global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = typeof(window) != "undefined" && window.DataView || typeof(global) != "undefined" && global.DataView || js_html_compat_DataView;
var Uint8Array = typeof(window) != "undefined" && window.Uint8Array || typeof(global) != "undefined" && global.Uint8Array || js_html_compat_Uint8Array._new;
h3d_Buffer.GUID = 0;
h3d_impl_GlDriver.TFILTERS = [[[9728,9728],[9729,9729]],[[9728,9984],[9729,9985]],[[9728,9986],[9729,9987]]];
h3d_impl_GlDriver.TWRAP = [33071,10497];
h3d_impl_GlDriver.FACES = [0,1028,1029,1032];
h3d_impl_GlDriver.BLEND = [1,0,770,768,772,774,771,769,773,775,32769,32771,32770,32772,776];
h3d_impl_GlDriver.COMPARE = [519,512,514,517,516,518,513,515];
h3d_impl_GlDriver.OP = [32774,32778,32779];
h3d_impl_MemoryManager.ALL_FLAGS = Type.allEnums(h3d_BufferFlag);
h3d_mat_Texture.UID = 0;
h3d_mat_Texture.COLOR_CACHE = new haxe_ds_IntMap();
h3d_pass__$Border_BorderShader.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:5:0y4:namey8:positiony4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y6:parentoR6r10R8y6:outputR10jR11:12:1ar9oR6r10R8y5:colorR10jR11:5:2i4r11R13r13y2:idi-128ghR16i-126gR16i-127gy1:poy4:filey72:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fpass%2FBorder.hxy3:maxi295y3:mini280gy1:tr12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R17oR18R19R20i302R21i298gR22jR11:13:1ahgaoR3jR4:1:1oR6jR7:1:0R8R9R10jR11:5:2i2r11R13oR6r30R8y5:inputR10jR11:12:1ar29hR16i-124gR16i-125gR17oR18R19R20i317R21i303gR22r31goR3jR4:0:1jy10:hxsl.Const:3:1zR17oR18R19R20i320R21i319gR22jR11:3:0goR3jR4:0:1jR25:3:1i1R17oR18R19R20i323R21i322gR22r41ghR17oR18R19R20i324R21i298gR22jR11:5:2i4r11gR17oR18R19R20i324R21i280gR22r12ghR17oR18R19R20i330R21i274gR22jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr53ghR16i-129gR29r53goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1r15R17oR18R19R20i374R21i362gR22r16goR3jR4:1:1oR6jR7:2:0R8R15R10jR11:5:2i4r11R16i-123gR17oR18R19R20i382R21i377gR22r72gR17oR18R19R20i382R21i362gR22r16ghR17oR18R19R20i388R21i356gR22r53gR6jR26:1:0R27oR6r56R8y8:fragmentR10jR11:13:1aoR1ahR29r53ghR16i-130gR29r53ghR8y29:h3d.pass._Border.BorderShadery4:varsar55r80r13r32r70hg";
h3d_pass_Default.__meta__ = { fields : { cameraView : { global : ["camera.view"]}, cameraProj : { global : ["camera.proj"]}, cameraPos : { global : ["camera.position"]}, cameraProjDiag : { global : ["camera.projDiag"]}, cameraViewProj : { global : ["camera.viewProj"]}, cameraInverseViewProj : { global : ["camera.inverseViewProj"]}, globalTime : { global : ["global.time"]}, pixelSize : { global : ["global.pixelSize"]}, globalModelView : { global : ["global.modelView"]}, globalModelViewInverse : { global : ["global.modelViewInverse"]}}};
h3d_pass_Params.defaultKillAlphaThreshold = 0.5;
h3d_shader_AmbientLight.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey10:lightColory4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y2:idi-111gy1:poy4:filey80:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FAmbientLight.hxy3:maxi316y3:mini306gy1:tr12goR3jR4:1:1oR6jR7:0:0R8y12:ambientLightR10jR11:5:2i3r11y6:parentoR6r17R8y6:globalR10jR11:12:1ar16oR6r17R8y16:perPixelLightingR10jR11:2:0R21r19y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR13i-108ghR13i-106gR13i-107gR14oR15R16R17i338R18i319gR19r18gR14oR15R16R17i338R18i306gR19r12ghR14oR15R16R17i344R18i300gR19jR11:0:0gR6jy17:hxsl.FunctionKind:2:0y3:refoR6jR7:6:0R8y8:__init__R10jR11:13:1aoR1ahy3:retr32ghR13i-112gR29r32goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1oR6r10R8y15:lightPixelColorR10jR11:5:2i3r11R13i-110gR14oR15R16R17i399R18i384gR19r47goR3jR4:1:1r16R14oR15R16R17i421R18i402gR19r18gR14oR15R16R17i421R18i384gR19r47ghR14oR15R16R17i427R18i378gR19r32gR6jR26:1:0R27oR6r35R8y16:__init__fragmentR10jR11:13:1aoR1ahR29r32ghR13i-113gR29r32goR1ahR2oR3jR4:4:1aoR3jR4:10:3oR3jR4:6:2jy15:haxe.macro.Unop:2:0oR3jR4:1:1r21R14oR15R16R17i485R18i462gR19r22gR14oR15R16R17i485R18i461gR19r22goR3jR4:5:3jR5:20:1jR5:1:0oR3jR4:9:2oR3jR4:1:1oR6r10R8y10:pixelColorR10jR11:5:2i4r11R13i-109gR14oR15R16R17i498R18i488gR19r81gajy14:hxsl.Component:0:0jR34:1:0jR34:2:0hR14oR15R16R17i502R18i488gR19jR11:5:2i3r11goR3jR4:1:1r9R14oR15R16R17i516R18i506gR19r12gR14oR15R16R17i516R18i488gR19r90gnR14oR15R16R17i516R18i457gR19r32ghR14oR15R16R17i522R18i451gR19r32gR6jR26:0:0R27oR6r35R8y6:vertexR10jR11:13:1aoR1ahR29r32ghR13i-114gR29r32goR1ahR2oR3jR4:4:1aoR3jR4:10:3oR3jR4:1:1r21R14oR15R16R17i581R18i558gR19r22goR3jR4:5:3jR5:20:1r76oR3jR4:9:2oR3jR4:1:1r80R14oR15R16R17i594R18i584gR19r81gar85r86r87hR14oR15R16R17i598R18i584gR19jR11:5:2i3r11goR3jR4:1:1r46R14oR15R16R17i617R18i602gR19r47gR14oR15R16R17i617R18i584gR19r123gnR14oR15R16R17i617R18i554gR19r32ghR14oR15R16R17i623R18i548gR19r32gR6r57R27oR6r35R8y8:fragmentR10jR11:13:1aoR1ahR29r32ghR13i-115gR29r32ghR8y23:h3d.shader.AmbientLighty4:varsar101r9r34r133r58r19r80r46hg";
h3d_shader_Base2d.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey14:spritePositiony4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-10gy1:poy4:filey74:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FBase2d.hxy3:maxi818y3:mini804gy1:tr12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R14oR15R16R17i825R18i821gR19jR11:13:1ahgaoR3jR4:1:1oR6jR7:1:0R8y8:positionR10jR11:5:2i2r11y6:parentoR6r25R8y5:inputR10jR11:12:1ar24oR6r25R8y2:uvR10jR11:5:2i2r11R22r27R13i-3goR6r25R8y5:colorR10jR11:5:2i4r11R22r27R13i-4ghR13i-1gR13i-2gR14oR15R16R17i840R18i826gR19r26goR3jR4:1:1oR6jR7:2:0R8y6:zValueR10jR11:3:0R13i-8gR14oR15R16R17i848R18i842gR19r39goR3jR4:0:1jy10:hxsl.Const:3:1i1R14oR15R16R17i851R18i850gR19r39ghR14oR15R16R17i852R18i821gR19jR11:5:2i4r11gR14oR15R16R17i852R18i804gR19r12goR3jR4:10:3oR3jR4:1:1oR6r38R8y10:isRelativeR10jR11:2:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR13i-15gR14oR15R16R17i872R18i862gR19r54goR3jR4:4:1aoR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1oR6r10R8y16:absolutePositionR10jR11:5:2i4r11R13i-11gR14oR15R16R17i898R18i882gR19r65gajy14:hxsl.Component:0:0hR14oR15R16R17i900R18i882gR19r39goR3jR4:8:2oR3jR4:2:1jR20:29:0R14oR15R16R17i928R18i903gR19jR11:13:1aoR1aoR8y1:_R10jR11:5:2i3r11goR8y1:bR10jR11:5:2i3r11ghy3:retr39ghgaoR3jR4:8:2oR3jR4:2:1jR20:39:0R14oR15R16R17i907R18i903gR19jR11:13:1ahgaoR3jR4:9:2oR3jR4:1:1r9R14oR15R16R17i922R18i908gR19r12gar69jR32:1:0hR14oR15R16R17i925R18i908gR19jR11:5:2i2r11goR3jR4:0:1jR27:3:1i1R14oR15R16R17i927R18i926gR19r39ghR14oR15R16R17i928R18i903gR19r81goR3jR4:1:1oR6r38R8y15:absoluteMatrixAR10jR11:5:2i3r11R13i-17gR14oR15R16R17i948R18i933gR19r111ghR14oR15R16R17i949R18i903gR19r39gR14oR15R16R17i949R18i882gR19r39goR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i972R18i956gR19r65gar99hR14oR15R16R17i974R18i956gR19r39goR3jR4:8:2oR3jR4:2:1r74R14oR15R16R17i1002R18i977gR19jR11:13:1aoR1aoR8R33R10jR11:5:2i3r11gr82hR35r39ghgaoR3jR4:8:2oR3jR4:2:1r88R14oR15R16R17i981R18i977gR19r92gaoR3jR4:9:2oR3jR4:1:1r9R14oR15R16R17i996R18i982gR19r12gar69r99hR14oR15R16R17i999R18i982gR19jR11:5:2i2r11goR3jR4:0:1jR27:3:1i1R14oR15R16R17i1001R18i1000gR19r39ghR14oR15R16R17i1002R18i977gR19r134goR3jR4:1:1oR6r38R8y15:absoluteMatrixBR10jR11:5:2i3r11R13i-18gR14oR15R16R17i1022R18i1007gR19r158ghR14oR15R16R17i1023R18i977gR19r39gR14oR15R16R17i1023R18i956gR19r39goR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i1046R18i1030gR19r65gajR32:2:0jR32:3:0hR14oR15R16R17i1049R18i1030gR19jR11:5:2i2r11goR3jR4:9:2oR3jR4:1:1r9R14oR15R16R17i1066R18i1052gR19r12gar171r172hR14oR15R16R17i1069R18i1052gR19jR11:5:2i2r11gR14oR15R16R17i1069R18i1030gR19r175ghR14oR15R16R17i1076R18i875gR19jR11:0:0goR3jR4:5:3r7oR3jR4:1:1r64R14oR15R16R17i1103R18i1087gR19r65goR3jR4:1:1r9R14oR15R16R17i1120R18i1106gR19r12gR14oR15R16R17i1120R18i1087gR19r65gR14oR15R16R17i1120R18i858gR19r188goR3jR4:5:3r7oR3jR4:1:1oR6jR7:3:0R8y12:calculatedUVR10jR11:5:2i2r11R13i-14gR14oR15R16R17i1138R18i1126gR19r204goR3jR4:10:3oR3jR4:1:1oR6r38R8y8:hasUVPosR10r54R29ajR30:0:1nhR13i-19gR14oR15R16R17i1149R18i1141gR19r54goR3jR4:5:3jR5:0:0oR3jR4:5:3jR5:1:0oR3jR4:1:1r29R14oR15R16R17i1160R18i1152gR19r30goR3jR4:9:2oR3jR4:1:1oR6r38R8y5:uvPosR10jR11:5:2i4r11R13i-20gR14oR15R16R17i1168R18i1163gR19r224gar171r172hR14oR15R16R17i1171R18i1163gR19jR11:5:2i2r11gR14oR15R16R17i1171R18i1152gR19jR11:5:2i2r11goR3jR4:9:2oR3jR4:1:1r223R14oR15R16R17i1179R18i1174gR19r224gar69r99hR14oR15R16R17i1182R18i1174gR19jR11:5:2i2r11gR14oR15R16R17i1182R18i1152gR19jR11:5:2i2r11goR3jR4:1:1r29R14oR15R16R17i1193R18i1185gR19r30gR14oR15R16R17i1193R18i1141gR19r244gR14oR15R16R17i1193R18i1126gR19r204goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y10:pixelColorR10jR11:5:2i4r11R13i-12gR14oR15R16R17i1209R18i1199gR19r255goR3jR4:10:3oR3jR4:1:1r53R14oR15R16R17i1222R18i1212gR19r54goR3jR4:5:3r217oR3jR4:1:1oR6r38R8R25R10jR11:5:2i4r11R13i-16gR14oR15R16R17i1230R18i1225gR19r265goR3jR4:1:1r31R14oR15R16R17i1244R18i1233gR19r32gR14oR15R16R17i1244R18i1225gR19jR11:5:2i4r11goR3jR4:1:1r31R14oR15R16R17i1258R18i1247gR19r32gR14oR15R16R17i1258R18i1212gR19r273gR14oR15R16R17i1258R18i1199gR19r255goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y12:textureColorR10jR11:5:2i4r11R13i-13gR14oR15R16R17i1276R18i1264gR19r284goR3jR4:8:2oR3jR4:2:1jR20:33:0R14oR15R16R17i1286R18i1279gR19jR11:13:1aoR1aoR8R33R10jR11:10:0goR8R34R10jR11:5:2i2r11ghR35jR11:5:2i4r11ghgaoR3jR4:1:1oR6r38R8y7:textureR10r296R13i-9gR14oR15R16R17i1286R18i1279gR19r296goR3jR4:1:1r202R14oR15R16R17i1303R18i1291gR19r204ghR14oR15R16R17i1304R18i1279gR19r299gR14oR15R16R17i1304R18i1264gR19r284goR3jR4:5:3jR5:20:1r217oR3jR4:1:1r254R14oR15R16R17i1320R18i1310gR19r255goR3jR4:1:1r283R14oR15R16R17i1336R18i1324gR19r284gR14oR15R16R17i1336R18i1310gR19r255ghR14oR15R16R17i1342R18i798gR19r188gR6jy17:hxsl.FunctionKind:2:0y3:refoR6jR7:6:0R8y8:__init__R10jR11:13:1aoR1ahR35r188ghR13i-24gR35r188goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i1388R18i1372gR19r65gar69r99hR14oR15R16R17i1391R18i1372gR19jR11:5:2i2r11goR3jR4:5:3r217oR3jR4:3:1oR3jR4:5:3r215oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i1411R18i1395gR19r65gar69r99hR14oR15R16R17i1414R18i1395gR19jR11:5:2i2r11goR3jR4:9:2oR3jR4:1:1oR6r38R8y8:viewportR10jR11:5:2i4r11R13i-23gR14oR15R16R17i1425R18i1417gR19r359gar69r99hR14oR15R16R17i1428R18i1417gR19jR11:5:2i2r11gR14oR15R16R17i1428R18i1395gR19jR11:5:2i2r11gR14oR15R16R17i1429R18i1394gR19r368goR3jR4:9:2oR3jR4:1:1r358R14oR15R16R17i1440R18i1432gR19r359gar171r172hR14oR15R16R17i1443R18i1432gR19jR11:5:2i2r11gR14oR15R16R17i1443R18i1394gR19jR11:5:2i2r11gR14oR15R16R17i1443R18i1372gR19r344goR3jR4:10:3oR3jR4:1:1oR6r38R8y10:pixelAlignR10r54R29ajR30:0:1nhR13i-21gR14oR15R16R17i1549R18i1539gR19r54goR3jR4:5:3jR5:20:1jR5:3:0oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i1568R18i1552gR19r65gar69r99hR14oR15R16R17i1571R18i1552gR19jR11:5:2i2r11goR3jR4:1:1oR6r38R8y16:halfPixelInverseR10jR11:5:2i2r11R13i-22gR14oR15R16R17i1591R18i1575gR19r404gR14oR15R16R17i1591R18i1552gR19r401gnR14oR15R16R17i1591R18i1535gR19r188goR3jR4:5:3r7oR3jR4:1:1oR6jR7:5:0R8R21R10jR11:5:2i4r11R22oR6r414R8y6:outputR10jR11:12:1ar413oR6r414R8R25R10jR11:5:2i4r11R22r416R13i-7ghR13i-5gR13i-6gR14oR15R16R17i1612R18i1597gR19r415goR3jR4:1:1r64R14oR15R16R17i1631R18i1615gR19r65gR14oR15R16R17i1631R18i1597gR19r415ghR14oR15R16R17i1637R18i1366gR19r188gR6jR44:0:0R45oR6r327R8y6:vertexR10jR11:13:1aoR1ahR35r188ghR13i-25gR35r188goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1r418R14oR15R16R17i1681R18i1669gR19r419goR3jR4:1:1r254R14oR15R16R17i1694R18i1684gR19r255gR14oR15R16R17i1694R18i1669gR19r419ghR14oR15R16R17i1700R18i1663gR19r188gR6jR44:1:0R45oR6r327R8y8:fragmentR10jR11:13:1aoR1ahR35r188ghR13i-26gR35r188ghR8y17:h3d.shader.Base2dy4:varsar202r431r37r110r209r326r64r452r303r386r403r283r223r9r416r53r157r27r264r254r358hg";
h3d_shader_BaseMesh.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey16:relativePositiony4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y2:idi-69gy1:poy4:filey76:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FBaseMesh.hxy3:maxi1010y3:mini994gy1:tr12goR3jR4:1:1oR6jR7:1:0R8y8:positionR10jR11:5:2i3r11y6:parentoR6r17R8y5:inputR10jR11:12:1ar16oR6r17R8y6:normalR10jR11:5:2i3r11R21r19R13i-63ghR13i-61gR13i-62gR14oR15R16R17i1027R18i1013gR19r18gR14oR15R16R17i1027R18i994gR19r12goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y19:transformedPositionR10jR11:5:2i3r11R13i-70gR14oR15R16R17i1052R18i1033gR19r31goR3jR4:5:3jR5:1:0oR3jR4:1:1r9R14oR15R16R17i1071R18i1055gR19r12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:50:0R14oR15R16R17i1090R18i1074gR19jR11:13:1ahgaoR3jR4:1:1oR6jR7:0:0R8y9:modelViewR10jR11:7:0R21oR6r49R8y6:globalR10jR11:12:1aoR6r49R8y4:timeR10jR11:3:0R21r51R13i-57goR6r49R8y9:pixelSizeR10jR11:5:2i2r11R21r51R13i-58gr48oR6r49R8y16:modelViewInverseR10r50R21r51y10:qualifiersajy17:hxsl.VarQualifier:3:0hR13i-60ghR13i-56gR31ar59hR13i-59gR14oR15R16R17i1090R18i1074gR19r50ghR14oR15R16R17i1099R18i1074gR19jR11:8:0gR14oR15R16R17i1099R18i1055gR19jR11:5:2i3r11gR14oR15R16R17i1099R18i1033gR19r31goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y17:projectedPositionR10jR11:5:2i4r11R13i-73gR14oR15R16R17i1122R18i1105gR19r75goR3jR4:5:3r35oR3jR4:8:2oR3jR4:2:1jR25:40:0R14oR15R16R17i1129R18i1125gR19jR11:13:1ahgaoR3jR4:1:1r30R14oR15R16R17i1149R18i1130gR19r31goR3jR4:0:1jy10:hxsl.Const:3:1i1R14oR15R16R17i1152R18i1151gR19r54ghR14oR15R16R17i1153R18i1125gR19jR11:5:2i4r11goR3jR4:1:1oR6r49R8y8:viewProjR10r50R21oR6r49R8y6:cameraR10jR11:12:1aoR6r49R8y4:viewR10r50R21r99R13i-49goR6r49R8y4:projR10r50R21r99R13i-50goR6r49R8R20R10jR11:5:2i3r11R21r99R13i-51goR6r49R8y8:projDiagR10jR11:5:2i3r11R21r99R13i-52gr98oR6r49R8y15:inverseViewProjR10r50R21r99R13i-54goR6jR7:3:0R8y3:dirR10jR11:5:2i3r11R21r99R13i-55ghR13i-48gR13i-53gR14oR15R16R17i1171R18i1156gR19r50gR14oR15R16R17i1171R18i1125gR19jR11:5:2i4r11gR14oR15R16R17i1171R18i1105gR19r75goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y17:transformedNormalR10jR11:5:2i3r11R13i-72gR14oR15R16R17i1194R18i1177gR19r122goR3jR4:8:2oR3jR4:2:1jR25:31:0R14oR15R16R17i1237R18i1197gR19jR11:13:1aoR1aoR8y1:_R10r69ghy3:retr69ghgaoR3jR4:3:1oR3jR4:5:3r35oR3jR4:1:1r21R14oR15R16R17i1210R18i1198gR19r22goR3jR4:8:2oR3jR4:2:1jR25:48:0R14oR15R16R17i1229R18i1213gR19jR11:13:1ahgaoR3jR4:1:1r48R14oR15R16R17i1229R18i1213gR19r50ghR14oR15R16R17i1236R18i1213gR19jR11:6:0gR14oR15R16R17i1236R18i1198gR19r69gR14oR15R16R17i1237R18i1197gR19r69ghR14oR15R16R17i1249R18i1197gR19r69gR14oR15R16R17i1249R18i1177gR19r122goR3jR4:5:3r7oR3jR4:1:1r108R14oR15R16R17i1265R18i1255gR19r110goR3jR4:8:2oR3jR4:2:1r127R14oR15R16R17i1307R18i1268gR19jR11:13:1aoR1aoR8R43R10jR11:5:2i3r11ghR44r69ghgaoR3jR4:3:1oR3jR4:5:3jR5:3:0oR3jR4:1:1r103R14oR15R16R17i1284R18i1269gR19r104goR3jR4:1:1r30R14oR15R16R17i1306R18i1287gR19r31gR14oR15R16R17i1306R18i1269gR19r175gR14oR15R16R17i1307R18i1268gR19r175ghR14oR15R16R17i1319R18i1268gR19r69gR14oR15R16R17i1319R18i1255gR19r110goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y10:pixelColorR10jR11:5:2i4r11R13i-74gR14oR15R16R17i1335R18i1325gR19r198goR3jR4:1:1oR6jR7:2:0R8y5:colorR10jR11:5:2i4r11R13i-76gR14oR15R16R17i1343R18i1338gR19r204gR14oR15R16R17i1343R18i1325gR19r198goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y5:depthR10r54R13i-75gR14oR15R16R17i1354R18i1349gR19r54goR3jR4:5:3jR5:2:0oR3jR4:9:2oR3jR4:1:1r74R14oR15R16R17i1374R18i1357gR19r75gajy14:hxsl.Component:2:0hR14oR15R16R17i1376R18i1357gR19r54goR3jR4:9:2oR3jR4:1:1r74R14oR15R16R17i1396R18i1379gR19r75gajR48:3:0hR14oR15R16R17i1398R18i1379gR19r54gR14oR15R16R17i1398R18i1357gR19r54gR14oR15R16R17i1398R18i1349gR19r54ghR14oR15R16R17i1404R18i988gR19jR11:0:0gR6jy17:hxsl.FunctionKind:2:0y3:refoR6jR7:6:0R8y8:__init__R10jR11:13:1aoR1ahR44r238ghR13i-77gR44r238goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1r121R14oR15R16R17i1461R18i1444gR19r122goR3jR4:8:2oR3jR4:2:1r127R14oR15R16R17i1481R18i1464gR19jR11:13:1aoR1aoR8R43R10r122ghR44r69ghgaoR3jR4:1:1r121R14oR15R16R17i1481R18i1464gR19r122ghR14oR15R16R17i1493R18i1464gR19r69gR14oR15R16R17i1493R18i1444gR19r122ghR14oR15R16R17i1499R18i1438gR19r238gR6jR49:1:0R50oR6r241R8y16:__init__fragmentR10jR11:13:1aoR1ahR44r238ghR13i-78gR44r238goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1oR6jR7:5:0R8R20R10jR11:5:2i4r11R21oR6r286R8y6:outputR10jR11:12:1ar285oR6r286R8R46R10jR11:5:2i4r11R21r288R13i-66goR6r286R8R47R10jR11:5:2i4r11R21r288R13i-67goR6r286R8R23R10jR11:5:2i4r11R21r288R13i-68ghR13i-64gR13i-65gR14oR15R16R17i1544R18i1529gR19r287goR3jR4:1:1r74R14oR15R16R17i1564R18i1547gR19r75gR14oR15R16R17i1564R18i1529gR19r287goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y24:pixelTransformedPositionR10jR11:5:2i3r11R13i-71gR14oR15R16R17i1594R18i1570gR19r307goR3jR4:1:1r30R14oR15R16R17i1616R18i1597gR19r31gR14oR15R16R17i1616R18i1570gR19r307ghR14oR15R16R17i1622R18i1523gR19r238gR6jR49:0:0R50oR6r241R8y6:vertexR10jR11:13:1aoR1ahR44r238ghR13i-79gR44r238goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1r290R14oR15R16R17i1666R18i1654gR19r291goR3jR4:1:1r197R14oR15R16R17i1679R18i1669gR19r198gR14oR15R16R17i1679R18i1654gR19r291goR3jR4:5:3r7oR3jR4:1:1r292R14oR15R16R17i1697R18i1685gR19r293goR3jR4:8:2oR3jR4:2:1jR25:52:0R14oR15R16R17i1704R18i1700gR19jR11:13:1aoR1aoR8y5:valueR10r54ghR44jR11:5:2i4r11ghgaoR3jR4:1:1r211R14oR15R16R17i1710R18i1705gR19r54ghR14oR15R16R17i1711R18i1700gR19r349gR14oR15R16R17i1711R18i1685gR19r293goR3jR4:5:3r7oR3jR4:1:1r294R14oR15R16R17i1730R18i1717gR19r295goR3jR4:8:2oR3jR4:2:1jR25:54:0R14oR15R16R17i1743R18i1733gR19jR11:13:1aoR1aoR8R56R10jR11:5:2i3r11ghR44jR11:5:2i4r11ghgaoR3jR4:1:1r121R14oR15R16R17i1761R18i1744gR19r122ghR14oR15R16R17i1762R18i1733gR19r373gR14oR15R16R17i1762R18i1717gR19r295ghR14oR15R16R17i1768R18i1648gR19r238gR6r273R50oR6r241R8y8:fragmentR10jR11:13:1aoR1ahR44r238ghR13i-80gR44r238ghR8y19:h3d.shader.BaseMeshy4:varsar74r211r318r121r240r385r274r9r99r288r51r19r30r202r306r197hg";
h3d_shader_ScreenShader.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:5:0y4:namey8:positiony4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y6:parentoR6r10R8y6:outputR10jR11:12:1ar9oR6r10R8y5:colorR10jR11:5:2i4r11R13r13y2:idi-121ghR16i-119gR16i-120gy1:poy4:filey80:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FScreenShader.hxy3:maxi262y3:mini247gy1:tr12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R17oR18R19R20i269R21i265gR22jR11:13:1ahgaoR3jR4:1:1oR6jR7:1:0R8R9R10jR11:5:2i2r11R13oR6r30R8y5:inputR10jR11:12:1ar29oR6r30R8y2:uvR10jR11:5:2i2r11R13r32R16i-118ghR16i-116gR16i-117gR17oR18R19R20i284R21i270gR22r31goR3jR4:0:1jy10:hxsl.Const:3:1zR17oR18R19R20i287R21i286gR22jR11:3:0goR3jR4:0:1jR26:3:1i1R17oR18R19R20i290R21i289gR22r43ghR17oR18R19R20i291R21i265gR22jR11:5:2i4r11gR17oR18R19R20i291R21i247gR22r12ghR17oR18R19R20i297R21i241gR22jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr55ghR16i-122gR30r55ghR8y23:h3d.shader.ScreenShadery4:varsar57r13r32hg";
h3d_shader_Blur.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:5:0y4:namey8:positiony4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y6:parentoR6r10R8y6:outputR10jR11:12:1ar9oR6r10R8y5:colorR10jR11:5:2i4r11R13r13y2:idi-136ghR16i-134gR16i-135gy1:poy4:filey80:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FScreenShader.hxy3:maxi262y3:mini247gy1:tr12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R17oR18R19R20i269R21i265gR22jR11:13:1ahgaoR3jR4:1:1oR6jR7:1:0R8R9R10jR11:5:2i2r11R13oR6r30R8y5:inputR10jR11:12:1ar29oR6r30R8y2:uvR10jR11:5:2i2r11R13r32R16i-133ghR16i-131gR16i-132gR17oR18R19R20i284R21i270gR22r31goR3jR4:0:1jy10:hxsl.Const:3:1zR17oR18R19R20i287R21i286gR22jR11:3:0goR3jR4:0:1jR26:3:1i1R17oR18R19R20i290R21i289gR22r43ghR17oR18R19R20i291R21i265gR22jR11:5:2i4r11gR17oR18R19R20i291R21i247gR22r12ghR17oR18R19R20i297R21i241gR22jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr55ghR16i-144gR30r55goR1ahR2oR3jR4:4:1aoR3jR4:10:3oR3jR4:1:1oR6jR7:2:0R8y7:isDepthR10jR11:2:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR16i-139gR17oR18y72:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FBlur.hxR20i376R21i369gR22r71goR3jR4:4:1aoR3jR4:7:2oR6jR7:4:0R8y3:valR10r43R16i-146goR3jR4:0:1jR26:3:1d0R17oR18R34R20i398R21i396gR22r43gR17oR18R34R20i399R21i386gR22r55goR3jR4:13:3oR6r80R8y1:iR10jR11:1:0R16i-147goR3jR4:5:3jR5:21:0oR3jR4:5:3jR5:0:0oR3jR4:6:2jy15:haxe.macro.Unop:3:0oR3jR4:1:1oR6r70R8y7:QualityR10r89R32ajR33:0:1nhR16i-138gR17oR18R34R20i423R21i416gR22r89gR17oR18R34R20i423R21i415gR22r89goR3jR4:0:1jR26:2:1i1R17oR18R34R20i428R21i424gR22r89gR17oR18R34R20i428R21i415gR22r89goR3jR4:1:1r97R17oR18R34R20i435R21i428gR22r89gR17oR18R34R20i435R21i415gR22jR11:14:2r89jy13:hxsl.SizeDecl:0:1zgoR3jR4:5:3jR5:20:1r93oR3jR4:1:1r79R17oR18R34R20i447R21i444gR22r43goR3jR4:5:3jR5:1:0oR3jR4:8:2oR3jR4:2:1jR23:53:0R17oR18R34R20i457R21i451gR22jR11:13:1aoR1aoR8y5:valueR10jR11:5:2i4r11ghR30r43ghgaoR3jR4:8:2oR3jR4:2:1jR23:33:0R17oR18R34R20i465R21i458gR22jR11:13:1aoR1aoR8y1:_R10jR11:10:0goR8y1:bR10jR11:5:2i2r11ghR30jR11:5:2i4r11ghgaoR3jR4:1:1oR6r70R8y7:textureR10r145R16i-137gR17oR18R34R20i465R21i458gR22r145goR3jR4:5:3r93oR3jR4:1:1r34R17oR18R34R20i478R21i470gR22r35goR3jR4:5:3r123oR3jR4:1:1oR6r70R8y5:pixelR10jR11:5:2i2r11R16i-141gR17oR18R34R20i486R21i481gR22r162goR3jR4:8:2oR3jR4:2:1jR23:36:0R17oR18R34R20i494R21i489gR22jR11:13:1aoR1aoR8R40R10r89ghR30r43ghgaoR3jR4:1:1r88R17oR18R34R20i496R21i495gR22r89ghR17oR18R34R20i497R21i489gR22r43gR17oR18R34R20i497R21i481gR22r162gR17oR18R34R20i497R21i470gR22jR11:5:2i2r11ghR17oR18R34R20i498R21i458gR22r148ghR17oR18R34R20i499R21i451gR22r43goR3jR4:16:2oR3jR4:1:1oR6r70R8y6:valuesR10jR11:14:2r43jR39:1:1r97R16i-140gR17oR18R34R20i508R21i502gR22r194goR3jR4:10:3oR3jR4:5:3jR5:9:0oR3jR4:1:1r88R17oR18R34R20i510R21i509gR22r89goR3jR4:0:1jR26:2:1zR17oR18R34R20i514R21i513gR22r89gR17oR18R34R20i514R21i509gR22r71goR3jR4:6:2r95oR3jR4:1:1r88R17oR18R34R20i519R21i518gR22r89gR17oR18R34R20i519R21i517gR22r89goR3jR4:1:1r88R17oR18R34R20i523R21i522gR22r89gR17oR18R34R20i523R21i509gR22r89gR17oR18R34R20i524R21i502gR22r43gR17oR18R34R20i524R21i451gR22r43gR17oR18R34R20i524R21i444gR22r43gR17oR18R34R20i524R21i405gR22r55goR3jR4:5:3r7oR3jR4:1:1r15R17oR18R34R20i543R21i531gR22r16goR3jR4:8:2oR3jR4:2:1jR23:52:0R17oR18R34R20i550R21i546gR22jR11:13:1aoR1aoR8R40R10r43ghR30jR11:5:2i4r11ghgaoR3jR4:8:2oR3jR4:2:1jR23:21:0R17oR18R34R20i554R21i551gR22jR11:13:1aoR1aoR8R41R10r43goR8R42R10r43ghR30r43ghgaoR3jR4:1:1r79R17oR18R34R20i554R21i551gR22r43goR3jR4:0:1jR26:3:1d0.9999999R17oR18R34R20i568R21i559gR22r43ghR17oR18R34R20i569R21i551gR22r43ghR17oR18R34R20i570R21i546gR22r241gR17oR18R34R20i570R21i531gR22r16ghR17oR18R34R20i577R21i379gR22r55goR3jR4:4:1aoR3jR4:7:2oR6r80R8R15R10jR11:5:2i4r11R16i-148goR3jR4:8:2oR3jR4:2:1r22R17oR18R34R20i606R21i602gR22r26gaoR3jR4:0:1jR26:3:1zR17oR18R34R20i608R21i607gR22r43goR3jR4:0:1jR26:3:1zR17oR18R34R20i611R21i610gR22r43goR3jR4:0:1jR26:3:1zR17oR18R34R20i614R21i613gR22r43goR3jR4:0:1jR26:3:1zR17oR18R34R20i617R21i616gR22r43ghR17oR18R34R20i618R21i602gR22r275gR17oR18R34R20i619R21i590gR22r55goR3jR4:13:3oR6r80R8R36R10r89R16i-149goR3jR4:5:3r91oR3jR4:5:3r93oR3jR4:6:2r95oR3jR4:1:1r97R17oR18R34R20i643R21i636gR22r89gR17oR18R34R20i643R21i635gR22r89goR3jR4:0:1jR26:2:1i1R17oR18R34R20i648R21i644gR22r89gR17oR18R34R20i648R21i635gR22r89goR3jR4:1:1r97R17oR18R34R20i655R21i648gR22r89gR17oR18R34R20i655R21i635gR22jR11:14:2r89jR39:0:1zgoR3jR4:5:3jR5:20:1r93oR3jR4:1:1r274R17oR18R34R20i669R21i664gR22r275goR3jR4:5:3r123oR3jR4:8:2oR3jR4:2:1r138R17oR18R34R20i680R21i673gR22jR11:13:1aoR1aoR8R41R10r145gr146hR30r148ghgaoR3jR4:1:1r152R17oR18R34R20i680R21i673gR22r145goR3jR4:5:3r93oR3jR4:1:1r34R17oR18R34R20i693R21i685gR22r35goR3jR4:5:3r123oR3jR4:1:1r161R17oR18R34R20i701R21i696gR22r162goR3jR4:8:2oR3jR4:2:1r167R17oR18R34R20i709R21i704gR22jR11:13:1ar171hgaoR3jR4:1:1r302R17oR18R34R20i711R21i710gR22r89ghR17oR18R34R20i712R21i704gR22r43gR17oR18R34R20i712R21i696gR22r162gR17oR18R34R20i712R21i685gR22jR11:5:2i2r11ghR17oR18R34R20i713R21i673gR22r148goR3jR4:16:2oR3jR4:1:1r192R17oR18R34R20i722R21i716gR22r194goR3jR4:10:3oR3jR4:5:3r199oR3jR4:1:1r302R17oR18R34R20i724R21i723gR22r89goR3jR4:0:1jR26:2:1zR17oR18R34R20i728R21i727gR22r89gR17oR18R34R20i728R21i723gR22r71goR3jR4:6:2r95oR3jR4:1:1r302R17oR18R34R20i733R21i732gR22r89gR17oR18R34R20i733R21i731gR22r89goR3jR4:1:1r302R17oR18R34R20i737R21i736gR22r89gR17oR18R34R20i737R21i723gR22r89gR17oR18R34R20i738R21i716gR22r43gR17oR18R34R20i738R21i673gR22r148gR17oR18R34R20i738R21i664gR22r275gR17oR18R34R20i738R21i625gR22r55goR3jR4:5:3r7oR3jR4:1:1r15R17oR18R34R20i757R21i745gR22r16goR3jR4:1:1r274R17oR18R34R20i765R21i760gR22r275gR17oR18R34R20i765R21i745gR22r16ghR17oR18R34R20i772R21i583gR22r55gR17oR18R34R20i772R21i365gR22r55goR3jR4:10:3oR3jR4:1:1oR6r70R8y13:hasFixedColorR10r71R32ajR33:0:1nhR16i-142gR17oR18R34R20i794R21i781gR22r71goR3jR4:4:1aoR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1r15R17oR18R34R20i816R21i804gR22r16gajy14:hxsl.Component:0:0jR47:1:0jR47:2:0hR17oR18R34R20i820R21i804gR22jR11:5:2i3r11goR3jR4:9:2oR3jR4:1:1oR6r70R8y10:fixedColorR10jR11:5:2i4r11R16i-143gR17oR18R34R20i833R21i823gR22r441gar432r433r434hR17oR18R34R20i837R21i823gR22jR11:5:2i3r11gR17oR18R34R20i837R21i804gR22r437goR3jR4:5:3jR5:20:1r123oR3jR4:9:2oR3jR4:1:1r15R17oR18R34R20i856R21i844gR22r16gajR47:3:0hR17oR18R34R20i858R21i844gR22r43goR3jR4:9:2oR3jR4:1:1r440R17oR18R34R20i872R21i862gR22r441gar457hR17oR18R34R20i874R21i862gR22r43gR17oR18R34R20i874R21i844gR22r43ghR17oR18R34R20i881R21i797gR22r55gnR17oR18R34R20i881R21i777gR22r55ghR17oR18R34R20i886R21i359gR22r55gR6jR27:1:0R28oR6r58R8y8:fragmentR10jR11:13:1aoR1ahR30r55ghR16i-145gR30r55ghR8y15:h3d.shader.Blury4:varsar57r97r161r419r440r192r476r152r69r13r32hg";
h3d_shader_ColorAdd.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:20:1jR5:0:0oR3jR4:9:2oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey10:pixelColory4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-150gy1:poy4:filey76:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FColorAdd.hxy3:maxi180y3:mini170gy1:tr14gajy14:hxsl.Component:0:0jR20:1:0jR20:2:0hR14oR15R16R17i184R18i170gR19jR11:5:2i3r13goR3jR4:1:1oR6jR7:2:0R8y5:colorR10jR11:5:2i3r13R13i-151gR14oR15R16R17i193R18i188gR19r27gR14oR15R16R17i193R18i170gR19r23ghR14oR15R16R17i199R18i164gR19jR11:0:0gR6jy17:hxsl.FunctionKind:1:0y3:refoR6jR7:6:0R8y8:fragmentR10jR11:13:1aoR1ahy3:retr34ghR13i-152gR25r34ghR8y19:h3d.shader.ColorAddy4:varsar36r25r11hg";
h3d_shader_ColorKey.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:7:2oy4:kindjy12:hxsl.VarKind:4:0y4:namey5:cdiffy4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-156goR3jR4:5:3jy16:haxe.macro.Binop:3:0oR3jR4:1:1oR5r8R7y12:textureColorR9jR10:5:2i4r9R12i-154gy1:poy4:filey76:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FColorKey.hxy3:maxi197y3:mini185gy1:tr15goR3jR4:1:1oR5jR6:2:0R7y8:colorKeyR9jR10:5:2i4r9R12i-153gR15oR16R17R18i208R19i200gR20r21gR15oR16R17R18i208R19i185gR20r10gR15oR16R17R18i209R19i173gR20jR10:0:0goR3jR4:10:3oR3jR4:5:3jR13:9:0oR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:29:0R15oR16R17R18i223R19i218gR20jR10:13:1aoR1aoR7y1:_R9r10goR7y1:bR9jR10:5:2i4r9ghy3:retjR10:3:0ghgaoR3jR4:1:1r7R15oR16R17R18i223R19i218gR20r10goR3jR4:1:1r7R15oR16R17R18i233R19i228gR20r10ghR15oR16R17R18i234R19i218gR20r43goR3jR4:0:1jy10:hxsl.Const:3:1d1e-05R15oR16R17R18i244R19i237gR20r43gR15oR16R17R18i244R19i218gR20jR10:2:0goR3jR4:11:0R15oR16R17R18i254R19i247gR20r28gnR15oR16R17R18i254R19i214gR20r28ghR15oR16R17R18i260R19i167gR20r28gR5jy17:hxsl.FunctionKind:1:0y3:refoR5jR6:6:0R7y8:fragmentR9jR10:13:1aoR1ahR25r28ghR12i-155gR25r28ghR7y19:h3d.shader.ColorKeyy4:varsar69r19r14hg";
h3d_shader_ColorMatrix.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:7:2oy4:kindjy12:hxsl.VarKind:4:0y4:namey3:rgby4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y2:idi-160goR3jR4:5:3jy16:haxe.macro.Binop:1:0oR3jR4:9:2oR3jR4:1:1oR5r8R7y10:pixelColorR9jR10:5:2i4r9R12i-157gy1:poy4:filey79:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FColorMatrix.hxy3:maxi194y3:mini184gy1:tr16gajy14:hxsl.Component:0:0jR21:1:0jR21:2:0hR15oR16R17R18i198R19i184gR20jR10:5:2i3r9goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:50:0R15oR16R17R18i207R19i201gR20jR10:13:1ahgaoR3jR4:1:1oR5jR6:2:0R7y6:matrixR9jR10:7:0R12i-158gR15oR16R17R18i207R19i201gR20r37ghR15oR16R17R18i216R19i201gR20jR10:8:0gR15oR16R17R18i216R19i184gR20r10gR15oR16R17R18i217R19i174gR20jR10:0:0goR3jR4:5:3jR13:4:0oR3jR4:9:2oR3jR4:1:1r15R15oR16R17R18i232R19i222gR20r16gajR21:3:0hR15oR16R17R18i234R19i222gR20jR10:3:0goR3jR4:9:2oR3jR4:3:1oR3jR4:5:3r12oR3jR4:1:1r15R15oR16R17R18i248R19i238gR20r16goR3jR4:1:1r35R15oR16R17R18i257R19i251gR20r37gR15oR16R17R18i257R19i238gR20jR10:5:2i4r9gR15oR16R17R18i258R19i237gR20r70gar55hR15oR16R17R18i260R19i237gR20r58gR15oR16R17R18i260R19i222gR20r58goR3jR4:5:3r49oR3jR4:9:2oR3jR4:1:1r15R15oR16R17R18i276R19i266gR20r16gar20r21r22hR15oR16R17R18i280R19i266gR20jR10:5:2i3r9goR3jR4:1:1r7R15oR16R17R18i286R19i283gR20r10gR15oR16R17R18i286R19i266gR20r86ghR15oR16R17R18i292R19i168gR20r47gR5jy17:hxsl.FunctionKind:1:0y3:refoR5jR6:6:0R7y8:fragmentR9jR10:13:1aoR1ahy3:retr47ghR12i-159gR27r47ghR7y22:h3d.shader.ColorMatrixy4:varsar95r35r15hg";
h3d_shader_DirLight.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:20:1jR5:0:0oR3jR4:9:2oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey10:lightColory4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y2:idi-83gy1:poy4:filey76:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FDirLight.hxy3:maxi274y3:mini264gy1:tr14gajy14:hxsl.Component:0:0jR20:1:0jR20:2:0hR14oR15R16R17i278R18i264gR19jR11:5:2i3r13goR3jR4:5:3jR5:1:0oR3jR4:1:1oR6jR7:2:0R8y5:colorR10jR11:5:2i3r13R13i-81gR14oR15R16R17i287R18i282gR19r29goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:22:0R14oR15R16R17i322R18i290gR19jR11:13:1aoR1aoR8y1:_R10jR11:3:0goR8y1:bR10r41ghy3:retr41ghgaoR3jR4:8:2oR3jR4:2:1jR22:29:0R14oR15R16R17i307R18i290gR19jR11:13:1aoR1aoR8R23R10jR11:5:2i3r13goR8R24R10jR11:5:2i3r13ghR25r41ghgaoR3jR4:1:1oR6r12R8y17:transformedNormalR10r54R13i-85gR14oR15R16R17i307R18i290gR19r54goR3jR4:1:1oR6r28R8y9:directionR10jR11:5:2i3r13R13i-82gR14oR15R16R17i321R18i312gR19r65ghR14oR15R16R17i322R18i290gR19r41goR3jR4:0:1jy10:hxsl.Const:3:1d0R14oR15R16R17i329R18i327gR19r41ghR14oR15R16R17i330R18i290gR19r41gR14oR15R16R17i330R18i282gR19r29gR14oR15R16R17i330R18i264gR19r23ghR14oR15R16R17i336R18i258gR19jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahR25r82ghR13i-86gR25r82goR1ahR2oR3jR4:4:1aoR3jR4:5:3jR5:20:1r7oR3jR4:9:2oR3jR4:1:1oR6r12R8y15:lightPixelColorR10jR11:5:2i3r13R13i-84gR14oR15R16R17i383R18i368gR19r99gar18r19r20hR14oR15R16R17i387R18i368gR19jR11:5:2i3r13goR3jR4:5:3r25oR3jR4:1:1r27R14oR15R16R17i396R18i391gR19r29goR3jR4:8:2oR3jR4:2:1r34R14oR15R16R17i431R18i399gR19jR11:13:1aoR1aoR8R23R10r41gr42hR25r41ghgaoR3jR4:8:2oR3jR4:2:1r47R14oR15R16R17i416R18i399gR19jR11:13:1aoR1aoR8R23R10r54gr55hR25r41ghgaoR3jR4:1:1r60R14oR15R16R17i416R18i399gR19r54goR3jR4:1:1r64R14oR15R16R17i430R18i421gR19r65ghR14oR15R16R17i431R18i399gR19r41goR3jR4:0:1jR28:3:1d0R14oR15R16R17i438R18i436gR19r41ghR14oR15R16R17i439R18i399gR19r41gR14oR15R16R17i439R18i391gR19r29gR14oR15R16R17i439R18i368gR19r105ghR14oR15R16R17i445R18i362gR19r82gR6jR29:1:0R30oR6r85R8y8:fragmentR10jR11:13:1aoR1ahR25r82ghR13i-87gR25r82ghR8y19:h3d.shader.DirLighty4:varsar84r60r11r151r27r64r98hg";
h3d_shader_Shadow.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:10:3oR3jR4:6:2jy15:haxe.macro.Unop:2:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:2:0y4:namey8:perPixely4:typejy9:hxsl.Type:2:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhy2:idi-98gy1:poy4:filey74:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FShadow.hxy3:maxi416y3:mini408gy1:tr12gR15oR16R17R18i416R19i407gR20r12goR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oR6jR7:3:0R8y9:shadowPosR10jR11:5:2i3jy12:hxsl.VecType:1:0R12ajR13:1:0hR14i-97gR15oR16R17R18i428R19i419gR20r25goR3jR4:5:3jR21:0:0oR3jR4:5:3jR21:1:0oR3jR4:5:3r33oR3jR4:1:1oR6jR7:4:0R8y19:transformedPositionR10jR11:5:2i3r24R14i-95gR15oR16R17R18i450R19i431gR20r38goR3jR4:1:1oR6jR7:0:0R8y4:projR10jR11:8:0y6:parentoR6r43R8y6:shadowR10jR11:12:1aoR6r43R8y3:mapR10jR11:10:0R26r45R14i-89gr42oR6r43R8y5:colorR10jR11:5:2i3r24R26r45R14i-91goR6r43R8y5:powerR10jR11:3:0R26r45R14i-92goR6r43R8y4:biasR10r52R26r45R14i-93ghR14i-88gR14i-90gR15oR16R17R18i464R19i453gR20r44gR15oR16R17R18i464R19i431gR20jR11:5:2i3r24goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:39:0R15oR16R17R18i471R19i467gR20jR11:13:1ahgaoR3jR4:0:1jy10:hxsl.Const:3:1d0.5R15oR16R17R18i475R19i472gR20r52goR3jR4:0:1jR33:3:1d-0.5R15oR16R17R18i481R19i477gR20r52goR3jR4:0:1jR33:3:1i1R15oR16R17R18i484R19i483gR20r52ghR15oR16R17R18i485R19i467gR20jR11:5:2i3r24gR15oR16R17R18i485R19i431gR20jR11:5:2i3r24goR3jR4:8:2oR3jR4:2:1r62R15oR16R17R18i492R19i488gR20r66gaoR3jR4:0:1jR33:3:1d0.5R15oR16R17R18i496R19i493gR20r52goR3jR4:0:1jR33:3:1d0.5R15oR16R17R18i501R19i498gR20r52goR3jR4:0:1jR33:3:1zR15oR16R17R18i504R19i503gR20r52ghR15oR16R17R18i505R19i488gR20jR11:5:2i3r24gR15oR16R17R18i505R19i431gR20jR11:5:2i3r24gR15oR16R17R18i505R19i419gR20r25gnR15oR16R17R18i505R19i403gR20jR11:0:0ghR15oR16R17R18i511R19i397gR20r113gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr113ghR14i-99gR37r113goR1ahR2oR3jR4:4:1aoR3jR4:7:2oR6r37R8R22R10jR11:5:2i3r24R14i-101goR3jR4:10:3oR3jR4:1:1r10R15oR16R17R18i573R19i565gR20r12goR3jR4:5:3r31oR3jR4:5:3r33oR3jR4:5:3r33oR3jR4:1:1oR6r37R8y24:pixelTransformedPositionR10jR11:5:2i3r24R14i-96gR15oR16R17R18i600R19i576gR20r139goR3jR4:1:1r42R15oR16R17R18i614R19i603gR20r44gR15oR16R17R18i614R19i576gR20r59goR3jR4:8:2oR3jR4:2:1r62R15oR16R17R18i621R19i617gR20r66gaoR3jR4:0:1jR33:3:1d0.5R15oR16R17R18i625R19i622gR20r52goR3jR4:0:1jR33:3:1d-0.5R15oR16R17R18i631R19i627gR20r52goR3jR4:0:1jR33:3:1i1R15oR16R17R18i634R19i633gR20r52ghR15oR16R17R18i635R19i617gR20jR11:5:2i3r24gR15oR16R17R18i635R19i576gR20jR11:5:2i3r24goR3jR4:8:2oR3jR4:2:1r62R15oR16R17R18i642R19i638gR20r66gaoR3jR4:0:1jR33:3:1d0.5R15oR16R17R18i646R19i643gR20r52goR3jR4:0:1jR33:3:1d0.5R15oR16R17R18i651R19i648gR20r52goR3jR4:0:1jR33:3:1zR15oR16R17R18i654R19i653gR20r52ghR15oR16R17R18i655R19i638gR20jR11:5:2i3r24gR15oR16R17R18i655R19i576gR20r129goR3jR4:1:1r22R15oR16R17R18i670R19i661gR20r25gR15oR16R17R18i670R19i561gR20r129gR15oR16R17R18i671R19i545gR20r113goR3jR4:7:2oR6r37R8y5:depthR10r52R14i-102goR3jR4:8:2oR3jR4:2:1jR32:53:0R15oR16R17R18i696R19i690gR20jR11:13:1aoR1aoR8y5:valueR10jR11:5:2i4r24ghR37r52ghgaoR3jR4:8:2oR3jR4:2:1jR32:33:0R15oR16R17R18i707R19i697gR20jR11:13:1aoR1aoR8y1:_R10r48goR8y1:bR10jR11:5:2i2r24ghR37jR11:5:2i4r24ghgaoR3jR4:1:1r47R15oR16R17R18i707R19i697gR20r48goR3jR4:9:2oR3jR4:1:1r128R15oR16R17R18i721R19i712gR20r129gajy14:hxsl.Component:0:0jR43:1:0hR15oR16R17R18i724R19i712gR20jR11:5:2i2r24ghR15oR16R17R18i725R19i697gR20r224ghR15oR16R17R18i726R19i690gR20r52gR15oR16R17R18i727R19i678gR20r113goR3jR4:7:2oR6r37R8y4:zMaxR10r52R14i-103goR3jR4:8:2oR3jR4:2:1jR32:51:0R15oR16R17R18i919R19i908gR20jR11:13:1aoR1aoR8R41R10r52ghR37r52ghgaoR3jR4:9:2oR3jR4:1:1r128R15oR16R17R18i917R19i908gR20r129gajR43:2:0hR15oR16R17R18i919R19i908gR20r52ghR15oR16R17R18i930R19i908gR20r52gR15oR16R17R18i931R19i897gR20r113goR3jR4:7:2oR6r37R8y5:deltaR10r52R14i-104goR3jR4:5:3jR21:3:0oR3jR4:8:2oR3jR4:2:1jR32:21:0R15oR16R17R18i969R19i948gR20jR11:13:1aoR1aoR8R41R10r52goR8R42R10r52ghR37r52ghgaoR3jR4:3:1oR3jR4:5:3r31oR3jR4:1:1r200R15oR16R17R18i954R19i949gR20r52goR3jR4:1:1r53R15oR16R17R18i968R19i957gR20r52gR15oR16R17R18i968R19i949gR20r52gR15oR16R17R18i969R19i948gR20r52goR3jR4:1:1r247R15oR16R17R18i978R19i974gR20r52ghR15oR16R17R18i979R19i948gR20r52goR3jR4:1:1r247R15oR16R17R18i986R19i982gR20r52gR15oR16R17R18i986R19i948gR20r52gR15oR16R17R18i987R19i936gR20r113goR3jR4:7:2oR6r37R8y5:shadeR10r52R14i-105goR3jR4:8:2oR3jR4:2:1r250R15oR16R17R18i1032R19i1004gR20jR11:13:1aoR1aoR8R41R10r52ghR37r52ghgaoR3jR4:8:2oR3jR4:2:1jR32:9:0R15oR16R17R18i1007R19i1004gR20jR11:13:1aoR1aoR8R40R10r52ghR37r52ghgaoR3jR4:5:3r33oR3jR4:1:1r51R15oR16R17R18i1021R19i1009gR20r52goR3jR4:1:1r272R15oR16R17R18i1029R19i1024gR20r52gR15oR16R17R18i1029R19i1009gR20r52ghR15oR16R17R18i1032R19i1004gR20r52ghR15oR16R17R18i1043R19i1004gR20r52gR15oR16R17R18i1044R19i992gR20r113goR3jR4:5:3jR21:20:1r33oR3jR4:9:2oR3jR4:1:1oR6r37R8y10:pixelColorR10jR11:5:2i4r24R14i-94gR15oR16R17R18i1059R19i1049gR20r354gar235r236r264hR15oR16R17R18i1063R19i1049gR20jR11:5:2i3r24goR3jR4:5:3r31oR3jR4:5:3r33oR3jR4:3:1oR3jR4:5:3r274oR3jR4:0:1jR33:3:1i1R15oR16R17R18i1069R19i1068gR20r52goR3jR4:1:1r312R15oR16R17R18i1077R19i1072gR20r52gR15oR16R17R18i1077R19i1068gR20r52gR15oR16R17R18i1078R19i1067gR20r52goR3jR4:9:2oR3jR4:1:1r49R15oR16R17R18i1093R19i1081gR20r50gar235r236r264hR15oR16R17R18i1097R19i1081gR20jR11:5:2i3r24gR15oR16R17R18i1097R19i1067gR20r383goR3jR4:1:1r312R15oR16R17R18i1105R19i1100gR20r52gR15oR16R17R18i1105R19i1067gR20r383gR15oR16R17R18i1105R19i1049gR20r360ghR15oR16R17R18i1111R19i537gR20r113gR6jR34:1:0R35oR6r118R8y8:fragmentR10jR11:13:1aoR1ahR37r113ghR14i-100gR37r113ghR8y17:h3d.shader.Shadowy4:varsar117r396r45r22r36r353r138r10hg";
h3d_shader_Skin.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey19:transformedPositiony4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y2:idi-32gy1:poy4:filey72:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FSkin.hxy3:maxi506y3:mini487gy1:tr12goR3jR4:5:3jR5:0:0oR3jR4:5:3r16oR3jR4:5:3jR5:1:0oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1oR6jR7:1:0R8y8:positionR10jR11:5:2i3r11y6:parentoR6r24R8y5:inputR10jR11:12:1ar23oR6r24R8y6:normalR10jR11:5:2i3r11R21r26R13i-29goR6r24R8y7:weightsR10jR11:5:2i3r11R21r26R13i-30goR6r24R8y7:indexesR10jR11:9:1i4R21r26R13i-31ghR13i-27gR13i-28gR14oR15R16R17i529R18i515gR19r25goR3jR4:16:2oR3jR4:1:1oR6jR7:2:0R8y13:bonesMatrixesR10jR11:14:2jR11:8:0jy13:hxsl.SizeDecl:1:1oR6r40R8y8:MaxBonesR10jR11:1:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR13i-34gR13i-35gR14oR15R16R17i545R18i532gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i559R18i546gR19r33gajy14:hxsl.Component:0:0hR14oR15R16R17i561R18i546gR19r43gR14oR15R16R17i562R18i532gR19r41gR14oR15R16R17i562R18i515gR19jR11:5:2i3r11gR14oR15R16R17i563R18i514gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i579R18i566gR19r31gar55hR14oR15R16R17i581R18i566gR19jR11:3:0gR14oR15R16R17i581R18i514gR19r62goR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r23R14oR15R16R17i604R18i590gR19r25goR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i620R18i607gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i634R18i621gR19r33gajR31:1:0hR14oR15R16R17i636R18i621gR19r43gR14oR15R16R17i637R18i607gR19r41gR14oR15R16R17i637R18i590gR19r62gR14oR15R16R17i638R18i589gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i654R18i641gR19r31gar90hR14oR15R16R17i656R18i641gR19r72gR14oR15R16R17i656R18i589gR19r62gR14oR15R16R17i656R18i514gR19jR11:5:2i3r11goR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r23R14oR15R16R17i679R18i665gR19r25goR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i695R18i682gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i709R18i696gR19r33gajR31:2:0hR14oR15R16R17i711R18i696gR19r43gR14oR15R16R17i712R18i682gR19r41gR14oR15R16R17i712R18i665gR19r62gR14oR15R16R17i713R18i664gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i729R18i716gR19r31gar126hR14oR15R16R17i731R18i716gR19r72gR14oR15R16R17i731R18i664gR19r62gR14oR15R16R17i731R18i514gR19jR11:5:2i3r11gR14oR15R16R17i731R18i487gR19r12goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y17:transformedNormalR10jR11:5:2i3r11R13i-33gR14oR15R16R17i754R18i737gR19r152goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:31:0R14oR15R16R17i766R18i757gR19jR11:13:1aoR1aoR8y5:valueR10r62ghy3:retr62ghgaoR3jR4:5:3r16oR3jR4:5:3r16oR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r28R14oR15R16R17i786R18i774gR19r29goR3jR4:8:2oR3jR4:2:1jR33:48:0R14oR15R16R17i793R18i789gR19jR11:13:1ahgaoR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i807R18i794gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i821R18i808gR19r33gar55hR14oR15R16R17i823R18i808gR19r43gR14oR15R16R17i824R18i794gR19r41ghR14oR15R16R17i825R18i789gR19jR11:6:0gR14oR15R16R17i825R18i774gR19r62gR14oR15R16R17i826R18i773gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i842R18i829gR19r31gar55hR14oR15R16R17i844R18i829gR19r72gR14oR15R16R17i844R18i773gR19r62goR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r28R14oR15R16R17i865R18i853gR19r29goR3jR4:8:2oR3jR4:2:1r176R14oR15R16R17i872R18i868gR19r180gaoR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i886R18i873gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i900R18i887gR19r33gar90hR14oR15R16R17i902R18i887gR19r43gR14oR15R16R17i903R18i873gR19r41ghR14oR15R16R17i904R18i868gR19r197gR14oR15R16R17i904R18i853gR19r62gR14oR15R16R17i905R18i852gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i921R18i908gR19r31gar90hR14oR15R16R17i923R18i908gR19r72gR14oR15R16R17i923R18i852gR19r62gR14oR15R16R17i923R18i773gR19jR11:5:2i3r11goR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r28R14oR15R16R17i944R18i932gR19r29goR3jR4:8:2oR3jR4:2:1r176R14oR15R16R17i951R18i947gR19r180gaoR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i965R18i952gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i979R18i966gR19r33gar126hR14oR15R16R17i981R18i966gR19r43gR14oR15R16R17i982R18i952gR19r41ghR14oR15R16R17i983R18i947gR19r197gR14oR15R16R17i983R18i932gR19r62gR14oR15R16R17i984R18i931gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i1000R18i987gR19r31gar126hR14oR15R16R17i1002R18i987gR19r72gR14oR15R16R17i1002R18i931gR19r62gR14oR15R16R17i1002R18i773gR19jR11:5:2i3r11ghR14oR15R16R17i1003R18i757gR19r62gR14oR15R16R17i1003R18i737gR19r152ghR14oR15R16R17i1018R18i388gR19jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahR35r301ghR13i-36gR35r301ghR8y15:h3d.shader.Skiny4:varsar303r151r39r26r9r42hg";
h3d_shader_Texture.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey12:calculatedUVy4:typejy9:hxsl.Type:5:2i2jy12:hxsl.VecType:1:0y2:idi-43gy1:poy4:filey75:%2Fhome%2Fwilliam%2Fdev%2Fhaxelib%2Fheaps%2Fgit%2Fh3d%2Fshader%2FTexture.hxy3:maxi370y3:mini358gy1:tr12goR3jR4:1:1oR6jR7:1:0R8y2:uvR10jR11:5:2i2r11y6:parentoR6r17R8y5:inputR10jR11:12:1ar16hR13i-37gR13i-38gR14oR15R16R17i381R18i373gR19r18gR14oR15R16R17i381R18i358gR19r12ghR14oR15R16R17i387R18i352gR19jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr28ghR13i-45gR26r28goR1ahR2oR3jR4:4:1aoR3jR4:7:2oR6r10R8y1:cR10jR11:5:2i4r11R13i-47goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:33:0R14oR15R16R17i434R18i427gR19jR11:13:1aoR1aoR8y1:_R10jR11:10:0goR8y1:bR10jR11:5:2i2r11ghR26r42ghgaoR3jR4:1:1oR6jR7:2:0R8y7:textureR10r52R13i-42gR14oR15R16R17i434R18i427gR19r52goR3jR4:1:1r9R14oR15R16R17i451R18i439gR19r12ghR14oR15R16R17i452R18i427gR19r42gR14oR15R16R17i453R18i419gR19r28goR3jR4:10:3oR3jR4:5:3jR5:14:0oR3jR4:1:1oR6r59R8y9:killAlphaR10jR11:2:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR13i-40gR14oR15R16R17i471R18i462gR19r74goR3jR4:5:3jR5:9:0oR3jR4:5:3jR5:3:0oR3jR4:9:2oR3jR4:1:1r41R14oR15R16R17i476R18i475gR19r42gajy14:hxsl.Component:3:0hR14oR15R16R17i478R18i475gR19jR11:3:0goR3jR4:1:1oR6r59R8y18:killAlphaThresholdR10r91R13i-41gR14oR15R16R17i499R18i481gR19r91gR14oR15R16R17i499R18i475gR19r91goR3jR4:0:1jy10:hxsl.Const:3:1zR14oR15R16R17i503R18i502gR19r91gR14oR15R16R17i503R18i475gR19r74gR14oR15R16R17i503R18i462gR19r74goR3jR4:11:0R14oR15R16R17i513R18i506gR19r28gnR14oR15R16R17i513R18i458gR19r28goR3jR4:10:3oR3jR4:1:1oR6r59R8y8:additiveR10r74R33ajR34:0:1nhR13i-39gR14oR15R16R17i531R18i523gR19r74goR3jR4:5:3jR5:20:1jR5:0:0oR3jR4:1:1oR6r10R8y10:pixelColorR10jR11:5:2i4r11R13i-44gR14oR15R16R17i549R18i539gR19r123goR3jR4:1:1r41R14oR15R16R17i554R18i553gR19r42gR14oR15R16R17i554R18i539gR19r123goR3jR4:5:3jR5:20:1jR5:1:0oR3jR4:1:1r122R14oR15R16R17i580R18i570gR19r123goR3jR4:1:1r41R14oR15R16R17i585R18i584gR19r42gR14oR15R16R17i585R18i570gR19r123gR14oR15R16R17i585R18i519gR19r28ghR14oR15R16R17i591R18i413gR19r28gR6jR23:1:0R24oR6r31R8y8:fragmentR10jR11:13:1aoR1ahR26r28ghR13i-46gR26r28ghR8y18:h3d.shader.Texturey4:varsar9r30r147r113r58r93r19r73r122hg";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
hxd_Key.initDone = false;
hxd_Key.keyPressed = [];
hxd_System.setCursor = hxd_System.setNativeCursor;
hxd_System.LOOP_INIT = false;
hxd_Timer.wantedFPS = 60;
hxd_Timer.maxDeltaTime = 0.5;
hxd_Timer.oldTime = haxe_Timer.stamp();
hxd_Timer.tmod_factor = 0.95;
hxd_Timer.calc_tmod = 1;
hxd_Timer.tmod = 1;
hxd_Timer.deltaT = 1;
hxd_Timer.frameCount = 0;
hxd_impl_Memory.stack = [];
hxd_impl_Memory.inst = new hxd_impl_MemoryReader();
hxd_impl_Tmp.bytes = [];
hxsl_Tools.UID = 0;
hxsl_Tools.SWIZ = Type.allEnums(hxsl_Component);
js_Boot.__toStr = {}.toString;
hxsl_GlslOut.KWD_LIST = ["input","output","discard","dvec2","dvec3","dvec4"];
hxsl_GlslOut.KWDS = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var _g1 = 0;
		var _g2 = hxsl_GlslOut.KWD_LIST;
		while(_g1 < _g2.length) {
			var k = _g2[_g1];
			++_g1;
			if(__map_reserved[k] != null) _g.setReserved(k,true); else _g.h[k] = true;
		}
	}
	$r = _g;
	return $r;
}(this));
hxsl_GlslOut.GLOBALS = (function($this) {
	var $r;
	var m = new haxe_ds_EnumValueMap();
	{
		var _g = 0;
		var _g1 = Type.allEnums(hxsl_TGlobal);
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			var n = "" + Std.string(g);
			n = n.charAt(0).toLowerCase() + HxOverrides.substr(n,1,null);
			m.set(g,n);
		}
	}
	m.set(hxsl_TGlobal.ToInt,"int");
	m.set(hxsl_TGlobal.ToFloat,"float");
	m.set(hxsl_TGlobal.ToBool,"bool");
	m.set(hxsl_TGlobal.Texture2D,"_texture2D");
	var $it0 = m.iterator();
	while( $it0.hasNext() ) {
		var g1 = $it0.next();
		hxsl_GlslOut.KWDS.set(g1,true);
	}
	$r = m;
	return $r;
}(this));
hxsl_GlslOut.MAT34 = "struct mat3x4 { vec4 a; vec4 b; vec4 c; };";
hxsl_RuntimeShader.UID = 0;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
