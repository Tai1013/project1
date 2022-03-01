<template>
    <div class="app">
        <header>
            <div id="headerTop">
                <div class="container row row-justify-between row-align-center">
                    <div class="row row-align-center">
                        <button id="themeBtn">
                            <font-awesome-icon
                                v-if="isTheme != 'light'"
                                icon="fa-solid fa-sun"
                                @click="changeTheme('light')"
                            />
                            <font-awesome-icon
                                v-if="isTheme != 'dark'"
                                icon="fa-solid fa-moon"
                                @click="changeTheme('dark')"
                            />
                        </button>
                        <p v-if="!isMobile" id="currentTime">
                            <span>GMT+8</span>
                            <span>{{ currentTime.date }}</span>
                            <span>{{ currentTime.time }}</span>
                        </p>
                        <nuxt-link v-if="isMobile" to="/">
                            <p class="logo">LOGO</p>
                        </nuxt-link>
                    </div>
                    <div v-if="!isLogin" class="row row-align-center">
                        <form
                            v-if="!isMobile"
                            id="loginForm"
                            @submit.prevent="getLogin()"
                        >
                            <input
                                v-model="loginForm.account"
                                type="text"
                                name="account"
                                placeholder="帳號"
                            />
                            <input
                                v-model="loginForm.password"
                                type="password"
                                name="password"
                                placeholder="密碼"
                            />
                            <button type="submit" class="btn btn-login">
                                登入
                            </button>
                        </form>
                        <button
                            v-if="isMobile"
                            class="btn btn-login"
                            @click="isLoginModel = !isLoginModel"
                        >
                            登入
                        </button>
                        <nuxt-link to="/register">
                            <button class="btn btn-register">註冊</button>
                        </nuxt-link>
                        <button
                            v-if="isMobile"
                            class="ico-menu"
                            @click="isMenu = !isMenu"
                        >
                            <font-awesome-icon icon="fa-solid fa-bars" />
                        </button>
                    </div>
                    <div v-if="isLogin">
                        <nuxt-link to="/member">
                            <button class="btn btn-member">會員</button>
                        </nuxt-link>
                        <button class="btn btn-logout" @click="logout()">
                            登出
                        </button>
                    </div>
                </div>
            </div>
            <div id="headerContent" :class="{ mobile: isMobile }">
                <div class="container row row-justify-between row-align-center">
                    <nuxt-link v-if="!isMobile" to="/">
                        <p class="logo">LOGO</p>
                    </nuxt-link>
                    <nav :class="{ active: isMenu }">
                        <nuxt-link
                            v-for="(item, index) in $store.state.navBar"
                            :key="index"
                            :to="item.to"
                            exact
                            >{{ item.title }}
                        </nuxt-link>
                    </nav>
                </div>
            </div>
        </header>
        <Nuxt />
        <div
            v-if="isMobile && !isLogin"
            id="loginModel"
            :class="{ active: isLoginModel }"
            class="model"
        >
            <div>
                <div class="model-title">
                    <span>登入</span>
                    <button
                        class="model-back"
                        @click="isLoginModel = !isLoginModel"
                    >
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>
                </div>
                <div class="model-content">
                    <form id="loginForm" @submit.prevent="getLogin()">
                        <div class="inputBox">
                            <label for="loginAccount">帳號</label>
                            <input
                                id="loginAccount"
                                v-model="loginForm.account"
                                type="text"
                                name="account"
                                placeholder="請輸入帳號"
                            />
                            <p v-if="loginForm.accountError" class="warning">
                                <font-awesome-icon
                                    icon="fa-solid fa-triangle-exclamation"
                                />{{ loginForm.accountError }}
                            </p>
                        </div>
                        <div class="inputBox">
                            <label for="loginPassword">密碼</label>
                            <input
                                id="loginPassword"
                                v-model="loginForm.password"
                                type="password"
                                name="password"
                                placeholder="請輸入密碼"
                            />
                            <p v-if="loginForm.passwordError" class="warning">
                                <font-awesome-icon
                                    icon="fa-solid fa-triangle-exclamation"
                                />{{ loginForm.passwordError }}
                            </p>
                        </div>
                        <div class="form-btn">
                            <button type="submit" class="btn btn-main1">
                                登入
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const Cookies = process.client ? require('js-cookie') : undefined
export default {
    name: 'DefaultPage',
    data() {
        return {
            currentTime: {
                date: '',
                time: '',
            },
            loginForm: {
                account: '',
                password: '',
                accountError: '',
                passwordError: '',
            },
            isMenu: false,
            isLoginModel: false,
        }
    },
    head() {
        return {}
    },
    computed: {
        isTheme() {
            return this.$store.getters.isTheme
        },
        isLogin() {
            return this.$store.getters.isLogin
        },
        isMobile() {
            return this.$store.getters.isMobile
        },
    },
    watch: {
        'loginForm.account'() {
            this.validate('account')
        },
        'loginForm.password'() {
            this.validate('password')
        },
    },
    created() {
        this.getTime()
        setInterval(() => {
            this.getTime()
        }, 1000)
    },
    mounted() {
        this.$store.dispatch('getThemeState')
        this.onResize()
        window.addEventListener('resize', this.onResize)
    },
    methods: {
        getTime() {
            const today = new Date()
            this.currentTime.date =
                this.setBinary(today.getFullYear()) +
                '-' +
                this.setBinary(today.getMonth()) +
                '-' +
                this.setBinary(today.getDate())
            this.currentTime.time =
                this.setBinary(today.getHours()) +
                ':' +
                this.setBinary(today.getMinutes()) +
                ':' +
                this.setBinary(today.getSeconds())
        },
        setBinary(time) {
            if (time < 10) return '0' + time
            return time
        },
        onResize() {
            this.$store.dispatch('getMobileState')
        },
        changeTheme(theme) {
            window.document.documentElement.setAttribute('data-theme', theme)
            localStorage.setItem('themeState', theme)
            this.$store.commit('setThemeState', theme)
        },
        getLogin() {
            this.validate('account')
            this.validate('password')

            const form = this.loginForm
            const inputForm = document.getElementById('loginForm')
            if (form.account.length === 0) {
                inputForm.account.focus()
                return alert('帳號不能為空')
            }
            if (form.password.length === 0) {
                inputForm.password.focus()
                return alert('密碼不能為空')
            }
            this.$axios.get('login.json').then((res) => {
                const data = res.data
                let state = false
                for (let i = 0; i < data.length; i++) {
                    if (
                        form.account === data[i].Account &&
                        form.password === data[i].Password
                    )
                        state = true
                }
                if (state) {
                    this.isLoginModel = false
                    Cookies.set('auth-token', 'Afd151bdv')
                    this.$store.commit('setUserToken', true)
                    this.$router.push('/')
                    alert('登入成功')
                } else alert('帳號密碼錯誤')
                Object.assign(
                    this.$data.loginForm,
                    this.$options.data().loginForm
                )
                this.$nextTick(() => {
                    for (let i = 0; i < inputForm.length; i++) {
                        inputForm[i].classList.remove('error')
                    }
                    form.accountError = ''
                    form.passwordError = ''
                })
            })
        },
        validate(type) {
            const isEngNum = /^[a-zA-Z0-9]+$/
            const form = this.loginForm
            if (type === 'account') {
                const inputForm = document.getElementById('loginForm')
                if (!isEngNum.test(form.account))
                    form.account = form.account.substring(
                        0,
                        form.account.length - 1
                    )
                if (form.account.length === 0) {
                    inputForm.account.classList.add('error')
                    form.accountError = '帳號不能為空'
                } else {
                    inputForm.account.classList.remove('error')
                    form.accountError = ''
                }
            }
            if (type === 'password') {
                const inputForm = document.getElementById('loginForm')
                if (!isEngNum.test(form.password))
                    form.password = form.password.substring(
                        0,
                        form.password.length - 1
                    )
                if (form.password.length === 0) {
                    inputForm.password.classList.add('error')
                    form.passwordError = '密碼不能為空'
                } else {
                    inputForm.password.classList.remove('error')
                    form.passwordError = ''
                }
            }
        },
        logout() {
            Cookies.remove('auth-token')
            this.$store.commit('setUserToken', false)
            this.$router.push('/')
        },
    },
}
</script>

<style lang="scss" scoped>
header {
    height: 10rem;
    @media screen and (max-width: 1024px) {
        height: 4rem;
    }
    #headerTop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100%;
        height: 4rem;
        font-size: 1.5rem;
        @include themeify {
            color: theme('header_top_color');
            background: theme('header_top_background');
        }
        #currentTime {
            margin: 0;
            span {
                margin: 0 0.2rem;
            }
        }
        #themeBtn {
            margin-right: 1rem;
            background: transparent;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            @include themeify {
                color: theme('header_top_color');
                @media screen and (min-width: 1025px) {
                    &:hover {
                        background-color: theme('main_color');
                    }
                }
            }
        }
        #loginForm {
            input {
                margin: 0 0.5rem;
                font-size: 1.3rem;
                width: 15rem;
                height: 2.5rem;
            }
        }
        .btn {
            margin: 0 0.5rem;
            font-size: 1.3rem;
            color: #ffffff;
            width: 6rem;
            height: 2.5rem;
            line-height: 2.5rem;
            &-login,
            &-member {
                background-color: #01a69c;
            }
            &-register,
            &-logout {
                background-color: #1c97ce;
            }
        }
        .logo {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 400;
            @include themeify {
                color: theme('main_color');
            }
        }
        .ico-menu {
            margin-left: 0.5rem;
            background: transparent;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            @include themeify {
                color: theme('header_top_color');
            }
        }
    }
    #headerContent {
        position: fixed;
        top: 4rem;
        left: 0;
        z-index: 8;
        width: 100%;
        height: 6rem;
        @include themeify {
            background: theme('back_color');
        }
        .logo {
            margin: 0;
            font-size: 4rem;
            font-weight: bold;
            @include themeify {
                color: theme('main_color');
            }
        }
        nav {
            a {
                margin-left: 2rem;
                font-size: 1.6rem;
                font-weight: bold;
                @include themeify {
                    color: theme('font_color');
                }
            }
        }
        &.mobile {
            height: 0;
            nav {
                position: fixed;
                top: 4rem;
                right: -35.5rem;
                z-index: 8;
                padding: 1rem 0;
                max-width: 35rem;
                width: 100%;
                height: calc(100% - 4rem);
                box-shadow: 0 0 0.5rem #3d4145;
                transition: right 0.3s;
                @include themeify {
                    background: theme('header_menu_background');
                }
                a {
                    display: block;
                    margin-left: 0;
                    padding: 1rem 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                    width: 100%;
                    text-align: center;
                    @include themeify {
                        color: theme('font_color');
                    }
                }
                &.active {
                    right: 0;
                }
            }
        }
    }
}
#loginModel {
    > div {
        max-width: 500px;
    }
    #loginForm {
        max-width: 300px;
    }
}
</style>