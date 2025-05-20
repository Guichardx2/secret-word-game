import { Box, Flex, Card, Text, Button} from "@radix-ui/themes";
import type { InfoCardProps } from "../../interfaces/InfoCardProps";
const InfoCard = ({title, content, size = "1", button, onClick}: InfoCardProps) => {
  return (
    <Box maxWidth="300px">
      <Card size={size}>
        <Flex gap="3" direction="column" width={"100%"} height={"100%"}>
          <Box>
            <Text as="div" size="2" weight="bold">
              {title}
            </Text>
            <Text as="div" size="2" color="gray">
              {content}
            </Text>
          </Box>
          {button && (
            <Box width="100%">
              <Button onClick={onClick}>Ok</Button>
            </Box>
          )}
        </Flex>
      </Card>
    </Box>
  );
};

export default InfoCard;
