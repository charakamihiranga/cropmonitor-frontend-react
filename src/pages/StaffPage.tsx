import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { RootState } from "../store/Store";
import { Staff } from "../model/Staff";
import AddStaff from "./AddStaff";
import { motion } from "framer-motion";
import {addStaffMember, removeStaffMember} from "../slice/StaffSlice.ts";
import DataTable from "../component/DataTable.tsx";
import ViewStaff from "./ViewStaff.tsx";
import toast from "react-hot-toast";
import DeleteModal from "../component/DeleteModal.tsx";

function StaffPage() {
    const staffMembers: Staff[] = useSelector((state: RootState) => state.staff);
    const dispatch = useDispatch();
    const staffHeaders = ['Name', 'Designation', 'Email', 'Contact No', 'Gender', 'Actions'];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)


    const renderStaffRow = (staff: Staff) => (
        <>
            <div className="p-2 truncate">{staff.firstName} {staff.lastName}</div>
            <div className="p-2 truncate">{staff.designation}</div>
            <div className="p-2 hidden sm:block truncate">{staff.email}</div>
            <div className="p-2 truncate">{staff.contactNo}</div>
            <div className="p-2 truncate">{staff.gender}</div>
        </>
    );

    // Function to handle adding new staff
    function handleAddStaff(newStaff: Staff) {
        dispatch( addStaffMember(newStaff));
        setIsModalOpen(false);
        toast.success('Staff saved successfully');
    }

    function handleViewStaff(staff: Staff) {
        console.log(staff)
        setSelectedStaff(staff);
        setIsViewModalOpen(true);
    }


    function handleUpdateStaff(staff: Staff){
        alert(`Updating ${staff.firstName} ${staff.lastName}`);
    }

    function handleDeleteStaff(staff: Staff){
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(removeStaffMember(staff.staffId));
                    toast.success(
                        <div className="flex items-center space-x-2 text-red-600">
                            <i className="fa fa-trash"></i> {/* Red delete icon */}
                            <span>Staff deleted successfully!</span>
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
                opacity: 0,  // Start invisible
            }}
            animate={{
                opacity: 1,  // Fade in to full visibility
            }}
            exit={{
                opacity: 0,  // Fade out
            }}
            transition={{
                duration: 0.8,  // Duration for the fade effect
                ease: [0.25, 0.8, 0.5, 1],  // Smooth easing curve
            }}
        >
            <div className="container mx-auto p-5">
                <h1 className="text-xl sm:text-2xl font-semibold mb-8 text-center sm:text-left">
                    Staff Management
                </h1>
                <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-5">
                    <button
                        id="btn-add"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
                    >
                        <i className="fa-solid fa-plus font-bold"></i>
                        <span className="pl-2">Add</span>
                    </button>
                </div>

                {/* Modal for Adding Staff */}
                <AddStaff isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onSave={handleAddStaff}/>
                {/* Modal for Viewing Staff */}
                { selectedStaff && (
                    <ViewStaff
                        isOpenModal={isViewModalOpen}
                        setIsOpenModal={setIsViewModalOpen}
                        staff={selectedStaff}
                    />
                )}
                <DataTable data={staffMembers} headers={staffHeaders} renderRow={renderStaffRow}
                           handleView={handleViewStaff} handleUpdate={handleUpdateStaff} handleDelete={handleDeleteStaff}
                ></DataTable>
            </div>
        </motion.div>
    );
}

export default StaffPage;