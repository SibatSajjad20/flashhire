import { NextResponse } from 'next/server';
import { optimizeResumeWithAI } from '@/lib/ai';
import { query } from '@/lib/db';

export async function POST(req) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Missng resumeText or jobDescription' },
        { status: 400 }
      );
    }

    const optimizedText = await optimizeResumeWithAI(resumeText, jobDescription);

    try {
      // Save history to the database
      const resumeRes = await query(
        'INSERT INTO resumes(original_text) VALUES($1) RETURNING id',
        [resumeText]
      );
      const resumeId = resumeRes.rows[0].id;

      const jdRes = await query(
        'INSERT INTO job_descriptions(description_text) VALUES($1) RETURNING id',
        [jobDescription]
      );
      const jdId = jdRes.rows[0].id;

      await query(
        'INSERT INTO optimized_resumes(resume_id, job_description_id, optimized_text) VALUES($1, $2, $3)',
        [resumeId, jdId, optimizedText]
      );
    } catch (dbError) {
      console.warn('Non-blocking error: Failed to save to database. You can still use the AI results.', dbError.message);
    }

    return NextResponse.json({ optimizedText }, { status: 200 });

  } catch (error) {
    console.error('Optimization route error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing request' },
      { status: 500 }
    );
  }
}
