import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
  const { data: banners = [] } = useQuery({
    queryKey: ["mybanners"],
    queryFn: async () => {
      const fetchBanners = await axios("./banners.json");
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
            <SwiperSlide key={banner?.id} style={{ height: "680px" }}>
              <div style={{ position: "relative" }}>
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
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    background:
                      "linear-gradient(90deg, rgba(3,4,94,0.9108893557422969) 0%, rgba(0,150,199,0.8016456582633054) 47%, rgba(121,147,149,0.499124649859944) 100%)",
                    width: "100%",
                    height: "100%",
                    padding: "0 60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: "56px",
                        color: "#ffffff",
                        width: "50%",
                        lineHeight: "150%",
                        marginBottom: "10px",
                      }}
                    >
                      {banner?.title}
                    </h2>
                    <p
                      style={{
                        color: "#FFFFFF",
                        width: "50%",
                        lineHeight: "150%",
                        fontSize: "18px",
                        marginTop: "0px",
                      }}
                    >
                      {banner?.description}
                    </p>
                    <Button size="large" sx={{bgcolor: 'white', color: '#023E8A', fontWeight: '700', py: '11px',marginTop: '5px', fontSize: '16px','&:hover': {background: '#0077B6', color: '#ffffff'}}} variant="contained" endIcon={<ArrowForwardIcon />}>
                      JOin NOw
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
