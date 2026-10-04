import "./style.css";
import displayHeader from "./js/Header.mjs";
import { getData } from "./js/Data.mjs";
import displayBusinesses from "./js/Businesses.mjs";
import displayFooter from "./js/Footer.mjs";
const businessesPath = "businesses.json";


const businessData = await getData(businessesPath);
displayBusinesses(businessData);
console.log(businessData);
displayHeader();
displayFooter();
