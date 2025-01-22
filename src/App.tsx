import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./component/RootLayout.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import {Toaster} from "react-hot-toast";
import VehiclePage from "./pages/VehiclePage.tsx";
import FieldPage from "./pages/FieldPage.tsx";
import EquipmentPage from "./pages/EquipmentPage.tsx";
import CropPage from "./pages/CropPage.tsx";
import LogPage from "./pages/LogPage.tsx";
import Settings from "./pages/Settings.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Error from "./component/Error.tsx";



function App() {
  const routes = createBrowserRouter([
      {
          path: '',
          element: <RootLayout />,
          children: [
              {path: '', element: <Dashboard />},
              {path: '/staff', element: <StaffPage />},
              {path:'/vehicle', element: <VehiclePage/>},
              {path:'/field', element: <FieldPage/>},
              {path: '/equipment', element: <EquipmentPage />},
              {path: '/crop', element: <CropPage />},
              {path:'/mlog', element: <LogPage />},
              {path: '/settings', element: <Settings /> },
              {path: '*', element: <Error />}
          ]
      }
  ])
  return (
    <>
        <Toaster position={"top-center"}/>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
