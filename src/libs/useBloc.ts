import { BaseBloc } from "bindable-bloc";
import { Constructor } from "bindable-bloc/lib/Types";
import { useContext } from "react";
import AppContext from "../blocs/AppContext";

export default function useBloc<T extends BaseBloc>(type: Constructor<T>) {
    return useContext(AppContext).getBloc(type);
}