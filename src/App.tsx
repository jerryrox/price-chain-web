import React from 'react';
import { Box } from "@material-ui/core";
import AppContext, { initContextValue } from "./blocs/AppContext";
import UIRoot from "./UIRoot";
import { SnackbarProvider } from "notistack";

function App() {

  const contextValue = initContextValue();

  return (
    <Box>
      <SnackbarProvider maxSnack={5}>
        <AppContext.Provider value={contextValue}>
          <UIRoot/>
        </AppContext.Provider>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
