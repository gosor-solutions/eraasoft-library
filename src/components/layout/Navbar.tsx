export function NavBar() {
  return (
    <div className="flex justify-between items-center py-4 px-4 bg-brand-secondary">
      <img src="/gosor-logo.webp" alt="logo" className="w-32" />
      <ul className="flex gap-8 font-medium">
        <li>Home</li>
        <li>Courses</li>
      </ul>
      <div>actions</div>
    </div>
  );
}
