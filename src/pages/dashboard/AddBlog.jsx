import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddBlog = () => {
    const [uploadLoading, setUploadLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
      
  const onSubmit = async (data) => {
    setUploadLoading(true)
    const currentTime = new Date();
    const title = data.blog_title;
    const author = data.author;
    const content = data.description;
    const camp_image = data.camp_image[0];


    const formData = new FormData();
    formData.append("image", camp_image);
    const uploadImage = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_API}`,
      formData
    );
    const uploadImgResp = await uploadImage.data;


    const uploadImagellink = uploadImgResp.data.display_url;

    const nowBlog = {title, author, content, image:uploadImagellink, date:currentTime};
    console.log('new blog is', nowBlog);
     
    if(uploadImgResp.success){
        axiosSecure.post('/add-a-blog', nowBlog)
        .then(res => {
            if(res.data.acknowledged){
                reset();
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Your blog added successfully!",
                  showConfirmButton: false,
                  timer: 2000
                });
                setUploadLoading(false);
            }
        })
        .catch(error => {
          toast.error(error.message)
    })
    }

  }

    return (
        <Box sx={{mb: '40px'}}>
            <Box sx={{mt: '30px',  fontSize: '28px', textAlign: 'center', fontWeight: '700'}}>Add A Blog</Box>
            <Box>
            <form style={{width: '80%', margin: '0 auto', marginTop: '30px'}} onSubmit={handleSubmit(onSubmit)}>

<Box mt={'20px'}>
<label style={{fontWeight: '600'}}>Blog Title:</label>
<input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter blog title" {...register("blog_title", { required: true })} />
{errors.blog_title && <span style={{color: 'red'}}>Enter blog Title</span>}
</Box>

<Box mt={'30px'}>
<label style={{fontWeight: '600'}}>Author Name:</label>
<input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter author name" {...register("author", { required: true })} />
{errors.author && <span style={{color: 'red'}}>Enter author name</span>}
</Box>

<Box flex={1} mt={'30px'}>
<label style={{fontWeight: '600'}}>Blog Image</label>
<input type="file" style={{display: 'block', width: '100%', padding: '12px', fontSize: '16px', outline: 'none' ,marginTop: '5px', border: '0.1px solid rgb(118, 118, 118)'}} {...register("camp_image", { required: true })} />
{errors.camp_image && <span style={{color: 'red'}}>Select blog image</span>}
</Box>




<Box mt={'30px'}>
<label style={{fontWeight: '600'}}>Blog Description:</label>
<textarea style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px', resize: 'none', height: '200px'}} placeholder="Enter your blog description" {...register("description", { required: true })}>
</textarea>
{errors.description && <span style={{color: 'red'}}>Enter blog description</span>}

</Box>


<Button fullWidth variant="contained" sx={{bgcolor: '#0077B6', marginTop: '40px', color: '#ffffff', fontSize: '18px', py: '10px','&:hover': {background: '#0096C7', color: '#ffffff'}}} type="submit">
    {uploadLoading ? <CircularProgress size={'32px'} style={{color: 'white'}}></CircularProgress> : 'Submit Camp'}
  </Button>

            </form>
            </Box>
        </Box>
    );
};

export default AddBlog;