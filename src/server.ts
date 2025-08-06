import { FastMCP } from "fastmcp";
import * as jwt from 'jsonwebtoken';
import { registerStockTools } from "./tools/stock";
import dotenv from 'dotenv'; 
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
    if (!apiKey) {
      throw new Response(null, {
        status: 401,
        statusText: "Authentication required",
      });
    }
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

server.start({
  transportType: "httpStream",
  httpStream: {
    port: 3005,
    endpoint: "/",
  },
});