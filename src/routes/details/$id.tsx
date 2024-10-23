import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { CoincapApi } from '@/services/coincap'
import CryptoInfo from '@/components/crypto-info'
import { AssetHistoryChart } from '@/components/crypto-history';

export const Route = createFileRoute('/details/$id')({
    loader: async ({ params: { id } }) => {
        const [assetData, assetHistory] = await Promise.all([
            CoincapApi.getAsset(id),
            CoincapApi.getAssetHistory(id),
        ]);

        return {
            asset: assetData?.data,
            assetHistory: assetHistory?.data,
        };
    },
    component: CryptoDetails,
})

function CryptoDetails() {
    const { asset, assetHistory } = useLoaderData({ from: "/details/$id" })

    console.log("asset", assetHistory);


    return (
        <div>
            <CryptoInfo crypto={asset} />
            <AssetHistoryChart history={assetHistory} />
        </div>
    )
}
