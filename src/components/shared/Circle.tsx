export function Circle({
  x = 0,
  y = 0,
  deg = 0,
  scale = 1,
  size = 12,
  color = "oklch(35.687% 0.09869 249.099)",
}: {
  x?: number | `${number}%` | `-${number}%`;
  y?: number | `${number}%` | `-${number}%`;
  size?: number;
  deg?: number;
  scale?: number;
  color?: string;
}) {
  return (
    <div
      style={{
        top: y,
        left: x,
        transform: `rotate(${deg}deg) scale(${scale})`,
        width: size,
        height: size,
        backgroundColor: color,
      }}
      className="absolute rounded-[50%] z-n1"
    ></div>
  );
}
