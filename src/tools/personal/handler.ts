import {
    FromToArgs
} from "@/schema/personal";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { Context } from "fastmcp";
import { customFetch } from "@/utils/fetch";
import { formatResponse } from "@/utils/format-response";

export const watchlist = async (
    context: Context<SessionData>
): Promise<HandlerReturnType> => {
    const apiKey = context.session?.apiKey as string;

    const data = await customFetch(`watchlists?group=null`, apiKey);

    return formatResponse(data);
}

export const journal = async (
    args: FromToArgs,
    context: Context<SessionData>
): Promise<HandlerReturnType> => {
    const apiKey = context.session?.apiKey as string;

    const data = await customFetch(`journals?from=${args.from}&to=${args.to}`, apiKey);

    return formatResponse(data);
}

export const journalSummary = async (
    args: FromToArgs,
    context: Context<SessionData>
): Promise<HandlerReturnType> => {
    const apiKey = context.session?.apiKey as string;

    const data = await customFetch(`journals/summary?from=${args.from}&to=${args.to}`, apiKey);

    return formatResponse(data);
}

export const portfolio = async (
    context: Context<SessionData>
): Promise<HandlerReturnType> => {
    const apiKey = context.session?.apiKey as string;

    const data = await customFetch(`portfolios`, apiKey);

    return formatResponse(data);
}

export const portfolioSummary = async (
    context: Context<SessionData>
): Promise<HandlerReturnType> => {
    const apiKey = context.session?.apiKey as string;

    const data = await customFetch(`portfolios/summary`, apiKey);

    return formatResponse(data);
}

export const trade = async (
    args: FromToArgs,
    context: Context<SessionData>
): Promise<HandlerReturnType> => {
    const apiKey = context.session?.apiKey as string;

    const data = await customFetch(`trades?from=${args.from}&to=${args.to}`, apiKey);

    return formatResponse(data);
}

export const tradeSummary = async (
    args: FromToArgs,
    context: Context<SessionData>
): Promise<HandlerReturnType> => {
    const apiKey = context.session?.apiKey as string;

    const data = await customFetch(`trades/summary?from=${args.from}&to=${args.to}`, apiKey);

    return formatResponse(data);
}


















