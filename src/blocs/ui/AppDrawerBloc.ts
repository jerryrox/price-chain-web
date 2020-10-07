import { BaseBloc } from "bindable-bloc";
import AppDrawerState from "../states/AppDrawerState";

interface IAppDrawerDependency {
    appDrawerState: AppDrawerState;
}

export default class AppDrawerBloc extends BaseBloc {
    
    readonly deps: IAppDrawerDependency;
    
    constructor(deps: IAppDrawerDependency) {
        super();
        this.deps = deps;
    }
    
    initState = () => {

    };

    showDrawer = () => this.deps.appDrawerState.isOpen.value = true;

    closeDrawer = () => this.deps.appDrawerState.isOpen.value = false;

    toHome = () => {
        // TODO:
        this.closeDrawer();
    };

    logout = () => {
        // TODO:
        this.closeDrawer();
    };
}