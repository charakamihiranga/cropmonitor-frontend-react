import {Equipment} from "../model/Equipment.ts";
import {Field} from "../model/Field.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {Staff} from "../model/Staff.ts";
import {useState} from "react";
import {motion} from "framer-motion";
import * as React from "react";

interface AddEquipmentProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    onSave: (equipment: Equipment) => void;
}
function AddEquipment({isModalOpen, setIsModalOpen, onSave}: Readonly<AddEquipmentProps>) {
    const employees : Staff[] = useSelector((state: RootState) => state.staff);
    const fields : Field[] = useSelector((state: RootState) => state.field);
    const [formData, setFormData] = useState({
        equipmentName: '',
        equipmentType: '',
        status: 'Available',
        allocatedEmployeeId: '',
        allocatedFieldCode: '',
    });
    function handleInputChange (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleSave(){
        const allocatedEmployee = employees.find(employee => employee.staffId === formData.allocatedEmployeeId);
        const allocatedField = fields.find(field => field.fieldCode === formData.allocatedFieldCode);
        if(allocatedEmployee && allocatedField){
            const newEquipment = new Equipment(formData.equipmentName, formData.equipmentType, formData.status, allocatedEmployee, allocatedField);
            onSave(newEquipment);
            setIsModalOpen(false);
        } else {
            console.error('Invalid Employee or Field');
        }
    }

    return (
        isModalOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{opacity: 0}} // Initial fade-in for the overlay
                animate={{opacity: isModalOpen ? 1 : 0}} // Fade-in/out animation
                exit={{opacity: 0}} // Fade-out on close
                transition={{duration: 0.3}} // Smooth transition for the background
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{opacity: 0}}
                    animate={{opacity: isModalOpen ? 0.5 : 0}} // Fade-in to 50% opacity
                    exit={{opacity: 0}} // Fade-out on close
                    transition={{duration: 0.3, ease: "easeInOut"}} // Smooth easing for the overlay
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[40vw]"
                    initial={{opacity: 0, scale: 0.8}} // Start slightly smaller and faded out
                    animate={{
                        opacity: isModalOpen ? 1 : 0,
                        scale: isModalOpen ? 1 : 0.8, // Zoom-in animation
                    }}
                    exit={{
                        opacity: 0, // Fade out
                        scale: 0.9, // Slight shrink
                        y: 50, // Slide down slightly for a smoother exit
                    }} // Shrink and fade out on close
                    transition={{
                        duration: 0.4, // Slightly longer for content to emphasize smoothness
                        ease: "easeInOut", // Professional easing
                    }}
                >
                    <h1 className="text-center text-xl font-semibold mb-5">Add Equipment</h1>
                    <div className="overflow-y-auto custom-scrollbar p-4">
                        <div className="mb-6">
                            <label
                                htmlFor="vehicle-category"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Equipment Name
                            </label>
                            <input
                                type="text"
                                name="equipmentName"
                                id="vehicle-category"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.equipmentName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="fuel-type"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Equipment Type
                            </label>
                            <select
                                name="equipmentType"
                                id="fuel-type"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.equipmentType}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Select Equipment Type
                                </option>
                                <option value="ELECTRICAL">ELECTRICAL</option>
                                <option value="MECHANICAL">MECHANICAL</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Status
                            </label>
                            <select
                                name="status"
                                id="status"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="Available">AVAILABLE</option>
                                <option value="Not_Available">NOT AVAILABLE</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="allocated-staff"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Allocated Employee
                            </label>
                            <select
                                name="allocatedEmployeeId"
                                id="allocated-staff"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.allocatedEmployeeId}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Select Staff Member
                                </option>
                                {employees.map((staff) => (
                                    <option key={staff.staffId} value={staff.staffId}>
                                        {staff.firstName} {staff.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="allocated-staff"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Allocated Field
                            </label>
                            <select
                                name="allocatedFieldCode"
                                id="allocated-staff"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.allocatedFieldCode}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Select Field
                                </option>
                                {fields.map((field) => (
                                    <option key={field.fieldCode} value={field.fieldCode}>
                                        {field.fieldName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="mt-8 font-semibold grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <button
                                id="btn-save"
                                className="bg-green-600 w-full rounded-lg py-2 text-white hover:bg-green-700 focus:outline-none"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                        <div className="sm:col-span-3">
                            <button
                                id="close-modal"
                                className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
                                onClick={() => setIsModalOpen(false)}
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

export default AddEquipment;