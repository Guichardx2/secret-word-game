import { Box, Grid, Heading } from "@radix-ui/themes";
import type { WordsGridProps } from "../../../interfaces/WordsGridProps";
import styles from "./WordsGrid.module.css";

const WordsGrid = ({ word, correctLetters }: WordsGridProps) => {

  return (
    <Grid columns={word.length.toString()} rows="1" width="auto" gap="1">
       {Array.from({ length: Number(word.length) }).map((_, index) => (
        <Box
          key={index}
          style={correctLetters.includes(word[index]) ? { border: "2px solid green" } : {}}
          className={styles.box}
          width="80px"
          height="80px"
        >
          <Heading size="9" style={{color: "black"}}>
            {correctLetters.includes(word[index]) ? word[index] : ''}
          </Heading>
        </Box>
      ))}
    </Grid>
  );
};

export default WordsGrid;
