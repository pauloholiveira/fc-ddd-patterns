export default interface RepositoryInterface<T> {
    create(entity: T): Promise<void>;//Promise porque vai trabalhar de forma assincrona
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}