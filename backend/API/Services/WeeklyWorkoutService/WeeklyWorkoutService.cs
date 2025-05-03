using API.DTOs.WeeklyWorkout;
using API.Models;
using API.Repositories.WeeklyWorkoutRepository;
using API.Services.WeeklyWorkoutService;
using AutoMapper;

namespace api.Services.WeeklyWorkoutService
{
    public class WeeklyWorkoutService : IWeeklyWorkoutService
    {
        private readonly IWeeklyWorkoutRepository _weeklyWorkoutRepository;
        private readonly IMapper _mapper;

        public WeeklyWorkoutService(IWeeklyWorkoutRepository weeklyWorkoutRepository, IMapper mapper)
        {
            _weeklyWorkoutRepository = weeklyWorkoutRepository;
            _mapper = mapper;
        }

        public OperationResult<IList<WeeklyWorkoutRow>> Get(long userId)
        {
            var weeklyWorkouts = _weeklyWorkoutRepository.Get(userId);
            var weeklyWorkoutRows = _mapper.Map<IList<WeeklyWorkoutRow>>(weeklyWorkouts);
            if (weeklyWorkoutRows is null)
            {
                return new OperationResult<IList<WeeklyWorkoutRow>>(true, "Lista não encontrada");
            }

            return new OperationResult<IList<WeeklyWorkoutRow>>(false, "Lista encontrada com sucesso", weeklyWorkoutRows);
        }

        public OperationResult<string> Post(IList<WeeklyWorkoutRow> WeeklyWorkoutRows)
        {
            var weeklyWorkouts = _mapper.Map<IList<WeeklyWorkout>>(WeeklyWorkoutRows);
            if (weeklyWorkouts is null)
            {
                return new OperationResult<string>(true, "Lista não encontrada");
            }
            _weeklyWorkoutRepository.Update(weeklyWorkouts);
            return new OperationResult<string>(false, "Lista criada com sucesso");
        }
    }
}
