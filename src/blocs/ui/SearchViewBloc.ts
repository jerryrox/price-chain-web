import { BaseBloc } from "bindable-bloc";
import Api from "../../api/Api";
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

    search = async () => {
        try {
            const searchValue = this.searchValue;
            const results = await Api.getItemPrices(searchValue);

            this.state.results.value = results;
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
        }
    };

    showHistory = (item: IItemPriceModel) => {
        // TODO:
    };
}