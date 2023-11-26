import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import * as React from 'react';
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
const RegistrationModal = ({ open, handleClose, fees }) => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

  const handleJoinCamp = () => {
alert('hi')
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
        <Box onSubmit={handleJoinCamp} mt={"30px"} component={"form"}>
          <Box display={'flex'} gap={'20px'}>
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Your Name"
            variant="outlined"
          />
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Age"
            variant="outlined"
          />
          </Box>
          <Box display={'flex'} gap={'20px'}>
          <TextField
            sx={{my: '13px'}}
            fullWidth
            id="outlined-basic"
            label="Phone"
            variant="outlined"
          />
          <FormControl sx={{my: '13px'}} fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              name="address"
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
