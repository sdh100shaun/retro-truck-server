import { createServer, Server } from "http";
import * as express from "express";
import * as socketIo from "socket.io";
import { Truck } from "./model/truck.model";

export class RetroServer {
  public static readonly PORT: number = 80;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || RetroServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.io.on("connect", (socket: any) => {
      console.log("Connected client on port %s.", this.port);

      socket.on("join", (m: Truck) => {
        console.log(m.owner);
        console.log("[server](join message): %s", JSON.stringify(m));
        this.io.emit("join", m);
      });

      socket.on("Sprint", (m: Truck) => {
        console.log(m.owner);
        console.log("[server](sprint message): %s", JSON.stringify(m));
        this.io.emit("sprint-message", m);
      });

      socket.on("Best", (m: Truck) => {
        console.log(m.owner);
        console.log("[server](best message): %s", JSON.stringify(m));
        this.io.emit("best-message", m);
      });
    });
  }
  public getApp(): express.Application {
    return this.app;
  }
}
