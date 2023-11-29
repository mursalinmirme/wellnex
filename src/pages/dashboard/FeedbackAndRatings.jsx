import { Box, Button, FormControl, InputLabel, Modal, Rating, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as React from 'react';
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
const FeedbackAndRatings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(0);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [currentCamp, setCurrentCamp] = React.useState('');
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
                <Box><Button onClick={() => handleOpen(row.original._id)} variant="contained">Review</Button></Box>
            )
        },
    ]



    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // open modal 
    const handleOpen = async (reviewerCampId) => {
        setOpen(true);
        const getCampName = await axiosSecure.get(`/review-cam-name/${reviewerCampId}`);
        setCurrentCamp(getCampName?.data?.campInfo?.camp_name)
    };
    console.log('current camp is', currentCamp);
    // handle submit review
    const handleparticipnatReview = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        const reviewDate = new Date();
        const selecePic = e.target.selectImg.files[0];
        const reviewText = e.target.reviewText.value;
        if(value < 1){
            setErrorMsg('Please give a review star');
            return
        }
        console.log(selecePic);
        if(!selecePic){
            setErrorMsg("Please Shere the moment picture")
            return
        }
        if(!reviewText){
            e.target.reviewText.focus();
            setErrorMsg("Please shere your experience")
            return
        }

        const formData = new FormData();
        formData.append("image", selecePic);
        // upload profile pic
        const uploadImage = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_API}`,
          formData
        );
        const uploadImgResp = await uploadImage.data;

        const newReview = {
            reviewerName: user?.displayName,
            reviewerEmail: user?.email,
            reviewImage: uploadImgResp.data.display_url,
            reviewStar: value,
            feedbackText: reviewText,
            date: reviewDate,
            camp_name: currentCamp
        }
        console.log(newReview);
        const sendReview = await axiosSecure.post('/participant-review',newReview);
        if(sendReview.data.acknowledged){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Feedback Successfully",
                showConfirmButton: false,
                timer: 2000,
              });
            // toast.success('Feedback Successfully')
            setOpen(false);
            setValue(0);
        }
        

    }






    return (
        <Box>
          <Helmet>
            <title>Wellnex | Dashboard | Feedback</title>
          </Helmet>
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
        <Box textAlign={'center'}><Rating
        name="simple-controlled"
        value={value}
        sx={{fontSize: '30px'}}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /></Box>
          <input style={{marginTop: '20px',outline: 'none', width:'100%', padding:'12px',background: 'rgba(1,10,15,0.087605042016807)', border: 'none', borderRadius: '10px'}} type="file" name="selectImg" id="" />
          <textarea style={{resize: 'none', width: '100%', padding: '15px', borderRadius: '10px',fontSize: '16px',outline:'none', background: 'rgba(1,10,15,0.087605042016807)', height: '150px', border:'none', marginTop: '20px'}} placeholder="Write your experience..." name="reviewText"></textarea>
          <Button 
          type="submit"
          sx={{bgcolor: '#0077B6', mt: '15px', color: '#ffffff', fontWeight: '600', py: '14px','&:hover': {background: '#0096C7', color: '#ffffff'}}}
          fullWidth 
          variant="contained"
          >Send Experience</Button>
        </Box>
      </Box>
    </Modal>
        </Box>
    );
};

export default FeedbackAndRatings;