import { DialogContent, DialogContentText } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import NewAddressOverlayState from "../blocs/states/NewAddressOverlayState";
import NewAddressOverlayBloc from "../blocs/ui/NewAddressOverlayBloc";
import useBloc from "../libs/useBloc";
import BaseOverlay from "./BaseOverlay";

export default function NewAddressOverlay() {

    const bloc = useBloc(NewAddressOverlayBloc);
    const state = useBloc(NewAddressOverlayState);

    const isShowing = useBindable(state.isShowing);
    const credential = useBindable(state.credential);

    useEffect(() => {
        if (isShowing) {
            bloc.initState();
        }
    }, [isShowing]); // eslint-disable-line
    
    return (
        <BaseOverlay bloc={bloc}>
            {
                credential != null &&
                <DialogContent>
                    <DialogContentText variant="h5">Public address</DialogContentText>
                    <DialogContentText>{credential.publicAddress}</DialogContentText>

                    <DialogContentText variant="h5">Private address</DialogContentText>
                    <DialogContentText>{credential.privateAddress}</DialogContentText>
                </DialogContent>
            }
        </BaseOverlay>
    );
}