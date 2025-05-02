namespace API.Models
{
    public class OperationResult<T>
    {
        public bool IsError { get; set; }
        public string? Message { get; set; }
        public T Data { get; set; }

        public OperationResult(bool isError, string message)
        {
            IsError = isError;
            Message = message;
        }

        public OperationResult(bool isError, string message, T data)
        {
            IsError = isError;
            Message = message;
            Data = data;
        }
    }
}
