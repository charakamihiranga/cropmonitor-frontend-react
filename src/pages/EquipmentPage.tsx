import { motion } from "framer-motion";
import DataTable from "../component/DataTable.tsx";
import {Equipment} from "../model/Equipment.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {useState} from "react";
import toast from "react-hot-toast";
import {addEquipment, removeEquipment} from "../slice/EquipmentSlice.ts";
import AddEquipment from "./AddEquipment.tsx";
import ViewEquipment from "./ViewEquipment.tsx";
import DeleteModal from "../component/DeleteModal.tsx";
import {removeVehicle} from "../slice/VehicleSlice.ts";
function EquipmentPage() {
    const equipments: Equipment[] = useSelector((state: RootState) =>  state.equipment);
    const dispatch = useDispatch();
    const equipmentHeaders = ['Name', 'Type', 'Status', 'Allocated Employee' ,'Allocated Field', 'Actions'];
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);

    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const renderEquipmentRow = (equipment: Equipment) => (
        <>
            <div className="p-2 truncate">{equipment.equipmentName}</div>
            <div className="p-2 truncate">{equipment.equipmentType}</div>
            <div className="p-2 hidden sm:block truncate">{equipment.status}</div>
            <div className="p-2 truncate">{`${equipment.allocatedEmployee.firstName} ${equipment.allocatedEmployee.lastName}`}</div>
            <div className="p-2 truncate">{equipment.allocatedField.fieldName}</div>
        </>
    );
    function handleAddEquipment(newEquipment: Equipment){
        dispatch(addEquipment(newEquipment));
        setIsAddModalOpen(false);
        toast.success('Equipment Added Successfully')
    }
    function handleViewEquipment(equipment: Equipment){
       setSelectedEquipment(equipment);
       setViewModalOpen(true);
    }
    function openUpdateModal(equipment: Equipment){
        console.log(equipment);
    }
    function handleUpdateEquipment(equipment: Equipment) {
        console.log(equipment);
    }
    function handleDeleteEquipment(equipment: Equipment){
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(removeEquipment(equipment.equipmentId));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Equipment deleted successfully!</span>
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
                    Equipment Management
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
                {/*modal for add equipment*/}
                < AddEquipment
                    isModalOpen={isAddModalOpen}
                    setIsModalOpen={setIsAddModalOpen}
                    onSave={handleAddEquipment}
                />
                {/*modal for view equipment*/}
                {selectedEquipment && (
                    <ViewEquipment
                        equipment={selectedEquipment}
                        isModalOpen={isViewModalOpen}
                        setIsOpenModal={setViewModalOpen}
                    />
                )}
                <DataTable
                    data={equipments}
                    headers={equipmentHeaders}
                    renderRow={renderEquipmentRow}
                    handleView={handleViewEquipment}
                    handleDelete={handleDeleteEquipment}
                    handleUpdate={openUpdateModal}
                />
            </div>
        </motion.div>
);
}

export default EquipmentPage;