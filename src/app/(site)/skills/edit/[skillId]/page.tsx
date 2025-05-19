/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditSkillsPage = () => {
    const router = useRouter();
    const { skillId } = useParams();

    const [skills, setSkills] = useState({
        name: "",
        icon: "",
        experience: 0,
        projectsLink: ""
    });

    useEffect(() => {
        if (!skillId) return;

        const fetchSkill = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skills/${skillId}`);
                if (!res.ok) throw new Error("Failed to fetch skill");
                const data = await res.json();
                if (data?.success) {
                    setSkills(data?.data);
                }
            } catch (error) {
                alert("Failed to load skill details.");
                router.push("/skills");
            }
        };

        fetchSkill();
    }, [skillId, router]);

    console.log(skills);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSkills((prev) => ({
            ...prev,
            [name]: name === "experience" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skills/${skillId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(skills),
            });

            if (res.ok) {
                alert("Skill updated successfully!");
                router.push("/skills");
            } else {
                alert("Failed to update skill.");
            }
        } catch (error) {
            alert("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
                    Edit Skill
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={skills.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the skill name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="icon" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Icon
                        </label>
                        <input
                            type="text"
                            id="icon"
                            name="icon"
                            value={skills.icon}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the Icon name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="experience" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Experience (In Year)
                        </label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            value={skills.experience}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            placeholder="Enter the Experience"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="projectsLink" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Projects Link
                        </label>
                        <input
                            type="text"
                            id="projectsLink"
                            name="projectsLink"
                            value={skills.projectsLink}
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
                            Update Skill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSkillsPage;
