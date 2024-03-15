import IconButton from "@mui/material/IconButton";
import * as Icons from "@mui/icons-material/";
import { IconBpType } from "../types/components";
import { Icon } from "@mui/material";

import { FVoidBody } from "../types/functions";

import { hasOwnProperty, getPropertyValue } from "../common/helpers/object";

export default function IconBp({
  iconName = "Info",
  onClick = FVoidBody,
  ...rest
}: IconBpType) {
  let icon = Icons.Info;

  if (hasOwnProperty(Icons, iconName)) {
    icon = getPropertyValue(Icons, iconName);
  }

  return (
    <div className={`${rest.className || ""} w-100 h-100 icon-bp`}>
      <IconButton {...rest} onClick={(): void => onClick()}>
        <Icon component={icon} />
      </IconButton>
    </div>
  );
}
