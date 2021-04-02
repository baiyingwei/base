
/**
 * hash实现
 */

// class Router {
//   constructor() {
//     this.routes = {};
//     this.currentUrl = '';
//     this.historyArr = [];
//     this.index = -1;
//     this.isBack = false;
//     this.refresh = this.refresh.bind(this);
//     window.addEventListener('load', this.refresh, false);
//     window.addEventListener('hashchange', this.refresh, false);
//   }

//   route(path, callback) {
//     this.routes[path] = callback || function () { };
//     this.isBack = false;
//   }
//   refresh() {
//     this.currentUrl = location.hash.split('#')[1] || '/';
//     this.routes[this.currentUrl]();
//     console.log(this.isBack)
//     if (!this.isBack) {
//       this.historyArr.push(this.currentUrl);
//       this.index = this.index + 1;
//     }
//     console.log(this.historyArr)

//   }
//   goBack() {
//     this.index = this.index - 1;
//     if (this.index < 0) return;
//     console.log(this.historyArr)
//     location.hash = `#${this.historyArr[this.index]}`;
//     this.isBack = true;
//     this.refresh();
//   }
// }


/**
 * history实现
 * window.history.go(-3); //后退三个界面
 * window.history.back();
 * window.history.forward();
 * popstate() 页面history变化时触发
 * window.history.replaceState()
 * window.history.pushState(state, title, url)
 */

class Router {
  constructor() {
    this.routes = {};
    this.bindHistory();
  }

  init(path) {
    history.replaceState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  go(path) {
    history.pushState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  route(path, callback) {
    this.routes[path] = callback || function () { };
  }

  //监听浏览器的前进后退
  bindHistory() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      console.log(path,this.routes)
      this.routes[path] && this.routes[path]();
    });
  }


}

const router = new Router();
router.init(location.pathname);
router.route('/', function () {
  console.log(111)
})
router.route('/blue', function () {
  console.log(222)
})
router.route('/green', function () {
  console.log(333)
})

document.getElementsByTagName('button')[0].onclick = function () {
  router.go();
  // console.log('1111111')
}
const ul = document.querySelector('ul');
ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    router.go(e.target.getAttribute('href'));
  }
});