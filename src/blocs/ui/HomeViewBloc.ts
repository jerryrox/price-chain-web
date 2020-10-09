import { BaseBloc } from "bindable-bloc";

interface IHomeViewDependency {
    
}

export default class HomeViewBloc extends BaseBloc {
    
    readonly deps: IHomeViewDependency;
    
    constructor(deps: IHomeViewDependency) {
        super();
        this.deps = deps;
    }
    
    continueAsCustomer = () => {
        // TODO:
    };

    continueAsShopOwner = () => {
        // TODO:
    };
}