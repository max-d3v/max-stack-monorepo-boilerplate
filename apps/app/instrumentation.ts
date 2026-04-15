import { registerOTel } from '@vercel/otel'
import { ORPCInstrumentation } from '@workspace/rpc/orpc/otel'
 
export async function register() {
  await import("@workspace/rpc/orpc/orpc.server");
  registerOTel({ serviceName: "app" , instrumentations: [new ORPCInstrumentation()]});
}