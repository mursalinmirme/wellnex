import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { tr } from "date-fns/locale";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import moment from "moment";
const RegisteredCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: data=[], refetch} = useQuery({
        queryKey: ['manageRegistrationsParticipant'],
        queryFn: async () => {
           const result = await axiosSecure.get(`/participant-registered-camps?email=${user?.email}`);
            return result.data;
        }
    })
    console.log(data);


    const handleDeleteRegisration = (deleteId) => {
        console.log('delete id is', deleteId);
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete the registered camp!",
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
                <Box>{row.original.payment_status == "paid" ? <Button sx={{color: 'green', fontWeight: '600'}} variant="outlined">Paid</Button> : <Link to={`/dashboard/payment-page/${row.original._id}`}><Button sx={{color: 'white', fontWeight: '600'}} variant="contained">Pay</Button></Link>}</Box>
            )
        },
        {
            header: 'Confirmation_Status',
            accessorKey: 'confirmation_stauts',
            cell: ({value, row}) => (
                <Box>{row.original.confirmation_stauts === "Confirmed" ? <Button sx={{color: 'green',fontWeight: '600'}} variant="outlined">Confirmed</Button> : <Button sx={{color: 'red', fontWeight: '600',}} variant="outlined">Pending</Button>}</Box>
            )
        },
        {
            header: 'Actions',
            accessorKey: '_id',
            cell: ({ value, row }) => (
                <Box><Button disabled={row.original.payment_status === "paid" ? true : false} onClick={() => handleDeleteRegisration(row.original._id)} sx={{background: 'red'}} variant="contained">Cencel</Button></Box>
            )
        },
    ]



    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <Box>
            <Box py={'20px'}>
                <Typography fontSize={'24px'} fontWeight={"600"} textAlign={'center'} component={'h4'}>Registered Camps:</Typography>
            </Box>
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
        </Box>
    );
};

export default RegisteredCamps;