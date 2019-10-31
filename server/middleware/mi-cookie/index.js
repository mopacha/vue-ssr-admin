
module.exports = () => {
	return async (ctx, next) =>{
		const cookieHeader = ctx.headers.cookie
      if (cookieHeader) {
				const cookies = cookieHeader.split(';')

        ctx.cookie = {}
        cookies.forEach(function (item) {
          const crumbs = item.split('=')
          if (crumbs.length > 1) ctx.cookie[crumbs[0].trim()] = crumbs[1].trim()
        })
      }
		await next()
	}
}
