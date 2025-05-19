/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Edit, Trash } from "lucide-react";

const SkillsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skills`);
    const skills = await res.json();
    const skillsList = skills?.data;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Manage Skills
                </h1>

                {/* Table displaying the projects */}
                <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Icon</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Experience in year</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Projects Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skillsList.map((skill: any) => (
                            <tr key={skill._id} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-4 px-6 text-sm font-medium text-gray-800 dark:text-gray-200">{skill.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{skill.icon}</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{skill.experience}</td>
                                <td className="py-4 px-6 text-sm text-blue-600 dark:text-blue-400">
                                    <a href={skill.projectsLink} target="_blank" rel="noopener noreferrer">{skill.projectsLink}</a>
                                </td>
                                <td className="py-4 px-6 text-sm">
                                    <Link href={`/skills/edit/${skill._id}`} passHref>
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-400 transition-all duration-200">
                                            <Edit size={18} />
                                        </button>
                                    </Link>
                                    <Link href={`/skills/delete/${skill._id}`} passHref>
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

                {/* Add New Skill Button */}
                <div className="mt-8 text-center">
                    <Link
                        href="/skills/create"
                        className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        Add New Skill
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SkillsPage;
