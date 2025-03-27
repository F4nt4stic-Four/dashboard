import { Container, Grid2 } from "@mui/material";
import { Header } from "./components";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="none" sx={{ flex: 1, overflow: "auto" }}>
        <Grid2 container spacing={2}>
          <Grid2 size={4}>Options will come here</Grid2>
          <Grid2 size={8}>Graphs will come here</Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default App;
