// AI EXPLAINING:
// This is making it so that the user can only access the dashboard if they are signed in. If they are not signed in, they will be redirected to the sign in page.
// The PrivateRoute component is a functional component that uses the useSelector hook from react-redux to get the currentUser from the auth slice of the Redux store. If the currentUser is truthy, the component will render the Outlet component from react-router-dom, which will render the child routes of the parent route. If the currentUser is falsy, the component will render the Navigate component from react-router-dom, which will redirect the user to the sign in page.
// The Outlet component is used to render the child routes of the parent route. In this case, the Outlet component is used to render the Dashboard component when the user is signed in.
// The Navigate component is used to redirect the user to the sign in page when the user is not signed in.

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to='/signin' />;

}
