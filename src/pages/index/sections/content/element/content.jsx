import {
  Box,
  Container,
  Divider,
  Slide,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import css from "./style.module.css";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function ContentOfCard(props) {
  const { content } = props;

  return (
    <Container>
      <Box>
        <Image
          duration={1000}
          showLoading={true}
          errorIcon={true}
          sx={{ marginBottom: "20px", minHeight: "120px" }}
          src={content.image}
        />
        <Typography>{content.text}</Typography>
      </Box>
    </Container>
  );
}

export default ContentOfCard;
