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

    if (!authorization && !deprecated) {
      throw new Response(null, {
        status: 401,
        statusText: "Authentication required. Please provide either 'Authorization' header or 'invezgo-api-key' header.",
      });
    }

    let apiKey: string;
    if (deprecated) {
      apiKey = deprecated;
    } else if (authorization) {
      const token = authorization.split(" ")[1];
      if (!token) {
        throw new Response(null, {
          status: 401,
          statusText: "Invalid Authorization header format. Expected 'Bearer <token>'",
        });
      }
      apiKey = token;
    } else {
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
registerPersonalTools();

server.start({
  transportType: "httpStream",
  httpStream: {
    port: 3005,
    endpoint: "/",
  },
});