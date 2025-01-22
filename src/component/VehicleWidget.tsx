import { useSelector } from "react-redux";
import { Vehicle } from "../model/Vehicle";
import { RootState } from "../store/Store";

function VehicleWidget() {
    const vehicles: Vehicle[] = useSelector((state: RootState) => state.vehicle);

    // Calculate the counts for available and unavailable vehicles
    const availableCount = vehicles.filter((vehicle) => vehicle.status.toLowerCase() === "available").length;
    const unavailableCount = vehicles.filter((vehicle) => vehicle.status.toLowerCase() === "out of service").length;

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4 text-center">Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:h-48 h-auto">
                <div
                    className="bg-green-100 text-center py-6 rounded-lg flex flex-col items-center justify-center h-full"
                >
                    <p
                        className="text-6xl sm:text-7xl font-bold mb-2 sm:mb-4"
                        id="available-vehicle-count"
                    >
                        {availableCount}
                    </p>
                    <p className="text-base sm:text-sm">Available</p>
                </div>
                <div
                    className="bg-red-100 text-center py-6 rounded-lg flex flex-col items-center justify-center h-full"
                >
                    <p
                        className="text-6xl sm:text-7xl font-bold mb-2 sm:mb-4"
                        id="unAvailable-vehicle-count"
                    >
                        {unavailableCount}
                    </p>
                    <p className="text-base sm:text-sm">Unavailable</p>
                </div>
            </div>
        </div>
    );
}

export default VehicleWidget;
