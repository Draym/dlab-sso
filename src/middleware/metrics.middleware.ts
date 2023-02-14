import promBundle from "express-prom-bundle"

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { app: "delysium-sso" },
  promClient: {
    collectDefaultMetrics: {
      labels: { app: "delysium-sso" },
      prefix: "delysium-sso_",
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    },
  },
})

export default metricsMiddleware
