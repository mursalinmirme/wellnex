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
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import moment from "moment";
const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const { data: rattings = [] } = useQuery({
    queryKey: ["pargicipintsRatting"],
    queryFn: async () => {
      const fetchrattings = await axiosPublic.get("/participants_ratings");
      const result = await fetchrattings.data;
      return result;
    },
  });
  console.log('ratings',rattings);
  return (
    <Box sx={{ width: {xs: '95%', xl: '80%'}, margin: "0 auto" }}>
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
            delay: 2000,
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
                  style={{ padding: '50px 0' }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box>
                    <img style={{width: '80px', height: '80px', borderRadius: '50%'}} src={ratting?.reviewImage} alt="" />
                    </Box>
                  <Box mt={'10px'} display={"flex"} justifyContent={"center"}>
                    <Rating
                      name="half-rating"
                      // defaultValue={2.5}
                      value={ratting?.reviewStar}
                      precision={0.5}
                    />
                  </Box>
                  <Typography
                    textAlign={"center"}
                    sx={{ mt: "15px", fontWeight: 700, fontSize: "22px" }}
                  >
                    {ratting?.camp_name}
                  </Typography>
                  <Typography
                    sx={{
                      width: {xs: '80%', sm: '80%', lg:'60%'},
                      margin: "0 auto",
                      textAlign:{xs: 'center'},
                      mt: "15px",
                      lineHeight: "150%",
                    }}
                  >
                    {ratting?.feedbackText}
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    sx={{ fontSize: "18px", fontWeight: "700", mt: "15px" }}
                  >
                    {moment(ratting?.date).format('LL')}
                  </Typography>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Box>
  );
};

export default Testimonials;
