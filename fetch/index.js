require('isomorphic-fetch');

const param = {"path":"order/showSupplementaryInfo","filter":{"orderNo":"JR010152734739311323"},"module":"financebill"};

fetch('http://alpha.bkjk-inc.com:8888/query', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cookie': 'bkjk_pin=PASSPORT_TOKEN_amlhY2hlbmcuaHVhbmceb3c726f547aa66a5fdfa9fe503d6e29_1_1527474551153;'
  },
  credentials: 'include', //强制携带cookie
  body: JSON.stringify(param)
})
  .then(response => {
    console.log('###', new Date(response.headers._headers.date))
    return response.json()
  })
  .then((json) => {
    // data就是我们请求的reposnode
    console.log(json)
  });

//async / await
async function fetchRequest(){
  try {
    let promise = await fetch('http://alpha.bkjk-inc.com:8888/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'bkjk_pin=PASSPORT_TOKEN_amlhY2hlbmcuaHVhbmceb3c726f547aa66a5fdfa9fe503d6e29_1_1527474551153;'
      },
      credentials: 'include', //强制携带cookie
      body: JSON.stringify(param)
    });

    let response = promise.json();
  } catch(e) {
    console.log(e)
  }
}
