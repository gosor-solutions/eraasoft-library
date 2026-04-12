import { Oval } from "./Oval";

export function Banner({ title }: { title: string }) {
  return (
    <div className="bg-brand-primary px-8 py-8 relative overflow-hidden">
      <h1 className="text-2xl font-bold text-white z-1 relative ms-4">
        {title}
      </h1>
      <Oval deg={-45} x={-80} y={60} />
      <Oval deg={20} x={800} y={-30} />
      <Oval deg={45} x={"97%"} y={60} />
    </div>
  );
}


