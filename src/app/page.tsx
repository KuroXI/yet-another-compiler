"use client";

import { Lexical } from "@/lexical/lexical";
import { Semantic } from "@/semantic/semantic";
import { Syntax } from "@/syntax/syntax";
import { type ChangeEvent, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
	const [code, setCode] = useState("");
	const [output, setOutput] = useState('Click "Open File" and select file to compile.');
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [disabledButtons, setDisabledButtons] = useState({
		openFile: false,
		lexicalAnalysis: true,
		syntaxAnalysis: true,
		semanticAnalysis: true,
	});

	const handleCustomButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) {
			return;
		}

		const file = event.target.files[0];
		if (!(file instanceof Blob)) {
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			setCode(reader.result as string);
			setOutput('File loaded successfully.');
			setDisabledButtons({
				...disabledButtons,
				openFile: true,
				lexicalAnalysis: false,
			});
		};
		reader.readAsText(file);
	};

	const performLexicalAnalysis = () => {
		try {
			const lexicalAnalyzer = new Lexical();
			lexicalAnalyzer.tokenize(code);

			setOutput("Lexical Analysis Passed!");
			setDisabledButtons({
				...disabledButtons,
				lexicalAnalysis: true,
				syntaxAnalysis: false,
			});
		} catch (error) {
			setOutput((error as Error).message);
		}
	};

	const performSyntaxAnalysis = () => {
		try {
			const syntaxAnalysis = new Syntax();
			syntaxAnalysis.analyze(code);

			setOutput("Syntax Analysis Passed!");
			setDisabledButtons({
				...disabledButtons,
				syntaxAnalysis: true,
				semanticAnalysis: false,
			});
		} catch (error) {
			setOutput((error as Error).message);
		}
	};

	const performSemanticAnalysis = () => {
		try {
			const semanticAnalysis = new Semantic();
			semanticAnalysis.analyze(code);

			setOutput("Semantic Analysis Passed!");
			setDisabledButtons({
				...disabledButtons,
				semanticAnalysis: true,
			});
		} catch (error) {
			setOutput((error as Error).message);
		}
	};

	const clear = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
		setCode("");
		setOutput('Click "Open File" and select file to compile.');
		setDisabledButtons({
			openFile: false,
			lexicalAnalysis: true,
			semanticAnalysis: true,
			syntaxAnalysis: true,
		});
	};

	return (
		<main className="h-screen w-screen px-20 py-16 bg-white">
			<div className="flex size-full bg-cyan-50 shadow-gray-400 shadow-xl rounded-xl">
				<div className="flex flex-col w-1/4 h-full p-10 gap-10 ">
					<input
						type="file"
						accept=".yac"
						onChange={loadFile}
						ref={fileInputRef}
						className="hidden"
					/>
					<Button
						label="Open FIle"
						onClick={handleCustomButtonClick}
						disabled={disabledButtons.openFile}
					/>
					<Button
						label="Lexical Analysis"
						onClick={performLexicalAnalysis}
						disabled={disabledButtons.lexicalAnalysis}
					/>
					<Button
						label="Syntax Analysis"
						onClick={performSyntaxAnalysis}
						disabled={disabledButtons.syntaxAnalysis}
					/>
					<Button
						label="Semantic Analysis"
						onClick={performSemanticAnalysis}
						disabled={disabledButtons.semanticAnalysis}
					/>
					<Button label="Clear" onClick={clear} />
				</div>
				<div className="flex flex-col gap-5 p-10 w-3/4 h-full ">
					<div className="h-[6vh] rounded-xl">
						<SyntaxHighlighter
							language="bash"
							style={dracula}
							className="size-full"
							customStyle={{
								margin: 0,
							}}
						>
							{output}
						</SyntaxHighlighter>
					</div>
					<div className="bg-amber-700 h-full rounded-xl">
						<SyntaxHighlighter
							language="java"
							style={oneDark}
							className="size-full"
							showLineNumbers={true}
							customStyle={{
								margin: 0,
							}}
						>
							{code}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</main>
	);
}

const Button = ({
	onClick,
	label,
	disabled = false,
}: {
	onClick?: () => void;
	disabled?: boolean;
	label: string;
}) => {
	return (
		<button
			type="button"
			className={
				"h-full w-full rounded-md bg-black shadow-gray-400 shadow-xl font-mono text-lg disabled:bg-gray-600 hover:bg-gray-400 disabled:cursor-not-allowed"
			}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};
