import { cakesMock } from "../common/mocks/mocks";
import CakeCard from "../components/CakeCard";
import { useEffect, useState } from "react";
import useCakeStore from "../stores/cakeStore";
import EditBox from "../components/EditBox";
import useUserStore from "../stores/userStore";
import Drawer from '@mui/material/Drawer';

import {
  generateRandomWord,
  generateRandomNumber,
  keyUID,
} from "../common/helpers/random";
import Button from "../components/Button";
import { CakeType } from "../types/cakes";
import { Box } from "@mui/material";
import { formatPrice } from "../common/helpers/formats";
import marketBus from "../common/bus/marketBus";

export default function CakesShop() {
  const { cakes, setCakes, addCake } = useCakeStore();
  const [ marketDrawer, setMarketDrawer] = useState(false)
  const { user } = useUserStore();

  const generateCake = () => {
    const fakeCake: CakeType = {
      id: (cakes?.length || 0) + 1,
      title: generateRandomWord(),
      price: generateRandomNumber(50, 500),
      imageSource:
        "https://thumbs.dreamstime.com/b/happy-cat-closeup-portrait-funny-smile-cardboard-young-blue-background-102078702.jpg",
      quantity: 1,
      isAvailable: true,
      isAdvertised: false,
    };
    addCake(fakeCake);
  };

  useEffect(() => {
    if ((cakes?.length || 0) <= 0) {
      setCakes(cakesMock);
    }

    marketBus.on("open-market-drawer", ()=> {
      setMarketDrawer(true);
    })
  }, []);

  const onDrawerClose = ()=> {
    setMarketDrawer(false);
  }

  const isEmptryCakes = (): string => {
    const cakeLength = cakes?.length || 0;
    const userCakesLength = user?.userCakes?.length || 0;
    return cakeLength <= 0 && userCakesLength <= 0 ? "inherit" : "none";
  };

  function groupUserMarket(): (CakeType & { stock:number})[] | undefined {
    return user?.userCakes?.reduce<(CakeType & { stock:number})[]>((cakeAcc,currentCake): (CakeType & { stock:number})[] => {

      const index = cakeAcc?.findIndex((cake)=> cake.title===currentCake.title)
      if( index >= 0) {
        cakeAcc[index].stock += 1
      }else {
        cakeAcc.push({...currentCake,stock:1})
      }
      return cakeAcc;
       
  }, [])
  }
  
  return (
    <div className="cakes-shop">
       <Drawer
            anchor={"left"}
            open={marketDrawer}
            onClose={onDrawerClose}
          >
           <Box sx={{ width: "325px"}} className="h-100 pb-3">
            <Box  sx={{ "background": "rgba(15,15,15,0.5)"}}  className="w-100 d-flex justify-content-between p-3">
               <h3 className="Caveat-Bold">Total : </h3>
               <h3 className="Caveat-Bold">{ formatPrice(user?.userCakes?.reduce<number>((a,b)=> a+(b?.price||0),0))}</h3>
            </Box>
            <Box className="w-100 h-100 Caveat-Bold" sx={{ "display": user?.userCakes?.length || 0 > 0 ? "none" : "inherit"}}>
              <h2 className="w-100 h-100 d-flex align-items-center justify-content-center">
                Votre commande est vide
              </h2>
              </Box>
              <div className="w-100 h-100 d-flex flex-column mt-3 align-items-center gap-3 overflow-scroll pb-4">
              {groupUserMarket()?.map((cake)=>  <CakeCard
          isUser={true}
          className="user-cakes-stored"
          cakeData={cake}
          stock={cake.stock}
          key={keyUID()}
        />) }
              
      </div>
           </Box>
          </Drawer>

      {cakes?.map((cake) => <CakeCard cakeData={cake} key={keyUID()} />)}
      <div className="w-100 h-100" style={{ display: isEmptryCakes() }}>
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <h1 className="Caveat-Bold" hidden={user?.isAdmin}>
            Aucun produit trouvé
          </h1>
          <div hidden={!user?.isAdmin}>
            <h1 className="Caveat-Bold">Aucun produit disponible</h1>
            <Button variant="contained" onClick={generateCake}>
              Générer un cake
            </Button>
          </div>
        </div>
      </div>
      <EditBox hidden={!user?.isAdmin} />
    </div>
  );
}
