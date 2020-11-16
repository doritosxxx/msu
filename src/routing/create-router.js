import React from 'react'

import createRouter from 'router5'
import loggerPlugin from 'router5-plugin-logger'
import browserPlugin from 'router5-plugin-browser'
import routes from './routes'

function configureRouter() {
    const router = createRouter(routes, {
        defaultRoute: 'home'
	})

    router.usePlugin(loggerPlugin)
	router.usePlugin(browserPlugin())

    return router;
}

export default configureRouter;