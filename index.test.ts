import { run } from './index';
import { GrafanaClient } from './grafana';

jest.mock('./grafana');
const mockedGrafanaClient = GrafanaClient as unknown as jest.Mock<typeof GrafanaClient>;

process.env.INPUT_APIHOST = 'https://grafana.example.com';
process.env.INPUT_APITOKEN = 'TOKEN';
process.env.INPUT_TEXT = 'TEXT';

it('should create annotation', async () => {
  const mockCreateAnnotation = jest.fn().mockResolvedValue(1);
  const mockConstructor = jest.fn().mockReturnValue({
    createAnnotation: mockCreateAnnotation,
  });
  mockedGrafanaClient.mockImplementation(mockConstructor);

  await run();

  expect(mockConstructor).toHaveBeenCalledWith('https://grafana.example.com', 'TOKEN');
  expect(mockCreateAnnotation).toHaveBeenCalled();
});
