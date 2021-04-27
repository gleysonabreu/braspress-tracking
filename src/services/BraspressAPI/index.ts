import cio from 'cheerio';

interface ITrackingRealTime {
  name: string;
  date: string;
}

const track = (htmlString: string) => {
  const $ = cio.load(htmlString);
  const nodesNameTable = $('.col-xs-offset-1.col-xs-10.table-responsive').find(
    '.table > thead > tr > th',
  );
  const nodesDataTable = $('.col-xs-offset-1.col-xs-10.table-responsive').find(
    '.table > tbody > tr > td',
  );
  const arrayNameTable: Array<string> = [];
  const arrayDataTable: Array<string> = [];
  nodesNameTable.each((index, nodeName) => {
    if (index > 0) {
      arrayNameTable.push($(nodeName).text().trim());
    }
  });
  nodesDataTable.each((index, nodeData) => {
    if (index > 0) {
      arrayDataTable.push($(nodeData).text().trim());
    }
  });
  const numNames = arrayNameTable.length;
  const arrayInfos: Array<{
    name: string;
    data: string;
  }> = [];

  for (let x: number = 0; x < numNames; x += 1) {
    const dataInfos = {
      name: arrayNameTable[x],
      data: arrayDataTable[x],
    };

    arrayInfos.push(dataInfos);
  }

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

const trackError = (htmlString: string) => {
  const $ = cio.load(htmlString);
  const nodeTrackError = $('.mainContainer').find('.cabecalho').text();
  if (nodeTrackError) {
    return true;
  }

  return false;
};

const trackingRealTime = (htmlString: string) => {
  const $ = cio.load(htmlString);
  const nodesTrackingRealTime = $('.col-xs-12.bs-wizard').find(
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

export { track, orderOwner, trackingRealTime, ITrackingRealTime, trackError };
