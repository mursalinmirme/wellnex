import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Box, Button, Paper, Typography } from "@mui/material";
import UpdateModalForm from "./dashboardComponent/UpdateModalForm";
import { Helmet } from 'react-helmet';
const ParticipantProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {data: participant, refetch} = useQuery({
        queryKey: ['participantDetails'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/users?email=${user?.email}`);
            return result.data;
        }
    })
    return (
        <>
        <Helmet>
            <title>Wellnex | Dashboard | Participant Profile</title>
        </Helmet>
        <Paper sx={{width: '98%', padding: '10px'}}>
            <Box sx={{background: 'linear-gradient(90deg, rgba(3,4,94,0.9192927170868347) 0%, rgba(2,62,138,0.9080882352941176) 53%, rgba(0,119,182,0.9585084033613446) 100%)', padding: '30px 0px'}} textAlign={'center'}>
            <img style={{width: '200px', height: '200px', borderRadius: '50%'}} src={participant?.image} alt="" />
            <Typography color={'white'} fontSize={'32px'} fontWeight={'600'} textAlign={'center'} mt={'20px'}>{participant?.name}</Typography>
            {
                participant?.bio && <Typography color={'white'} mt={'10px'} variant='body1'>{participant?.bio}</Typography>
            }
            <Button onClick={handleOpen} variant="contained" sx={{mt: '20px'}}>Update Information</Button>
            </Box>

            <UpdateModalForm open={open} handleClose={handleClose} age={participant?.age ? participant?.age : ''} phone={participant?.phone ? participant?.phone : ''} gender={participant?.gender ? participant?.gender : ''} address={participant?.address ? participant?.address : ''} bio={participant?.bio ? participant?.bio : ''} link={participant?.link ? participant?.link : ''} role={participant?.role} refetch={refetch}></UpdateModalForm>
            <Box padding={'50px 20px'}>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Age:</span> {participant?.age || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Gender:</span> {participant?.gender || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Role:</span> {participant?.role || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Phone:</span> {participant?.phone || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography> 
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Address:</span> {participant?.address || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Social Link:</span> {participant?.link || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                
            </Box>
        </Paper>
        </>
    );
};

export default ParticipantProfile;