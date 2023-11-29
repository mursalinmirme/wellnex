import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
const UpdateQualification = ({eduOpen, handleCloseEdu, getSpecility, refetch}) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleUpdateMedicalspecility = async (e) => {
        e.preventDefault();
        const specility = e.target.specility.value;
        if(!specility){
            toast.error('Please add your Specility');
            return
        }
        const updateResult = await axiosSecure.put(`/update-medical-specility?email=${user?.email}`, {specility: specility})
        if(updateResult.data.acknowledged){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Medical Specility Updated Successfully",
                showConfirmButton: false,
                timer: 2000
              });
              handleCloseEdu(false)
              refetch();
        }
    }
    return (
      <div>
        <Modal
          open={eduOpen}
          onClose={handleCloseEdu}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography fontWeight={'600'} textAlign={'center'} id="modal-modal-title" variant="h6" component="h2">
              Update Medical Specility
            </Typography>
            <form onSubmit={handleUpdateMedicalspecility}>
                <textarea style={{width: '100%', padding: '10px', fontSize: '20px', outline: 'none', resize: 'none', background: 'rgba(1,10,15,0.0887605042016807)', border: 'none', height: '150px', marginTop: '30px', borderRadius: '10px'}} placeholder='Enter medical specility' defaultValue={getSpecility} name='specility'></textarea>
                <Button sx={{marginTop: '30px', padding: '12px 0'}} type='submit' variant='contained' fontWeight={'600'} fullWidth>Save</Button>
            </form>
          </Box>
        </Modal>
      </div>
    );
}

export default UpdateQualification;
