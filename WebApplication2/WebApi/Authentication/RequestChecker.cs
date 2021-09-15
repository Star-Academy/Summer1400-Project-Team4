


namespace WebApi.Authentication
{
    public class RequestChecker
    {
        public bool IsLogoutValid(string token)
        {
            return !string.IsNullOrEmpty(token);
        }
        
        public bool IsGetValid(string token)
        {
            return !string.IsNullOrEmpty(token);
        }
    }
}