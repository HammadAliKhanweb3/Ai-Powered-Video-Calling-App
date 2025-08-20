import { DEFAULT_PAGE } from "@/constants"
import {createLoader, parseAsInteger, parseAsString, parseAsStringEnum} from "nuqs/server"
import { MeetingStatus } from "./types"

export const filterSeachParams ={
        search:parseAsString.withDefault("").withOptions({clearOnDefault:true}),
        page:parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true}),
        agentId:parseAsString.withDefault("").withOptions({clearOnDefault:true}),
        status:parseAsStringEnum(Object.values(MeetingStatus))

    
    }
    
export const loeadSearchParams = createLoader(filterSeachParams)