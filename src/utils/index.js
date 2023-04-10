const initState = { user: null, token: null };

export const saveUserLocal = (userData) =>
  localStorage.setItem("profile", JSON.stringify(userData));

export const loadUserLocal = () => {
  const profile = localStorage.getItem("profile");
  if (profile) return JSON.parse(localStorage.getItem("profile"));
  else {
    localStorage.setItem("profile", JSON.stringify(initState));
    return initState;
  }
};

export const clearUserLocal = (userData) =>
  localStorage.setItem("profile", JSON.stringify(initState));

/// Theme
const initThemeState = {
  mode: "dark",
  baseColor: "#303fa0",
  secondaryColor: "#cf6828",
  tertiaryColor: "#43bab9",
};

export const saveThemeLocal = (themeData) =>
  localStorage.setItem("theme", JSON.stringify(themeData));

export const loadThemeLocal = () => {
  const theme = localStorage.getItem("theme");
  // if (theme) return JSON.parse(localStorage.getItem("theme"));
  if (theme) {
    const localTheme = JSON.parse(localStorage.getItem("theme"));
    // console.log(typeof localTheme?.customComponents);
    if (typeof localTheme?.customComponents === "string")
      localTheme["customComponents"] = JSON.parse(localTheme?.customComponents);
    return localTheme;
  } else {
    localStorage.setItem("theme", JSON.stringify(initThemeState));
    return initThemeState;
  }
};

export const clearThemeLocal = (themeData) =>
  localStorage.setItem("theme", JSON.stringify(initThemeState));

export const get = (object, path, defaultValue = null) => {
  const paths = path.split(".");
  let current = object ?? {};
  for (let i = 0; i < paths.length; i++) {
    if (current[paths[i]] === undefined) {
      return defaultValue;
    }
    if (Array.isArray(current[paths[i]])) {
      let index = paths[i + 1];
      if (index === undefined) {
        return defaultValue;
      }
      current = current[paths[i]][index];
      i++;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
};

export const jsonToURL = (data) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  return URL.createObjectURL(blob);
};
