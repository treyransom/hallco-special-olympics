
import { announcement, campaign, events, posts, athleteOfMonth, results, stories, sponsors } from "./scratch_data.mjs";
import fs from "fs";
const w=(n,o)=>fs.writeFileSync("content/"+n+".json", JSON.stringify(o,null,2)+"\n");
w("announcement",announcement); w("campaign",campaign); w("events",{events}); w("posts",{posts}); w("athleteOfMonth",{athletes:athleteOfMonth}); w("results",{results}); w("stories",{stories}); w("sponsors",{sponsors});
