import { Box, Button, Paper, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import './AddaCampPage.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CircularProgress from '@mui/material/CircularProgress';
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const AddUpcommingCamps = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [errorMsg, setErrorMsg] = useState('');
    const [uploadLoading, setUploadloading] = useState(false);
    const [startDate, setStartDate] = useState(
        // setHours(setMinutes(new Date(), 30), 16),
      );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()


  const onSubmit = async (data) => {
    setErrorMsg('');
    setUploadloading(true);
    const currentTime = new Date();
    const camp_name = data.camp_name;
    const camp_fees = data.camp_fees;
    const scheduled_date_time = startDate;
    const venue_location = data.venue_location;
    const specialized_services = data.specilize_services;
    const healthcare_professionals = data.health_professionals;
    const target_audience = data.target_audience;
    const description = data.description;
    const camp_image = data.camp_image[0];

    if(!startDate){
        setUploadloading(false);
        setErrorMsg('Select shedule time');
        return
    }

    const formData = new FormData();
    formData.append("image", camp_image);
    const uploadImage = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_API}`,
      formData
    );
    const uploadImgResp = await uploadImage.data;


    const uploadImagellink = uploadImgResp.data.display_url;

    const newCamp = {camp_name, camp_fees, scheduled_date_time, venue_location, specialized_services:[specialized_services], healthcare_professionals:[healthcare_professionals], target_audience, description, image:uploadImagellink, campOwnerEmail: user?.email, campOwnerName: user?.displayName, create_time:currentTime, total_participants: 0, total_interests: 0};

    if(uploadImgResp.success){
        axiosSecure.post('/add-a-upcomming-camp', newCamp)
        .then(res => {
            if(res.data.acknowledged){
                reset();
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Your upcomming camp added successfully!",
                  showConfirmButton: false,
                  timer: 2000
                });
                setUploadloading(false);
            }
        })
        .catch(error => {
           toast.error(error.message)
    })
    }

  }

  return (

    <Paper sx={{padding: '20px', marginBottom: '30px'}}>
      <Helmet>
        <title>Wellnex | Dashboard | Add Camps</title>
      </Helmet>
        <Box>
        <Typography textAlign={'center'} fontWeight={'600'} fontSize={'28px'} mt={'30px'}>Add a Upcomming New Camp</Typography>
        <label htmlFor=""></label>
        <form style={{width: '80%', margin: '0 auto', marginTop: '30px'}} onSubmit={handleSubmit(onSubmit)}>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Camp name:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("camp_name", { required: true })} />
      {errors.camp_name && <span style={{color: 'red'}}>Enter your camp name</span>}
      </Box>

      <Box display={'flex'} gap={'20px'}>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Camp Fees: $</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("camp_fees", { required: true })} />
      {errors.camp_fees && <span style={{color: 'red'}}>Enter your camp fees</span>}
      </Box>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Scheduled Date and Time:</label>
      <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      excludeTimes={[
        setHours(setMinutes(new Date(), 0), 17),
        setHours(setMinutes(new Date(), 30), 18),
        setHours(setMinutes(new Date(), 30), 19),
        setHours(setMinutes(new Date(), 30), 17),
      ]}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
    {
        errorMsg && <span style={{color: 'red'}}>{errorMsg}</span>
    }
      </Box>
      </Box>

      <Box gap={'20px'} display={'flex'}>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Camp Image</label>
      <input type="file" style={{display: 'block', width: '100%', padding: '12px', fontSize: '16px', outline: 'none' ,marginTop: '5px', border: '0.1px solid rgb(118, 118, 118)'}} placeholder="Enter your camp name" {...register("camp_image", { required: true })} />
      {errors.camp_image && <span style={{color: 'red'}}>Select camp Image</span>}
      </Box>

      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Venue Location:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("venue_location", { required: true })} />
      {errors.venue_location && <span style={{color: 'red'}}>Enter venue location</span>}
      </Box>
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Specialized Services Provided:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("specilize_services", { required: true })} />
      {errors.specilize_services && <span style={{color: 'red'}}>Enter sheduled date and time</span>}
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Healthcare Professionals:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("health_professionals", { required: true })} />
      {errors.health_professionals && <span style={{color: 'red'}}>Enter Healthcare Professionals</span>}
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Target Audience:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("target_audience", { required: true })} />
      {errors.target_audience && <span style={{color: 'red'}}>Enter target audience</span>}
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Description:</label>
      <textarea style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px', resize: 'none', height: '200px'}} placeholder="Enter your camp description" {...register("description", { required: true })}>
      </textarea>
      {errors.description && <span style={{color: 'red'}}>Enter your camp description</span>}

      </Box>

       <Button fullWidth variant="contained" sx={{bgcolor: '#0077B6', marginTop: '40px', color: '#ffffff', fontSize: '18px', py: '10px','&:hover': {background: '#0096C7', color: '#ffffff'}}} type="submit">
          {uploadLoading ? <CircularProgress size={'32px'} style={{color: 'white'}}></CircularProgress> : 'Submit Camp'}
        </Button>

    </form>
        </Box>
    </Paper>
  )
}

export default AddUpcommingCamps;