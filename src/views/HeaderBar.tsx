import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Switch from "@mui/material/Switch";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CompanyText from "./CompanyText";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Alert from "../components/Alert";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import useUserStore from "../stores/userStore";
import marketBus from "../common/bus/marketBus";
import { googleLogout } from '@react-oauth/google';
import { setUserAdmin } from "../common/services/userManager";

export default function HeaderBar({
  userName = "Default",
}: {
  userName: string | null;
}) {
  const navigate = useNavigate();

  const {reset} = useUserStore();
  
  const handleDisconnectUser = () => {
    sessionStorage.removeItem("user-storage");
    if(user?.google_credential) {
      googleLogout();
    }
    reset();
    navigate("/",{});
  };

  const { setUser, user } = useUserStore();
  function switchAdmin() {
    setUserAdmin(user,!user?.isAdmin);
    setUser({
      name: user?.name,
      isAdmin: !user?.isAdmin,
      userCakes: user?.userCakes,
    });
  }
  const openMarketDrawer = () => {
    marketBus.emit("open-market-drawer")
  }
  return (
    <Box className="header-my-space">
      <AppBar position="static">
        <Toolbar>
          <CompanyText />
          <div className="avatar-header-container">
            <div className="d-flex flex-column p-1 justify-content-center">
              Admin
              <Switch
                checked={user?.isAdmin}
                color="success"
                onChange={switchAdmin}
              />
            </div>

            <Divider orientation="vertical" flexItem />
            <div className="d-flex flex-column justify-space-content-between align-items-end gap-10">
              <div
                className="d-flex gap-2 flex-1"
                style={{ width: "max-content" }}
              >
                Salut
                <Box sx={{ color: "primary.main" }}>
                  {userName} {user?.isAdmin ? "(Admin)" : ""}
                </Box>
              </div>
              <Box
                onClick={handleDisconnectUser}
                sx={{
                  color: "primary.main",
                  fontSize: "0.7em",
                  cursor: "pointer",
                  width: "max-content",
                }}
              >
                Se deconnecter
              </Box>
            </div>
            <AccountCircle sx={{ fontSize: "40px" }} />
            <LocalGroceryStoreIcon className="icon-market" onClick={openMarketDrawer}  />
          </div>
        </Toolbar>
      </AppBar>

      <Alert
        stats={user?.isAdmin}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        direction="right"
      >
        <div>Admin Access gaved</div>
      </Alert>
    </Box>
  );
}
