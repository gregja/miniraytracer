const http = require('http');
const fs = require('fs');

const PORT = 8080;
const ROOT_DIR = '/home/gregja/Documents/myprojects/miniraytracer/';

function sendFile(filePath, req, res) {
    fs.readFile(filePath, (err, data) => {
        if (!err) {
            const ext = filePath.endsWith('.js') ? 'text/javascript' : (filePath.endsWith('.html') ? 'text/html' : 'application/octet-stream');
            res.setHeader('Content-Type', ext);
            res.end(data);
        } else {
            console.error('Erreur fichier:', req.url, err);
            res.statusCode = 404;
            res.end('Fichier non trouvé: ' + req.url);
        }
    });
};

const versionFiles = {
    'v1': 'raytracer_v1',
    'v2': 'raytracer_v2',
    'v3': 'raytracer_v3',
    'v4': 'raytracer_v4'
};

const path = require('node:path');

// http, ROOT_DIR, versionFiles et sendFile sont supposés déjà définis.
const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;

    // Retire le premier "/" et les éventuels "/" finaux.
    const cleanPath = pathname.slice(1).replace(/\/+$/, '');

    const urlParts = cleanPath.split('/');
    const lastPart = urlParts[urlParts.length - 1];

    // Vérification de version (ex. : v1, v2, v3, v4).
    if (/^v\d+$/.test(lastPart)) {
        if (!Object.prototype.hasOwnProperty.call(versionFiles, lastPart)) {
            res.writeHead(404, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            res.end(`Version inconnue : ${lastPart}`);
            return;
        }

        console.log('Recherche version:', lastPart);

        const filePath = path.join(
            ROOT_DIR,
            versionFiles[lastPart] + '.html'
        );

        sendFile(filePath, req, res);
        return;
    }

    // Sert le fichier normalement.
    sendFile(path.join(ROOT_DIR, cleanPath), req, res);
});

server.listen(PORT, () => {
    console.log('\n✅ Serveur RayTraceur lancé sur: http://localhost:' + PORT);
    console.log('   Utilisez /v1, /v2, /v3, ou /v4 pour charger une version.\n');
});
