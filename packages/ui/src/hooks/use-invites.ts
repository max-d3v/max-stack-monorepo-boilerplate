import { AuthClient } from "@better-auth-ui/react"
import { assertAuthClientHasOrganizationOrThrow, customQueryKeys } from "../lib/utils"
import { useQuery } from "@tanstack/react-query"

export function useActiveOrganizationInvitations(authClient: AuthClient) {
  assertAuthClientHasOrganizationOrThrow(authClient)

  const { data: activeOrganization } = authClient.useActiveOrganization()

  const queryKey = customQueryKeys.organizationInvitations(activeOrganization?.id)

  return useQuery({
    queryKey: queryKey,
    enabled: !!activeOrganization,
    queryFn: async () => {
      if (!activeOrganization) {
        throw new Error("No active organization found.")
      }

      return await authClient.organization.listInvitations({
        query: {
          organizationId: activeOrganization.id
        },
        fetchOptions: {
            throw: true
        }
      })
    }
  })
}
