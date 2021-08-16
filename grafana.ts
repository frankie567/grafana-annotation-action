import axios, { AxiosInstance } from 'axios';
import * as rax from 'retry-axios';

export class GrafanaClient {

  private client: AxiosInstance;

  constructor(host: string, token: string) {
    const client = axios.create({
      baseURL: `${host}/api`,
      headers: { 'Authorization': `Bearer ${token}` },
    });
    client.defaults.raxConfig = {
      instance: client,
      retryDelay: 10000,
      httpMethodsToRetry: ['POST']
    };
    rax.attach(client);
    this.client = client
  }

  public async createAnnotation(text: string, timestamp: number, dashboardId?: number, panelId?: number, tags?: string[]): Promise<number> {
    const data = {
      text,
      time: timestamp,
      ...dashboardId ? { dashboardId } : {},
      ...panelId ? { panelId } : {},
      ...tags ? { tags } : {},
    };

    const response = await this.client.post('/annotations', data);

    return response.data.id;
  }

}
