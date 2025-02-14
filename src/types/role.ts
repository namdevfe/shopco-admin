export interface Role {
  _id: string
  name: string
  description?: string
  permission: string[] | []
  createdAt: Date
  updatedAt: Date
  _destroy: boolean
}

export interface AddRolePayload {
  name: string
  description?: string
}

export type EditRolePayload = Partial<
  Pick<Role, 'name' | 'description' | 'permission'>
>
