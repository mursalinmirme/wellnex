import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
const stripePromise = loadStripe(import.meta.env.VITE_STRIP_SECRET);

const PaymentPage = () => {
    const axiosSecure = useAxiosSecure();
    const params = useParams();
    const {data: paymentInfo={}, refetch} = useQuery({
        queryKey: ['paymentDetails'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/cart-camp-details/${params?.id}`);
            return await result.data;
        }
    })
console.log(paymentInfo);
    return (
        <div style={{ }}>
        <Box>
            <Typography sx={{textAlign: 'center', fontWeight: '600', margin: '30px 0', fontSize: '28px'}} variant='h5'>Make your Payment</Typography>
              <Typography fontSize={'25px'} color={'#33415c'} textAlign={'center'} fontWeight={'600'}>Pay For: {paymentInfo?.campInfo?.camp_name}</Typography>
              <Typography sx={{marginTop: '10px'}} color={'#33415c'} fontSize={'24px'} textAlign={'center'} fontWeight={'600'}>Fee: {paymentInfo?.fees}</Typography>
        </Box>
        <Box>
        <Elements stripe={stripePromise}>
          <CheckoutForm camp_name={paymentInfo?.campInfo?.camp_name} camp_id={paymentInfo?._id} scheduled_date_time={paymentInfo?.campInfo?.scheduled_date_time} venue_location={paymentInfo?.campInfo?.venue_location} camp_fees={paymentInfo?.campInfo?.camp_fees} payment_status={paymentInfo?.payment_status} refetch={refetch} />
        </Elements>
        </Box>
        </div>
    );
};

export default PaymentPage;