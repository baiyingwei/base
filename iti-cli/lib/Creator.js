const { fetchRepoList, fetchTagList } = require('./request');
const Inquirer = require('inquirer');//用过命令行和用户交互
const { wrapLoading } = require('./utils');
const downloadGitRepo = require('download-git-repo');//下载项目模板
const util = require('util');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');//模板引擎，将用户提交的信息填充到模板文件

class Creator {
  constructor(name, target) {
    this.name = name;
    this.target = target;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async fetchRepo() {
    let repos = await wrapLoading(fetchRepoList, 'waiting load template');
    if (!repos) return;
    let repoList = repos.map(repo => repo.name);
    const { repo } = await Inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repoList,
      message: 'please choose a template'
    });

    return repo;
  }
  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, 'waiting load tags', repo);
    if (!tags) return;
    let tagList = tags.map(tag => tag.name)
    const { tag } = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagList,
      message: 'please choose a tag'
    });
    return tag;
  }
  async download(repo, tag) {
    let requestUrl = `zhu-cli/${repo}${tag ? '#' + tag : ''}`;
    await wrapLoading(this.downloadGitRepo, 'waiting load download', requestUrl, path.resolve(process.cwd(), `${this.target}`));
    

    const fileName = path.resolve(process.cwd(), 'package.json');
    const meta = {
      name: this.name
    }
    if (fs.existsSync(fileName)) {
      const content = fs.readFileSync(fileName).toString();
      const result = handlebars.compile(content)(meta);
      console.log(result)
      fs.writeFileSync(fileName, result);
    }
  }

  async create() {
    let repo = await this.fetchRepo(); //模板项目
    let tag = await this.fetchTag(repo);//tag list
    await this.download(repo, tag);
  }
}

module.exports = Creator;