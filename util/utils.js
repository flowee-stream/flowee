export function generateToken() {
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
	const charactersLength = characters.length
	let counter = 0
	while(counter < 30) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
		counter += 1
	}
	return result
}

export function getTimestamp() {
  	return Math.floor(Date.now() / 1000)
}

export function buildStreamToken(accountID, streamToken) {
	return `${accountID}?t=${streamToken}`
}

export function timeDifference(previous) {
    var msPerMinute = 60 * 1000
    var msPerHour = msPerMinute * 60
    var msPerDay = msPerHour * 24
    var msPerMonth = msPerDay * 30
    var msPerYear = msPerDay * 365

    var elapsed = Date.now() - previous * 1000

    if (elapsed < msPerMinute) {
        if(Math.round(elapsed/1000) == 1) {
            return Math.round(elapsed/1000) + ' second ago'
        }
        return Math.round(elapsed/1000) + ' seconds ago'
    }

    else if (elapsed < msPerHour) {
        if(Math.round(elapsed/msPerMinute) == 1) {
            return Math.round(elapsed/msPerMinute) + ' minute ago'
        }
        return Math.round(elapsed/msPerMinute) + ' minutes ago'
    }

    else if (elapsed < msPerDay ) {
        if(Math.round(elapsed/msPerHour) == 1) {
            return Math.round(elapsed/msPerHour) + ' hour ago'
        }
        return Math.round(elapsed/msPerHour) + ' hours ago'
    }

    else if (elapsed < msPerMonth) {
        if(Math.round(elapsed/msPerDay) == 1) {
            return Math.round(elapsed/msPerDay) + ' day ago'
        }
        return Math.round(elapsed/msPerDay) + ' days ago'
    }

    else if (elapsed < msPerYear) {
        if(Math.round(elapsed/msPerMonth) == 1) {
            return Math.round(elapsed/msPerMonth) + ' month ago'
        }
        return Math.round(elapsed/msPerMonth) + ' months ago'
    }

    else {
        if(Math.round(elapsed/msPerYear) == 1) {
            return Math.round(elapsed/msPerYear) + ' year ago'
        }
        return Math.round(elapsed/msPerYear) + ' years ago'
    }
}

export function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces)

    var abbrev = [ "K", "M", "B", "T" ]

    for(var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10, (i+1)*3)

        if(size <= number) {
             number = Math.round(number*decPlaces/size)/decPlaces
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1
                 i++
             }
             number += abbrev[i]
             break
        }
    }

    return number
}