import {
  Avatar,
  Box,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

import css from "./style.module.css";
import { isMobile } from "@/shared/isMobile";

function CardElement(props) {
  const { title, caption, setStatusDialog, content } = props;

  const clickHandler = () => {
    setStatusDialog(true);
  };

  return (
    <Card onClick={clickHandler} className={css.element}>
      <Box
        sx={{ p: 2, display: "flex", alignItems: "center", columnGap: "12px" }}
      >
        <Avatar variant="circular" sx={{ width: 56, height: 56 }}>
          {<PersonIcon />}
        </Avatar>
        <Stack spacing={0}>
          <Typography fontWeight={700}>{title}</Typography>
          <Typography variant="caption" fontSize={14}>
            {caption}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Typography sx={{ p: 3 }}>
        {content.text.slice(0, isMobile() ? 100 : 150).trim() + "..."}
      </Typography>
    </Card>
  );
}

export default CardElement;
