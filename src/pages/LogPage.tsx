import {motion} from "framer-motion";
import {Log} from "../model/Log.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import LogCardContainer from "./LogCardContainer.tsx";
import {useState} from "react";
import AddLog from "./AddLog.tsx";
import {addLog, removeLog, updateLog} from "../slice/LogSlice.ts";
import toast from "react-hot-toast";
import LogActions from "./LogActions.tsx";
import DeleteModal from "../component/DeleteModal.tsx";

function LogPage() {
    const logs : Log[] = useSelector((state: RootState) => state.log);
    const dispatch = useDispatch();
    const [selectedField, setIsSelectedField] = useState<Log | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);


    function handleAddLog(log: Log) {
        console.log(log);
        dispatch(addLog(log));
        setIsAddModalOpen(false);
        toast.success('Log Added Successfully');
    }

    function openLogActionsModal(log: Log) {
        setIsSelectedField(log);
        setIsActionModalOpen(true);
    }

    function handleUpdateLog(log: Log) {
        dispatch(updateLog(log));
        setIsActionModalOpen(false);
        toast.success('Log Updated Successfully');
    }

    function handleDeleteLog(logCode: string) {
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(removeLog(logCode));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Log deleted successfully!</span>
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
            <div className="container mx-auto p-5 ">
                <h1 className="text-xl sm:text-2xl font-semibold mb-8 text-center sm:text-left">
                    Log Management
                </h1>
                <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-8">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
                    >
                        <i className="fa-solid fa-plus font-bold"></i>
                        <span className="pl-2">Add</span>
                    </button>
                </div>
               <div className={'h-[70vh] overflow-y-scroll custom-scrollbar'}>
                   <LogCardContainer
                       logs={logs}
                       onCardClick={openLogActionsModal}
                   />
               </div>
                {/*modal for add log*/}
                <AddLog
                    isModalOpen={isAddModalOpen}
                    setIsModalOpen={setIsAddModalOpen}
                    onSave={handleAddLog}
                />
                {/*modal for log actions*/}
                {selectedField && (
                    <LogActions
                        isModalOpen={isActionModalOpen}
                        setModalOpen={setIsActionModalOpen}
                        log={selectedField}
                        onUpdateLog={handleUpdateLog}
                        onDeleteLog={handleDeleteLog}
                    />
                )}
            </div>
        </motion.div>
    );
}

export default LogPage;