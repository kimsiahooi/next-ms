"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-5 text-center">
      <h2 className="font-bold text-lg">Something went wrong!</h2>
      <p>Please try again later.</p>
    </div>
  );
}
