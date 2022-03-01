// import axios from 'axios'

export default function ({ route, store, redirect }) {
    switch (route.fullPath) {
        case '/register':
            if (store.state.isLogin) return redirect('/')
            break;
    }
}