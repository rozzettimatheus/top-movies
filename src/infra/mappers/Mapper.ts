export default interface CollectionMapper<E> { 
  mapToCollection<T extends Array<unknown>>(input: T): E[]
}