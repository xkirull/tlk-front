import { isMobile } from "@/shared/isMobile";
import CardElement from "./card";
import DrawerElement from "./drawer";
import PopupElement from "./popup";
import { useState } from "react";

function ContentElement(props) {
  const [dialogIsOpen, setDialogOpen] = useState(false);

  const dialogProps = {
    setStatusDialog: setDialogOpen,
    isOpen: dialogIsOpen,
  };

  return (
    <>
      <CardElement setStatusDialog={setDialogOpen} {...props} />
      {isMobile() ? (
        <DrawerElement {...dialogProps} {...props} />
      ) : (
        <PopupElement {...dialogProps} {...props} />
      )}
    </>
  );
}

export default ContentElement;
