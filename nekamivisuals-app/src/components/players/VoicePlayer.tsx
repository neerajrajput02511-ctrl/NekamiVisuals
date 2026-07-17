'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function VoicePlayer({ audioUrl, title }: { audioUrl: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div className="audio-player w-full max-w-xl shadow-2xl relative overflow-hidden">
      {/* Animated waveform background effect when playing */}
      <div 
        className={cn(
          "absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-700 pointer-events-none",
          playing && "opacity-100"
        )}
      >
        <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end justify-between px-4 opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={cn("w-1 bg-white rounded-t-sm origin-bottom", playing && "animate-waveform")}
              style={{
                height: `${20 + Math.random() * 80}%`,
                animationDelay: `${i * 30}ms`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-1">Preview Audio</p>
            <p className="text-sm font-medium truncate pr-4">{title}</p>
          </div>
          <button 
            onClick={toggleMute}
            className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-text-3 hover:text-text hover:border-border transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="audio-progress block"
            style={{
              background: `linear-gradient(to right, #fff ${(progress / (duration || 1)) * 100}%, rgba(255,255,255,0.1) ${(progress / (duration || 1)) * 100}%)`
            }}
          />
          <div className="flex justify-between text-xs text-text-3 mt-2 font-medium">
            <span>{formatDuration(progress)}</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-white text-bg flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={20} className="fill-current" /> : <Play size={20} className="ml-1 fill-current" />}
          </button>
        </div>
      </div>

      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
    </div>
  );
}
