import { CakeType } from "../types/cakes";
import Card from "@mui/material/Card";
import { formatPrice } from "../common/helpers/formats";
import Button from "./Button";
import useCakeStore from "../stores/cakeStore";
import useUserStore from "../stores/userStore";
import IconBp from "./IconBp";
import { Box } from "@mui/material";
import editBoxEmit from "../common/bus/editBoxBus";

export default function CakeCard({
  cakeData,
  className,
  stock=1,
  isUser = false,
}: {
  cakeData: CakeType | null;
  isUser?: boolean;
  stock?: number
  [key: string]: unknown;
}) {
  const { removeCakeById } = useCakeStore();
  const { user, addUserCake, removeUserCakeById,removeUserCakeByName } = useUserStore();

  const removeCake = (): void => {
    if (!isUser) {
      removeCakeById(cakeData?.id);
      removeUserCakeByName(cakeData?.title);
    } else if (isUser) {
      removeUserCakeById(cakeData?.id);
    }
  };

  const addNewUserCake = () => {
    if (cakeData) {
      addUserCake(cakeData);
    }
  };

  const editCake = () => {
    editBoxEmit.emit("open-edit-cake", { cake: cakeData });
  };

  const canDeleteCakeCard = (): boolean => {
    return (user?.isAdmin ? !user?.isAdmin : !isUser) as boolean;
  };

  return (
    <Card
      className={`${className} card-cake`}
      variant="outlined"
      sx={{ width: "215px", height: "310px" }}
    >
      <div hidden={canDeleteCakeCard()} className="w-100">
        <IconBp
          iconName="Cancel"
          className="d-flex justify-content-end align-items-start"
          onClick={() => removeCake()}
        />
      </div>
      <img src={cakeData?.imageSource}></img>
      <div className="description-cakes">
        <h3>{cakeData?.title}</h3>
        <div className="cakes-price-add-container d-flex align-items-center justify-content-around w-100">
          {formatPrice(cakeData?.price)}
          <Box sx={{ display: isUser ? "none" : "inherit" }}>
            <div className="d-flex gap-3 w-100" >
            <Button variant="outlined" onClick={addNewUserCake}>
              Add
            </Button>
            <Button sx={{ display: user?.isAdmin ? "inherit" : "none"}} variant="outlined" onClick={editCake}>
              Edit
            </Button>
            </div>
          </Box>
          <Box sx={{ display: isUser ? "inherit" : "none" }}>
            x{stock}
          </Box>
        </div>
      </div>
    </Card>
  );
}
