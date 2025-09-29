'use client'
import DataTable, { TableColumn } from 'react-data-table-component'
import React from 'react'

export function SimpleTable<T>({ columns, data }: { columns: TableColumn<T>[], data: T[] }){
  return <DataTable columns={columns} data={data} dense pagination highlightOnHover />
}
