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
    const apiKey = request.headers["invezgo-api-key"] as string;
    const authorization = request.headers["authorization"] as string;
    if (!apiKey || !authorization) {
      throw new Response(null, {
        status: 401,
        statusText: "Authentication required",
      });
    }
    const key = apiKey || authorization.split(" ")[1];
    return { apiKey: key };
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