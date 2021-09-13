using System;

namespace WebApi.Authentication
{
    public class TokenCreator
    {
        private const string AllChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_=-";

        public string GetNewToken(int length)
        {
            var token = string.Empty;
            for (var i = 0; i < length; i++)
            {
                var random = new Random();
                token += AllChars[random.Next(AllChars.Length)];
            }
            return token;
        }
    }
}