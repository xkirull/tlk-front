import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

const drawerWidth = 240;
const navItems = [
  { title: "Статьи", href: "/" },
  { title: "Выход", href: "/" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      target: window || undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {navItems.map(({ title, href }) => (
          <ListItem key={title} disablePadding>
            <ListItemButton href={href} sx={{ textAlign: "center" }}>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* <HideOnScroll> */}
      <AppBar component="nav">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ ml: 1, display: { xs: "block", sm: "block" } }}
            variant="h6"
            component="div"
          >
            <Link color="white" underline="none" href="/">
              Social App
            </Link>
          </Typography>

          <Box
            sx={{
              display: { sm: "flex", xs: "none" },
              columnGap: "16px",
              mr: 1,
            }}
          >
            {navItems.map(({ title, href }) => (
              <Link
                underline="none"
                sx={{ color: "white", display: "block" }}
                href={href}
                key={title}
              >
                {title}
              </Link>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* </HideOnScroll> */}

      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar sx={{ marginBottom: "20px" }} />
    </>
  );
}

export default Header;
