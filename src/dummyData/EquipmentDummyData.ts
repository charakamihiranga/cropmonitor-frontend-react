import staffData from "./StaffDummyData.ts";
import fieldData from "./FieldDummyData.ts";
import { Equipment } from "../model/Equipment.ts";

const equipmentData: Equipment[] = [
    new Equipment(
        "Tractor A",
        "Mechanical",
        "Available",
        staffData[0],
        fieldData[0]
    ),
    new Equipment(
        "Drone B",
        "Electrical",
        "Not Available",
        staffData[1],
        fieldData[1]
    ),
    new Equipment(
        "Irrigation Pump C",
        "Mechanical",
        "Available",
        staffData[2],
        fieldData[2]
    ),
    new Equipment(
        "Fertilizer Spreader D",
        "Mechanical",
        "Available",
        staffData[3],
        fieldData[3]
    ),
    new Equipment(
        "Weather Station E",
        "Electrical",
        "Not Available",
        staffData[4],
        fieldData[4]
    ),
];

export default equipmentData;
