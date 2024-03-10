import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "./theme/theme";
import { Layout } from "./components/layout";

function App() {

  const theme = new CustomTheme('#2a7163').getTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </>
  );
}

export default App;
