import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import NotificationBloc from "../blocs/NotificationBloc";
import useBloc from "../libs/useBloc";

export default function NotificationServicer() {
    
    const bloc = useBloc(NotificationBloc);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        const id = bloc.lastNotification.subscribe((n) => {
          if (n !== null) {
            enqueueSnackbar(n.message, {
              variant: n.variant,
              autoHideDuration: 3500,
              action: (key) => {
                const close = () => closeSnackbar(key);
                return (
                  <React.Fragment>
                    <Button onClick={close}>
                      Close
                    </Button>
                  </React.Fragment>
                );
              },
            });
          }
        });
    
        return () => {
          bloc.lastNotification.unsubscribe(id);
        };
      }, [bloc, enqueueSnackbar, closeSnackbar]);

    return null;
}