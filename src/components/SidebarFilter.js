"use client";

import { difficulties, topics } from "@/data/problems";

export default function SidebarFilter({ selectedDifficulty, setSelectedDifficulty, selectedTopics, setSelectedTopics, onReset }) {

    const toggleTopic = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter(t => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    return (
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8 p-4">

            {/* Search/Header handled in main area or here? Let's stick to filters */}

            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Difficulty</h3>
                <div className="space-y-2">
                    {difficulties.map((diff) => (
                        <label key={diff} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer group">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedDifficulty === diff ? 'bg-primary border-primary' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
                                {selectedDifficulty === diff && <div className="w-2 h-2 bg-white rounded-sm" />}
                            </div>
                            <input
                                type="radio"
                                name="difficulty"
                                className="hidden"
                                checked={selectedDifficulty === diff}
                                onChange={() => setSelectedDifficulty(selectedDifficulty === diff ? "" : diff)}
                                onClick={() => { if (selectedDifficulty === diff) setSelectedDifficulty(""); }}
                            />
                            {diff}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Topics</h3>
                <div className="space-y-2">
                    {topics.map((topic) => (
                        <label key={topic} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer group">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTopics.includes(topic) ? 'bg-primary border-primary' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
                                {selectedTopics.includes(topic) && <div className="w-2 h-2 bg-white rounded-sm" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedTopics.includes(topic)}
                                onChange={() => toggleTopic(topic)}
                            />
                            {topic}
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={onReset}
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
                Reset Filters
            </button>

        </div>
    );
}
