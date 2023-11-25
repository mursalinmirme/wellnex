import { Box, Divider, IconButton, Input, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import footerBg from '../assets/footerBg.jpg';
import SendIcon from '@mui/icons-material/Send';
const Footer = () => {
    return (
        <div style={{background: `url(${footerBg})`, marginTop: '50px', position: 'relative', height: '400px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <div style={{position: 'absolute', left: '0', top: '0',background: 'linear-gradient(90deg, rgba(3,4,94,0.9276960784313726) 0%, rgba(0,150,199,0.9164915966386554) 47%, rgba(70,109,112,0.9753151260504201) 100%)', width: '100%', height: '100%'}}>
                <div style={{width: '80%', margin: '0 auto', padding: '50px 0'}}>
                <Box display={'flex'} sx={{py:'30px'}} justifyContent={'space-between'}>
                <Box>
                <Box sx={{py: '10px', width: '300px'}}>
                  <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                    <img style={{width: '50px', borderRadius: '50%'}} src="./logo.png" alt="" />
                    <Typography sx={{color: 'white', fontWeight: '600'}} fontSize={'32px'} variant='h1'>WellNex</Typography>
                  </Box>
                  <Typography variant='body2' sx={{mt: '15px', color: 'white', height: '150%'}}>Welcome to Wellnex, where we prioritize your well-being and offer a holistic approach to healthcare. Explore our popular medical camps....</Typography>
                </Box>
                <Box display={'flex'} gap={'15px'} sx={{color: 'white', mt: '15px', mb: '20px'}}>
                    <FacebookIcon></FacebookIcon>
                    <InstagramIcon></InstagramIcon>
                    <TwitterIcon></TwitterIcon>
                    <GitHubIcon></GitHubIcon>
                </Box>
                </Box>
                <Box>
                    <h5 style={{color: 'white', fontSize: '18px', margin: '0 0'}}>Sitemap</h5>
                    <ul style={{listStyle: 'none', padding: '0', color: 'white'}}>
                        <li style={{padding: '10px 0'}}>Available Camps</li>
                        <li style={{padding: '10px 0'}}>Dashboard</li>
                        <li style={{padding: '10px 0'}}>Contact Us</li>
                        <li style={{padding: '10px 0'}}>Testimonials</li>
                    </ul>
                </Box>
                <Box>
                    <h5 style={{color: 'white', fontSize: '18px', margin: '0 0'}}>Services</h5>
                    <ul style={{listStyle: 'none', padding: '0', color: 'white'}}>
                        <li style={{padding: '10px 0'}}> Health Checkups</li>
                        <li style={{padding: '10px 0'}}> Wellness Programs</li>
                        <li style={{padding: '10px 0'}}>Medical Workshops</li>
                        <li style={{padding: '10px 0'}}>Telehealth Consultations</li>
                    </ul>
                </Box>
                <Box color={'red'} sx={{width: '300px'}}>
                    <h5 style={{color: 'white', fontSize: '18px', margin: '0 0', marginBottom: '15px'}}>Subscribe our newsletter</h5>
                    <Typography variant='body2' color={'white'}>Stay in the loop with our newsletter designed to uplift and empower you on your wellness journey. </Typography>
                    <input style={{width: '100%', padding: '15px 20px', fontSize: '16px', background: 'none', outline: 'none', borderColor:'white', borderRadius: '50px', marginTop: '20px', color: 'white', border: '2px solid white'}} type="email" name="" id="" placeholder='Enter your email' />
                </Box>
                </Box>
                <Divider style={{color: 'white', borderBottomColor: 'white'}}></Divider>
                <Box textAlign={'center'} color={'white'} mt={'20px'}>
                    <Typography>© ALL Right Reserved By Mursalin 2023</Typography>
                </Box>
                </div>
            </div>
        </div>
    );
};

export default Footer;