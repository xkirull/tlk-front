import { Box, SwipeableDrawer, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

import css from "./style.module.css";
import ContentOfCard from "./content";

const Puller = styled(Box)(({ theme }) => ({
  width: 60,
  height: 3,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 4,
  position: "absolute",
  top: 8,
  left: "calc(50%)",
  transform: "translateX(-50%)",
}));

function DrawerElement(props) {
  const { setStatusDialog, isOpen } = props;

  const toggleDrawer = (newOpen) => () => {
    setStatusDialog(newOpen);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen
        PaperProps={{
          sx: {
            borderRadius: "12px 12px 0 0",
          },
          className: css.drawer,
        }}
      >
        <Box sx={{ maxHeight: "80vh", overflowY: ")scroll" }}>
          <Puller />
          <Box
            role="presentation"
            sx={{ marginTop: "20px", padding: "20px 8px 40px" }}
          >
            <ContentOfCard {...props} />
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default DrawerElement;
