import {Navigate} from 'react-router-dom';
import {getUserFromLocalStorage} from '../utils.js';

const ProtectedRoute = ({children}) => {
    const user = getUserFromLocalStorage();
    if (!user) {
        return <Navigate to='/landing'/>
    }
    return children;
}

export default ProtectedRoute;