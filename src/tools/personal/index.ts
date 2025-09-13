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
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            title: "Watchlist"
        },
        execute: async (args, context) => await watchlist(context),
    });

    server.addTool({
        name: "journal",
        description: "Get journal",
        parameters: fromToSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            title: "Journal"
        },
        execute: async (args, context) => await journal(args, context),
    });

    server.addTool({
        name: "journal-summary",
        description: "Get journal summary",
        parameters: fromToSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            title: "Journal Summary"
        },
        execute: async (args, context) => await journalSummary(args, context),
    });

    server.addTool({
        name: "portfolio",
        description: "Get portfolio",
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            title: "Portfolio"
        },
        execute: async (args, context) => await portfolio(context),
    });

    server.addTool({
        name: "portfolio-summary",
        description: "Get portfolio summary",
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            title: "Portfolio Summary"
        },
        execute: async (args, context) => await portfolioSummary(context),
    });

    server.addTool({
        name: "trade",
        description: "Get trade",
        parameters: fromToSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            title: "Trade"
        },
        execute: async (args, context) => await trade(args, context),
    });

    server.addTool({
        name: "trade-summary",
        description: "Get trade summary",
        parameters: fromToSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            title: "Trade Summary"
        },
        execute: async (args, context) => await tradeSummary(args, context),
    });
};