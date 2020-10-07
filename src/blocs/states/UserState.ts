import { BaseBloc, Bindable } from "bindable-bloc";
import { UserType } from "../../libs/types";

export default class UserState extends BaseBloc {
    
    readonly userType = new Bindable<UserType>(UserType.anonymous);
}