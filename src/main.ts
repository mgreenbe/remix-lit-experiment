import "./index.css";
import { router, renderMatches } from "./router";

const target = document.getElementById("root")!;
router.subscribe((state) => renderMatches(state, target));
