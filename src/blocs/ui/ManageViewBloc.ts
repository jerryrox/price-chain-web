import { BaseBloc } from "bindable-bloc";
import Api from "../../api/Api";
import IItemPriceModel from "../../models/IItemPriceModel";
import NotificationBloc from "../NotificationBloc";
import LoginState from "../states/LoginState";
import ManageViewState from "../states/ManageViewState";

interface IManageViewDependency {
    manageViewState: ManageViewState;

    loginState: LoginState;

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
        // TODO:
    };

    loadItems = async () => {
        try {
            const myAddress = "02ec78b6f513f5a9eb3bc308ae670e1bbe35485fec151b32b602073fa0db31ef8c";//this.myAddress;
            const items = await Api.getItems(myAddress);
    
            this.deps.manageViewState.items.value = items;
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
        }
    };

    editItem = (item: IItemPriceModel) => {
        // TODO:
    };
}