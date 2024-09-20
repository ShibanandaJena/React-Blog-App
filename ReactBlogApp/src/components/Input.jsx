import React, { useId } from 'react';

const Input = React.forwardRef(
  ({
    label,
    type = "text",
    className = "",
    ...props
  }, ref) => {
    
    const id = useId(); // Generate a unique id for the input

    return (
      <div className='w-full mb-4'>
        {label && (
          <label
            className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
