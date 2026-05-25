import { useQuery } from "@tanstack/react-query"
import { getSiteByInputId } from "../api/report.api"


function useGetSite(siteId: string) {

    return useQuery({
        queryKey: ["siteId", siteId],
        queryFn: () => getSiteByInputId(siteId),
        enabled: !!siteId,
        retry: false,
    })
}

export default useGetSite
