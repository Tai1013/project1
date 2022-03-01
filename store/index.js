const cookieparser = process.server ? require('cookieparser') : undefined;

// state
export const state = () => ({
    isTheme: 'light',
    isMobile: false,
    isLogin: false,
    
    
    navBar: [
        {
            title: '首頁',
            to: '/',
            type: 'index'
        },
        {
            title: '真人',
            to: '/live',
            type: 'games'
        },
        {
            title: '體育',
            to: '/sport',
            type: 'games'
        },
        {
            title: '電子',
            to: '/slot',
            type: 'games'
        },
        {
            title: '彩票',
            to: '/lottery',
            type: 'games'
        },
        {
            title: '棋排',
            to: '/poker',
            type: 'games'
        },
        {
            title: '電競',
            to: '/esports',
            type: 'game'
        },
        {
            title: '捕魚',
            to: '/fishing',
            type: 'game'
        }
    ]
})

// actions
export const actions = {
    getThemeState({ commit }) {
        const theme = localStorage.getItem('themeState');
        if (theme) {
            window.document.documentElement.setAttribute('data-theme', theme)
            commit('setThemeState', theme)
        } 
    },
    getMobileState({ commit }) {        
        if (this.state.isMobile && window.innerWidth > 1024 ) return commit('setMobileState', false)
        if (!this.state.isMobile && window.innerWidth <= 1024 ) return commit('setMobileState', true)
    },
    nuxtServerInit({ commit }, { req }) {
        if (req.headers.cookie) {
            const allCookies = cookieparser.parse(req.headers.cookie);
            if (allCookies['auth-token']) return commit('setUserToken', true)
            
        }
        commit('setUserToken', false)        
    }
    
    

}

// mutation
export const mutations = {
    setThemeState(state, theme) {
        state.isTheme = theme
    },
    setMobileState(state, boolean) {
        state.isMobile = boolean
    },
    setUserToken(state, boolean) {
        state.isLogin = boolean
    }
}

// getters
export const getters = {
    isTheme: state => {
        return state.isTheme
    },
    isMobile: state => {
        return state.isMobile
    },
    isLogin: state => {
        return state.isLogin
    }
    
}