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

export const momentumSchema = codeOnlySchema.extend({
    date: z.string().default("2025-07-05").describe("Tanggal dengan format YYYY-MM-DD (Cth : 2024-12-30)"),
    range: z.number().default(5).describe("Range berdasarkan jumlah menit (Cth : 5)"),
    scope: z.enum(["vol", "val", "freq"]).default("vol").describe("Komponen perhitungan (scope) (Pilihan : vol, val, freq)")
});

export const intradayInventorySchema = codeOnlySchema.extend({
    range: z.number().default(5).describe("Range berdasarkan jumlah menit (Cth : 5)"),
    type: z.enum(["volume", "value"]).default("value").describe("Jenis perhitungan (type) (Pilihan : volume, value)"),
    total: z.number().default(4).describe("Jumlah broker yang akan di tampilkan"),
    buyer: z.enum(["ALL", "F", "D"]).default("ALL").describe("Jenis Buyer (domisili) (Pilihan : ALL, F, D)"),
    seller: z.enum(["ALL", "F", "D"]).default("ALL").describe("Jenis Seller (domisili) (Pilihan : ALL, F, D)"),
    market: z.enum(["ALL", "RG", "NG", "TN"]).default("RG").describe("Jenis Pasar (Pilihan : ALL, RG, NG, TN)"),
    broker: z.array(z.string()).optional().describe("Kode broker yang akan di filter dari list/broker")
});

export const sankeySchema = codeOnlySchema.extend({
    type: z.enum(["volume", "value"]).default("value").describe("Jenis perhitungan (type) (Pilihan : volume, value)"),
    buyer: z.enum(["ALL", "F", "D"]).default("ALL").describe("Jenis Buyer (domisili) (Pilihan : ALL, F, D)"),
    seller: z.enum(["ALL", "F", "D"]).default("ALL").describe("Jenis Seller (domisili) (Pilihan : ALL, F, D)"),
    market: z.enum(["ALL", "RG", "NG", "TN"]).default("RG").describe("Jenis Pasar (Pilihan : ALL, RG, NG, TN)"),
    broker: z.array(z.string()).optional().describe("Kode broker yang akan di filter dari list/broker")
});

export const pageSchema = z.object({
    from: z.string().default("2025-07-01").describe("Tanggal periode awal dengan format YYYY-MM-DD (Cth : 2024-12-30)"),
    to: z.string().default("2025-08-05").describe("Tanggal periode akhir dengan format YYYY-MM-DD (Cth : 2024-12-30)"),
    page: z.number().default(1).describe("Halaman yang akan di tampilkan"),
    limit: z.number().default(10).describe("Jumlah data yang akan di tampilkan per halaman")
});

export const insiderSchema = pageSchema.extend({
    code: z.string().describe("Kode emiten berdasarkan data dari /list/stock (Cth : BBCA)").optional(),
    name: z.string().describe("Nama pemegang saham").optional(),
    broker: z.string().describe("Kode broker berdasarkan data dari /list/broker (Cth : BCA)").optional(),
});

export const aboveFivePercentSchema = insiderSchema.extend({
    broker: z.string().describe("Kode broker berdasarkan data dari /list/broker (Cth : BCA)").optional(),
});


export type CodeOnlyArgs = z.infer<typeof codeOnlySchema>;

export type DateOnlyArgs = z.infer<typeof dateOnlySchema>;

export type CodeFromToArgs = z.infer<typeof codeFromToSchema>;

export type CodeRangeArgs = z.infer<typeof codeRangeSchema>;

export type SummaryArgs = z.infer<typeof summarySchema>;

export type InventoryArgs = z.infer<typeof inventorySchema>;

export type MomentumArgs = z.infer<typeof momentumSchema>;

export type IntradayInventoryArgs = z.infer<typeof intradayInventorySchema>;

export type SankeyArgs = z.infer<typeof sankeySchema>;

export type InsiderArgs = z.infer<typeof insiderSchema>;

export type AboveFivePercentArgs = z.infer<typeof aboveFivePercentSchema>;




