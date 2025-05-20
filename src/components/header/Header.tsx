import { Box, Flex, Switch } from "@radix-ui/themes";
import { MoonIcon } from "@radix-ui/react-icons";
import type { HeaderProps } from "../../interfaces/HeaderProps";
const Header = ({checked = false, handleSwitchChange, theme}: HeaderProps) => {
  return (
    <header>
        <Box
        width="100%"
        height="60px"
        p="2"
        style={theme === "dark" ? { backgroundColor: "#2e2e2e" } : { backgroundColor: "#f3f4f6" }}
      >
        <Flex gap="2" align="center" justify="end" style={{ height: "100%" }}>
          <Switch checked={checked} onCheckedChange={handleSwitchChange} />
          <MoonIcon />
        </Flex>
      </Box>
    </header>
  )
}

export default Header