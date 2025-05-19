/* eslint-disable @typescript-eslint/no-explicit-any */

const ManageMessagePage = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message`);
    const message = await res.json();
    const messageList = message?.data;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Manage Messages
                </h1>

                {/* Table displaying the blogs */}
                <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Message</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {messageList.map((message: any) => (
                            <tr key={message._id} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-4 px-6 text-sm font-medium text-gray-800 dark:text-gray-200">{message.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{message.email}</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{message.message.slice(0, 50)}...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMessagePage;
