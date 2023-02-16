import promBundle from "express-prom-bundle"

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { app: "dlab-sso" },
  promClient: {
    collectDefaultMetrics: {
      labels: { app: "dlab-sso" },
      prefix: "dlab-sso_",
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    },
  },
})

export default metricsMiddleware
