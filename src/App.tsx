import Dashboard from "./component/Dashboard.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./component/RootLayout.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import {Toaster} from "react-hot-toast";
import VehiclePage from "./pages/VehiclePage.tsx";



function App() {
  const routes = createBrowserRouter([
      {
          path: '',
          element: <RootLayout />,
          children: [
              {path: '', element: <Dashboard />},
              {path: '/staff', element: <StaffPage />},
              {path:'/vehicle', element: <VehiclePage/>},
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
