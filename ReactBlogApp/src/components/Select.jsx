import React,{forwardRef, useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
},ref) {

    const id = useId()
  return (
    <div className='w-full'>
        {label && 
            <label htmlFor={id} className=''></label>}

            <select  {...props} id={id} ref={ref} 
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${className}`}
            >
                {options?.map((option)=>
                (
                    <option key={option}>
                        {option}
                    </option>
                ))}
            </select>
    </div>
  )
}

export default forwardRef(Select)