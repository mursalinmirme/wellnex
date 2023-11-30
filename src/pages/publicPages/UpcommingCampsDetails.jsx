import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Box, Button, Paper } from "@mui/material";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserRole from '../../hooks/useUserRole';
import moment from 'moment/moment';
import UpcommingRegistrationModal from './shares/UpcommingRegistrationModal';
import ProfessionalUpCommingCampInterest from './shares/ProfessionalUpCommingCampInterest';
const UpcommingCampsDetails = () => {
    const {id} = useParams();
    console.log(id);
    const axiosSecure = useAxiosSecure();
    const useRole = useUserRole();
    console.log('user role recived from', useRole?.userRole);
    // participant reg modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // professional reg modal
    const [openProf, setOpenProf] = React.useState(false);
    const handleProfessionalRegOpen = () => setOpenProf(true);
    const handleCloseProfessionalRegOpen = () => setOpenProf(false);

    const { data: camp = {}, refetch } = useQuery({
        queryKey: ["upCommingCampsDetails"],
        queryFn: async () => {
          const fetchCamp = await axiosSecure.get(`/upcomming-camps-details/${id}`);
          const result = await fetchCamp.data;
          return result;
        },
      });
      console.log('upcomming camp details is:',camp);
    return (
        <div style={{width: '80%', margin: '0 auto'}}>
            <Paper style={{width: '90%', margin: '0 auto', padding: '10px 20px', marginTop: '20px'}}>
            <img style={{width: '100%', marginTop: '0px', height: '600px'}} src={camp?.image} alt="" />
            <Box display={'flex'} mt={'10px'} justifyContent={'space-between'} alignItems={'center'}>
            <h3 style={{fontSize: '32px', flex: '1', lineHeight: '150%'}}>{camp?.camp_name}</h3>
            {useRole?.userRole === 'Participants' && <Button onClick={handleOpen} size="large" variant="contained" sx={{bgcolor: '#c1121f', color: '#ffffff', fontWeight: '600', py: '12px','&:hover': {background: '#0096C7', color: '#ffffff'}}}>Join Upcoming Camp</Button>}
            {useRole?.userRole === 'Healthcare Professionals' && <Button onClick={handleProfessionalRegOpen} size="large" variant="contained" sx={{bgcolor: '#c1121f', color: '#ffffff', fontWeight: '600', py: '12px','&:hover': {background: '#0096C7', color: '#ffffff'}}}>Interested Upcoming</Button>}
            </Box>
            <p style={{fontSize: '20px', marginTop: '0px'}}>Fees: <span style={{fontWeight: '600'}}>$ {camp?.camp_fees}</span></p>
            <Box display={'flex'} justifyContent={'space-between'}>
            <p style={{fontSize: '20px', fontWeight: '600'}}>Time: {moment(camp?.scheduled_date_time).format('LLL')}</p>
            <p style={{fontSize: '20px', fontWeight: '600'}}><span style={{color: '#022b3a'}}>Total Interest</span>: {camp?.total_interests}</p>
            </Box>
            
            <Box display={'flex'} justifyContent={'space-between'}>
                <p style={{fontSize: '18px', fontWeight: '500'}}>Location: {camp?.venue_location}</p>
                
                <p style={{fontSize: '20px', fontWeight: '600'}}> <span style={{color: '#022b3a'}}>Total Participants</span> : {camp?.total_participants}</p>
            </Box>
            
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
            {/* participant modal data */}
            <UpcommingRegistrationModal open={open} handleClose={handleClose} fees={camp?.camp_fees} camp_name={camp?.camp_name} venue_location={camp?.venue_location} camp_fees={camp?.camp_fees} campId={camp?._id} camp_owner={camp?.campOwnerEmail} scheduled_date_time={camp?.scheduled_date_time} refetch={refetch}></UpcommingRegistrationModal>
            {/* professional modal data */}
            <ProfessionalUpCommingCampInterest openProf={openProf} handleCloseProfessionalRegOpen={handleCloseProfessionalRegOpen} camp_name={camp?.camp_name} venue_location={camp?.venue_location} camp_fees={camp?.camp_fees} campId={camp?._id} camp_owner={camp?.campOwnerEmail} scheduled_date_time={camp?.scheduled_date_time} refetch={refetch}></ProfessionalUpCommingCampInterest>


        </div>
    );
};

export default UpcommingCampsDetails;

