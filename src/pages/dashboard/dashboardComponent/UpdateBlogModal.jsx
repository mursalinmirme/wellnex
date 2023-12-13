import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import * as React from 'react';
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs: '90%', lg: '70%'},
  height: {xs: '100vh', lg: 'auto'},
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,

};
const UpdateBlogModal = ({open, handleClose, updateId, setUpdateId, setOpen, refetch}) => {
    console.log('update mr id is', updateId);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [uploadLoading, setUploadLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    const { data=[] } = useQuery({
        queryKey: ["specificBlog", updateId],
        queryFn: async () => {
          const fetchBlogs = await axiosSecure.get(`/wellness-blogs/${updateId}`);
          const result = await fetchBlogs.data;
          return result;
        },
    });

   console.log('modal blog is', data);

   let newPhoto = data?.image;
    const handleBlogUpdata = async (data) => {
      setUploadLoading(true)

      const newtitle = data.blog_title;
      const newauthor = data.author;
      const newcontent = data.description;
      const camp_image = data?.camp_image[0];


      if(camp_image !== undefined){
        const formData = new FormData();
        formData.append("image", camp_image);
        const uploadImage = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_API}`,
          formData
        );
        const uploadImgResp = await uploadImage.data;
    
    
        newPhoto = uploadImgResp.data.display_url;
      }

      const UpdateBlog = {title:newtitle, author:newauthor, content:newcontent, image:newPhoto};
      console.log('update blog version', UpdateBlog);

      const updateRequest = await axiosSecure.put(`/update-blog?id=${updateId}`, UpdateBlog);

      const updateResult = await updateRequest?.data;

      console.log('UPdate result is', updateResult);
      if(updateResult.acknowledged){
        Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your blog uploaded successfully!",
                        showConfirmButton: false,
                        timer: 2000
                      });
                      setUploadLoading(false);
                      refetch();
                      setOpen(false);
                }

    }



  return (
    <Modal
      open={open}
      onClose={() => handleClose(setUpdateId(''))}
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
          Update Blog
        </Typography>

         <form style={{width: '80%', margin: '0 auto', marginTop: '30px'}} onSubmit={handleSubmit(handleBlogUpdata)}>

<Box mt={'20px'}>
<label style={{fontWeight: '600'}}>Blog Title:</label>
<input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter blog title" defaultValue={data?.title} {...register("blog_title", { required: true })} />
{errors.blog_title && <span style={{color: 'red'}}>{`You haven't change anything`}</span>}
</Box>

<Box mt={'30px'}>
<label style={{fontWeight: '600'}}>Author Name:</label>
<input style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px'}} placeholder="Enter author name" defaultValue={data?.author} {...register("author", { required: true })} />
{errors.author && <span style={{color: 'red'}}>{`You haven't change anything`}</span>}
</Box>

<Box flex={1} mt={'30px'}>
<label style={{fontWeight: '600'}}>Blog Image</label>
<input type="file" style={{display: 'block', width: '100%', padding: '12px', fontSize: '16px', outline: 'none' ,marginTop: '5px', border: '0.1px solid rgb(118, 118, 118)'}} {...register("camp_image")} />
{errors.camp_image && <span style={{color: 'red'}}>{`You haven't change photo`}</span>}
</Box>




<Box mt={'30px'}>
<label style={{fontWeight: '600'}}>Blog Description:</label>
<textarea style={{display: 'block', width: '100%', padding: '14px', fontSize: '16px', outline: 'none' ,marginTop: '5px', resize: 'none', height: '200px'}} placeholder="Enter your blog description" defaultValue={data?.content} {...register("description", { required: true })}>
</textarea>
{errors.description && <span style={{color: 'red'}}>{`You haven't change anything`}</span>}

</Box>


<Button fullWidth variant="contained" sx={{bgcolor: '#0077B6', marginTop: '40px', color: '#ffffff', fontSize: '18px', py: '10px','&:hover': {background: '#0096C7', color: '#ffffff'}}} type="submit">
    {uploadLoading ? <CircularProgress size={'32px'} style={{color: 'white'}}></CircularProgress> : 'Update Blog'}
  </Button>

            </form>
      </Box>
    </Modal>
  );
  
};

export default UpdateBlogModal;
