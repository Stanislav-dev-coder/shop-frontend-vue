import instance from './instance'

import catalogModule from './catalog'
import cartModule from './cart'
import userModule from './user'
import ordersModule from './orders'
import authModule from './auth'

export default {
    catalog: catalogModule(instance),
    cart: cartModule(instance),
    user: userModule(instance),
    orders: ordersModule(instance),
    auth: authModule(instance)
}