import { FastMCP } from "fastmcp";
import * as jwt from 'jsonwebtoken';
import { registerStockTools } from "./tools/stock";
import dotenv from 'dotenv';
import { registerPersonalTools } from "./tools/personal";
import { registerSearchTools } from "./tools/search";
import { URL } from 'url';

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
    
    // Parse query parameters from URL
    let queryApiKey: string | undefined;
    if (request.url) {
      try {
        const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
        queryApiKey = url.searchParams.get('api') || undefined;
      } catch (error) {
        // If URL parsing fails, continue without query parameter
        queryApiKey = undefined;
      }
    }

    if (!authorization && !deprecated && !queryApiKey) {
      throw new Response(null, {
        status: 401,
        statusText: "Authentication required. Please provide either 'Authorization' header, 'invezgo-api-key' header, or 'api' query parameter.",
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
    } else if (queryApiKey) {
      apiKey = queryApiKey;
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
registerSearchTools();

server.start({
  transportType: "httpStream",
  httpStream: {
    port: 3005,
    endpoint: "/",
  },
});