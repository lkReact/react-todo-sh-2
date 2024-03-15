import * as TTab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

import { TabsType, TabPaneType } from "../types/components";
import { FVoidBody } from "../types/functions";

import { keyUID } from "../common/helpers/random";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPane({ children, baseName, value, index, ...rest }: TabPaneType) {
  return (
    <div
      className={`tab-pane-${baseName} w-100 h-100`}
      hidden={value !== index}
      id={`tab-pane-${baseName}-${index}`}
      {...rest}
    >
      {value === index && (
        <div id="tab-pane-content" className="w-100 h-100">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Tab({
  tabs,
  children,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  defaultTab = React.useState<number>(0),
  onChange = FVoidBody,
  onTabClick = FVoidBody,
  baseName = "default",
}: TabsType) {
  const [value, setValue] = defaultTab;

  const handleChange = (event: unknown, newValue: number) => {
    event as void;

    setValue(newValue);

    onChange();
  };

  const tabPane = Array.isArray(children) ? children : [children];

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          className={`tab-${baseName} w-100 h-100`}
        >
          {tabs.map((tab, tabIndex) => (
            <TTab.default
              key={keyUID()}
              label={tab}
              {...a11yProps(tabIndex)}
              onClick={onTabClick}
            />
          ))}
        </Tabs>
        <Box className={`tab-${baseName}-container`}>
          {tabPane.map((pane, index) => (
            <TabPane
              key={keyUID()}
              children={pane as React.ReactNode}
              value={value}
              index={index}
              baseName={baseName}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
