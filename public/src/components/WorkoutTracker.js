import React, { useState, useEffect } from 'react';
import { Plus, Calendar, TrendingUp, Clock, Target, Save, X, Check, Play, MapPin } from 'lucide-react';

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');
  const [trainingWeek, setTrainingWeek] = useState(1);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const halfMarathonProgram = {
    1: {
      Monday: { 
        type: 'strength', 
        name: 'Lower Body Strength', 
        exercises: [
          { name: 'Barbell Back Squats', sets: 3, reps: '8-10', weight: '' },
          { name: 'Barbell Romanian Deadlifts', sets: 3, reps: '8-10', weight: '' },
          { name: 'DB Walking Lunges', sets: 2, reps: '12 each leg', weight: '' },
          { name: 'DB Calf Raises', sets: 3, reps: '15', weight: '' }
        ]
      },
      Tuesday: { type: 'run', name: 'Easy Run', distance: '3 miles', pace: 'conversational', notes: 'Focus on comfortable pace' },
      Wednesday: { 
        type: 'strength', 
        name: 'Upper Body & Core', 
        exercises: [
          { name: 'DB Bench Press', sets: 3, reps: '8-12', weight: '' },
          { name: 'DB Bent Over Rows', sets: 3, reps: '8-10', weight: '' },
          { name: 'DB Shoulder Press', sets: 3, reps: '6-8', weight: '' },
          { name: 'Band Pull-Aparts', sets: 3, reps: '15', weight: 'light band' },
          { name: 'Plank (on mat)', sets: 3, reps: '30-45 sec', weight: 'bodyweight' }
        ]
      },
      Thursday: { type: 'run', name: 'Tempo Run', distance: '3 miles', pace: 'comfortably hard', notes: 'Include 15 min at tempo pace' },
      Friday: { type: 'rest', name: 'Rest Day' },
      Saturday: { type: 'run', name: 'Long Run', distance: '4 miles', pace: 'easy', notes: 'Build aerobic base' },
      Sunday: { type: 'cross', name: 'Yoga & Mobility', activity: 'Yoga flow on mat + band stretches', duration: '30 min' }
    },
    2: {
      Monday: { 
        type: 'strength', 
        name: 'Lower Body Strength', 
        exercises: [
          { name: 'Barbell Back Squats', sets: 3, reps: '8-10', weight: '' },
          { name: 'Barbell Romanian Deadlifts', sets: 3, reps: '8-10', weight: '' },
          { name: 'DB Bulgarian Split Squats', sets: 2, reps: '10 each leg', weight: '' },
          { name: 'Single Leg DB Calf Raises', sets: 3, reps: '12 each leg', weight: '' }
        ]
      },
      Tuesday: { type: 'run', name: 'Easy Run', distance: '3.5 miles', pace: 'conversational', notes: 'Slight increase in distance' },
      Wednesday: { 
        type: 'strength', 
        name: 'Upper Body & Core', 
        exercises: [
          { name: 'DB Bench Press', sets: 3, reps: '10-12', weight: '' },
          { name: 'DB Bent Over Rows', sets: 3, reps: '8-10', weight: '' },
          { name: 'DB Shoulder Press', sets: 3, reps: '6-8', weight: '' },
          { name: 'Band Rows', sets: 3, reps: '12-15', weight: 'medium band' },
          { name: 'Dead Bug (on mat)', sets: 3, reps: '10 each side', weight: 'bodyweight' }
        ]
      },
      Thursday: { type: 'run', name: 'Tempo Run', distance: '3.5 miles', pace: 'comfortably hard', notes: '18 min at tempo pace' },
      Friday: { type: 'rest', name: 'Rest Day' },
      Saturday: { type: 'run', name: 'Long Run', distance: '5 miles', pace: 'easy', notes: 'Increase weekly mileage' },
      Sunday: { type: 'cross', name: 'Yoga & Mobility', activity: 'Yoga flow + band stretches', duration: '35 min' }
    },
    3: {
      Monday: { 
        type: 'strength', 
        name: 'Lower Body Power', 
        exercises: [
          { name: 'Barbell Back Squats', sets: 4, reps: '6-8', weight: '' },
          { name: 'Barbell Deadlifts', sets: 3, reps: '6-8', weight: '' },
          { name: 'DB Step-ups (on bench)', sets: 3, reps: '10 each leg', weight: '' },
          { name: 'DB Jump Squats', sets: 3, reps: '8', weight: 'light DBs' }
        ]
      },
      Tuesday: { type: 'run', name: 'Interval Run', distance: '4 miles', pace: 'mixed', notes: '6x400m at 5K pace with recovery' },
      Wednesday: { 
        type: 'strength', 
        name: 'Upper Body Power', 
        exercises: [
          { name: 'DB Incline Press (on bench)', sets: 3, reps: '8-10', weight: '' },
          { name: 'DB Single Arm Row', sets: 3, reps: '8 each arm', weight: '' },
          { name: 'DB Push Press', sets: 3, reps: '6-8', weight: '' },
          { name: 'Band Face Pulls', sets: 3, reps: '15', weight: 'medium band' },
          { name: 'Side Plank (on mat)', sets: 3, reps: '30 sec each side', weight: 'bodyweight' }
        ]
      },
      Thursday: { type: 'run', name: 'Recovery Run', distance: '2.5 miles', pace: 'very easy', notes: 'Active recovery pace' },
      Friday: { type: 'rest', name: 'Rest Day' },
      Saturday: { type: 'run', name: 'Long Run', distance: '6 miles', pace: 'easy', notes: 'Build endurance steadily' },
      Sunday: { type: 'cross', name: 'Active Recovery', activity: 'Gentle yoga flow + band mobility', duration: '40 min' }
    }
  };

  useEffect(() => {
    generateHalfMarathonSchedule();
  }, [trainingWeek]);

  const generateHalfMarathonSchedule = () => {
    if (!halfMarathonProgram[trainingWeek]) return;

    const weekProgram = halfMarathonProgram[trainingWeek];
    const newSchedule = {};

    Object.keys(weekProgram).forEach(day => {
      const dayProgram = weekProgram[day];
      
      if (dayProgram.type === 'strength') {
        newSchedule[day] = {
          name: dayProgram.name,
          type: 'strength',
          exercises: dayProgram.exercises.map(ex => ({
            id: Date.now() + Math.random(),
            name: ex.name,
            plannedSets: ex.sets,
            plannedReps: ex.reps,
            plannedWeight: ex.weight
          }))
        };
      } else if (dayProgram.type === 'run') {
        newSchedule[day] = {
          name: dayProgram.name,
          type: 'run',
          distance: dayProgram.distance,
          pace: dayProgram.pace,
          notes: dayProgram.notes,
          exercises: [{
            id: Date.now() + Math.random(),
            name: `Running - ${dayProgram.distance}`,
            plannedSets: 1,
            plannedReps: dayProgram.distance,
            plannedWeight: dayProgram.pace
          }]
        };
      } else if (dayProgram.type === 'cross') {
        newSchedule[day] = {
          name: dayProgram.name,
          type: 'cross',
          activity: dayProgram.activity,
          duration: dayProgram.duration,
          exercises: [{
            id: Date.now() + Math.random(),
            name: dayProgram.activity,
            plannedSets: 1,
            plannedReps: dayProgram.duration,
            plannedWeight: 'light intensity'
          }]
        };
      } else {
        newSchedule[day] = {
          name: dayProgram.name,
          type: 'rest',
          exercises: []
        };
      }
    });

    setWeeklySchedule(newSchedule);
  };

  const updateScheduledExercise = (day, exerciseId, field, value) => {
    const currentDayWorkout = weeklySchedule[day];
    if (!currentDayWorkout) return;

    const updatedExercises = currentDayWorkout.exercises.map(exercise =>
      exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
    );

    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...currentDayWorkout,
        exercises: updatedExercises
      }
    }));
  };

  const startScheduledWorkout = (day) => {
    const scheduledWorkout = weeklySchedule[day];
    if (!scheduledWorkout || scheduledWorkout.exercises.length === 0) return;

    const workoutExercises = scheduledWorkout.exercises.map(exercise => ({
      id: exercise.id,
      name: exercise.name,
      plannedSets: exercise.plannedSets,
      plannedReps: exercise.plannedReps,
      plannedWeight: exercise.plannedWeight,
      sets: Array(exercise.plannedSets).fill(null).map((_, index) => ({
        id: Date.now() + index + Math.random(),
        reps: '',
        weight: exercise.plannedWeight === 'bodyweight' ? 'BW' : '',
        completed: false
      }))
    }));

    setCurrentWorkout({
      id: Date.now(),
      day: day,
      exercises: workoutExercises,
      isScheduled: true,
      workoutType: scheduledWorkout.type
    });
    setActiveTab('log');
  };

  const updateSet = (exerciseId, setId, field, value) => {
    if (!currentWorkout) return;
    
    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map(exercise =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map(set =>
                set.id === setId ? { ...set, [field]: value } : set
              )
            }
          : exercise
      )
    });
  };

  const toggleSetComplete = (exerciseId, setId) => {
    if (!currentWorkout) return;
    
    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map(exercise =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map(set =>
                set.id === setId ? { ...set, completed: !set.completed } : set
              )
            }
          : exercise
      )
    });
  };

  const saveWorkout = () => {
    if (!currentWorkout || currentWorkout.exercises.length === 0) return;
    
    const workoutToSave = {
      ...currentWorkout,
      exercises: currentWorkout.exercises.filter(ex => ex.sets.length > 0)
    };
    
    setWorkouts([...workouts, workoutToSave]);
    setCurrentWorkout(null);
  };

  const cancelWorkout = () => {
    setCurrentWorkout(null);
  };

  const changeWeek = (direction) => {
    if (direction > 0 && trainingWeek < 3) {
      setTrainingWeek(prev => prev + 1);
    } else if (direction < 0 && trainingWeek > 1) {
      setTrainingWeek(prev => prev - 1);
    }
  };

  const getWorkoutTypeIcon = (type) => {
    switch(type) {
      case 'run': return '🏃‍♂️';
      case 'strength': return '💪';
      case 'cross': return '🧘';
      case 'rest': return '😴';
      default: return '🏋️‍♂️';
    }
  };

  const renderScheduleTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Half Marathon Training</h2>
            <p className="text-white/80 text-lg">Week {trainingWeek} of 12</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => changeWeek(-1)}
              disabled={trainingWeek <= 1}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg disabled:opacity-50"
            >
              ← Previous
            </button>
            <span className="text-xl font-medium text-white drop-shadow">
              Training Week {trainingWeek}
            </span>
            <button
              onClick={() => changeWeek(1)}
              disabled={trainingWeek >= 3}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {daysOfWeek.map((day) => {
            const dayWorkout = weeklySchedule[day] || { exercises: [] };

            return (
              <div key={day} className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-white/30 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/95">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold flex items-center text-gray-800">
                      {getWorkoutTypeIcon(dayWorkout.type)} {day}
                    </h3>
                    {dayWorkout.name && <p className="text-lg font-semibold text-gray-700 mt-1">{dayWorkout.name}</p>}
                  </div>
                  <div className="flex space-x-2">
                    {dayWorkout.exercises.length > 0 && dayWorkout.type !== 'rest' && (
                      <button
                        onClick={() => startScheduledWorkout(day)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </button>
                    )}
                  </div>
                </div>

                {dayWorkout.type === 'rest' ? (
                  <div className="text-center py-6">
                    <p className="text-gray-600 text-lg">Rest and recovery day</p>
                    <p className="text-gray-500 text-sm mt-2">Focus on sleep, hydration, and gentle stretching</p>
                  </div>
                ) : dayWorkout.type === 'run' ? (
                  <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-blue-800 text-lg flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        {dayWorkout.distance}
                      </h4>
                      <span className="text-blue-600 font-medium">Pace: {dayWorkout.pace}</span>
                    </div>
                    {dayWorkout.notes && <p className="text-blue-700 text-sm">{dayWorkout.notes}</p>}
                  </div>
                ) : dayWorkout.type === 'cross' ? (
                  <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 shadow-md">
                    <h4 className="font-bold text-purple-800 text-lg">{dayWorkout.activity}</h4>
                    <p className="text-purple-600">Duration: {dayWorkout.duration}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dayWorkout.exercises.map(exercise => (
                      <div key={exercise.id} className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-md">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-gray-800 text-lg">{exercise.name}</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <label className="block text-xs text-gray-700 font-semibold mb-2">Sets</label>
                            <input
                              type="number"
                              value={exercise.plannedSets}
                              onChange={(e) => updateScheduledExercise(day, exercise.id, 'plannedSets', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border-2 border-purple-200 rounded-xl text-center focus:border-purple-400 focus:ring-4 focus:ring-purple-200 transition-all duration-300"
                              min="1"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 font-semibold mb-2">Reps</label>
                            <input
                              type="text"
                              value={exercise.plannedReps}
                              onChange={(e) => updateScheduledExercise(day, exercise.id, 'plannedReps', e.target.value)}
                              className="w-full px-3 py-2 border-2 border-purple-200 rounded-xl text-center focus:border-purple-400 focus:ring-4 focus:ring-purple-200 transition-all duration-300"
                              placeholder="8-12"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 font-semibold mb-2">Weight</label>
                            <input
                              type="text"
                              value={exercise.plannedWeight}
                              onChange={(e) => updateScheduledExercise(day, exercise.id, 'plannedWeight', e.target.value)}
                              className="w-full px-3 py-2 border-2 border-purple-200 rounded-xl text-center focus:border-purple-400 focus:ring-4 focus:ring-purple-200 transition-all duration-300"
                              placeholder="Weight or BW"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLogTab = () => (
    <div className="space-y-6">
      {!currentWorkout ? (
        <div className="text-center py-16">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="text-8xl mb-6">🏃‍♂️</div>
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Ready to train?</h3>
            <p className="text-white/90 text-xl mb-8 drop-shadow">Start your scheduled workout from the training plan!</p>
            <p className="text-white/70 text-lg">Go to Training Plan tab to begin today's workout</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                {currentWorkout.day} - Week {trainingWeek}
              </h2>
              {currentWorkout.workoutType && (
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-lg text-white/90 text-sm">
                  {getWorkoutTypeIcon(currentWorkout.workoutType)} {currentWorkout.workoutType.charAt(0).toUpperCase() + currentWorkout.workoutType.slice(1)}
                </span>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={saveWorkout}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
              >
                <Save className="w-5 h-5 mr-2" />
                Complete Workout
              </button>
              <button
                onClick={cancelWorkout}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </button>
            </div>
          </div>

          {currentWorkout.exercises.map(exercise => (
            <div key={exercise.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-white drop-shadow-lg">{exercise.name}</h4>
                  <p className="text-white/80 text-lg drop-shadow mt-2">
                    Target: {exercise.plannedSets} sets × {exercise.plannedReps} reps
                    {exercise.plannedWeight && exercise.plannedWeight !== 'bodyweight' && ` @ ${exercise.plannedWeight}`}
                  </p>
                </div>
              </div>
              
              {exercise.sets.length > 0 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-3 text-sm font-bold text-white/90 pb-3 border-b border-white/20">
                    <div>Set</div>
                    <div>Weight</div>
                    <div>Reps/Distance/Time</div>
                    <div>Done</div>
                  </div>
                  {exercise.sets.map((set, index) => (
                    <div key={set.id} className={`grid grid-cols-4 gap-3 items-center p-3 rounded-xl transition-all duration-300 ${set.completed ? 'bg-gradient-to-r from-green-400/30 to-emerald-400/30 backdrop-blur-sm border border-green-400/40 shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}>
                      <div className="text-white font-bold text-lg">{index + 1}</div>
                      <input
                        type="text"
                        placeholder={exercise.plannedWeight === 'bodyweight' ? "BW" : (exercise.plannedWeight || "Weight")}
                        value={set.weight}
                        onChange={(e) => updateSet(exercise.id, set.id, 'weight', e.target.value)}
                        className="px-3 py-3 border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-xl focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300 text-center font-bold"
                      />
                      <input
                        type="text"
                        placeholder={exercise.plannedReps || "Reps"}
                        value={set.reps}
                        onChange={(e) => updateSet(exercise.id, set.id, 'reps', e.target.value)}
                        className="px-3 py-3 border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-xl focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300 text-center font-bold"
                      />
                      <button
                        onClick={() => toggleSetComplete(exercise.id, set.id)}
                        className={`p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
                          set.completed 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-400/50' 
                            : 'bg-white/20 text-white/70 hover:bg-white/30 border border-white/30'
                        }`}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">Training History</h2>
        <div className="flex items-center space-x-6 text-lg text-white/90 drop-shadow">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
            <Calendar className="w-5 h-5 mr-2" />
            {workouts.length} sessions completed
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
            <Target className="w-5 h-5 mr-2" />
            Week {trainingWeek} of 12
          </div>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="text-8xl mb-6">📊</div>
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">No training sessions yet</h3>
            <p className="text-white/90 text-xl drop-shadow">Complete your first workout to start tracking progress!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {workouts.slice(-10).reverse().map(workout => (
            <div key={workout.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg flex items-center">
                    {workout.workoutType && getWorkoutTypeIcon(workout.workoutType)}
                    <span className="ml-2">{workout.day} Workout</span>
                  </h3>
                  <p className="text-white/80 text-lg drop-shadow">{workout.exercises.length} exercises completed</p>
                  {workout.workoutType && (
                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-lg text-white/80 text-sm">
                      {workout.workoutType.charAt(0).toUpperCase() + workout.workoutType.slice(1)} Training
                    </span>
                  )}
                </div>
                <div className="text-right text-white/80 drop-shadow">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                    <Clock className="w-5 h-5 mr-2" />
                    {workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)} sets total
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {workout.exercises.map(exercise => (
                  <div key={exercise.id} className="border-l-4 border-pink-400 pl-6 bg-white/5 backdrop-blur-sm rounded-r-xl p-4">
                    <h4 className="font-bold text-white text-xl drop-shadow">{exercise.name}</h4>
                    <div className="text-white/90 text-lg drop-shadow mt-2">
                      {exercise.sets.map((set, index) => (
                        <span key={set.id} className="inline-block mr-4 mb-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20">
                          {set.weight && set.weight !== 'BW' ? `${set.weight}lbs` : (set.weight === 'BW' ? 'BW' : 'BW')} × {set.reps}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOverviewTab = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-4">Half Marathon Training Program</h2>
        <p className="text-white/90 text-xl drop-shadow">12-week progressive training plan combining running and strength work</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-6">Your Home Gym Equipment</h3>
          <div className="space-y-4 text-white/90">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🏋️</span>
              <div>
                <p className="font-semibold">Barbell & Plates</p>
                <p className="text-sm text-white/70">Heavy compound lifts, progressive overload</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">💪</span>
              <div>
                <p className="font-semibold">Dumbbells</p>
                <p className="text-sm text-white/70">Unilateral training, isolation work</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🪑</span>
              <div>
                <p className="font-semibold">Bench</p>
                <p className="text-sm text-white/70">Chest work, step-ups, incline movements</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🔗</span>
              <div>
                <p className="font-semibold">Resistance Bands</p>
                <p className="text-sm text-white/70">Activation, mobility, light resistance</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🧘</span>
              <div>
                <p className="font-semibold">Yoga Mat</p>
                <p className="text-sm text-white/70">Core work, stretching, floor exercises</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-6">Training Overview</h3>
          <div className="space-y-4 text-white/90">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <p className="font-semibold">Goal: Half Marathon (13.1 miles)</p>
                <p className="text-sm text-white/70">Progressive 12-week training plan</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🏃‍♂️</span>
              <div>
                <p className="font-semibold">Running: 3-4 days per week</p>
                <p className="text-sm text-white/70">Easy runs, tempo work, and long runs</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">💪</span>
              <div>
                <p className="font-semibold">Strength: 2 days per week</p>
                <p className="text-sm text-white/70">Barbell/dumbbell compound movements</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🧘</span>
              <div>
                <p className="font-semibold">Mobility: 1-2 days per week</p>
                <p className="text-sm text-white/70">Yoga flows and band stretches</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-6">Progress Tracking</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Training Week</span>
              <span className="text-white text-xl font-bold">{trainingWeek} / 12</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(trainingWeek / 12) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Sessions Completed</span>
              <span className="text-white text-xl font-bold">{workouts.length}</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Current Phase</span>
              <span className="text-white text-sm font-medium">
                {trainingWeek <= 4 ? 'Base Building' : 
                 trainingWeek <= 8 ? 'Speed & Power' : 
                 trainingWeek <= 10 ? 'Peak Training' : 'Taper & Race'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-6">Training Tips for Your Equipment</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Strength Training Guidelines</h4>
            <ul className="space-y-2 text-white/90 text-sm">
              <li>• Start with lighter weights and focus on proper form</li>
              <li>• Use the bench for incline work and step-ups</li>
              <li>• Barbell exercises: squats, deadlifts, rows, presses</li>
              <li>• Dumbbells: unilateral work and accessory movements</li>
              <li>• Bands: warm-up activation and light resistance</li>
              <li>• Progress weight gradually as you get stronger</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Running Guidelines</h4>
            <ul className="space-y-2 text-white/90 text-sm">
              <li>• Easy pace: You should be able to hold a conversation</li>
              <li>• Tempo pace: Comfortably hard, sustainable effort</li>
              <li>• Long runs: Build weekly mileage gradually</li>
              <li>• Listen to your body and take rest days seriously</li>
              <li>• Strength training will improve running efficiency</li>
              <li>• Use yoga mat for post-run stretching</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4">
            Half Marathon Trainer
          </h1>
          <p className="text-2xl text-white/90 drop-shadow-lg">
            12-Week Progressive Training Program
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-xl">
            {[
              { id: 'overview', label: 'Overview', icon: Target },
              { id: 'schedule', label: 'Training Plan', icon: Calendar },
              { id: 'log', label: 'Log Workout', icon: Plus },
              { id: 'history', label: 'History', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-5 h-5 inline-block mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'schedule' && renderScheduleTab()}
          {activeTab === 'log' && renderLogTab()}
          {activeTab === 'history' && renderHistoryTab()}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;
