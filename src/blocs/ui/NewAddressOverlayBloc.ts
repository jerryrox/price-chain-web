import Api from "../../api/Api";
import NotificationBloc from "../NotificationBloc";
import NewAddressOverlayState from "../states/NewAddressOverlayState";
import BaseOverlayBloc from "./BaseOverlayBloc";

interface INewAddressOverlayDependency {
    newAddressOverlayState: NewAddressOverlayState;
    
    notificationBloc: NotificationBloc;
}

export default class NewAddressOverlayBloc extends BaseOverlayBloc<NewAddressOverlayState> {
    
    readonly deps: INewAddressOverlayDependency;

    get state(): NewAddressOverlayState {
        return this.deps.newAddressOverlayState;
    }
    
    constructor(deps: INewAddressOverlayDependency) {
        super(deps.newAddressOverlayState);
        this.deps = deps;
    }

    initState = async () => {
        this.state.credential.value = null;
        await this.requestNewAddress();
    };

    requestNewAddress = async () => {
        try {
            const credential = await Api.getNewAddress();
            this.state.credential.value = credential;
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
            this.hide();
        }
    };
}