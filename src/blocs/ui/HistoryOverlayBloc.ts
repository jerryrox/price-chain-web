import Api from "../../api/Api";
import HistoryGraphField from "../../models/HistoryGraphField";
import IItemPriceModel from "../../models/IItemPriceModel";
import HistoryOverlayState from "../states/HistoryOverlayState";
import BaseOverlayBloc from "./BaseOverlayBloc";

interface IHistoryOverlayDependency {
    historyOverlayState: HistoryOverlayState
}

export default class HistoryOverlayBloc extends BaseOverlayBloc<HistoryOverlayState> {
    
    readonly deps: IHistoryOverlayDependency;

    get state(): HistoryOverlayState {
        return this.deps.historyOverlayState;
    }
    
    constructor(deps: IHistoryOverlayDependency) {
        super(deps.historyOverlayState);
        this.deps = deps;
    }
    
    initState = async () => {
        this.state.prices.value = [];

        await this.loadHistory();
    };

    dispose = () => {
        this.state.item.value = null;
    };

    showForItem = (item: IItemPriceModel) => {
        this.state.item.value = item;
        this.show();
    };

    setGraphField = (value: HistoryGraphField) => {
        this.state.graphField.value = value;
    };

    loadHistory = async () => {
        const item = this.state.item.value;
        if (item === null) {
            return;
        }
        const prices = await Api.getPriceHistory(
            item?.sku,
            item?.userAddress
        );
        this.state.prices.value = prices;
        console.log(prices);
    };
}