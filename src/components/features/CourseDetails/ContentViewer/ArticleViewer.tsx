// components/ContentViewer/ArticleViewer.jsx
import React from "react";

const ArticleViewer = ({ articleData }) => {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{articleData.title}</h1>
      <div className="prose prose-lg">
        <p className="text-gray-700 leading-relaxed mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry Lorem Ipsum is simply dummy text of the printing and
          typesetting industry Lorem Ipsum is simply dummy text of the printing
          and typesetting industry
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry Lorem Ipsum is simply dummy text of the printing and
          typesetting industry Lorem Ipsum is simply dummy text of the printing
          and typesetting industry
        </p>
        <p className="text-gray-700 leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry Lorem Ipsum is simply dummy text of the printing and
          typesetting industry Lorem Ipsum is simply dummy text of the printing
          and typesetting industry
        </p>
      </div>
    </div>
  );
};

export default ArticleViewer;
