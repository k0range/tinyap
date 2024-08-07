import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faAt, faBell, faCheck, faEnvelope, faHouse, faLock, faMagnifyingGlass, faStar, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faMagnifyingGlass, faAt, faLock, faEnvelope, faTriangleExclamation, faHouse, faBell, faStar, faUser)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
