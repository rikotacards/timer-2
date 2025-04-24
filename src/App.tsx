import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./providers/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Layout } from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Analytics } from "./pages/Analytics";
import { Categories } from "./pages/Categories";
import { Projects } from "./pages/Project";
import { SnackbarProvider } from "notistack";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={darkTheme}>
          <SnackbarProvider>
            <Layout>
              <QueryClientProvider client={queryClient}>
                <CssBaseline />
                <Box sx={{ p: 2 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/projects" element={<Projects />} />
                  </Routes>
                </Box>
              </QueryClientProvider>
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
