import {Crop} from "../model/Crop.ts";
import {motion} from "framer-motion";

interface ViewCropProps{
    isModalOpen: boolean;
    setIsOpenModal: (value: boolean) => void;
    crop: Crop;
}

function ViewCrop({isModalOpen, setIsOpenModal, crop }: Readonly<ViewCropProps>) {
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
                    <h1 className="text-center text-xl font-semibold mb-6">View Crop</h1>
                    <div
                        className={`overflow-y-auto p-4 ${
                            crop.cropImage ? "h-[56vh]" : "h-[calc(56vh-16rem)]"
                        }`}
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
                                        readOnly
                                        value={crop.cropCommonName}
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
                                        readOnly
                                        value={crop.cropScientificName}
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
                                        readOnly
                                        value={crop.cropCategory}
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
                                        readOnly
                                        value={crop.cropSeason}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="staff-dropdown"
                                className="block text-sm font-medium text-gray-900"
                            >Allocated Field</label
                            >
                            <input
                                type="text"
                                readOnly
                                value={crop.allocatedField.fieldName }
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 font-semibold ">
                        <div className="sm:col-span-6">
                            <div className="mt-2">
                                <button
                                    onClick={() => {
                                        setIsOpenModal(false);
                                    }
                                }
                                    className="bg-gray-300 w-full rounded-lg py-2 px-4 text-black hover:bg-gray-400 focus:outline-none "
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default ViewCrop;