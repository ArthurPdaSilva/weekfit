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

        public OperationResult<long> Post(WeeklyWorkoutRow WeeklyWorkoutRow)
        {
            var weeklyWorkout = _mapper.Map<WeeklyWorkout>(WeeklyWorkoutRow);
            if (weeklyWorkout is null)
            {
                return new OperationResult<long>(true, "Falha ao converter linha");
            }
            var rowId = _weeklyWorkoutRepository.Create(weeklyWorkout);
            return new OperationResult<long>(false, "Linha adicionada com sucesso", rowId);
        }

        public OperationResult<string> Put(WeeklyWorkoutRow weeklyWorkoutRow)
        {
            var weeklyWorkout = _mapper.Map<WeeklyWorkout>(weeklyWorkoutRow);
            if (weeklyWorkout is null)
            {
                return new OperationResult<string>(true, "Falha ao converter linha");
            }
            _weeklyWorkoutRepository.Update(weeklyWorkout);
            return new OperationResult<string>(false, "Linha atualizada com sucesso");
        }

        public OperationResult<string> Delete(long userId)
        {
            var weeklyWorkout = _weeklyWorkoutRepository.Get(userId);
            if (weeklyWorkout is null)
            {
                return new OperationResult<string>(true, "Linha não encontrada");
            }
            _weeklyWorkoutRepository.Delete(userId);
            return new OperationResult<string>(false, "Linha deletada com sucesso");
        }

    }
}
