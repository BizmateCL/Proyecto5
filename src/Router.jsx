import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AddEvents from "./pages/AddEvents";
import CalendarEvents from "./pages/CalendarEvents";
import StructureLayout from "./components/StructureLayout";

// const router =createBrowserRouter([
//     {path:'/',element:<App/>},
//     {path:'/AddEvents',element:<AddEvents/>},
//     {path:'/CalendarEvents',element:<CalendarEvents/>}
//  ])

const router = createBrowserRouter([
    {
        path: '/',  
        element: <StructureLayout/>,        
        children: [ 
            {path:'/',element:<App/>},
            {path:'/AddEvents',element:<AddEvents/>},
            {path:'/CalendarEvents',element:<CalendarEvents/>},
        ],
    },
]);
export default router;
//router significa manejador de rutas     