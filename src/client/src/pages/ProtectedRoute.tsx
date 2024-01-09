import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {type RootState} from '../store';
import {type ReactNode} from "react";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({children}): any => {
    const {user} = useSelector((store: RootState) => store.user);
    if (!user) {
        return <Navigate to='/landing'/>
    }
    return children;
}

export default ProtectedRoute;