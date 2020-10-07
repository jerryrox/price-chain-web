import { BaseBloc } from "bindable-bloc";
import AppDrawerBloc from "./AppDrawerBloc";

interface INavBarDependency {
    appDrawerBloc: AppDrawerBloc;
}

export default class NavBarBloc extends BaseBloc {
    
    readonly deps: INavBarDependency;
    
    constructor(deps: INavBarDependency) {
        super();
        this.deps = deps;
    }
    
    initState = () => {
        
    };

    openDrawer = () => this.deps.appDrawerBloc.showDrawer();
}