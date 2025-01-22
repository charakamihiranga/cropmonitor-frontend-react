import {Equipment} from "../model/Equipment.ts";
import {motion} from "framer-motion";
interface ViewEquipmentProps {
    isModalOpen: boolean;
    setIsOpenModal: (value: boolean) => void;
    equipment: Equipment;
}

function ViewEquipment({isModalOpen, setIsOpenModal, equipment}: Readonly<ViewEquipmentProps>) {
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
                    <h1 className="text-center text-xl font-semibold mb-5">View Equipment</h1>
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
                                readOnly
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={equipment.equipmentName}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className="block text-sm font-medium text-gray-900"
                            >
                                Equipment Type
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={equipment.equipmentType.toUpperCase() }
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Status
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={equipment.status.toUpperCase() }
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="allocated-staff"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Allocated Employee
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={`${equipment.allocatedEmployee?.firstName || ""} ${equipment.allocatedEmployee?.lastName || ""}`.trim() || "Not Allocated"}
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="allocated-staff"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Allocated Field
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={`${equipment.allocatedField?.fieldName || "Not_Allocated"}`}
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Modal Footer */}
                        <div className="sm:col-span-3 font-semibold">
                            <button
                                id="close-modal"
                                className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
                                onClick={() => setIsOpenModal(false)}
                            >
                                Close
                            </button>
                        </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default ViewEquipment;