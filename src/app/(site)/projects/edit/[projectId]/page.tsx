/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const EditProjectPage = () => {
    const router = useRouter();
    // const {projectId}: any = use(params);
    const {projectId} = useParams();
    const [project, setProject] = useState({
        title: "",
        description: "",
        liveLink: "",
        image: ""
    });

    useEffect(() => {
        const fetchProject = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}`);
            const data = await response.json();
            if (data?.success) {
                setProject(data?.data);            
            }
        };

        fetchProject();
    }, [projectId]);

    const handleChange = (e: any) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        });
        if (res.ok) {
            alert("Project updated successfully!");
            // Optionally redirect after updating
            router.push("/projects");
        } else {
            alert("Failed to update project.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Edit Project
                </h1>

                {/* Edit Project Form */}
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Project Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={project.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Project Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={project?.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            rows={4}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="liveLink" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Live Link
                        </label>
                        <input
                            type="url"
                            id="liveLink"
                            name="liveLink"
                            value={project?.liveLink}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Project Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={project?.image}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            Update Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectPage;
