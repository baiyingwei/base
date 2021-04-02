const path = require('path');
const fs = require('fs-extra');
const Inquirer = require('inquirer');
const Creator = require('./Creator');

module.exports = async (name, options) => {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir)
    } else {//提示用户是否覆盖
      const { action } = await Inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'target dir has exist',
        choices: [
          { name: 'Overwrite', value: 'overwrite' },
          { name: 'Cancel', value: false }
        ]
      }]);
      if (!action) {
        return;
      } else if (action === 'overwrite') {
        await fs.remove(targetDir);
      }
    }
  }

  const creator = new Creator(name, targetDir);
  creator.create();
}