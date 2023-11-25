import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WellnessBlogs = () => {
    const { data: blogs = [] } = useQuery({
        queryKey: ["wellnesBolgCollect"],
        queryFn: async () => {
          const fetchBlogs = await axios("./wellnessBlogs.json");
          const result = await fetchBlogs.data;
          return result;
        },
      });
      console.log('blogs are',blogs);
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Box textAlign={"center"} sx={{ mt: "70px" }}>
        <Typography
          sx={{ fontSize: "32px", fontWeight: "600", color: "#03045E" }}
        >
          Wellness Blogs
        </Typography>
      </Box>
      <Grid container spacing={'25px'} style={{marginTop: '30px'}}>
        {
            blogs.slice(0, 4).map(blog => {
                return (
                    <Grid key={blog.id} item xs={12} md={12} lg={6}>
                    <Paper style={{padding: '15px', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '10px'}} elevation={2}>
                       <Box>
                          <img style={{width: '270px', height: '270px', flexGrow: '1'}} src="https://i.ibb.co/xsx7Kmy/card.jpg" alt="" />
                       </Box>
                       <Box>
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
      <Box sx={{textAlign: 'center', mt: '35px'}}>
        <Button sx={{bgcolor: '#0077B6', color: '#ffffff', fontWeight: '600', py: '10px','&:hover': {background: '#0096C7', color: '#ffffff'}}} size="large" variant="contained">Show All Blogs</Button>
      </Box>
    </div>
  );
};

export default WellnessBlogs;
