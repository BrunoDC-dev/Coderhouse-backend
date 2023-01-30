const express = require('express')
const app = express()
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args._[0] || 8080;
const childProcess = require('child_process');

app.get('/api/randoms', (req, res) => {
    const cant = req.query.cant || 100000000;

    const child = childProcess.fork('./random-generator.js', [cant]);

    child.on('message', (result) => {
        res.json(result);
    });
});
app.get('/info', (req, res) => {
    const argv = process.argv
    const platform = process.platform
    const nodeVersion = process.version
    const pid = process.pid
    const cwd = process.cwd()
    const rss = process.memoryUsage().rss
     console.log(argv, platform, nodeVersion, pid, cwd, rss)
    res.json({'info': {'argumento': argv,'platform': platform, 'ndoeVersion': nodeVersion, ' Process': pid, 'Path':cwd, 'Memory':rss}})
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});