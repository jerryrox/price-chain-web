import Api from "../../api/Api";
import IItemPriceModel from "../../models/IItemPriceModel";
import NotificationBloc from "../NotificationBloc";
import ItemOverlayState from "../states/ItemOverlayState";
import LoginState from "../states/LoginState";
import BaseOverlayBloc from "./BaseOverlayBloc";

interface IItemOverlayDependency {
    itemOverlayState: ItemOverlayState;

    loginState: LoginState;

    notificationBloc: NotificationBloc;
}

export default class ItemOverlayBloc extends BaseOverlayBloc<ItemOverlayState> {
    
    readonly deps: IItemOverlayDependency;

    get myAddress(): string {
        return this.deps.loginState.credential.value?.publicAddress as string;
    }
    
    constructor(deps: IItemOverlayDependency) {
        super(deps.itemOverlayState);
        this.deps = deps;
    }
    
    initState = () => {
        const state = this.deps.itemOverlayState;
        if (state.isEditing) {
            state.sku.value = state.source.value?.sku as string;
            state.basePriceStr.value = String(state.source.value?.basePrice);
            state.discountRateStr.value = String(state.source.value?.discountRate);
        }
        else {
            state.sku.value = "";
            state.basePriceStr.value = "0";
            state.discountRateStr.value = "0";
        }
    };

    dispose = () => {
        this.deps.itemOverlayState.source.value = null;
    };

    showEdit = (item: IItemPriceModel) => {
        this.deps.itemOverlayState.source.value = item;
        this.show();
    };

    setSku = (value: string) => this.deps.itemOverlayState.sku.value = value;

    setBasePrice = (value: string) => this.deps.itemOverlayState.basePriceStr.value = value;

    setDiscountRate = (value: string) => this.deps.itemOverlayState.discountRateStr.value = value;

    save = async () => {
        try {
            const myAddress = this.myAddress;
            const state = this.deps.itemOverlayState;
            await Api.addPrices(myAddress, [{
                basePrice: state.basePrice,
                discountRate: state.discountRate,
                sku: state.sku.value
            }]);

            this.deps.notificationBloc.add({
                message: `Successfully ${state.isEditing ? "edited" : "created"} item.`,
                variant: "success"
            });
            this.hide();
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
        }
    };
}