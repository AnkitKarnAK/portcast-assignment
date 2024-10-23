import { Asset } from "@/services/coincap"
import { formatCurrency, formatNumber } from "@/utils/tranformers.utils"

type CryptoInfoProps = {
    crypto: Asset
}
const CryptoInfo = ({ crypto }: CryptoInfoProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-between">
            <div className="flex items-center space-x-2">
                <span className="text-gray-500">#{crypto.rank}</span>
                <h1 className="text-xl font-bold">
                    {crypto.name} <span className="text-gray-500">({crypto.symbol})</span>
                </h1>
            </div>

            <div className="flex flex-wrap justify-center gap-3 space-x-6 mt-4">
                <div className="text-center">
                    <p className="text-sm font-semibold text-gray-500">Price</p>
                    <p className="text-lg font-bold">{formatCurrency(crypto.priceUsd)}</p>
                </div>

                <div className="text-center">
                    <p className="text-sm font-semibold text-gray-500">Market Cap</p>
                    <p className="text-lg font-bold">{formatNumber(crypto.marketCapUsd)}</p>
                </div>

                <div className="text-center">
                    <p className="text-sm font-semibold text-gray-500">Supply</p>
                    <p className="text-lg font-bold">{formatNumber(crypto.supply)}</p>
                </div>

                <div className="text-center">
                    <p className="text-sm font-semibold text-gray-500">Volume (24Hr)</p>
                    <p className="text-lg font-bold">{formatNumber(crypto.volumeUsd24Hr)}</p>
                </div>



                <div className="text-center">
                    <p className="text-sm font-semibold text-gray-500">Change (24Hr)</p>
                    <p className={`text-lg font-bold ${parseFloat(crypto.changePercent24Hr) < 0 ? "text-red-500" : "text-green-500"}`}>
                        {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                    </p>
                </div>
            </div>
        </div >
    )
}

export default CryptoInfo