export interface WarningTimedToastProps {
  idToast: string
  message: string
}

export const WarningTimedToast: React.FC<WarningTimedToastProps> = ({ idToast, message }) => {
  return (
    (
        <div className={`absolute invisible border-1 flex items-center w-md max-w-xs p-1 mt-2 text-gray-500 bg-white rounded-lg shadow-3 shadow-warning dark:text-black dark:bg-gray-800`} id={idToast}>
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-yellow-500"
          >
            <path d="M1 21h22L12 2 1 21z"></path>
            <path d="M12 16v2"></path>
            <path d="M12 10h.01"></path>
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal" >{message}</div>
      </div>
    )
  );
};

export function showToastWarningUpdateState(id: string) {
  let element = document.getElementById(id)
  element?.classList.remove('invisible')
  setTimeout(() => {
    element?.classList.add('opacity-0', 'transition-opacity', 'ease-in-out', 'delay-300', 'duration-1000')
  }, 4000)    
}

export function setInitClassNameToastWarning(idService: string) {
  let element = document.getElementById('toast-'+idService)
  element?.classList.remove('opacity-0', 'transition-opacity', 'ease-in-out', 'delay-300', 'duration-1000')
  element?.classList.add('invisible')
}


export default WarningTimedToast;
