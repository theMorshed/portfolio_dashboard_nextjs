/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const EditExperiencePage = () => {
  const router = useRouter();
  const { experienceId } = useParams();

  const [experience, setExperience] = useState({
    designation: "",
    company: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchExperience = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/${experienceId}`
      );
      const data = await response.json();
      if (data?.success) {
        setExperience(data?.data);
      }
    };

    fetchExperience();
  }, [experienceId]);

  const handleChange = (e: any) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/${experienceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experience),
      }
    );
    if (res.ok) {
      alert("Experience updated successfully!");
      router.push("/experience");
    } else {
      alert("Failed to update experience.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-semibold text-sky-800 dark:text-sky-200 text-center mb-10">
          Edit Experience
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          {["designation", "company", "description"].map((field) => (
            <div className="mb-4" key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2 capitalize"
              >
                {field}
              </label>
              {field === "description" ? (
                <textarea
                  id={field}
                  name={field}
                  value={(experience as any)[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  rows={5}
                />
              ) : (
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={(experience as any)[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                />
              )}
            </div>
          ))}

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
              value={experience.startDate?.substring(0, 10) || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
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
              value={experience.endDate?.substring(0, 10) || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Update Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExperiencePage;