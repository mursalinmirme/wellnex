import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import '../AddaCampPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflowY: 'auto',
  p: 4,
};
const UpdateCampsData = ({updateId, open, handleClose, refetch}) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [errorMsg, setErrorMsg] = React.useState('');
    const [startDate, setStartDate] = React.useState(
        // setHours(setMinutes(new Date(), 30), 16),
      );
  
  const {data: camp_details=[]} = useQuery({
    queryKey: ['getUpdateCampDetails'],
    enabled: open,
    queryFn: async () => {
        const result = await axiosSecure.get(`/organizers-camps/${updateId}`);
        const getResult = await result.data;
        setStartDate(new Date(getResult?.scheduled_date_time))
        return getResult;
    }
  })
//   console.log('select update id details', camp_details);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('')
    const data = e.target;
    const camp_name = data.camp_name.value;
    const camp_fees = data.camp_fees.value;
    const scheduled_date_time = startDate;
    const venue_location = data.venue_location.value;
    const specialized_services = data.specilize_services.value;
    const healthcare_professionals = data.health_professionals.value;
    const target_audience = data.target_audience.value;
    const description = data.description.value;
    const camp_image = data.camp_image.files[0];
    const camp_image_da = data.camp_image.files[0]?.name;
    let image = camp_details?.image;

    if(camp_image_da){
        const formData = new FormData();
        formData.append("image", camp_image);
        const uploadImage = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_API}`,
          formData
        );
        const uploadImgResp = await uploadImage.data;
    
        const image = await uploadImgResp.data.display_url;

        const updateCamp = {camp_name, camp_fees, image, scheduled_date_time, venue_location, specialized_services:[specialized_services], healthcare_professionals:[healthcare_professionals], target_audience, description, campOwnerEmail: user?.email, campOwnerName: user?.displayName};
        console.log(updateCamp, camp_image);

       await axiosSecure.put(`/organizers-camps/${camp_details?._id}`, updateCamp)
        .then(res => {
            if(res.data.acknowledged){
               refetch();
               return toast.success("Camp update successfully.");
            }
        })

    } else{
        const updateCamp = {camp_name, camp_fees, image, scheduled_date_time, venue_location, specialized_services:[specialized_services], healthcare_professionals:[healthcare_professionals], target_audience, description, campOwnerEmail: camp_details?.campOwnerEmail, campOwnerName: camp_details?.campOwnerName};

        await axiosSecure.put(`/organizers-camps/${camp_details?._id}`, updateCamp)
         .then(res => {
             if(res.data.acknowledged){
                 refetch();
                return toast.success("Camp updated successfully.")
             }
         })
    }


  }

    return (
        <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
        <Box>
        <Typography textAlign={'center'} fontWeight={'600'} fontSize={'28px'} mt={'10px'}>Update Camp</Typography>
        <label htmlFor=""></label>
        <form style={{width: '90%', margin: '0 auto', marginTop: '0px'}} onSubmit={handleSubmit}>

      <Box display={'flex'} gap={'20px'}>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Camp name:</label>
      <input defaultValue={camp_details?.camp_name} style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" name='camp_name' />
      </Box>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Camp Fees:</label>
      <input defaultValue={camp_details?.camp_fees} style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" name='camp_fees' />
      </Box>
      </Box>

      <Box display={'flex'} gap={'20px'}>
      
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
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Camp Image</label>
      <input type="file" style={{display: 'block', width: '100%', padding: '12px', fontSize: '16px', outline: 'none' ,marginTop: '5px', border: '0.1px solid rgb(118, 118, 118)'}} name='camp_image' />
      </Box>
      </Box>

      <Box gap={'20px'} display={'flex'}>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Venue Location:</label>
      <input defaultValue={camp_details?.venue_location} style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" name='venue_location' />
      </Box>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Specialized Services Provided:</label>
      <input defaultValue={camp_details?.specialized_services} style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" name='specilize_services' />
      </Box>

      </Box>

      <Box display={'flex'} gap={'20px'}>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Healthcare Professionals:</label>
      <input defaultValue={camp_details?.healthcare_professionals} style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" name='health_professionals' />
      </Box>
      <Box flex={1} mt={'20px'}>
      <label style={{fontWeight: '600'}}>Target Audience:</label>
      <input defaultValue={camp_details?.target_audience} style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter your camp name" name='target_audience' />
      </Box>
      </Box>



      <Box mt={'20px'}>
      <label style={{fontWeight: '600'}}>Description:</label>
      <textarea style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px', resize: 'none', height: '140px', fontFamily: "'Libre Franklin', sans-serif"}} defaultValue={camp_details?.description} placeholder="Enter your camp description" name='description'>
      </textarea>

      </Box>


      <input style={{width: '100%', padding: '15px 0', marginTop: '30px', fontSize: '18px', background: '#0077B6', color: '#ffffff', outline: 'none', border:'none'}} type="submit" value={'Submit Camp'} />

    </form>
        </Box>
    </Paper>
      </Modal>
        </div>
    );
};

export default UpdateCampsData;