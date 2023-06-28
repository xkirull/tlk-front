import { Box, Link, Typography } from "@mui/material";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Box
        bgcolor="#1976d2"
        padding="20px 0"
        color="white"
        marginTop="20px"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography level="body2">
          By{" "}
          <Link
            color="#ffffff"
            underline="always"
            href="https://kirull.ru"
          >
            Kirull
          </Link>
        </Typography>
        <Typography level="body2">&nbsp;|&nbsp;</Typography>
        <Typography level="body2">Copyright {currentYear}</Typography>
      </Box>
    </>
  );
}

export default Footer;
