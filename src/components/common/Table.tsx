import React from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowId?: (row: T) => React.Key;
}

function Table<T>({ columns, rows, getRowId }: TableProps<T>) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] text-text-main">
            {columns.map(col => (
              <th key={col.key} className="py-2 pr-4 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-text-main">
          {rows.map((row, idx) => (
            <tr key={getRowId ? getRowId(row) : idx} className="">
              {columns.map(col => (
                <td
                  key={col.key}
                  className="py-3 pr-4 text-text-soft align-middle text-xs whitespace-nowrap"
                >
                  {col.render ? col.render(row, idx) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
