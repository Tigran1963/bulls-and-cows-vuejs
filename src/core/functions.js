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

export function getRandomInt(min = 0, max = 10) {
   return Math.floor(min + Math.random() * (max + 1 - min));
}

function getCharPosition(char) {
   const code = char.toUpperCase().charCodeAt(0);
   if (code >= 48 && code <= 57) return code - 48; // '0'-'9'
   if (code >= 65 && code <= 70) return code - 55; // 'A'-'F'
   return -1;
}

export function expandRange(range) {
   const defaultDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
   const allDigits = [...defaultDigits, 'A', 'B', 'C', 'D', 'E', 'F'];

   if (!range || typeof range !== 'string') return defaultDigits;

   const parts = range.split('-');
   if (parts.length !== 2) return defaultDigits;

   const startPos = getCharPosition(parts[0]);
   const endPos = getCharPosition(parts[1]);

   if (startPos === -1 || endPos === -1) return defaultDigits;

   return allDigits.slice(startPos, endPos + 1);
}

export function generateSecretCode(length, range, repeatable = true) {
   const availableDigits = expandRange(range);
   let code = '';

   for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(0, availableDigits.length - 1);
      code += availableDigits[randomIndex];
      if (!repeatable) {
         availableDigits.splice(randomIndex, 1);
      }
   }
   
   return code;
}
