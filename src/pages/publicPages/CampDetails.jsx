import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import RegistrationModal from './shares/RegistrationModal';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserRole from '../../hooks/useUserRole';
import moment from 'moment/moment';
const CampDetails = () => {
    const {id} = useParams();
    console.log(id);
    const axiosSecure = useAxiosSecure();
    const useRole = useUserRole();
    console.log('user role recived from', useRole?.userRole);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data: camp = {}, refetch } = useQuery({
        queryKey: ["camps_details"],
        queryFn: async () => {
          const fetchCamp = await axiosSecure.get(`/camps-details/${id}`);
          const result = await fetchCamp.data;
          return result;
        },
      });
      console.log(camp);
    return (
        <Box sx={{width: {xs: '100%', lg: '80%'}, margin: '0 auto'}}>
            <Paper style={{width: '95%', margin: '0 auto', padding: '10px 20px', marginTop: '20px'}}>
            <Box sx={{height: {xs: 'auto', lg:'600px'}}}>
            <img style={{width: '100%', marginTop: '0px', height: '100%'}} src={camp?.image} alt="" />
            </Box>
            <Box sx={{display: {sx: 'block', lg:'flex'}}} mt={'10px'} justifyContent={'space-between'} alignItems={'center'}>
            <h3 style={{fontSize: '32px', flex: '1', lineHeight: '150%'}}>{camp?.camp_name}</h3>
            <Button disabled={useRole?.userRole === 'Participants' ? false : true} onClick={handleOpen} size="large" variant="contained" sx={{bgcolor: '#c1121f', color: '#ffffff', fontWeight: '600', py: '12px','&:hover': {background: '#0096C7', color: '#ffffff'}}}>Join Camp</Button>
            </Box>
            <Typography sx={{fontSize: '20px', marginTop: {xs: '20px', lg: '0px'}}}>Fees: <span style={{fontWeight: '600'}}>$ {camp?.camp_fees}</span></Typography>
            <Box sx={{display: {xs: 'block', lg:'flex'}}} justifyContent={'space-between'}>
            <p style={{fontSize: '20px', fontWeight: '600'}}>Time: {moment(camp?.scheduled_date_time).format('LLL')}</p>
            <p style={{fontSize: '20px', fontWeight: '600'}}> Total Participants : {camp?.total_participants}</p>
            </Box>
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
            
            </Paper>
            
            <RegistrationModal open={open} handleClose={handleClose} fees={camp?.camp_fees} camp_name={camp?.camp_name} venue_location={camp?.venue_location} camp_fees={camp?.camp_fees} campId={camp?._id} camp_owner={camp?.campOwnerEmail} scheduled_date_time={camp?.scheduled_date_time} refetch={refetch}></RegistrationModal>


        </Box>
    );
};

export default CampDetails;