import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: () => (
        <>
            <header className="bg-gray-950 text-white backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0">
                <div className='px-2 sm:px-4 flex flex-col'>
                    <h1 className='text-2xl'>Portcast Assignment</h1>
                    <h3 className='self-end'>by <a href='https://ankitkarn.vercel.app' className='text-green-500'>Ankit Karn</a></h3>
                </div>
            </header>
            <Outlet />
        </>
    ),
})