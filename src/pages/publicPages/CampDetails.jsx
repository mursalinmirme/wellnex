import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Box, Button } from "@mui/material";

const CampDetails = () => {
    const {id} = useParams();
    console.log(id);
    const axiosPublic = useAxiosPublic();
    const { data: camp = [] } = useQuery({
        queryKey: ["camps_details"],
        queryFn: async () => {
          const fetchCamp = await axiosPublic.get(`/camps-details/${id}`);
          const result = await fetchCamp.data;
          return result;
        },
      });
      console.log(camp);
    return (
        <div style={{width: '80%', margin: '0 auto'}}>
            <div style={{width: '80%', margin: '0 auto'}}>
            <img style={{width: '100%', marginTop: '20px', height: '600px'}} src={camp?.image} alt="" />
            <Box display={'flex'} mt={'10px'} justifyContent={'space-between'} alignItems={'center'}>
            <h3 style={{fontSize: '32px', flex: '1', lineHeight: '150%'}}>{camp?.camp_name}</h3>
            <Button size="large" variant="contained" sx={{bgcolor: '#c1121f', color: '#ffffff', fontWeight: '600', py: '12px','&:hover': {background: '#0096C7', color: '#ffffff'}}}>Join Camp</Button>
            </Box>
            <p style={{fontSize: '20px', marginTop: '0px'}}>Fees: <span style={{fontWeight: '600'}}>$ {camp?.camp_fees}</span></p>
            <p style={{fontSize: '20px', fontWeight: '600'}}>Time: {camp?.scheduled_date_time}</p>
            <p style={{fontSize: '18px', fontWeight: '500'}}>Location: {camp?.venue_location}</p>
            <p style={{fontSize: '20px', fontWeight: '600'}}>Target Audience:</p>
            <ul>
                {
                    camp?.specialized_services?.map((serv, indx) => {
                       return <li style={{margin: '10px 0'}} key={indx}>{serv}</li>
                    })
                }
            </ul>
            <p style={{fontSize: '20px', fontWeight: '600', marginTop: '30px'}}>Healthcare Professionals:</p>
            <ul>
                {
                    camp?.healthcare_professionals?.map((prof, indx) => {
                       return <li style={{margin: '10px 0'}} key={indx}>{prof}</li>
                    })
                }
            </ul>
            <h5 style={{fontWeight: '600', fontSize: '30px', marginBottom: '0px'}}>Description:</h5>
            <p style={{lineHeight: '180%', fontSize: '17px'}}>{camp?.description}</p>
            
            </div>
        </div>
    );
};

export default CampDetails;