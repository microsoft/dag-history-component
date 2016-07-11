import metadata from "./metadata";
import visuals from "./visuals";
const { combineReducers } = require("redux");

const reducer = combineReducers({
    metadata,
    visuals,
});
export default reducer;
