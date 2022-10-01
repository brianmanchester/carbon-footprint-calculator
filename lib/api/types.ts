// Respond with a message in the event of an error
export type APIResponse<TData> = TData | { message: string };