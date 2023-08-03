export const gradeToString = new Map([
    [1, "prvi"],
    [2, "drugi"],
    [3, "treći"],
    [4, "četvrti"],
    [5, "peti"],
    [6, "šesti"],
    [7, "sedmi"],
    [8, "osmi"],
  ]);

export const sufix = (n) => {
    let lastDigit = n.toString().slice(-1);
    return lastDigit === '1' ? '/ca' : 'a/ce'; 
}