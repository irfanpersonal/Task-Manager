import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AddTask, Auth, Error, Home, HomeLayout, Landing, Profile, ProtectedRoute, Task} from './pages';
import {useDispatch, useSelector} from 'react-redux';
import {type AppDispatch, type RootState} from './store';
import {showCurrentUser} from './features/user/userThunk';
import {Loading} from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute><HomeLayout/></ProtectedRoute>,
		errorElement: <Error/>,
		children: [
			{
				index: true,
				element: <Home/>
			},
			{
				path: 'add-task',
				element: <AddTask/>
			},
			{
				path: 'task/:id',
				element: <Task/>
			},
			{
				path: 'profile',
				element: <Profile/>
			}
		]
	},
	{
		path: '/landing',
		element: <Landing/>
	},
	{
		path: '/auth',
		element: <Auth/>
	}
]);

const App: React.FunctionComponent = () => {
	const {location} = useSelector((store: RootState) => store.navigation);
	const dispatch = useDispatch<AppDispatch>();
	const {globalLoading} = useSelector((store: RootState) => store.user);
	React.useEffect(() => {
		dispatch(showCurrentUser());
	}, []);
	React.useEffect(() => {
		if (window.location.pathname !== location) {
			router.navigate(location);
		}
	}, [location]);
	if (globalLoading) {
		return (
			<Loading/>
		);
	}
	return (
		<RouterProvider router={router}/>
	);
}

export default App;