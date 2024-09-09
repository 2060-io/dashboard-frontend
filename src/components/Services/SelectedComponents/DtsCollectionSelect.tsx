import { DtsCollectionVO } from '@/openapi-client';
import React, { ChangeEvent } from 'react';

export interface DtsCollectionSelect {
	idinurl: string
	dtsCollections: DtsCollectionVO[]
	selectedOptionCollection: string
	handleChangeCollection: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const DtsCollectionSelect: React.FC<DtsCollectionSelect> = ({
	idinurl,
	dtsCollections,
	selectedOptionCollection,
	handleChangeCollection
}) => {
	const isDisabled = idinurl !== 'new';
	const selectClassNames = `
    relative z-20 w-full appearance-none
    rounded border border-stroke
    bg-transparent dark:bg-form-input
    px-5 py-3
    outline-none
    transition
    focus:border-primary dark:focus:border-primary
    active:border-primary
    dark:border-form-strokedark
	${selectedOptionCollection ? "text-black dark:text-white" : "placeholder-gray-3"}
    ${isDisabled ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 border-gray-300" : ""}
  `;

	return (
		<>
			<label className="mb-2.5 block text-black dark:text-white">
				DTS Collections
			</label>
			<div className="relative z-20 bg-transparent dark:bg-form-input">
				<select
					value={selectedOptionCollection}
					onChange={
						(e: ChangeEvent<HTMLSelectElement>) => {
							handleChangeCollection(e)
						}
					}
					disabled={isDisabled}
					className={selectClassNames}
				>
					<option
						value=""
						disabled
						className="text-body dark:text-bodydark"
					>
						Select your collection
					</option>
					{(dtsCollections).map((collecion: DtsCollectionVO, index: number) => (
						<option key={index} value={collecion.id} className="text-body dark:text-bodydark">
							{collecion.name}
						</option>
					))}
				</select>
				<span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
					<svg
						className="fill-current"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g opacity="0.8">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
								fill=""
							></path>
						</g>
					</svg>
				</span>
			</div>
		</>
	);
};

export default DtsCollectionSelect;