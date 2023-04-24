import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useCreateAccount, useSignInAccount } from "../../firebase/hooks/auth";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export const Auth = () => {
  const { onSignIn } = useSignInAccount();
  const { onCreateNewAccount } = useCreateAccount();
  const [page, setpage] = useState("SIGN_IN");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("Email address Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters required.")
        .max(12, "Maximum 12 characters.")
        .required("Password Required"),
    }),
    onSubmit: async (values) => {
      onSignIn(values.email, values.password);
    },
  });

  const rformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      email: Yup.string()
        .email("Invalid Email")
        .required("Email address Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters required.")
        .max(12, "Maximum 12 characters.")
        .required("Password Required"),
    }),
    onSubmit: async (values) => {
      onCreateNewAccount(values);
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?cs=srgb&dl=pexels-designecologist-1779487.jpg&fm=jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {page === "SIGN_IN" ? "Login" : "Register"}
          </Typography>
          {page === "SIGN_IN" ? (
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.email}
                error={formik?.errors?.email && formik?.touched?.email}
                helperText={formik?.touched?.email && formik?.errors?.email}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.password}
                error={formik?.errors?.password && formik?.touched?.password}
                helperText={
                  formik?.touched?.password && formik?.errors?.password
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => setpage("SIGN_UP")}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box
              component="form"
              noValidate
              onSubmit={rformik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={rformik?.handleChange}
                    onBlur={rformik?.handleBlur}
                    value={rformik?.values?.firstName}
                    error={
                      rformik?.errors?.firstName && rformik?.touched?.firstName
                    }
                    helperText={
                      rformik?.touched?.firstName && rformik?.errors?.firstName
                    }
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={rformik?.handleChange}
                    onBlur={rformik?.handleBlur}
                    value={rformik?.values?.lastName}
                    error={
                      rformik?.errors?.lastName && rformik?.touched?.lastName
                    }
                    helperText={
                      rformik?.touched?.lastName && rformik?.errors?.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={rformik?.handleChange}
                    onBlur={rformik?.handleBlur}
                    value={rformik?.values?.email}
                    error={rformik?.errors?.email && rformik?.touched?.email}
                    helperText={
                      rformik?.touched?.email && rformik?.errors?.email
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={rformik?.handleChange}
                    onBlur={rformik?.handleBlur}
                    value={rformik?.values?.password}
                    error={
                      rformik?.errors?.password && rformik?.touched?.password
                    }
                    helperText={
                      rformik?.touched?.password && rformik?.errors?.password
                    }
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => setpage("SIGN_IN")}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
