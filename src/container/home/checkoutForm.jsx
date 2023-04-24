import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import { FormControl, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { onShowToast } from "../../redux/slices/toast";

export const CheckoutForm = ({ clientSecret, onfetchCharges }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      console.error(error);
    } else {
      onfetchCharges();
      dispatch(
        onShowToast({
          type: "success",
          text: "You have successfully paid the amount.",
        })
      );
      console.log(paymentIntent);
    }
  };

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item sm="12" md="9">
          <FormControl
            style={{
              border: "1px solid #ced4da",
              borderRadius: "4px",
              padding: "10px 12px",
              boxShadow: "inset 0px 1px 1px rgba(0, 0, 0, 0.075)",
              fontSize: "16px",
              color: "#495057",
              background: "#fff",
              lineHeight: "1.5",
              height: "40px",
              width: "100%",
              boxSizing: "border-box",
              marginRight: "10px",
            }}
          >
            <CardElement />
          </FormControl>
        </Grid>
        <Grid item sm="12" md="3">
          <Button type="submit" variant="contained">
            Pay Now
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
