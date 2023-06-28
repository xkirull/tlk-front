import { Grid } from "@mui/material";
import ContentElement from "./element";

import css from "./style.module.css";

function Content(props) {
  const { arrayOfElements } = props;

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
      {arrayOfElements.map((itemProps, index) => (
        <Grid className={css.element} item key={index}>
          <ContentElement {...itemProps} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Content;
