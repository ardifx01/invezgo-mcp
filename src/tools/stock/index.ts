import {
    codeOnlySchema,
    dateOnlySchema,
    codeFromToSchema,
    codeRangeSchema,
    summarySchema,
    inventorySchema,
    momentumSchema,
    intradayInventorySchema,
    sankeySchema,
    insiderSchema,
    aboveFivePercentSchema
} from "@/schema/stock";
import { server } from "@/server";
import { 
    information,
    listStock,
    listBroker,
    topChange,
    topForeign,
    topAccumulation,
    chart,
    shareholder,
    shareholderNumber,
    summaryStock,
    summaryBroker,
    shareholderKSEI,
    inventoryStock,
    inventoryBroker,
    momentum,
    intradayInventory,
    sankey,
    insider,
    aboveFivePercent
} from "./handler";
  
export const registerStockTools = (): void => {
    server.addTool({
        name: "information",
        description: "Informasi perusahaan sesuai kode emiten (code). Jenis data: Cross Section. Update sesuai laporan masing-masing perusahaan setiap bulan",
        parameters: codeOnlySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            title: "Informasi perusahaan",
        },
        execute: async (args, context) => await information(args, context),
    });

    server.addTool({
        name: "listStock",
        description: "Daftar perusahaan tercatat di Bursa Efek Indonesia. Tidak termasuk perusahaan yang telah delisting dari Bursa Efek Indonesia. Update Realtime dan mengikuti perkembangan perusahaan IPO.",
        execute: async (args, context) => await listStock(context),
    });

    server.addTool({
        name: "listBroker",
        description: "Daftar sekuritas atau broker tercatat di Bursa Efek Indonesia. Update Realtime dan mengikuti perkembangan MKBD broker.",
        execute: async (args, context) => await listBroker(context),
    });

    server.addTool({
        name: "topChange",
        description: "Daftar perusahaan yang mengalami perubahan harga terbesar pada tanggal tertentu. Update Realtime dan mengikuti perkembangan perusahaan IPO.",
        parameters: dateOnlySchema,
        execute: async (args, context) => await topChange(args, context),
    });

    server.addTool({
        name: "topForeign",
        description: "Daftar akumulasi dan distribusi pergerakan asing saham teratas pada tanggal (date) tertentu. Jenis data: Cross Section. Update EOD setiap hari.",
        parameters: dateOnlySchema,
        execute: async (args, context) => await topForeign(args, context),
    });

    server.addTool({
        name: "topAccumulation",
        description: "Daftar akumulasi dan distribusi pergerakan asing saham teratas pada tanggal (date) tertentu. Jenis data: Cross Section. Update EOD setiap hari.",
        parameters: dateOnlySchema,
        execute: async (args, context) => await topAccumulation(args, context),
    });

    server.addTool({
        name: "chart",
        description: "Grafik harga saham perusahaan dengan rentang tanggal tertentu. Jenis data: Time Series. Update Realtime dan mengikuti perkembangan perusahaan IPO.",
        parameters: codeFromToSchema,
        execute: async (args, context) => await chart(args, context),
    });

    server.addTool({
        name: "shareholderNumber",
        description: "Data jumlah investor pada saham sesuai kode emiten (code). Jenis data: Cross Section / Time Series. Update sesuai laporan masing-masing perusahaan setiap bulan",
        parameters: codeFromToSchema,
        execute: async (args, context) => await shareholderNumber(args, context),
    });

    server.addTool({
        name: "shareholder",
        description: "Data komposisi kepemilikan saham sesuai kode emiten (code). Jenis data: Cross Section berdasarkan data terbaru. Update sesuai laporan masing-masing perusahaan setiap bulan",
        parameters: codeFromToSchema,
        execute: async (args, context) => await shareholder(args, context),
    });

    server.addTool({
        name: "shareholderKSEI",
        description: "Data komposisi kepemilikan investor asing dan domestik dalam beberapa grup pada saham berdasarkan data KSEI sesuai kode emiten (code) dan jumlah bulan (range). Jenis data: Cross Section / Time Series. Update tanggal 02 setiap bulan.",
        parameters: codeRangeSchema,
        execute: async (args, context) => await shareholderKSEI(args, context),
    });

    server.addTool({
        name: "summaryStock",
        description: "Data broker summary sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Cross Section / Time Series. Update EOD setiap 17.30 WIB",
        parameters: summarySchema,
        execute: async (args, context) => await summaryStock(args, context),
    });

    server.addTool({
        name: "summaryBroker",
        description: "Data broker summary sesuai dengan kode broker (code) dan tanggal awal (from) dan akhir (to). Jenis data: Cross Section / Time Series. Update EOD setiap 17.30 WIB",
        parameters: summarySchema,
        execute: async (args, context) => await summaryBroker(args, context),
    });

    server.addTool({
        name: "inventoryStock",
        description: "Visualisasi inventory atau transaksi data broker summary sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: inventorySchema,
        execute: async (args, context) => await inventoryStock(args, context),
    });

    server.addTool({
        name: "inventoryBroker",
        description: "Visualisasi inventory atau transaksi data broker summary sesuai dengan kode broker (code) dan tanggal awal (from) dan akhir (to). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: inventorySchema,
        execute: async (args, context) => await inventoryBroker(args, context),
    });

    server.addTool({
        name: "momentum",
        description: "Grafik momentum saham sesuai dengan kode emiten (code) dan tanggal (date) dan range (range). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: momentumSchema,
        execute: async (args, context) => await momentum(args, context),
    });

    server.addTool({
        name: "intradayInventory",
        description: "Grafik inventory atau transaksi data broker summary sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: intradayInventorySchema,
        execute: async (args, context) => await intradayInventory(args, context),
    });

    server.addTool({
        name: "sankey",
        description: "Grafik sankey atau transaksi data broker summary sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: sankeySchema,
        execute: async (args, context) => await sankey(args, context),
    });

    server.addTool({
        name: "insider",
        description: "Data pemegang saham atau insider sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Cross Section. Update EOD setiap 18.00 WIB",
        parameters: insiderSchema,
        execute: async (args, context) => await insider(args, context),
    });

    server.addTool({
        name: "aboveFivePercent",
        description: "Data pemegang saham atau insider sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Cross Section. Update EOD setiap 18.00 WIB",
        parameters: aboveFivePercentSchema,
        execute: async (args, context) => await aboveFivePercent(args, context),
    });
};