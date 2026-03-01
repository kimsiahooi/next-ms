"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h2 className="font-bold text-lg">Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}
