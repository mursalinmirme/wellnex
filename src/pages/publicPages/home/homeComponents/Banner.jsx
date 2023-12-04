import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import './Banner.css';
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Autoplay, Pagination } from "swiper/modules";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: banners = [] } = useQuery({
    queryKey: ["mybanners"],
    queryFn: async () => {
      const fetchBanners = await axiosPublic.get("/banners");
      const result = await fetchBanners.data;
      return result;
    },
  });
  return (
    <div>
      <Swiper pagination={true} autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} modules={[Autoplay, Pagination]} className="mySwiper">
        {banners.map((banner) => {
          return (
            <SwiperSlide key={banner?.id}>
              <Box sx={{ position: "relative", height: {xs: '550px', sm: '500px', lg: "680px"} }}>
                <img
                  style={{
                    height: "680px",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                  src={banner?.image}
                  alt=""
                />
                {/* banner content */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "0",
                    background:
                      "linear-gradient(90deg, rgba(3,4,94,0.9108893557422969) 0%, rgba(0,150,199,0.8016456582633054) 47%, rgba(121,147,149,0.499124649859944) 100%)",
                    width: "100%",
                    height: "100%",
                    padding: {xs: "0 20px", sm: "0 60px", lg:"0 60px"},
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <div>
                    <Typography
                    component={'h2'}
                    variant=""
                      className="bannerTitle"
                      sx={{
                        fontSize:{xs: '30px', sm: "40px", lg:'56px'},
                        color: "#ffffff",
                        width: {xs: '100%', lg:"50%"},
                        lineHeight: "150%",
                        marginBottom: "10px",
                      }}
                      
                      
                    >
                      {banner?.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        width: {xs: '100%', lg:"50%"},
                        fontSize: {xs: '16px', sm: "18px"},
                        marginBottom: "20px",
                        lineHeight: '180%'
                      }}
                    >
                      {banner?.description}
                    </Typography>
                    <Button size="large" sx={{bgcolor: 'white', color: '#023E8A', fontWeight: '700', py: '11px',marginTop: '5px', fontSize: '16px','&:hover': {background: '#0077B6', color: '#ffffff'}}} variant="contained" endIcon={<ArrowForwardIcon />}>
                      JOin NOw
                    </Button>
                  </div>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
