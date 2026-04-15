import { registerOTel } from '@vercel/otel'
import { ORPCInstrumentation } from '@workspace/rpc/orpc/otel'
 
export function register() {
  registerOTel({ serviceName: 'api' , instrumentations: [new ORPCInstrumentation()]});
}