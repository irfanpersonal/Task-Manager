import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AddTask, AllTasks, Auth, Error, HomeLayout, Landing, Profile, ProtectedRoute, Stats} from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute><HomeLayout/></ProtectedRoute>,
		errorElement: <Error/>,
		children: [
			{
				index: true,
				element: <Stats/>
			},
			{
				path: 'all-tasks',
				element: <AllTasks/>
			},
			{
				path: 'add-task',
				element: <AddTask/>
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

const App = () => {
	return (
		<RouterProvider router={router}/>
	);
}

export default App;