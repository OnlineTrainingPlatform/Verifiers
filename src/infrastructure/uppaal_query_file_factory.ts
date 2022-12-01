export interface IUppaalQueryFileFactory {
    create(query: string | string[]): Promise<string>;
}

export class UppaalQueryFileFactory {

}