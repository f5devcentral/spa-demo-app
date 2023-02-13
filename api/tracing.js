// Import dependencies
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http"
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { ConsoleSpanExporter, BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc"

// This registers all instrumentation packages
registerInstrumentations({
  instrumentations: [
    // Express instrumentation expects HTTP layer to be instrumented
    new HttpInstrumentation({
      ignoreIncomingRequestHook(req) {
        // Ignore spans from stats check api.
        const isStatsCheck = !!req.url.match(/^\/api\/stats$/)
        return isStatsCheck
      }
    }),
    new ExpressInstrumentation(),
  ],
})


const resource =
  Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: process.env["OTEL_SERVICE_NAME"],
      [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
    })
  )

const provider = new NodeTracerProvider({
    resource: resource,
})
const consoleProcessor = new BatchSpanProcessor(new ConsoleSpanExporter())
provider.addSpanProcessor(consoleProcessor)

const otlpTraceProcessor = new BatchSpanProcessor(new OTLPTraceExporter())
provider.addSpanProcessor(otlpTraceProcessor)

provider.register()
