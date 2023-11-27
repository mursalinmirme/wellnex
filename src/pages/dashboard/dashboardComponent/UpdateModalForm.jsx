import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import * as React from 'react';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
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
const UpdateModalForm = ({open, handleClose, age, phone, gender, address, bio, link, role, refetch}) => {
    console.log('The user gender is ', gender);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [onChangegender, setgender] = React.useState('');
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
    const gender = form.gender.value;
    const address = form.address.value;
    const bio = form.bio.value;
    const link = form.socialLink.value;

    const updateInfo = {name, age, phone, email:user?.email, role, image:user?.photoURL, gender, address, bio, link }

    console.log('update version', updateInfo);

  if(!name){
    setErrorMsg(`Name can't be empty!`);
    return
  }

  axiosSecure.put(`/organizer/${user?.email}`, updateInfo)
  .then(res => {
    if(res.data.acknowledged){
        toast.success("Your Profile updated successfully");
        refetch();
    }

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
          Update Organizer Profile
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
            defaultValue={user?.displayName}
            variant="outlined"
          />
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Age"
            name="age"
            defaultValue={age}
            variant="outlined"
          />
          </Box>
          <Box display={'flex'} gap={'20px'}>
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Phone"
            defaultValue={phone}
            name="phone"
            variant="outlined"
          />
          <FormControl sx={{my: '13px'}} fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender ? gender : onChangegender}
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
            defaultValue={address}
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
            defaultValue={bio}
            variant="outlined"
          />
         <TextField
            sx={{my: '13px'}}
            fullWidth
            id="socialLink"
            label="Social Network Link"
            name="socialLink"
            defaultValue={link}
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
  );
};

export default UpdateModalForm;