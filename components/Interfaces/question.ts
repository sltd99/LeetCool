export interface Question {
  _id: string; // mongo default
  question_id: number;
  question_url: string;
  question_title: string;
  question_difficulty: string;
  question_tags: string[];
  question_content: string;
  answers: [
    {
      question_answer: string;
      question_date: Date;
      user: string; //ref to _id in user schame
    }
  ];
  question_is_answered: boolean;
  question_last_submit_date: Date;
}
