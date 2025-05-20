/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";

const ManageBlogsPage = async() => {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`);
    const blog = await res.json();
    const blogList = blog?.data;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Manage Blogs
                </h1>

                {/* Table displaying the blogs */}
                <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Title</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Content</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Image</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogList.map((blog: any) => (
                            <tr key={blog._id} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-4 px-6 text-sm font-medium text-gray-800 dark:text-gray-200">{blog.title}</td>
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{blog.category}</td>
                                {/* <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{blog.content.slice(0, 50)}...</td> */}
                                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                                    <div
                                        className="prose dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 50) }}
                                    />
                                </td>
                                <td className="py-4 px-6 text-sm">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={100}
                                        height={100}
                                        className="object-cover rounded-md"
                                    />
                                </td>
                                <td className="py-4 px-6 text-sm">
                                    <Link href={`/blogs/edit/${blog._id}`} passHref>
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-400 transition-all duration-200">
                                            <Edit size={18} />
                                        </button>
                                    </Link>
                                    <Link href={`/blogs/delete/${blog._id}`} passHref>
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

                {/* Add New Blog Button */}
                <div className="mt-8 text-center">
                    <Link
                        href="/blogs/create"
                        className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        Add New Blog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ManageBlogsPage;