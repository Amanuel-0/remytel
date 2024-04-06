"use client";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

function useCreateQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (q: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) {
        for (let i = 0; i < q.length; i++) {
          params.set(q[i].name, q[i].value);
        }
      }
      //  params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  return { createQueryString };
}

export default useCreateQueryString;
