using Microsoft.AspNetCore.Mvc.Filters;

namespace API
{
    public class LogActionFilter : IActionFilter
    {
        private readonly ILogger<LogActionFilter> _logger;

        public LogActionFilter(ILogger<LogActionFilter> logger)
        {
            _logger = logger;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation("Executando ação: {ActionName}", context.ActionDescriptor.DisplayName);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogInformation("Ação executada: {ActionName}", context.ActionDescriptor.DisplayName);
        }
    }
}
