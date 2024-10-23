import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"

import { useTableStore } from "@/stores/crypto-table.stores"
import { useNavigate } from "@tanstack/react-router"
import { CryptoTableItem } from "./coulmns"
import { useEffect, useState } from "react"
import { Throttle } from "@/utils/functions.utils"

interface PriceChange {
  [key: string]: 'increase' | 'decrease' | null;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate()
  // const [sorting, setSorting] = useState<SortingState>([])
  const [realTimePrices, setRealTimePrices] = useState<{ [key: string]: string }>({});
  const [priceChange, setPriceChange] = useState<PriceChange>({});

  const { sorting, setSorting } = useTableStore()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  const visibleRowIds = table.getRowModel().rows.map((row) => (row.original as CryptoTableItem).id).join(',');

  const throttledUpdatePrices = Throttle((newPrices: Record<string, string>) => {
    setRealTimePrices((prevPrices) => {
      const updatedPrices = { ...prevPrices, ...newPrices };

      const updatedChanges: PriceChange = { ...priceChange };
      Object.keys(newPrices).forEach((id) => {
        const previousPrice = parseFloat(prevPrices[id]);
        const currentPrice = parseFloat(newPrices[id]);

        if (!isNaN(previousPrice) && !isNaN(currentPrice)) {
          if (currentPrice > previousPrice) {
            updatedChanges[id] = 'increase';
          } else if (currentPrice < previousPrice) {
            updatedChanges[id] = 'decrease';
          } else {
            updatedChanges[id] = null;
          }
        }
      });

      setPriceChange(updatedChanges);
      return updatedPrices;
    });
  }, 2000)

  useEffect(() => {
    const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${visibleRowIds}`);

    ws.onmessage = (event) => {
      const updatedPrices = JSON.parse(event.data);

      throttledUpdatePrices(updatedPrices);
    };

    return () => {
      ws.close();
    };
  }, [visibleRowIds]);


  return (
    <div>
      <div className="rounded-md border text-center">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const id = (row.original as CryptoTableItem).id;
                const rowClass = priceChange[id] === 'increase'
                  ? 'bg-green-100'
                  : priceChange[id] === 'decrease'
                    ? 'bg-red-100'
                    : '';

                return (
                  <TableRow
                    key={row.id}
                    className={rowClass}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      navigate({
                        to: `/details/$id`,
                        params: { id: (row.original as CryptoTableItem).id },
                      })
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const realTimeData = realTimePrices[(row.original as CryptoTableItem).id]

                      return (
                        <TableCell key={cell.id}>
                          {cell.column.id === "priceUsd" && !!realTimeData ? realTimeData : flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
