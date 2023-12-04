import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import moment from "moment";
import { Link } from "react-router-dom";

const UpCommingCamps = () => {
  const axiosPublic = useAxiosPublic();
  const { data: upCommingCamps = [] } = useQuery({
    queryKey: ["commingCamps"],
    queryFn: async () => {
      const fetchcommingCamps = await axiosPublic.get("/upcomming-camps");
      const result = await fetchcommingCamps.data;
      return result;
    },
  });
  console.log('data from',upCommingCamps);
  return (
    <Box sx={{ width: {xs: '95%', sm: "80%"}, margin: "0 auto", paddingTop: '40px' }}>
      <Box sx={{ mt: "60px" }}>
        <Typography
          textAlign={"center"}
          sx={{ fontSize: {xs: '25px', sm: "32px"}, fontWeight: "700" }}
        >
          Upcomming Camps
        </Typography>
      </Box>
      <Box sx={{ mt: {xs: '0px', lg: "40px"} }}>
        <Swiper
          // slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {upCommingCamps.map((campsComing) => {
            return (
                <SwiperSlide key={campsComing?._id}>
              <Card sx={{ maxWidth: {xs: 'auto', lg: 395}, padding: '40px 0' }}>
                <CardActionArea display={"flex"} variant="div">
                  <Box sx={{position: 'relative'}}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={campsComing?.image}
                    alt="green iguana"
                  />
                  <Typography sx={{position: 'absolute', bottom: '0', background: 'RGBA(0,119,182,0.68)', padding: '10px 30px 10px 20px', color: '#ffffff', fontWeight: '600', borderRadius: '0 50px 0 0'}}>
                    {
                        campsComing?.venue_location
                    }
                  </Typography>
                  <Typography sx={{position: 'absolute', top: '0', right: '0', background: 'RGBA(0,119,182,0.48)', padding: '10px 20px 10px 30px', color: '#ffffff', fontWeight: '600', borderRadius: '0px 0px 0px 50px'}}>
                    {
                        moment(campsComing?.scheduled_date_time).format('LLL')
                    }
                  </Typography>
                  </Box>
                  <CardContent>
                    <Typography sx={{fontWeight: '600'}} textAlign={'center'} gutterBottom variant="h5" component="div">
                      {
                        campsComing?.camp_name
                      }
                    </Typography>
                    <Typography sx={{marginBottom: '0px'}} textAlign={'center'} variant="body1" color="text.secondary">
                      {
                        campsComing?.description
                      }
                    </Typography>
                    <Box display={'flex'} justifyContent={'space-between'}>
                    <p style={{fontSize: '17px', fontWeight: '500'}}><span style={{color: '#022b3a'}}>Total Interest</span>: {campsComing?.total_interests}</p>
                    <p style={{fontSize: '17px', fontWeight: '500'}}><span style={{color: '#022b3a'}}>Total Participant</span>: {campsComing?.total_participants}</p>
                    </Box>
                    {/* <Typography>Audience: {campsComing?.total_interests}</Typography> */}
                    <Typography textAlign={'center'}>{
                      campsComing?.specialized_services?.map((serv, indx) => {
                        return <li style={{margin: '10px 0'}} key={indx}>Specialized: {serv}</li>
                     })
                      }</Typography>
                    <Typography textAlign={'center'}>{campsComing?.target_audience}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                <Link to={`/upcomming-camps-details/${campsComing?._id}`}>
                <Button sx={{bgcolor: '#0077B6', borderRadius: '25px', color: '#ffffff', fontWeight: '600', py: '8px', px:'30px','&:hover': {background: '#0096C7', color: '#ffffff'}}} style={{marginLeft: '10px', marginBottom: '15px'}} variant="contained" color="primary">
                    Details
                  </Button>
                </Link>
              </CardActions>
              </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default UpCommingCamps;
