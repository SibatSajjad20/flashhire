import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Optimizes the resume bullets considering the job description.
 * @param {string} resumeText - The original resume text.
 * @param {string} jobDescription - Target job description constraints.
 * @returns {Promise<string>} The optimized resume text.
 */
export async function optimizeResumeWithAI(resumeText, jobDescription) {
  if (!resumeText || !jobDescription) {
    throw new Error('Both Resume and Job Description are required.');
  }

  const prompt = `
You are a Senior Technical Recruiter and an expert in Applicant Tracking Systems (ATS).
Your task is to rewrite the provided resume to optimize it for the provided Job Description.

Constraints:
1. Maximize the presence of exact keywords found in the Job Description without lying or exaggerating the candidate's core metrics.
2. Ensure bullet points are impactful, quantifiable, and start with strong action verbs.
3. Keep the output professionally formatted as simple Markdown (bullet points, headers if necessary).
4. Do NOT output any conversational filler or introductions. Only output the optimized resume content.

Job Description:
"""
${jobDescription}
"""

Original Resume:
"""
${resumeText}
"""
`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      const is503 = error?.message?.includes('503') || error?.message?.includes('UNAVAILABLE');
      if (is503 && attempt < 3) {
        await new Promise(r => setTimeout(r, 1000 * attempt));
        continue;
      }
      console.error('Error with Gemini API:', error);
      throw new Error(is503 ? 'AI service is busy, please try again in a moment.' : 'AI processing failed.');
    }
  }
}
