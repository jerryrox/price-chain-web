import { BaseBloc, Bindable } from "bindable-bloc";
import UserType from "../../models/UserType";

export default class UserState extends BaseBloc {
    
    readonly userType = new Bindable<UserType>(UserType.anonymous);
}