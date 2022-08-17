export const rotate90Degree2DArray = (arr: [any][any]) => {
  const newArr = [];

  for (let i = 0; i < arr[0].length; i++) {
    const newRow = [];

    for (let j = arr.length - 1; j >= 0; j--) {
      newRow.push(arr[j][i]);
    }
    newArr.push(newRow.reverse());
  }

  return newArr;
};

export function calculateHHmmToMinute(time: string) {
  const [hours, minutes] = time.split(':');
  return +minutes + +hours * 60;
}
