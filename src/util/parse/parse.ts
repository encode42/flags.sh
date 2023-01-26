import type { ZodType } from "zod";

export function parse(schema: ZodType, object: any) {
    const parsed = schema.safeParse(object);
    if (!parsed.success) {
        throw parsed.error;
    }

    return parsed.data;
}
