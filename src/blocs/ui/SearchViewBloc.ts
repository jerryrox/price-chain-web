import { BaseBloc } from "bindable-bloc";
import IItemPriceModel from "../../models/IItemPriceModel";
import NotificationBloc from "../NotificationBloc";
import SearchViewState from "../states/SearchViewState";

interface ISearchViewDependency {
    searchViewState: SearchViewState;

    notificationBloc: NotificationBloc;
}

export default class SearchViewBloc extends BaseBloc {
    
    readonly deps: ISearchViewDependency;

    get state(): SearchViewState {
        return this.deps.searchViewState;
    }

    get searchValue(): string {
        return this.state.searchValue.value;
    }
    set searchValue(value: string) {
        this.state.searchValue.value = value;
    }
    
    constructor(deps: ISearchViewDependency) {
        super();
        this.deps = deps;
    }
    
    initState = () => {
        this.searchValue = "";
        this.state.results.value = [];
    };

    setSearchValue = (value: string) => this.searchValue = value;

    search = () => {
        const value = this.searchValue;
        // TODO:
    };

    showHistory = (item: IItemPriceModel) => {
        // TODO:
    };
}