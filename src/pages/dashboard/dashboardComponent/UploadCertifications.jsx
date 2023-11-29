import { Box, Button, Modal, Typography, radioClasses } from '@mui/material';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';
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
const UploadCertifications = ({cerOpen, handleCloseCer, refetch}) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [uploadLoading, setUploadloading] = useState(false);
    const handleUploadCertificate = async (e) => {
        e.preventDefault();
        setUploadloading(true)
        const cirImg = e.target.certificateImg.files[0];
        console.log(cirImg);
        if(cirImg?.name === undefined){
            toast.error('Please, select your certificate');
            setUploadloading(false)
            return
        }
        const formData = new FormData();
        formData.append("image", cirImg);
        // upload profile pic
        const uploadImage = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_API}`,
          formData
        );

        const cirtificateImage = await uploadImage.data.data.display_url;

        const uploadResult = await axiosSecure.put(`/upload-certificate?email=${user?.email}`, {certificateImg: cirtificateImage})
        console.log('upload certification status');
        if(uploadResult.data.acknowledged){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Certification Uploaded Successfully",
                showConfirmButton: false,
                timer: 2000
              });
              handleCloseCer(false)
              refetch();
              setUploadloading(false)
        }
    }
    return (
      <div>
        <Modal
          open={cerOpen}
          onClose={handleCloseCer}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography fontWeight={'600'} textAlign={'center'} id="modal-modal-title" variant="h6" component="h2">
              Upload Certificate
            </Typography>
            <form onSubmit={handleUploadCertificate}>
                <input style={{background: 'rgba(1,10,15,0.0887605042016807', width: '100%', padding: '60px 30px', fontSize: '18px', marginTop: '50px', borderRadius: '10px'}} type="file" name="certificateImg" id="certificateImg" />
                <Button variant="contained" style={{width: '100%', padding: '8px', fontSize: '18px', color: 'white', fontWeight: '600', marginTop:'30px'}} type="submit">
                {uploadLoading ? <CircularProgress size={'32px'} style={{color: 'white'}}></CircularProgress> : 'Upload'}
                </Button>
            </form>
          </Box>
        </Modal>
      </div>
    );
}

export default UploadCertifications;


