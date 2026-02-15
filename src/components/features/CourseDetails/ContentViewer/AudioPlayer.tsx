"use client";

// components/ContentViewer/AudioPlayer.jsx
import { Pause, Play } from "lucide-react";
import { ElementRef, useRef, useState } from "react";

const AudioPlayer = ({ audioData }) => {
  const audioRef = useRef<ElementRef<"audio">>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">{audioData.title}</h2>

      <div className="bg-blue-50 rounded-lg p-8">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          src={audioData.audioUrl}
        />

        {/* Waveform Visualization */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-1 h-16">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-blue-900 rounded-full transition-all"
                style={{
                  height: `${getRandomHeight()}%`,
                  opacity: (currentTime / duration) * 50 > i ? 1 : 0.3,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="bg-blue-900 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${duration ? (currentTime / duration) * 100 : 0}%, #d1d5db ${duration ? (currentTime / duration) * 100 : 0}%, #d1d5db 100%)`,
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="mt-8 space-y-4">
        <h3 className="font-semibold mb-4">Part 1 - Grammar and vocabulary</h3>
        {[...Array(4)].map((_, i) => (
          <label
            key={i}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input type="radio" name="audio-question" className="w-4 h-4" />
            <span>Answer</span>
          </label>
        ))}
        <div className="flex justify-end mt-6">
          <button className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

function getRandomHeight() {
  return Math.random() * 100;
}

export default AudioPlayer;
