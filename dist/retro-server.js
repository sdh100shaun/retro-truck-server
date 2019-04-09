"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var RetroServer = /** @class */ (function () {
    function RetroServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    RetroServer.prototype.createApp = function () {
        this.app = express();
    };
    RetroServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    RetroServer.prototype.config = function () {
        this.port = process.env.PORT || RetroServer.PORT;
    };
    RetroServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    RetroServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log("Running server on port %s", _this.port);
        });
        this.io.on("connect", function (socket) {
            console.log("Connected client on port %s.", _this.port);
            socket.on("join", function (m) {
                console.log(m.owner);
                console.log("[server](join message): %s", JSON.stringify(m));
                _this.io.emit("join", m);
            });
            socket.on("Sprint", function (m) {
                console.log(m.owner);
                console.log("[server](sprint message): %s", JSON.stringify(m));
                _this.io.emit("sprint-message", m);
            });
            socket.on("Best", function (m) {
                console.log(m.owner);
                console.log("[server](best message): %s", JSON.stringify(m));
                _this.io.emit("best-message", m);
            });
        });
    };
    RetroServer.prototype.getApp = function () {
        return this.app;
    };
    RetroServer.PORT = 80;
    return RetroServer;
}());
exports.RetroServer = RetroServer;
