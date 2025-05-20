import { Theme } from "@radix-ui/themes";
import "./App.css";
import { Routes } from "./routes/router";
import DefaultLayout from "./Layout/DefaultLayout";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [checked, setChecked] = useState(false);

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <Theme
      accentColor="brown"
      grayColor="sand"
      radius="large"
      scaling="95%"
      appearance={theme}
    >
      <DefaultLayout checked={checked} handleSwitchChange={handleThemeChange} theme={theme}>
        <Routes />
      </DefaultLayout>
    </Theme>
  );
}

export default App;
