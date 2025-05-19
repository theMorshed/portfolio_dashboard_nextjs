"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BlogDeletePage = () => {
    const router = useRouter();
    const {blogId} = useParams();
    const [blog, setBlog] = useState({
        title: "",
        content: "",
        category: "",
        image: ""
    });
    // Fetch project data for editing
    useEffect(() => {
        const fetchProject = async () => {
            // Example of fetching project data from API (you'll replace this with actual API call)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`);
            const data = await response.json();
            if (data?.success) {
                setBlog(data?.data);            
            }
        };

        fetchProject();
    }, [blogId]);

    const handleDelete = () => {
        const deleteBlog = async() => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                alert("Blog deleted successfully!");
                // Optionally redirect after updating
                router.push("/blogs");
            } else {
                alert("Failed to create blog.");
            }
        }
        deleteBlog();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-semibold text-sky-800 dark:text-sky-200">{blog.title}</h1>
                {blog?.image && (
                    <Image
                    src={blog.image}
                    alt={blog.title}
                    width={800}
                    height={500}
                    className="w-full h-96 object-cover mt-6 rounded-lg"
                />
                )}
                <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">{blog.content}</p>
                {/* Delete blog Button */}
                <div className="mt-8 text-center">
                    <Link
                        onClick={handleDelete}
                        href="/blogs"
                        className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        Delete
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogDeletePage;