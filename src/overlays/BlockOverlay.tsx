import { Box, Button, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import BlockOverlayState from "../blocs/states/BlockOverlayState";
import BlockOverlayBloc from "../blocs/ui/BlockOverlayBloc";
import FlexBox from "../components/FlexBox";
import JsonTextDisplay from "../components/JsonTextDisplay";
import useBloc from "../libs/useBloc";
import BaseOverlay from "./BaseOverlay";

export default function BlockOverlay() {
    
    const bloc = useBloc(BlockOverlayBloc);
    const state = useBloc(BlockOverlayState);

    const isShowing = useBindable(state.isShowing);
    const blockIndex = useBindable(state.blockIndex);
    const blockData = useBindable(state.blockData);

    useEffect(() => {
        if (isShowing) {
            bloc.initState();
        }
    }, [isShowing]); // eslint-disable-line
    
    const onBlockIndexChange = (e: any) => bloc.setIndex(e.target.value);

    const onSearchButton = () => bloc.searchBlock();

    return (
        <BaseOverlay
            bloc={bloc}
            fullWidth
        >
            <DialogTitle>
                Search block data
            </DialogTitle>
            <DialogContent>
                <FlexBox alignItems="center" flexDirection="row">
                    <TextField
                        fullWidth
                        value={blockIndex}
                        onChange={onBlockIndexChange}
                        placeholder="Enter block index"
                    />
                    <Box width={10} />
                    <Button onClick={onSearchButton}>
                        Search
                    </Button>
                </FlexBox>
                <Box height={10}/>
                <DialogContentText>
                    <JsonTextDisplay
                        value={blockData}
                    />
                </DialogContentText>
            </DialogContent>
        </BaseOverlay>
    );
}