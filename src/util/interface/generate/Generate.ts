export type Generate<T extends string | number, RT = string[]> = (props: Record<T, any> /* todo */) => RT;
