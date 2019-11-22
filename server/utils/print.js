const chalk = require('chalk')
const figlet = require('figlet')


const bastet = () => {
    console.log(chalk.blue.bold("\n  ///,        ////\n  \\  /,      /  >.\n   \\  /,   _/  /.\n    \\_  /_/   /.\n     \\__/_   <\n     /<<< \\_\\_\n    /,)^>>_._ \\\n    (/   \\\\ /\\\\\\\n         // ````\n  ======((`======= @ZFY\n"));
}

const cool = () => {
    console.log(
        chalk.blue(
            figlet.textSync('cooL', {
                font: 'Slant',
                horizontalLayout: 'full',
                verticalLayout: 'full'
            })
        )
    )
}

module.exports = {
    bastet,
    cool
}
