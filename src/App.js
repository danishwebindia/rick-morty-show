import {theme} from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import Template from "./components/Template";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Template></Template>
    </div>
    </ThemeProvider>
  );
}

export default App;