export interface DailyQuestion {
  _id: string; //mongo default
  question_id: string; //ref to _id in question schema
  date: Date;
  users: string[]; //ref to _id in user schema
}
