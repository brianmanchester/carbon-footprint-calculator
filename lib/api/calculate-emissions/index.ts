import { Measurement } from '@/lib/db/schemas/sub-categories';

const KG_TO_LBS = 2.205;

export const calculateEmissions = (
  use: number,
  factor: number,
  measurement: Measurement
) => {
  let result = use * factor;

  // If kg, convert to lbs
  if (measurement === 'kg') {
    result = result * KG_TO_LBS;
  }

  return result;
};
