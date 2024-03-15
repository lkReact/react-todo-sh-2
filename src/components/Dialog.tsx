import * as TDialog from "@mui/material/Dialog";
import { DialogType } from "../types/components";
import { FVoidBody } from "../types/functions";

export default function Diloag({
  children,
  stats,
  handleBeforeOpen = FVoidBody,
  handleClose = FVoidBody,
  ...rest
}: DialogType) {
  const isOpen = stats;

  const [ishOpen, setIhsOpen] = stats;

  if (isOpen) {
    handleBeforeOpen();
  }

  const _handleClose = () => {
    setIhsOpen(false);
    handleClose();
  };

  return (
    <TDialog.default open={ishOpen} {...rest} onClose={_handleClose}>
      {children}
    </TDialog.default>
  );
}
