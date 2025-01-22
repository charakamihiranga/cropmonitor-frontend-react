import CropChart from "../component/CropChart.tsx";
import DashboardHeader from "../component/DashboardHeader.tsx";
import StaffWidget from "../component/StaffWidget.tsx";
import VehicleWidget from "../component/VehicleWidget.tsx";
import LogsWidget from "../component/LogsWidget.tsx";
import FieldWidget from "../component/FieldWidget.tsx";


function Dashboard() {
    return (
        <div className="container mx-auto p-5 bg-gray-50">
            <DashboardHeader />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FieldWidget />
                <CropChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <StaffWidget />
                <VehicleWidget />
                <LogsWidget />
            </div>
        </div>
    );
}

export default Dashboard;