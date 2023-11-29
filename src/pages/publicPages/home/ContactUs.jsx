import { Box, Button, Paper, TextField, TextareaAutosize, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';

const ContactUs = () => {
    return (
        <div>
        <Helmet>
          <title>Wellnex | Contact Us</title>
        </Helmet>
            <div>
                
                <Box mb={'50px'}>
                    <Typography textAlign={'center'} fontSize={'32px'} fontWeight={'600'} paddingTop={'30px'}>Contact Us</Typography>
                    <Typography textAlign={'center'} variant='body2' mt={'10px'}>Your healthy is Our Happiness </Typography>
                    <Box width={'70%'} pt={'50px'} margin={'0 auto'}> 
                    <Paper sx={{padding: '20px'}}>
                    <Typography py={'30px'} textAlign={'center'} fontSize={'24px'} fontWeight={'600'}>Our Contact Information</Typography>
                    <Typography sx={{color: '#33415c'}} fontSize={'24px'} fontWeight={'600'}>Email: wellnex@gmail.com</Typography>
                    <Typography sx={{color: '#33415c'}} mt={'20px'} fontWeight={'600'} fontSize={'24px'}>Phone: 01746570521</Typography>
                    <Typography sx={{color: '#33415c'}} mt={'20px'} fontWeight={'600'} fontSize={'24px'}>Address: Bhanga, Faridpur </Typography>
                    </Paper>
                    </Box>
                    <Box width={'70%'} pt={'50px'} margin={'0 auto'}>
                    <form action="">
                        <Typography textAlign={'center'} fontSize={'24px'} fontWeight={600}>Send Us a Feedback To Improve Our Service</Typography>
                        <Box sx={{marginTop: '30px'}}>
                          <Box display={'flex'} gap={'20px'} alignItems={'center'} justifyContent={'center'}>
                          <Box flex={1}>
                          <TextField style={{background: 'rgba(1,10,15,0.0887605042016807', border: 'none', outline: 'none'}} fullWidth role='Name' label="Name"></TextField>
                          </Box>
                          <Box flex={1}>
                          <TextField style={{background: 'rgba(1,10,15,0.0887605042016807'}} fullWidth role='Your Email' label="Your Email"></TextField>
                          </Box>
                          </Box>
                          <TextField style={{marginTop: '30px', background: 'rgba(1,10,15,0.0887605042016807'}} fullWidth role='Your Email' label="Subject"></TextField>
                          <TextareaAutosize style={{marginTop: '30px', background: 'rgba(1,10,15,0.0887605042016807', width: '100%', resize: 'none', border: 'none', padding: '10px', fontWeight: '500', fontSize: '18px'}} minRows={5} placeholder='Type Message...' />
                          <Button variant='contained' fullWidth sx={{marginTop: '20px', padding: '14px 0'}}>Submit</Button>
                        </Box>
                    </form>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default ContactUs;