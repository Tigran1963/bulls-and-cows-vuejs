import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import { generateSecretCode, checkAttempt, getRandomInt } from '@/core/functions';

describe('getRandomInt', () => {
   beforeEach(() => {
      vi.spyOn(Math, 'random');
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   test('использует дефолтное значение max = 10', () => {
      Math.random.mockReturnValue(0.5);
      expect(getRandomInt()).toBe(5);
   });

   test('должна возвращать целое число', () => {
      const result = getRandomInt(1, 10);
      expect(Number.isInteger(result)).toBe(true);
   });

   test('должна возвращать значение в диапазоне [min, max] включительно', () => {
      for (let i = 0; i < 1000; i++) {
         const val = getRandomInt(5, 15);
         expect(val).toBeGreaterThanOrEqual(5);
         expect(val).toBeLessThanOrEqual(15);
      }
   });

   test('должна работать с дефолтными параметрами (0, 10)', () => {
      const val = getRandomInt();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(10);
   });

   test('должна корректно работать, если min === max', () => {
      const val = getRandomInt(7, 7);
      expect(val).toBe(7);
   });
});

describe('generateSecretCode', () => {
   test('генерирует код правильной длины', () => {
      expect(generateSecretCode(4).length).toBe(4);
      expect(generateSecretCode(5).length).toBe(5);
   });

   test('все символы в коде должны быть уникальными цифрами', () => {
      const code = generateSecretCode(5);
      const uniqueDigits = new Set(code.split(''));
      expect(uniqueDigits.size).toBe(5);

      expect(/^\d+$/.test(code)).toBe(true); // проверка, что это только цифры
   });
});

describe('checkAttempt', () => {
   test('все быки', () => {
      expect(checkAttempt('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
   });

   test('все коровы', () => {
      expect(checkAttempt('4321', '1234')).toEqual({ bulls: 0, cows: 4 });
   });

   test('смешанный результат', () => {
      expect(checkAttempt('1324', '1234')).toEqual({ bulls: 2, cows: 2 });
   });

   test('полное несовпадение', () => {
      expect(checkAttempt('5678', '1234')).toEqual({ bulls: 0, cows: 0 });
   });

   test('работает корректно, если переданы числа, а не строки', () => {
      expect(checkAttempt(1234, 1234)).toEqual({ bulls: 4, cows: 0 });
   });

   test('работает корректно, если цифра повторяются', () => {
      expect(checkAttempt('1444', '1123')).toEqual({ bulls: 1, cows: 0 });
      expect(checkAttempt('1111', '1234')).toEqual({ bulls: 1, cows: 0 });
      expect(checkAttempt('1211', '1122')).toEqual({ bulls: 1, cows: 2 });
      expect(checkAttempt('2211', '1122')).toEqual({ bulls: 0, cows: 4 });
   });
});
