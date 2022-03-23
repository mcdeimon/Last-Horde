import { useLocation } from "@reach/router";
import React from "react";

export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};
