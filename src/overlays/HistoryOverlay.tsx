import { DialogContent, DialogContentText, DialogTitle, MenuItem, Select } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import ReactEcharts from "echarts-for-react";
import React, { useEffect, useMemo } from "react";
import HistoryOverlayState from "../blocs/states/HistoryOverlayState";
import HistoryOverlayBloc from "../blocs/ui/HistoryOverlayBloc";
import useBloc from "../libs/useBloc";
import HistoryGraphField from "../models/HistoryGraphField";
import BaseOverlay from "./BaseOverlay";

export default function HistoryOverlay() {

    const bloc = useBloc(HistoryOverlayBloc);
    const state = useBloc(HistoryOverlayState);

    const isShowing = useBindable(state.isShowing);
    const item = useBindable(state.item);
    const prices = useBindable(state.prices);
    const graphField = useBindable(state.graphField)


    useEffect(() => {
        if (isShowing) {
            bloc.initState();
        }
        else {
            bloc.dispose();
        }
    }, [isShowing]); // eslint-disable-line

    const chartOption = useMemo<any>(() => {
        return {
            xAxis: {
                type: "time",
                boundaryGap: false,
            },
            yAxis: {
                type: "value"
            },
            series: [{
                data: prices.map((p) => {
                    let value = 0;
                    const date = new Date(p.timestamp);
                    switch (graphField) {
                        case HistoryGraphField.BasePrice:
                            value = p.basePrice;
                            break;
                        case HistoryGraphField.DiscountRate:
                            value = p.discountRate;
                            break;
                        case HistoryGraphField.FinalPrice:
                            value = p.basePrice * (1 - p.discountRate);
                            break;
                    }
                    return [date, value];
                }),
                type: "line",
                areaStyle: {}
            }]
        };
    }, [graphField, prices]);

    const onGraphFieldChange = (e: any) => bloc.setGraphField(e.target.value);
    
    
    return (
        <BaseOverlay
            bloc={bloc}
            fullWidth
        >
            <DialogTitle>Price history</DialogTitle>
            <DialogContent>
                <DialogContentText>Item: {item?.sku ?? ""} | Shop owner: {item?.userAddress ?? ""}</DialogContentText>
                <Select value={graphField} onChange={onGraphFieldChange}>
                    <MenuItem value={HistoryGraphField.BasePrice}>Base price</MenuItem>
                    <MenuItem value={HistoryGraphField.DiscountRate}>Discount rate</MenuItem>
                    <MenuItem value={HistoryGraphField.FinalPrice}>Final price</MenuItem>
                </Select>
                <ReactEcharts
                    option={chartOption}
                    lazyUpdate={true}

                />
            </DialogContent>
        </BaseOverlay>
    );
}