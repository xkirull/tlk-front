import { IconButton, InputBase, Paper } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Search({ callback, disabled }) {
  function changeHandler(input) {
    callback(input.target.value);
  }

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 600 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search articles"
        inputProps={{ "aria-label": "Search articles" }}
        onChange={changeHandler}
        disabled={disabled}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;
