export const getEvaluationRpr = (evaluation?: number) =>
  evaluation ? parseFloat(evaluation.toFixed(1)).toString() : "n/a";
