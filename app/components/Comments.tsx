'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getComments } from '../services/getComments';
import {
  createColumnHelper,
  createTable,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Comment } from '../types/index';
import { SimpleComponent } from '../components/SimpleComponent';

export const Comments = () => {
  const columnHelper = createColumnHelper<Comment>();

  const columns = [
    columnHelper.accessor('postId', {
      cell: (info) => info.getValue(),
      header: 'Post Id',
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor('name', {
      id: 'name',
      cell: (info) => <i>{info.getValue()}</i>,
      header: 'Nombre',
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
      cell: (info) => {
        return <SimpleComponent email={info.getValue()} />;
      },
    }),
    columnHelper.accessor('body', {
      header: () => 'Body',
      cell: (info) => info.renderValue(),
    }),
    // columnHelper.accessor('visits', {
    //   header: () => <span>Visits</span>,
    //   footer: (info) => info.column.id,
    // }),
    // columnHelper.accessor('status', {
    //   header: 'Status',
    //   footer: (info) => info.column.id,
    // }),
    // columnHelper.accessor('progress', {
    //   header: 'Profile Progress',
    //   footer: (info) => info.column.id,
    // }),
  ];

  const { data } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  // const table = useReactTable({
  // });

  console.log(table.getRowModel());
  return (
    <div>
      <div className="p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  console.log(cell.getContext());
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
      </div>
    </div>
  );
};
