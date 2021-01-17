import { createStore } from 'vuex'
import { testData, testPosts } from './testData'

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
  columnId?: number;
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

export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

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
    user: { isLogin: false, nickName: 'sds', columnId: 1 }
  },
  mutations: {
    login (state, payload) {
      state.user = { ...state.user, isLogin: true, nickName: 'sds', email: payload.email }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store
