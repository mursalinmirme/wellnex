import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import * as React from 'react';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
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
const currentTime = new Date();
const ProfessionalUpCommingCampInterest = ({ openProf, handleCloseProfessionalRegOpen, campId, camp_name, venue_location, camp_fees, camp_owner, scheduled_date_time, target_audience, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [errorMsg, setErrorMsg] = React.useState('');
    const [uploadLoading, setUploadLoading] = React.useState(false);

  const handleInterestSubmission = (e) => {
    e.preventDefault();
    setUploadLoading(true);
    setErrorMsg('');
    const form = e.target;
    const name = form.name.value;
    const specialization = form.specialization.value;
    const contactInformation = form.contactInformation.value;
    const professionalEmail = user?.email;
    const professionalImage = user?.photoURL;
    const camp_id = campId;

  const submitInterest = {name, specialization, contactInformation, professionalEmail, professionalImage, reg_time:currentTime, status:'Pending', campInfo:{camp_id, camp_name, venue_location, target_audience, camp_fees, scheduled_date_time, camp_owner } }


  if(!name){
    setUploadLoading(false);
    setErrorMsg('Enter your name!');
    return
  }
  if(!specialization){
    setUploadLoading(false);
    setErrorMsg('Enter your Specialization!');
    return
  }
  if(!contactInformation){
    setUploadLoading(false);
    setErrorMsg('Enter your contact information!');
    return
  }
  

  axiosSecure.post('/professionall-interest-submit-upcomming', submitInterest)
  .then(res => {
    console.log(res.data);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your Interest Submittions Successfully!",
      showConfirmButton: false,
      timer: 2000
    });
    handleCloseProfessionalRegOpen(false);
    refetch();
    form.reset();
    setUploadLoading(false);
  })

  }


  return (
    <Modal
      open={openProf}
      onClose={handleCloseProfessionalRegOpen}
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
          Professional Healthcare Interest Submission
        </Typography>
        {
          errorMsg && <Typography color={'red'} textAlign={'center'} mt={'20px'}>{errorMsg}</Typography>
        }
        <Box onSubmit={handleInterestSubmission} mt={"30px"} component={"form"}>
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Name"
            name="name"
            variant="outlined"
          />
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Specialization"
            name="specialization"
            variant="outlined"
          />

         <TextField
            sx={{my: '13px'}}
            fullWidth
            id="emergengyContact"
            label="Contact Information"
            name="contactInformation"
            variant="outlined"
          />
          <Button fullWidth variant="contained" sx={{bgcolor: '#0077B6', marginTop: '40px', color: '#ffffff', fontSize: '18px', py: '10px','&:hover': {background: '#0096C7', color: '#ffffff'}}} type="submit">
          {uploadLoading ? <CircularProgress size={'32px'} style={{color: 'white'}}></CircularProgress> : 'Submit Interest'}
        </Button>
        </Box>
        </Box>
    </Modal>
  );
};

export default ProfessionalUpCommingCampInterest;

