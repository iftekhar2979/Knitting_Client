import react from 'react';

const layout = ({ children }) => {
    return (
        <main className='pl-8 py-4'>
            {
                children
            }
        </main>
    )
};
export default layout;