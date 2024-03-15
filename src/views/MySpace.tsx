import { useSearchParams } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import { Outlet } from "react-router-dom";
import Card from "@mui/material/Card";
import { useEffect } from "react";
import { Redirect } from "../common/helpers/url";
import useUserStore from "../stores/userStore";
export default function MySpace() {
  const [queryParams] = useSearchParams();
  const userName = queryParams.get("user");
  const { setUser, user,reset } = useUserStore();
  if (!userName || user?.name===null) {
    reset();
     return  <Redirect to="/" />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (userName !== user?.name) {
      setUser({ name: userName, isAdmin: false, userCakes: [] });
    } else {
      setUser({
        name: userName,
        isAdmin: user?.isAdmin || false,
        userCakes: user?.userCakes,
      });
    }
  }, []);

  return (
    <>
      <div className="my-space-container">
        <HeaderBar userName={userName} />
        <Card
          className="router-view-container position-relative"
          sx={{ flexGrow: 1 }}
        >
          <Outlet />
        </Card>
      </div>
    </>
  );
}
