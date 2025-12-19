import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Image
        src="/icon.svg"
        width={80}
        height={80}
        alt="loading..."
        className="animate-spin"
      />
    </div>
  );
}
