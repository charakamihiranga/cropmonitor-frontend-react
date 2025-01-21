import { Field } from "./Field.ts";
import { Crop } from "./Crop.ts";
import { Staff } from "./Staff.ts";
import { v4 as uuidv4 } from "uuid";

export class Log {
    logCode: string = `ML-${uuidv4()}`;
    logDate: Date | string = new Date().toISOString();
    observation: string;
    allocatedFields: Field[];
    allocatedCrops: Crop[];
    allocatedStaff: Staff[];
    observedImage?: string;
    constructor(
        observation: string,
        allocatedFields: Field[],
        allocatedCrops: Crop[],
        allocatedStaff: Staff[],
        observedImage?: string
    ) {
        this.observation = observation;
        this.observedImage = observedImage;
        this.allocatedFields = allocatedFields;
        this.allocatedCrops = allocatedCrops;
        this.allocatedStaff = allocatedStaff;
    }
}
