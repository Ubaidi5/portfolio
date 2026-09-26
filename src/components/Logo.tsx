import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/favicons/logo-light.svg"
      alt="Ubaid Hussain"
      width={420}
      height={104}
      priority
      className={className}
    />
  );
}
