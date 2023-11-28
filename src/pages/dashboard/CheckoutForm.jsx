import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import './dashboardComponent/CheckoutForm.css';
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import CircularProgress from '@mui/material/CircularProgress';
import Swal from "sweetalert2";
import { Tune } from "@mui/icons-material";
const CheckoutForm = ({camp_name, scheduled_date_time, venue_location, camp_fees, camp_id, payment_status, refetch}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [price, setPrice] = useState(parseInt(camp_fees) || 20);//optional used for save to crash if user reload in the payment page
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false)
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

const {data: clientSecret} = useQuery({
    queryKey: ['makePayment'],
    queryFn: async () => {
        const result = await axiosSecure.post('/create-payment-intent', {price: price});
        return result.data.clientSecret;
    }
})
console.log('I got pt', clientSecret);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setPaymentLoading(true);
    if (!stripe || !elements) {
      setPaymentLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setPaymentLoading(false);
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setPaymentLoading(false);
      setErrorMsg(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
     // confirem payment 
    const {paymentIntent, error:confiremError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: 'mywebhosting.com@gmail.com',
        },
      },
  })
  if(confiremError){
    console.log('confirem error', confiremError);
    toast.error(confiremError.message)
    setPaymentLoading(false);
  }
  if(paymentIntent){
    console.log('confirm success', paymentIntent);
    setSuccessMsg(paymentIntent.id)

    const payment = {
      camp_name,
      scheduled_date_time,
      venue_location,
      camp_fees,
      payment_status: 'Paid',
      confirmation: 'Confirmed',
      paymentUser: user?.email,
      camp_id,
      date: new Date(),

    }
   const paymentReq = await axiosSecure.post('/payments', payment);
   console.log('Paymetn status is ', paymentReq.data);
   const updateCampsPaymentStatus = await axiosSecure.patch(`/update_reg_camps_payment_status/${camp_id}`);
   console.log('Payment update operation is', updateCampsPaymentStatus);
   if(updateCampsPaymentStatus.data.updateSuccessfully === "success"){
    refetch();
    setPaymentLoading(false);
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Successfully",
        text: `transaction ID: ${paymentIntent.id}`,
        showConfirmButton: false,
        timer: 4000
      });
   }
  }
  };

  return (
    <form style={{width: '60%', margin: '0 auto', marginTop: '70px'}} onSubmit={handleSubmit}>
      <CardElement
      className="checkoutInput"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button disabled={payment_status === 'paid' ? true : false} variant="contained" style={{width: '100%', padding: '8px', fontSize: '18px', color: 'white', fontWeight: '600', marginTop:'30px'}} type="submit">
        {paymentLoading ? <CircularProgress style={{color: 'white'}}></CircularProgress> : 'Pay'}
      </Button>
    </form>
  );
};
export default CheckoutForm;