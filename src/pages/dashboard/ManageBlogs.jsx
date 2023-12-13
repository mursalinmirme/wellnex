import { Box, Typography } from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateBlogModal from "./dashboardComponent/UpdateBlogModal";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {xs: '90%', lg: 900},
    height: {xs: '100vh', lg: 'auto'},
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  
  };
const ManageBlogs = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = React.useState(false);
    const [updateId, setUpdateId] = React.useState('');
    const handleOpen = (updateId) => {
      setUpdateId('')
      setUpdateId(updateId);
      setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const { data=[], refetch } = useQuery({
        queryKey: ["wellnesBolgCollect"],
        queryFn: async () => {
          const fetchBlogs = await axiosPublic.get("/wellness-blogs");
          const result = await fetchBlogs.data;
          return result;
        },
      });

    const columns = [
        {
            header: 'Sr No.',
            accessorKey: '',
            cell: ({value, row}) => (
                <Typography>{row.index+1}</Typography>
            )
        },
        {
            header: 'Blog Title',
            accessorKey: 'title',
           
        },
        {
            header: 'Blog Description',
            accessorKey: 'content',
            cell: ({value, row}) => (
                <Typography>{row.original?.content.length > 30 ? row.original?.content.slice(0, 30)+'...': row.original?.content}</Typography>
            )

        },
        {
            header: 'Author',
            accessorKey: 'author',
        },
        {
            header: 'Action',
            accessorKey: '_id',
            cell: ({value, row}) => (
                <Box sx={{display: 'flex', gap: '15px'}}><Button onClick={() => handleOpen(row.original._id)} variant="contained">Update</Button><Button sx={{background: 'red'}} onClick={() => handleDeleteBlog(row.original._id)} variant="contained">Delete</Button></Box>
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
    const handleDeleteBlog = (deleteId) => {
        console.log(deleteId);
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete the blog",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
          }).then((result) => {
            if (result.isConfirmed) {
              axiosPublic.delete(`/delete-blog/${deleteId}`)
              .then(res => {
                if(res.data.acknowledged){
                    Swal.fire({
                        title: "Blog Delete Successfully",
                        text: "Your blog has been deleted successfully!",
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
    const handleUpdateBlog = () => {
        alert('hi')
    }
    return (
        <Box>
            <Box>
                <Typography sx={{textAlign: 'center', fontSize: '28px', mt:'20px', fontWeight: 'bold'}}>Manage Blogs</Typography>
            </Box>
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
            {/* modal */}
            {
                updateId && <UpdateBlogModal open={open} setOpen={setOpen} updateId={updateId} handleClose={handleClose} setUpdateId={setUpdateId} refetch={refetch}></UpdateBlogModal>
            }
        </Box>
    );
};

export default ManageBlogs;