// components/TimedToast.tsx

import { useState, useEffect } from 'react';

interface TimedToastProps {
  //apiUrl: string;
  id: string,
  message: string;
  timeout: number; // Timeout in miliseconds
}

const TimedToast: React.FC<TimedToastProps> = ({ id, message, timeout }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setHtmlContent(message);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    
    const timer = setTimeout(() => {
        setVisible(false);
    }, timeout);
    
    return () => clearTimeout(timer);
  }, [message, timeout]);

  return (
    (
        <div className={`absolute invisible border-1 flex items-center w-md max-w-xs p-1 mt-2 text-gray-500 bg-white rounded-lg shadow-3 shadow-warning dark:text-gray-400 dark:bg-gray-800`} id={id}>
        {/* <div className={`absolute  ${visible ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out delay-300 duration-1000 border-1 flex items-center w-md max-w-xs p-1 mt-2 text-gray-500 bg-white rounded-lg shadow-3 shadow-warning dark:text-gray-400 dark:bg-gray-800`} id={id}> */}
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
        <div className="ms-3 text-sm font-normal" id={'message-'+id}>Error to update State</div>
      </div>
    )
  );
};

export default TimedToast;
