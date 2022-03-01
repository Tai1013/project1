<template>
    <header class="header">
        <div
            v-if="!isMobile"
            class="header-top row row-justify-center row-align-center"
        >
            <form @submit.prevent="checkForm">
                <label for="account">帳號</label>
                <input id="account" v-model="login.Account" type="text" />
                <label for="password">密碼</label>
                <input id="password" v-model="login.Password" type="password" />
                <button type="submit" class="btn btn-login">登入</button>
                <nuxt-link to="/register" class="btn btn-register"
                    >註冊</nuxt-link
                >
            </form>
        </div>
        <div class="header-content">
            <div class="container row row-align-center row-justify-between">
                <nuxt-link to="/">
                    <p class="header-logo">LOGO</p>
                </nuxt-link>
                <nav
                    :class="{ mobile: isMobile, active: isMenu }"
                    class="header-menu row-auto"
                >
                    <button
                        v-if="isMobile"
                        class="ico-menu-close"
                        @click="isMenu = !isMenu"
                    >
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>
                    <nuxt-link
                        v-for="(item, index) in $store.state.navBar"
                        :key="index"
                        :to="item.to"
                        exact
                        @click.native="mobileCloseMenu()"
                        >{{ item.title }}</nuxt-link
                    >
                </nav>
                <div class="row row-align-center">
                    <button v-if="isMobile" type="submit" class="btn btn-login">
                        登入
                    </button>
                    <nuxt-link
                        v-if="isMobile"
                        to="/register"
                        class="btn btn-register"
                        >註冊</nuxt-link
                    >
                    <div class="theme">
                        <button class="ico-theme" @click="isTheme = !isTheme">
                            <font-awesome-icon icon="fa-solid fa-palette" />
                        </button>
                        <div v-if="isTheme" class="theme-menu">
                            <button
                                id="dark"
                                @click="changeTheme('dark')"
                            ></button>
                            <button
                                id="thRed"
                                @click="changeTheme('thRed')"
                            ></button>
                        </div>
                    </div>
                    <button
                        v-if="isMobile"
                        class="ico-menu"
                        @click="isMenu = !isMenu"
                    >
                        <font-awesome-icon icon="fa-solid fa-bars" />
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'TheHeader',
    data() {
        return {
            isMenu: false,
            isTheme: false,

            login: {
                Account: '',
                Password: '',
            },
        }
    },
    computed: {
        isMobile() {
            // console.log(this.$store.getters.isMobile)
            return this.$store.getters.isMobile
        },
    },
    mounted() {
        console.log("aaa")
        console.log(this.$router.options.routes)
    },
    methods: {
        changeTheme(theme) {
            window.document.documentElement.setAttribute('data-theme', theme)
            this.isTheme = !this.isTheme
        },
        mobileCloseMenu() {
            if (this.isMenu && this.isMobile) this.isMenu = !this.isMenu
        },
        checkForm() {
            // console.log('aaa')
            this.$axios.get('member.json').then((res) => {
                const data = res.data.User
                let state = false
                for (let i = 0; i < data.length; i++) {
                    if (this.login.Account === data[i].Account && this.login.Password === data[i].Password) state = true
                }
                if (state) {
                    localStorage.setItem('isLogin', true);
                    document.cookie = 'auth-token=123'
                    this.$router.go(0)
                } else {
                    Object.assign(this.$data.login, this.$options.data().login)
                }
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.header {
    &-top {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 4rem;
        @include themeify {
            color: theme('h_top_font');
            background: theme('h_top_background');
        }
        label {
            margin-left: 2.5rem;
            margin-right: 0.5rem;
            font-size: 1.3rem;
        }
        input {
            padding: 0 0.5rem;
            width: 15rem;
            height: 2.5rem;
            font-size: 1.3rem;
            color: #000000;
            background-color: #ffffff;
            box-shadow: 0 0 0.2rem #000 inset;
        }
        .btn {
            margin-left: 2rem;
            width: 6rem;
            height: 2.5rem;
            line-height: 2.5rem;
            @include themeify {
                &-login {
                    background: theme('h_top_login');
                }
                &-register {
                    background: theme('h_top_register');
                }
            }
        }
    }
    &-content {
        position: fixed;
        top: 4rem;
        left: 0;
        z-index: 9;
        width: 100%;
        height: 6rem;
        box-shadow: 0 0 0.5rem #000000;
        @include themeify {
            background: theme('h_menu_background');
        }
        @media screen and (max-width: 1024px) {
            top: 0;
            height: 4.5rem;
        }
        .btn {
            margin-right: 1rem;
            width: 4.5rem;
            height: 2.5rem;
            line-height: 2.5rem;
            @include themeify {
                &-login {
                    background: theme('h_menu_login');
                }
                &-register {
                    background: theme('h_menu_register');
                }
            }
        }
    }
    &-logo {
        margin: 0;
        font-size: 4rem;
        font-weight: bold;
        @include themeify {
            color: theme('logo_color');
        }
        @media screen and (max-width: 1024px) {
            font-size: 3rem;
        }
    }
    &-menu {
        padding: 0 2rem;
        text-align: right;
        box-sizing: border-box;
        a {
            display: inline-block;
            padding: 0 2rem;
            height: 6rem;
            line-height: 6rem;
            font-size: 1.8rem;
            font-weight: 600;
            @media screen and (max-width: 1024px) {
                height: 4.5rem;
                line-height: 4.5rem;
                font-size: 1.6rem;
            }
            @include themeify {
                color: theme('h_menu_font');
                @media screen and (min-width: 1025px) {
                    &:hover {
                        background-color: theme('h_menu_active');
                    }
                }
                &.nuxt-link-exact-active,
                &.nuxt-link-active {
                    background-color: theme('h_menu_active');
                }
            }
        }
        &.mobile {
            position: fixed;
            top: 0;
            right: -35.5rem;
            z-index: 8;
            padding: 4.5rem 0;
            max-width: 35rem;
            width: 100%;
            height: 100%;
            transition: right 0.5s;
            box-sizing: border-box;
            overflow: auto;
            box-shadow: 0 0 0.5rem #000000;
            @include themeify {
                background: theme('h_menu_background');
            }
            a {
                display: block;
                padding: 0;
                width: 100%;
                text-align: center;
            }
            &.active {
                right: 0;
            }
        }
    }
    .ico-menu {
        width: 4.5rem;
        height: 4.5rem;
        background: none;
        border: none;
        border-radius: 50%;
        font-size: 2.2rem;
        cursor: pointer;
        @include themeify {
            color: theme('h_menu_font');
        }
    }
    .ico-menu-close {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4.5rem;
        background: none;
        border: none;
        border-radius: 50%;
        font-size: 2.2rem;
        cursor: pointer;
        @include themeify {
            color: theme('h_menu_font');
        }
    }
}
.theme {
    position: relative;
    display: inline-block;
    .ico-theme {
        width: 4.5rem;
        height: 4.5rem;
        background: none;
        border: none;
        border-radius: 50%;
        font-size: 2.2rem;
        cursor: pointer;
        @include themeify {
            color: theme('h_menu_font');
            @media screen and (min-width: 1025px) {
                &:hover {
                    background-color: theme('h_menu_active');
                }
            }
        }
    }
    &-menu {
        position: absolute;
        top: 6.25rem;
        left: 0;
        z-index: 7;
        width: 100%;
        max-height: 21rem;
        overflow: auto;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem #000000;
        @include themeify {
            background-color: theme('h_menu_active');
        }
        button {
            display: block;
            margin: 0.75rem auto;
            width: 3rem;
            height: 3rem;
            box-sizing: border-box;
            border-radius: 50%;
            &#dark {
                background-color: #dcbf88;
                border: 0.75rem solid #1b2a46;
            }
            &#thRed {
                background-color: #ffffff;
                border: 0.75rem solid #e41c24;
            }
        }
        @media screen and (max-width: 1024px) {
            top: 5.5rem;
        }
    }
}
</style>