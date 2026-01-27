"use client";

import { useState } from 'react';
import { Lock, Unlock, Code, Lightbulb, Clock, CheckCircle } from 'lucide-react';

export default function Editorial({ problemSlug, editorial, isUnlocked = false, onUnlock }) {
  const [showSolution, setShowSolution] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Lock size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">Editorial Locked</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Solve this problem or use an unlock token to view the official solution and detailed explanation.
        </p>
        <button
          onClick={onUnlock}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Unlock size={18} />
          Unlock Editorial
        </button>
      </div>
    );
  }

  if (!editorial) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>Editorial not available for this problem yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Approach Section */}
      <div className="bg-muted/20 rounded-lg p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-yellow-500" size={20} />
          <h3 className="text-lg font-semibold text-foreground">Approach</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {editorial.approach}
        </p>
      </div>

      {/* Key Insights */}
      <div className="bg-muted/20 rounded-lg p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="text-green-500" size={20} />
          <h3 className="text-lg font-semibold text-foreground">Key Insights</h3>
        </div>
        <ul className="space-y-2">
          {editorial.keyInsights?.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1">•</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Complexity Analysis */}
      <div className="bg-muted/20 rounded-lg p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-blue-500" size={20} />
          <h3 className="text-lg font-semibold text-foreground">Complexity Analysis</h3>
        </div>
        <p className="text-muted-foreground font-mono text-sm">
          {editorial.complexity}
        </p>
      </div>

      {/* C++ Solution */}
      <div className="bg-muted/20 rounded-lg border border-border overflow-hidden">
        <div 
          className="flex items-center justify-between p-4 bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors"
          onClick={() => setShowSolution(!showSolution)}
        >
          <div className="flex items-center gap-2">
            <Code className="text-primary" size={20} />
            <h3 className="text-lg font-semibold text-foreground">C++ Solution</h3>
          </div>
          <button className="text-sm text-primary hover:text-primary/80">
            {showSolution ? 'Hide' : 'Show'} Solution
          </button>
        </div>
        
        {showSolution && (
          <div className="p-6 bg-[#1e1e1e]">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{editorial.cppSolution}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Additional Tips */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <h4 className="font-semibold text-blue-400 mb-2">💡 Pro Tips</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Test your solution with edge cases before submitting</li>
          <li>• Pay attention to output formatting (decimal places, spacing)</li>
          <li>• Consider time complexity for large inputs</li>
          <li>• Use appropriate data types to avoid overflow</li>
        </ul>
      </div>
    </div>
  );
}
