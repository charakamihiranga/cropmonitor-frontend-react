import FieldMap from "./FieldMap.tsx";
import {RootState} from "../store/Store.ts";
import {useSelector} from "react-redux";
import {Field} from "../model/Field.ts";


function FieldWidget() {
    const fields: Field[] = useSelector((state: RootState) => state.field);

    return (
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Field Map</h2>
                <div className="flex space-x-2">
                    <span
                        id="total-hec"
                        className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                    >
                        {fields.reduce((total, field) => total + field.fieldSize, 0)} hectares
                    </span>
                    <span
                        id="field-count"
                        className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full"
                    >
                        {fields.length} Fields
                    </span>
                </div>
            </div>
            <div id="map" className="w-full h-[36vh] bg-gray-300 rounded">
                <FieldMap fields={fields} height={36} />
            </div>
        </div>
    );
}

export default FieldWidget;