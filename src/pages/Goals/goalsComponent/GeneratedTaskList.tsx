type GeneratedTask = {
  title: string;
  description: string;
};

type Props = {
  generatedTasks: GeneratedTask[];
  generating: boolean;
  onGenerate: () => void;
  onSaveGeneratedTask: () => void;
};

const GeneratedTaskList = ({
  generatedTasks,
  generating,
  onGenerate,
  onSaveGeneratedTask,
}: Props) => {
  return (
    <>
      <button type="submit" onClick={onGenerate} disabled={generating}>
        {generating ? "Generating..." : "Regenerate Suggestions"}
      </button>
      {generatedTasks.length > 0 && (
        <div className="generated-tasks">
          <h3>Suggested Next Steps</h3>
          {generatedTasks.map((task, index) => (
            <div key={index} className="generated-task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
          <button type="button" onClick={onSaveGeneratedTask}>
            Save Suggestions
          </button>
        </div>
      )}
    </>
  );
};

export default GeneratedTaskList;
