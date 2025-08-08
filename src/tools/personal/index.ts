import {
    fromToSchema
} from "@/schema/personal";
import { server } from "@/server";
import { 
    watchlist,
    journal,
    journalSummary,
    portfolio,
    portfolioSummary,
    trade,
    tradeSummary
} from "./handler";

export const registerPersonalTools = (): void => {
    server.addTool({
        name: "watchlist",
        description: "Get watchlist",
        execute: async (args, context) => await watchlist(context),
    });

    server.addTool({
        name: "journal",
        description: "Get journal",
        parameters: fromToSchema,
        execute: async (args, context) => await journal(args, context),
    });

    server.addTool({
        name: "journal-summary",
        description: "Get journal summary",
        parameters: fromToSchema,
        execute: async (args, context) => await journalSummary(args, context),
    });

    server.addTool({
        name: "portfolio",
        description: "Get portfolio",
        execute: async (args, context) => await portfolio(context),
    });

    server.addTool({
        name: "portfolio-summary",
        description: "Get portfolio summary",
        execute: async (args, context) => await portfolioSummary(context),
    });

    server.addTool({
        name: "trade",
        description: "Get trade",
        parameters: fromToSchema,
        execute: async (args, context) => await trade(args, context),
    });

    server.addTool({
        name: "trade-summary",
        description: "Get trade summary",
        parameters: fromToSchema,
        execute: async (args, context) => await tradeSummary(args, context),
    });
};