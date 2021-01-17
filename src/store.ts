import { createStore, Commit } from 'vuex'
import axios from 'axios'
import { arrToObj, objToArr } from './helper'

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
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}

interface ListProps<P> {
  [id: string]: P;
}
export interface GlobalDataProps {
  loading: boolean;
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<PostProps>; loadedColumns: string[] };
  user: UserProps;
}

const AsyncgetAndCommit = async (url: string, mutationName: string, commit: Commit, extraData?: any) => {
  const { data } = await axios.get(url)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: { isLogin: false, nickName: 'sds', column: '111' }
  },
  mutations: {
    login (state, payload) {
      state.user = { ...state.user, isLogin: true, nickName: 'sds', email: payload.email }
    },
    createPost (state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns (state, rawData) {
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1
      }
      console.log('rawData', rawData)
      console.log('state.columns', state.columns)
    },
    fetchColumn (state, rawData) {
      console.log('fetchColumn rawData', rawData)
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts (state, { data: rawData, extraData: columnId }) {
      console.log('fetchPosts rawData', rawData)
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      state.posts.loadedColumns.push(columnId)
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    fetchColumns ({ commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      AsyncgetAndCommit(`/api/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      AsyncgetAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      AsyncgetAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit, cid)
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getColumns: (state) => {
      return objToArr(state.columns.data)
    }
  }
})

export default store
