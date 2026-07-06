import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import { generateSecretCode, checkAttempt, getRandomInt } from "@/core/functions";

describe('getRandomInt', () => {
   beforeEach(() => {
      vi.spyOn(Math, 'random');
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   test('должен возвращать 0, если Math.random() равен 0', () => {
      Math.random.mockReturnValue(0);
      expect(getRandomInt(10)).toBe(0);
   });

   test('должен возвращать max 1 при максимальном значении Math.random()', () => {
      Math.random.mockReturnValue(0.999999);
      expect(getRandomInt(10)).toBe(9);
   });

   test('использует дефолтное значение max = 10', () => {
      Math.random.mockReturnValue(0.5);
      expect(getRandomInt()).toBe(5);
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
});