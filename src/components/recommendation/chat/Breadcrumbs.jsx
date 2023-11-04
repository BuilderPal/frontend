import React from 'react'

const Breadcrumbs = ({ breadcrumbs, navigateToIteration }) => {
  return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <a href="#" onClick={() => navigateToIteration(0)} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        </svg>
                        Start
                    </a>
                </li>
                {
                    breadcrumbs.slice(1, breadcrumbs.length).map((breadcrumb, index) => (
                        <li key={index}>
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                {index === breadcrumbs.length - 1 ? <>{breadcrumb}</> : <a href="#" onClick={() => navigateToIteration(index + 1)} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{breadcrumb}</a>}
                            </div>
                        </li>
                    ))
                }
            </ol>
        </nav>
  )
}

export default Breadcrumbs
