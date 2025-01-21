import { Log } from "../model/Log.ts";
import fieldData from "./FieldDummyData.ts";
import cropData from "./CropDummyData.ts";
import staffData from "./StaffDummyData.ts";

const logData: Log[] = [
    new Log(
        "Field inspection completed with minor pest issues observed. A thorough field inspection revealed minor pest activity in specific sections. This was addressed immediately to avoid larger infestations, ensuring the crops remain healthy. Regular monitoring was suggested to track pest activity and prevent future problems.",
        [fieldData[0], fieldData[1]],
        [cropData[0], cropData[1]],
        [staffData[0], staffData[1]]
    ),
    new Log(
        "Regular maintenance check; no issues found. A scheduled maintenance check was carried out across the farm. All equipment and systems, including irrigation and machinery, were inspected. No issues were identified, confirming that all processes are running smoothly, ensuring the field’s readiness for the next growing season.",
        [fieldData[2]],
        [cropData[2]],
        [staffData[2]]
    ),
    new Log(
        "Harvest completed successfully. The harvest process went smoothly, and all crops were gathered on time. With minimal damage during collection and handling, the crops were in excellent condition, ready for distribution. This success reflects the proper care and preparation during the growing phase.",
        [fieldData[3]],
        [cropData[3]],
        [staffData[3], staffData[4]]
    ),
    new Log(
        "Pest infestation identified and treated. A pest infestation was detected during routine monitoring of the crops. Immediate action was taken to treat the affected areas using eco-friendly methods to prevent further spread. Follow-up inspections are planned to ensure recovery and prevent recurrence.",
        [fieldData[4]],
        [cropData[4]],
        [staffData[1], staffData[3]]
    ),
    new Log(
        "Soil quality test results recorded. Soil samples were analyzed to assess nutrient levels and overall soil health. The results indicated some areas needing improvement, such as pH adjustments and additional fertilizers. These findings will guide future crop planning and optimize yields.",
        [fieldData[0], fieldData[2]],
        [cropData[0], cropData[2]],
        [staffData[0], staffData[2], staffData[4]]
    )
];

export default logData;
