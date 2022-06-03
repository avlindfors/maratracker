import * as cheerio from 'cheerio';
import distance, { Section } from '~/utils/distanceUtils.server';
import timeUtils from '~/utils/timeUtils.server';

export const getResults = async (url: string) => {
  const rawHtml = await fetch(url).then((result) => result.text());
  const $ = cheerio.load(rawHtml);
  const name = $('.f-__fullname .last').text();
  const startNumber = $('.f-start_no').children('.f-start_no .last').text();
  const allSections: {
    [x: string]: {
      time: string;
      sectionTime: string;
      pace: string;
      estimatedEndTime: string;
    };
  } = {};
  Object.entries(Section).forEach(([key, value]) => {
    const sectionData = $(`.${value}`);
    const time = sectionData.children('.time').text();
    const pace = sectionData.children('.min_km').text();
    const estimatedEndTime = distance.estimateEndTime(
      key,
      timeUtils.timeToDuration(time),
      timeUtils.timeToDuration(pace)
    );
    const section = {
      time,
      sectionTime: sectionData.children('.diff').text(),
      pace,
      estimatedEndTime: distance.formatEstimatedEndTime(estimatedEndTime),
    };
    allSections[key] = section;
  });
  return { name, startNumber, data: allSections };
};
