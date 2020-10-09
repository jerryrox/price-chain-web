import { BaseBloc } from "bindable-bloc";
import Api from "../../api/Api";
import IItemPriceModel from "../../models/IItemPriceModel";
import NotificationBloc from "../NotificationBloc";
import LoginState from "../states/LoginState";
import ManageViewState from "../states/ManageViewState";
import ItemOverlayBloc from "./ItemOverlayBloc";

interface IManageViewDependency {
    manageViewState: ManageViewState;

    loginState: LoginState;

    itemOverlayBloc: ItemOverlayBloc;
    notificationBloc: NotificationBloc;
}

export default class ManageViewBloc extends BaseBloc {
    
    readonly deps: IManageViewDependency;

    get myAddress(): string {
        return this.deps.loginState.credential.value?.publicAddress as string;
    }

    
    constructor(deps: IManageViewDependency) {
        super();
        this.deps = deps;
    }
    
    initState = async () => {
        this.deps.manageViewState.items.value = [];
        
        await this.loadItems();
    };

    createNewItem = () => {
        this.deps.itemOverlayBloc.show();
    };

    loadItems = async () => {
        try {
            const myAddress = this.myAddress;
            const items = await Api.getItems(myAddress);
    
            this.deps.manageViewState.items.value = items;
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
        }
    };

    editItem = (item: IItemPriceModel) => {
        this.deps.itemOverlayBloc.showEdit(item);
    };
}