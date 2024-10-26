import React from 'react';
import {RouterProvider} from "react-router-dom";
import AllRoutes from "./index";

const Routers = () => {
    return (
        <RouterProvider router={AllRoutes} />
    );
};

export default Routers;


