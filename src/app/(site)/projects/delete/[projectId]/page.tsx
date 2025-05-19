"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProjectDeletePage = () => {
    const router = useRouter();
    const {projectId} = useParams();
    const [project, setProject] = useState({
        title: "",
        description: "",
        liveLink: "",
        image: ""
    });
    // Fetch project data for editing
    useEffect(() => {
        const fetchProject = async () => {
            // Example of fetching project data from API (you'll replace this with actual API call)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}`);
            const data = await response.json();
            if (data?.success) {
                setProject(data?.data);            
            }
        };

        fetchProject();
    }, [projectId]);

    const handleDelete = () => {
        const deleteProject = async() => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                alert("Project deleted successfully!");
                // Optionally redirect after updating
                router.push("/projects");
            } else {
                alert("Failed to create project.");
            }
        }
        deleteProject();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-semibold text-sky-800 dark:text-sky-200">{project.title}</h1>
                {project?.image && (
                    <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="w-full h-96 object-cover mt-6 rounded-lg"
                />
                )}
                <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">{project.description}</p>
                {/* Delete Project Button */}
                <div className="mt-8 text-center">
                    <Link
                        onClick={handleDelete}
                        href="/projects"
                        className="px-6 py-3 bg-sky-800 text-white rounded-lg font-medium shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        Delete
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectDeletePage;
