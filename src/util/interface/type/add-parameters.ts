/**
 * @author https://stackoverflow.com/a/69668215/10015929
 */
export type AddParameters<TFunction extends (...args: any) => any, TParameters extends [...args: any]> = (...args: [...Parameters<TFunction>, ...TParameters]) => ReturnType<TFunction>;
