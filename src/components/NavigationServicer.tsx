import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavigationBloc from "../blocs/NavigationBloc";
import useBloc from "../libs/useBloc";

export default function NavigationServicer() {
    
    const bloc = useBloc(NavigationBloc);
    const history = useHistory();

    useEffect(() => bloc.setHistory(history), [history]); // eslint-disable-line

    return null;
}