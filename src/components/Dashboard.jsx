import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart, BookOpen, Calendar, Trophy, Star, Clock, PlayCircle, HelpCircle, TrendingUp, User, Bell, Search, Menu, Video, FileQuestion, BarChart2 } from 'lucide-react';

const Navbar = () => (
  <nav className="bg-white shadow-sm mb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-indigo-600 mr-2" />
          <span className="text-2xl font-bold text-indigo-600">EduPro</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon"><Search className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
        </div>
      </div>
    </div>
  </nav>
);

const StatCard = ({ title, value, icon, color }) => (
  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
    <CardContent className="flex items-center p-6">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const StudentDashboard = () => {
  const [streakCount, setStreakCount] = useState(5);
  const [leaderboardType, setLeaderboardType] = useState('weekly');
  const [timer, setTimer] = useState(1500); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(1500);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const leaderboardData = {
    weekly: [
      { name: 'Alex', score: 2150, change: 2 },
      { name: 'Emma', score: 2100, change: 0 },
      { name: 'Noah', score: 2050, change: 1 },
      { name: 'Olivia', score: 2000, change: -1 },
      { name: 'Liam', score: 1950, change: -2 },
    ],
    daily: [
      { name: 'Emma', score: 320, change: 2 },
      { name: 'Alex', score: 310, change: -1 },
      { name: 'Liam', score: 300, change: 1 },
      { name: 'Olivia', score: 290, change: 0 },
      { name: 'Noah', score: 280, change: -2 },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-10 px-8">
          {/* Welcome Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Welcome back, Alex!</h1>
            <p className="mt-2 text-xl text-gray-600">Here's what's happening with your learning journey today.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Courses in Progress" value="4" icon={<BookOpen className="h-6 w-6" />} color="bg-blue-500" />
            <StatCard title="Completed Courses" value="12" icon={<Trophy className="h-6 w-6" />} color="bg-green-500" />
            <StatCard title="Hours Studied" value="128" icon={<BarChart2 className="h-6 w-6" />} color="bg-yellow-500" />
            <StatCard title="Certificates Earned" value="3" icon={<FileQuestion className="h-6 w-6" />} color="bg-purple-500" />
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main learning progress */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2 pt-8 px-8">
                  <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center">
                    <BookOpen className="h-7 w-7 text-indigo-500 mr-3" />
                    Current Course Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 px-8 pb-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-900">Advanced Mathematics</h3>
                    <p className="text-lg text-gray-500 mt-1">Chapter 3: Calculus</p>
                  </div>
                  <Progress value={33} className="h-3 bg-indigo-100" indicatorClassName="bg-indigo-600" />
                  <div className="mt-4 flex justify-between text-lg text-gray-600">
                    <span>33% Complete</span>
                    <span>Estimated completion: 2 weeks</span>
                  </div>
                  <button className="mt-8 w-full bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 flex items-center justify-center">
                    <PlayCircle className="h-6 w-6 mr-3" />
                    Continue Learning
                  </button>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2 pt-8 px-8">
                  <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center">
                    <BarChart className="h-7 w-7 text-indigo-500 mr-3" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 px-8 pb-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {[
                      { label: "Quiz Accuracy", value: 85, color: "bg-green-500" },
                      { label: "Homework Completion", value: 92, color: "bg-blue-500" },
                      { label: "Participation", value: 78, color: "bg-yellow-500" },
                      { label: "Overall Progress", value: 88, color: "bg-indigo-500" },
                    ].map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-lg text-gray-600 mb-2">
                          <span>{stat.label}</span>
                          <span className="font-medium text-gray-900">{stat.value}%</span>
                        </div>
                        <Progress value={stat.value} className="h-3" indicatorClassName={stat.color} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Study Timer */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2 pt-8 px-8">
                  <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center">
                    <Clock className="h-7 w-7 text-indigo-500 mr-3" />
                    Study Timer
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 px-8 pb-8">
                  <div className="text-center mb-6">
                    <span className="text-5xl font-bold text-gray-900">{formatTime(timer)}</span>
                  </div>
                  <div className="flex justify-center space-x-4">
                    {!isTimerRunning ? (
                      <Button onClick={startTimer} className="bg-indigo-600 text-white">Start</Button>
                    ) : (
                      <Button onClick={pauseTimer} className="bg-yellow-500 text-white">Pause</Button>
                    )}
                    <Button onClick={resetTimer} variant="outline">Reset</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-2 pt-8 px-8">
                  <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center">
                    <Trophy className="h-7 w-7 text-indigo-500 mr-3" />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 px-8 pb-8">
                  <div className="flex justify-between mb-6">
                    <Button 
                      className={`px-4 py-2 rounded-lg text-base font-medium ${leaderboardType === 'weekly' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'} transition-colors duration-300`}
                      onClick={() => setLeaderboardType('weekly')}
                    >
                      Weekly
                    </Button>
                    <Button 
                      className={`px-4 py-2 rounded-lg text-base font-medium ${leaderboardType === 'daily' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'} transition-colors duration-300`}
                      onClick={() => setLeaderboardType('daily')}
                    >
                      Daily
                    </Button>
                  </div>
                  <ul className="space-y-4">
                    {leaderboardData[leaderboardType].map((user, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-orange-400' : 'bg-gray-200'} text-white font-bold text-lg`}>
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900 text-lg">{user.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-gray-900 text-lg mr-3">{user.score}</span>
                          <span className={`text-base ${user.change > 0 ? 'text-green-500' : user.change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                            {user.change > 0 ? `↑${user.change}` : user.change < 0 ? `↓${Math.abs(user.change)}` : '-'}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;