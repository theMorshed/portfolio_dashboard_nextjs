/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddSkillsPage = () => {
    const [skills, setSkills] = useState({
        name: "",
        icon: "",
        experience: "",
        projectsLink: ""
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
      
        setSkills((prev) => ({
          ...prev,
          [name]: name === "experience" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skills/create-skill`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(skills),
        });
        
        if (res.ok) {
            alert("Skills created successfully!");
            // Optionally redirect after updating
            router.push("/skills");
        } else {
            alert("Failed to create skills.");
        }

        router.push("/skills");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Add New Skills
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the skill name"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="icon"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Icon
                        </label>
                        <input
                            type="text"
                            id="icon"
                            name="icon"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the Icon name"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="experience"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Experience(In Year)
                        </label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the Experience"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="projectsLink"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Projects Link
                        </label>
                        <input
                            type="text"
                            id="projectsLink"
                            name="projectsLink"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the Projects link"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            Create Skill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSkillsPage;