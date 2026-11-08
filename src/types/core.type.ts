export type Base = 2 | 8 | 10 | 16;

export type Score = {
  cows: number;
  bulls: number;
};

export type Settings = {
  length: number;
  base: Base;
};

export type Attempt = {
  guess: string;
  score: Score;
};

export type GameState = {
  settings: Settings;
  secret: string;
  history: readonly Attempt[];
  status: 'playing' | 'won';
  startedAt: number;
  finishedAt: number | null;
};

export type GameRecord = {
  attempts: number;
  time: number;
  settings: Settings;
};
