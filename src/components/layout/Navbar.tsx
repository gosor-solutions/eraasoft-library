import { MyLink } from "@/components/shared/MyLink";

export function NavBar() {
  return (
    <div className="flex justify-between items-center py-4 px-4 bg-brand-secondary fixed w-full z-1">
      <img src="/gosor-logo.webp" alt="logo" className="w-32" />
      <ul className="flex gap-8 font-medium">
        <MyLink to="/">Home</MyLink>
        <MyLink to="courses">Courses</MyLink>
      </ul>
      <div>actions</div>
    </div>
  );
}
