import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
  } from "@mui/material";
  import { Link } from "react-router-dom";
const AvailableCamps = () => {
    const axiosPublic = useAxiosPublic();
    const [sortVal, setSortVal] = React.useState('');
    const handleChange = (event) => {
      setSortVal(event.target.value);
    };
    const { data: availableCamps = [] } = useQuery({
      queryKey: ["availableCampsList"],
      queryFn: async () => {
        const fetchallCamps = await axiosPublic.get("/all_camps");
        const result = await fetchallCamps.data;
        return result;
      },
    });
    console.log('data from',availableCamps);

    const handleSearchBar = (e) => {
      e.preventDefault();
      const searchValue = e.target.search.value;
      axiosPublic.post(`/search-camps`)
      .then(res => {
         console.log(res.data);
      })
    }


    return (
        <div style={{ width: "80%", margin: "0 auto" }}>
        <Box>
           <Box display={'flex'} alignItems={'center'} mt={'30px'} justifyContent={'space-between'}>
             <form onSubmit={handleSearchBar} style={{border: '2px solid #03045E'}}>
              <input style={{padding: '13px 15px', fontSize: '18px', border: 'none'}} type="text" name="search" id="" placeholder="Search camps" />
              <input style={{padding: '13px 20px', background: '#023E8A', fontSize: '18px', color: 'white', border: 'none'}} type="submit" value="Search" />
             </form>
             <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortVal}
                label="Sort by"
                onChange={handleChange}
              >
                <MenuItem value={'most registered'}>Most Registered</MenuItem>
                <MenuItem value={20}>Target Audience</MenuItem>
                <MenuItem value={30}>Aplhabetical Order</MenuItem>
              </Select>
            </FormControl>
          </Box>
           </Box>
        </Box>
      <Box textAlign={"center"} sx={{mt: '0px'}}>
        <Typography
          sx={{ fontSize: "32px", fontWeight: "600" }}
        >
          All Camps
        </Typography>
      </Box>
      <Grid container sx={{mt: '00px'}} spacing={4}>
        {availableCamps?.map((camps) => {
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
                  <Link to={`/camps-details/${camps?._id}`}>
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

export default AvailableCamps;