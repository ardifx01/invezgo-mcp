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
    aboveFivePercentSchema,
    priceSeasonalSchema,
    financialSchema,
    keystatSchema
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
    aboveFivePercent,
    priceDiary,
    priceSeasonal,
    searchStock,
    newsStock,
    financialStock,
    keystatStock
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
            streamingHint: true,
            title: "Informasi perusahaan",
        },
        execute: async (args, context) => await information(args, context),
    });

    server.addTool({
        name: "list-stock",
        description: "Daftar perusahaan tercatat di Bursa Efek Indonesia. Tidak termasuk perusahaan yang telah delisting dari Bursa Efek Indonesia. Update Realtime dan mengikuti perkembangan perusahaan IPO.",
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Daftar perusahaan tercatat di Bursa Efek Indonesia"
        },
        execute: async (args, context) => await listStock(context),
    });

    server.addTool({
        name: "list-broker",
        description: "Daftar sekuritas atau broker tercatat di Bursa Efek Indonesia. Update Realtime dan mengikuti perkembangan MKBD broker.",
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Daftar broker atau sekuritas tercatat di Bursa Efek Indonesia"
        },
        execute: async (args, context) => await listBroker(context),
    });

    server.addTool({
        name: "top-change",
        description: "Daftar perusahaan yang mengalami perubahan harga terbesar pada tanggal tertentu. Update Realtime dan mengikuti perkembangan perusahaan IPO.",
        parameters: dateOnlySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Daftar teratas harian berdasarkan perubahan harga"
        },
        execute: async (args, context) => await topChange(args, context),
    });

    server.addTool({
        name: "top-foreign",
        description: "Daftar akumulasi dan distribusi pergerakan asing saham teratas pada tanggal (date) tertentu. Jenis data: Cross Section. Update EOD setiap hari.",
        parameters: dateOnlySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Daftar teratas harian berdasarkan transaksi asing"
        },
        execute: async (args, context) => await topForeign(args, context),
    });

    server.addTool({
        name: "top-accumulation",
        description: "Daftar akumulasi dan distribusi pergerakan asing saham teratas pada tanggal (date) tertentu. Jenis data: Cross Section. Update EOD setiap hari.",
        parameters: dateOnlySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Daftar teratas harian berdasarkan akumulasi dan distribusi"
        },
        execute: async (args, context) => await topAccumulation(args, context),
    });

    server.addTool({
        name: "chart",
        description: "Grafik harga saham perusahaan dengan rentang tanggal tertentu. Jenis data: Time Series. Update Realtime dan mengikuti perkembangan perusahaan IPO.",
        parameters: codeFromToSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Chart Saham"
        },
        execute: async (args, context) => await chart(args, context),
    });

    server.addTool({
        name: "shareholder-number",
        description: "Data jumlah investor pada saham sesuai kode emiten (code). Jenis data: Cross Section / Time Series. Update sesuai laporan masing-masing perusahaan setiap bulan",
        parameters: codeFromToSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Jumlah Pemegang Saham"
        },
        execute: async (args, context) => await shareholderNumber(args, context),
    });

    server.addTool({
        name: "shareholder",
        description: "Data komposisi kepemilikan saham sesuai kode emiten (code). Jenis data: Cross Section berdasarkan data terbaru. Update sesuai laporan masing-masing perusahaan setiap bulan",
        parameters: codeFromToSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Komposisi Pemegang Saham"
        },
        execute: async (args, context) => await shareholder(args, context),
    });

    server.addTool({
        name: "shareholder-ksei",
        description: "Data komposisi kepemilikan investor asing dan domestik dalam beberapa grup pada saham berdasarkan data KSEI sesuai kode emiten (code) dan jumlah bulan (range). Jenis data: Cross Section / Time Series. Update tanggal 02 setiap bulan.",
        parameters: codeRangeSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Komposisi Pemegang Saham Berdasarkan KSEI"
        },
        execute: async (args, context) => await shareholderKSEI(args, context),
    });

    server.addTool({
        name: "summary-stock",
        description: "Data broker summary sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Cross Section / Time Series. Update EOD setiap 17.30 WIB",
        parameters: summarySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Broker Summary Saham"
        },
        execute: async (args, context) => await summaryStock(args, context),
    });

    server.addTool({
        name: "summary-broker",
        description: "Data broker summary sesuai dengan kode broker (code) dan tanggal awal (from) dan akhir (to). Jenis data: Cross Section / Time Series. Update EOD setiap 17.30 WIB",
        parameters: summarySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Broker Summary Broker"
        },
        execute: async (args, context) => await summaryBroker(args, context),
    });

    server.addTool({
        name: "inventory-stock",
        description: "Visualisasi inventory atau transaksi data broker summary sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: inventorySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Visualisasi Transaksi Saham"
        },
        execute: async (args, context) => await inventoryStock(args, context),
    });

    server.addTool({
        name: "inventory-broker",
        description: "Visualisasi inventory atau transaksi data broker summary sesuai dengan kode broker (code) dan tanggal awal (from) dan akhir (to). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: inventorySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Visualisasi Transaksi Broker"
        },
        execute: async (args, context) => await inventoryBroker(args, context),
    });

    server.addTool({
        name: "momentum",
        description: "Grafik momentum saham sesuai dengan kode emiten (code) dan tanggal (date) dan range (range). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: momentumSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Visualisasi Momentum Jual dan Beli Saham"
        },
        execute: async (args, context) => await momentum(args, context),
    });

    server.addTool({
        name: "intraday-inventory",
        description: "Grafik inventory atau transaksi data broker summary sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: intradayInventorySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Visualisasi Transaksi Saham Harian"
        },
        execute: async (args, context) => await intradayInventory(args, context),
    });

    server.addTool({
        name: "sankey",
        description: "Grafik sankey atau transaksi data broker summary sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Time Series. Update EOD setiap 18.00 WIB",
        parameters: sankeySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Visualisasi Transaksi Perpindahan Saham"
        },
        execute: async (args, context) => await sankey(args, context),
    });

    server.addTool({
        name: "insider",
        description: "Data pemegang saham atau insider sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Cross Section. Update EOD setiap 18.00 WIB",
        parameters: insiderSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Transaksi Orang Dalam"
        },
        execute: async (args, context) => await insider(args, context),
    });

    server.addTool({
        name: "above-five-percent",
        description: "Data pemegang saham atau insider sesuai dengan kode emiten (code) dan tanggal awal (from) dan akhir (to). Jenis data: Cross Section. Update EOD setiap 18.00 WIB",
        parameters: aboveFivePercentSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Kepemilikan Diatas 5% dari Total Saham"
        },
        execute: async (args, context) => await aboveFivePercent(args, context),
    });

    server.addTool({
        name: "price-diary",
        description: "Tabel perubahan harga saham harian dengan kode emiten (code). Jenis data: Time Series. Update Realtime",
        parameters: codeOnlySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Perubahan Harga Saham Harian Dalam 1 Bulan Tertentu"
        },
        execute: async (args, context) => await priceDiary(args, context),
    });

    server.addTool({
        name: "price-seasonal",
        description: "Tabel perubahan harga saham bulanan dengan kode emiten (code). Jenis data: Time Series. Update Realtime",
        parameters: priceSeasonalSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Perubahan Harga Saham Bulanan Dalam Beberapa Tahun"
        },
        execute: async (args, context) => await priceSeasonal(args, context),
    });

    server.addTool({
        name: "search-stock",
        description: "Cari perusahaan berdasarkan kata kunci (query). Mendukung pencarian dengan kata kunci (query). Query dapat berupa nama perusahaan, kode emiten, industri, atau kategori.",
        parameters: codeOnlySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Cari Saham Berdasarkan Kata Kunci"
        },
        execute: async (args, context) => await searchStock(args, context),
    });

    server.addTool({
        name: "news",
        description: "Cari berita terkait saham berdasarkan kode emiten (code). Maksimal 20 berita terkait saham berdasarkan kode emiten (code). Dapat digunakan untuk Analisa Sentimen.",
        parameters: codeOnlySchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Berita Saham"
        },
        execute: async (args, context) => await newsStock(args, context),
    });

    server.addTool({
        name: "financial",
        description: "Data laporan keuangan saham sesuai dengan kode emiten (code) dan jenis statement (statement) dan jenis tanggal periode (type) dan jumlah data (limit). Jenis data: Panel. Update tergantung laporan dari emiten",
        parameters: financialSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Laporan Keuangan Saham"
        },
        execute: async (args, context) => await financialStock(args, context),
    });

    server.addTool({
        name: "keystat",
        description: "Data laporan keuangan saham sesuai dengan kode emiten (code) dan jenis tanggal periode (type) dan jumlah data (limit). Jenis data: Panel. Update tergantung laporan dari emiten",
        parameters: keystatSchema,
        annotations: {
            destructiveHint: false,
            openWorldHint: true,
            readOnlyHint: true,
            idempotentHint: true,
            streamingHint: true,
            title: "Laporan Keuangan Saham"
        },
        execute: async (args, context) => await keystatStock(args, context),
    });
};