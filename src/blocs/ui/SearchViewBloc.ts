import { BaseBloc } from "bindable-bloc";
import Api from "../../api/Api";
import IItemPriceModel from "../../models/IItemPriceModel";
import ItemSortType from "../../models/ItemSortType";
import SortDirection from "../../models/SortDirection";
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

    setItemSort = (value: ItemSortType) => {
        this.state.itemSortType.value = value;
        this.refreshResults();
    };

    setSortDirection = (value: SortDirection) => {
        this.state.sortDirection.value = value;
        this.refreshResults();
    }

    search = async () => {
        try {
            const searchValue = this.searchValue;
            const results = await Api.getItemPrices(searchValue);

            this.setResultBySorting(results);
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
        }
    };

    showHistory = (item: IItemPriceModel) => {
        // TODO:
    };

    private refreshResults = () => this.setResultBySorting(this.state.results.value);

    private setResultBySorting = (results: IItemPriceModel[]) => {
        const itemSort = this.state.itemSortType.value;
        const dir = this.state.sortDirection.value;
        results.sort((x, y) => {
            let comp = 0;
            switch (itemSort) {
                case ItemSortType.Price:
                    comp = (x.basePrice * (1 - x.discountRate)) - (y.basePrice * (1 - y.discountRate));
                    break;
                case ItemSortType.Date:
                    comp = x.timestamp - y.timestamp;
                    break;
            }
            return comp * (dir === SortDirection.Ascending ? 1 : -1);
        });
        
        this.state.results.value = [...results];
    };
}