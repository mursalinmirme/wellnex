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
const UpcommingRegistrationModal = ({ open, handleClose, fees, campId, camp_name, venue_location, camp_fees, camp_owner, scheduled_date_time, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [gender, setgender] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [uploadLoading, setUploadLoading] = React.useState(false);
    const handleChange = (event) => {
      setgender(event.target.value);
    };

  const handleJoinCamp = (e) => {
    e.preventDefault();
    setUploadLoading(true);
    setErrorMsg('');
    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const phone = form.phone.value;
    const participantEmail = user?.email;
    const participantImage = user?.photoURL;
    const getGender = gender;
    const address = form.address.value;
    const fees = form.fees.value;
    const healthCondition = form.healthCondition.value;
    const emergencyContact = form.emergencyContact.value;
    const camp_id = campId;

  const joinInfo = {name, age, phone, participantEmail, participantImage, getGender, address, fees, healthCondition, emergencyContact, reg_time:currentTime, payment_status: '', confirmation_stauts: '', campInfo:{camp_id, camp_name, venue_location, camp_fees, scheduled_date_time, camp_owner } }


  if(!name){
    setUploadLoading(false);
    setErrorMsg('Enter your name!');
    return
  }
  if(!age){
    setUploadLoading(false);
    setErrorMsg('Enter your age!');
    return
  }
  if(!phone){
    setUploadLoading(false);
    setErrorMsg('Enter your phone number!');
    return
  }
  if(!gender){
    setUploadLoading(false);
    setErrorMsg('Select your gender!');
    return
  }
  if(!address){
    setUploadLoading(false);
    setErrorMsg('Enter your address!');
    return
  }
  if(!healthCondition){
    setUploadLoading(false);
    setErrorMsg('Write your health condition!');
    return
  }
  if(!emergencyContact){
    setUploadLoading(false);
    setErrorMsg('Write your emergency contact!');
    return
  }

  axiosSecure.post('/join-upcomming-camp-reg', joinInfo)
  .then(res => {
    console.log(res.data);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Join upcomming camp registrantion successfully!",
      showConfirmButton: false,
      timer: 2000
    });
    handleClose(false);
    refetch();
    form.reset();
    setUploadLoading(false);
  })

  }


  return (
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
          Registration Upcomming Camp
        </Typography>
        {
          errorMsg && <Typography color={'red'} textAlign={'center'} mt={'20px'}>{errorMsg}</Typography>
        }
        <Box onSubmit={handleJoinCamp} mt={"30px"} component={"form"}>
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
          <FormControl sx={{my: '13px'}} fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              name="gender"
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </FormControl>
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
          <TextField
          sx={{my: '13px'}}
          fullWidth
          id="outlined-read-only-input"
          label="Fees"
          name="fees"
          defaultValue={`$${fees}`}
          InputProps={{
            readOnly: true,
          }}
        />
         </Box>
         <Box>
         <TextField
            sx={{my: '13px'}}
            fullWidth
            id="healthInfo"
            label="Health Information"
            name="healthCondition"
            variant="outlined"
          />
         <TextField
            sx={{my: '13px'}}
            fullWidth
            id="emergengyContact"
            label="Emergency Contact"
            name="emergencyContact"
            variant="outlined"
          />
         </Box>
          <Button fullWidth variant="contained" sx={{bgcolor: '#0077B6', marginTop: '40px', color: '#ffffff', fontSize: '18px', py: '10px','&:hover': {background: '#0096C7', color: '#ffffff'}}} type="submit">
          {uploadLoading ? <CircularProgress size={'32px'} style={{color: 'white'}}></CircularProgress> : 'Registration'}
        </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpcommingRegistrationModal;



