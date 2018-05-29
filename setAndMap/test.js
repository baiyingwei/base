//冒泡排序

const arr = [1, 2, 3, 4, 5, 7, 6, 12 ,11];

// for(let i =0; i < arr.length; i++){
//   for(let j = 0; j<i + 1; j++){
//     if (arr[j] > arr[j + 1]){
//       let temp = arr[j];
//       arr[j] = arr[j+1];
//       arr[j+1] = temp;
//     }
//   }
// }
//
// console.log(arr);

for (let i =0; i < arr.length; i++){
  let max = arr[0];
  let index = 0;
  if (arr[i] > max){
    max = arr[i];
    index = i;
  }
}