import type { UserJSON, WebhookEvent } from "@workspace/types/auth";

export const handleWebhook = async <T>(
  webhook: WebhookEvent,
  createUserFunction: (user: UserJSON) => Promise<T>,
  updateUserFunction: (user: UserJSON) => Promise<T>,
  deleteUserFunction: (user: UserJSON) => Promise<T>
): Promise<T | undefined> => {
  switch (webhook.type) {
    case "user.created":
      return await createUserFunction(webhook.data);

    case "user.updated":
      return await updateUserFunction(webhook.data);

    case "user.deleted":
      return await deleteUserFunction(webhook.data);

    default:
      break;
  }
};
