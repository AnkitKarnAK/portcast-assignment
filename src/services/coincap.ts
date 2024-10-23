export const CoincapApi = {
    async getAssets(): Promise<AssetsResponse> {
        const response = await fetch('https://api.coincap.io/v2/assets')
        return response.json()
    },
    async getAsset(id: string): Promise<AssetResponse> {
        const response = await fetch(`https://api.coincap.io/v2/assets/${id}`)
        return response.json()
    },
    async getAssetHistory(id: string): Promise<AssetHistoryResponse> {

        const now = new Date()
        const end = now.getTime()
        const start = new Date(now.setDate(now.getDate() - 30 - 1)).getTime()

        const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=${start}&end=${end}`)
        return response.json()
    }
}

export type Asset = {
    id: string
    rank: string
    symbol: string
    name: string
    supply: string
    maxSupply: string
    marketCapUsd: string
    volumeUsd24Hr: string
    priceUsd: string
    changePercent24Hr: string
    vwap24Hr: string
    explorer: string
}

export type AssetsResponse = {
    data: Asset[]
}

export type AssetResponse = {
    data: Asset
}

export type AssetHistory = {
    priceUsd: string
    date: string
    time: number
}

export type AssetHistoryResponse = {
    data: AssetHistory[]
}