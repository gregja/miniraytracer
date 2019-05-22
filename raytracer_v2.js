/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
/* Adaptation for Javascript ES6 by Gregory Jarrige */

class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static times (k, v) {
        return new Vector(k * v.x, k * v.y, k * v.z);
    }
    static minus (v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }
    static plus (v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    static dot (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    static mag (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }
    static norm (v) {
        var mag = Vector.mag(v);
        var div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vector.times(div, v);
    }
    static cross (v1, v2) {
        return new Vector(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }
}

class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static scale (k, v) {
        return new Color(k * v.r, k * v.g, k * v.b);
    }
    static plus (v1, v2) {
        return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
    }
    static times (v1, v2) {
        return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
    }
    static getWhite () {
        if (Color.white == null) {
            Color.white = new Color(1.0, 1.0, 1.0);
        }
        return Color.white;
    }

    static getGrey () {
        if (Color.grey == null) {
            Color.grey = new Color(0.5, 0.5, 0.5);
        }
        return Color.grey;
    }

    static getBlack () {
        if (Color.black == null) {
            Color.black = new Color(0.0, 0.0, 0.0);
        }
        return Color.black;
    }

    static getBackground () {
        if (Color.background == null) {
            Color.background = Color.getBlack();
        }
        return Color.background;
    }

    static getDefaultColor () {
        if (Color.defaultColor == null) {
            Color.defaultColor = Color.getBlack();
        }
        return Color.defaultColor;
    }

    static toDrawingColor (c) {
        var legalize = function (d) { return d > 1 ? 1 : d; };
        return new Color(
            Math.floor((function (target) { return (typeof target === 'function') ? target(c.r) : target.apply(c.r); })(legalize) * 255),
            Math.floor((function (target) { return (typeof target === 'function') ? target(c.g) : target.apply(c.g); })(legalize) * 255),
            Math.floor((function (target) { return (typeof target === 'function') ? target(c.b) : target.apply(c.b); })(legalize) * 255)
        );
    }
}


class Camera {
    constructor(pos, lookAt) {
        this.pos = pos;
        var down = new Vector(0.0, -1.0, 0.0);
        this.forward = Vector.norm(Vector.minus(lookAt, this.pos));
        this.right = Vector.times(1.5, Vector.norm(Vector.cross(this.forward, down)));
        this.up = Vector.times(1.5, Vector.norm(Vector.cross(this.forward, this.right)));
    }
}

class Ray {
    constructor(start, dir) {
        this.start = start;
        this.dir = dir;
    }
}

class Intersection {
    constructor(thing, ray, dist) {
        this.thing = thing;
        this.ray = ray;
        this.dist = dist;
    }
}

class Surface {
    constructor(diffuse, specular, reflect, roughness) {
        this.diffuse = diffuse || null;
        this.specular = specular || null;
        this.reflect = reflect || null;
        this.roughness = roughness || null;
    }
}

class Thing {
    constructor() {
        this.surface = null;
    }
}

class Light {
    constructor(pos, color) {
        this.pos = pos;
        this.color = color;
    }
}

class Scene {
    constructor(things, lights, camera) {
        this.things = things;
        this.lights = lights;
        this.camera = camera;
    }
}

var Surfaces = (function () {
    function Surfaces() {
    }
    Surfaces.getShiny = function () {
        if (Surfaces.shiny == null)
            Surfaces.shiny = new Surface(function (pos) {
                return Color.getWhite();
            }, function (pos) {
                return Color.getGrey();
            }, function (pos) {
                return 0.7;
            }, 250);
        return Surfaces.shiny;
    };

    Surfaces.getCheckerboard = function () {
        if (Surfaces.checkerboard == null)
            Surfaces.checkerboard = new Surface(function (pos) {
                if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
                    return Color.getWhite();
                }
                else {
                    return Color.getBlack();
                }
            }, function (pos) {
                return Color.getWhite();
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
    return Surfaces;
}());

class Sphere extends Thing {
    constructor(center, radius, surface) {
        super();
        this.center = center;
        this.radius2 = radius * radius;
        this.surface = surface;
        return this;
    }
    normal (pos) {
        return Vector.norm(Vector.minus(pos, this.center));
    }
    intersect (ray) {
        var eo = Vector.minus(this.center, ray.start);
        var v = Vector.dot(eo, ray.dir);
        var dist = 0;
        if (v >= 0) {
            var disc = this.radius2 - (Vector.dot(eo, eo) - v * v);
            if (disc >= 0) {
                dist = v - Math.sqrt(disc);
            }
        }
        if (dist === 0) {
            return null;
        }
        else {
            return new Intersection(this, ray, dist);
        }
    }
}

class Plane extends Thing {
    constructor(norm, offset, surface) {
        super();
        this.norm = norm;
        this.offset = offset;
        this.surface = surface;
        return this;
    }
    /**
     *
     * @param {Ray} ray
     * @return {Intersection}
     */
    intersect (ray) {
        var denom = Vector.dot(this.norm, ray.dir);
        if (denom > 0) {
            return null;
        }
        else {
            var dist = (Vector.dot(this.norm, ray.start) + this.offset) / (-denom);
            return new Intersection(this, ray, dist);
        }
    }
    /**
     *
     * @param {Vector} pos
     * @return {Vector}
     */
    normal (pos) {
        return this.norm;
    }
}


class RayTracer {
    constructor() {
        /*private*/ this.maxDepth = 5;
    }
    /*private*/ intersections (ray, scene) {
        var closest = +Infinity;
        var closestInter = null;
        for (let i = 0, imax=scene.things.length; i < imax; i++) {
            let inter = scene.things[i].intersect(ray);
            if (inter != null && inter.dist < closest) {
                closestInter = inter;
                closest = inter.dist;
            }
        }
        return closestInter;
    }
    /*private*/ testRay (ray, scene) {
        var isect = this.intersections(ray, scene);
        if (isect != null) {
            return isect.dist;
        }
        else {
            return null;
        }
    }
    /*private*/ traceRay (ray, scene, depth) {
        var isect = this.intersections(ray, scene);
        if (isect == null) {
            return Color.getBackground();
        }
        else {
            return this.shade(isect, scene, depth);
        }
    }
    /*private*/ shade (isect, scene, depth) {
        var d = isect.ray.dir;
        var pos = Vector.plus(Vector.times(isect.dist, d), isect.ray.start);
        var normal = isect.thing.normal(pos);
        var reflectDir = Vector.minus(d, Vector.times(2, Vector.times(Vector.dot(normal, d), normal)));
        var naturalColor = Color.plus(Color.getBackground(), this.getNaturalColor(isect.thing, pos, normal, reflectDir, scene));
        var reflectedColor = (depth >= this.maxDepth) ? Color.getGrey() : this.getReflectionColor(isect.thing, pos, normal, reflectDir, scene, depth);
        return Color.plus(naturalColor, reflectedColor);
    }
    /*private*/ getReflectionColor (thing, pos, normal, rd, scene, depth) {
        return Color.scale(
            (function (target) { return (typeof target === 'function') ? target(pos) : target.apply(pos); })(thing.surface.reflect),
            this.traceRay(new Ray(pos, rd), scene, depth + 1)
        );
    }
    /*private*/ getNaturalColor (thing, pos, norm, rd, scene) {
        var _this = this;
        //console.log(thing.surface);
        var addLight = function (col, light, fil1, fil2) {
            var ldis = Vector.minus(light.pos, pos);
            var livec = Vector.norm(ldis);
            var neatIsect = _this.testRay(new Ray(pos, livec), scene);
            var isInShadow = (neatIsect == null) ? false : (neatIsect <= Vector.mag(ldis));
            if (isInShadow) {
                return col;
            }
            else {
                var illum = Vector.dot(livec, norm);
                var lcolor = (illum > 0) ? Color.scale(illum, light.color) : Color.getDefaultColor();
                var specular = Vector.dot(livec, Vector.norm(rd));
                var scolor = (specular > 0) ? Color.scale(Math.pow(specular, thing.surface.roughness), light.color) : Color.getDefaultColor();
                return Color.plus(col,
                    Color.plus(Color.times((function (target) { return (typeof target === 'function') ? target(pos) : target.apply(pos); })(thing.surface.diffuse), lcolor),
                    Color.times((function (target) { return (typeof target === 'function') ? target(pos) : target.apply(pos); })(thing.surface.specular), scolor)));
            }
        };
        return ((scene.lights).reduce((addLight), Color.getDefaultColor()));
    }
    render (scene, ctx, screenWidth, screenHeight) {
        var getPoint = function (x, y, camera) {
            var recenterX = function (x2) {
                return ((x2 - (screenWidth / 2.0)) / 2.0 / screenWidth);
            };
            var recenterY = function (y2) {
                return -((y2 - (screenHeight / 2.0)) / 2.0 / screenHeight);
            };
            return Vector.norm(
                Vector.plus(camera.forward,
                    Vector.plus(Vector.times((function (target) { return (typeof target === 'function') ? target(x) : target.apply(x); })(recenterX), camera.right),
                    Vector.times((function (target) { return (typeof target === 'function') ? target(y) : target.apply(y); })(recenterY), camera.up))
                )
            );
        };
        var _loop_1 = function (y) {
            var _loop_2 = function (x) {
                    var color = this_1.traceRay(
                        new Ray(scene.camera.pos,
                            (function (target) { return (typeof target === 'function') ? target(x, y, scene.camera) : target.apply(x, y, scene.camera); })(getPoint)
                        ), scene, 0);
                    var c = Color.toDrawingColor(color);
                    ctx.fillStyle = (("rgb(" + new String(c.r) + ", " + new String(c.g) + ", " + new String(c.b) + ")"));
                    ctx.fillRect(x, y, x + 1, y + 1);
            };
            for (var x = 0; x < screenWidth; x++) {
                _loop_2(x);
            }
        };
        var this_1 = this;
        for (let y = 0; y < screenHeight; y++) {
            _loop_1(y);
        }
    }
}


function defaultScene() {
    return new Scene(
        [
            new Plane(new Vector(0.0, 1.0, 0.0), 0.0, Surfaces.getCheckerboard()),
            new Sphere(new Vector(0.0, 1.0, -0.25), 1.0, Surfaces.getShiny()),
                      new Sphere(new Vector(1.0, 0.0, 0.25), 1.0, Surfaces.getShiny()),
            new Sphere(new Vector(-1.0, 0.5, 1.5), 0.5, Surfaces.getShiny())
        ],
        [new Light(new Vector(-2.0, 2.5, 0.0), new Color(0.49, 0.07, 0.07)),
            new Light(new Vector(1.5, 2.5, 1.5), new Color(0.07, 0.07, 0.49)),
            new Light(new Vector(1.5, 2.5, -1.5), new Color(0.07, 0.49, 0.071)),
            new Light(new Vector(0.0, 3.5, 0.0), new Color(0.21, 0.21, 0.35))
        ],
        new Camera(new Vector(3.0, 2.0, 4.0), new Vector(-1.0, 0.5, 0.0)));
}

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
    var rayTracer = new RayTracer();
    rayTracer.render(defaultScene(), ctx, size, size);
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Kickstart the sketch when the DOM is ready (best practice)");
    main();
});
