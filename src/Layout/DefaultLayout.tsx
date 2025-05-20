import {Container} from "@radix-ui/themes";
import type { DefaultLayoutProps } from "../interfaces/DefaultLayoutProps";
import Header from "../components/header/Header";

const DefaultLayout = ({ children, checked = true, handleSwitchChange, theme}: DefaultLayoutProps) => {
  return (
    <Container minWidth="100vw" minHeight="100vh">
    
      <Header checked={checked} handleSwitchChange={handleSwitchChange} theme={theme}/>
      
      {children}
    </Container>
  );
};

export default DefaultLayout;
