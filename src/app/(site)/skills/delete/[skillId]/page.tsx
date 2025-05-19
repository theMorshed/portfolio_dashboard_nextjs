"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const DeleteSkillPage = () => {
  const router = useRouter();
  const { skillId } = useParams();

  const [skill, setSkill] = useState({
    name: "",
    icon: "",
    experienceInYears: 0,
    projectsLink: "",
  });

  useEffect(() => {
    const fetchSkill = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skills/${skillId}`
      );
      const data = await response.json();
      if (data?.success) {
        setSkill(data?.data);
      }
    };

    fetchSkill();
  }, [skillId]);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this skill?");
    if (!confirmed) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skills/${skillId}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      alert("Skill deleted successfully!");
      router.push("/skills");
    } else {
      alert("Failed to delete skill.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-semibold text-red-700 dark:text-red-300 text-center mb-10">
          Delete Skill
        </h1>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Name:</strong> {skill.name}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Icon:</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: skill.icon }} />
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Experience (Years):</strong> {skill.experienceInYears}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            <strong>Projects Link:</strong>{" "}
            <a
              href={skill.projectsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {skill.projectsLink}
            </a>
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Delete Skill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSkillPage;
