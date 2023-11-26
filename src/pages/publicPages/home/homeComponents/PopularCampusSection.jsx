import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const PopularCampusSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: popularComps = [] } = useQuery({
    queryKey: ["popularCampases"],
    queryFn: async () => {
      const fetchCampus = await axiosPublic.get("/popular-camps");
      const result = await fetchCampus.data;
      return result;
    },
  });
  // console.log(popularComps);
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Box textAlign={"center"} sx={{mt: '60px'}}>
        <Typography
          sx={{ fontSize: "32px", fontWeight: "600" }}
        >
          Popular Medical Camps
        </Typography>
      </Box>
      <Grid container sx={{mt: '10px'}} spacing={4}>
        {popularComps?.map((camps) => {
          return (
            <Grid key={camps?._id} item xs={12} md={6} lg={4}>
              <Card sx={{ maxWidth: 430 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="270"
                    image={camps?.image}
                  />
                  <CardContent>
                    <Typography sx={{fontWeight: '600'}} gutterBottom variant="h5" component="div">
                      {camps?.camp_name}
                    </Typography>
                    <Box sx={{mt: '8px'}} display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body1" color="text.secondary">
                    Fees: <Typography variant="span" sx={{fontWeight: '600'}}>${camps?.camp_fees}</Typography>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                    Total participant: <Typography variant="span" sx={{fontWeight: '600'}}>123</Typography>
                    </Typography>
                    </Box>
                    <Typography sx={{mt: '5px'}} variant="body1" color="text.secondary">
                    Audience: {camps?.target_audience}
                    </Typography>
                    <Typography sx={{mt: '5px'}} variant="body1" color="text.secondary">
                    Location: {camps?.venue_location}
                    </Typography>
                    <Typography sx={{mt: '5px'}} variant="body1" color="text.secondary">
                    Doctor: {camps?.healthcare_professionals[0]}
                    </Typography>
                    <Typography sx={{mt: '5px'}} variant="body1" color="text.secondary">
                    Specialized: {camps?.specialized_services[0]}
                    </Typography>
                    <Typography sx={{mt: '5px'}} variant="body1" color="text.secondary">
                      Time: {camps?.scheduled_date_time}
                    </Typography>

                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to={`camps-details/${camps?._id}`}>
                  <Button sx={{bgcolor: '#0077B6', color: '#ffffff', fontWeight: '600', py: '8px','&:hover': {background: '#0096C7', color: '#ffffff'}}} style={{marginLeft: '10px', marginBottom: '15px'}} variant="contained" color="primary">
                    Details
                  </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default PopularCampusSection;
