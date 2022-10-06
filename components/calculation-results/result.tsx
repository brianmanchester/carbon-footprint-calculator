import {
  Box,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';

export type CalculationResultProps = {
  emissions: number;
  label: string;
};

export const CalculationResult = ({ emissions, label }: CalculationResultProps) => (
  <Box borderRadius='lg' boxShadow='base' padding={4} width='full'>
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{emissions}</StatNumber>
      <StatHelpText>lbs of CO<sub>2</sub> per year</StatHelpText>
    </Stat>
  </Box>
);
