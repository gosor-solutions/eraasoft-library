export function Oval({
  x = 0,
  y = 0,
  deg = 0,
  scale = 1,
}: {
  x?: number | `${number}%` | `-${number}%`;
  y?: number | `${number}%` | `-${number}%`;
  deg?: number;
  scale?: number;
}) {
  return (
    <div
      style={{
        top: y,
        left: x,
        transform: `rotate(${deg}deg) scale(${scale})`,
      }}
      className="absolute w-32 h-12 bg-brand-secondary/60 rounded-[50%] z-n1"
    ></div>
  );
}
