/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */

var __extends = (this && this.__extends) || function (d, b) {
for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
function __() { this.constructor = d; }
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var org;
(function (org) {
var jsweet;
(function (jsweet) {
    var examples;
    (function (examples) {
        var raytracer;
        (function (raytracer) {
            var Vector = (function () {
                function Vector(x, y, z) {
                    if (this.x === undefined)
                        this.x = 0;
                    if (this.y === undefined)
                        this.y = 0;
                    if (this.z === undefined)
                        this.z = 0;
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
                Vector.times = function (k, v) {
                    return new Vector(k * v.x, k * v.y, k * v.z);
                };
                Vector.minus = function (v1, v2) {
                    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
                };
                Vector.plus = function (v1, v2) {
                    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
                };
                Vector.dot = function (v1, v2) {
                    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
                };
                Vector.mag = function (v) {
                    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
                };
                Vector.norm = function (v) {
                    var mag = Vector.mag(v);
                    var div = (mag === 0) ? Infinity : 1.0 / mag;
                    return Vector.times(div, v);
                };
                Vector.cross = function (v1, v2) {
                    return new Vector(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
                };
                return Vector;
            }());
            raytracer.Vector = Vector;
            Vector["__class"] = "org.jsweet.examples.raytracer.Vector";
            var Color = (function () {
                function Color(r, g, b) {
                    if (this.r === undefined)
                        this.r = 0;
                    if (this.g === undefined)
                        this.g = 0;
                    if (this.b === undefined)
                        this.b = 0;
                    this.r = r;
                    this.g = g;
                    this.b = b;
                }
                Color.scale = function (k, v) {
                    return new Color(k * v.r, k * v.g, k * v.b);
                };
                Color.plus = function (v1, v2) {
                    return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
                };
                Color.times = function (v1, v2) {
                    return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
                };
                Color.white_$LI$ = function () { if (Color.white == null)
                    Color.white = new Color(1.0, 1.0, 1.0); return Color.white; };
                ;
                Color.grey_$LI$ = function () { if (Color.grey == null)
                    Color.grey = new Color(0.5, 0.5, 0.5); return Color.grey; };
                ;
                Color.black_$LI$ = function () { if (Color.black == null)
                    Color.black = new Color(0.0, 0.0, 0.0); return Color.black; };
                ;
                Color.background_$LI$ = function () { if (Color.background == null)
                    Color.background = Color.black_$LI$(); return Color.background; };
                ;
                Color.defaultColor_$LI$ = function () { if (Color.defaultColor == null)
                    Color.defaultColor = Color.black_$LI$(); return Color.defaultColor; };
                ;
                Color.toDrawingColor = function (c) {
                    var legalize = function (d) { return d > 1 ? 1 : d; };
                    return new Color(Math.floor((function (target) { return (typeof target === 'function') ? target(c.r) : target.apply(c.r); })(legalize) * 255), Math.floor((function (target) { return (typeof target === 'function') ? target(c.g) : target.apply(c.g); })(legalize) * 255), Math.floor((function (target) { return (typeof target === 'function') ? target(c.b) : target.apply(c.b); })(legalize) * 255));
                };
                return Color;
            }());
            raytracer.Color = Color;
            Color["__class"] = "org.jsweet.examples.raytracer.Color";
            var Camera = (function () {
                function Camera(pos, lookAt) {
                    if (this.forward === undefined)
                        this.forward = null;
                    if (this.right === undefined)
                        this.right = null;
                    if (this.up === undefined)
                        this.up = null;
                    if (this.pos === undefined)
                        this.pos = null;
                    this.pos = pos;
                    var down = new org.jsweet.examples.raytracer.Vector(0.0, -1.0, 0.0);
                    this.forward = org.jsweet.examples.raytracer.Vector.norm(org.jsweet.examples.raytracer.Vector.minus(lookAt, this.pos));
                    this.right = org.jsweet.examples.raytracer.Vector.times(1.5, org.jsweet.examples.raytracer.Vector.norm(org.jsweet.examples.raytracer.Vector.cross(this.forward, down)));
                    this.up = org.jsweet.examples.raytracer.Vector.times(1.5, org.jsweet.examples.raytracer.Vector.norm(org.jsweet.examples.raytracer.Vector.cross(this.forward, this.right)));
                }
                return Camera;
            }());
            raytracer.Camera = Camera;
            Camera["__class"] = "org.jsweet.examples.raytracer.Camera";
            var Ray = (function () {
                function Ray(start, dir) {
                    if (this.start === undefined)
                        this.start = null;
                    if (this.dir === undefined)
                        this.dir = null;
                    this.start = start;
                    this.dir = dir;
                }
                return Ray;
            }());
            raytracer.Ray = Ray;
            Ray["__class"] = "org.jsweet.examples.raytracer.Ray";
            var Intersection = (function () {
                function Intersection(thing, ray, dist) {
                    if (this.thing === undefined)
                        this.thing = null;
                    if (this.ray === undefined)
                        this.ray = null;
                    if (this.dist === undefined)
                        this.dist = 0;
                    this.thing = thing;
                    this.ray = ray;
                    this.dist = dist;
                }
                return Intersection;
            }());
            raytracer.Intersection = Intersection;
            Intersection["__class"] = "org.jsweet.examples.raytracer.Intersection";
            var Surface = (function () {
                function Surface(diffuse, specular, reflect, roughness) {
                    if (this.diffuse === undefined)
                        this.diffuse = null;
                    if (this.specular === undefined)
                        this.specular = null;
                    if (this.reflect === undefined)
                        this.reflect = null;
                    if (this.roughness === undefined)
                        this.roughness = 0;
                    this.diffuse = (diffuse);
                    this.specular = (specular);
                    this.reflect = (reflect);
                    this.roughness = roughness;
                }
                return Surface;
            }());
            raytracer.Surface = Surface;
            Surface["__class"] = "org.jsweet.examples.raytracer.Surface";
            var Thing = (function () {
                function Thing() {
                    if (this.surface === undefined)
                        this.surface = null;
                }
                return Thing;
            }());
            raytracer.Thing = Thing;
            Thing["__class"] = "org.jsweet.examples.raytracer.Thing";
            var Light = (function () {
                function Light(pos, color) {
                    if (this.pos === undefined)
                        this.pos = null;
                    if (this.color === undefined)
                        this.color = null;
                    this.pos = pos;
                    this.color = color;
                }
                return Light;
            }());
            raytracer.Light = Light;
            Light["__class"] = "org.jsweet.examples.raytracer.Light";
            var Scene = (function () {
                function Scene(things, lights, camera) {
                    if (this.things === undefined)
                        this.things = null;
                    if (this.lights === undefined)
                        this.lights = null;
                    if (this.camera === undefined)
                        this.camera = null;
                    this.things = things;
                    this.lights = lights;
                    this.camera = camera;
                }
                return Scene;
            }());
            raytracer.Scene = Scene;
            Scene["__class"] = "org.jsweet.examples.raytracer.Scene";
            var Surfaces = (function () {
                function Surfaces() {
                }
                Surfaces.shiny_$LI$ = function () {
                    if (Surfaces.shiny == null)
                        Surfaces.shiny = new org.jsweet.examples.raytracer.Surface(function (pos) {
                            return org.jsweet.examples.raytracer.Color.white_$LI$();
                        }, function (pos) {
                            return org.jsweet.examples.raytracer.Color.grey_$LI$();
                        }, function (pos) {
                            return 0.7;
                        }, 250);
                    return Surfaces.shiny;
                };
                ;
                Surfaces.checkerboard_$LI$ = function () {
                    if (Surfaces.checkerboard == null)
                        Surfaces.checkerboard = new org.jsweet.examples.raytracer.Surface(function (pos) {
                            if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
                                return org.jsweet.examples.raytracer.Color.white_$LI$();
                            }
                            else {
                                return org.jsweet.examples.raytracer.Color.black_$LI$();
                            }
                        }, function (pos) {
                            return org.jsweet.examples.raytracer.Color.white_$LI$();
                        }, function (pos) {
                            if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
                                return 0.1;
                            }
                            else {
                                return 0.7;
                            }
                        }, 150);
                    return Surfaces.checkerboard;
                };
                ;
                return Surfaces;
            }());
            raytracer.Surfaces = Surfaces;
            Surfaces["__class"] = "org.jsweet.examples.raytracer.Surfaces";
            var RayTracer = (function () {
                function RayTracer() {
                    /*private*/ this.maxDepth = 5;
                }
                /*private*/ RayTracer.prototype.intersections = function (ray, scene) {
                    var closest = +Infinity;
                    var closestInter = null;
                    for (var i = 0; i < scene.things.length; i++) {
                        {
                            var inter = scene.things[i].intersect(ray);
                            if (inter != null && inter.dist < closest) {
                                closestInter = inter;
                                closest = inter.dist;
                            }
                        }
                        ;
                    }
                    return closestInter;
                };
                /*private*/ RayTracer.prototype.testRay = function (ray, scene) {
                    var isect = this.intersections(ray, scene);
                    if (isect != null) {
                        return isect.dist;
                    }
                    else {
                        return null;
                    }
                };
                /*private*/ RayTracer.prototype.traceRay = function (ray, scene, depth) {
                    var isect = this.intersections(ray, scene);
                    if (isect == null) {
                        return org.jsweet.examples.raytracer.Color.background_$LI$();
                    }
                    else {
                        return this.shade(isect, scene, depth);
                    }
                };
                /*private*/ RayTracer.prototype.shade = function (isect, scene, depth) {
                    var d = isect.ray.dir;
                    var pos = org.jsweet.examples.raytracer.Vector.plus(org.jsweet.examples.raytracer.Vector.times(isect.dist, d), isect.ray.start);
                    var normal = isect.thing.normal(pos);
                    var reflectDir = org.jsweet.examples.raytracer.Vector.minus(d, org.jsweet.examples.raytracer.Vector.times(2, org.jsweet.examples.raytracer.Vector.times(org.jsweet.examples.raytracer.Vector.dot(normal, d), normal)));
                    var naturalColor = org.jsweet.examples.raytracer.Color.plus(org.jsweet.examples.raytracer.Color.background_$LI$(), this.getNaturalColor(isect.thing, pos, normal, reflectDir, scene));
                    var reflectedColor = (depth >= this.maxDepth) ? org.jsweet.examples.raytracer.Color.grey_$LI$() : this.getReflectionColor(isect.thing, pos, normal, reflectDir, scene, depth);
                    return org.jsweet.examples.raytracer.Color.plus(naturalColor, reflectedColor);
                };
                /*private*/ RayTracer.prototype.getReflectionColor = function (thing, pos, normal, rd, scene, depth) {
                    return org.jsweet.examples.raytracer.Color.scale((function (target) { return (typeof target === 'function') ? target(pos) : target.apply(pos); })(thing.surface.reflect), this.traceRay(new org.jsweet.examples.raytracer.Ray(pos, rd), scene, depth + 1));
                };
                /*private*/ RayTracer.prototype.getNaturalColor = function (thing, pos, norm, rd, scene) {
                    var _this = this;
                    //console.log(thing.surface);
                    var addLight = function (col, light, fil1, fil2) {
                        var ldis = org.jsweet.examples.raytracer.Vector.minus(light.pos, pos);
                        var livec = org.jsweet.examples.raytracer.Vector.norm(ldis);
                        var neatIsect = _this.testRay(new org.jsweet.examples.raytracer.Ray(pos, livec), scene);
                        var isInShadow = (neatIsect == null) ? false : (neatIsect <= org.jsweet.examples.raytracer.Vector.mag(ldis));
                        if (isInShadow) {
                            return col;
                        }
                        else {
                            var illum = org.jsweet.examples.raytracer.Vector.dot(livec, norm);
                            var lcolor = (illum > 0) ? org.jsweet.examples.raytracer.Color.scale(illum, light.color) : org.jsweet.examples.raytracer.Color.defaultColor_$LI$();
                            var specular = org.jsweet.examples.raytracer.Vector.dot(livec, org.jsweet.examples.raytracer.Vector.norm(rd));
                            var scolor = (specular > 0) ? org.jsweet.examples.raytracer.Color.scale(Math.pow(specular, thing.surface.roughness), light.color) : org.jsweet.examples.raytracer.Color.defaultColor_$LI$();
                            return org.jsweet.examples.raytracer.Color.plus(col, org.jsweet.examples.raytracer.Color.plus(org.jsweet.examples.raytracer.Color.times((function (target) { return (typeof target === 'function') ? target(pos) : target.apply(pos); })(thing.surface.diffuse), lcolor), org.jsweet.examples.raytracer.Color.times((function (target) { return (typeof target === 'function') ? target(pos) : target.apply(pos); })(thing.surface.specular), scolor)));
                        }
                    };
                    return ((scene.lights).reduce((addLight), org.jsweet.examples.raytracer.Color.defaultColor_$LI$()));
                };
                RayTracer.prototype.render = function (scene, ctx, screenWidth, screenHeight) {
                    var getPoint = function (x, y, camera) {
                        var recenterX = function (x2) {
                            return ((x2 - (screenWidth / 2.0)) / 2.0 / screenWidth);
                        };
                        var recenterY = function (y2) {
                            return -((y2 - (screenHeight / 2.0)) / 2.0 / screenHeight);
                        };
                        return org.jsweet.examples.raytracer.Vector.norm(org.jsweet.examples.raytracer.Vector.plus(camera.forward, org.jsweet.examples.raytracer.Vector.plus(org.jsweet.examples.raytracer.Vector.times((function (target) { return (typeof target === 'function') ? target(x) : target.apply(x); })(recenterX), camera.right), org.jsweet.examples.raytracer.Vector.times((function (target) { return (typeof target === 'function') ? target(y) : target.apply(y); })(recenterY), camera.up))));
                    };
                    var _loop_1 = function (y) {
                        {
                            var _loop_2 = function (x) {
                                {
                                    var color = this_1.traceRay(new org.jsweet.examples.raytracer.Ray(scene.camera.pos, (function (target) { return (typeof target === 'function') ? target(x, y, scene.camera) : target.apply(x, y, scene.camera); })(getPoint)), scene, 0);
                                    var c = org.jsweet.examples.raytracer.Color.toDrawingColor(color);
                                    ctx.fillStyle = (("rgb(" + new String(c.r) + ", " + new String(c.g) + ", " + new String(c.b) + ")"));
                                    ctx.fillRect(x, y, x + 1, y + 1);
                                }
                                ;
                            };
                            for (var x = 0; x < screenWidth; x++) {
                                _loop_2(x);
                            }
                        }
                        ;
                    };
                    var this_1 = this;
                    for (var y = 0; y < screenHeight; y++) {
                        _loop_1(y);
                    }
                };
                return RayTracer;
            }());
            raytracer.RayTracer = RayTracer;
            RayTracer["__class"] = "org.jsweet.examples.raytracer.RayTracer";
            function defaultScene() {
                return new org.jsweet.examples.raytracer.Scene([new org.jsweet.examples.raytracer.Plane(new org.jsweet.examples.raytracer.Vector(0.0, 1.0, 0.0), 0.0, org.jsweet.examples.raytracer.Surfaces.checkerboard_$LI$()), new org.jsweet.examples.raytracer.Sphere(new org.jsweet.examples.raytracer.Vector(0.0, 1.0, -0.25), 1.0, org.jsweet.examples.raytracer.Surfaces.shiny_$LI$()), new org.jsweet.examples.raytracer.Sphere(new org.jsweet.examples.raytracer.Vector(-1.0, 0.5, 1.5), 0.5, org.jsweet.examples.raytracer.Surfaces.shiny_$LI$())], [new org.jsweet.examples.raytracer.Light(new org.jsweet.examples.raytracer.Vector(-2.0, 2.5, 0.0), new org.jsweet.examples.raytracer.Color(0.49, 0.07, 0.07)), new org.jsweet.examples.raytracer.Light(new org.jsweet.examples.raytracer.Vector(1.5, 2.5, 1.5), new org.jsweet.examples.raytracer.Color(0.07, 0.07, 0.49)), new org.jsweet.examples.raytracer.Light(new org.jsweet.examples.raytracer.Vector(1.5, 2.5, -1.5), new org.jsweet.examples.raytracer.Color(0.07, 0.49, 0.071)), new org.jsweet.examples.raytracer.Light(new org.jsweet.examples.raytracer.Vector(0.0, 3.5, 0.0), new org.jsweet.examples.raytracer.Color(0.21, 0.21, 0.35))], new org.jsweet.examples.raytracer.Camera(new org.jsweet.examples.raytracer.Vector(3.0, 2.0, 4.0), new org.jsweet.examples.raytracer.Vector(-1.0, 0.5, 0.0)));
            }
            raytracer.defaultScene = defaultScene;
            function main() {
                var size = 256;
                var windowSize = Math.min(window.innerWidth, window.innerHeight);
                var canv = document.createElement("canvas");
                canv.width = size;
                canv.height = size;
                canv.style.transform = "scale(" + (windowSize / size) + "," + (windowSize / size) + ")";
                canv.style.transformOrigin = "0 0";
                console.log("transform=" + canv.style.transform);
                document.body.appendChild(canv);
                var ctx = canv.getContext("2d");
                var rayTracer = new org.jsweet.examples.raytracer.RayTracer();
                rayTracer.render(defaultScene(), ctx, size, size);
            }
            raytracer.main = main;
            var Sphere = (function (_super) {
                __extends(Sphere, _super);
                function Sphere(center, radius, surface) {
                    var _this = _super.call(this) || this;
                    if (_this.radius2 === undefined)
                        _this.radius2 = 0;
                    if (_this.center === undefined)
                        _this.center = null;
                    if (_this.surface === undefined)
                        _this.surface = null;
                    _this.center = center;
                    _this.radius2 = radius * radius;
                    _this.surface = surface;
                    return _this;
                }
                Sphere.prototype.normal = function (pos) {
                    return org.jsweet.examples.raytracer.Vector.norm(org.jsweet.examples.raytracer.Vector.minus(pos, this.center));
                };
                Sphere.prototype.intersect = function (ray) {
                    var eo = org.jsweet.examples.raytracer.Vector.minus(this.center, ray.start);
                    var v = org.jsweet.examples.raytracer.Vector.dot(eo, ray.dir);
                    var dist = 0;
                    if (v >= 0) {
                        var disc = this.radius2 - (org.jsweet.examples.raytracer.Vector.dot(eo, eo) - v * v);
                        if (disc >= 0) {
                            dist = v - Math.sqrt(disc);
                        }
                    }
                    if (dist === 0) {
                        return null;
                    }
                    else {
                        return new org.jsweet.examples.raytracer.Intersection(this, ray, dist);
                    }
                };
                return Sphere;
            }(org.jsweet.examples.raytracer.Thing));
            raytracer.Sphere = Sphere;
            Sphere["__class"] = "org.jsweet.examples.raytracer.Sphere";
            var Plane = (function (_super) {
                __extends(Plane, _super);
                function Plane(norm, offset, surface) {
                    var _this = _super.call(this) || this;
                    if (_this.surface === undefined)
                        _this.surface = null;
                    if (_this.norm === undefined)
                        _this.norm = null;
                    if (_this.offset === undefined)
                        _this.offset = 0;
                    _this.norm = norm;
                    _this.offset = offset;
                    _this.surface = surface;
                    return _this;
                }
                /**
                 *
                 * @param {org.jsweet.examples.raytracer.Ray} ray
                 * @return {org.jsweet.examples.raytracer.Intersection}
                 */
                Plane.prototype.intersect = function (ray) {
                    var denom = org.jsweet.examples.raytracer.Vector.dot(this.norm, ray.dir);
                    if (denom > 0) {
                        return null;
                    }
                    else {
                        var dist = (org.jsweet.examples.raytracer.Vector.dot(this.norm, ray.start) + this.offset) / (-denom);
                        return new org.jsweet.examples.raytracer.Intersection(this, ray, dist);
                    }
                };
                /**
                 *
                 * @param {org.jsweet.examples.raytracer.Vector} pos
                 * @return {org.jsweet.examples.raytracer.Vector}
                 */
                Plane.prototype.normal = function (pos) {
                    return this.norm;
                };
                return Plane;
            }(org.jsweet.examples.raytracer.Thing));
            raytracer.Plane = Plane;
            Plane["__class"] = "org.jsweet.examples.raytracer.Plane";
        })(raytracer = examples.raytracer || (examples.raytracer = {}));
    })(examples = jsweet.examples || (jsweet.examples = {}));
})(jsweet = org.jsweet || (org.jsweet = {}));
})(org || (org = {}));
org.jsweet.examples.raytracer.Surfaces.checkerboard_$LI$();
org.jsweet.examples.raytracer.Surfaces.shiny_$LI$();
org.jsweet.examples.raytracer.Color.defaultColor_$LI$();
org.jsweet.examples.raytracer.Color.background_$LI$();
org.jsweet.examples.raytracer.Color.black_$LI$();
org.jsweet.examples.raytracer.Color.grey_$LI$();
org.jsweet.examples.raytracer.Color.white_$LI$();
org.jsweet.examples.raytracer.main();
