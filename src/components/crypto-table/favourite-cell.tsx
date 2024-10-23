import { useTableStore } from "@/stores/crypto-table.stores";
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";

export const FavoriteCell = ({ symbol }: { symbol: string }) => {
    const { favorites, toggleFavorite } = useTableStore();
    const isFavorite = favorites.includes(symbol);

    return (
        <Button variant="ghost" onClick={() => toggleFavorite(symbol)}>
            {isFavorite ? <Star className="h-5 w-5 text-yellow-500 fill-current" /> : <StarOff className="h-4 w-4" />}
        </Button>
    );
};