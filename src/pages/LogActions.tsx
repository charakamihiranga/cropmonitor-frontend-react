import {Log} from "../model/Log.ts";
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {Staff} from "../model/Staff.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {Field} from "../model/Field.ts";
import {Crop} from "../model/Crop.ts";

interface LogActionProps{
    log: Log;
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    onUpdateLog: (log: Log) => void;
    onDeleteLog: (logCode: string) => void;
}

function LogActions({log, isModalOpen, setModalOpen, onUpdateLog, onDeleteLog }: Readonly<LogActionProps>) {
    const staffMembers: Staff[] = useSelector((state: RootState) => state.staff);
    const fields: Field[] = useSelector((state: RootState) => state.field);
    const crops: Crop[] = useSelector((state: RootState) => state.crop);
    const [selectedStaff, setSelectedStaff] = useState<Staff[]>([]);
    const [selectedFields, setSelectedFields] = useState<Field[]>([]);
    const [selectedCrops, setSelectedCrops] = useState<Crop[]>([]);

    const [formData, setFormData] = useState({
        observation: '',
        observedImage: '',

    });

    useEffect(() => {
        setFormData({
            observation: log.observation,
            observedImage: '',
        });
        setSelectedStaff(log.allocatedStaff);
        setSelectedFields(log.allocatedFields);
        setSelectedCrops(log.allocatedCrops);
    }, [isModalOpen, log]);

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement >) {
        const {name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }

    // Filter available staff for the dropdown
    const availableStaff = staffMembers.filter(
        (staff) => !selectedStaff.some((s) => s.staffId === staff.staffId)
    );

    // Filter available fields for the dropdown
    const availableFields = fields.filter(
        (field) => !selectedFields.some((f) => f.fieldCode === field.fieldCode)
    );

    // Filter available crops for the dropdown
    const availableCrops = crops.filter(
        (crop) => !selectedCrops.some((c) => c.cropCode === crop.cropCode)
    );

    function handleStaffSelection(e: React.ChangeEvent<HTMLSelectElement>) {
        const staffId = e.target.value;
        if (staffId) {
            const staff = staffMembers.find((staff) => staff.staffId === staffId);
            if (staff && !selectedStaff.some((s) => s.staffId === staffId)) {
                setSelectedStaff([...selectedStaff, staff]);
            }
            e.target.value = ""; // Reset dropdown selection
        }
    }

    function handleFieldSelection(e: React.ChangeEvent<HTMLSelectElement>) {
        const fieldCode = e.target.value;
        if (fieldCode) {
            const field = fields.find((field) => field.fieldCode === fieldCode);
            if (field && !selectedFields.some((f) => f.fieldCode === fieldCode)) {
                setSelectedFields([...selectedFields, field]);
            }
            e.target.value = ""; // Reset dropdown selection
        }
    }

    function handleCropSelection(e: React.ChangeEvent<HTMLSelectElement>) {
        const cropCode = e.target.value;
        if (cropCode) {
            const crop = crops.find((crop) => crop.cropCode === cropCode);
            if (crop && !selectedCrops.some((c) => c.cropCode === cropCode)) {
                setSelectedCrops([...selectedCrops, crop]);
            }
            e.target.value = ""; // Reset dropdown selection
        }
    }

    function removeFieldBadge(fieldCode: string) {
        setSelectedFields(
            selectedFields.filter((field) => field.fieldCode !== fieldCode)
        );
    }

    function removeCropBadge(cropCode: string) {
        setSelectedCrops(
            selectedCrops.filter((crop) => crop.cropCode !== cropCode)
        );
    }

    function removeStaffBadge(staffId: string) {
        setSelectedStaff(
            selectedStaff.filter((staff) => staff.staffId !== staffId)
        );
    }

    function handleFileUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        imageKey: "observedImage"
    ) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    [imageKey]: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    function clearFields() {
        setFormData({
            observation: '',
            observedImage: '',
        });

        setSelectedStaff([]);
        setSelectedFields([]);
        setSelectedCrops([]);
        (document.getElementById('observation') as HTMLTextAreaElement).value = '';
    }

    function handleUpdateLog(){
        const updateLog: Log = {
            ...log,
            observation: formData.observation,
            observedImage: formData.observedImage ? formData.observedImage : log.observedImage,
            allocatedFields: selectedFields,
            allocatedCrops: selectedCrops,
            allocatedStaff: selectedStaff,
        }
        onUpdateLog(updateLog);
        setModalOpen(false);
        clearFields();
    }

    function handleDeleteLog() {
        onDeleteLog(log.logCode);
        setModalOpen(false);
    }

    return (
        isModalOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Background Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800 opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                ></motion.div>

                {/* Modal Content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full sm:w-[42vw] drop-shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-center text-xl font-semibold mb-5"> View Log Details</h1>
                        <div
                            className={"overflow-y-auto h-[56vh] p-4 custom-scrollbar"}
                        >
                            {log.observedImage && (
                                <img
                                    src={log.observedImage}
                                    alt="Preview"
                                    className="rounded-lg mb-10 shadow-xl object-cover z-50 w-full h-64"
                                />
                            )}
                        {/* Allocated Field Dropdown */}
                        <div className="mb-6">
                            <label
                                htmlFor="field-dropdown"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Allocated Field
                            </label>
                            <select
                                id="field-dropdown"
                                onChange={handleFieldSelection}
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-2 outline-gray-300 focus:outline-green-600"
                            >
                                <option value="">Select Field</option>
                                {availableFields.map((field) => (
                                    <option key={field.fieldCode} value={field.fieldCode}>
                                        {field.fieldName}
                                    </option>
                                ))}
                            </select>
                            <div id="selected-fields" className="flex flex-wrap gap-2 mt-4">
                                {selectedFields.map((field) => (
                                    <span
                                        key={field.fieldCode}
                                        className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                                    >
                                        {field.fieldName}
                                        <button
                                            type="button"
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => removeFieldBadge(field.fieldCode)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Allocated Crop Dropdown */}
                        <div className="mb-6">
                            <label
                                htmlFor="crop-dropdown"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Allocated Crop
                            </label>
                            <select
                                id="crop-dropdown"
                                onChange={handleCropSelection}
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-2 outline-gray-300 focus:outline-green-600"
                            >
                                <option value="">Select Crop</option>
                                {availableCrops.map((crop) => (
                                    <option key={crop.cropCode} value={crop.cropCode}>
                                        {crop.cropCommonName}
                                    </option>
                                ))}
                            </select>
                            <div id="selected-crops" className="flex flex-wrap gap-2 mt-4">
                                {selectedCrops.map((crop) => (
                                    <span
                                        key={crop.cropCode}
                                        className="bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                                    >
                                        {crop.cropCommonName}
                                        <button
                                            type="button"
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => removeCropBadge(crop.cropCode)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Allocated Staff Dropdown */}
                        <div className="mb-6">
                            <label
                                htmlFor="staff-dropdown"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Allocated Staff
                            </label>
                            <select
                                id="staff-dropdown"
                                onChange={handleStaffSelection}
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-2 outline-gray-300 focus:outline-green-600"
                            >
                                <option value="">Select Staff</option>
                                {availableStaff.map((staff) => (
                                    <option key={staff.staffId} value={staff.staffId}>
                                        {`${staff.firstName} ${staff.lastName}`}
                                    </option>
                                ))}
                            </select>
                            <div id="selected-staff" className="flex flex-wrap gap-2 mt-4">
                                {selectedStaff.map((staff) => (
                                    <span
                                        key={staff.staffId}
                                        className="bg-green-200 text-green-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                                    >
                                        {staff.firstName} {staff.lastName}
                                        <button
                                            type="button"
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => removeStaffBadge(staff.staffId)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Observation */}
                        <div className="mb-6">
                            <label
                                htmlFor="observation"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Observation
                            </label>
                            <textarea
                                id={'observation'}
                                value={formData.observation}
                                name="observation"
                                className="mt-2 block w-full h-[20vh] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        {/*update image*/}
                        <div id="file-upload-container" className="relative mb-2">
                            <label
                                htmlFor="file"
                                className={`flex flex-col items-center justify-center ${formData.observedImage ? "hidden" : "block"} bg-gray-300 p-10 rounded-2xl border-2 border-dashed border-gray-500 shadow-xl cursor-pointer hover:bg-gray-200 transition-all`}
                            >
                                <svg
                                    className="h-12 mb-4 fill-green-600"
                                    viewBox="0 0 640 512"
                                >
                                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                                </svg>
                                <p className="text-gray-700 text-lg font-semibold">
                                    Drag and Drop
                                </p>
                                <p className="text-gray-600">or</p>
                                <span className="bg-green-600 text-white px-5 py-2 rounded-lg mt-2 hover:bg-green-700 transition-all">
                                    Browse file
                                </span>
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, "observedImage")}
                                />
                            </label>
                            {formData.observedImage && (
                                <img
                                    src={formData.observedImage}
                                    alt="Preview"
                                    className="rounded-lg shadow-xl object-cover z-50 w-full h-64"
                                />
                            )}
                            </div>
                        </div>
                    {/* Modal Footer */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-semibold">
                        <button
                            onClick={handleUpdateLog}
                            className="bg-green-600 w-full rounded-lg py-2 text-white hover:bg-green-700 focus:outline-none"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDeleteLog}
                            className="bg-red-600 w-full rounded-lg py-2 text-white hover:bg-red-700 focus:outline-none"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                setModalOpen(false);
                                clearFields();
                            }}
                            className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default LogActions;