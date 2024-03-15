import { Box } from "@mui/material";
import IconBp from "./IconBp";
import { useEffect, useState } from "react";

import Tabs from "../components/Tab";
import CakeManager from "./CakeManager";
import editBoxEmit from "../common/bus/editBoxBus";
import { CakeType } from "../types/cakes";

import { CakeBusType } from "../types/cakes";
import CakeEditManager from "./CakeEditManager";

export default function EditBox({ ...rest }) {
  const [statsBox, setStatsBox] = useState<boolean>(false);
  const defaultActiveTab = useState<number>(0);
  const [cakesToEdit, setCakesToEdit] = useState<CakeType | null>(null);
  const tabs = ["Add Cake", "Modify Cake"];

  const onChangeTab = () => {
    const tabContainer = document.getElementsByClassName("edit-cake-box ")?.[0];

    if (tabContainer) {
      if (!statsBox) {
        setStatsBox(true);
        (tabContainer as HTMLElement).style.height = "335px";
      }
    }
  };

  useEffect(() => {
    editBoxEmit.on("open-edit-cake", (busProps): void => {
      const forceTyped = busProps as CakeBusType | null;
      const focredIsClsoed = busProps as { close: boolean | null}

      const tabContainer =
        document.getElementsByClassName("edit-cake-box ")?.[0];

      if (tabContainer) {
        if (!statsBox) {
          if(forceTyped) {
          setCakesToEdit(forceTyped.cake);
          }
          if(!focredIsClsoed.close) {
          setStatsBox(true);
          defaultActiveTab[1](1);
          (tabContainer as HTMLElement).style.height = "335px";
          }else if(focredIsClsoed.close) {
            setStatsBox(false);
            (tabContainer as HTMLElement).style.height = "0px";
          }
        }
      }
    });
  }, []);

  const handleStatsBox = () => {
    setStatsBox(!statsBox);

    const tabContainer = document.getElementsByClassName("edit-cake-box ")?.[0];

    if (tabContainer) {
      if (statsBox) {
        (tabContainer as HTMLElement).style.height = "0px";
        setCakesToEdit(null);
      }

      if (!statsBox) {
        (tabContainer as HTMLElement).style.height = "335px";
      }
    }
  };

  return (
    <Box
      className="edit-cake-box position-absolute"
      sx={{ "justify-content": statsBox ? "start" : "end" }}
      {...rest}
    >
      <div className="edit-cake-box-tools d-flex">
        <IconBp
          iconName={statsBox ? "KeyboardArrowDown" : "KeyboardArrowUp"}
          onClick={() => handleStatsBox()}
        ></IconBp>
        <Tabs
          defaultTab={defaultActiveTab}
          value={1}
          tabs={tabs}
          baseName="edit-box"
          onTabClick={onChangeTab}
        >
          <CakeManager />
          <CakeEditManager cake={cakesToEdit} />
        </Tabs>
      </div>
    </Box>
  );
}
