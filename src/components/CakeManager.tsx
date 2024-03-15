import { CakeManagerType } from "../types/components";
import InputBar from "./InputBar";
import InputAdornment from "@mui/material/InputAdornment";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EuroIcon from "@mui/icons-material/Euro";
import Button from "./Button";
// import Alert from './Alert';

import { CakeFormType } from "../types/cakes";

import useCakesStore from "../stores/cakeStore";
import { useState } from "react";
import { isImage } from "../common/helpers/url";

export default function CakeManager(
  event: unknown,
  { ...rest }: CakeManagerType,
) {
  const [cakeForm, setCakeForm] = useState<CakeFormType>({
    name: "",
    picture: "",
    price: 0,
  });

  const clearForm = () => {
    cakeForm.name = "";
    cakeForm.picture = "";
    cakeForm.price = 0;
  };

  const setFormCake = ({ name, picture, price }: CakeFormType) => {
    const newCakeData = { ...cakeForm };

    if (name) newCakeData.name = name;

    if (picture) {
      if (isImage(picture)) newCakeData.picture = picture;
      else
        newCakeData.picture =
          "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg";
    }

    if (price) newCakeData.price = price;

    setCakeForm(newCakeData);
    clearForm();
  };

  const { addCake, cakes } = useCakesStore();

  const addNewCake = () => {
    addCake({
      id: (cakes?.length || 0) + 1,
      imageSource: cakeForm.picture,
      title: cakeForm.name,
      price: cakeForm.price,
      quantity: 1,
      isAvailable: true,
      isAdvertised: false,
    });
  };

  return (
    <div
      className="cake-manager-container d-flex justify-content-evenly gap-5"
      {...rest}
    >
      <img className="cake-manager-img-preview" src={cakeForm.picture}></img>
      <div className="cake-manager-form d-flex flex-column w-100 gap-3">
        <InputBar
          placeholder="Cake name..."
          className="w-100"
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
          <Button variant="contained" onClick={addNewCake}>
            Add new cake
          </Button>
        </div>
      </div>
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
