# miniraytracer
a small raytracer in full Javascript and full 2D Canvas (no WebGL)

I discovered recently the internet site JSweet, which transpiles Java source code to Typescript and Javascript.

http://www.jsweet.org/

You can transpile your code in a sandbox online. In the examples proposed on the site, there is a small ray tracer. I tested it and the transpilation works fine. But the JS code generated is in the ES5 syntax.

You can see the original code (transpiled by JSweet) in raytracer_v1.js.

I rewrote the code in ES6 syntax, with the classes. You can see the code in raytracer_v2.js. The ES6 code is very closed to the Java version, but the transpiler helped me a lot.

A small raytracer, with only 400 lines of JS (ES6) code, that's pretty cool !

The picture is generated with the 2D Canvas API (no WebGL used here), so it's very interesting for learning.

Other interesting implementations of raytracers in full JS and 2D Canvas API :

- an experimental raytracer of Oliver Hunt proposed in different versions (one version with the Webworker API)
https://nerget.com/

- Phoria.js, a raytracer and 3d engine written by Kevin Roast :
http://www.kevs3d.co.uk/dev/phoria/

- K3D, the ancestor of Phoria.js, written too by Kevin Roast (not maintained but very interesting to learn)
http://www.kevs3d.co.uk/dev/canvask3d/k3d_test.html

- an open source object 3D viewer for K3D :
http://www.kevs3d.co.uk/k3d2.html
