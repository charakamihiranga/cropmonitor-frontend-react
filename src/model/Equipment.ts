import {Staff} from "./Staff.ts";
import {Field} from "./Field.ts";
import {v4 as uuidv4} from "uuid";

export class Equipment{
    equipmentId : string = `EQ-${uuidv4()}`;
    equipmentName : string;
    equipmentType : string;
    status : string;
    allocatedEmployee : Staff;
    allocatedField : Field;

    constructor(
        equipmentName : string,
        equipmentType : string,
        status : string,
        allocatedEmployee : Staff,
        allocatedField : Field
    ) {
        this.equipmentName = equipmentName;
        this.equipmentType = equipmentType;
        this.status = status;
        this.allocatedEmployee = allocatedEmployee;
        this.allocatedField = allocatedField;
    }
}