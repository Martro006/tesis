import { methods as DBFirebase } from '../firebase/firebase';

const updateFile = async (req, res) => {
    try {
        let file = req.files.file
        if (file == undefined) {
            res.status(400);
            res.send("file not defined");
        }

        const name = await DBFirebase.storageOnComplete(file);
        const url = await DBFirebase.getDownload(name);
        const meta = await DBFirebase.getMetaDatos(name);

        res.json({
            name: name,
            url: url,
            meta: meta
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    updateFile
}