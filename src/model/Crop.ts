import {v4 as uuidv4} from "uuid";
import {Field} from "./Field.ts";
export class Crop{
    cropCode: string = `EQ-${uuidv4()}`;
    cropCommonName: string;
    cropScientificName: string;
    cropCategory: string;
    cropSeason: string;
    allocatedField: Field;
    cropImage?: string;
    constructor(
        cropCommonName: string,
        cropScientificName: string,
        cropCategory: string,
        cropSeason: string,
        allocatedField: Field,
        cropImage?: string
    ) {
        this.cropCommonName = cropCommonName;
        this.cropScientificName = cropScientificName;
        this.cropCategory = cropCategory;
        this.cropSeason = cropSeason;
        this.allocatedField = allocatedField;
        this.cropImage = cropImage;
    }
}