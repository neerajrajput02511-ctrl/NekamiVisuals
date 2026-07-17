export function MarqueeStrip() {
  const items = [
    'Video Editing', 'Voice Artistry', 'Graphic Design', 'Motion Design',
    'Brand Identity', 'Colour Grading', 'Narration', 'Thumbnails',
  ];
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y border-border/50 py-5"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 px-8 text-xs font-semibold tracking-widest uppercase text-text-3"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-text-3/50 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
