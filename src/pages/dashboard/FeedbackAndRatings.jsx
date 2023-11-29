import { Box, Button, FormControl, InputLabel, Modal, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as React from 'react';
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
const FeedbackAndRatings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [errorMsg, setErrorMsg] = React.useState('');
    const {data: data=[], refetch} = useQuery({
        queryKey: ['participantReviewAndFeedback'],
        queryFn: async () => {
           const result = await axiosSecure.get(`/participants-reviewable-camps?email=${user?.email}`);
            return result.data;
        }
    })
    console.log('get ratting and feedback', data);


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
                <Box>{row.original.payment_status === "paid" ? <Button variant="outlined">Paid</Button> : <Button variant="outlined">Unpaid</Button>}</Box>
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
                <Box><Button onClick={handleOpen} variant="contained">Review</Button></Box>
            )
        },
    ]



    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

  
    // handle submit review
    const handleparticipnatReview = (e) => {
        e.preventDefault();
        alert('hi')
    }






    return (
        <Box>
            <Box py={'20px'}>
                <Typography fontSize={'24px'} fontWeight={"600"} textAlign={'center'} component={'h4'}>Feedback & Ratings:</Typography>
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
            <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          textAlign={"center"}
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ fontWeight: "700" }}
        >
          Give a Review and Be a Part of the Camp
        </Typography>
        {
          errorMsg && <Typography color={'red'} textAlign={'center'} mt={'20px'}>{errorMsg}</Typography>
        }
        <Box onSubmit={handleparticipnatReview} mt={"30px"} component={"form"}>
          <Box display={'flex'} gap={'20px'}>
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Your Name"
            name="name"
            variant="outlined"
          />
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Age"
            name="age"
            variant="outlined"
          />
          </Box>
          <Box display={'flex'} gap={'20px'}>
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Phone"
            name="phone"
            variant="outlined"
          />
          </Box>
         <Box>
         <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Address"
            name="address"
            variant="outlined"
          />
         </Box>
         <Box>
         <TextField
            sx={{my: '13px'}}
            fullWidth
            id="healthInfo"
            label="bio"
            name="bio"
            variant="outlined"
          />
         <TextField
            sx={{my: '13px'}}
            fullWidth
            id="socialLink"
            label="Social Network Link"
            name="socialLink"
            variant="outlined"
          />
         </Box>
          <Button 
          type="submit"
          sx={{bgcolor: '#0077B6', mt: '15px', color: '#ffffff', fontWeight: '600', py: '14px','&:hover': {background: '#0096C7', color: '#ffffff'}}}
          fullWidth 
          variant="contained"
          >Save Changes</Button>
        </Box>
      </Box>
    </Modal>
        </Box>
    );
};

export default FeedbackAndRatings;