import { Table } from "@mantine/core";
import {
    ColumnDef,
    createTable,
    getCoreRowModel,
    Row,
    Table as TableInstance,
    TableGenerics,
    useTableInstance,
} from "@tanstack/react-table";
import { useMemo } from "react";

export interface ColumnOptions<T> {
    label: string;
    key: string;
    render?: (record: T) => React.ReactNode;
    sort?: (a: T, b: T) => number;
    filter?: "text" | "date" | "select" | "number";
    filterable?: boolean;
}

interface DataTableProps<T> {
    data: T[];
    columns: ColumnOptions<T>[];
    withActions?: boolean;
}

export default function <T>({
    data,
    columns,
    withActions,
}: DataTableProps<T>) {
    const table = createTable().setRowType<typeof data>();

    const toColumns = (
        table: TableInstance,
        columns: ColumnOptions<typeof data>[]
    ): ColumnDef<T>[] => {
        return columns.map((col) =>
            table.createDataColumn(() => col.key, {
                id: col.key,
                header: col.label,
            })
        );
    }

    const mergedColumns = [
        table.createDisplayColumn({
            id: "actions",
            cell: (props) => <RowActions row={props.row}></RowActions>,
        }),
        toColumns(table, columns)
    ];
    const instance = useTableInstance(table, {
        data,
        columns: mergedColumns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <Table>
            <thead>
                {instance.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((col) => (
                            <th key={col.id}>
                                {col.renderHeader()}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {instance.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{cell.renderCell()}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}



interface RowActionProps<T> {
    row: Row<T>;
}
function RowActions<T>({ row }: RowActionProps<T>) {
    return <></>;
}
