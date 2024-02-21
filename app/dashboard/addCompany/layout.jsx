import react from 'react';

const layout = ({children}) => {
    return (

        <main>
            <div className='flex justify-center w-full'>

            <h1 className='px-4 text-2xl font-bold my-4  text-center'>Add Company Details Here..</h1>
            </div>
        
            {
                children
            }
        </main>
    )
};
export default layout;