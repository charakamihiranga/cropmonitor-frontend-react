import Dashboard from "./component/Dashboard.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./component/RootLayout.tsx";
import ViewStaff from "./pages/ViewStaff.tsx";


function App() {
  const routes = createBrowserRouter([
      {
          path: '',
          element: <RootLayout />,
          children: [
              {path: '', element: <Dashboard />},
              {path: '/staff', element: <ViewStaff />},
          ]
      }
  ])
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
