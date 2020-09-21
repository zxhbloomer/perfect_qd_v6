import { constantRoutes, asyncRoutes2, convertToOneRouter, setRedirectRouter } from '@/router'
import deepcopy from 'deep-copy'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  // 顶部导航栏
  topNav: [],
  // 当前激活的菜单
  menus: [],
  addRoutes: []
}

const mutations = {
  // 添加默认路由，需要包含url根目录redirect跳转
  SET_MENUS_ROUTERS: (state, menus) => {
    state.addRoutes = menus
    state.menus = constantRoutes.concat(menus)
  },
  // 添加顶部导航栏
  SET_TOP_NAV: (state, topNav) => {
    state.topNav = topNav
  }
}

const actions = {
  setRoutes({ commit }, routers) {
    // 设置到vuex中是菜单树
    commit('SET_MENUS_ROUTERS', routers)
  },
  /**
   * 以下为手工代码，调试使用
   * @param {*} param0
   * @param {*} _data
   */
  setTopNavAndGetRoutersAction({ commit }, _data) {
    return new Promise(resolve => {
      // TODO 此处修改，调试顶部导航栏
      const _topNavData = [
        {
          nav_path: '01',
          index: '1',
          type: 'T',
          meta: {
            icon: '系统管理',
            name: '工作台'
          }
        },
        {
          nav_path: '02',
          index: '2',
          type: 'T',
          meta: {
            icon: 'syscode',
            name: '业务管理'
          }
        },
        {
          nav_path: '03',
          index: '3',
          type: 'T',
          meta: {
            icon: 'syscode',
            name: '业务管理a'
          }
        }
      ]

      // 根据to的path，解析激活哪一个顶部导航栏
      const _topNav = {
        data: _topNavData,
        activeIndex: '-1'
      }
      const url = _data.nav_path.split('/')[1]
      const _activeIndex = _topNavData.filter(item => item.nav_code === url)[0]
      if (_activeIndex) {
        _topNav.activeIndex = _activeIndex
      } else {
        // todo:error??
      }
      // 把顶部导航栏，设置到vuex中去
      commit('SET_TOP_NAV', _topNav)

      /** 设置菜单
       *  需要注意：菜单和router不是一一匹配的
       *  此处把菜单格式化成自有一个节点的router
       *  把菜单返回给左侧sidebar显示，但是router是一个节点向下的
       *
       *  最后还需要考虑redirect的数据，该数据需要包含到'SET_MENUS_ROUTERS'的vuex中
      */
      var _routers = deepcopy(asyncRoutes2)
      const convertData = convertToOneRouter(_routers)
      const redirect_data = {
        redirect: '/dashboard',
        path: 'dashboard',
        component: '/01_dashboard/index',
        meta: {
          title: '首页', icon: 'dashboard', affix: true
        }
      }
      setRedirectRouter(redirect_data)
      commit('SET_MENUS_ROUTERS', asyncRoutes2)
      resolve(convertData)
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
