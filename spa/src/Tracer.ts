import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core"
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web"
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"

const Tracer = async () => {
  const { ZoneContextManager } = await import("@opentelemetry/context-zone")

  const provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: import.meta.env.VITE_APP_OTEL_SERVICE_NAME,
    }),
  })

  const collectorOptions = {
    url:
      import.meta.env.VITE_APP_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
      "http://localhost:4318/v1/traces",
    headers: {}, // an optional object containing custom headers to be sent with each request
    concurrencyLimit: 10, // an optional limit on pending requests
  }

  const exporter = new OTLPTraceExporter(collectorOptions)
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter))
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))

  const contextManager = new ZoneContextManager()

  provider.register({
    contextManager,
    propagator: new CompositePropagator({
      propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
    }),
  })

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      getWebAutoInstrumentations({
        "@opentelemetry/instrumentation-xml-http-request": {
          propagateTraceHeaderCorsUrls: /.*/,
          clearTimingResources: true,
        },
        "@opentelemetry/instrumentation-fetch": {
          propagateTraceHeaderCorsUrls: /.*/,
          clearTimingResources: true,
        },
      }),
    ],
  })
}

export default Tracer
