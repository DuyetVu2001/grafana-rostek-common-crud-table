const test = {
  state: 'Done',
  series: [
    {
      refId: 'A',
      meta: {
        executedQueryString: 'SELECT * FROM person;',
        transformations: [
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
          'organize',
        ],
      },
      fields: [
        {
          name: 'id',
          type: 'number',
          typeInfo: {
            frame: 'int64',
            nullable: true,
          },
          config: {
            displayName: 'Code 123',
          },
          values: [3, 10, 11, 444],
          entities: {},
          state: {
            displayName: 'Code 123',
            multipleFrames: false,
            scopedVars: {
              __series: {
                text: 'Series',
                value: {
                  name: 'Series (A)',
                },
              },
              __field: {
                text: 'Field',
                value: {},
              },
            },
            seriesIndex: 0,
            range: {
              min: 3,
              max: 444,
              delta: 441,
            },
          },
        },
        {
          name: 'name',
          type: 'string',
          typeInfo: {
            frame: 'string',
            nullable: true,
          },
          config: {},
          values: ['3', 'user 1', 'user 1133', 'e'],
          entities: {},
          state: {
            displayName: 'name',
            multipleFrames: false,
            scopedVars: {
              __series: {
                text: 'Series',
                value: {
                  name: 'Series (A)',
                },
              },
              __field: {
                text: 'Field',
                value: {},
              },
            },
            seriesIndex: 1,
          },
        },
        {
          name: 'age',
          type: 'number',
          typeInfo: {
            frame: 'int64',
            nullable: true,
          },
          config: {},
          values: [3, 20, 20, 3],
          entities: {},
          state: {
            displayName: 'age',
            multipleFrames: false,
            calcs: {
              sum: 46,
              max: 20,
              min: 3,
              logmin: 3,
              mean: 11.5,
              last: 3,
              first: 3,
              lastNotNull: 3,
              firstNotNull: 3,
              count: 4,
              nonNullCount: 4,
              allIsNull: false,
              allIsZero: false,
              range: 17,
              diff: 0,
              delta: 20,
              step: -17,
              diffperc: 0,
              previousDeltaUp: false,
            },
            scopedVars: {
              __series: {
                text: 'Series',
                value: {
                  name: 'Series (A)',
                },
              },
              __field: {
                text: 'Field',
                value: {},
              },
            },
            seriesIndex: 2,
            range: {
              min: 3,
              max: 444,
              delta: 441,
            },
          },
        },
      ],
      length: 4,
    },
  ],
  annotations: [],
  request: {
    app: 'dashboard',
    requestId: 'Q101',
    timezone: 'browser',
    panelId: 4,
    dashboardId: 2,
    range: {
      from: '2022-07-27T03:52:09.705Z',
      to: '2022-07-27T09:52:09.706Z',
      raw: {
        from: 'now-6h',
        to: 'now',
      },
    },
    timeInfo: '',
    interval: '1m',
    intervalMs: 60000,
    targets: [
      {
        datasource: {
          type: 'mysql',
          uid: 'VgWpMmz4z',
        },
        format: 'table',
        group: [],
        metricColumn: 'none',
        rawQuery: true,
        rawSql: 'SELECT * FROM person;',
        refId: 'A',
        select: [
          [
            {
              params: ['value'],
              type: 'column',
            },
          ],
        ],
        timeColumn: 'time',
        where: [
          {
            name: '$__timeFilter',
            params: [],
            type: 'macro',
          },
        ],
      },
    ],
    maxDataPoints: 1091,
    scopedVars: {
      __interval: {
        text: '1m',
        value: '1m',
      },
      __interval_ms: {
        text: '60000',
        value: 60000,
      },
    },
    startTime: 1658915529706,
    rangeRaw: {
      from: 'now-6h',
      to: 'now',
    },
    endTime: 1658915529755,
  },
  timeRange: {
    from: '2022-07-27T03:52:09.705Z',
    to: '2022-07-27T09:52:09.706Z',
    raw: {
      from: 'now-6h',
      to: 'now',
    },
  },
  timings: {
    dataProcessingTime: 0,
  },
  structureRev: 3,
};
