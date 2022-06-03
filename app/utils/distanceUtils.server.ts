import type { DurationLike, DurationLikeObject } from 'luxon';
import { Duration } from 'luxon';

export enum Section {
  '5k' = 'f-time_01',
  '10k' = 'f-time_02',
  '15k' = 'f-time_03',
  '20k' = 'f-time_04',
  'Halv' = 'f-time_04',
  '25k' = 'f-time_06',
  '30k' = 'f-time_07',
  '35k' = 'f-time_08',
  '40k' = 'f-time_09',
  'Hel' = 'f-time_finish_netto',
}

const distances: Record<string, number> = {
  '5k': 5,
  '10k': 10,
  '15k': 15,
  '20k': 20,
  Halv: 21,
  '25k': 25,
  '30k': 30,
  '35k': 35,
  '40k': 40,
  Hel: 42,
};

const calculateRemainingDistance = (currentSection: string): number => {
  const currentDistance = distances[currentSection];
  const remainingDistance = distances.Hel - currentDistance;
  return remainingDistance;
};

const estimateEndTime = (
  currentSection: string,
  currentTime: DurationLikeObject,
  currentPace: DurationLikeObject
): DurationLikeObject => {
  const remainingDistance = calculateRemainingDistance(currentSection);
  let initial = Duration.fromObject({ hours: 0, minutes: 0, seconds: 0 });
  // Don't look here please
  for (let i = 0; i < remainingDistance; i++) {
    initial = initial.plus(currentPace);
  }
  return initial.plus(currentTime).normalize().toObject();
};

const formatEstimatedEndTime = (
  estimatedEndTime: DurationLikeObject
): `${number}.${number}.${number}` | '-' => {
  const { hours, minutes, seconds } = estimatedEndTime;
  if (!hours && !minutes && !seconds) {
    return '-';
  }
  return `${hours ?? 0}.${minutes ?? 0}.${seconds ?? 0}`;
};

export default {
  calculateRemainingDistance,
  estimateEndTime,
  formatEstimatedEndTime,
};
