import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import BlockchainOverlayState from "../blocs/states/BlockchainOverlayState";
import BlockchainOverlayBloc from "../blocs/ui/BlockchainOverlayBloc";
import JsonTextDisplay from "../components/JsonTextDisplay";
import useBloc from "../libs/useBloc";
import BaseOverlay from "./BaseOverlay";

export default function BlockchainOverlay() {

    const bloc = useBloc(BlockchainOverlayBloc);
    const state = useBloc(BlockchainOverlayState);

    const isShowing = useBindable(state.isShowing);
    const chainData = useBindable(state.chainData);

    useEffect(() => {
        if (isShowing) {
            bloc.initState();
        }
        else {
            bloc.dispose();
        }
    }, [isShowing]); // eslint-disable-line
    
    return (
        <BaseOverlay bloc={bloc}>
            <DialogTitle>Blockchain data</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <JsonTextDisplay value={chainData}/>
                </DialogContentText>
            </DialogContent>
        </BaseOverlay>
    );
}
