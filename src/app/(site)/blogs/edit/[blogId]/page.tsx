/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const EditBlogPage = () => {
    const router = useRouter();
    // const {projectId}: any = use(params);
    const {blogId} = useParams();
    const [blog, setBlog] = useState({
        title: "",
        content: "",
        category: "",
        image: ""
    });

    useEffect(() => {
        const fetchProject = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`);
            const data = await response.json();
            if (data?.success) {
                setBlog(data?.data);            
            }
        };

        fetchProject();
    }, [blogId]);
    
    const handleChange = (e: any) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        if (res.ok) {
            alert("Blog updated successfully!");
            // Optionally redirect after updating
            router.push("/blogs");
        } else {
            alert("Failed to update blog.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Edit Blog
                </h1>

                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={blog.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Blog Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={blog.content}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            rows={6}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="liveLink" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            id="liveLink"
                            name="category"
                            value={blog.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Blog Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={blog?.image}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                    </div>                    

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            Update Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlogPage;