import React, { useEffect, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { configureMonacoYaml } from "monaco-yaml";
import { closeSync } from 'fs';

loader.init().then(monacoInstance => {
	// Setting up YAML with autocompletion and validation
	configureMonacoYaml(
		monaco,
		{
			validate: true,
			enableSchemaRequest: true,
			hover: true,
			completion: true,
			format: true,
			schemas: [
				{
					uri: "https://example.com/schema.json", // URL to your JSON schema (optional)
					fileMatch: ["*"],
					schema: {
						// Define your scheme here if necessary
					}
				}
			]
		});
});

function YamlEditor({textYaml}: {textYaml: string|undefined}): JSX.Element {

	const [onDarkMode, setOnDarkMode] = useState<boolean>(false);
	const bodyApp = document.body;

	function setTrueOrFalseDarkMode(): void{
		const containDarkClass = bodyApp.classList.contains('dark');
		setOnDarkMode(false);
		if(containDarkClass){
			setOnDarkMode(true);
		}
	}

	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation){
			if (mutation.type === 'attributes' && mutation.attributeName === 'class'){		
				setTrueOrFalseDarkMode()	
			}
		});
	});

	observer.observe(document.body, {attributes: true})

	useEffect(() => {
		setTrueOrFalseDarkMode()
	});

	return (
		<Editor
			height="50vh"
			defaultLanguage="yaml"
			value={textYaml}
			theme={onDarkMode ? "vs-dark" : "light"}
			options={{
				automaticLayout: true,
				tabSize: 2,
			}}
		/>
	);
}

export default YamlEditor;
