import {Crop} from "../model/Crop.ts";
import {motion} from "framer-motion";
import {Field} from "../model/Field.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import React, {useEffect, useState} from "react";

interface UpdateCropProps{
    isModalOpen: boolean;
    setIsOpenModal: (value: boolean) => void;
    onUpdate: (updateCrop: Crop) => void;
    crop: Crop;
}

function UpdateCrop({isModalOpen, setIsOpenModal, onUpdate, crop }: Readonly<UpdateCropProps>) {
    const fields: Field[] = useSelector((state: RootState) => state.field);
    const [formData, setFormData] = useState({
        cropCommonName: crop.cropCommonName,
        cropScientificName: crop.cropScientificName,
        cropCategory: crop.cropCategory,
        cropSeason: crop.cropSeason,
        allocatedFieldCode: crop.allocatedField.fieldCode,
        cropImage: ''
    });
    useEffect(() => {
        setFormData({
            cropCommonName: crop.cropCommonName,
            cropScientificName: crop.cropScientificName,
            cropCategory: crop.cropCategory,
            cropSeason: crop.cropSeason,
            allocatedFieldCode: crop.allocatedField.fieldCode,
            cropImage: ''
        });
    }, [isModalOpen, crop]);
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    function handleFileUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        imageKey: "cropImage"
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

    function handleUpdate() {
        const updateCrop: Crop = {
            ...crop,
            cropCommonName: formData.cropCommonName,
            cropScientificName: formData.cropScientificName,
            cropCategory: formData.cropCategory,
            cropSeason: formData.cropSeason,
            allocatedField: fields.find(field => field.fieldCode === formData.allocatedFieldCode) as Field,
            cropImage: formData.cropImage ? formData.cropImage : crop.cropImage
        }
        onUpdate(updateCrop);
        setIsOpenModal(false);
        clearFields();
    }

    function clearFields() {
        setFormData({
            cropCommonName: "",
            cropScientificName: "",
            cropCategory: "",
            cropSeason: "",
            allocatedFieldCode: '',
            cropImage: ''
        });
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
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.9}}
                    transition={{duration: 0.4}}
                >
                    <h1 className="text-center text-xl font-semibold mb-8">Update Crop</h1>
                    <div
                        className={"overflow-y-auto custom-scrollbar p-4 h-[56vh]" }
                    >
                        {crop.cropImage && (
                            <img
                                src={crop.cropImage}
                                alt="Preview"
                                className="rounded-lg mb-10 shadow-xl object-cover z-50 w-full h-64"
                            />
                        )}
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    className="block text-sm font-medium text-gray-900"
                                >Common Name</label
                                >
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="cropCommonName"
                                        onChange={handleInputChange}
                                        value={formData.cropCommonName}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-900"
                                >Scientific Name</label
                                >
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="cropScientificName"
                                        value={formData.cropScientificName}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-6">
                            <div className="sm:col-span-3">
                                <label
                                    className="block text-sm font-medium text-gray-900"
                                >Crop Category</label
                                >
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="cropCategory"
                                        value={formData.cropCategory}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    className="block text-sm font-medium text-gray-900"
                                >Crop Season</label
                                >
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="cropSeason"
                                        value={formData.cropSeason}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-6 mt-6">
                            <label
                                className="block text-sm font-medium text-gray-900"
                            >Allocated Fields</label
                            >
                            <select
                                name="allocatedFieldCode"
                                onChange={handleInputChange}
                                required
                                value={formData.allocatedFieldCode}
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-2 outline-gray-300 focus:outline-green-600"
                            >
                                <option value="" disabled>Select Field</option>
                                {fields.map((field) => (
                                    <option key={field.fieldCode} value={field.fieldCode}>{field.fieldName}</option>
                                ))}
                            </select>
                        </div>
                        <div id="file-upload-container" className="relative mt-8">
                            <label
                                htmlFor="file"
                                className={`flex flex-col items-center justify-center ${
                                    formData.cropImage ? "hidden" : "block"
                                } bg-gray-300 p-10 rounded-2xl border-2 border-dashed border-gray-500 shadow-xl cursor-pointer hover:bg-gray-200 transition-all`}
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
                                    onChange={(e) => handleFileUpload(e, "cropImage")}
                                />
                            </label>
                            {formData.cropImage && (
                                <img
                                    src={formData.cropImage}
                                    alt="Preview"
                                    className="rounded-lg shadow-xl object-cover z-50 w-full h-64"
                                />
                            )}
                        </div>
                    </div>
                    {/* Modal Footer */}
                    <div className="mt-6 font-semibold grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <button
                                className="bg-orange-600 w-full rounded-lg py-2 text-white hover:bg-orange-700 focus:outline-none"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                        <div className="sm:col-span-3">
                            <button
                                id="close-modal"
                                className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
                                onClick={() => {
                                    setIsOpenModal(false)
                                    clearFields()
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default UpdateCrop;