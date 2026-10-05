import "../style.css";
import displayHeader from "./Header.mjs";
import { getData } from "./Data.mjs";
import displayBusinesses from "./Businesses.mjs";
import displayFooter from "./Footer.mjs";
const businessesPath = "businesses.json";

displayHeader();
displayFooter();

const businessData = await getData(businessesPath);
displayBusinesses(businessData);
