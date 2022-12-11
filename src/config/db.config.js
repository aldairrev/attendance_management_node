const {
    MONGODB_PROTOCOL,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE,
    MONGODB_PARAMS,
} = global.process.env;

const protocol = MONGODB_PROTOCOL;
const user = MONGODB_USER;
const pass = MONGODB_PASSWORD;
const host = MONGODB_HOST;
const port = MONGODB_PORT;
const db = MONGODB_DATABASE;
const params = MONGODB_PARAMS;

let url = `${protocol}://`;
if (user) url += `${user}:${pass ?? ""}@`;
url += `${host}`;
if (port) url += `:${port}`;
url += `/${db}`;
if (params) url += `?${params}`;

module.exports = { url };
