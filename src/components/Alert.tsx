import { TransitionProps } from "../types/components";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { AlertType } from "../types/components";
import { FVoidBody } from "../types/functions";
import * as AAlert from "@mui/material/Alert";
import { keyUID } from "../common/helpers/random";
import * as React from "react";

export default function Alert(props: AlertType) {
  const {
    stats,
    children,
    handleClose = FVoidBody,
    autoHideDuration = 3000,
    ...rest
  }: AlertType = props;

  if (!stats) return <></>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [_stats, setStats] = React.useState<boolean | undefined>(true);

  const _handleClose = (_: unknown, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setStats(false);
    handleClose();
  };

  function transition(props: TransitionProps) {
    return <Slide {...props} {...rest} />;
  }

  return (
    <Snackbar
      className="mui-alert"
      open={_stats}
      hidden={!_stats}
      onClose={_handleClose}
      TransitionComponent={transition}
      key={keyUID()}
      autoHideDuration={autoHideDuration}
      action={null}
      {...rest}
    >
      <AAlert.default onClose={() => {}} sx={{ width: "100%" }} {...rest}>
        {children}
      </AAlert.default>
    </Snackbar>
  );
}
