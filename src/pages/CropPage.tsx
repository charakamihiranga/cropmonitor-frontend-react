import {Crop} from "../model/Crop.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {useState} from "react";
import toast from "react-hot-toast";
import DeleteModal from "../component/DeleteModal.tsx";
import {motion} from "framer-motion";
import DataTable from "../component/DataTable.tsx";
import AddCrop from "./AddCrop.tsx";
import {addCrop, removeCrop, updateCrop} from "../slice/CropSlice.ts";
import ViewCrop from "./ViewCrop.tsx";
import UpdateCrop from "./UpdateCrop.tsx";

function CropPage() {
    const crops : Crop [] = useSelector((state: RootState) => state.crop);
    const dispatch = useDispatch();
    const cropHeaders = ['Common Name', 'Scientific Name', 'Category', 'Crop Season','Allocated Field', 'Actions'];
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

    const renderCropRow = (crop: Crop) => (
        <>
            <div className="p-2 truncate">{crop.cropCommonName}</div>
            <div className="p-2 truncate">{crop.cropScientificName}</div>
            <div className="p-2 hidden sm:block truncate">{crop.cropCategory}</div>
            <div className="p-2 truncate">{crop.cropSeason}</div>
            <div className="p-2 truncate">{crop.allocatedField.fieldName}</div>
        </>
    );

    function handleAddCrop( newCrop:Crop) {
        dispatch(addCrop(newCrop));
        setIsAddModalOpen(false);
        toast.success('Crop Saved Successfully')
    }

    function handleViewCrop(crop: Crop) {
        setSelectedCrop(crop);
        setIsViewModalOpen(true);
    }

    function openUpdateModal(crop: Crop) {
        setSelectedCrop(crop);
        setIsUpdateModalOpen(true);
    }

    function handleUpdateCrop(crop: Crop) {
        dispatch(updateCrop(crop));
        setIsUpdateModalOpen(false);
        toast.success(
            <div className="flex items-center space-x-2 ">
                <i className="fa fa-refresh text-orange-600"></i>
                <span>Crop updated successfully!</span>
            </div>,
            {icon: false}
        );
    }

    function handleCropDelete(crop: Crop) {
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(removeCrop(crop.cropCode));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Crop deleted successfully!</span>
                        </div>,
                        { icon: false }
                    );
                }}
                onCancel={() => {
                    toast.dismiss(t.id);
                }}
            />
        ));
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.8, 0.5, 1],
            }}
        >
            <div className="container mx-auto p-5">
                <h1 className="text-xl sm:text-2xl font-semibold mb-8 text-center sm:text-left">
                    Crop Management
                </h1>
                <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-5">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
                    >
                        <i className="fa-solid fa-plus font-bold"></i>
                        <span className="pl-2">Add</span>
                    </button>
                </div>
                {/*modal for add crops*/}
                <AddCrop
                    isModalOpen={isAddModalOpen}
                    setIsOpenModal={setIsAddModalOpen}
                    onSave={handleAddCrop}
                />
                {/*modal for view crops*/}
                { selectedCrop && (
                        <ViewCrop
                            isModalOpen={isViewModalOpen}
                            setIsOpenModal={setIsViewModalOpen}
                            crop={selectedCrop}
                        />
                )}
                {/*modal for update crops*/}
                { selectedCrop && (
                    <UpdateCrop
                        isModalOpen={isUpdateModalOpen}
                        setIsOpenModal={setIsUpdateModalOpen}
                        crop={selectedCrop}
                        onUpdate={handleUpdateCrop}
                    />
                )}
                <DataTable
                    data={crops}
                    headers={cropHeaders}
                    renderRow={renderCropRow}
                    handleView={handleViewCrop}
                    handleUpdate={openUpdateModal}
                    handleDelete={handleCropDelete}
                />
            </div>
        </motion.div>
    );
}

export default CropPage;