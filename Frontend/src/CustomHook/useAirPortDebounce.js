import { useEffect, useState } from "react";
import { getAirportInfo } from "../services/myServerApi";

const useAirPortDebounce = (value, delay = 500) => {
  // const [debouncedValue, setDebouncedValue] = useState(value);
  const [ariportOptions, setAirportOptions] = useState([]);

  useEffect(() => {
    const id = setTimeout(async () => {
      // setDebouncedValue(value);

      const data = await getAirportInfo(value);
      setAirportOptions(data);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return { ariportOptions };
};

export default useAirPortDebounce;
