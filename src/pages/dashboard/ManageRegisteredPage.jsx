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

const ManageRegisteredPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: data=[], refetch} = useQuery({
        queryKey: ['manageRegistrations'],
        queryFn: async () => {
           const result = await axiosSecure.get(`/registered_under_organizers?email=${user?.email}`);
            return result.data;
        }
    })
    console.log(data);
    const handleConfirmation = (regId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to confirmed the registration!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.patch(`/payment-status/${regId}`)
                .then(res => {
                if(res.data.operatonStatus === 'success'){
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Registration confirmation successfully!",
                    icon: "success"
                  });
                 }
                })
              
            }
          });
        
    }

    const handleDeleteRegisteredCamps = (deleteId) => {
        console.log('delete id is', deleteId);
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete the participant registered camp!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.delete(`/participant-register-camp/${deleteId}`)
                .then(res => {
                    console.log(res.data);
                if(res.data.acknowledged){
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Registration cancellision successfully!",
                    icon: "success"
                  });
                 }
                })
              
            }
          });
    }



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
            header: 'Camp_Fees',
            accessorKey: 'campInfo.camp_fees',
        },
        {
            header: 'Payment_Status',
            accessorKey: 'payment_status',
            cell: ({value, row}) => (
                <Typography>{row.original.payment_status == "paid" ? <Typography sx={{color: 'green', fontWeight: '600'}} variant="outlined">Paid</Typography> : <Typography sx={{color: 'red', fontWeight: '600'}} variant="contained">Unpaid</Typography>}</Typography>
            )
        },
        {
            header: 'Confirmation_Status',
            accessorKey: 'confirmation_stauts',
            cell: ({value, row}) => (
                <Box>{row.original.confirmation_stauts === "Confirmed" ? <Button sx={{background: 'green', fontWeight: '600'}} variant="contained">Confirmed</Button> : <Button disabled={row.original.payment_status === 'paid' ? false : true} onClick={() => handleConfirmation(row.original._id)} sx={{color: 'white', fontWeight: '600',}} variant="contained">Pending</Button>}</Box>
            )
        },
        {
            header: 'Actions',
            accessorKey: '_id',
            cell: ({ value, row }) => (
                <Box><Button disabled={row.original.payment_status === "paid" ? false : true} onClick={() => handleDeleteRegisteredCamps(row.original._id)} sx={{background: 'red'}} variant="contained">Cencel</Button></Box>
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
                <Typography fontSize={'24px'} fontWeight={"600"} textAlign={'center'} component={'h4'}>Manage Registered Camps</Typography>
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

export default ManageRegisteredPage;