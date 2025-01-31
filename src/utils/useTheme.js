import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useTheme = () => {
  const [theme, setTheme] = useState(Cookies.get("theme") || "light");

  useEffect(() => {
    Cookies.set("theme", theme, { expires: 7 });
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
