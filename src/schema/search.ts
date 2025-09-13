import { z } from "zod";

// Search tool schema
export const searchSchema = z.object({
  query: z.string().describe("Search query to find relevant information"),
  limit: z.number().optional().default(10).describe("Maximum number of results to return (default: 10)"),
  offset: z.number().optional().default(0).describe("Number of results to skip for pagination (default: 0)")
});

// Fetch tool schema
export const fetchSchema = z.object({
  ids: z.array(z.string()).describe("Array of IDs to fetch content for"),
  includeMetadata: z.boolean().optional().default(false).describe("Whether to include metadata in the response")
});

// Type definitions
export type SearchArgs = z.infer<typeof searchSchema>;
export type FetchArgs = z.infer<typeof fetchSchema>;

// Search result interface
export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url?: string;
  type: 'stock' | 'news' | 'analysis' | 'company';
  relevanceScore: number;
  publishedAt?: string;
  metadata?: Record<string, any>;
}

// Fetch result interface
export interface FetchResult {
  id: string;
  content: string;
  title?: string;
  url?: string;
  type: 'stock' | 'news' | 'analysis' | 'company';
  publishedAt?: string;
  metadata?: Record<string, any>;
}
