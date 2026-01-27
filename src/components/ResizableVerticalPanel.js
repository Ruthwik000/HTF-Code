"use client";

import { useState, useRef, useEffect } from "react";

export default function ResizableVerticalPanel({ 
  topPanel, 
  bottomPanel, 
  defaultTopHeight = 60,
  minTopHeight = 40,
  maxTopHeight = 80 
}) {
  const [topHeight, setTopHeight] = useState(defaultTopHeight);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newTopHeight = ((e.clientY - containerRect.top) / containerRect.height) * 100;

      if (newTopHeight >= minTopHeight && newTopHeight <= maxTopHeight) {
        setTopHeight(newTopHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, minTopHeight, maxTopHeight]);

  return (
    <div ref={containerRef} className="flex flex-col h-full w-full relative">
      {/* Top Panel */}
      <div style={{ height: `${topHeight}%` }} className="flex flex-col overflow-hidden">
        {topPanel}
      </div>

      {/* Resizer */}
      <div
        onMouseDown={() => setIsDragging(true)}
        className="h-1 bg-border hover:bg-primary/50 cursor-row-resize transition-colors relative group"
      >
        <div className="absolute inset-x-0 -top-1 -bottom-1 group-hover:bg-primary/10" />
      </div>

      {/* Bottom Panel */}
      <div style={{ height: `${100 - topHeight}%` }} className="flex flex-col overflow-hidden">
        {bottomPanel}
      </div>
    </div>
  );
}
