// components/Sidebar/Sidebar.jsx
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

const Sidebar = ({ onItemClick, activeItemId }) => {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const courseData = {
    sections: [
      {
        id: "introduction",
        title: "introduction",
        progress: "2/0",
        items: [
          {
            id: "intro-video-1",
            type: "video",
            title: "Introduction Video Title Video Title",
            duration: "10 minutes",
            completed: true,
            videoUrl: "https://example.com/video1.mp4",
          },
          {
            id: "intro-article-1",
            type: "article",
            title: "Introduction Article Title",
            duration: "5 minutes",
            completed: false,
            content: "Article content here...",
          },
        ],
      },
      {
        id: "course-overview",
        title: "Course Overview",
        progress: "10/0",
        items: [
          {
            id: "overview-video-1",
            type: "video",
            title: "Title Video Title Video Title Video Title video title",
            duration: "15 minutes",
            completed: true,
            videoUrl:
              "https://www.youtube.com/embed/JQT8d2tHwk0?si=M1GTf-Zg_7lT16j1",
          },
          {
            id: "overview-video-2",
            type: "video",
            title: "Title Video Title Video Title Video Title video title",
            duration: "15 minutes",
            completed: false,
            videoUrl: "https://example.com/video3.mp4",
          },
          {
            id: "overview-article-1",
            type: "article",
            title: "Title Video Title Video Title Video Title video title",
            duration: "15 minutes",
            completed: false,
            content: "Article content...",
          },
          {
            id: "overview-test-1",
            type: "test",
            title: "Grammar and Vocabulary Test",
            duration: "30:00",
            completed: false,
            questions: [
              {
                id: "q1",
                part: "Part 1 - Grammar and vocabulary",
                question:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                correctAnswer: 0,
              },
              {
                id: "q2",
                part: "Part 1 - Grammar and vocabulary",
                question:
                  "Choose the correct form of the verb in the following sentence: She ___ to the store yesterday.",
                answers: ["go", "goes", "went", "going"],
                correctAnswer: 2,
              },
              {
                id: "q3",
                part: "Part 1 - Grammar and vocabulary",
                question: "What is the synonym of 'beautiful'?",
                answers: ["Ugly", "Pretty", "Sad", "Angry"],
                correctAnswer: 1,
              },
              {
                id: "q4",
                part: "Part 1 - Grammar and vocabulary",
                question: "Which sentence is grammatically correct?",
                answers: [
                  "He don't like pizza",
                  "He doesn't likes pizza",
                  "He doesn't like pizza",
                  "He not like pizza",
                ],
                correctAnswer: 2,
              },
              {
                id: "q5",
                part: "Part 1 - Grammar and vocabulary",
                question: "What is the past tense of 'run'?",
                answers: ["runned", "ran", "running", "runs"],
                correctAnswer: 1,
              },
              {
                id: "q6",
                part: "Part 2 - Reading comprehension",
                question: "According to the passage, what is the main idea?",
                answers: [
                  "Technology is important",
                  "Education matters",
                  "Health is wealth",
                  "Time is money",
                ],
                correctAnswer: 1,
              },
              {
                id: "q7",
                part: "Part 2 - Reading comprehension",
                question: "Which statement is true based on the text?",
                answers: [
                  "Statement A",
                  "Statement B",
                  "Statement C",
                  "Statement D",
                ],
                correctAnswer: 0,
              },
              {
                id: "q8",
                part: "Part 2 - Reading comprehension",
                question: "What can be inferred from the paragraph?",
                answers: [
                  "The author agrees",
                  "The author disagrees",
                  "The author is neutral",
                  "The author is confused",
                ],
                correctAnswer: 2,
              },
              {
                id: "q9",
                part: "Part 3 - Vocabulary",
                question: "What does 'ubiquitous' mean?",
                answers: [
                  "Rare",
                  "Present everywhere",
                  "Dangerous",
                  "Beautiful",
                ],
                correctAnswer: 1,
              },
              {
                id: "q10",
                part: "Part 3 - Vocabulary",
                question: "Choose the antonym of 'difficult'.",
                answers: ["Hard", "Challenging", "Easy", "Complex"],
                correctAnswer: 2,
              },
              {
                id: "q11",
                part: "Part 3 - Vocabulary",
                question: "What is a synonym for 'quickly'?",
                answers: ["Slowly", "Rapidly", "Carefully", "Loudly"],
                correctAnswer: 1,
              },
              {
                id: "q12",
                part: "Part 4 - Writing",
                question: "Which punctuation mark is used to show possession?",
                answers: [
                  "Comma (,)",
                  "Apostrophe (')",
                  "Period (.)",
                  "Question mark (?)",
                ],
                correctAnswer: 1,
              },
              {
                id: "q13",
                part: "Part 4 - Writing",
                question: "Identify the subject in: 'The cat sleeps.'",
                answers: ["The", "cat", "sleeps", "The cat"],
                correctAnswer: 1,
              },
              {
                id: "q14",
                part: "Part 4 - Writing",
                question: "Which is an example of a compound sentence?",
                answers: [
                  "I like tea.",
                  "I like tea and she likes coffee.",
                  "Because I like tea.",
                  "Tea is good.",
                ],
                correctAnswer: 1,
              },
              {
                id: "q15",
                part: "Part 5 - Listening comprehension",
                question: "What did the speaker mention first?",
                answers: [
                  "The weather",
                  "The time",
                  "The location",
                  "The date",
                ],
                correctAnswer: 0,
              },
              {
                id: "q16",
                part: "Part 5 - Listening comprehension",
                question: "How many people were mentioned?",
                answers: ["Two", "Three", "Four", "Five"],
                correctAnswer: 1,
              },
              {
                id: "q17",
                part: "Part 5 - Listening comprehension",
                question: "What was the main topic discussed?",
                answers: ["Sports", "Technology", "Education", "Travel"],
                correctAnswer: 2,
              },
              {
                id: "q18",
                part: "Part 6 - Final questions",
                question: "Choose the correctly spelled word.",
                answers: ["Recieve", "Receive", "Recive", "Receeve"],
                correctAnswer: 1,
              },
              {
                id: "q19",
                part: "Part 6 - Final questions",
                question: "What type of word is 'happiness'?",
                answers: ["Verb", "Adjective", "Noun", "Adverb"],
                correctAnswer: 2,
              },
              {
                id: "q20",
                part: "Part 6 - Final questions",
                question: "Which sentence uses the word 'their' correctly?",
                answers: [
                  "Their going to the park",
                  "They're going to the park",
                  "Their house is beautiful",
                  "There going to the park",
                ],
                correctAnswer: 2,
              },
            ],
          },
          {
            id: "overview-audio-1",
            type: "audio",
            title: "Audio Lesson Title",
            duration: "20 minutes",
            completed: false,
            audioUrl: "https://example.com/audio1.mp3",
          },
        ],
      },
    ],
  };

  const getIcon = (type, completed) => {
    if (completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    switch (type) {
      case "video":
        return <PlayCircle className="w-5 h-5 text-gray-600" />;
      case "article":
        return <FileText className="w-5 h-5 text-gray-600" />;
      case "test":
        return <HelpCircle className="w-5 h-5 text-gray-600" />;
      case "audio":
        return <PlayCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <PlayCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <aside className="w-[30%]">
      <div
        className="sticky bg-white text-white p-4 overflow-y-auto font-sans"
        style={{
          top: "80px",
          height: `calc(100vh - 80px)`,
        }}
      >
        {courseData.sections.map((section) => (
          <div key={section.id} className="border-b border-gray-200">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 hover:bg-gray-150 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800">
                {section.title}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {section.progress}
                </span>
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </button>

            {expandedSections.includes(section.id) && (
              <div className="bg-gray-50">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    className={`flex items-start gap-3 px-6 py-4 hover:bg-gray-100 cursor-pointer transition-colors ${
                      activeItemId === item.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="mt-0.5">
                      {getIcon(item.type, item.completed)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1">
                        <span className="text-sm font-medium text-gray-800 capitalize">
                          {item.type}:
                        </span>
                        <span className="text-sm text-gray-600 leading-relaxed">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {item.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
