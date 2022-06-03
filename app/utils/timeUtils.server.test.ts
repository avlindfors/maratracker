import timeUtil from './timeUtils.server';
describe('timeToDuration', () => {
  // Don't do this. I'm out of time here.
  it('should return a duration from a time string', () => {
    expect(timeUtil.timeToDuration('3.31.06')).toEqual({
      hours: 3,
      minutes: 31,
      seconds: 6,
    });
    expect(timeUtil.timeToDuration('12.59')).toEqual({
      hours: 0,
      minutes: 12,
      seconds: 59,
    });
    expect(timeUtil.timeToDuration('00.05')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 5,
    });
    expect(timeUtil.timeToDuration('04.50')).toEqual({
      hours: 0,
      minutes: 4,
      seconds: 50,
    });
    expect(timeUtil.timeToDuration('02.01.03')).toEqual({
      hours: 2,
      minutes: 1,
      seconds: 3,
    });
  });

  const defaultErrorValue = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  it('should return the time if poor format', () => {
    expect(timeUtil.timeToDuration('59')).toEqual(defaultErrorValue);
    expect(timeUtil.timeToDuration('12.12.12.12')).toEqual(defaultErrorValue);
    expect(timeUtil.timeToDuration('lol.test')).toEqual(defaultErrorValue);
  });
});
