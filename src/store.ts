import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
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
  token: string;
  loading: boolean;
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<PostProps>; loadedColumns: string[] };
  user: UserProps;
}

const AsyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
}

const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: { isLogin: false }
  },
  mutations: {
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout (state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.remove('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
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
    login ({ commit }, payload) {
      return AsyncAndCommit('/api/user/login', 'login', commit, { method: 'post', data: payload })
    },
    fetchCurrentUser ({ commit }) {
      return AsyncAndCommit('/api/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    fetchColumns ({ commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      return AsyncAndCommit(`/api/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return AsyncAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return AsyncAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
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
