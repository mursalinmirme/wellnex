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
import moment from "moment/moment";

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
    <Box sx={{ width: {xs: '95%', sm: '80%', lg: '80%'}, margin: "0 auto" }}>
      <Box sx={{ mt: "60px", textAlign: 'center' }}>
        <Typography
         sx={{ fontSize: {xs: '25px', sm: "32px"}, fontWeight: "700", background: '#90E0EF', display: 'inline-block', padding: '0px 20px', borderRadius: '20px 0px 20px 0px' }}
        >
          Popular Medical Camps
        </Typography>
      </Box>
      <Grid container sx={{mt: '10px'}} spacing={4}>
        {popularComps?.map((camps) => {
          return (
            <Grid key={camps?._id} item xs={12} sm={12} md={6} lg={4}>
              <Card sx={{ maxWidth: {xs: 'auto', lg: 430} }}>
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
                    Total participant: <Typography variant="span" sx={{fontWeight: '600'}}>{camps?.total_participants}</Typography>
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
                      Time: {moment(camps?.scheduled_date_time).format('LLL')}
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
      <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} mt={'40px'}><Link to={'/available_camp'}><Button variant={'contained'} sx={{bgcolor: '#023E8A', color: '#ffffff', fontWeight: '600', py: '10px','&:hover': {background: '#0096C7', color: '#ffffff'}}}>See All Camps</Button></Link></Grid>
    </Box>
  );
};

export default PopularCampusSection;
