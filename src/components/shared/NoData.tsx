export function NoData({ data }: { data: string }) {
  return (
    <div className="w-full flex justify-center my-4">
      <p className="text-3xl font-semibold">No {data}</p>
    </div>
  );
}
