import { FastMCP } from "fastmcp";
import * as jwt from 'jsonwebtoken';
import { registerStockTools } from "./tools/stock";
import dotenv from 'dotenv';
import { registerPersonalTools } from "./tools/personal";

dotenv.config();

export interface SessionData {
  apiKey: string;
  [key: string]: unknown;
}

export const server = new FastMCP({
  name: "Invezgo MCP",
  version: "1.0.0",
  authenticate: async (request): Promise<SessionData> => {
    const deprecated = request.headers["invezgo-api-key"] as string;
    const authorization = request.headers.authorization;
    if (!authorization || !deprecated) {
      throw new Response(null, {
        status: 401,
        statusText: "Authentication required",
      });
    }
    const apiKey = deprecated || authorization.split(" ")[1];
    return { apiKey };
  },
  health: {
    enabled: true,
    path: "/",
    message: "OK",
    status: 200,
  },
});

registerStockTools();
registerPersonalTools();

server.start({
  transportType: "httpStream",
  httpStream: {
    port: 3005,
    endpoint: "/",
  },
});