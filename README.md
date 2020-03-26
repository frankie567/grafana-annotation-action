# Grafana annotation action

<p align="center">
  <a href="https://github.com/frankie567/grafana-annotation-action/actions"><img alt="status" src="https://github.com/frankie567/grafana-annotation-action/workflows/units-test/badge.svg"></a>
</p>

Add a Grafana annotation to your dashboards during your deployment with this GitHub Action.

![Grafana annotation result on a dashboard](/screenshot.png?raw=true)

## Usage

```yaml
steps:
- uses: frankie567/grafana-annotation-action@v1.0.2
  with:
    apiHost: https://myinstance.grafana.net
    apiToken: ${{ secrets.GRAFANA_API_TOKEN }}
    text: Deployment of ${{ github.sha }}
    dashboardId: 1
    tags: deployment,github
```

### Parameters

* `apiHost` (**REQUIRED**): Grafana API host.
* `apiToken` (**REQUIRED**): Grafana API token. [How to create an API token ?](https://grafana.com/docs/grafana/latest/http_api/auth/#create-api-token).
* `text` (**REQUIRED**): Text of the annotation.
* `dashboardId` (**OPTIONAL**): Id. of the dashboard to add the annotation on. If not provided, will be global to all dashboards.
* `panelId` (**OPTIONAL**): Id. of the panel to add the annotation on. If not provided, will be global to all panels.
* `tags` (**OPTIONAL**): Comma-separated list of tags assigned to the annotation.

## License

[MIT License](https://github.com/frankie567/grafana-annotation-action/blob/master/LICENSE)
