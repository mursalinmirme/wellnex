import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { tr } from "date-fns/locale";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useState } from "react";
const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: data=[], refetch} = useQuery({
        queryKey: ['participantpaymentList'],
        queryFn: async () => {
           const result = await axiosSecure.get(`/participant-payment-history?email=${user?.email}`);
            return result.data;
        }
    })
    console.log(data);




    const columns = [
        {
            header: 'Camp Name',
            accessorKey: 'camp_name',
        },
        {
            header: 'Date_Time',
            accessorKey: 'scheduled_date_time',
            cell: ({value, row}) => (
                <Box><Typography>{moment(row.original.scheduled_date_time).format('LLL')}</Typography></Box>
            )
        },
        {
            header: 'Venue',
            accessorKey: 'venue_location',
        },
        {
            header: 'Camp_Fees',
            accessorKey: 'camp_fees',
        },
        {
            header: 'payment_status',
            accessorKey: 'payment_status',
            cell: ({value, row}) => (
                <Box><Button sx={{color: 'green'}} variant="outlined">{row.original.payment_status}</Button></Box>
            )
        },
        {
            header: 'confirmation_stauts',
            accessorKey: 'confirmation',
            cell: ({value, row}) => (
                <Box><Button sx={{color: 'green'}} variant="outlined">{row.original.confirmation}</Button></Box>
            )
        },

    ]

    
    const [filtering, setFiltering] = useState('');
    const [sorting, setSorting] = useState([]);
    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter: filtering,
            sorting: sorting,
        }, 
        onGlobalFilterChange: setFiltering,
        onSortingChange: setSorting
    })

    return (
        <Box sx={{width: '100%', overflowX: {xs: 'scroll', lg: 'hidden'}}}>
        <Helmet>
            <title>Wellnex | Dashboard | Payment History</title>
        </Helmet>
            <Box py={'20px'}>
                <Typography fontSize={'24px'} fontWeight={"600"} textAlign={'center'} component={'h4'}>Payment History:</Typography>
            </Box>
            <TextField 
                 sx={{width: '40%'}}
                label={'search...'}
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            ></TextField>
            <Table component={'table'}>
                <TableHead component={'thead'}>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup?.id} component={'tr'}>
                        {headerGroup.headers.map(header => (
                            <TableCell sx={{fontWeight:'600'}} key={header?.id} component={'th'}>
                                {header.isPlaceholder ? null : (
                                    <Box>
                                        {flexRender(
                                            header.column.columnDef.header, header.getContext()
                                        )}
                                    </Box>
                                )}
                            </TableCell>
                        ))}
                </TableRow>
                    ) )}
                    
                </TableHead>
                <TableBody component={'tbody'}>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row?.id} component={'tr'}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell?.id} component={'td'}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>
            <Box display={'flex'} mt={'20px'} mb={'20px'} gap={'20px'}>
            <Button variant="outlined"
            disabled={!table.getCanPreviousPage}
            onClick={() => table.previousPage()}
            >Previous Page</Button>
            <Button variant="outlined"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            >Next Page</Button>
            </Box>
        </Box>
    );
};
export default PaymentHistory;