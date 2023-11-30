import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { tr } from "date-fns/locale";
import Swal from "sweetalert2";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useState } from "react";

const AcceptedCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: data=[], refetch} = useQuery({
        queryKey: ['professionalacceptedStatus'],
        queryFn: async () => {
           const result = await axiosSecure.get(`/professionals-requesting?email=${user?.email}`);
            return result.data;
        }
    })
    console.log(data);



    const columns = [
        {
            header: 'Camp Name',
            accessorKey: 'campInfo.camp_name',
        },
        {
            header: 'Date_Time',
            accessorKey: 'campInfo.scheduled_date_time',
            cell: ({value, row}) => (
                <Box><Typography>{moment(row.original.scheduled_date_time).format('LLL')}</Typography></Box>
            )
        },
        {
            header: 'Venue',
            accessorKey: 'campInfo.venue_location',
        },
        {
            header: 'Target Audience',
            accessorKey: 'campInfo.target_audience',
        },
        {
            header: 'Accepted Status',
            accessorKey: 'status',
            cell: ({value, row}) => (
                <Box>
                    {row.original.status == "Pending" ? <Button variant="outlined" sx={{color: 'red'}}>Pending</Button> : <Button variant="outlined" sx={{color: 'green'}}>Confirmed</Button>}
                </Box>
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
        <Box>
            <Helmet>
        <title>Wellnex | Dashboard | manage camps</title>
           </Helmet>
            <Box py={'20px'}>
                <Typography fontSize={'24px'} fontWeight={"600"} textAlign={'center'} component={'h4'}>Accepted Camps</Typography>
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

export default AcceptedCamps;

