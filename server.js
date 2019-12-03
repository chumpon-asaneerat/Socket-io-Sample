const path = require("path");

//#region express and middlewares

const express = require("express");

const morgan = require("morgan");
const helmet = require("helmet");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const favicon = require("serve-favicon");

//#endregion

const APPNAME = "socket.io sample";
const PORT = 3000;

const app = express();

//#region use middlewares

app.use(helmet());
app.use(morgan("dev"));

app.use(cookieparser("YOUR_SECURE_KEY@123"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const iconpath = path.join(__dirname, "public", "favicon.ico");
app.use(favicon(iconpath));

const publicPath = path.join(__dirname, 'public');
//const publicMaxAge = { maxage: '30d' };
const publicMaxAge = { maxage: '30s' };
app.use('/public', express.static(publicPath, publicMaxAge));

const distPath = path.join(__dirname, 'public', 'dist');
//const distMaxAge = { maxage: '1d' };
const distMaxAge = { maxage: '15s' };
//const libMaxAge = { maxage: '15s' };
const dist_libs = [
    /* jQuery */
    { "route": "/dist/js", "path": "jquery-3.3.1" },
    /* jQuery UI */
    { "route": "/dist/css", "path": "jquery-ui-1.12.1" },
    { "route": "/dist/js", "path": "jquery-ui-1.12.1" },
    /* font-awesome 5.x */
    { "route": "/dist", "path": "font-awesome-5.9.0" },
    /* moment */
    { "route": "/dist/js", "path": "moment-2.24.0" },
    /* riotjs */
    { "route": "/dist/js", "path": "riotjs-3.13.2" },
    /* socket.io */
    { "route": "/dist", "path": "socket.io-2.2.0" },
    /* for access precompile riotjs component */
    { "route": "/components", "path": "../../dist/component/riot" }
];

function dist_lib(app, exportRoute, localPath) {
    console.log('publish "' + localPath + '"');
    app.use(exportRoute, express.static(path.join(distPath, localPath), distMaxAge));
};

// dist paths.
dist_libs.forEach(element => {
    dist_lib(app, element.route, element.path);
});

//#endregion

app.get("/", (req, res) => {
    /*
    res.json({
        data: "it's work!!"
    })
    */
   res.sendFile(path.join(__dirname, 'index.html'))
});

const server = app.listen(PORT, () => {
    console.log(`${APPNAME} listen on port: ${PORT}`);
});
