import { useQuery } from "@tanstack/react-query";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Box, Button,Tooltip,Typography } from "@mui/material";
import * as React from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Paper } from "@mui/material";
import UpdateModalForm from "./dashboardComponent/UpdateModalForm";
import UpdateQualification from "./dashboardComponent/UpdateQualification";
import UploadCertifications from "./dashboardComponent/UploadCertifications";
import { Helmet } from "react-helmet";
const ProfessionalsProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // educatonal qualification update
    const [eduOpen, setEduOpen] = React.useState(false);
    const handleOpenEdu = () => setEduOpen(true);
    const handleCloseEdu = () => setEduOpen(false);
    // educatonal certifications update
    const [cerOpen, setCerOpen] = React.useState(false);
    const handleOpenCer = () => setCerOpen(true);
    const handleCloseCer = () => setCerOpen(false);

    const {data: professional={}, refetch} = useQuery({
        queryKey: ['healthProfessionals'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/users?email=${user?.email}`);
            return result.data;
        }
    })

    return (
        <div>
            <Helmet>
            <title>Wellnex | Dashboard | Professional Profile</title>
            </Helmet>
            <Navbar></Navbar>
            <Box sx={{width: '80%', margin: '0 auto'}}>
                <Paper sx={{ padding: '10px'}}>
            <Box sx={{background: 'linear-gradient(90deg, rgba(3,4,94,0.9192927170868347) 0%, rgba(2,62,138,0.9080882352941176) 53%, rgba(0,119,182,0.9585084033613446) 100%)', padding: '30px 0px'}} textAlign={'center'}>
            <img style={{width: '200px', height: '200px', borderRadius: '50%'}} src={professional?.image} alt="" />
            <Typography color={'white'} fontSize={'32px'} fontWeight={'600'} textAlign={'center'} mt={'20px'}>{professional?.name}</Typography>
            {
                professional?.bio && <Typography color={'white'} mt={'10px'} variant='body1'>{professional?.bio}</Typography>
            }
            <Button onClick={handleOpen} variant="contained" sx={{mt: '20px'}}>Update Information</Button>
            </Box>

            <Box padding={'20px 20px'}>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Age:</span> {professional?.age || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Gender:</span> {professional?.gender || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Role:</span> {professional?.role || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Phone:</span> {professional?.phone || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography> 
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Address:</span> {professional?.address || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                <Typography fontSize={'18px'} py={'15px'}><span style={{fontWeight: '600'}}>Social Link:</span> {professional?.link || <span style={{fontWeight: '500', color: '#6d6875'}}>Not set</span>}</Typography>
                
            </Box>
            
        </Paper>
        <Paper sx={{padding: '30px 20px', marginTop: '20px'}}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography fontSize={'28px'} fontWeight={600}>Medical Specialty</Typography>
            <Box><Tooltip title={"Edit Qualification"}>
            <Button onClick={handleOpenEdu}><BorderColorIcon sx={{fontSize: '36px', color: '#023E8A'}}></BorderColorIcon></Button></Tooltip></Box>
            </Box>
            <Typography pl={'20px'} color={'#5c677d'} fontWeight={'600'} mt={'10px'}>{professional?.specility ? professional?.specility : 'Not set'}</Typography>
        </Paper>
        <Paper sx={{padding: '30px 20px', marginTop: '20px'}}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography fontSize={'28px'} fontWeight={600}>Certifications</Typography>
            <Box><Tooltip title={"Edit Qualification"}>
            <Button onClick={handleOpenCer}><BorderColorIcon sx={{fontSize: '36px', color: '#023E8A'}}></BorderColorIcon></Button></Tooltip></Box>
            </Box>
            {
                professional?.certificateImg ? 
                <Paper sx={{padding: '20px', width: '80%', margin: '0 auto', marginTop: '30px'}}>
                    <Box textAlign={'center'}><img style={{width: '100%'}} src={professional?.certificateImg} alt="" /></Box>
                </Paper> : 
                <Typography pl={'20px'} color={'#5c677d'} fontWeight={'600'} mt={'10px'}>Not Uploaded yet!</Typography>
            }
            
        </Paper>

        
        <UpdateModalForm open={open} handleClose={handleClose} age={professional?.age ? professional?.age : ''} phone={professional?.phone ? professional?.phone : ''} gender={professional?.gender ? professional?.gender : ''} address={professional?.address ? professional?.address : ''} bio={professional?.bio ? professional?.bio : ''} link={professional?.link ? professional?.link : ''} role={professional?.role} refetch={refetch}></UpdateModalForm>
        {/* update edu modal */}
        <UpdateQualification eduOpen={eduOpen} handleCloseEdu={handleCloseEdu} getSpecility={professional?.specility ? professional?.specility : ''} refetch={refetch}>

        </UpdateQualification>

        <UploadCertifications cerOpen={cerOpen} handleCloseCer={handleCloseCer} refetch={refetch}></UploadCertifications>


        </Box>
            <Footer></Footer>
        </div>
    );
};

export default ProfessionalsProfile;