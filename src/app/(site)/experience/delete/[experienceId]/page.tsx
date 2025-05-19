"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const DeleteExperiencePage = () => {
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

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this experience?");
    if (!confirmed) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/${experienceId}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      alert("Experience deleted successfully!");
      router.push("/experience");
    } else {
      alert("Failed to delete experience.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-semibold text-red-700 dark:text-red-300 text-center mb-10">
          Delete Experience
        </h1>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Designation:</strong> {experience.designation}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Company:</strong> {experience.company}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Description:</strong> {experience.description}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Start Date:</strong>{" "}
            {experience.startDate?.substring(0, 10)}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            <strong>End Date:</strong> {experience.endDate?.substring(0, 10)}
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Delete Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteExperiencePage;
