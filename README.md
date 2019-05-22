# miniraytracer
a small raytracer in full Javascript and full 2D Canvas (no WebGL)

------------------------

I discovered recently the internet site JSweet, which transpiles Java source code to Typescript and Javascript.

http://www.jsweet.org/

You can transpile your code in a sandbox online. In the examples proposed on the site, there is a small ray tracer. I tested it and the transpilation works fine. But the JS code generated is in the ES5 syntax.

You can see the original code (transpiled by JSweet) in raytracer_v1.js.

I rewrote the code in ES6 syntax, wich supports the classes. You can see the ES6 code in raytracer_v2.js. The ES6 code is very closed to the Java version, but the transpilation helped me a lot to do the job.

The picture is generated with the 2D Canvas API (no WebGL used here), so the code is very interesting to learn.

A small raytracer, with only 400 lines of Javascript ES6 code, that's pretty cool !

-----------------

Other interesting implementations of raytracers in full JS and 2D Canvas API :

- an experimental raytracer of Oliver Hunt proposed in different versions (one version with the Webworker API)
https://nerget.com/

- Phoria.js, a raytracer and 3d engine written by Kevin Roast :
http://www.kevs3d.co.uk/dev/phoria/

- K3D, the ancestor of Phoria.js, written too by Kevin Roast (not maintained but very interesting to learn)
http://www.kevs3d.co.uk/dev/canvask3d/k3d_test.html

-----------------

Some good books about ray tracing :

- The ray tracer challenge, by Jamis Buck

https://pragprog.com/book/jbtracer/the-ray-tracer-challenge

- Ray tracing in 3 weeks, by Peter Shirley, (approximately one book by week):

http://www.realtimerendering.com/raytracing/Ray%20Tracing%20in%20a%20Weekend.pdf

http://www.realtimerendering.com/raytracing/Ray%20Tracing_%20The%20Next%20Week.pdf

http://www.realtimerendering.com/raytracing/Ray%20Tracing_%20the%20Rest%20of%20Your%20Life.pdf

- a lot of other good books about 3D and raytracing :

http://www.realtimerendering.com/books.html
