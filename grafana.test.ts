import axios from 'axios';

import { GrafanaClient } from './grafana';

jest.mock('axios');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedAxiosCreate = axios.create as any;

it('should instantiate an Axios client', () => {
  new GrafanaClient('https://grafana.example.com', 'TOKEN');
  expect(axios.create).toHaveBeenCalledWith({
    baseURL: 'https://grafana.example.com/api',
    headers: {
      Authorization: 'Bearer TOKEN',
    },
  });
});

describe('createAnnotation', () => {
  let client: GrafanaClient;
  let postMock: jest.Mock;

  beforeEach(() => {
    postMock = jest.fn().mockResolvedValue({ data: { id: 1 } });
    mockedAxiosCreate.mockReturnValue({ post: postMock });
    client = new GrafanaClient('https://grafana.example.com', 'TOKEN');
  });

  it('should call annotations API with text and time', async () => {
    await client.createAnnotation('TEXT', 1583681439000);
    expect(postMock).toHaveBeenCalledWith(
      '/annotations',
      {
        text: 'TEXT',
        time: 1583681439000,
      });
  });

  it('should call annotations API with dashboardId', async () => {
    await client.createAnnotation('TEXT', 1583681439000, 1);
    expect(postMock).toHaveBeenCalledWith(
      '/annotations',
      {
        text: 'TEXT',
        time: 1583681439000,
        dashboardId: 1,
      });
  });

  it('should call annotations API with panelId', async () => {
    await client.createAnnotation('TEXT', 1583681439000, undefined, 2);
    expect(postMock).toHaveBeenCalledWith(
      '/annotations',
      {
        text: 'TEXT',
        time: 1583681439000,
        panelId: 2,
      });
  });

  it('should call annotations API with tags', async () => {
    await client.createAnnotation('TEXT', 1583681439000, undefined, undefined, ['tag1', 'tag2']);
    expect(postMock).toHaveBeenCalledWith(
      '/annotations',
      {
        text: 'TEXT',
        time: 1583681439000,
        tags: ['tag1', 'tag2'],
      });
  });

  it('should call annotations API with dashboardId, panelId and tags', async () => {
    await client.createAnnotation('TEXT', 1583681439000, 1, 2, ['tag1', 'tag2']);
    expect(postMock).toHaveBeenCalledWith(
      '/annotations',
      {
        text: 'TEXT',
        time: 1583681439000,
        dashboardId: 1,
        panelId: 2,
        tags: ['tag1', 'tag2'],
      });
  });
});
