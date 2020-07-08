
function isEmpty(obj) {

    return new Promise(resolve => {
        // null and undefined are "empty"
        if (obj == null) resolve(true);

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) resolve(false) ;
        if (obj.length === 0) resolve(true) ;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") resolve(true) ;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) resolve(false) ;
        }

        resolve(true) ;
    })

}

export default isEmpty