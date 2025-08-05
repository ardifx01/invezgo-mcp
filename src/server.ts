import { FastMCP } from "fastmcp";
import * as jwt from 'jsonwebtoken';
import { registerStockTools } from "./tools/stock";

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
    
    try {
      const decoded: any = jwt.verify(apiKey, "Invezgo;2929");
      
      // if (decoded.device !== 'API') {
      //   throw new Response(null, {
      //       status: 402,
      //       statusText: "Invalid API",
      //   });
      // }

      if (decoded.role === 'USER' || decoded.role === 'STARTER' || decoded.role === 'TRIAL' || decoded.role === 'PRO') {
        throw new Response(null, {
            status: 402,
            statusText: "Advance role user only",
        });
      }

      return { apiKey };
    } catch (error) {
      console.log(error);
      throw new Response(null, {
        status: 401,
        statusText: "Authentication required",
      });
    }
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