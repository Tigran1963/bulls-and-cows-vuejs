export function checkAttempt(guess, secret) {
   let bulls = 0;
   let cows = 0;

   const guessArr = String(guess).split('');
   const secretArr = String(secret).split('');

   const secretUsed = Array(secretArr.length).fill(false);
   const guessUsed = Array(guessArr.length).fill(false);

   guessArr.forEach((digit, index) => {
      if (digit === secretArr[index]) {
         bulls++;
         secretUsed[index] = true;
         guessUsed[index] = true;
      }
   });

   guessArr.forEach((digit, gIndex) => {
      if (guessUsed[gIndex]) return;

      const sIndex = secretArr.findIndex((sDigit, sIdx) => !secretUsed[sIdx] && sDigit === digit);
      if (sIndex !== -1) {
         cows++;
         secretUsed[sIndex] = true;
      }
   });

   return { bulls, cows };
}

export function getRandomInt(max = 10) {
   return Math.floor(Math.random() * max);
}

export function generateSecretCode(length, repeatable) {
   const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
   let code = '';

   for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(digits.length);
      code += digits[randomIndex];
      if (!repeatable) {
         digits.splice(randomIndex, 1);
      }
   }

   return code;
}
