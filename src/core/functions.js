export function checkAttempt(guess, secret) {
   let bulls = 0;
   let cows = 0;

   const guessArr = String(guess).split('');
   const secretArr = String(secret).split('');

   guessArr.forEach((digit, index) => {
      if (digit === secretArr[index]) {
         bulls++;
      } else if (secretArr.includes(digit)) {
         cows++;
      }
   });

   return { bulls, cows };
}

export function getRandomInt(max = 10) {
   return Math.floor(Math.random() * max);
}

export function generateSecretCode(length) {
   const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
   let code = '';

   for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(digits.length);
      code += digits[randomIndex];
      digits.splice(randomIndex, 1);
   }

   return code;
}
