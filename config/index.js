process.env["NODE_CONFIG_DIR"] = __dirname

const config = require("config");

const requiredConfigs = ["core.botToken", "core.challenge"]

for (const c of requiredConfigs) {
    if (!config.has(c)) {
        console.log(`[config error] ${c} not found`)
        process.exit(1)
    }
}
module.exports = config;