import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UpCommingCamps = () => {
  const { data: upCommingCamps = [] } = useQuery({
    queryKey: ["commingCamps"],
    queryFn: async () => {
      const fetchcommingCamps = await axios("./upcommingCamps.json");
      const result = await fetchcommingCamps.data;
      return result;
    },
  });
  console.log('data from',upCommingCamps);
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Box sx={{ mt: "60px" }}>
        <Typography
          textAlign={"center"}
          sx={{ fontSize: "32px", fontWeight: "700" }}
        >
          Upcomming Camps
        </Typography>
      </Box>
      <Box sx={{ mt: "60px" }}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {upCommingCamps.map((campsComing) => {
            return (
                <SwiperSlide key={campsComing?.id}>
              <Card sx={{ maxWidth: 395 }}>
                <CardActionArea display={"flex"} variant="div">
                  <Box sx={{position: 'relative'}}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={"https://i.ibb.co/xsx7Kmy/card.jpg"}
                    alt="green iguana"
                  />
                  <Typography sx={{position: 'absolute', bottom: '0', background: 'RGBA(0,119,182,0.68)', padding: '10px 30px 10px 20px', color: '#ffffff', fontWeight: '600', borderRadius: '0 50px 0 0'}}>
                    {
                        campsComing?.location
                    }
                  </Typography>
                  <Typography sx={{position: 'absolute', top: '0', right: '0', background: 'RGBA(0,119,182,0.48)', padding: '10px 20px 10px 30px', color: '#ffffff', fontWeight: '600', borderRadius: '0px 0px 0px 50px'}}>
                    {
                        campsComing?.date
                    }
                  </Typography>
                  </Box>
                  <CardContent>
                    <Typography sx={{fontWeight: '600'}} textAlign={'center'} gutterBottom variant="h5" component="div">
                      {
                        campsComing?.camp_name
                      }
                    </Typography>
                    <Typography sx={{marginBottom: '30px'}} textAlign={'center'} variant="body1" color="text.secondary">
                      {
                        campsComing?.description
                      }
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </div>
  );
};

export default UpCommingCamps;
