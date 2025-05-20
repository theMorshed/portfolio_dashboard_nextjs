/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Edit, Trash } from "lucide-react";

const ExperiencePage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience`);
    const experience = await res.json();
    const experienceList = experience?.data;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Manage Experience
                </h1>

                {/* Table displaying the projects */}
                <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Designation</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Company</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Description</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Start Date</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">End Date</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experienceList?.map((experience: any) => (
                            <tr key={experience._id} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-4 px-6 text-sm font-medium text-gray-800 dark:text-gray-200">{experience.designation}</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{experience.company}</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{experience.description.slice(0, 50)}...</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{experience.startDate}</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{experience.endDate?.substring(0, 10)}</td>                                
                                <td className="py-4 px-6 text-sm">
                                    <Link href={`/experience/edit/${experience._id}`} passHref>
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-400 transition-all duration-200">
                                            <Edit size={18} />
                                        </button>
                                    </Link>
                                    <Link href={`/experience/delete/${experience._id}`} passHref>
                                        <button 
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-all duration-200"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add New Experience Button */}
                <div className="mt-8 text-center">
                    <Link
                        href="/experience/create"
                        className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        Add New Experience
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;
