import { searchSchema, fetchSchema } from "@/schema/search";
import { server } from "@/server";
import { search, fetch } from "./handler";

export const registerSearchTools = (): void => {
  // Search tool - finds relevant information across data sources
  server.addTool({
    name: "search",
    description: "Search for information across stocks, news, analysis, and company data. Returns a list of relevant results with IDs that can be used with the fetch tool.",
    parameters: searchSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      streamingHint: true,
      title: "Search Information"
    },
    execute: async (args, context) => await search(args, context),
  });

  // Fetch tool - retrieves detailed content for specific IDs
  server.addTool({
    name: "fetch",
    description: "Fetch detailed content for specific IDs obtained from search results. Returns full content and metadata for the requested items.",
    parameters: fetchSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      streamingHint: true,
      title: "Fetch Content"
    },
    execute: async (args, context) => await fetch(args, context),
  });
};
