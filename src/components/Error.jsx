import { Box, Container, Icon, Stack, Typography } from "@mui/material";
import { Navigate, useRouteError } from "react-router-dom";

const Error = ({ entity }) => {
  const error = useRouteError();
  switch (error.cause) {
    case "unauthorized": {
      return <Navigate to="/" />;
    }
    default: {
      return (
        <Container
          sx={{
            width: "50%",
            height: '100vh',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center'
          }}
        >
          <Stack direction={"column"} spacing={1}>
            <Typography variant="h4">
              Desila se greška u učitavanju {/*{entity} */}
            </Typography>
            <Typography>Kod greške: {error.code}</Typography>
            <Typography variant="h6">Interna greška je: </Typography>
            <Box>
              <pre>{error.message}</pre>
            </Box>
          </Stack>
        </Container>
      );
    }
  }
};

export default Error;
