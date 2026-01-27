"use client";

import { useState, useMemo } from "react";
import SidebarFilter from "@/components/SidebarFilter";
import ProblemTable from "@/components/ProblemTable";
import { problems } from "@/data/problems";
import { generatedProblems } from "@/data/generated100Problems";

// Combine all problems
const allProblems = [...problems, ...generatedProblems];

export default function ProblemsPage() {
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedTopics, setSelectedTopics] = useState([]);

    const filteredProblems = useMemo(() => {
        return allProblems.filter((problem) => {
            const difficultyMatch = selectedDifficulty
                ? problem.difficulty === selectedDifficulty
                : true;
            const topicMatch =
                selectedTopics.length > 0
                    ? selectedTopics.every((t) => problem.topics.includes(t))
                    : true;
            return difficultyMatch && topicMatch;
        });
    }, [selectedDifficulty, selectedTopics]);

    const handleReset = () => {
        setSelectedDifficulty("");
        setSelectedTopics([]);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <SidebarFilter
                            selectedDifficulty={selectedDifficulty}
                            setSelectedDifficulty={setSelectedDifficulty}
                            selectedTopics={selectedTopics}
                            setSelectedTopics={setSelectedTopics}
                            onReset={handleReset}
                        />
                    </div>
                </aside>

                <main className="flex-1">
                    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h1 className="text-xl font-semibold text-foreground">Problem Set</h1>
                            <span className="text-sm text-muted-foreground">{filteredProblems.length} Problems</span>
                        </div>
                        <ProblemTable problems={filteredProblems} />
                    </div>
                </main>
            </div>
        </div>
    );
}
