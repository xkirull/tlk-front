import { Alert, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

function Loading(props) {
  const { status, message } = props;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        margin: "40px 0",
      }}
    >
      {status == "load" && <CircularProgress />}
      {status == "error" && (
        <Alert variant="filled" severity="error">
          {message}
        </Alert>
      )}
    </Box>
  );
}

export default Loading;
