import react from 'react';

const layout = ({children}) => {
    return (

        <main>
            <div className='flex justify-center w-full'>

            <h1 className='px-4 text-2xl font-bold my-2  text-center'>Add Your Company Details Here..</h1>
            </div>
            <hr/>
            {
                children
            }
        </main>
    )
};
export default layout;