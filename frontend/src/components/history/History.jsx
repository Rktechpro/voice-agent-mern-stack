import React, { useContext } from "react";
import axios from "axios";
import { Usecontext } from "../../context/UserContext";
import { toast } from "react-toastify";
const History = () => {
  const { userData, setUserData, Url } = useContext(Usecontext);
  const history = userData?.history || [];

  const handleDeleteByText = async (textToDelete) => {
    try {
      const response = await axios.post(
        `${Url}/api/user/historydelete`,
        { text: textToDelete },
        {
          withCredentials: true, // ensures cookies are sent
        }
      );

      setUserData((prevData) => ({
        ...prevData,
        history: response.data.history,
      }));
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        "Error deleting history:",
        error.response?.data || error.message
      );
      toast.error(response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0b0022] via-[#1a0033] to-[#1a001f] min-h-screen p-6">
      <h1 className="text-3xl font-mono text-white mb-6">History</h1>

      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-white font-mono">
            <thead>
              <tr className="bg-[#220044]">
                <th className="py-2 px-4 border-b border-gray-600 text-left">
                  #
                </th>
                <th className="py-2 px-4 border-b border-gray-600 text-left">
                  Text
                </th>
                <th className="py-2 px-4 border-b border-gray-600 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="hover:bg-[#2a0055] transition-all">
                  <td className="py-2 px-4 border-b border-gray-700">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">{item}</td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    <button
                      onClick={() => handleDeleteByText(item)}
                      className="text-red-400 hover:text-red-600 font-semibold cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-300 text-lg font-mono">No history found.</p>
      )}
    </div>
  );
};

export default History;
