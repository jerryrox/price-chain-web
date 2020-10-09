import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import ItemOverlayState from "../blocs/states/ItemOverlayState";
import ItemOverlayBloc from "../blocs/ui/ItemOverlayBloc";
import FlexBox from "../components/FlexBox";
import useBloc from "../libs/useBloc";
import BaseOverlay from "./BaseOverlay";

export default function ItemOverlay() {

    const bloc = useBloc(ItemOverlayBloc);
    const state = useBloc(ItemOverlayState);

    const isShowing = useBindable(state.isShowing);
    const sku = useBindable(state.sku);
    const basePriceStr = useBindable(state.basePriceStr);
    const discountRateStr = useBindable(state.discountRateStr);

    const isEditing = state.isEditing;
    const finalPrice = state.finalPrice;

    useEffect(() => {
        if (isShowing) {
            bloc.initState();
        }
        else {
            bloc.dispose();
        }
    }, [isShowing]); // eslint-disable-line

    const onSkuChange = (e: any) => bloc.setSku(e.target.value);

    const onBasePriceChange = (e: any) => bloc.setBasePrice(e.target.value);

    const onDiscountRateChange = (e: any) => bloc.setDiscountRate(e.target.value);

    const onSaveButton = () => bloc.save();

    const onCancelButton = () => bloc.hide();

    const drawFieldLabel = (label: string) => {
        return (
            <Box width={150}>
                <Typography>{label}</Typography>
            </Box>
        );
    };
    
    return (
        <BaseOverlay bloc={bloc} fullWidth disableBackdropClick>
            <DialogTitle>
                {
                    isEditing ?
                        "Edit item" :
                        "New item"
                }
            </DialogTitle>
            <DialogContent>
                <FlexBox flexDirection="row" alignItems="center">
                    {drawFieldLabel("SKU")}
                    <TextField
                        fullWidth
                        disabled={isEditing}
                        value={sku}
                        onChange={onSkuChange}
                    />
                </FlexBox>
                <FlexBox flexDirection="row" alignItems="center">
                    {drawFieldLabel("Base price")}
                    <TextField
                        fullWidth
                        value={basePriceStr}
                        onChange={onBasePriceChange}
                    />
                </FlexBox>
                <FlexBox flexDirection="row" alignItems="center">
                    {drawFieldLabel("Discount rate")}
                    <TextField
                        fullWidth
                        value={discountRateStr}
                        onChange={onDiscountRateChange}
                    />
                </FlexBox>
                <Box height={10}/>
                <Divider/>
                <Box height={10} />
                <Typography align="center" variant="h6">Final price: ${finalPrice}</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onCancelButton}>
                    Cancel
                </Button>
                <Button color="primary" onClick={onSaveButton}>
                    Save
                </Button>
            </DialogActions>
        </BaseOverlay>
    );
}