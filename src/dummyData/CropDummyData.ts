import fieldData from "./FieldDummyData.ts";
import {Crop} from "../model/Crop.ts";

const cropData: Crop[] = [
    new Crop(
        "Paddy",
        "Oryza sativa",
        "Cereal",
        "Maha",
        fieldData[0]
    ),
    new Crop(
        "Maize",
        "Zea mays",
        "Cereal",
        "Yala",
        fieldData[1]
    ),
    new Crop(
        "Tea",
        "Camellia sinensis",
        "Beverage",
        "Maha",
        fieldData[2]
    ),
    new Crop(
        "Rubber",
        "Hevea brasiliensis",
        "Industrial",
        "Yala",
        fieldData[3]
    ),
    new Crop(
        "Coconut",
        "Cocos nucifera",
        "Fruit",
        "Annual",
        fieldData[4]
    )
];

export default cropData;
