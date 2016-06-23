/* eslint-disable */
require('./stylesheets/style.css');

// Debuging HTML
/* eslint-disable */
require('!file?name=[path][name].[ext]!./htdocs/debug.html');

// Copy recorderWorker.js of recorderjs
/* eslint-disable */
require('!file?name=javascripts/recorderWorker.js!../../node_modules/recorderjs/recorderWorker.js');

require('./javascripts/app');
