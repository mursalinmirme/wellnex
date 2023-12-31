import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { tr } from "date-fns/locale";
import * as React from 'react';
import Swal from "sweetalert2";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useState } from "react";
import ParticipantsViewingModal from "./dashboardComponent/ParticipantsViewingModal";
import ProfListView from "./dashboardComponent/ProfListView";
import UpcommingCampsUpdateModal from "./dashboardComponent/UpcommingCampsUpdateModal";
import { Tune } from "@mui/icons-material";
const ManageUpcommingCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // actions modal related
    const [open, setOpen] = React.useState(false);
    const [upCampId, setupCampId] = useState('');
    const [profCampId, setProfCampId] = useState('');
    const [savUpdateId, setSavUpdateId] = useState('');
    const handleOpen = (upCampId) => {
        setupCampId(upCampId)
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    // actions modal for professionals list
    const [openProf, setOpenProf] = React.useState(false);
    const handleOpenProfessional = (profId) => {
        setProfCampId(profId)
        setOpenProf(true);
    };
    const handleCloseProfList = () => setOpenProf(false);
    // actions modal for accept petitcipants list

    // actions modal for professionals list
    const [openUpdateUpCams, setopenUpdateUpCams] = React.useState(false);
    const handleUpCampsUpdate = (updateId) => {
        setopenUpdateUpCams(true);
        setSavUpdateId(updateId);
    };
    const handleCloseUpdateCams = () => setopenUpdateUpCams(false);


    const handleUpcommingPublish = () => {
        alert('published btn clicked')
    }

    const {data: data=[], refetch} = useQuery({
        queryKey: ['manageRegistrations'],
        queryFn: async () => {
           const result = await axiosSecure.get(`/get-upcomming-camps-under-organizer?email=${user?.email}`);
            return result.data;
        }
    })
    console.log(data);


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
                axiosSecure.delete(`/upcomming-camp-Delete/${deleteId}`)
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
            accessorKey: 'target_audience',
        },
        {
            header: 'Total Participant',
            accessorKey: 'total_participants',
        },
        {
            header: 'Interested Professionals',
            accessorKey: 'total_interests',
        },
        {
            header: 'Actions',
            accessorKey: '_id',
            cell: ({ value, row }) => (
                <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                    <Button onClick={() => handleOpen(row.original?._id)} sx={{background: '#023E8A'}} variant="contained" size="small">Review Participants</Button>
                    <Button onClick={() => handleOpenProfessional(row.original?._id)} sx={{background: '#023E8A'}} variant="contained" size="small">Review Professionals</Button>
                    <Button disabled={row.original.total_participants > 9 && row.original.total_interests > 2 ? false : true} onClick={handleUpcommingPublish} sx={{background: '#90E0EF', color: 'black', fontWeight: '600'}} variant="contained" size="small">Publish</Button>
                    <Button onClick={() => handleUpCampsUpdate(row.original?._id)} sx={{background: '#90E0EF', color: 'black', fontWeight: '600'}} variant="contained" size="small">Update</Button>
                    <Button onClick={() => handleDeleteRegisteredCamps(row.original?._id)} sx={{background: 'red'}} variant="contained" size="small">Delete</Button>
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
        <Box sx={{width: '100%', overflowX: {xs: 'scroll', lg: 'hidden'}}}>
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

            {open &&<ParticipantsViewingModal refetch={refetch} upCampId={upCampId} open={open} handleClose={handleClose}></ParticipantsViewingModal>}

           {openProf && <ProfListView profCampId={profCampId} openProf={openProf} handleCloseProfList={handleCloseProfList} refetch={refetch}></ProfListView>}


           {openUpdateUpCams && <UpcommingCampsUpdateModal savUpdateId={savUpdateId} openUpdateUpCams={openUpdateUpCams} handleCloseUpdateCams={handleCloseUpdateCams} refetch={refetch}></UpcommingCampsUpdateModal>}





        </Box>
    );
};

export default ManageUpcommingCamps;