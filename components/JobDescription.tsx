"use client";

import React from 'react';

interface JobDescriptionProps {
  jobDescription: string;
  onChange: (value: string) => void;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ jobDescription, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-gray-800">İş Tanımını Girin</h2>
      <textarea
        rows={10}
        className="w-full border border-gray-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
        placeholder="İş tanımını buraya yazın. Örneğin: React geliştirici, takım çalışması, TypeScript bilgisi..."
        value={jobDescription}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default JobDescription;
