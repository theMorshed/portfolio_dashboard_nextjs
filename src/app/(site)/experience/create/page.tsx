/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddExperiencePage = () => {
    const [experience, setExperience] = useState({
        designation: "",
        company: "",
        description: "",
        startDate: "",
        endDate: ""
    });
    const router = useRouter();

    const handleChange = (e: any) => {
        setExperience({ ...experience, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/create-experience`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(experience),
        });
        if (res.ok) {
            alert("Experience created successfully!");
            // Optionally redirect after updating
            router.push("/experience");
        } else {
            alert("Failed to create experience.");
        }

        router.push("/experience");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Add New Experience
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="designation"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Designation
                        </label>
                        <input
                            type="text"
                            id="designation"
                            name="designation"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the designation"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="company"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the company"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the description"
                            rows={5} // optional: adjust number of visible lines
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="startDate"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the Start Date"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="endDate"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the End Date"
                        />
                    </div>

                    {/* <div className="mb-4">
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
                    </div> */}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            Create Experience
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExperiencePage;