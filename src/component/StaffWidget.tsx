import scientist from '../assets/img/Scientist.png';
import administrative from '../assets/img/Admin.png';
import manager from '../assets/img/Manager.png';
import {useSelector} from "react-redux";
import {Staff} from "../model/Staff.ts";
import {RootState} from "../store/Store.ts";

function StaffWidget() {
    const staffMembers: Staff[] = useSelector((state: RootState) => state.staff);
    // Define a mapping of roles to their respective images
    const roles = [
        { name: 'Manager', image: manager, count: 0 },
        { name: 'Administrative', image: administrative, count: 0 },
        { name: 'Scientist', image: scientist, count: 0 },
    ];

    roles.forEach((role) => {
        role.count = staffMembers.filter((member) =>
            member.role.toLowerCase() === role.name.toLowerCase()).length;
    });

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4 text-center">Staff Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => (
                    <div
                        key={role.name}
                        className="bg-green-100 text-center py-6 rounded-lg flex flex-col items-center"
                    >
                        <img src={role.image} alt={`${role.name} Icon`} className="mb-4" />
                        <p className="text-5xl font-bold mb-4">{role.count}</p>
                        <p className="text-sm">{role.name}s</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StaffWidget;
