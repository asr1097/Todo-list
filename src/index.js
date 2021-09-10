import * as app from "./app";
import * as dom from "./dom";
import './style.css';


if (localStorage.length === 0) {app.addDefaultProject()}

dom.createBase();
dom.populateSideDiv();





