import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { CoincapApi } from '@/services/coincap'
import { DataTable } from '@/components/ui/crypto-table/data-table';
import { columns } from '@/components/ui/crypto-table/coulmns';

export const Route = createFileRoute('/')({
  component: Index,
  loader: () => CoincapApi.getAssets(),
})

function Index() {
  const { data: assets } = useLoaderData({ from: "/" });

  const tableData = assets.map((asset) => ({
    rank: asset.rank,
    name: asset.name,
    symbol: asset.symbol,
    priceUsd: asset.priceUsd,
    marketCapUsd: asset.marketCapUsd,
  }))

  return (
    <div className="p-2">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  )
}
