import { SearchArgs, FetchArgs, SearchResult, FetchResult } from "@/schema/search";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { Context } from "fastmcp";
import { customFetch } from "@/utils/fetch";
import { formatResponse } from "@/utils/format-response";

/**
 * Search for information across different data sources
 * This tool searches through stocks, news, analysis, and company information
 */
export const search = async (
  args: SearchArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;
  const { query, limit = 10, offset = 0 } = args;

  try {
    // Search across multiple endpoints
    const searchPromises = [
      searchStocks(query, apiKey, limit, offset),
      searchNews(query, apiKey, limit, offset),
      searchAnalysis(query, apiKey, limit, offset)
    ];

    const [stockResults, newsResults, analysisResults] = await Promise.allSettled(searchPromises);

    // Combine and format results
    const allResults: SearchResult[] = [];

    // Add stock results
    if (stockResults.status === 'fulfilled') {
      allResults.push(...stockResults.value);
    }

    // Add news results
    if (newsResults.status === 'fulfilled') {
      allResults.push(...newsResults.value);
    }

    // Add analysis results
    if (analysisResults.status === 'fulfilled') {
      allResults.push(...analysisResults.value);
    }

    // Sort by relevance score and limit results
    const sortedResults = allResults
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    return formatResponse({
      query,
      totalResults: allResults.length,
      results: sortedResults,
      pagination: {
        limit,
        offset,
        hasMore: allResults.length > offset + limit
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fetch detailed content for specific IDs
 * This tool retrieves full content for items found through search
 */
export const fetch = async (
  args: FetchArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;
  const { ids, includeMetadata = false } = args;

  if (!ids || ids.length === 0) {
    throw new Error('No IDs provided for fetch operation');
  }

  try {
    const fetchPromises = ids.map(id => fetchContentById(id, apiKey, includeMetadata));
    const results = await Promise.allSettled(fetchPromises);

    const fetchResults: FetchResult[] = [];
    const errors: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        fetchResults.push(result.value);
      } else {
        errors.push(`Failed to fetch ID ${ids[index]}: ${result.reason}`);
      }
    });

    return formatResponse({
      requestedIds: ids,
      results: fetchResults,
      errors: errors.length > 0 ? errors : undefined,
      metadata: {
        totalRequested: ids.length,
        successful: fetchResults.length,
        failed: errors.length
      }
    });

  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Helper functions for different search types

async function searchStocks(query: string, apiKey: string, limit: number, offset: number): Promise<SearchResult[]> {
  try {
    const data = await customFetch(`search/stock?query=${encodeURIComponent(query)}&cursor=${offset + 1}`, apiKey);
    
    return data.data?.map((item: any, index: number) => ({
      id: `stock_${item.code}`,
      title: `${item.name} (${item.code})`,
      snippet: `${item.sector} - ${item.subsector || 'N/A'}`,
      url: `https://invezgo.com/stock/${item.code}`,
      type: 'stock' as const,
      relevanceScore: 1.0 - (index * 0.1), // Simple relevance scoring
      metadata: {
        code: item.code,
        sector: item.sector,
        subsector: item.subsector,
        market: item.market
      }
    })) || [];
  } catch (error) {
    console.error('Stock search error:', error);
    return [];
  }
}

async function searchNews(query: string, apiKey: string, limit: number, offset: number): Promise<SearchResult[]> {
  try {
    // This would be a news search endpoint if available
    // For now, we'll return empty results
    return [];
  } catch (error) {
    console.error('News search error:', error);
    return [];
  }
}

async function searchAnalysis(query: string, apiKey: string, limit: number, offset: number): Promise<SearchResult[]> {
  try {
    // This would be an analysis search endpoint if available
    // For now, we'll return empty results
    return [];
  } catch (error) {
    console.error('Analysis search error:', error);
    return [];
  }
}

async function fetchContentById(id: string, apiKey: string, includeMetadata: boolean): Promise<FetchResult> {
  const [type, code] = id.split('_');
  
  if (type === 'stock') {
    return await fetchStockContent(code, apiKey, includeMetadata);
  }
  
  // Add other content types as needed
  throw new Error(`Unsupported content type: ${type}`);
}

async function fetchStockContent(code: string, apiKey: string, includeMetadata: boolean): Promise<FetchResult> {
  try {
    const data = await customFetch(`analysis/information/${code}`, apiKey);
    
    return {
      id: `stock_${code}`,
      content: JSON.stringify(data, null, 2),
      title: `${data.name} (${code})`,
      url: `https://invezgo.com/stock/${code}`,
      type: 'stock',
      metadata: includeMetadata ? {
        code: data.code,
        sector: data.sector,
        subsector: data.subsector,
        market: data.market,
        lastUpdated: new Date().toISOString()
      } : undefined
    };
  } catch (error) {
    throw new Error(`Failed to fetch stock content for ${code}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
