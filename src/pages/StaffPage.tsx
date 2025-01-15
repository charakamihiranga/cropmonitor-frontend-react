import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { RootState } from "../store/Store";
import { Staff } from "../model/Staff";
import AddStaff from "./AddStaff";
import { motion } from "framer-motion";
import {addStaffMember} from "../slice/StaffSlice.ts";

function StaffPage() {
    const staffMembers: Staff[] = useSelector((state: RootState) => state.staff);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();


    // Function to handle adding new staff
    const handleAddStaff = (newStaff: Staff) => {
        dispatch( addStaffMember(newStaff) );
        setIsModalOpen(false);
        console.log(staffMembers);
    };

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
            </div>
        </motion.div>
    );
}

export default StaffPage;