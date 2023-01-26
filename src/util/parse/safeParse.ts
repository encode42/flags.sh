import type { ZodType } from "zod";

export function safeParse(schema: ZodType, object: any) {
    return schema.safeParse(object);
}
