interface Admin {
  _id: String;
  username: String;
  email: String;
  shop: String;
  role: Role;
  createdAt: String;
  updatedAt: String;
}

interface Role {
  _id: String;
  name: String;
  description: String;
  createdAt: String;
  updatedAt: String;
}

export type { Admin, Role }