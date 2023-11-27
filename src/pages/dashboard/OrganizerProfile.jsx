import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Box, Button, Paper, Typography } from "@mui/material";
import UpdateModalForm from "./dashboardComponent/UpdateModalForm";

const OrganizerProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {data: organizer, refetch} = useQuery({
        queryKey: ['organizerDetails'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/organizer?email=${user?.email}`);
            return result.data;
        }
    })
    
    return (
        <Paper sx={{width: '98%', padding: '10px'}}>
            <Box textAlign={'center'}>
            <img style={{width: '300px', height: '300px', borderRadius: '50%', margin: '0px auto'}} src={organizer?.image} alt="" />
            <Typography fontSize={'32px'} fontWeight={'600'} textAlign={'center'} mt={'20px'}>{organizer?.name}</Typography>
            {
                organizer?.bio && <Typography mt={'10px'} variant='body1'>{organizer?.bio}</Typography>
            }
            <Button onClick={handleOpen} variant="contained" sx={{mt: '20px'}}>Update Information</Button>
            </Box>

            <UpdateModalForm open={open} handleClose={handleClose} age={organizer?.age ? organizer?.age : ''} phone={organizer?.phone ? organizer?.phone : ''} gender={organizer?.gender ? organizer?.gender : ''} address={organizer?.address ? organizer?.address : ''} bio={organizer?.age ? organizer?.bio : ''} link={organizer?.link ? organizer?.link : ''} role={organizer?.role} refetch={refetch}></UpdateModalForm>
            <Box padding={'50px 20px'}>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Age:</span> {organizer?.age || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Gender:</span> {organizer?.gender || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Role:</span> {organizer?.role || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Phone:</span> {organizer?.phone || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography> 
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Address:</span> {organizer?.address || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Social Link:</span> {organizer?.link || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                
            </Box>
        </Paper>
    );
};

export default OrganizerProfile;