import { Dialog } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React from "react";
import BaseOverlayState from "../blocs/states/BaseOverlayState";
import BaseOverlayBloc from "../blocs/ui/BaseOverlayBloc";

interface IBaseOverlayParam {
    bloc: BaseOverlayBloc<BaseOverlayState>;
    fullWidth?: boolean;
    onCloseOverride?: () => void;
    children?: any;
}

export default function BaseOverlay({
    bloc,
    fullWidth,
    onCloseOverride,
    children
}: IBaseOverlayParam) {

    const isShowing = useBindable(bloc.overlayState.isShowing);

    const onDialogClose = () => {
        if (onCloseOverride !== undefined) {
            onCloseOverride();
        }
        else {
            bloc.hide();
        }
    };

    return (
        <Dialog fullWidth={fullWidth} open={isShowing} onClose={onDialogClose}>
            {children}
        </Dialog>
    );
}