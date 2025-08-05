import {
  CodeOnlyArgs,
  DateOnlyArgs,
  CodeFromToArgs,
  CodeRangeArgs,
  SummaryArgs,
  InventoryArgs
} from "@/schema/stock";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { Context } from "fastmcp";
import { customFetch } from "@/utils/fetch";
import { formatResponse } from "@/utils/format-response";
  
export const information = async (
  args: CodeOnlyArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
    const apiKey = context.session?.apiKey as string;

    const data = await customFetch(`analysis/information/${args.code}`, apiKey);

    return formatResponse(data);
}

export const listStock = async (
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/list/stock`, apiKey);

  return formatResponse(data);
}

export const listBroker = async (
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/list/broker`, apiKey);

  return formatResponse(data);
}

export const topChange = async (
  args: DateOnlyArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/top/change?date=${args.date}`, apiKey);

  return formatResponse(data);
}

export const topForeign = async (
  args: DateOnlyArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/top/foreign?date=${args.date}`, apiKey);

  return formatResponse(data);
}

export const topAccumulation = async (
  args: DateOnlyArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;
 
  const data = await customFetch(`analysis/top/accumulation?date=${args.date}`, apiKey);

  return formatResponse(data);
}

export const chart = async (
  args: CodeFromToArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/chart/stock/${args.code}?from=${args.from}&to=${args.to}`, apiKey);

  return formatResponse(data);
}

export const shareholderNumber = async (
  args: CodeFromToArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/shareholder/number/${args.code}`, apiKey);

  return formatResponse(data);
}

export const shareholder = async (
  args: CodeFromToArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/shareholder/${args.code}`, apiKey);

  return formatResponse(data);
}

export const shareholderKSEI = async (
  args: CodeRangeArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;
  
  const data = await customFetch(`analysis/shareholder/ksei/${args.code}?range=${args.range}`, apiKey);

  return formatResponse(data);
}

export const summaryStock = async (
  args: SummaryArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;
  
  const data = await customFetch(`analysis/summary/stock/${args.code}?from=${args.from}&to=${args.to}&investor=${args.investor}&market=${args.market}`, apiKey);

  return formatResponse(data);
}

export const summaryBroker = async (
  args: SummaryArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;
  
  const data = await customFetch(`analysis/summary/broker/${args.code}?from=${args.from}&to=${args.to}&investor=${args.investor}&market=${args.market}`, apiKey);

  return formatResponse(data);
}

export const inventoryStock = async (
  args: InventoryArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/inventory-chart/stock/${args.code}?from=${args.from}&to=${args.to}&investor=${args.investor}&market=${args.market}&scope=${args.scope}&limit=${args.limit}&filter=${args.filter}`, apiKey);

  return formatResponse(data);
}

export const inventoryBroker = async (
  args: InventoryArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const apiKey = context.session?.apiKey as string;

  const data = await customFetch(`analysis/inventory-chart/broker/${args.code}?from=${args.from}&to=${args.to}&investor=${args.investor}&market=${args.market}&scope=${args.scope}&limit=${args.limit}&filter=${args.filter}`, apiKey);

  return formatResponse(data);
}














