import { TutorialStep } from "./tutorial-step";
import CodeBlock from "./code-block"; // Corrected import - default export

const create = `create table notes (
  id bigserial primary key,
  body text
);`;

const insert = `await supabase
  .from('notes')
  .insert({ body: 'hello world' });`;

const select = `const { data: notes } = await supabase
  .from('notes')
  .select('*');`;

export function FetchDataSteps() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <TutorialStep title="Create a table">
        <p className="my-2">
          Go to the <a href="https://supabase.com/dashboard/project/_/editor" className="text-blue-500 hover:underline">Table Editor</a> and create a table called <code>notes</code> with a column called <code>body</code>.
        </p>
        <p className="my-2">Alternatively, run this SQL:</p>
        <CodeBlock code={create} language="sql" />
      </TutorialStep>

      <TutorialStep title="Insert data">
        <p className="my-2">Insert data into the <code>notes</code> table.</p>
        <CodeBlock code={insert} language="js" />
      </TutorialStep>

      <TutorialStep title="Query data">
        <p className="my-2">Query data from the <code>notes</code> table.</p>
        <CodeBlock code={select} language="js" />
      </TutorialStep>
    </div>
  );
}
