import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { CoincapApi } from '@/services/coincap'

export const Route = createFileRoute('/')({
  component: Index,
  loader: () => CoincapApi.getAssets(),
})

function Index() {
  const { data: assets } = useLoaderData({ from: "/" });

  return (
    <div className="p-2">
      <div>{assets.length}</div>
    </div>
  )
}
