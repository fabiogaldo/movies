/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
interface SnackbarContextType {
  showSnackbar: (message: string, severity: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// function SlideTransition(props: SlideProps) {
//   return <Slide {...props} direction="up" />;
// }

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ message, severity });
  };

  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide,
  });

  // const handleClick =
  //   (
  //     Transition: React.ComponentType<
  //       TransitionProps & {
  //         children: React.ReactElement<any, any>;
  //       }
  //     >,
  //   ) =>
  //     () => {
  //       setState({
  //         open: true,
  //         Transition,
  //       });
  //     };

  const handleClose = () => {
    setSnackbar(null);
    setState({
      ...state,
      open: false,
    });
  };
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={state.Transition}
        key={state.Transition.name}>
        {snackbar ? (
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
export default SnackbarProvider;
