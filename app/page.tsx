"use client";
import { useState } from "react";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core"; 

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  useCopilotAction({
    name: "addTodoItem",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo item to add",
        required: true,
      },
    ],
    handler: async ({ todoText }) => {
      setTodos([...todos, todoText]);
    },
  });
  
  useCopilotAction({
    name: "deleteTodoItem",
    description: "Delete a new todo item from the list",
    parameters: [
      {
        name: "todoIndex",
        type: "number",
        description: "The index of the todo item to delete",
        required: true,
      }
    ],
    handler: async ({ todoIndex }) => {
      deleteTodo(todoIndex);
    },
  });

  const addTodo = (todoText:string) => {
    if (todo.trim() !== "") {
      setTodos([...todos, todoText]);
      setTodo("");
    }
  };

  const deleteTodo = (indexToDelete : any) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <main className="bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          📝 iTodo App
        </h1>

        <textarea
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Write your todo..."
          className="w-full h-24 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 resize-none"
        ></textarea>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => {addTodo(todo)}}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200"
          >
            Add Todo
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {todos.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm"
            >
              <span className="text-gray-800 break-words">{t}</span>
              <button
                onClick={() => deleteTodo(index)}
                className="text-sm text-red-500 hover:text-red-700 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-gray-500 text-center mt-6">No todos yet.</p>
        )}
      </div>
      <CopilotPopup
        instructions={
          "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        }
        labels={{
          title: "Popup Assistant",
          initial: "Need any help?",
        }}
      />
    </main>
  );
}
