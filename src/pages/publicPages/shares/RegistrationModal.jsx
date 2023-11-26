import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import * as React from 'react';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
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
const RegistrationModal = ({ open, handleClose, fees, campId }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [gender, setgender] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const handleChange = (event) => {
      setgender(event.target.value);
    };

  const handleJoinCamp = (e) => {
    e.preventDefault();
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

  const joinInfo = {name, age, phone, participantEmail, participantImage, getGender, address, fees, healthCondition, emergencyContact, camp_id, }


  if(!name){
    setErrorMsg('Enter your name!');
    return
  }
  if(!age){
    setErrorMsg('Enter your age!');
    return
  }
  if(!phone){
    setErrorMsg('Enter your phone number!');
    return
  }
  if(!gender){
    setErrorMsg('Select your gender!');
    return
  }
  if(!address){
    setErrorMsg('Enter your address!');
    return
  }
  if(!healthCondition){
    setErrorMsg('Write your health condition!');
    return
  }
  if(!emergencyContact){
    setErrorMsg('Write your emergency contact!');
    return
  }

  axiosSecure.post('/join-camp-reg', joinInfo)
  .then(res => {
    console.log(res.data);
    toast.success("Join camp registrantion request successfully!");
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
          Join camp Registration
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
          defaultValue={fees}
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
          <Button 
          type="submit"
          sx={{bgcolor: '#0077B6', mt: '15px', color: '#ffffff', fontWeight: '600', py: '14px','&:hover': {background: '#0096C7', color: '#ffffff'}}}
          fullWidth 
          variant="contained"
          >Registration</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegistrationModal;
