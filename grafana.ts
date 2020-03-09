import axios, { AxiosInstance } from 'axios';

export class GrafanaClient {

  private client: AxiosInstance;

  constructor(host: string, token: string) {
    this.client = axios.create({
      baseURL: `${host}/api`,
      headers: { 'Authorization': `Bearer ${token}` },
    });
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
