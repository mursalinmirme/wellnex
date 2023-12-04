import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Image } from "@mui/icons-material";

const WellnessBlogs = () => {
    const axiosPublic = useAxiosPublic();
    const { data: blogs = [] } = useQuery({
        queryKey: ["wellnesBolgCollect"],
        queryFn: async () => {
          const fetchBlogs = await axiosPublic.get("/wellness-blogs");
          const result = await fetchBlogs.data;
          return result;
        },
      });
      console.log('blogs are',blogs);
  return (
    <Box sx={{ width: {xs: '95%', sm: '80%', lg: "80%"}, margin: "0 auto", marginBottom: '60px'}}>
      <Box sx={{ mt: "90px", textAlign: 'center' }}>
        <Typography
          sx={{ fontSize: {xs: '25px', sm: "32px"}, fontWeight: "700", background: '#90E0EF', display: 'inline-block', padding: '0px 20px', borderRadius: '20px 0px 20px 0px' }}
        >
          Wellness Blogs
        </Typography>
      </Box>
      <Grid container spacing={'25px'} style={{marginTop: '30px'}}>
        {
            blogs.slice(0, 4).map(blog => {
                return (
                    <Grid key={blog._id} item xs={12} md={12} lg={6}>
                    <Paper sx={{padding: '15px', display: {xs: 'block', lg: 'flex'}, alignItems: 'center', gap: '15px', borderRadius: '10px'}} elevation={2}>
                       <Box sx={{width:{xs: '100%', lg: '270px'}}}>
                          <img style={{width: '100%', height: '270px'}} src={blog.image} alt="" />
                       </Box>
                       <Box flex={1}>
                          <Typography sx={{fontSize: '20px', fontWeight: '700'}}>{blog?.title}</Typography>
                          <Typography sx={{mt: '10px'}} variant="body1">{blog?.content.length > 120 ? blog.content.slice(0, 120) + '...' : blog.content}</Typography>
                          <Typography sx={{mt: '10px', fontWeight: '600'}} variant="body1">Author: {blog?.author}</Typography>
                          <Typography sx={{mt: '10px'}} variant="body1">2023-07-28</Typography>
                          <Box textAlign={'right'}>
                          <Button sx={{bgcolor: '#0077B6', color: '#ffffff', fontWeight: '600', py: '8px','&:hover': {background: '#0096C7', color: '#ffffff'}}} variant="contained">Read More</Button>
                          </Box>
                       </Box>
                    </Paper>
                    </Grid>
                )
            })
        }


      </Grid>
      <Box sx={{textAlign: 'center', mt: '45px'}}>
        <Button sx={{bgcolor: '#0077B6', color: '#ffffff', fontWeight: '600', py: '10px','&:hover': {background: '#0096C7', color: '#ffffff'}}} size="large" variant="contained">Show All Blogs</Button>
      </Box>
    </Box>
  );
};

export default WellnessBlogs;
