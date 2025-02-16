export const SORT_OPTIONS = [
  {
    value: 'createdAt',
    label: 'Created Newest',
    queryObject: { sort: 'asc', sortBy: 'createdAt' }
  },
  {
    value: 'updatedAt',
    label: 'Updated Newest',
    queryObject: { sort: 'asc', sortBy: 'updatedAt' }
  },
  {
    value: 'name',
    label: 'Name',
    queryObject: { sort: 'asc', sortBy: 'name' }
  }
]
