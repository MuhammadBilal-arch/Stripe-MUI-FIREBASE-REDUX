import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useSignOutAccount } from "../../firebase/hooks/auth";

export const MenuAppBar = () => {
  const { user, isLogged } = useSelector((state) => state.User);

  const { onSignOut } = useSignOutAccount();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {user?.firstName + " " + user?.lastName}
          </Typography>
          <Button color="inherit" variant="outlined" onClick={onSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
