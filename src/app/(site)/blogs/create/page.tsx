/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddNewBlogPage = () => {
    const [blog, setBlog] = useState({
        title: "",
        content: "",
        category: "",
        image: ""
    });
    const router = useRouter();

    const handleChange = (e: any) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/create-blog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        if (res.ok) {
            alert("Blog created successfully!");
            // Optionally redirect after updating
            router.push("/blogs");
        } else {
            alert("Failed to create blog.");
        }

        router.push("/blogs");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Add New Blog
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the blog title"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the blog content"
                            rows={6}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="category"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the blog category"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="image"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the image URL"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            Create Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewBlogPage;