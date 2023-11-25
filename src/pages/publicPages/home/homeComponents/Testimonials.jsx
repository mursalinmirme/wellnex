import { Box, Rating, Typography } from "@mui/material";
// Import Swiper React components
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const Testimonials = () => {
  const { data: rattings = [] } = useQuery({
    queryKey: ["campsRatting"],
    queryFn: async () => {
      const fetchrattings = await axios("./rating.json");
      const result = await fetchrattings.data;
      return result;
    },
  });
  console.log(rattings);
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Box>
        <Typography
          textAlign={"center"}
          sx={{ mt: "60px", fontSize: "32px", fontWeight: "600" }}
        >
          Testimonials
        </Typography>
      </Box>
      <div style={{ marginTop: "20px" }}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 455500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {rattings?.map((ratting) => {
            return (
              <SwiperSlide key={ratting?._id}>
                <Box
                  style={{ height: "300px" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box display={"flex"} justifyContent={"center"}>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                    />
                  </Box>
                  <Typography
                    textAlign={"center"}
                    sx={{ mt: "15px", fontWeight: 700, fontSize: "22px" }}
                  >
                    Womens Health Symposium
                  </Typography>
                  <Typography
                    sx={{
                      width: "60%",
                      margin: "0 auto",
                      mt: "15px",
                      lineHeight: "150%",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus facilis pariatur tempore incidunt accusantium
                    voluptas repellendus magnam, neque nemo explicabo.
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    sx={{ fontSize: "18px", fontWeight: "700", mt: "15px" }}
                  >
                    29 April 2023
                  </Typography>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
