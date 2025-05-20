/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TiptapEditor from "@/components/TiptapEditor";

const EditBlogPage = () => {
    const router = useRouter();
    const { blogId } = useParams();
    const [content, setContent] = useState(""); // TipTap content
    const [blog, setBlog] = useState({
        title: "",
        category: "",
        image: ""
    });

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`);
            const data = await response.json();
            if (data?.success) {
                const blogData = data.data;
                setBlog({
                    title: blogData.title,
                    category: blogData.category,
                    image: blogData.image
                });
                setContent(blogData.content); // Set TipTap content
            }
        };

        fetchBlog();
    }, [blogId]);

    const handleChange = (e: any) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedBlog = {
            ...blog,
            content, // from TipTap editor
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBlog),
        });

        if (res.ok) {
            alert("Blog updated successfully!");
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

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
                >
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={blog.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the blog title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Content
                        </label>
                        <div className="editor-content">
                            <TiptapEditor content={content} onChange={setContent} />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={blog.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the blog category"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={blog.image}
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
                            Update Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlogPage;
