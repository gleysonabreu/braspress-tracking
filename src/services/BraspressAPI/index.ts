import cio from 'cheerio';

interface ITrackingRealTime {
  name: string;
  date: string;
}

const track = (htmlString: string) => {
  const $ = cio.load(htmlString);
  const nodesFirstTable = $('.col-xs-4.col-xs-offset-7').find(
    '.table tbody > tr > td',
  );
  const nodesSecondTable = $(
    '.col-xs-offset-1.col-xs-10.table-responsive',
  ).find('.table tbody > tr > td');
  const arrayInfos: Array<string> = [];

  nodesFirstTable.each((index, node) => {
    const items = $(node);
    if (index === 0) arrayInfos.push(items.text());
  });

  nodesSecondTable.each((index, node) => {
    const items = $(node);
    if (index !== 8) arrayInfos.push(items.text());
  });

  return arrayInfos;
};

const orderOwner = (htmlString: string) => {
  const $ = cio.load(htmlString);
  const nodesOrderOwner = $('.col-lg-offset-1.col-lg-5.col-xs-12').find(
    '.col-xs-12 > h6',
  );
  const arrayInfos: Array<string> = [];

  nodesOrderOwner.each((index, node) => {
    const items = $(node);
    arrayInfos.push(items.text());
  });

  return arrayInfos;
};

const trackingRealTime = (htmlString: string) => {
  const $ = cio.load(htmlString);
  const nodesTrackingRealTime = $('.col-xs-offset-1.col-xs-10.bs-wizard').find(
    '.col-xs-2.bs-wizard-step',
  );
  const arrayRealTime: Array<ITrackingRealTime> = [];
  nodesTrackingRealTime.each((index, node) => {
    const realTime = $(node);
    const name = realTime.find('.text-center.bs-wizard-stepnum').text();
    const date = realTime.find('.bs-wizard-info.text-center').text();
    const dataRealTime = {
      name,
      date,
    };
    arrayRealTime.push(dataRealTime);
  });
  return arrayRealTime;
};

export { track, orderOwner, trackingRealTime, ITrackingRealTime };
