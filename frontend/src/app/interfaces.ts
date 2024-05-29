export interface Post{
  id: number,
  name: string,
  price: string
  description: string,
}

export interface User{
  email: string,
  username: string,
  password: string,
  phone_number: string,
}

export interface UserInProfile{
  email: string,
  username: string,
  id: string,
  phone_number: string;
}

export interface Image{
  id: number,
  comment: number,
  image: string
}

export interface Comment{
  id: string,
  user: string,
  user_name: string,
  content: string,
  date_added: string,
  images: Image[],
}

export interface CommentNoImage{
  id: string,
  user: string,
  user_name: string,
  content: string,
  date_added: string,
  images: [],
}

export interface CartItem{
  id: string,
  product: ProductInCart,
  quantity: string,
}

export interface Cart{
  id: number,
  user: number,
  session_key: string,
  items: CartItem[],
}

export interface ProductInCart{
  name: string,
  price: number,
  description: string,
  image: null,
}

export interface AddProductToCart{
  product_id: number,
  quantity: number
}
