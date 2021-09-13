using System;

namespace WebApi.Authentication
{
    public class TokenCreator
    {
        private string _allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_=-";
        public string GetNewToken(int length)
        {
            string token = string.Empty;
            for (int i = 0; i < length; i++)
            {
                Random random = new Random();
                token += _allChars[random.Next(_allChars.Length)];
            }
            return token;
        }
    }
}