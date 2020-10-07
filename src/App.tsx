import React from 'react';
import { Box } from "@material-ui/core";
import AppContext, { initContextValue } from "./blocs/AppContext";
import UIRoot from "./UIRoot";

function App() {

  const contextValue = initContextValue();

  return (
    <Box>
      <AppContext.Provider value={contextValue}>
        <UIRoot/>
      </AppContext.Provider>
    </Box>
  );
}

export default App;
