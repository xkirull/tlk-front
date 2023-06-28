import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./index/index";
import { LoginPage, RegistrationPage } from "./authorization";
import Page404 from "./404";
import { setCookie } from '@/shared/cookie';

const Logout = () => {
    setCookie("email", "", 0);
    setCookie("password", "", 0);

    window.location.href = "/login";

    return <>logout</>;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/registration",
        element: <RegistrationPage />,
    },
    {
        path: "/logout",
        element: <Logout />
    },
    {
        path: "*",
        element: <Page404 />,
    }
]);

const Routing = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routing;
