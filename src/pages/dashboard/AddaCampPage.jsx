import { Box, Button, Paper, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import './AddaCampPage.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
const AddaCampPage = () => {
    const [startDate, setStartDate] = useState(
        // setHours(setMinutes(new Date(), 30), 16),
      );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    console.log(data);
  }



  return (

    <Paper sx={{padding: '20px', }}>
        <Box>
        <Typography textAlign={'center'} fontWeight={'600'} fontSize={'28px'} mt={'30px'}>Add a New Camp</Typography>
        <label htmlFor=""></label>
        <form style={{width: '80%', margin: '0 auto', marginTop: '30px'}} onSubmit={handleSubmit(onSubmit)}>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Camp name:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("camp_name", { required: true })} />
      {errors.camp_name && <span style={{color: 'red'}}>Enter your camp name</span>}
      </Box>

      <Box display={'flex'} gap={'20px'}>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Camp Fees:</label>
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
      </Box>
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Venue Location:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("date_time", { required: true })} />
      {errors.date_time && <span style={{color: 'red'}}>Enter sheduled date and time</span>}
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Specialized Services Provided:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("camp_name", { required: true })} />
      {errors.camp_name && <span style={{color: 'red'}}>Enter sheduled date and time</span>}
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Healthcare Professionals:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("camp_name", { required: true })} />
      {errors.camp_name && <span style={{color: 'red'}}>Enter sheduled date and time</span>}
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Target Audience:</label>
      <input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" {...register("camp_name", { required: true })} />
      {errors.camp_name && <span style={{color: 'red'}}>Enter sheduled date and time</span>}
      </Box>

      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Description:</label>
      <textarea style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px', resize: 'none', height: '200px'}} placeholder="Enter your camp description" {...register("description", { required: true })}>
      {errors.description && <span style={{color: 'red'}}>Enter sheduled date and time</span>}

      </textarea>
      

      </Box>


      <input style={{width: '100%', padding: '15px 0', marginTop: '30px', fontSize: '18px', background: '#0077B6', color: '#ffffff', outline: 'none', border:'none'}} type="submit" value={'Submit Camp'} />

    </form>
        </Box>
    </Paper>
  )
}

export default AddaCampPage;