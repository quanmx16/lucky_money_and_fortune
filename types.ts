export interface PredictionResult {
  title: string;          // e.g., "CEO of Sleeping Late"
  description: string;    // Funny professional description/prediction
  luckyMoney: string;     // The amount
  advice: string;         // Professional advice (funny)
  strength: string;       // e.g., "Ability to eat 5 bowls of rice"
}

export enum AppState {
  INTRO = 'INTRO',
  CAMERA = 'CAMERA',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}