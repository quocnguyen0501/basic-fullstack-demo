'use client';
import { useState, useEffect } from 'react';

export default function Home() {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');
	const [backendAppName, setBackendAppName] = useState('Loading...');

	const frontendTitle = process.env.NEXT_PUBLIC_APP_TITLE || 'Todo App';
	const frontendDescription =
		process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A simple todo app';

	const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

	// useEffect(() => {
	// 	const fetchAppInfo = async () => {
	// 		try {
	// 			const res = await fetch(`${API_URL}/info`);
	// 			const data = await res.json();
	// 			setBackendAppName(data.appName);
	// 		} catch (error) {
	// 			console.error('Failed to fetch app info');
	// 		}
	// 	};

	// 	fetchAppInfo();
	// 	fetchTodos();
	// }, []);

	const fetchTodos = async () => {
		const res = await fetch(`${API_URL}/todos`);
		const data = await res.json();
		setTodos(data);
	};

	const addTodo = async () => {
		if (!text.trim()) return;
		const res = await fetch(`${API_URL}/todos`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text }),
		});
		const newTodo = await res.json();
		setTodos([...todos, newTodo]);
		setText('');
	};

	const deleteTodo = async (id) => {
		await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6">
			<div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
				<div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
					<h1 className="text-3xl font-bold text-center">{frontendTitle}</h1>
					<p className="text-center mt-2 opacity-90">{frontendDescription}</p>
					{/* <div className="mt-4 text-center text-sm bg-white/20 rounded-full py-1 px-3 inline-block">
						Connected to: {backendAppName}
					</div> */}
				</div>

				{/* <div className="p-6">
					<div className="flex gap-2 mb-6">
						<input
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="Enter a new task..."
							className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
							onKeyPress={(e) => e.key === 'Enter' && addTodo()}
						/>
						<button
							onClick={addTodo}
							className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
						>
							Add
						</button>
					</div>

					<div className="space-y-3">
						{todos.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								<div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
								<p>No tasks yet. Add your first task!</p>
							</div>
						) : (
							todos.map((todo) => (
								<div
									key={todo.id}
									className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm transition-all"
								>
									<span className="text-gray-800 flex-1 truncate">
										{todo.text}
									</span>
									<button
										onClick={() => deleteTodo(todo.id)}
										className="ml-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
										aria-label="Delete task"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</div>
							))
						)}
					</div>

					{todos.length > 0 && (
						<div className="mt-6 text-center text-sm text-gray-500">
							{todos.length} {todos.length === 1 ? 'task' : 'tasks'} remaining
						</div>
					)}
				</div> */}
			</div>
		</div>
	);
}
