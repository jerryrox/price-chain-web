import { BaseBloc, Bindable } from "bindable-bloc";
import IItemPriceModel from "../../models/IItemPriceModel";
import ItemSortType from "../../models/ItemSortType";
import SortDirection from "../../models/SortDirection";

export default class SearchViewState extends BaseBloc {
    
    readonly searchValue = new Bindable<string>("");
    readonly results = new Bindable<IItemPriceModel[]>([]);

    readonly itemSortType = new Bindable<ItemSortType>(ItemSortType.Price);
    readonly sortDirection = new Bindable<SortDirection>(SortDirection.Ascending);
}