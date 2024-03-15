import { CakeEditManagerType } from "../types/components";
import InputBar from "./InputBar";
import InputAdornment from "@mui/material/InputAdornment";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EuroIcon from "@mui/icons-material/Euro";
import Button from "./Button";
// import Alert from './Alert';

import { CakeFormType } from "../types/cakes";

import useCakeStore from "../stores/cakeStore";
import useUserStore from "../stores/userStore";
import { useState } from "react";
import { isImage } from "../common/helpers/url";
import { Box } from "@mui/material";
import editBoxEmit from "../common/bus/editBoxBus";

export default function CakeEditManager({
  cake,
  ...rest
}: CakeEditManagerType) {
  const [cakeForm, setCakeForm] = useState<CakeFormType>({
    name: cake?.title || "",
    picture: cake?.imageSource || "",
    price: cake?.price || 0,
  });

  const setFormCake = ({ name, picture, price }: CakeFormType) => {
    const newCakeData = { ...cakeForm };

    if (name?.length || 0 >= 0) newCakeData.name = name;

    console.log(" newCakeData.name : ",  newCakeData.name)

    if (picture) {
      if (isImage(picture)) newCakeData.picture = picture;
      else
        newCakeData.picture =
          "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg";
    }

    newCakeData.price = price;

    setCakeForm(newCakeData);
  };

  const { modifyCake } = useCakeStore();

  const  userModifyCake  = useUserStore().modifyCake;
  
  const editCake = () => {
    const cakeId = cake?.id;
    if (cakeId) {
      modifyCake(cakeId, {
        imageSource: cakeForm.picture,
        title: cakeForm.name,
        price: cakeForm.price,
        quantity: 1,
        isAvailable: true,
        isAdvertised: false,
      });

      userModifyCake(cake.title, {
        imageSource: cakeForm.picture,
        title: cakeForm.name,
        price: cakeForm.price,
        quantity: 1,
        isAvailable: true,
        isAdvertised: false,
      });
      editBoxEmit.emit("open-edit-cake", {close:true})
    }
  };

  return (
    <div {...rest} className="w-100 h-100">
      <Box sx={{ display: !cake ? "inherit" : "none" }} className="w-100 h-100">
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <h2 className="Caveat-Bold text-white">Take cake to edit it</h2>
        </div>
      </Box>
      <Box sx={{ display: !cake ? "none" : "inherit" }}>
        <div className="cake-manager-container d-flex justify-content-evenly gap-5">
          <img
            className="cake-manager-img-preview"
            src={cakeForm.picture}
          ></img>
          <div className="cake-manager-form d-flex flex-column w-100 gap-3">
            <InputBar
              placeholder="Cake name..."
              className="w-100"
              value={cakeForm.name}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setFormCake({ name: value.target.value })
              }
              id="filled-basic"
              label="Name"
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalGroceryStoreIcon />
                  </InputAdornment>
                ),
              }}
            />

            <InputBar
              placeholder="Cake image url..."
              className="w-100"
              value={cakeForm.picture}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setFormCake({ picture: value.target.value })
              }
              id="filled-basic"
              label="Picture"
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CameraAltIcon />
                  </InputAdornment>
                ),
              }}
            />

            <InputBar
              placeholder="Cake price..."
              className="w-100"
              type="number"
              value={cakeForm?.price}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setFormCake({ price: parseInt(value.target.value) })
              }
              id="filled-basic"
              label="Price"
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EuroIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className="w-100 d-flex justify-content-end">
              <Button variant="contained" onClick={editCake}>
                Edit cake
              </Button>
            </div>
          </div>
        </div>
      </Box>
      {/* <Alert
      stats={alertUser}
      severity={"error"}
      anchorOrigin={{ vertical:"bottom", horizontal:"right" }}
      direction="right"
       >
        <div>Successfully added</div>
       </Alert> */}
    </div>
  );
}
