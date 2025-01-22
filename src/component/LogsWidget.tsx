import { useSelector } from "react-redux";
import { Log } from "../model/Log";
import { RootState } from "../store/Store";

function LogsWidget() {
    const logs: Log[] = useSelector((state: RootState) => state.log);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Filter logs for today
    const todayLogs = logs.filter((log) => {
        const logDate = typeof log.logDate === "string" ? log.logDate : log.logDate.toISOString();
        return logDate.split("T")[0] === today;
    });

    const logCount = todayLogs.length;

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-lg font-semibold">Today Logs</h2>
                <span
                    className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                >
          {logCount} {logCount === 1 ? "Log" : "Logs"}
        </span>
            </div>
            <div className="space-y-2 custom-scrollbar overflow-y-auto h-48">
                {logCount > 0 ? (
                    todayLogs.map((log) => (
                        <div
                            key={log.logCode}
                            className="bg-green-100 text-green-800 p-3 rounded"
                        >
                            {log.observation}
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 p-3 rounded">No logs for today.</div>
                )}
            </div>
        </div>
    );
}

export default LogsWidget;
