import { Container, Heading, Text, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import gsap from "gsap";

// Components
import AnimatedPadlock from "../../components/gsap/Padlock";

const Home = () => {
  const navigate = useNavigate(); //Navegação

  const [step, setStep] = useState<"closed" | "semi" | "open">("closed"); // Estado para animação do cadeado

  
  //=================
  //  Handlers
  //=================
  const handleClickGamePage = () => {
    setStep("open");
    setTimeout(() => {
      navigate("/game");
    }, 300);
  };

  return (
    <Container height="100vh" width="100vw">
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="4"
        height="100%"
        width="100%"
      >
        <Flex align="center" justify="center" gap="4">
          <Heading size="9" weight="bold">
            Secret Word
          </Heading>
          <AnimatedPadlock step={step} />
        </Flex>
        <Text size="5">Clique no botão para começar a jogar</Text>
        <Button
          size="4"
          variant="outline"
          onClick={handleClickGamePage}
          onMouseEnter={() => setStep("semi")}
          onMouseLeave={() => step !== "open" && setStep("closed")}
        >
          Começar Jogo
        </Button>
      </Flex>
    </Container>
  );
};

export default Home;
