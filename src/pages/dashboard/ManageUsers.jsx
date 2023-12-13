import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {user, deleteUser} = useAuth();
    const {data=[], refetch} = useQuery({
        queryKey: ['manageallusers'],
        queryFn: async () => {
            const fetchAllUsers = await axiosSecure.get(`/all-users?email=${user?.email}`);
            const result = await fetchAllUsers.data;
            return result;

        }
    })
    const columns = [
        {
            header: 'Sr No.',
            accessorKey: '',
            cell: ({value, row}) => (
                <Typography>{row.index+1}</Typography>
            )
        },
        {
            header: 'Name',
            accessorKey: 'name',
           
        },
        {
            header: 'Email',
            accessorKey: 'email',

        },
        {
            header: 'Role',
            accessorKey: 'role',
        },
        {
            header: 'Action',
            accessorKey: '_id',
            cell: ({value, row}) => (
                <Box sx={{display: 'flex', gap: '15px'}}><Button onClick={() => handleMakeAdmin(row.original._id)} disabled={row.original.role === 'admin' ? true : false} variant="contained">Make Admin</Button></Box>
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
    console.log('total users are', data);

    // manage users
    const handleMakeAdmin = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You to make this user admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
          }).then((result) => {
            if (result.isConfirmed) {

              axiosSecure.put('/make-admin', {id: userId})
              .then(res => {
                if(res.data.acknowledged){
                    Swal.fire({
                        title: "Updated Successfully",
                        text: "Your admin request has been successfully",
                        icon: "success"
                      });
                      refetch()
                }
                
              })
              .catch(err => {
                console.log(err);
              })

            }
          });
    }

    return (
        <Box sx={{mt: '10px', width: '100%'}}>
            <Typography sx={{textAlign: 'center', fontSize: '28px', mt: '20px', fontWeight: '700'}}>Manage All Users</Typography>
            <Box sx={{marginTop: '20px'}}>
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
        </Box>
    );
};

export default ManageUsers;