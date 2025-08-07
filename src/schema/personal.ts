import { z } from "zod";

export const fromToSchema = z.object({
    from: z.string().default("2025-07-01").describe("Tanggal periode awal dengan format YYYY-MM-DD (Cth : 2024-12-30)"),
    to: z.string().default("2025-08-05").describe("Tanggal periode akhir dengan format YYYY-MM-DD (Cth : 2024-12-30)")
});

export type FromToArgs = z.infer<typeof fromToSchema>;