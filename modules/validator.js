/**
 * Created by nilupul on 1/17/17.
 */
var constraints = {
    username: {
        presence: true,
        format: {
            pattern: /[a-z][_][a-z][0-9]/,
            flag: 'i'
        },
        length: {
            minimum: 10
        }
    }
}