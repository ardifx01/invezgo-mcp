import { z } from "zod";

export const codeOnlySchema = z.object({
    code: z.string().default("BBCA").describe("Kode emiten berdasarkan data dari /list/stock (Cth : BBCA)")
});

export const dateOnlySchema = z.object({
    date: z.string().describe("Tanggal dengan format YYYY-MM-DD (Cth : 2024-12-30)")
});

export const codeFromToSchema = z.object({
    code: z.string().default("BBCA").describe("Kode emiten berdasarkan data dari /list/stock (Cth : BBCA)"),
    from: z.string().default("2025-07-01").describe("Tanggal periode awal dengan format YYYY-MM-DD (Cth : 2024-12-30)"),
    to: z.string().default("2025-08-05").describe("Tanggal periode akhir dengan format YYYY-MM-DD (Cth : 2024-12-30)")
});

export const codeRangeSchema = codeFromToSchema.extend({
    range: z.number().default(6).describe("Range berdasarkan jumlah bulan (Cth : 6)")
});

export const summarySchema = codeFromToSchema.extend({
    investor: z.enum(["all", "f", "d"]).default("all").describe("Jenis Investor (domisili) (Pilihan : all, f, d)"),
    market: z.enum(["RG", "NG", "TN"]).default("RG").describe("Jenis Pasar (Pilihan : RG, NG, TN)")
});

export const inventorySchema = summarySchema.extend({
    scope: z.enum(["vol", "val", "freq"]).default("vol").describe("Komponen perhitungan (scope) (Pilihan : vol, val, freq)"),
    limit: z.number().default(5).describe("Jumlah broker yang akan di tampilkan"),
    filter: z.array(z.string()).optional().describe("Kode broker yang akan di filter dari list/broker")
});

export type CodeOnlyArgs = z.infer<typeof codeOnlySchema>;

export type DateOnlyArgs = z.infer<typeof dateOnlySchema>;

export type CodeFromToArgs = z.infer<typeof codeFromToSchema>;

export type CodeRangeArgs = z.infer<typeof codeRangeSchema>;

export type SummaryArgs = z.infer<typeof summarySchema>;

export type InventoryArgs = z.infer<typeof inventorySchema>;

