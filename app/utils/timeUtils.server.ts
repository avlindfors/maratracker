import type { DurationLikeObject } from 'luxon';
import { Duration } from 'luxon';

const _timeToDurationSplitTimeBy = (
  time: string,
  delimeter: string
): DurationLikeObject => {
  const sections = time.split(delimeter);
  switch (sections.length) {
    case 0:
    case 1:
      throw new Error('Invalid time: ' + time);
    case 2:
      return Duration.fromObject({
        hours: 0,
        minutes: parseInt(sections[0]),
        seconds: parseInt(sections[1]),
      }).toObject();
    case 3:
      return Duration.fromObject({
        hours: parseInt(sections[0]),
        minutes: parseInt(sections[1]),
        seconds: parseInt(sections[2]),
      }).toObject();
    default:
      throw new Error('Invalid time: ' + time);
  }
};
const timeToDuration = (time: string): DurationLikeObject => {
  try {
    return _timeToDurationSplitTimeBy(time, '.');
  } catch (e) {
    console.error("Failed to split by '.'. Will try by ':'.", e);
  }

  try {
    return _timeToDurationSplitTimeBy(time, ':');
  } catch (e) {
    console.error("Failed to split by ':'. Giving up.", e);
    return Duration.fromObject({
      hours: 0,
      minutes: 0,
      seconds: 0,
    }).toObject();
  }
};

export default {
  timeToDuration,
};
