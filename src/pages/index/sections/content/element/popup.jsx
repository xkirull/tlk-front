import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentOfCard from "./content";

function PopupElement(props) {
  const { setStatusDialog, isOpen } = props;

  const togglePopup = (newOpen) => () => {
    setStatusDialog(newOpen);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={togglePopup(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>
          {props.title}
          <IconButton
            aria-label="close"
            onClick={togglePopup(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" tabIndex={-1}>
            <ContentOfCard {...props} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PopupElement;
