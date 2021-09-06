using System;

namespace SqlMapper.Checkers.ApproximateNumericCheckers
{
    public static class ApproximateNumericSizeChecker
    {
        public static int Length(this decimal number)
        {
            var digits = 0;

            while (Math.Abs(number) % 1 != 0)
            {
                number *= 10;
            }

            while (Math.Abs(number) > 1)
            {
                number /= 10;
                digits++;
            }

            {
            }

            return digits;
        }
    }
}