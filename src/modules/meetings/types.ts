import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";




export type MeetingsGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"]
export type MeetingsGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"]



