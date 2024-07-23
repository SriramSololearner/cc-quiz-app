import "./App.css";
import { Box } from "@mui/material";
import Landing from "./Components/Landing";

function App() {
  return (
    <Box className="App" data-testid="App">
      <Landing />
    </Box>
  );
}

export default App;
