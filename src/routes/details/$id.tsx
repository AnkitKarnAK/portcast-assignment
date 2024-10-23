import { createFileRoute } from '@tanstack/react-router'
import { CoincapApi } from '@/services/coincap'

export const Route = createFileRoute('/details/$id')({
    loader: ({ params: { id } }) => CoincapApi.getAsset(id),
    component: () => {
        return <div>Hello /details/$id! </div>
    },
})
