import TreeDB from "./fromDB/treeDB.js";

try {
    const treeDB = new TreeDB();
    const menu = await treeDB.findAll();

    for (const item of menu) {
        console.log(`* ${item.nombre}`);
        for (const subitem of item.hijos) {
            console.log(` > ${subitem.nombre}`);
        }
    }

} catch (exc) {
    console.error(exc);
}