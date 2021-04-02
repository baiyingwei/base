import { createStore, combineReducers, applyMiddleware } from './redux/src';
import thunk from './redux-thunk/src';
import axios from 'axios';

const btn = document.getElementsByTagName('button')[0];



const initState = {
  name: 0
}

const reducer = (state = initState, action) => {
  console.log(state, action)
  if (action.type === 1) {
    return action.data
  } else if (action.type === 2) {
    return {
      name: 2
    }
  } else {
    return state
  }
}

const reducer1 = (state = {}, action) => {
  if (action.type === 'add') {
    return 1
  }
  return 2;
}

const red = combineReducers({
  reducer,
  reducer1
})


const store = createStore(red, applyMiddleware(thunk));

function getData() {
  return dispatch => {
    axios.get('system/category/list.json?cateName=', {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNTc3OTgwMzQyLCJpYXQiOjE1Nzc5NDQzNDIsInVzZXJuYW1lIjoiYWRtaW4ifQ.YWsLvQB0dBngyIqdUwTgMHv1jMSyButAm6YIdjA2ADs'
      }
    }).then(res => {
      dispatch({
        type: 1,
        data: res.data
      })
    })
  }
}
btn.onclick = function () {
  store.dispatch(getData())
}
// store.subscribe(() => {
//   console.log('第一个订阅', store.getState())
// })
// store.subscribe(() => {
//   console.log('state改变啦', store.getState())
//   store.subscribe(() => {
//     console.log('在订阅一次啦啦啦')
//   })
// })

// setTimeout(() => {
//   store.dispatch({
//     type: 2
//   })
// }, 2000)



// store.dispatch({
//   type: 1
// })

store.subscribe(() => {
  console.log('-------------State-------', store.getState());
})


/**
 * store的方法
 * 1.dispatch
 * 2.getState
 * 3.subscribe
 * 4.replaceReducer
 * 5.Symbol
 */
/**
 *
 * @param {} reducer
 * @param {*} preloadedState
 * 不理解定义两个listener用途？？？？？？？？？？？？？
 */

// export default function createStore(reducer, preloadedState) {
//   let currentState = preloadedState;
//   let currentReducer = reducer;
//   let currentListener = [];
//   let nextListener = currentListener;
//   let isDispatching = false;
//   function ensureCanMutateNextListeners() {
//     if (nextListener === currentListener) {
//       nextListener = currentListener.slice();
//     }
//   }
//   function dispatch(action) {
//     if (isDispatching) {
//       throw error('状态错误了啊爱记空间');
//     }
//     try {
//       isDispatching = true;
//       currentState = currentReducer(currentState, action);
//     } finally {
//       isDispatching = false;
//     }
//     const listeners = (currentListener = nextListener);
//     console.log(listeners)
//     for (let i = 0; i < listeners.length; i++) {
//       listeners[i]();
//     }
//   }
//   function getState() {
//     if (isDispatching) {
//       throw error('dispatch不能获取state');

//     }
//     return currentState;
//   }
//   function subscribe(listener) {
//     let isSubscribed = true;
//     ensureCanMutateNextListeners();
//     nextListener.push(listener);
//     console.log(nextListener)
//     return function unsubscribed() {
//       isSubscribed = false;
//       ensureCanMutateNextListeners();
//       const index = nextListener.indexOf(listener);
//       nextListener.splice(index, 1);
//       currentListener = null;
//     }
//   }
//   function replaceReducer(nextReducer) {
//     currentReducer = nextReducer;
//   }

//   return {
//     getState,
//     dispatch,
//     subscribe,
//     replaceReducer
//   }
// }


// const reducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'AAA-BBB':
//       return '是AAA了啊';
//     case 'CCC-BBB':
//       return '是CCC了啊';
//     case 'DDD-BBB':
//       return '是DDD了啊';
//     default:
//       return 0;
//   }
// }
// const store = createStore(reducer);
// store.subscribe(() => {
//   console.log('state改变啦', store.getState());
// })
// const unsubscribe = store.subscribe(() => {
//   console.log('再来一个监听函数');
//   store.subscribe(() => {
//     console.log('继续订阅啦啦啦拉拉拉拉')
//   })
// })
// // unsubscribe();
// store.dispatch({
//   type: 'AAA-BBB'
// })
// store.dispatch({
//   type: 'CCC-BBB'
// })

// setTimeout(() => {
//   store.dispatch({
//     type: 'DDD-BBB'
//   })
// }, 2000);
