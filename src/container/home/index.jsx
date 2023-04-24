import { Layout } from "../../components/layout";
import React, { useState, useEffect } from "react";
import Stripe from "stripe";
import { CheckoutForm } from "./checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

// THIS IS SECRET KEY
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
// THIS IS PUBLIC KEY
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const Home = () => {
  const [charges, setCharges] = useState([]);
  const [confirmPayment, setconfirmPayment] = useState(false);
  const [clientSecret, setclientSecret] = useState("");
  const { user } = useSelector((state) => state.User);

  useEffect(() => {
    fetchCharges();
  }, []);

  const fetchCharges = async () => {
    const chargeList = await stripe.charges.list();
    setCharges(chargeList.data);
    setconfirmPayment(false);
  };
  function centsToUSD(cents) {
    return (cents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  const createPaymentIntent = async (amount) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        description: "Check bill payment",
        metadata: {
          order_id: "12345",
          customer_name: "John Doe",
          email: "john.doe@example.com",
        },
      });
      return paymentIntent.client_secret;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const clientSecret = await createPaymentIntent(event.target[0].value);
    setclientSecret(clientSecret);
    setconfirmPayment(!confirmPayment);
    // Call the Stripe API to complete the payment
  };

  return (
    <Layout>
      <Box sx={{ p: [5] }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {confirmPayment ? (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  clientSecret={clientSecret}
                  onfetchCharges={fetchCharges}
                />
              </Elements>
            ) : (
              <form
                style={{ display: "flex", marginBottom: "5px" }}
                onSubmit={handleSubmit}
              >
                <TextField
                  id="Amount"
                  label="Enter amount"
                  variant="outlined"
                  size="small"
                  name="amount"
                  type="number"
                  min={100}
                  max={10000}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ ml: 1 }}
                >
                  Submit
                </Button>
              </form>
            )}
            <Typography variant="h4">Payment History</Typography>
            <List>
              {charges.map((charge) => (
                <ListItem disablePadding key={charge.id}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "12px" }}
                    primary={`${centsToUSD(
                      charge.amount
                    )} ${charge?.currency.toUpperCase()} ${
                      charge?.description
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Profile Details</Typography>

            <Grid container sx={{ mt: 1 }} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="large"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  value={user?.firstName}
                  id="firstName"
                  label="First Name"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="large"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={user?.lastName}
                  autoComplete="family-name"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="large"
                  required
                  fullWidth
                  id="email"
                  value={user?.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};
