export const CoincapApi = {
    async getAssets(): Promise<AssetsResponse> {
        const response = await fetch('https://api.coincap.io/v2/assets')
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