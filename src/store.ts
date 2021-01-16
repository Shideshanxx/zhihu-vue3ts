import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}
// export interface ColumnProps {
//   _id: string;
//   title: string;
//   avatar?: ImageProps;
//   description: string;
// }
// export interface PostProps {
//   _id?: string;
//   title: string;
//   excerpt?: string;
//   content?: string;
//   image?: ImageProps | string;
//   createdAt?: string;
//   column: string;
//   author?: string | UserProps;
//   isHTML?: boolean;
// }
// interface ListProps<P> {
//   [id: string]: P;
// }
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    login (state, payload) {
      state.user = { ...state.user, isLogin: true, nickName: 'sds', email: payload.email }
    }
  }
})

export default store
