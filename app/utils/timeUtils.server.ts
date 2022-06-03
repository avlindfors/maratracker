import type { DurationLikeObject } from 'luxon';
import { Duration } from 'luxon';

const timeToDuration = (time: string): DurationLikeObject => {
  try {
    const sections = time.split('.');
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
  } catch (e) {
    console.log(e);
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
