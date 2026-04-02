import { useGetSettings } from "../../hooks/queries/useSettingsQueries";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const { data: settings } = useGetSettings();

  const getLogoPath = () => {
    return settings?.logo || "/englivision-logo-color.png";
  };

  return (
    <img src={getLogoPath()} alt="Engli-Vision Logo" className={className} />
  );
}
