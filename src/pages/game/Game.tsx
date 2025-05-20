//React e Radix
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

// Components
import WordsGrid from "../../components/game/words-grid/WordsGrid";
import InfoCard from "../../components/info/InfoCard";

// Data
import { wordsList } from "../../data/words";

//Utils
import { validateInputLetter } from "../../utils/validateInputLetter";

//CSS
import styles from "./Game.module.css";

const Game = () => {
  const navigate = useNavigate(); // Navegação

  // ============================
  //  Estados principais
  // ============================

  const [word, setWord] = useState<string>(""); // Palavra sorteada
  const [category, setCategory] = useState<string>(""); // Categoria da palavra
  const [attempts, setAttempts] = useState<number>(3); // Tentativas restantes

  const [guessedLetter, setGuessedLetter] = useState<string>(""); // Letra digitada
  const [usedLetters, setUsedLetters] = useState<string[]>([]); // Letras já utilizadas
  const [correctLetters, setCorrectLetters] = useState<string[]>([]); // Letras corretas adivinhadas

  const [score, setScore] = useState<number>(0); // Pontuação
  
  const [shakeInput, setShakeInput] = useState<boolean>(false); // Efeito de erro no input
  const [infoCard, setInfoCard] = useState<{
    title: string;
    content: string;
  } | null>(null); // Card de aviso


  // ============================
  //  Handlers
  // ============================

  // Handler para letra digitada
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuessedLetter(e.target.value);
  };

  // Handler para fazer uma tentativa
  const handleTryLetter = (letter: string) => {
    if (!validateInputLetter(letter)) {
      showInfo("Atenção!", "Apenas letras são permitidas!");
      setGuessedLetter("");
      return;
    }

    if (usedLetters.includes(letter)) {
      showInfo("Atenção!", "Você já tentou essa letra!");
      setGuessedLetter("");
      return;
    }

    if (attempts > 0) {
      setUsedLetters((prev) => [...prev, letter]);

      if (word.includes(letter)) {
        setCorrectLetters((prev) => [...prev, letter]);
        setScore((prev) => prev + 10);
      } else {
        setAttempts((prev) => prev - 1);
        triggerInputShake();
      }

      setGuessedLetter("");

      // Se acabou as tentativas nesta jogada
      if (attempts === 1) {
        // navigate("/end");
        handleSortWord();
      }
    } else {
      showInfo("Atenção", "Você não tem mais tentativas!");
    }
  };

  // ============================
  // Funções auxiliares
  // ============================

  /*Sorteia uma palavra aleatória e reseta o estado (usada no useffect e no botão)
   de nova palavra*/
  const handleSortWord = () => {
    const categories = Object.keys(wordsList) as (keyof typeof wordsList)[];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const words = wordsList[randomCategory];
    const randomWord = words[Math.floor(Math.random() * words.length)];

    setWord(randomWord);
    setCategory(randomCategory);
    resetAllStates();
  };

  // Reinicia o jogo
  const resetAllStates = () => {
    setAttempts(3);
    setGuessedLetter("");
    setUsedLetters([]);
    setCorrectLetters([]);
    setScore(0);
  };

  // Exibe o card informativo
  const showInfo = (title: string, content: string) => {
    setInfoCard({ title, content });
  };

  // Aciona animação de erro no input
  const triggerInputShake = () => {
    setShakeInput(true);
    setTimeout(() => setShakeInput(false), 300);
  };
  
  // ============================
  // useEffects
  // ============================

  // Sorteia uma palavra ao iniciar o jogo
  useEffect(() => {
    handleSortWord();
  }, []);


  return (
    <Container height="100vh" width="100vw">
      <Flex
        direction="column"
        align="center"
        justify="between"
        height="80%"
        width="100%"
      >
        {/* Header com dica e tentativas */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="5"
          mb="5"
          mt="5"
        >
          <Heading size="8" weight="bold">
            Adivinhe a palavra:
          </Heading>
          <Text size="6" weight="bold">
            Dica sobre a palavra: {category.toUpperCase()}
          </Text>
          <Text>Você ainda tem {attempts} tentativa(s)</Text>
        </Flex>

        {/* Grid com a palavra */}
        <Flex direction="row" align="center" justify="center" mb="5">
          <WordsGrid word={word} correctLetters={correctLetters} />
        </Flex>

        {/* Área de input e pontuação */}
        <Flex direction="column" align="center">
          <Text>Tente adivinhar uma letra da palavra:</Text>
          <Text weight="bold">Pontuação {score}</Text>

          <Flex
            direction="row"
            align="center"
            justify="center"
            gap="6"
            mt="5"
            mb="5"
          >
            <input
              type="text"
              maxLength={1}
              className={`${styles.input} ${shakeInput ? styles.shake : ""}`}
              value={guessedLetter}
              onChange={handleChangeInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTryLetter(guessedLetter);
              }}
            />
            <Button
              size="4"
              variant="outline"
              onClick={() => handleTryLetter(guessedLetter)}
            >
              JOGAR!
            </Button>
          </Flex>
        </Flex>

        {/* Letras já usadas + botão nova palavra */}
        <Flex direction="column" align="center" justify="center" gap="2" mt="5">
          <Text>Letras já utilizadas: </Text>
          {usedLetters.length > 0 ? (
            <InfoCard content={usedLetters.join(", ")} />
          ) : (
            "Nenhuma letra utilizada"
          )}
          <Button mt="5" onClick={handleSortWord}>
            Outra palavra?
          </Button>
        </Flex>
      </Flex>

      {/* Modal de informação */}
      {infoCard && (
        <div
          className={styles.overlay}
          onClick={() => setInfoCard(null)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <InfoCard
              title={infoCard.title}
              content={infoCard.content}
              size="3"
              button
              onClick={() => setInfoCard(null)}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Game;
