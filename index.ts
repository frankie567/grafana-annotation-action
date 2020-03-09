import * as core from '@actions/core';

import { GrafanaClient } from './grafana';

export const run = async (): Promise<void> => {
  try {
    const apiHost = core.getInput('apiHost');
    const apiToken = core.getInput('apiToken');

    const grafanaClient = new GrafanaClient(apiHost, apiToken);

    const text = core.getInput('text');
    const rawDashboardId = core.getInput('dashboardId');
    const rawPanelId = core.getInput('panelId');
    const rawTags = core.getInput('tags');

    const dashboardId = rawDashboardId ? Number.parseInt(rawDashboardId, 10) : undefined;
    const panelId = rawPanelId ? Number.parseInt(rawPanelId, 10) : undefined;
    const tags = rawTags ? rawTags.split(',') : undefined;

    const time = Date.now();

    const annotationId = await grafanaClient.createAnnotation(
      text,
      time,
      dashboardId,
      panelId,
      tags,
    );

    core.info(`Created annotation ${annotationId}`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
};

run();
