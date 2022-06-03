import distanceUtil from './distanceUtils.server';
describe('calculateRemainingDistance', () => {
  // Don't do this. I'm out of time here.
  it('should calculate correctly', () => {
    expect(distanceUtil.calculateRemainingDistance('5k')).toEqual(37);
    expect(distanceUtil.calculateRemainingDistance('10k')).toEqual(32);
    expect(distanceUtil.calculateRemainingDistance('15k')).toEqual(27);
    expect(distanceUtil.calculateRemainingDistance('20k')).toEqual(22);
    expect(distanceUtil.calculateRemainingDistance('Halv')).toEqual(21);
    expect(distanceUtil.calculateRemainingDistance('25k')).toEqual(17);
    expect(distanceUtil.calculateRemainingDistance('30k')).toEqual(12);
    expect(distanceUtil.calculateRemainingDistance('35k')).toEqual(7);
    expect(distanceUtil.calculateRemainingDistance('40k')).toEqual(2);
    expect(distanceUtil.calculateRemainingDistance('Hel')).toEqual(0);
  });
});

describe('estimateEndTime', () => {
  // Don't do this. I'm out of time here.
  it('should estimate more or less correctly', () => {
    expect(
      distanceUtil.estimateEndTime(
        '5k',
        { minutes: 24, seconds: 48 },
        { minutes: 4, seconds: 57 }
      )
    ).toEqual({
      hours: 3,
      minutes: 27,
      seconds: 57,
    });
    expect(
      distanceUtil.estimateEndTime(
        'Halv',
        { hours: 1, minutes: 43, seconds: 2 },
        { minutes: 4, seconds: 19 }
      )
    ).toEqual({
      hours: 3,
      minutes: 13,
      seconds: 41,
    });
  });
});

describe('formatEstimatedEndTime', () => {
  // Don't do this. I'm out of time here.
  it('should format correctly', () => {
    expect(
      distanceUtil.formatEstimatedEndTime({
        hours: 3,
        minutes: 27,
        seconds: 57,
      })
    ).toEqual('3.27.57');
    expect(
      distanceUtil.formatEstimatedEndTime({
        hours: 3,
        minutes: 13,
        seconds: 41,
      })
    ).toEqual('3.13.41');
  });
});
