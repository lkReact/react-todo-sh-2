import { useEffect, useState } from "react";
import InputBar from "../components/InputBar";
import Button from "../components/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate, createSearchParams } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
// import {  useParams } from "react-router-dom";
import "../scss/App.scss";
import Title from "../components/Title";
import { createUser, getUser } from "../common/services/userManager";
import useUserStore from "../stores/userStore";
import { jwtDecode } from "jwt-decode";
import { Google2AuthCredentialType, Google2AuthCredentialResponseType} from "../types/stores";

function App() {
  const navigate = useNavigate();
  const googleFailedLogin=():void => {
       alert("Google login failed !")
  };

  const { user, setUser } = useUserStore();

  const createAccountGoogle = async (credentialResponse:Google2AuthCredentialResponseType): Promise<void> => {
    if(credentialResponse?.credential===null) {
        return googleFailedLogin();
    }

    const  googleCrednetial: Google2AuthCredentialType= jwtDecode(credentialResponse.credential);
    const userdDb = await getUser(googleCrednetial.name);
    if(userdDb?.name) {
      setUser(userdDb);
     }else if (userName !== user?.name) {
      await createUser(googleCrednetial.name,googleCrednetial);
    } 

    const path = {
      pathname: `/my-space/cakes`,
      search: createSearchParams({
        user: googleCrednetial.name,
      }).toString(),
    };
    navigate(path);

  }

  useEffect(() => {
    if (user?.name) {
      const path = {
        pathname: `/my-space/cakes`,
        search: createSearchParams({
          user: user.name,
        }).toString(),
      };
      return navigate(path);
    }
  }, []);

  const [userName, setUserName] = useState<string>("");
  const handleInputChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(input?.target.value);
  };
  const hOpenDialog = async () => {
    if (userName.length <= 0) return;

    const glUserName = userName.replace(/[^\w\s]/gi, ' ');

     const userdDb = await getUser(glUserName);

     if(userdDb?.name) {
      setUser(userdDb);
     }else if (glUserName !== user?.name) {
      await createUser(glUserName);
    } 
    const path = {
      pathname: `/my-space/cakes`,
      search: createSearchParams({
        user: glUserName,
      }).toString(),
    };
    navigate(path);
  };

  return (
    <div className="main">
      <div className="main-content">
        <Title />
        <Divider className="login-divider" />
        <h3 className="candy-text">Connecter-vous</h3>
        <div className="connect-container">
          <InputBar
            placeholder="Enter your name..."
            className="w-100"
            onChange={handleInputChange}
            id="filled-basic"
            label="Name"
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <div className="w-100 login-button d-flex flex-column align-items-end gap-3">
            <Button variant="contained" onClick={() => hOpenDialog()}>
              <div>My Space</div>
            </Button>
            <GoogleLogin
  onSuccess={createAccountGoogle}
  onError={googleFailedLogin}
/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
